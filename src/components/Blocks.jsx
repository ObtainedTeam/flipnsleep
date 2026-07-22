import { useState } from 'react';
import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { REVIEWS, FAQ_ITEMS, IMG } from '../data';
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
    <section style={{ background: `linear-gradient(180deg, ${c.purple}, ${c.navy})`, color: '#fff', padding: isMobile ? '44px 20px' : '60px 40px' }}>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 26 : 32, textAlign: 'center' }}>What our <span style={{ fontFamily: FONT_SUB }}>customers say</span></h2>
      <div style={{ textAlign: 'center', margin: '10px 0 6px' }}><Stars n={5} /> <span style={{ fontSize: 13, marginLeft: 6 }}>4.7 average rating</span></div>
      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '18px 4px 8px', maxWidth: 1050, margin: '0 auto', scrollSnapType: 'x mandatory' }}>
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
