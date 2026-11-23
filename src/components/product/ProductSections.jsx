import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { dim, rs } from '../../data';
import Reveal from '../Reveal';
import { Acc, Ico } from '../Sky';
import { ProductRail } from '../Sections';
import './product.css';

// Bouwstenen voor de productpagina's (redesign nov 2026).
// Niets hangt af van de vensterbreedte tijdens renderen: CSS kiest per viewport.

// Judge.me via /api/reviews: één gedeelde fetch, zie ReviewWall.jsx.
export { useReviews } from '../ReviewWall';
const realReviews = (rvw) => ((rvw && rvw.reviews) || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
const starStr = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

// Kruimelpad boven de koopsectie
export function Crumbs({ name }) {
  return (
    <nav className="pd-crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {name}</nav>
  );
}

// ---------------------------------------------------------------------------
// Galerij: grote foto met vorige/volgende-knoppen, teller, vegen op mobiel en
// een rij miniaturen. images: [{ src, thumb?, alt }]
// ---------------------------------------------------------------------------
export function Gallery({ images, label = 'Product photos' }) {
  const [img, setImg] = useState(0);
  const thumbsRef = useRef(null);
  const touchX = useRef(null);
  const total = images.length;
  const step = (d) => setImg((i) => (i + d + total) % total);
  useEffect(() => {
    const strip = thumbsRef.current, el = strip?.children[img];
    if (el) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [img]);
  const cur = images[Math.min(img, total - 1)];
  return (
    <div>
      <div className="pd-gallery" role="group" aria-roledescription="carousel" aria-label={label}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - (touchX.current ?? 0); touchX.current = null; if (Math.abs(d) > 40) step(d < 0 ? 1 : -1); }}>
        <img key={img} src={cur.src} {...dim(cur.src)} {...rs(cur.src, '(max-width: 899px) 100vw, 640px')} fetchPriority={img === 0 ? 'high' : undefined} decoding="async" alt={cur.alt} />
        {total > 1 && <>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="pd-gallery-nav" style={{ left: 12 }}><Ico name="cl" /></button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className="pd-gallery-nav" style={{ right: 12 }}><Ico name="cr" /></button>
          <span aria-live="polite" className="pd-gallery-count">{img + 1} / {total}</span>
        </>}
      </div>
      {total > 1 && (
        <div className="thumbs" ref={thumbsRef}>
          {images.map((im, i) => (
            <button key={im.src} type="button" onClick={() => setImg(i)} aria-label={`Photo ${i + 1}: ${im.alt}`} aria-pressed={i === img}>
              <img src={im.thumb || im.src} width={72} height={72} loading="lazy" decoding="async" alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Eén echte review onder de galerij. Zonder echte reviews tonen we hier niets.
export function GalleryReview({ rvw, productName }) {
  const real = realReviews(rvw)[0];
  if (!real) return null;
  return (
    <div className="pd-review">
      <span className="sk-stars" aria-label={`${real.rating} out of 5 stars`}>{starStr(real.rating)}</span>
      <p className="clamp-2" style={{ fontSize: 15, lineHeight: 1.6, margin: '8px 0 0' }}>“{real.body || real.title}”</p>
      <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 8 }}>{(real.name || '').split(' ')[0]}, {productName}</div>
    </div>
  );
}

// Drie beloftes onder de koopknop
export function BuyTrust() {
  return (
    <ul className="pd-trust">
      <li><Ico name="truck" />Free shipping</li>
      <li><Ico name="moon" />100-night trial</li>
      <li><Ico name="shield" />2-year warranty</li>
    </ul>
  );
}

// Specificaties als nette lijst (voor in het accordeon)
export function SpecList({ specs }) {
  return <dl className="pd-specs">{specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>;
}

// ---------------------------------------------------------------------------
// Uitleg: kop links, accordeon rechts. items: [[titel, tekst | string[]], ...]
// ---------------------------------------------------------------------------
export function ExplainAccordion({ title, intro, items, chips }) {
  return (
    <section className="sk-sec"><div className="sk-wrap pd-two">
      <Reveal once>
        <h2 className="sk-h2">{title}</h2>
        {intro && <p className="sk-lead" style={{ marginTop: 16 }}>{intro}</p>}
        {chips && <ul className="sk-clist" style={{ marginTop: 28 }}>
          {chips.map((h) => <li key={h.label}><div><b>{h.label}</b><span>{h.sub}</span></div></li>)}
        </ul>}
      </Reveal>
      <Acc items={items} open={0} />
    </div></section>
  );
}

// ---------------------------------------------------------------------------
// Twee grote foto's naast elkaar, elk met een wit labeltje
// ---------------------------------------------------------------------------
export function SplitImages({ items }) {
  return (
    <section aria-label="Product close-ups"><div className="sk-wrap pd-split">
      {items.map((it) => (
        <div key={it.image} className="pd-split-cell">
          <img src={it.image} {...dim(it.image)} {...rs(it.image, '(max-width: 767px) 100vw, 600px')} loading="lazy" decoding="async" alt={it.caption} />
          <div className="pd-split-cap"><span>{it.caption}</span></div>
        </div>
      ))}
    </div></section>
  );
}

// ---------------------------------------------------------------------------
// Feiten met tel-animatie. SSR rendert de eindwaarde; in de browser telt het
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
    <section className="sk-sec"><div className="sk-wrap pd-two is-center">
      <Reveal once>
        <h2 className="sk-h2">{title}</h2>
        <p className="sk-lead" style={{ marginTop: 16 }}>{text}</p>
      </Reveal>
      <ul className="pd-stats">
        {stats.map((s) => (
          <li key={s.label}><b>{s.text ? s.text : <CountUp value={s.value} decimals={s.decimals} />}</b><span>{s.label}</span></li>
        ))}
      </ul>
    </div></section>
  );
}

// Complete your bed: dezelfde productrij, zonder het product van deze pagina
export function CompleteYourBed({ current }) {
  return <ProductRail title="Complete your bed" intro={null} exclude={current} />;
}
