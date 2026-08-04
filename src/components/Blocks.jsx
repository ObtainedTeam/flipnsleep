import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { FAQ_ITEMS, IMG, BUNDLES, PRODUCT, productById, products } from '../data';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { subscribe } from '../brevo';
import Reveal from './Reveal';

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
export function ProductImageBlock({ src, alt = '', height = 240, radius = 16, bg = '#D5EBFA', style = {}, imgStyle = {} }) {
  return (
    <div style={{ position: 'relative', background: bg, borderRadius: radius, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', height, ...style }}>
      <img src={IMG.cloudWhite} alt="" aria-hidden="true" style={{ position: 'absolute', left: '-4%', top: '11%', width: '44%', opacity: 1, filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.14))' }} />
      <img src={IMG.cloudWhite} alt="" aria-hidden="true" style={{ position: 'absolute', right: '-5%', bottom: '7%', width: '50%', opacity: 1, filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.14))' }} />
      <img src={src} alt={alt} style={{ position: 'relative', maxHeight: '80%', maxWidth: '80%', objectFit: 'contain', ...imgStyle }} />
    </div>
  );
}

// Kussenstapel voor de bundelkaarten: 2 kussens (1+1) of 4 kussens (2+2),
// half over elkaar met schaduw, op de wolkenachtergrond zodat de wolkjes er
// goed achter uit komen.
export function PillowDeck({ count = 2, height = 220, radius = 0 }) {
  const P = (extra, key) => (
    <img key={key} src={IMG.coverFront} alt="" aria-hidden="true"
      style={{ position: 'absolute', objectFit: 'contain', filter: 'drop-shadow(0 8px 12px rgba(32,27,93,.24))', ...extra }} />
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
    <div style={{ position: 'relative', background: '#D5EBFA', borderRadius: radius, overflow: 'hidden', height }}>
      <img src={IMG.cloudWhite} alt="" aria-hidden="true" style={{ position: 'absolute', left: '-5%', top: '9%', width: '40%', opacity: 1, filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.14))' }} />
      <img src={IMG.cloudWhite} alt="" aria-hidden="true" style={{ position: 'absolute', right: '-5%', bottom: '6%', width: '46%', opacity: 1, filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.14))' }} />
      {count >= 4 ? four : two}
    </div>
  );
}

// Summer Deals slider: wolkenachtergrond zoals de hero, productkaarten
// hangen half over de lucht heen (padding boven, beschrijving op het witte
// vlak eronder) — zoals in het Figma-ontwerp.
export function SummerDealsSlider() {
  const isMobile = useIsMobile();
  const { symbol, isCA } = useCurrency();
  const scroller = useRef(null);
  const nudged = useRef(false);

  // Zodra de slider in beeld komt: even automatisch heen en weer scrollen, als
  // hint dat je kunt swipen. Gebeurt eenmalig.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !nudged.current) {
          nudged.current = true;
          const d = isMobile ? 130 : 210;
          setTimeout(() => { el.scrollTo({ left: d, behavior: 'smooth' }); }, 300);
          setTimeout(() => { el.scrollTo({ left: 0, behavior: 'smooth' }); }, 1150);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [isMobile]);

  const cardBase = { textDecoration: 'none', scrollSnapAlign: 'center', flex: isMobile ? '0 0 78%' : '0 0 320px', borderRadius: 22, overflow: 'hidden', background: '#fff' };
  const panel = { background: `linear-gradient(180deg, ${c.purple}, ${c.navy})`, color: '#fff', padding: '16px 16px 18px', textAlign: 'center' };
  const chip = { display: 'inline-block', background: `linear-gradient(180deg, ${c.amber}, ${c.amberD})`, color: c.navy, fontWeight: 700, fontSize: 11.5, borderRadius: 999, padding: '9px 16px' };
  const badge = { position: 'absolute', top: 12, left: 12, background: c.amber, color: c.navy, fontWeight: 700, fontSize: 12, borderRadius: 999, padding: '6px 14px' };

  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingBottom: 34, marginTop: -1 }}>
      <style>{`.fns-scroll{scrollbar-width:none;-ms-overflow-style:none}.fns-scroll::-webkit-scrollbar{display:none}`}</style>
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isMobile ? 300 : 430, backgroundImage: `url(${IMG.sliderBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: isMobile ? '34px 20px 0' : '48px 40px 0' }}>
        <Reveal><h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 28 : 34, color: c.navy }}>Summer <span style={{ fontFamily: FONT_SUB, fontWeight: 400 }}>Deals</span></h2></Reveal>
        <div ref={scroller} className="fns-scroll" style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '24px 4px 8px', scrollSnapType: 'x mandatory' }}>
          {/* Kussenbundels — kussenstapel (2 of 4 kussens) op de wolkenachtergrond */}
          {BUNDLES.map(b => {
            const p = getPrice(b, isCA);
            const cm = isCA ? b.compareAt.cad : b.compareAt.usd;
            return (
              <a key={b.id} href="/product/signature-cold-pillow" style={cardBase}>
                <div style={{ position: 'relative' }}>
                  <PillowDeck count={b.pillows} height={isMobile ? 170 : 210} radius={0} />
                  <span style={badge}>{b.short.toLowerCase()}</span>
                </div>
                <div style={panel}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, marginBottom: 4 }}>{PRODUCT.name}</div>
                  <div style={{ fontSize: 12, color: '#DDD9FF', lineHeight: 1.5, marginBottom: 8 }}>{PRODUCT.tagline}</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: '#fff', marginBottom: 10 }}>{formatPrice(p, symbol)} <s style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: 11.5, color: '#BDB7EE' }}>{formatPrice(cm, symbol)}</s></div>
                  <span style={chip}>Now {b.label.match(/\(([^)]+)\)/)?.[1] || b.short} for only {formatPrice(p, symbol)}</span>
                </div>
              </a>
            );
          })}
          {/* Overige afgeprijsde producten — volledige productfoto */}
          {products.map(prod => {
            const p = getPrice(prod, isCA);
            const cm = prod.compareAt ? (isCA ? prod.compareAt.cad : prod.compareAt.usd) : null;
            return (
              <a key={prod.id} href={`/product/${prod.id}`} style={cardBase}>
                <div style={{ position: 'relative' }}>
                  <img src={prod.images[0]} alt={prod.name} style={{ display: 'block', width: '100%', height: isMobile ? 170 : 210, objectFit: 'cover' }} />
                  {prod.badge && <span style={badge}>{prod.badge.toLowerCase()}</span>}
                </div>
                <div style={panel}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, marginBottom: 4 }}>{prod.name}</div>
                  <div style={{ fontSize: 12, color: '#DDD9FF', lineHeight: 1.5, marginBottom: 8 }}>{prod.tagline}</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: '#fff', marginBottom: 10 }}>From {formatPrice(p, symbol)} {cm && <s style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: 11.5, color: '#BDB7EE' }}>{formatPrice(cm, symbol)}</s>}</div>
                  <span style={chip}>Shop the deal</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Live besteldeadline: telt af naar 23:00 uur Eastern Time (de "ordered
// before 11PM, shipped today"-belofte). Waarheidsgetrouwe urgentie.
export function ShippingCountdown() {
  const [label, setLabel] = useState('Ordered before 11 PM ET — ships today');

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
          setLabel('Order now — ships tomorrow morning');
        }
      } catch { /* val terug op statische tekst */ }
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFF6E3', border: `1px solid ${c.amberD}55`, borderRadius: 999, padding: '7px 14px', fontSize: 12, fontWeight: 600, color: '#8a6519' }}>
      📦 {label}
    </div>
  );
}

// Statische trustbalk onder de header — cijfers later inwisselen voor
// echte reviewaantallen zodra die er zijn.
export function TrustBar() {
  const isMobile = useIsMobile();
  const items = ['🌙 100-night sleep trial', '🚚 Free shipping, always', '✓ OEKO-TEX & CertiPUR-US certified', '🛡️ 2-year warranty'];
  return (
    <div className="fns-scroll" style={{ background: '#fff', borderBottom: '1px solid rgba(32,27,93,.10)', display: 'flex', gap: isMobile ? 18 : 34, justifyContent: isMobile ? 'flex-start' : 'center', overflowX: 'auto', padding: '9px 16px', whiteSpace: 'nowrap' }}>
      {items.map((t, i) => (
        <span key={i} style={{ fontSize: 11.5, fontWeight: 600, color: c.navy, fontFamily: FONT_SUB, flexShrink: 0 }}>{t}</span>
      ))}
    </div>
  );
}


// echt bestaan; alleen Pillows is nu shopbaar.
export function CollectionsBlock() {
  const isMobile = useIsMobile();
  const items = [
    ['Pillows', IMG.front, '/product/signature-cold-pillow', false],
    ['Sheets', productById('bamboo-sheet-set').images[0], '/product/bamboo-sheet-set', false],
    ['Blankets', IMG.tileBlankets, '/product/cooling-weighted-blanket', false],
    ['Comforters', IMG.tileComforters, '/product/cooling-comforter', false],
    ['Silk Series', IMG.tileSilk, null, true],
    ['Mattress Toppers', IMG.tileToppers, null, true],
  ];
  return (
    <section style={{ padding: isMobile ? '40px 20px 8px' : '54px 40px 10px' }}>
      <Reveal><h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 26 : 32, color: c.navy, textAlign: 'center' }}>Discover our <span style={{ fontFamily: FONT_SUB }}>collections</span></h2></Reveal>
      <Reveal delay={120}><div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 18, maxWidth: isMobile ? 480 : 1040, margin: isMobile ? '22px auto 0' : '30px auto 0' }}>
        {items.map(([label, img, to, soon], i) => {
          const inner = (
            <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '.85', display: 'flex', alignItems: 'flex-end', filter: soon ? 'saturate(.45) brightness(.92)' : 'none' }}>
              <img src={img} alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(20,16,64,.65))' }} />
              {soon && <span style={{ position: 'absolute', top: 10, right: 10, background: c.amber, color: c.navy, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 10.5, borderRadius: 999, padding: '5px 10px' }}>Coming soon</span>}
              <span style={{ position: 'relative', color: '#fff', fontFamily: FONT_DISPLAY, fontSize: isMobile ? 18 : 21, padding: isMobile ? 14 : 18, textShadow: '0 2px 8px rgba(0,0,0,.4)' }}>{label}</span>
            </div>
          );
          return to
            ? <a key={i} href={to} style={{ textDecoration: 'none' }}>{inner}</a>
            : <div key={i}>{inner}</div>;
        })}
      </div></Reveal>
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
  const [data, setData] = useState(null); // { reviews, count, avg } uit /api/reviews (Judge.me)

  useEffect(() => {
    fetch('/api/reviews').then((r) => r.json()).then(setData).catch(() => setData(null));
  }, []);

  // Geen echte reviews = geen sectie. Zodra de eerste Judge.me-review
  // gepubliceerd is, verschijnt dit blok vanzelf met echte content.
  const reviews = (data && data.reviews) || [];
  if (reviews.length === 0) return null;
  const shown = reviews.slice(0, 6);

  return (
    <div>
      {/* Wolkjes komen achter de donkere sectie vandaan: rand met gezichtje boven, kale rand onder */}
      <img src={IMG.cloudsUp} alt="" aria-hidden="true" style={{ display: 'block', width: '100%', marginBottom: -1 }} />
      <section style={{ background: `linear-gradient(180deg, ${c.purple}, ${c.navy})`, color: '#fff', padding: isMobile ? '38px 20px 40px' : '64px 40px 70px' }}>
        <Reveal>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 26 : 32, textAlign: 'center' }}>What our <span style={{ fontFamily: FONT_SUB }}>customers say</span></h2>
        <div style={{ textAlign: 'center', margin: '10px 0 6px' }}><Stars n={Math.round(data.avg)} /> <span style={{ fontSize: 13, marginLeft: 6 }}>{data.avg} · {data.count} verified review{data.count === 1 ? '' : 's'}</span></div>
        </Reveal>
        <Reveal delay={120}>
        <div className="fns-scroll" style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '18px 4px 8px', maxWidth: 1050, margin: '0 auto', scrollSnapType: 'x mandatory' }}>
          {shown.map((r, i) => (
            <div key={i} style={{ scrollSnapAlign: 'center', flex: isMobile ? '0 0 86%' : '1 1 0', minWidth: isMobile ? undefined : 300, background: c.sky, color: c.navy, borderRadius: 20, padding: 20 }}>
              <Stars n={r.rating} />
              <p style={{ fontSize: 13.5, lineHeight: 1.65, margin: '10px 0 14px' }}>"{r.body}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
                <b style={{ fontFamily: FONT_SUB, fontSize: 14 }}>{r.name}</b>
                <span style={{ color: c.grayD }}>{r.verified ? 'Verified buyer' : r.date}</span>
              </div>
            </div>
          ))}
        </div>
        </Reveal>
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <Link to="/reviews" style={{ color: '#DDD9FF', fontSize: 13, textDecoration: 'underline' }}>Read all reviews</Link>
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
      <Reveal>
      <img src={IMG.iconCloud} alt="" style={{ height: 30, marginBottom: 8 }} />
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 36, color: c.navy }}>Sleep better, <span style={{ fontFamily: FONT_SUB }}>pay less</span></h2>
      <p style={{ fontSize: 13.5, lineHeight: 1.6, maxWidth: 340, margin: '10px auto 0' }}>Get 10% off your first order and our best sleep tips for warm nights.</p>
      {state === 'done' ? (
        <p style={{ fontSize: 14, fontWeight: 600, marginTop: 20 }}>Check your inbox — your 10% code is on its way. 🌙</p>
      ) : (
        <>
          <form onSubmit={submit} style={{ display: 'flex', maxWidth: isMobile ? 380 : 460, margin: '22px auto 0', background: '#fff', borderRadius: 999, padding: 5, boxShadow: '0 8px 22px rgba(32,27,93,.14)' }}>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address"
              style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'Poppins,sans-serif', fontSize: 13, padding: '10px 16px', color: c.navy, minWidth: 0, outline: 'none' }} />
            <button type="submit" disabled={state === 'busy'} style={{ border: 'none', borderRadius: 999, background: c.navy, color: '#fff', fontWeight: 700, fontSize: 13, padding: '11px 20px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif' }}>{state === 'busy' ? '…' : 'Get 10% off'}</button>
          </form>
          {state === 'error' && <p style={{ fontSize: 11.5, color: '#b3423f', marginTop: 8 }}>Something went wrong — please try again.</p>}
          <p style={{ fontSize: 11, marginTop: 10, opacity: .65 }}>No spam. Unsubscribe anytime.</p>
        </>
      )}
      </Reveal>
    </section>
  );
}

export function TrustAccordion({ specs }) {
  const items = [
    ['Ordered before 11:00 PM, shipped today', "Orders placed before 11 PM ET leave our warehouse the same business day. You'll receive tracking as soon as it ships."],
    ['100-night sleep trial, money-back guarantee', 'Try the pillow for 100 nights. Not sleeping better? Send it back for free and get a full refund, no questions asked.'],
    ['Free shipping on every order', 'Shipping is free on all orders across the United States and Canada, and returns are free within the trial period.'],
    ['2-year warranty', 'Every flip\'nsleep product comes with a 2-year warranty on materials and workmanship. If anything fails, we repair, replace or refund it — no discussion.'],
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
