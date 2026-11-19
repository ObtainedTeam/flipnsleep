import { useState, useEffect } from 'react';
import { c, rv, FONT_DISPLAY, FONT_SUB, R, T, LH, CARD, CHIP, BTN, BTN_SM } from '../theme';
import { FAQ_ITEMS, IMG, dim, rs } from '../data';
import { subscribe } from '../brevo';
import { Acc, Ico } from './Sky';
import { ProductRail, ReviewBand } from './Sections';

// Gedeelde bouwblokken: wolkenrand, sterren, reviews, FAQ-accordion, e-mailsectie.

export function CloudDivider({ fill = c.cream, flip = false }) {
  return (
    <svg viewBox="0 0 520 46" preserveAspectRatio="none" aria-hidden="true"
      style={{ display: 'block', width: '100%', height: 46, transform: flip ? 'scaleY(-1)' : 'none', marginBottom: -1 }}>
      <path d="M0 46 Q30 14 75 28 Q110 4 160 22 Q205 0 255 18 Q300 2 350 22 Q400 6 445 26 Q490 12 520 34 L520 46 Z" fill={fill} />
    </svg>
  );
}

// Standaard productfoto-blok: achtergrond #D5EBFA met twee witte wolkjes
// schuin onder elkaar, productfoto eroverheen. Overal hergebruiken waar een
// productfoto staat.
// `height` mag een getal zijn of [desktop, mobiel]; `priority` zet fetchpriority
// op de hoofdfoto (LCP) in plaats van lazy loading.
export function ProductImageBlock({ src, alt = '', height = 240, radius = R.lg, bg = c.sky, style = {}, imgStyle = {}, priority = false }) {
  const [hd, hm] = Array.isArray(height) ? height : [height, height];
  const load = priority ? { fetchPriority: 'high' } : { loading: 'lazy' };
  return (
    <div className="r-h" style={{ position: 'relative', background: bg, borderRadius: radius, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', ...rv('h', hd, hm), ...style }}>
      <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', left: '-4%', top: '11%', width: '44%', opacity: 1 }} />
      <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', right: '-5%', bottom: '7%', width: '50%', opacity: 1 }} />
      <img src={src} {...dim(src)} {...rs(src, '(max-width: 759px) 80vw, 480px')} {...load} decoding="async" alt={alt} style={{ position: 'relative', maxHeight: '80%', maxWidth: '80%', objectFit: 'contain', ...imgStyle }} />
    </div>
  );
}

// Kussenstapel voor de bundelkaarten: 2 kussens (1+1) of 4 kussens (2+2),
// half over elkaar met schaduw, op de wolkenachtergrond zodat de wolkjes er
// goed achter uit komen.
// `height` mag een getal zijn of [desktop, mobiel]; `priority` voor de LCP-stapel.
export function PillowDeck({ count = 2, height = 220, radius = 0, bg = c.sky, priority = false }) {
  const [hd, hm] = Array.isArray(height) ? height : [height, height];
  const load = priority ? { fetchPriority: 'high' } : { loading: 'lazy' };
  const P = (extra, key) => (
    <img key={key} src={IMG.coverFront} {...dim(IMG.coverFront)} {...load} decoding="async" alt="" aria-hidden="true"
      style={{ position: 'absolute', objectFit: 'contain', filter: 'drop-shadow(0 10px 8px rgba(20,16,64,.16))', ...extra }} />
  );
  const two = [
    P({ width: '54%', left: '13%', top: '30%', transform: 'rotate(-6deg)', zIndex: 1 }, 'a'),
    P({ width: '54%', left: '33%', top: '40%', transform: 'rotate(6deg)', zIndex: 2 }, 'b'),
  ];
  const four = [
    P({ width: '46%', left: '8%', top: '12%', transform: 'rotate(-7deg)', zIndex: 1 }, 'a'),
    P({ width: '46%', left: '25%', top: '21%', transform: 'rotate(4deg)', zIndex: 2 }, 'b'),
    P({ width: '46%', left: '33%', top: '43%', transform: 'rotate(-5deg)', zIndex: 3 }, 'c'),
    P({ width: '46%', left: '50%', top: '52%', transform: 'rotate(6deg)', zIndex: 4 }, 'd'),
  ];
  return (
    <div className="r-h" style={{ position: 'relative', width: '100%', background: bg, borderRadius: radius, overflow: 'hidden', ...rv('h', hd, hm) }}>
      <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', left: '-5%', top: '9%', width: '40%', opacity: 1 }} />
      <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', right: '-5%', bottom: '6%', width: '46%', opacity: 1 }} />
      {count >= 4 ? four : two}
    </div>
  );
}

// Live besteldeadline: telt af naar 23:00 uur Eastern Time (de "ordered
// before 11PM, shipped today"-belofte). Waarheidsgetrouwe urgentie.
export function ShippingCountdown() {
  const [label, setLabel] = useState('Order before 11 PM ET, ships today');

  useEffect(() => {
    const update = () => {
      try {
        const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
        const h = +parts.find(p => p.type === 'hour').value % 24;
        const m = +parts.find(p => p.type === 'minute').value;
        const left = 23 * 60 - (h * 60 + m);
        if (left > 0) {
          const hh = Math.floor(left / 60), mm = left % 60;
          setLabel(`Order within ${hh > 0 ? `${hh}h ` : ''}${mm}m and it ships today`);
        } else {
          setLabel('Order now, ships tomorrow morning');
        }
      } catch { /* val terug op statische tekst */ }
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ ...CHIP, gap: 8, background: c.sky, fontSize: T.xs[0], fontWeight: 600, color: c.navy, whiteSpace: 'normal' }}>
      <Ico name="box" size={16} /> {label}
    </div>
  );
}

// Verwijzing naar het assortiment onder aan een pagina: dezelfde productrij als op home.
export function RangeCards({ title = 'Complete your bed', intro }) {
  return <ProductRail title={title} intro={intro} />;
}

export function Stars({ n = 5, size = T.sm[0] }) {
  return (
    <span aria-label={`${n} out of 5 stars`} style={{ color: c.amber, fontSize: size, letterSpacing: 2 }}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

export function FAQBlock({ items = FAQ_ITEMS, dark = false, limit }) {
  const list = limit ? items.slice(0, limit) : items;
  return <div style={{ maxWidth: 820, margin: '0 auto' }}><Acc items={list} dark={dark} /></div>;
}

// Beloftes en specificaties onder de koopknop: zelfde accordeon, compacter.
export function TrustAccordion({ specs }) {
  const items = [
    ['Product specifications', specs],
    ['Ordered before 11 PM ET, shipped today', "Orders placed before 11 PM ET leave our warehouse the same business day. You'll receive tracking as soon as it ships."],
    ['100-night sleep trial', 'Try it for 100 nights. Not sleeping better? Send it back for free and get a full refund, no questions asked.'],
    ['Free shipping and returns', 'Shipping is free on all orders across the United States and Canada, and returns are free within the trial period.'],
    ['2-year warranty', "Every flip'nsleep product comes with a 2-year warranty on materials and workmanship. If anything fails, we repair, replace or refund it."],
  ];
  return <Acc items={items} small open={0} />;
}

// Mobiele vergelijking: één kaart per regel, wij links en de ander rechts.
// rows: [[label, ours, theirs], ...]. Gebruik in een .m-only wrapper; de
// tabelversie staat ernaast in .d-only.
export function CompareCards({ rows, ours, theirs }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {rows.map(([label, us, them], i) => (
        <div key={i} style={{ ...CARD, padding: 16 }}>
          <div style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: T.sm[0], color: c.navy, marginBottom: 10 }}>{label}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 8 }}>
            <div style={{ background: c.sky, borderRadius: R.sm, padding: 12 }}>
              <div style={{ fontSize: T.xs[0], fontWeight: 700, color: c.navy, marginBottom: 4, fontFamily: FONT_SUB }}>{ours}</div>
              <div style={{ fontSize: T.sm[1], lineHeight: LH.body, color: c.navy }}>{us}</div>
            </div>
            <div style={{ borderRadius: R.sm, padding: 12, boxShadow: `inset 0 0 0 1px ${c.line}` }}>
              <div style={{ fontSize: T.xs[0], fontWeight: 700, color: c.grayD, marginBottom: 4, fontFamily: FONT_SUB }}>{theirs}</div>
              <div style={{ fontSize: T.sm[1], lineHeight: LH.body, color: c.grayD }}>{them}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reviews (Judge.me via /api/reviews) op de lichtblauwe wolkenband.
// `demo` (homepage): zonder echte reviews de voorbeelden tonen, duidelijk
// gelabeld en zonder sterren. Elders: zonder reviews geen sectie.
// ---------------------------------------------------------------------------
export function ReviewsBlock({ demo = null, noTop = false }) {
  const [data, setData] = useState(null); // { reviews, count, avg }
  useEffect(() => {
    fetch('/api/reviews').then((r) => r.json()).then(setData).catch(() => setData(null));
  }, []);
  const reviews = (data && data.reviews) || [];
  if (reviews.length === 0) {
    if (!demo) return null;
    return <ReviewBand noTop={noTop} summary="Reviews from verified buyers appear here automatically." reviews={demo.reviews.map(r => ({ ...r, example: true }))} />;
  }
  return <ReviewBand noTop={noTop} summary={`${data.avg} out of 5, from ${data.count} review${data.count === 1 ? '' : 's'}`}
    reviews={reviews.slice(0, 6).map(r => ({ title: r.title, body: r.body, name: (r.name || '').split(' ')[0], rating: r.rating, verified: r.verified }))} />;
}

// ---------------------------------------------------------------------------
// Nieuwsbrief-inschrijving (Brevo welcome10). Staat één keer per pagina, in de
// footer, met id="newsletter" zodat links en de nav ernaartoe kunnen scrollen.
// ---------------------------------------------------------------------------
export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const submit = async (e) => {
    e.preventDefault();
    setState('busy');
    try { await subscribe(email, 'welcome10'); setState('done'); }
    catch { setState('error'); }
  };
  return (
    <div id="newsletter" className="grid-2m1 r-gap" style={{ ...rv('gap', 40, 20), alignItems: 'center', scrollMarginTop: 120 }}>
      <div style={{ minWidth: 0 }}>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.white }}>Sleep better, pay less</h2>
        <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.lilac, marginTop: 8 }}>Get 10% off your first order, plus our best tips for cooler nights.</p>
      </div>
      <div style={{ minWidth: 0 }}>
        {state === 'done' ? (
          <p style={{ fontSize: T.md[0], fontWeight: 600, color: c.white }}>Check your inbox. Your 10% code is on its way.</p>
        ) : (
          <>
            <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', background: c.white, borderRadius: R.pill, padding: 5, maxWidth: 480 }}>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address" autoComplete="email" spellCheck={false}
                style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: T.md[1], padding: '10px 16px', color: c.navy, minWidth: 0, outline: 'none' }} />
              <button type="submit" disabled={state === 'busy'} style={{ ...BTN, height: BTN_SM.height, padding: BTN_SM.padding, fontSize: BTN_SM.fontSize, flexShrink: 0 }}>{state === 'busy' ? '…' : 'Get 10% off'}</button>
            </form>
            {state === 'error' && <p style={{ fontSize: T.xs[0], color: c.pastelPink, marginTop: 8 }}>Something went wrong, please try again.</p>}
            <p style={{ fontSize: T.xs[0], color: c.lilac, marginTop: 10 }}>No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}
