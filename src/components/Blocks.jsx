import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { c, rv, FONT_DISPLAY, FONT_SUB, R, SH, T, LH, SP, W, CARD, CARD_SOFT, CHIP, BTN_SM } from '../theme';
import { FAQ_ITEMS, IMG, BUNDLES, PRODUCT, productById, products, dim } from '../data';
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
// `height` mag een getal zijn of [desktop, mobiel]; `priority` zet fetchpriority
// op de hoofdfoto (LCP) in plaats van lazy loading.
export function ProductImageBlock({ src, alt = '', height = 240, radius = R.lg, bg = c.sky, style = {}, imgStyle = {}, priority = false }) {
  const [hd, hm] = Array.isArray(height) ? height : [height, height];
  const load = priority ? { fetchPriority: 'high' } : { loading: 'lazy' };
  return (
    <div className="r-h" style={{ position: 'relative', background: bg, borderRadius: radius, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', ...rv('h', hd, hm), ...style }}>
      <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', left: '-4%', top: '11%', width: '44%', opacity: 1, filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.14))' }} />
      <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', right: '-5%', bottom: '7%', width: '50%', opacity: 1, filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.14))' }} />
      <img src={src} {...dim(src)} {...load} decoding="async" alt={alt} style={{ position: 'relative', maxHeight: '80%', maxWidth: '80%', objectFit: 'contain', ...imgStyle }} />
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
    <div className="r-h" style={{ position: 'relative', width: '100%', background: bg, borderRadius: radius, overflow: 'hidden', ...rv('h', hd, hm) }}>
      <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', left: '-5%', top: '9%', width: '40%', opacity: 1, filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.14))' }} />
      <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', right: '-5%', bottom: '6%', width: '46%', opacity: 1, filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.14))' }} />
      {count >= 4 ? four : two}
    </div>
  );
}

// Summer Deals slider: wolkenachtergrond zoals de hero, productkaarten
// hangen half over de lucht heen (padding boven, beschrijving op het witte
// vlak eronder) — zoals in het Figma-ontwerp.
export function SummerDealsSlider() {
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
          const d = window.innerWidth < 768 ? 130 : 210;
          setTimeout(() => { el.scrollTo({ left: d, behavior: 'smooth' }); }, 300);
          setTimeout(() => { el.scrollTo({ left: 0, behavior: 'smooth' }); }, 1150);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Slepen met de muis om horizontaal te scrollen — native drag werkt op desktop niet.
  const drag = useRef({ down: false, startX: 0, left: 0, moved: false });
  const onDown = (e) => { const el = scroller.current; if (!el) return; drag.current = { down: true, startX: e.pageX, left: el.scrollLeft, moved: false }; };
  const onMove = (e) => { const el = scroller.current; if (!drag.current.down || !el) return; const dx = e.pageX - drag.current.startX; if (Math.abs(dx) > 4) drag.current.moved = true; el.scrollLeft = drag.current.left - dx; };
  const stop = () => { drag.current.down = false; };
  const onClickCapture = (e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } };

  const cardBase = { textDecoration: 'none', ...rv('flex', '0 0 320px', '0 0 78%'), ...CARD, overflow: 'hidden', display: 'flex', flexDirection: 'column' };
  const panel = { background: `linear-gradient(180deg, ${c.purple}, ${c.navy})`, color: c.white, ...rv('pad', ...SP.card), textAlign: 'center', flex: 1 };
  const chip = { ...CHIP, background: `linear-gradient(180deg, ${c.amber}, ${c.amberD})`, color: c.navy, whiteSpace: 'normal' };
  const badge = { ...CHIP, position: 'absolute', top: 16, left: 16, zIndex: 20, background: c.amber, color: c.navy };

  return (
    <section className="r-pad" style={{ position: 'relative', overflow: 'hidden', ...rv('pad', '0 0 48px', '0 0 32px'), marginTop: -1 }}>
      <style>{`.fns-scroll{scrollbar-width:none;-ms-overflow-style:none}.fns-scroll::-webkit-scrollbar{display:none}.fns-scroll img{-webkit-user-drag:none;user-drag:none}`}</style>
      <div aria-hidden="true" className="r-h" style={{ position: 'absolute', top: 0, left: 0, right: 0, ...rv('h', 430, 300), backgroundImage: `url(${IMG.sliderBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="r-pad" style={{ position: 'relative', maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', ...SP.sectionTop) }}>
        <Reveal><h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy }}>Summer <span style={{ fontFamily: FONT_SUB, fontWeight: 400 }}>Deals</span></h2></Reveal>
        <div ref={scroller}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={stop} onMouseLeave={stop} onClickCapture={onClickCapture}
          className="fns-scroll r-gap" style={{ display: 'flex', ...rv('gap', ...SP.gap), overflowX: 'auto', padding: '24px 4px 32px', cursor: 'grab', userSelect: 'none', WebkitOverflowScrolling: 'touch' }}>
          {/* Kussenbundels — kussenstapel (2 of 4 kussens) op de wolkenachtergrond */}
          {BUNDLES.map(b => {
            const p = getPrice(b, isCA);
            const cm = isCA ? b.compareAt.cad : b.compareAt.usd;
            return (
              <a key={b.id} href="/product/signature-cold-pillow" className="r-flex card-hover" style={cardBase}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <PillowDeck count={b.pillows} height={[210, 170]} radius={0} />
                  <span style={badge}>{b.short}</span>
                </div>
                <div className="r-pad" style={panel}>
                  <div className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, marginBottom: 6 }}>{b.pillows} × {PRODUCT.name}</div>
                  <div style={{ fontSize: T.sm[0], color: c.lilac, lineHeight: LH.body, marginBottom: 10 }}>{PRODUCT.tagline}</div>
                  <div className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.md), color: c.white, marginBottom: 14 }}>{formatPrice(p, symbol)} <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: T.xs[0], color: c.lilac }}>· {formatPrice(p / b.pillows, symbol)} each</span></div>
                  <span style={chip}>{b.short} — only {formatPrice(p, symbol)}</span>
                </div>
              </a>
            );
          })}
          {/* Overige afgeprijsde producten — volledige productfoto */}
          {products.map(prod => {
            const p = getPrice(prod, isCA);
            const cm = prod.compareAt ? (isCA ? prod.compareAt.cad : prod.compareAt.usd) : null;
            return (
              <a key={prod.id} href={`/product/${prod.id}`} className="r-flex card-hover" style={cardBase}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={prod.images[0]} {...dim(prod.images[0])} loading="lazy" decoding="async" alt={prod.name} className="r-h" style={{ display: 'block', width: '100%', ...rv('h', 210, 170), objectFit: 'cover' }} />
                  {prod.badge && <span style={badge}>{prod.badge.toLowerCase()}</span>}
                </div>
                <div className="r-pad" style={panel}>
                  <div className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, marginBottom: 6 }}>{prod.name}</div>
                  <div style={{ fontSize: T.sm[0], color: c.lilac, lineHeight: LH.body, marginBottom: 10 }}>{prod.tagline}</div>
                  <div className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.md), color: c.white, marginBottom: 14 }}>From {formatPrice(p, symbol)} {cm && <s style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: T.xs[0], color: c.lilac }}>{formatPrice(cm, symbol)}</s>}</div>
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
    <div style={{ ...CHIP, gap: 8, background: c.cream, border: `1px solid ${c.amberD}`, fontSize: T.xs[0], fontWeight: 600, color: c.navy, whiteSpace: 'normal' }}>
      📦 {label}
    </div>
  );
}

// Statische trustbalk onder de header — cijfers later inwisselen voor
// echte reviewaantallen zodra die er zijn.
export function TrustBar() {
  const items = [['🌙', '100-night sleep trial'], ['🚚', 'Free shipping, always'], ['✅', 'OEKO-TEX & CertiPUR-US certified'], ['🛡️', '2-year warranty']];
  return (
    <div className="fns-scroll r-gap r-jc" style={{ background: c.white, borderBottom: '1px solid rgba(32,27,93,.10)', display: 'flex', alignItems: 'center', ...rv('gap', 34, 18), ...rv('jc', 'center', 'flex-start'), overflowX: 'auto', padding: '9px 16px', whiteSpace: 'nowrap' }}>
      {items.map(([icon, label], i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: T.xs[0], fontWeight: 600, color: c.navy, fontFamily: FONT_SUB, flexShrink: 0, lineHeight: 1 }}>
          <span style={{ fontSize: T.sm[0], lineHeight: 1 }}>{icon}</span>{label}
        </span>
      ))}
    </div>
  );
}


// echt bestaan; alleen Pillows is nu shopbaar.
export function CollectionsBlock() {
  const items = [
    ['Pillows', IMG.front, '/product/signature-cold-pillow', false],
    ['Sheets', productById('bamboo-sheet-set').images[0], '/product/bamboo-sheet-set', false],
    ['Blankets', IMG.tileBlankets, '/product/cooling-weighted-blanket', false],
    ['Comforters', IMG.tileComforters, '/product/cooling-comforter', false],
    ['Silk Series', IMG.tileSilk, null, true],
    ['Mattress Toppers', IMG.tileToppers, null, true],
  ];
  return (
    <section className="r-pad" style={rv('pad', ...SP.sectionTop)}>
      <Reveal><h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, textAlign: 'center' }}>Discover our <span style={{ fontFamily: FONT_SUB }}>collections</span></h2></Reveal>
      <Reveal delay={120}><div className="grid-3m2 r-gap r-mw r-mar" style={{ ...rv('gap', ...SP.gap), ...rv('mw', W.page, W.narrow), ...rv('mar', '32px auto 0', '24px auto 0') }}>
        {items.map(([label, img, to, soon], i) => {
          const inner = (
            <div className={to ? 'card-hover' : undefined} style={{ position: 'relative', borderRadius: R.lg, boxShadow: SH.card, overflow: 'hidden', aspectRatio: '.85', display: 'flex', alignItems: 'flex-end', filter: soon ? 'saturate(.45) brightness(.92)' : 'none' }}>
              <img src={img} {...dim(img)} loading="lazy" decoding="async" alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(20,16,64,.65))' }} />
              {soon && <span style={{ ...CHIP, position: 'absolute', top: 12, right: 12, background: c.amber, color: c.navy, fontSize: T.xs[0] }}>Coming soon</span>}
              <span className="r-fs r-pad" style={{ position: 'relative', color: c.white, fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, ...rv('pad', 20, 16), textShadow: SH.textHero }}>{label}</span>
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

// Herbruikbaar rijtje productkaarten: het kussen plus de drie producten.
// Gebruikt onder aan pagina's als verwijzing naar het assortiment.
export function RangeCards({ title = 'Complete your bed', intro }) {
  const { symbol, isCA } = useCurrency();
  const cards = [
    { to: '/product/signature-cold-pillow', name: PRODUCT.name, tagline: PRODUCT.tagline, img: IMG.coverFront, pillow: true, price: getPrice(BUNDLES[0], isCA), compareAt: null, badge: 'Bestseller', from: false },
    ...products.map(p => ({ to: `/product/${p.id}`, name: p.name, tagline: p.tagline, img: p.images[0], pillow: false, price: getPrice(p, isCA), compareAt: p.compareAt ? (isCA ? p.compareAt.cad : p.compareAt.usd) : null, badge: p.badge, from: true })),
  ];
  return (
    <section className="r-pad" style={rv('pad', ...SP.section)}>
      <Reveal><h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, textAlign: 'center', marginBottom: intro ? 8 : 24 }}>{title}</h2></Reveal>
      {intro && <Reveal><p className="r-fs" style={{ textAlign: 'center', ...rv('fs', ...T.md), color: c.grayD, maxWidth: W.narrow, margin: '0 auto 32px', lineHeight: LH.body }}>{intro}</p></Reveal>}
      <div className="grid-4m2 r-gap" style={{ ...rv('gap', ...SP.gap), maxWidth: W.page, margin: '0 auto' }}>
        {cards.map((cd, i) => (
          <Reveal key={i} delay={i * 70}><Link to={cd.to} className="card-hover" style={{ textDecoration: 'none', ...CARD, overflow: 'hidden', display: 'block', height: '100%' }}>
            <div className="r-h" style={{ position: 'relative', ...rv('h', 170, 130), background: c.cream, overflow: 'hidden' }}>
              {cd.pillow
                ? <PillowDeck count={2} height={[170, 130]} radius={0} />
                : <img src={cd.img} {...dim(cd.img)} loading="lazy" decoding="async" alt={cd.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
              {cd.badge && <span style={{ ...CHIP, position: 'absolute', top: 12, left: 12, zIndex: 20, background: c.amber, color: c.navy, fontSize: T.xs[0] }}>{cd.badge}</span>}
            </div>
            <div className="r-pad" style={rv('pad', 24, 16)}>
              <h3 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.lg), color: c.navy, marginBottom: 6, lineHeight: LH.head }}>{cd.name}</h3>
              <div className="d-only" style={{ fontSize: T.sm[0], color: c.grayD, marginBottom: 10, lineHeight: LH.body }}>{cd.tagline}</div>
              <div className="r-fs" style={{ ...rv('fs', ...T.md), fontWeight: 700, color: c.navy }}>{cd.from ? 'From ' : ''}{formatPrice(cd.price, symbol)} {cd.compareAt && <s style={{ fontWeight: 400, color: c.gray, fontSize: T.xs[0] }}>{formatPrice(cd.compareAt, symbol)}</s>}</div>
            </div>
          </Link></Reveal>
        ))}
      </div>
    </section>
  );
}

export function Stars({ n = 5, size = T.sm[0] }) {
  return (
    <span aria-label={`${n} out of 5 stars`} style={{ color: c.amberD, fontSize: size, letterSpacing: 2 }}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

export function ReviewsBlock() {
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
      <img src={IMG.cloudsUp} {...dim(IMG.cloudsUp)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ display: 'block', width: '100%', marginBottom: -1 }} />
      <section className="r-pad" style={{ background: `linear-gradient(180deg, ${c.purple}, ${c.navy})`, color: c.white, ...rv('pad', ...SP.section) }}>
        <Reveal>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, textAlign: 'center' }}>What our <span style={{ fontFamily: FONT_SUB }}>customers say</span></h2>
        <div style={{ textAlign: 'center', margin: '10px 0 6px' }}><Stars n={Math.round(data.avg)} /> <span style={{ fontSize: T.sm[0], marginLeft: 6 }}>{data.avg} · {data.count} verified review{data.count === 1 ? '' : 's'}</span></div>
        </Reveal>
        <Reveal delay={120}>
        <div className="fns-scroll r-gap" style={{ display: 'flex', ...rv('gap', ...SP.gap), overflowX: 'auto', padding: '24px 4px 8px', maxWidth: W.page, margin: '0 auto', scrollSnapType: 'x mandatory' }}>
          {shown.map((r, i) => (
            <div key={i} className="r-flex r-minw r-pad" style={{ scrollSnapAlign: 'center', ...rv('flex', '1 1 0', '0 0 86%'), ...rv('minw', 300, 0), ...CARD_SOFT, color: c.navy, ...rv('pad', ...SP.card) }}>
              <Stars n={r.rating} />
              <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, margin: '10px 0 14px' }}>"{r.body}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: T.xs[0] }}>
                <b style={{ fontFamily: FONT_SUB, fontSize: T.sm[0] }}>{r.name}</b>
                <span style={{ color: c.grayD }}>{r.verified ? 'Verified buyer' : r.date}</span>
              </div>
            </div>
          ))}
        </div>
        </Reveal>
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <Link to="/reviews" style={{ color: c.lilac, fontSize: T.sm[0], textDecoration: 'underline' }}>Read all reviews</Link>
        </div>
      </section>
      <img src={IMG.cloudsDown} {...dim(IMG.cloudsDown)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ display: 'block', width: '100%', marginTop: -1 }} />
    </div>
  );
}

export function FAQBlock({ items = FAQ_ITEMS, dark = false, limit }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <div style={{ maxWidth: W.text, margin: '0 auto' }}>
      {list.map(([q, a], i) => (
        <details key={i} style={{ borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.25)' : 'rgba(32,27,93,.16)'}` }}>
          <summary className="r-fs" style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '18px 2px', ...rv('fs', ...T.md), lineHeight: LH.head, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SUB }}>
            {q}<span style={{ fontFamily: FONT_DISPLAY, fontSize: T.h4[0] }}>+</span>
          </summary>
          <p className="r-fs" style={{ ...rv('fs', ...T.sm), lineHeight: LH.loose, padding: '0 2px 18px', opacity: .85 }}>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setState('busy');
    try { await subscribe(email, 'welcome10'); setState('done'); }
    catch { setState('error'); }
  };

  return (
    <section className="r-pad" style={{ background: c.sky, ...rv('pad', ...SP.section), textAlign: 'center' }}>
      <Reveal>
      <img src={IMG.iconCloud} {...dim(IMG.iconCloud)} loading="lazy" decoding="async" alt="" style={{ height: 30, marginBottom: 8 }} />
      <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy }}>Sleep better, <span style={{ fontFamily: FONT_SUB }}>pay less</span></h2>
      <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, maxWidth: 400, margin: '12px auto 0' }}>Get 10% off your first order and our best sleep tips for warm nights.</p>
      {state === 'done' ? (
        <p className="r-fs" style={{ ...rv('fs', ...T.md), fontWeight: 600, marginTop: 24 }}>Check your inbox — your 10% code is on its way. 🌙</p>
      ) : (
        <>
          <form onSubmit={submit} className="r-mw" style={{ display: 'flex', alignItems: 'center', ...rv('mw', 460, 380), margin: '24px auto 0', background: c.white, borderRadius: R.pill, padding: 5, boxShadow: SH.card }}>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" className="r-fs"
              style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'inherit', ...rv('fs', ...T.md), padding: '10px 16px', color: c.navy, minWidth: 0, outline: 'none' }} />
            <button type="submit" disabled={state === 'busy'} style={{ ...BTN_SM, flexShrink: 0 }}>{state === 'busy' ? '…' : 'Get 10% off'}</button>
          </form>
          {state === 'error' && <p style={{ fontSize: T.xs[0], color: c.danger, marginTop: 8 }}>Something went wrong — please try again.</p>}
          <p style={{ fontSize: T.xs[0], marginTop: 12, opacity: .65 }}>No spam. Unsubscribe anytime.</p>
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
    <div className="r-pad" style={{ background: c.navy, color: c.white, borderRadius: R.lg, ...rv('pad', '8px 28px 12px', '6px 20px 10px') }}>
      {items.map(([q, a], i) => (
        <details key={i} style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,.25)' : 'none' }}>
          <summary style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '16px 2px', fontSize: T.sm[0], lineHeight: LH.head, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SUB }}>
            {q}<span style={{ fontFamily: FONT_DISPLAY, fontSize: T.h4[1] }}>+</span>
          </summary>
          <div style={{ fontSize: T.sm[0], lineHeight: LH.body, padding: '0 2px 16px', opacity: .88 }}>{a}</div>
        </details>
      ))}
    </div>
  );
}
