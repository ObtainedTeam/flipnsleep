import { useState, useEffect, useRef, useCallback } from 'react';
import { c, rv, FONT_DISPLAY, FONT_SUB, FONT_BODY, EYEBROW, R, SH, T, LH, SP, W } from '../../theme';
import { LAYERS, LAYER_IMAGES } from '../../data/product-content.js';
import './lookinside.css';

// "Look inside the pillow": sticky, scroll-gestuurde exploded view.
// Desktop: een hoge track (300vh) met een sticky podium. Scrollvoortgang (0..1) wordt
// in een rAF-lus als CSS-variabelen (--e = uitklap, 0..1) op het podium gezet, zodat
// er per frame niets opnieuw rendert; alleen de actieve laag zit in React-state.
// SSR rendert de gesloten stand (progress 0, kaart 1 actief). Bij
// prefers-reduced-motion: direct de uitgeklapte eindstand, geen scrollanimatie.
// Mobiel (<768px, alleen CSS): overzichtsbeeld + genummerde accordeonlijst.
//
// Vervang door Higgsfield-renders met dezelfde bestandsnamen (prompts-exploded-pillow.md).
// Thomas levert .png; die zetten we om naar .webp met dezelfde basisnaam. De paden komen
// uit LAYER_IMAGES in src/data/product-content.js.

const N = LAYERS.length;
const EXPLODE = [0.02, 0.3]; // deel van de scroll waarin de lagen uit elkaar schuiven
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);
const pad2 = (n) => String(n).padStart(2, '0');

const VARS = {
  '--li-navy': c.navy, '--li-white': c.white, '--li-sky': c.sky, '--li-sky2': c.sky2,
  '--li-amber': c.amber, '--li-gray': c.grayD, '--li-lilac': c.lilac,
  '--li-r': `${R.lg}px`, '--li-rs': `${R.sm}px`, '--li-sh': SH.card, '--li-shs': SH.strong,
  '--li-body': FONT_BODY, '--li-sub': FONT_SUB,
};

export default function LookInside() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false); // hotspots klikbaar zodra de lagen open liggen
  const [reduced, setReduced] = useState(false);
  const [mOpen, setMOpen] = useState(0);
  const activeRef = useRef(0);
  const openRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mq && mq.matches) { setReduced(true); setOpen(true); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current, st = stageRef.current;
      if (!el || !st) return;
      const r = el.getBoundingClientRect();
      const span = r.height - st.offsetHeight;
      if (r.height === 0 || span <= 0) return; // verborgen (mobiel)
      const p = clamp(-r.top / span);
      const e = ease(clamp((p - EXPLODE[0]) / (EXPLODE[1] - EXPLODE[0])));
      st.style.setProperty('--e', e.toFixed(4));
      const a = Math.min(N - 1, Math.floor(p * N));
      if (a !== activeRef.current) { activeRef.current = a; setActive(a); }
      const o = e > 0.6;
      if (o !== openRef.current) { openRef.current = o; setOpen(o); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Kaart of hotspot: scroll naar het stuk van de track waar die laag actief is.
  const goTo = useCallback((i) => {
    const el = trackRef.current, st = stageRef.current;
    if (reduced || !el || !st) { setActive(i); return; }
    const span = el.offsetHeight - st.offsetHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const p = i === 0 ? (EXPLODE[1] + 0.2) / 2 : (i + 0.5) / N;
    window.scrollTo({ top: top + span * p, behavior: 'smooth' });
  }, [reduced]);

  const h2 = { fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, margin: '8px 0 12px' };

  return (
    <section className="li r-pad" style={{ ...VARS, ...rv('pad', ...SP.sectionTop) }} aria-labelledby="li-title">
      <div style={{ textAlign: 'center', maxWidth: W.text, margin: '0 auto' }}>
        <div style={EYEBROW}>Inside the pillow</div>
        <h2 id="li-title" className="r-fs" style={h2}>Five layers, one cool night.</h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.grayD, lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto' }}>
          Every layer has one job, from the cool-touch face you feel first to the foam you tune to your height.
        </p>
      </div>

      {/* Desktop: sticky exploded view */}
      <div ref={trackRef} className={`li-track d-only${reduced ? ' is-static' : ''}`}>
        <div ref={stageRef} className={`li-stage${open ? ' is-open' : ''}`}>
          <div className="li-visual">
            <div className="li-box">
              <img className="li-closed" src={LAYER_IMAGES.closed} width="1600" height="1200" alt="" aria-hidden="true" decoding="async" />
              {LAYERS.map((l, i) => (
                <div key={l.id} className={`li-layer${i === active ? ' is-active' : ''}`} style={{ '--i': i - (N - 1) / 2, zIndex: N - i }}>
                  <img src={l.img} width="1600" height="1200" alt={l.title} loading="lazy" decoding="async" />
                  <button type="button" className="li-hot" onClick={() => goTo(i)} aria-label={`Show layer ${i + 1}: ${l.title}`} tabIndex={open ? 0 : -1}>
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <ol className="li-cards">
            {LAYERS.map((l, i) => (
              <li key={l.id}>
                <button type="button" className={`li-card${i === active ? ' is-active' : ''}`} onClick={() => goTo(i)} aria-current={i === active ? 'step' : undefined}>
                  <span className="li-num">{pad2(i + 1)}</span>
                  <span>
                    <span className="li-ct" style={{ fontSize: T.lg[0] }}>{l.title}</span>
                    <span className="li-cx" style={{ fontSize: T.sm[0], lineHeight: LH.body }}>{l.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Mobiel: overzichtsbeeld + genummerde accordeon */}
      <div className="li-mob m-only">
        <div className="li-mob-img">
          <img src={LAYER_IMAGES.exploded} width="1600" height="1200" alt="The five layers of the Signature Cold Pillow, taken apart" loading="lazy" decoding="async" />
        </div>
        <ol className="li-acc">
          {LAYERS.map((l, i) => {
            const isOpen = mOpen === i;
            return (
              <li key={l.id} className={isOpen ? 'is-open' : ''}>
                <button type="button" onClick={() => setMOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`li-m-${l.id}`}>
                  <span className="li-num">{i + 1}</span>
                  <span className="li-ct" style={{ fontSize: T.md[1] }}>{l.title}</span>
                  <span className="li-chev" aria-hidden="true" />
                </button>
                <div id={`li-m-${l.id}`} className="li-acc-body" hidden={!isOpen}>
                  <p style={{ fontSize: T.sm[1], lineHeight: LH.body }}>{l.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
