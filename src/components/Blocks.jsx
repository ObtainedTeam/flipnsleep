import { useState, useEffect } from 'react';
import { c, rv, FONT_DISPLAY, FONT_SUB, R, T, LH, CARD, CHIP, BTN, BTN_SM } from '../theme';
import { FAQ_ITEMS } from '../data';
import { subscribe } from '../brevo';
import { Acc, Ico } from './Sky';
import { ProductRail } from './Sections';

// Gedeelde bouwblokken: besteldeadline, sterren, FAQ-accordion, vergelijkkaarten, e-mailsectie.

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
