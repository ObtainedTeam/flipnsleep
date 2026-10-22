// Shopify-webhooks -> Brevo.
// Vervangt de Brevo Shopify-app (niet beschikbaar in de App Store).
// Shopify stuurt orders/create en checkouts/create|update hierheen; wij zetten
// het contact in Brevo en loggen een event waar de automations op starten:
//   order_placed      -> post-purchase flow (C) en win-back (E)
//   checkout_started  -> verlaten-winkelwagenflow (B)
// Env (in Vercel): SHOPIFY_WEBHOOK_SECRET, BREVO_API_KEY.
import crypto from 'node:crypto';

export const config = { api: { bodyParser: false } };

const CUSTOMERS_LIST = 9; // Brevo-lijst "flipnsleep buyers"

async function rawBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(typeof c === 'string' ? Buffer.from(c) : c);
  return Buffer.concat(chunks);
}

function validHmac(raw, header) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret || !header) return false;
  const digest = crypto.createHmac('sha256', secret).update(raw).digest('base64');
  const a = Buffer.from(digest);
  const b = Buffer.from(String(header));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function brevo(path, method, body) {
  const r = await fetch('https://api.brevo.com/v3' + path, {
    method,
    headers: { 'api-key': process.env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok && r.status !== 204) {
    const t = await r.text();
    throw new Error(`Brevo ${method} ${path} ${r.status}: ${t.slice(0, 300)}`);
  }
  return r.status === 204 ? null : r.json().catch(() => null);
}

async function currentOrderCount(email) {
  try {
    const c = await brevo('/contacts/' + encodeURIComponent(email), 'GET');
    return Number(c?.attributes?.ORDER_COUNT || 0);
  } catch {
    return 0;
  }
}

async function handleOrder(o) {
  const email = (o.email || o.contact_email || o.customer?.email || '').toLowerCase();
  if (!email) return 'no-email';
  const first = o.customer?.first_name || o.billing_address?.first_name || '';
  const last = o.customer?.last_name || o.billing_address?.last_name || '';
  const count = (await currentOrderCount(email)) + 1;
  const today = new Date().toISOString().slice(0, 10);

  await brevo('/contacts', 'POST', {
    email,
    updateEnabled: true,
    listIds: [CUSTOMERS_LIST],
    attributes: {
      ...(first ? { FIRSTNAME: first } : {}),
      ...(last ? { LASTNAME: last } : {}),
      ORDER_COUNT: count,
      LAST_ORDER_DATE: today,
      ...(count === 1 ? { FIRST_ORDER_DATE: today } : {}),
    },
  });

  await brevo('/events', 'POST', {
    event_name: 'order_placed',
    identifiers: { email_id: email },
    event_properties: {
      order_id: String(o.id),
      order_name: o.name || '',
      total: Number(o.total_price || 0),
      currency: o.currency || '',
      order_count: count,
      first_order: count === 1,
      products: (o.line_items || []).map(li => li.title).join(', '),
    },
  });
  return 'order';
}

async function handleCheckout(c) {
  const email = (c.email || c.customer?.email || '').toLowerCase();
  if (!email || c.completed_at) return 'skip';
  await brevo('/contacts', 'POST', {
    email,
    updateEnabled: true,
    attributes: {
      ...(c.customer?.first_name ? { FIRSTNAME: c.customer.first_name } : {}),
    },
  });
  await brevo('/events', 'POST', {
    event_name: 'checkout_started',
    identifiers: { email_id: email },
    event_properties: {
      checkout_id: String(c.id || c.token || ''),
      checkout_url: c.abandoned_checkout_url || '',
      total: Number(c.total_price || 0),
    },
  });
  return 'checkout';
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Alleen of de sleutels gezet zijn, nooit de waarden zelf.
    return res.status(200).json({ secret: !!process.env.SHOPIFY_WEBHOOK_SECRET, brevo: !!process.env.BREVO_API_KEY });
  }
  if (req.method !== 'POST') return res.status(405).end();
  const raw = await rawBody(req);
  if (!validHmac(raw, req.headers['x-shopify-hmac-sha256'])) {
    console.error('[shopify-webhook] hmac mismatch', { len: raw.length, hasHeader: !!req.headers['x-shopify-hmac-sha256'] });
    return res.status(401).end();
  }

  const topic = String(req.headers['x-shopify-topic'] || '');
  let payload;
  try { payload = JSON.parse(raw.toString('utf8')); } catch { return res.status(400).end(); }

  try {
    let result = 'ignored';
    if (topic === 'orders/create') result = await handleOrder(payload);
    else if (topic === 'checkouts/create' || topic === 'checkouts/update') result = await handleCheckout(payload);
    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error('[shopify-webhook]', topic, err.message);
    // 500 laat Shopify het later opnieuw proberen
    return res.status(500).json({ ok: false });
  }
}
