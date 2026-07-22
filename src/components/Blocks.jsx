import { useState } from 'react';
import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { REVIEWS, FAQ_ITEMS, IMG, BUNDLES, PRODUCT } from '../data';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { subscribe } from '../brevo';

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
export function ProductImageBlock({ src, alt = '', height = 240, radius = 16, style = {}, imgStyle = {} }) {
  return (
    <div style={{ position: 'relative', background: '#D5EBFA', borderRadius: radius, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', height, ...style }}>
      <img src={IMG.cloudWhite} alt="" aria-hidden="true" style={{ position: 'absolute', left: '8%', top: '16%', width: '34%', opacity: .95 }} />
      <img src={IMG.cloudWhite} alt="" aria-hidden="true" style={{ position: 'absolute', right: '6%', bottom: '12%', width: '42%', opacity: .95 }} />
      <img src={src} alt={alt} style={{ position: 'relative', maxHeight: '86%', maxWidth: '88%', objectFit: 'contain', ...imgStyle }} />
    </div>
  );
}

// Summer Deals slider: wolkenachtergrond zoals de hero, productkaarten
// hangen half over de lucht heen (padding boven, beschrijving op het witte
// vlak eronder) — zoals in het Figma-ontwerp.
export function SummerDealsSlider() {
  const isMobile = useIsMobile();
  const { symbol, isCA } = useCurrency();
  const bgH = isMobile ? 300 : 360;
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingBottom: 34, marginTop: -1 }}>
      <style>{`.fns-scroll{scrollbar-width:none;-ms-overflow-style:none}.fns-scroll::-webkit-scrollbar{display:none}`}</style>
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: bgH, backgroundImage: `url(${IMG.sliderBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'relative', maxWidth: 1050, margin: '0 auto', padding: isMobile ? '34px 20px 0' : '48px 40px 0' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 28 : 34, color: c.navy }}>Summer <span style={{ fontFamily: FONT_SUB, fontWeight: 400 }}>Deals</span></h2>
        <div className="fns-scroll" style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '24px 4px 8px', scrollSnapType: 'x mandatory' }}>
          {BUNDLES.map(b => {
            const p = getPrice(b, isCA);
            const cm = isCA ? b.compareAt.cad : b.compareAt.usd;
            return (
              <a key={b.id} href="/product/signature-cold-pillow" style={{ textDecoration: 'none', scrollSnapAlign: 'center', flex: isMobile ? '0 0 78%' : '0 0 300px', borderRadius: 22, overflow: 'hidden', boxShadow: '0 6px 14px rgba(32,27,93,.22)', background: '#fff' }}>
                <div style={{ position: 'relative' }}>
                  <ProductImageBlock src={b.image} alt={b.label} height={isMobile ? 170 : 190} radius={0} />
                  <span style={{ position: 'absolute', top: 12, left: 12, background: c.amber, color: c.navy, fontWeight: 700, fontSize: 12, borderRadius: 999, padding: '6px 14px' }}>{b.short.toLowerCase()}</span>
                </div>
                <div style={{ background: `linear-gradient(180deg, ${c.purple}, ${c.navy})`, color: '#fff', padding: '16px 16px 18px', textAlign: 'center' }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, marginBottom: 4 }}>{PRODUCT.name}</div>
                  <div style={{ fontSize: 12, color: '#DDD9FF', lineHeight: 1.5, marginBottom: 8 }}>{PRODUCT.tagline}</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: '#fff', marginBottom: 10 }}>{formatPrice(p, symbol)} <s style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: 11.5, color: '#BDB7EE' }}>{formatPrice(cm, symbol)}</s></div>
                  <span style={{ display: 'inline-block', background: `linear-gradient(180deg, ${c.amber}, ${c.amberD})`, color: c.navy, fontWeight: 700, fontSize: 11.5, borderRadius: 999, padding: '9px 16px' }}>Now {b.label.match(/\(([^)]+)\)/)?.[1] || b.short} for only {formatPrice(p, symbol)}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Collections-sectie: 2 rijen × 2 kolommen. Demo-foto's tot de categorieën
// echt bestaan; alleen Pillows is nu shopbaar.
export function CollectionsBlock() {
  const isMobile = useIsMobile();
  const items = [
    ['Pillows', IMG.front, '/shop', false],
    ['Sheets', IMG.bed, null, true],
    ['Pregnancy', IMG.night, null, true],
    ['Toppers', IMG.filling, null, true],
  ];
  return (
    <section style={{ padding: isMobile ? '40px 20px 8px' : '54px 40px 10px' }}>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 26 : 32, color: c.navy, textAlign: 'center' }}>Discover our <span style={{ fontFamily: FONT_SUB }}>collections</span></h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 480, margin: '22px auto 0' }}>
        {items.map(([label, img, to, soon], i) => {
          const inner = (
            <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '.85', display: 'flex', alignItems: 'flex-end', filter: soon ? 'saturate(.45) brightness(.92)' : 'none' }}>
              <img src={img} alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(20,16,64,.65))' }} />
              {soon && <span style={{ position: 'absolute', top: 10, right: 10, background: c.amber, color: c.navy, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 10.5, borderRadius: 999, padding: '5px 10px' }}>Coming soon</span>}
              <span style={{ position: 'relative', color: '#fff', fontFamily: FONT_DISPLAY, fontSize: 18, padding: 14, textShadow: '0 2px 8px rgba(0,0,0,.4)' }}>{label}</span>
            </div>
          );
          return to
            ? <a key={i} href={to} style={{ textDecoration: 'none' }}>{inner}</a>
            : <div key={i}>{inner}</div>;
        })}
      </div>
    </section>
  );
}

export function Stars({ n = 5, size = 14 }) {
  return (
    <span aria-label={`${n} out of 5 stars`} style={{ color: c.amberD, fontSize: size, letterSpacing: 2 }}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

export function ReviewsBlock() {
  const isMobile = useIsMobile();
  return (
    <div>
      {/* Wolkjes komen achter de donkere sectie vandaan: rand met gezichtje boven, kale rand onder */}
      <img src={IMG.cloudsUp} alt="" aria-hidden="true" style={{ display: 'block', width: '100%', marginBottom: -1 }} />
      <section style={{ background: `linear-gradient(180deg, ${c.purple}, ${c.navy})`, color: '#fff', padding: isMobile ? '38px 20px 40px' : '52px 40px 56px' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 26 : 32, textAlign: 'center' }}>What our <span style={{ fontFamily: FONT_SUB }}>customers say</span></h2>
        <div style={{ textAlign: 'center', margin: '10px 0 6px' }}><Stars n={5} /> <span style={{ fontSize: 13, marginLeft: 6 }}>4.7 average rating</span></div>
        <div className="fns-scroll" style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '18px 4px 8px', maxWidth: 1050, margin: '0 auto', scrollSnapType: 'x mandatory' }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ scrollSnapAlign: 'center', flex: isMobile ? '0 0 86%' : '1 1 0', minWidth: isMobile ? undefined : 260, background: c.sky, color: c.navy, borderRadius: 20, padding: 20 }}>
              <Stars n={r.stars} />
              <p style={{ fontSize: 13.5, lineHeight: 1.65, margin: '10px 0 14px' }}>"{r.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
                <b style={{ fontFamily: FONT_SUB, fontSize: 14 }}>{r.who}</b>
                <span style={{ color: c.grayD }}>{r.when}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <img src={IMG.cloudsDown} alt="" aria-hidden="true" style={{ display: 'block', width: '100%', marginTop: -1 }} />
    </div>
  );
}

export function FAQBlock({ items = FAQ_ITEMS, dark = false, limit }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      {list.map(([q, a], i) => (
        <details key={i} style={{ borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.25)' : 'rgba(32,27,93,.16)'}` }}>
          <summary style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '15px 2px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SUB }}>
            {q}<span style={{ fontFamily: FONT_DISPLAY, fontSize: 16 }}>+</span>
          </summary>
          <p style={{ fontSize: 13, lineHeight: 1.7, padding: '0 2px 15px', opacity: .85 }}>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function EmailCapture() {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setState('busy');
    try { await subscribe(email, 'welcome10'); setState('done'); }
    catch { setState('error'); }
  };

  return (
    <section style={{ background: c.sky, padding: isMobile ? '42px 22px' : '56px 40px', textAlign: 'center' }}>
      <img src={IMG.iconCloud} alt="" style={{ height: 30, marginBottom: 8 }} />
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 30, color: c.navy }}>Sleep better, <span style={{ fontFamily: FONT_SUB }}>pay less</span></h2>
      <p style={{ fontSize: 13.5, lineHeight: 1.6, maxWidth: 340, margin: '10px auto 0' }}>Get 10% off your first order and our best sleep tips for warm nights.</p>
      {state === 'done' ? (
        <p style={{ fontSize: 14, fontWeight: 600, marginTop: 20 }}>Check your inbox — your 10% code is on its way. 🌙</p>
      ) : (
        <>
          <form onSubmit={submit} style={{ display: 'flex', maxWidth: 380, margin: '20px auto 0', background: '#fff', borderRadius: 999, padding: 5, boxShadow: '0 8px 22px rgba(32,27,93,.14)' }}>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address"
              style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'Poppins,sans-serif', fontSize: 13, padding: '10px 16px', color: c.navy, minWidth: 0, outline: 'none' }} />
            <button type="submit" disabled={state === 'busy'} style={{ border: 'none', borderRadius: 999, background: c.navy, color: '#fff', fontWeight: 700, fontSize: 13, padding: '11px 20px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif' }}>{state === 'busy' ? '…' : 'Get 10% off'}</button>
          </form>
          {state === 'error' && <p style={{ fontSize: 11.5, color: '#b3423f', marginTop: 8 }}>Something went wrong — please try again.</p>}
          <p style={{ fontSize: 11, marginTop: 10, opacity: .65 }}>No spam. Unsubscribe anytime.</p>
        </>
      )}
    </section>
  );
}

export function TrustAccordion({ specs }) {
  const items = [
    ['Ordered before 11:00 PM, shipped today', "Orders placed before 11 PM ET leave our warehouse the same business day. You'll receive tracking as soon as it ships."],
    ['100-night sleep trial, money-back guarantee', 'Try the pillow for 100 nights. Not sleeping better? Send it back for free and get a full refund, no questions asked.'],
    ['Free shipping on every order', 'Shipping is free on all orders across the United States and Canada, and returns are free within the trial period.'],
    ['Product specifications', specs],
  ];
  return (
    <div style={{ background: c.navy, color: '#fff', borderRadius: 20, padding: '10px 20px 14px' }}>
      {items.map(([q, a], i) => (
        <details key={i} style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,.25)' : 'none' }}>
          <summary style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '14px 2px', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SUB }}>
            {q}<span style={{ fontFamily: FONT_DISPLAY, fontSize: 16 }}>+</span>
          </summary>
          <div style={{ fontSize: 12.5, lineHeight: 1.7, padding: '0 2px 14px', opacity: .88 }}>{a}</div>
        </details>
      ))}
    </div>
  );
}
