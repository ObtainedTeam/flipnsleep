import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { c, rv, FONT_DISPLAY, FONT_SUB, R, SH, T, LH, SP, W, CARD, CARD_SOFT, CHIP, BTN, BTNO, BTN_SM } from '../theme';
import { FAQ_ITEMS, IMG, BUNDLES, PRODUCT, products, dim } from '../data';
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
              <div className="r-fs" style={{ ...rv('fs', ...T.md), fontWeight: 700, color: c.navy, marginBottom: 14 }}>{cd.from ? 'From ' : ''}{formatPrice(cd.price, symbol)} {cd.compareAt && <s style={{ fontWeight: 400, color: c.gray, fontSize: T.xs[0] }}>{formatPrice(cd.compareAt, symbol)}</s>}</div>
              <span style={BTN_SM}>View</span>
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

export function TrustAccordion({ specs }) {
  const items = [
    ['Ordered before 11:00 PM, shipped today', "Orders placed before 11 PM ET leave our warehouse the same business day. You'll receive tracking as soon as it ships."],
    ['100-night sleep trial, money-back guarantee', 'Try the pillow for 100 nights. Not sleeping better? Send it back for free and get a full refund, no questions asked.'],
    ['Free shipping on every order', 'Shipping is free on all orders across the United States and Canada, and returns are free within the trial period.'],
    ['2-year warranty', 'Every flip\'nsleep product comes with a 2-year warranty on materials and workmanship. If anything fails, we repair, replace or refund it, no discussion.'],
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
              <div style={{ fontSize: T.xs[0], fontWeight: 700, color: c.purple, marginBottom: 4, fontFamily: FONT_SUB }}>{ours}</div>
              <div style={{ fontSize: T.sm[1], lineHeight: LH.body, color: c.navy }}>{us}</div>
            </div>
            <div style={{ background: c.cream, borderRadius: R.sm, padding: 12 }}>
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
// Sectiekop: H2 (optioneel met Masiva-accent) + intro, gecentreerd.
// ---------------------------------------------------------------------------
export function SectionHead({ title, accent, intro, align = 'center', mb = 32 }) {
  return (
    <Reveal><div style={{ textAlign: align, maxWidth: W.page, margin: align === 'center' ? `0 auto ${mb}px` : `0 0 ${mb}px` }}>
      <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy }}>
        {title}{accent && <> <span style={{ fontFamily: FONT_SUB }}>{accent}</span></>}
      </h2>
      {intro && <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, margin: '12px auto 0', maxWidth: W.narrow }}>{intro}</p>}
    </div></Reveal>
  );
}

const BTNO_SM = { ...BTNO, height: BTN_SM.height, padding: BTN_SM.padding, fontSize: BTN_SM.fontSize };

// ---------------------------------------------------------------------------
// "Explore our most loved sleep products": productgrid naar Mellow-model.
// Elk product komt hier één keer voor; Silk Series en Mattress Toppers als
// 'coming soon'-kaarten met link naar de nieuwsbrief in de footer.
// ---------------------------------------------------------------------------
export function ProductGrid() {
  const { symbol, isCA } = useCurrency();
  const imgH = rv('h', 240, 150);
  const items = [
    ...BUNDLES.map(b => ({
      key: b.id, to: '/product/signature-cold-pillow', pillows: b.pillows,
      name: `Cold Pillow ${b.pillows === 2 ? '1+1' : '2+2'}`,
      desc: b.pillows === 2 ? 'Two adjustable cooling pillows, one price.' : 'Four pillows for both sides of the bed.',
      badge: b.pillows === 2 ? 'Bestseller' : 'Best value',
      price: getPrice(b, isCA), compare: isCA ? b.compareAt.cad : b.compareAt.usd, from: false,
    })),
    ...products.map(p => ({
      key: p.id, to: `/product/${p.id}`, img: p.images[0], name: p.name, desc: p.tagline, badge: 'New',
      price: getPrice(p, isCA), compare: p.compareAt ? (isCA ? p.compareAt.cad : p.compareAt.usd) : null, from: true,
    })),
  ];
  const soon = [['Silk Series', IMG.tileSilk, 'Mulberry silk pillowcases that stay smooth and cool.'], ['Mattress Toppers', IMG.tileToppers, 'A cooler layer between you and your mattress.']];
  const badgeStyle = (dark) => ({ ...CHIP, position: 'absolute', top: 12, left: 12, zIndex: 20, fontSize: T.xs[0], background: dark ? c.navy : c.amber, color: dark ? c.white : c.navy });
  const body = { display: 'flex', flexDirection: 'column', flex: 1, ...rv('pad', 20, 14) };
  const nameStyle = { fontFamily: FONT_DISPLAY, ...rv('fs', ...T.lg), lineHeight: LH.head, color: c.navy, marginBottom: 6 };
  const descStyle = { fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD, marginBottom: 12 };

  return (
    <section className="r-pad" style={rv('pad', ...SP.section)}>
      <SectionHead title="Explore our most loved" accent="sleep products" intro="Cooling comfort from head to toe, built on one simple idea: stay comfortable without trapping heat." />
      <div className="grid-4m2 r-gap" style={{ ...rv('gap', ...SP.gap), maxWidth: W.page, margin: '0 auto' }}>
        {items.map((it, i) => (
          <Reveal key={it.key} delay={i * 60} style={{ height: '100%' }}>
            <Link to={it.to} className="card-hover" style={{ ...CARD, textDecoration: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="r-h" style={{ position: 'relative', ...imgH, background: c.sky, overflow: 'hidden', flexShrink: 0 }}>
                {it.pillows
                  ? <PillowDeck count={it.pillows} height={[240, 150]} />
                  : <img src={it.img} {...dim(it.img)} loading="lazy" decoding="async" alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                <span style={badgeStyle(it.badge === 'Best value')}>{it.badge}</span>
              </div>
              <div className="r-pad" style={body}>
                <h3 className="r-fs" style={nameStyle}>{it.name}</h3>
                <p style={descStyle}>{it.desc}</p>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 8px', marginBottom: 14 }}>
                    <span className="r-fs" style={{ ...rv('fs', ...T.md), fontWeight: 700, color: c.navy }}>{it.from ? 'From ' : ''}{formatPrice(it.price, symbol)}</span>
                    {it.compare && <s style={{ fontSize: T.sm[0], color: c.gray }}>{formatPrice(it.compare, symbol)}</s>}
                    {it.compare && <span style={{ ...CHIP, fontSize: T.xs[0], padding: '4px 10px', background: c.sky, color: c.purple }}>Save {formatPrice(it.compare - it.price, symbol)}</span>}
                  </div>
                  <span style={{ ...BTN_SM, width: '100%' }}>Shop now</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
        {soon.map(([name, img, desc], i) => (
          <Reveal key={name} delay={(items.length + i) * 60} style={{ height: '100%' }}>
            <div style={{ ...CARD, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="r-h" style={{ position: 'relative', ...imgH, overflow: 'hidden', flexShrink: 0 }}>
                <img src={img} {...dim(img)} loading="lazy" decoding="async" alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(.6)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(249,248,243,.45)' }} />
                <span style={badgeStyle(true)}>Coming soon</span>
              </div>
              <div className="r-pad" style={body}>
                <h3 className="r-fs" style={{ ...nameStyle, color: c.grayD }}>{name}</h3>
                <p style={descStyle}>{desc}</p>
                <div style={{ marginTop: 'auto' }}>
                  <a href="#newsletter" style={{ ...BTNO_SM, width: '100%' }}>Notify me</a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Video-rij ("Sleep better with flip'nsleep"). Kaarten zonder src zijn niet
// klikbaar; met src openen ze een toegankelijke modal met <video controls>.
// ---------------------------------------------------------------------------
function PlayIcon({ size = 56 }) {
  return (
    <span aria-hidden="true" style={{ width: size, height: size, borderRadius: R.pill, background: 'rgba(255,255,255,.92)', boxShadow: SH.card, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size * .38} height={size * .38} viewBox="0 0 24 24" fill={c.navy}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
    </span>
  );
}

function VideoModal({ video, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!video) return;
    const prev = document.activeElement;
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev && prev.focus && prev.focus(); };
  }, [video, onClose]);
  if (!video) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={video.caption} onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(20,16,64,.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: SP.gutter[1] }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: 'min(420px, 100%)' }}>
        <video src={video.src} poster={video.poster} controls autoPlay playsInline style={{ display: 'block', width: '100%', aspectRatio: '9 / 16', background: c.night, borderRadius: R.lg, boxShadow: SH.float }} />
        <button ref={closeRef} onClick={onClose} aria-label="Close video"
          style={{ position: 'absolute', top: 12, right: 12, width: 40, height: 40, borderRadius: R.pill, border: 'none', background: c.white, color: c.navy, fontSize: T.h4[0], lineHeight: 1, cursor: 'pointer', boxShadow: SH.card }}>×</button>
      </div>
    </div>
  );
}

export function VideoRow({ videos }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="r-pad" style={{ ...rv('pad', ...SP.section), overflow: 'hidden' }}>
      <SectionHead title="Sleep better with" accent="flip'nsleep" intro="Watch why hot sleepers are making the switch." />
      <Reveal delay={100}><div style={{ maxWidth: W.page, margin: '0 auto' }}><div className="vid-row r-gap" style={rv('gap', ...SP.gap)}>
        {videos.map((v, i) => {
          const inner = (
            <>
              <img src={v.poster} {...dim(v.poster)} loading="lazy" decoding="async" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,16,64,0) 45%, rgba(20,16,64,.78))' }} />
              {!v.src && <span style={{ ...CHIP, position: 'absolute', top: 12, left: 12, fontSize: T.xs[0], background: c.cream, color: c.navy }}>Video coming soon</span>}
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: v.src ? 1 : .85 }}><PlayIcon /></span>
              <span style={{ position: 'absolute', left: 16, right: 16, bottom: 16, color: c.white, fontFamily: FONT_SUB, fontSize: T.md[0], lineHeight: LH.head, textShadow: SH.text, textAlign: 'left' }}>{v.caption}</span>
            </>
          );
          const box = { position: 'relative', display: 'block', width: '100%', aspectRatio: '9 / 16', borderRadius: R.lg, overflow: 'hidden', boxShadow: SH.card, background: c.night, border: 'none', padding: 0 };
          return v.src
            ? <button key={i} type="button" className="card-hover" onClick={() => setOpen(v)} aria-label={`Play video: ${v.caption}`} style={{ ...box, cursor: 'pointer', fontFamily: 'inherit' }}>{inner}</button>
            : <div key={i} className="card-hover" style={box}>{inner}</div>;
        })}
      </div></div></Reveal>
      <VideoModal video={open} onClose={() => setOpen(null)} />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Reviews (Judge.me via /api/reviews). Zonder echte reviews rendert dit niets.
// ---------------------------------------------------------------------------
function Arrow({ dir, onClick }) {
  return (
    <button type="button" onClick={onClick} aria-label={dir < 0 ? 'Previous reviews' : 'Next reviews'}
      style={{ width: 44, height: 44, borderRadius: R.pill, border: `2px solid ${c.navy}`, background: c.white, color: c.navy, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dir < 0 ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}

export function ReviewsBlock() {
  const [data, setData] = useState(null); // { reviews, count, avg } uit /api/reviews (Judge.me)
  const row = useRef(null);

  useEffect(() => {
    fetch('/api/reviews').then((r) => r.json()).then(setData).catch(() => setData(null));
  }, []);

  // Geen echte reviews = geen sectie (ook geen placeholdertekst).
  const reviews = (data && data.reviews) || [];
  if (reviews.length === 0) return null;
  const shown = reviews.slice(0, 12);
  const scroll = (d) => { const el = row.current; if (el) el.scrollBy({ left: d * el.clientWidth * .9, behavior: 'smooth' }); };
  const starStr = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <section className="r-pad" style={rv('pad', ...SP.section)}>
      <div style={{ maxWidth: W.page, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <div>
            <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy }}>What happy sleepers <span style={{ fontFamily: FONT_SUB }}>are saying</span></h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <span aria-label={`${data.avg} out of 5 stars`} style={{ color: c.amber, fontSize: T.h4[0], letterSpacing: 2 }}>{starStr(Math.round(data.avg))}</span>
              <span style={{ fontSize: T.sm[0], color: c.grayD }}><b style={{ color: c.navy }}>{data.avg}</b> · {data.count} review{data.count === 1 ? '' : 's'}</span>
            </div>
          </div>
          <div className="d-only" style={{ display: 'flex', gap: 10 }}><Arrow dir={-1} onClick={() => scroll(-1)} /><Arrow dir={1} onClick={() => scroll(1)} /></div>
        </div>
        <div ref={row} className="snap-row r-gap" style={{ ...rv('gap', ...SP.gap), padding: '4px 4px 36px' }}>
          {shown.map((r, i) => (
            <article key={i} className="rev-card r-pad" style={{ ...CARD, ...rv('pad', ...SP.card), display: 'flex', flexDirection: 'column' }}>
              <span aria-label={`${r.rating} out of 5 stars`} style={{ color: c.amber, fontSize: T.md[0], letterSpacing: 2 }}>{starStr(r.rating)}</span>
              {r.title && <h3 style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: T.md[0], lineHeight: LH.head, color: c.navy, margin: '10px 0 0' }}>{r.title}</h3>}
              <p className="clamp-5" style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD, margin: '8px 0 16px' }}>{r.body}</p>
              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                <b style={{ fontFamily: FONT_SUB, fontSize: T.sm[0], color: c.navy }}>{(r.name || '').split(' ')[0]}</b>
                {r.verified && <span style={{ ...CHIP, fontSize: T.xs[0], padding: '4px 10px', background: c.sky, color: c.purple }}>Verified buyer</span>}
              </div>
              {r.product && <div style={{ fontSize: T.xs[0], color: c.gray, marginTop: 6 }}>{r.product}</div>}
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}><Link to="/reviews" style={BTNO}>Read all reviews</Link></div>
      </div>
    </section>
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
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.white }}>Sleep better, <span style={{ fontFamily: FONT_SUB }}>pay less</span></h2>
        <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.lilac, marginTop: 8 }}>Get 10% off your first order, plus our best tips for cooler nights.</p>
      </div>
      <div style={{ minWidth: 0 }}>
        {state === 'done' ? (
          <p style={{ fontSize: T.md[0], fontWeight: 600, color: c.white }}>Check your inbox. Your 10% code is on its way.</p>
        ) : (
          <>
            <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', background: c.white, borderRadius: R.pill, padding: 5, boxShadow: SH.card, maxWidth: 480 }}>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address"
                style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: T.md[1], padding: '10px 16px', color: c.navy, minWidth: 0, outline: 'none' }} />
              <button type="submit" disabled={state === 'busy'} style={{ ...BTN, height: BTN_SM.height, padding: BTN_SM.padding, fontSize: BTN_SM.fontSize, flexShrink: 0 }}>{state === 'busy' ? '…' : 'Get 10% off'}</button>
            </form>
            {state === 'error' && <p style={{ fontSize: T.xs[0], color: c.pastelPink, marginTop: 8 }}>Something went wrong, please try again.</p>}
            <p style={{ fontSize: T.xs[0], color: c.gray, marginTop: 10 }}>No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}
