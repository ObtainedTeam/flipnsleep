import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { c, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W, CARD, CHIP, BTN_SM, BTNO } from '../../theme';
import { BUNDLES, dim } from '../../data';
import { useCurrency, formatPrice, getPrice } from '../../currency.jsx';
import Reveal from '../Reveal';
import './product.css';

// Bouwstenen voor de productpagina's (Mellow/Cloudpillo-indeling).
// Niets hangt af van de vensterbreedte tijdens renderen: CSS kiest per viewport.

// Judge.me via /api/reviews: { reviews, count, avg }. Eén fetch per pagina.
export function useReviews() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/api/reviews').then(r => r.json()).then(setData).catch(() => setData(null)); }, []);
  return data;
}
const realReviews = (rvw) => ((rvw && rvw.reviews) || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));

const starStr = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
const EXAMPLE_CHIP = { ...CHIP, fontSize: T.xs[0], padding: '4px 10px', background: c.cream, color: c.grayD };
const H2S = { fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy };
// Alleen de onderkant van een SP-waarde, bv. "80px 40px" -> "0 40px 80px"
const bottomOnly = (s) => { const [v, h] = s.split(' '); return `0 ${h} ${v}`; };
export const padBottom = (...vals) => rv('pad', ...vals.map(bottomOnly));

// Gedempte achtergrond-video (zelfde patroon als Home: innerHTML zodat muted/autoplay ook in SSR-HTML staan).
function MutedVideo({ src, poster }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{
      __html: `<video muted loop playsinline webkit-playsinline autoplay preload="none"${poster ? ` poster="${poster}"` : ''} style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><source src="${src}" type="video/mp4"></video>`,
    }} />
  );
}

// ---------------------------------------------------------------------------
// Kleine reviewkaart onder de galerij-thumbnails
// ---------------------------------------------------------------------------
export function GalleryReview({ rvw, productName, example }) {
  const real = realReviews(rvw)[0];
  const r = real ? { rating: real.rating, body: real.body || real.title, name: (real.name || '').split(' ')[0] } : { rating: 5, body: example.body, name: example.name };
  return (
    <div style={{ ...CARD, padding: '16px 20px', marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
        <span aria-label={`${r.rating} out of 5 stars`} style={{ color: c.amberD, fontSize: T.md[0], letterSpacing: 2 }}>{starStr(r.rating)}</span>
        {!real && <span style={EXAMPLE_CHIP}>Example review</span>}
      </div>
      <p className="clamp-2" style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.navy, margin: 0 }}>“{r.body}”</p>
      <div style={{ fontSize: T.xs[0], color: c.grayD, marginTop: 8, fontFamily: FONT_SUB }}>{r.name} · {productName}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Accordeon (Mellow-stijl): dunne lijnen, grote rijen, plus dat naar x draait.
// items: [[titel, tekst | string[]], ...]
// ---------------------------------------------------------------------------
export function Accordion({ items, open = 0, size = 'md' }) {
  return (
    <div className="pd-acc">
      {items.map(([q, a], i) => (
        <details key={i} open={i === open}>
          <summary className="r-fs" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '20px 2px', ...rv('fs', ...(size === 'lg' ? T.h4 : T.lg)), lineHeight: LH.head, fontWeight: 600, fontFamily: FONT_SUB, color: c.navy }}>
            {q}
            <svg className="pd-acc-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M12 4v16M4 12h16" /></svg>
          </summary>
          <div className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, padding: '0 2px 22px' }}>
            {Array.isArray(a)
              ? <ul style={{ listStyle: 'none', display: 'grid', gap: 6 }}>{a.map((li, j) => <li key={j} style={{ display: 'flex', gap: 10 }}><span style={{ color: c.amberD, flexShrink: 0 }}>✓</span>{li}</li>)}</ul>
              : a.split('\n\n').map((p, j) => <p key={j} style={{ margin: j ? '12px 0 0' : 0 }}>{p}</p>)}
          </div>
        </details>
      ))}
    </div>
  );
}

// Uitleg direct onder de koopsectie: kop links, accordeon rechts.
export function ExplainAccordion({ eyebrow, title, intro, items, chips }) {
  return (
    <section className="r-pad" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', ...SP.section) }}>
      <div className="pd-two r-gap" style={rv('gap', 56, 24)}>
        <Reveal><div>
          <div style={EYEBROW}>{eyebrow}</div>
          <h2 className="r-fs" style={{ ...H2S, margin: '8px 0 16px' }}>{title}</h2>
          {intro && <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.grayD, lineHeight: LH.body }}>{intro}</p>}
          {chips && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
            {chips.map((h, i) => <span key={i} style={{ ...CHIP, background: c.sky, color: c.navy }}>{h.icon} {h.label}</span>)}
          </div>}
        </div></Reveal>
        <Reveal delay={100}><Accordion items={items} /></Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Bento: afwisselende rijen media (4:3) + tekst
// ---------------------------------------------------------------------------
export function Bento({ rows, eyebrow, title }) {
  return (
    <section className="r-pad" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', ...SP.section) }}>
      {title && <Reveal><div style={{ textAlign: 'center', maxWidth: W.text, margin: '0 auto 40px' }}>
        {eyebrow && <div style={EYEBROW}>{eyebrow}</div>}
        <h2 className="r-fs" style={{ ...H2S, marginTop: 8 }}>{title}</h2>
      </div></Reveal>}
      <div style={{ display: 'grid', ...rv('gap', 64, 40) }} className="r-gap">
        {rows.map((r, i) => (
          <div key={i} className={`pd-bento-row r-gap${i % 2 ? ' is-rev' : ''}`} style={rv('gap', 56, 20)}>
            <Reveal className="pd-bento-media"><div style={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: R.lg, overflow: 'hidden', boxShadow: SH.card, background: `linear-gradient(160deg, ${c.sky} 0%, ${c.sky2} 100%)` }}>
              {r.video
                ? <MutedVideo src={r.video} poster={r.image} />
                : <img src={r.image} {...dim(r.image)} loading="lazy" decoding="async" alt={r.title} style={{ position: 'absolute', inset: '10%', width: '80%', height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 18px 24px rgba(32,27,93,.20))' }} />}
            </div></Reveal>
            <Reveal delay={100}><div style={{ maxWidth: W.narrow }}>
              <h3 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>{r.title}</h3>
              <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD }}>{r.text}</p>
            </div></Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Split-beeldpaar over de volle breedte, met onderschrift linksonder
// ---------------------------------------------------------------------------
const SPLIT_BG = {
  sky: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 55%, ${c.skyDeep} 100%)`,
  lilac: `linear-gradient(180deg, ${c.cream} 0%, ${c.lilac} 100%)`,
};
export function SplitImages({ items }) {
  return (
    <section className="pd-split" aria-label="Product close-ups">
      {items.map((it, i) => (
        <div key={i} className="pd-split-cell" style={{ background: SPLIT_BG[it.bg] || c.cream }}>
          <img src={it.image} {...dim(it.image)} loading="lazy" decoding="async" alt={it.caption}
            style={it.fit === 'contain'
              ? { position: 'absolute', inset: '12%', width: '76%', height: '76%', objectFit: 'contain', filter: 'drop-shadow(0 24px 30px rgba(32,27,93,.22))' }
              : { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', background: 'linear-gradient(180deg, rgba(20,16,64,0) 0%, rgba(20,16,64,.28) 100%)' }} />
          <div className="r-fs r-left r-bottom" style={{ position: 'absolute', ...rv('left', 40, 20), ...rv('bottom', 36, 24), right: 20, fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.tight, color: c.white, textShadow: SH.textHero }}>{it.caption}</div>
        </div>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// "Designed for real sleep": accordeon links, grote videokaart rechts
// ---------------------------------------------------------------------------
export function DesignedForSleep({ items, media }) {
  return (
    <section className="r-pad" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', ...SP.section) }}>
      <div className="pd-two is-center r-gap" style={rv('gap', 64, 32)}>
        <Reveal><div>
          <div style={EYEBROW}>The flip'nsleep design</div>
          <h2 className="r-fs" style={{ ...H2S, margin: '8px 0 24px' }}>Designed for real sleep</h2>
          <Accordion items={items} size="lg" />
        </div></Reveal>
        <Reveal delay={100}><div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: R.lg, overflow: 'hidden', boxShadow: SH.strong, background: c.night }}>
          <MutedVideo src={media.src} poster={media.poster} />
        </div></Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Stats met tel-animatie. SSR rendert de eindwaarde; in de browser telt het
// op zodra het blok in beeld komt.
// ---------------------------------------------------------------------------
function CountUp({ value, decimals = 0 }) {
  const ref = useRef(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0; let done = false;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // al in beeld: eindwaarde laten staan
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done) return;
      done = true; io.disconnect();
      const t0 = performance.now(); const dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur); const eased = 1 - Math.pow(1 - p, 3);
        setN(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{n.toFixed(decimals)}</span>;
}

export function HotSleeperStats({ stats, title = 'Made for hot sleepers', text }) {
  return (
    <section className="r-pad" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', ...SP.section) }}>
      <div className="pd-two is-center r-gap" style={rv('gap', 56, 28)}>
        <Reveal><div>
          <div style={EYEBROW}>Sleep cooler, risk-free</div>
          <h2 className="r-fs" style={{ ...H2S, margin: '8px 0 16px' }}>{title}</h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.grayD, lineHeight: LH.body, maxWidth: W.narrow }}>{text}</p>
        </div></Reveal>
        <Reveal delay={100}><div style={{ display: 'grid', gap: 0 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '18px 0', borderTop: i ? '1px solid rgba(32,27,93,.16)' : 'none' }}>
              <div className="r-fs r-minw" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.display), ...rv('minw', 170, 110), lineHeight: LH.tight, color: c.purple }}>
                {s.text ? s.text : <CountUp value={s.value} decimals={s.decimals} />}
              </div>
              <div className="r-fs" style={{ fontFamily: FONT_SUB, ...rv('fs', ...T.lg), lineHeight: LH.head, color: c.navy }}>{s.label}</div>
            </div>
          ))}
        </div></Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Reviews op de productpagina: echte Judge.me-reviews, anders 3 voorbeelden
// ---------------------------------------------------------------------------
export function ProductReviews({ rvw, productName, examples }) {
  const real = realReviews(rvw);
  const has = real.length > 0;
  const list = has ? real.slice(0, 6) : examples.map(e => ({ ...e, rating: 5, example: true }));
  return (
    <section id="reviews" className="r-pad" style={rv('pad', ...SP.section)}>
      <div style={{ maxWidth: W.page, margin: '0 auto' }}>
        <Reveal><div style={{ textAlign: 'center', maxWidth: W.text, margin: '0 auto 32px' }}>
          <h2 className="r-fs" style={H2S}>What sleepers say about the {productName}</h2>
          {has
            ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 10 }}>
                <span aria-label={`${rvw.avg} out of 5 stars`} style={{ color: c.amberD, fontSize: T.h4[0], letterSpacing: 2 }}>{starStr(Math.round(rvw.avg))}</span>
                <span style={{ fontSize: T.sm[0], color: c.grayD }}><b style={{ color: c.navy }}>{rvw.avg}</b> · {rvw.count} review{rvw.count === 1 ? '' : 's'}</span>
              </div>
            : <p style={{ fontSize: T.sm[0], color: c.grayD, marginTop: 10, lineHeight: LH.body }}>Reviews from verified buyers appear here automatically.</p>}
        </div></Reveal>
        <div className="grid-3m1 r-gap" style={rv('gap', ...SP.gap)}>
          {list.slice(0, has ? 6 : 3).map((r, i) => (
            <Reveal key={i} delay={i * 70}><article className="r-pad" style={{ ...CARD, ...rv('pad', ...SP.card), height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span aria-label={`${r.rating} out of 5 stars`} style={{ color: c.amberD, fontSize: T.md[0], letterSpacing: 2 }}>{starStr(r.rating)}</span>
                {r.example && <span style={EXAMPLE_CHIP}>Example review</span>}
              </div>
              {r.title && <h3 style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: T.md[0], lineHeight: LH.head, color: c.navy, margin: '12px 0 0' }}>{r.title}</h3>}
              <p className="clamp-5" style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD, margin: '8px 0 16px' }}>{r.body}</p>
              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                <b style={{ fontFamily: FONT_SUB, fontSize: T.sm[0], color: c.navy }}>{(r.name || '').split(' ').slice(0, r.example ? 2 : 1).join(' ')}</b>
                {r.verified && <span style={{ ...CHIP, fontSize: T.xs[0], padding: '4px 10px', background: c.sky, color: c.purple }}>Verified buyer</span>}
              </div>
            </article></Reveal>
          ))}
        </div>
        {has && <div style={{ textAlign: 'center', marginTop: 32 }}><Link to="/reviews" style={BTNO}>Read all reviews</Link></div>}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Complete your bed: drie verticale productkaarten
// ---------------------------------------------------------------------------
export function CompleteYourBed({ items }) {
  const { symbol, isCA } = useCurrency();
  return (
    <section className="r-pad" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', ...SP.section) }}>
      <Reveal><h2 className="r-fs" style={{ ...H2S, textAlign: 'center', marginBottom: 24 }}>Complete your <span style={{ fontFamily: FONT_SUB }}>bed</span></h2></Reveal>
      <div className="grid-3m1 r-gap" style={rv('gap', ...SP.gap)}>
        {items.map((o, i) => {
          const price = o.pillow ? getPrice(BUNDLES[0], isCA) : getPrice(o.product, isCA);
          return (
            <Reveal key={o.id} delay={i * 70}><Link to={`/product/${o.id}`} className="card-hover" style={{ textDecoration: 'none', ...CARD, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ position: 'relative', aspectRatio: '4 / 3', background: o.contain ? `linear-gradient(160deg, ${c.sky} 0%, ${c.sky2} 100%)` : c.cream, overflow: 'hidden' }}>
                <img src={o.image} {...dim(o.image)} loading="lazy" decoding="async" alt={o.name} style={o.contain
                  ? { position: 'absolute', inset: '12%', width: '76%', height: '76%', objectFit: 'contain', filter: 'drop-shadow(0 12px 16px rgba(32,27,93,.20))' }
                  : { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="r-pad" style={{ ...rv('pad', 24, 20), display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.lg), lineHeight: LH.head, color: c.navy, marginBottom: 6 }}>{o.name}</div>
                <div style={{ fontSize: T.sm[0], color: c.grayD, marginBottom: 12, lineHeight: LH.body }}>{o.tagline}</div>
                <div style={{ fontSize: T.sm[0], fontWeight: 700, color: c.navy, marginBottom: 16, marginTop: 'auto' }}>{o.pillow ? `2 for ${formatPrice(price, symbol)}` : `From ${formatPrice(price, symbol)}`}</div>
                <span style={{ ...BTN_SM, alignSelf: 'flex-start' }}>View</span>
              </div>
            </Link></Reveal>
          );
        })}
      </div>
    </section>
  );
}
