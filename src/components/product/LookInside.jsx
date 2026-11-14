import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { c, rv, FONT_DISPLAY, FONT_SUB, FONT_BODY, EYEBROW, R, SH, T, LH, SP, W, BTNO } from '../../theme';
import { LAYERS, LAYER_IMAGES, LAYER_SECTION } from '../../data/product-content.js';
import './lookinside.css';

// "Look inside the pillow": sticky, scroll-gestuurde teardown van het kussen.
//
// Een hoge track met een sticky podium. De scrollvoortgang p (0..1) stuurt alles:
//   p < OPEN[0]      het kussen ligt heel in beeld
//   OPEN             de vijf lagen schuiven uit elkaar
//   WALK             de lagen worden een voor een uitgelicht (kaart + laag), de rest dimt
//   CLOSE            alles vouwt weer in elkaar tot het hele kussen
// Scroll zet alleen een doel; een korte rAF-lus laat de stand ernaartoe glijden en schrijft
// transform/opacity direct op de lagen, zodat er per frame niets opnieuw rendert. Alleen de
// actieve laag en de "Look inside"-stand zitten in React-state.
// "Look inside" wisselt het kussen voor de doorsnede met alle lagen en de twee ritsen; verder
// scrollen sluit hem weer.
// SSR en zonder JS: het hele kussen plus de vijf kaarten. prefers-reduced-motion: geen sticky
// track, de uitgeklapte stapel als een beeld.
// Beelden en hun maten komen uit LAYERS / LAYER_IMAGES / LAYER_SECTION (product-content.js).

const N = LAYERS.length;
// Het podium in render-eenheden (px van het 2048-frame waarin de lagen zijn gemaakt).
const FRAME_W = 2400;
const FRAME_H = 2060;
const OPEN = [0.05, 0.22];
const WALK = [0.22, 0.82];
const CLOSE = [0.85, 0.97];
const SIZES = '(max-width: 767px) 86vw, 580px';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (x) => { const k = clamp(x); return k * k * (3 - 2 * k); };
const smoother = (x) => { const u = clamp(x); return u * u * u * (u * (u * 6 - 15) + 10); };
const pad2 = (n) => String(n).padStart(2, '0');
const pct = (v) => `${(v * 100).toFixed(2)}%`;
const widthOf = (fw) => pct(fw / FRAME_W);

const VARS = {
  '--li-navy': c.navy, '--li-white': c.white, '--li-sky': c.sky, '--li-sky2': c.sky2,
  '--li-amber': c.amber, '--li-gray': c.grayD, '--li-lilac': c.lilac,
  '--li-r': `${R.lg}px`, '--li-rs': `${R.sm}px`, '--li-sh': SH.card, '--li-shs': SH.strong,
  '--li-body': FONT_BODY, '--li-sub': FONT_SUB, '--li-ratio': `${FRAME_W} / ${FRAME_H}`,
};

// Waar de badges van de doorsnede staan: een kolom links van het snijvlak.
const SECT_H = LAYER_SECTION.img.h / LAYER_SECTION.img.w; // hoogte bij breedte 1

// prefers-reduced-motion als externe bron: op de server en bij de eerste render altijd false.
const RM = '(prefers-reduced-motion: reduce)';
const rmSubscribe = (cb) => {
  const mq = window.matchMedia ? window.matchMedia(RM) : null;
  if (!mq || !mq.addEventListener) return () => {};
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const rmNow = () => !!(window.matchMedia && window.matchMedia(RM).matches);
const rmServer = () => false;
const sectBadge = (i) => [-0.055, 0.70 + (i - (N - 1) / 2) * 0.118];

export default function LookInside() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const boxRef = useRef(null);
  const closedRef = useRef(null);
  const shadowRef = useRef(null);
  const layerRefs = useRef([]);
  const [active, setActive] = useState(-1);
  const [inside, setInside] = useState(false);
  const [after, setAfter] = useState(false); // voorbij de laatste laag: het kussen vouwt weer dicht
  const afterRef = useRef(false);
  const reduced = useSyncExternalStore(rmSubscribe, rmNow, rmServer);
  const activeRef = useRef(-1);
  const insideRef = useRef({ on: false, p: 0 });
  const progressRef = useRef(0);

  useEffect(() => {
    if (reduced) return undefined;

    const cur = { e: 0, f: LAYERS.map(() => 0) };
    const tgt = { e: 0, a: -1 };
    let raf = 0;
    let last = 0;
    let unit = 0;

    const paint = () => {
      const { e, f } = cur;
      // de buitenhoezen gaan eerst, de binnenhoes een tel later
      const sOut = smoother(e / 0.82);
      const sIn = smoother((e - 0.18) / 0.82);
      const s = [sOut, sIn, e, sIn, sOut];
      const whole = 1 - smooth((e - 0.03) / 0.16);
      const any = Math.max(0, ...f);
      // de stapel leunt naar de uitgelichte laag
      let pan = 0;
      for (let i = 0; i < N; i++) pan -= 0.5 * f[i] * LAYERS[i].off * s[i];
      for (let i = 0; i < N; i++) {
        const el = layerRefs.current[i];
        if (!el) continue;
        const y = (LAYERS[i].off * s[i] + pan) * unit;
        el.style.transform = `translate(-50%, -50%) translate3d(0, ${y.toFixed(1)}px, 0)`;
        el.style.opacity = ((1 - whole) * (1 - 0.84 * clamp(any - f[i]))).toFixed(3);
      }
      if (closedRef.current) {
        closedRef.current.style.opacity = whole.toFixed(3);
        closedRef.current.style.transform = `translate(-50%, -50%) scale(${(0.97 + 0.03 * whole).toFixed(4)})`;
      }
      // de badges komen pas als de lagen los van elkaar liggen
      if (boxRef.current) boxRef.current.style.setProperty('--li-b', smooth((e - 0.55) / 0.35).toFixed(3));
      if (shadowRef.current) {
        shadowRef.current.style.opacity = (1 - 0.7 * e).toFixed(3);
        shadowRef.current.style.transform = `translate(-50%, ${(e * 0.2 * FRAME_H * unit).toFixed(1)}px) scale(${(1 - 0.12 * e).toFixed(3)})`;
      }
    };

    const frame = (now) => {
      raf = 0;
      const dt = Math.min(0.05, Math.max(0.008, (now - last) / 1000));
      last = now;
      const k = 1 - Math.exp(-dt / 0.11);
      cur.e += (tgt.e - cur.e) * k;
      let moving = Math.abs(tgt.e - cur.e) > 0.0004;
      for (let i = 0; i < N; i++) {
        const want = tgt.a === i ? 1 : 0;
        cur.f[i] += (want - cur.f[i]) * k;
        if (Math.abs(want - cur.f[i]) > 0.002) moving = true;
      }
      if (!moving) { cur.e = tgt.e; for (let i = 0; i < N; i++) cur.f[i] = tgt.a === i ? 1 : 0; }
      paint();
      if (moving) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) { last = performance.now() - 16; raf = requestAnimationFrame(frame); } };

    const read = () => {
      const el = trackRef.current;
      const st = stageRef.current;
      if (!el || !st) return;
      const r = el.getBoundingClientRect();
      const span = r.height - st.offsetHeight;
      if (span <= 0) return;
      const top = parseFloat(getComputedStyle(st).top) || 0;
      const p = clamp((top - r.top) / span);
      progressRef.current = p;
      const open = smoother((p - OPEN[0]) / (OPEN[1] - OPEN[0]));
      const close = smoother((p - CLOSE[0]) / (CLOSE[1] - CLOSE[0]));
      tgt.e = open * (1 - close);
      const a = p >= WALK[0] && p < WALK[1] ? Math.min(N - 1, Math.floor(((p - WALK[0]) / (WALK[1] - WALK[0])) * N)) : -1;
      tgt.a = a;
      if (a !== activeRef.current) { activeRef.current = a; setActive(a); }
      const done = p >= WALK[1];
      if (done !== afterRef.current) { afterRef.current = done; setAfter(done); }
      // verder scrollen sluit de doorsnede
      if (insideRef.current.on && Math.abs(p - insideRef.current.p) > 0.035) { insideRef.current.on = false; setInside(false); }
      kick();
    };
    const measure = () => {
      unit = boxRef.current ? boxRef.current.offsetWidth / FRAME_W : 0;
      read();
      paint();
    };

    measure();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Kaart of nummer: scroll naar het stuk van de track waar die laag is uitgelicht.
  const goTo = useCallback((i) => {
    insideRef.current.on = false;
    setInside(false);
    const el = trackRef.current;
    const st = stageRef.current;
    if (reduced || !el || !st) { setActive((a) => (a === i ? -1 : i)); return; }
    const span = el.offsetHeight - st.offsetHeight;
    const top = el.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(st).top) || 0);
    const p = WALK[0] + ((i + 0.5) / N) * (WALK[1] - WALK[0]);
    window.scrollTo({ top: top + span * p, behavior: 'smooth' });
  }, [reduced]);

  const toggleInside = useCallback(() => {
    setInside((on) => {
      insideRef.current = { on: !on, p: progressRef.current };
      return !on;
    });
  }, []);

  const h2 = { fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, margin: '8px 0 12px' };
  const img = (im) => ({ src: im.src, srcSet: im.srcSet, sizes: SIZES, width: im.w, height: im.h, loading: 'lazy', decoding: 'async' });
  const sectH = 1000 * SECT_H;
  const shown = inside ? -1 : active; // in de doorsnede is geen laag uitgelicht

  return (
    <section className="li r-pad" style={{ ...VARS, ...rv('pad', ...SP.sectionTop) }} aria-labelledby="li-title">
      <div style={{ textAlign: 'center', maxWidth: W.text, margin: '0 auto' }}>
        <div style={EYEBROW}>Inside the pillow</div>
        <h2 id="li-title" className="r-fs" style={h2}>Five layers, one cool night.</h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.grayD, lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto' }}>
          Every layer has one job, from the cool-touch face you feel first to the foam you tune to your height.{reduced ? '' : ' Scroll to take the pillow apart.'}
        </p>
      </div>

      <div ref={trackRef} className={`li-track${reduced ? ' is-static' : ''}`}>
        <div ref={stageRef} className={`li-stage${inside ? ' is-inside' : ''}${shown >= 0 ? ' has-active' : ''}`}>
          <div className="li-visual">
            <div ref={boxRef} className="li-box">
              {/* het kussen en zijn vijf lagen */}
              <div className="li-stack" aria-hidden={inside}>
                <span ref={shadowRef} className="li-shadow" aria-hidden="true" />
                <img ref={closedRef} className="li-closed" style={{ width: widthOf(LAYER_IMAGES.closed.fw) }} {...img(LAYER_IMAGES.closed)} alt="The Signature Cold Pillow, cool side up" />
                {LAYERS.map((l, i) => (
                  <div key={l.id} ref={(el) => { layerRefs.current[i] = el; }} className={`li-layer${i === shown ? ' is-active' : ''}`} style={{ width: widthOf(l.fw), zIndex: N - i }}>
                    <img {...img(l.img)} alt={l.title} />
                    <span className="li-badge" aria-hidden="true">{pad2(i + 1)}</span>
                  </div>
                ))}
                <img className="li-exploded" {...img(LAYER_IMAGES.exploded)} alt="The five layers of the Signature Cold Pillow, taken apart" />
              </div>

              {/* de doorsnede: alle lagen op elkaar, met de twee ritsen */}
              <div className="li-sect" style={{ width: widthOf(LAYER_SECTION.fw) }} aria-hidden={!inside}>
                <img {...img(LAYER_SECTION.img)} alt={LAYER_SECTION.alt} />
                <svg viewBox={`0 0 1000 ${sectH.toFixed(1)}`} aria-hidden="true">
                  {LAYER_SECTION.at.map(([x, y], i) => {
                    const [bx, by] = sectBadge(i);
                    return (
                      <g key={i}>
                        <path d={`M${(bx * 1000 + 22).toFixed(1)} ${(by * sectH).toFixed(1)}L${(x * 1000).toFixed(1)} ${(y * sectH).toFixed(1)}`} />
                        <circle cx={(x * 1000).toFixed(1)} cy={(y * sectH).toFixed(1)} r="5" />
                      </g>
                    );
                  })}
                  {LAYER_SECTION.zips.map((z) => (
                    <g key={z.label}>
                      <path d={`M${(z.at[0] * 1000).toFixed(1)} ${(z.at[1] * sectH).toFixed(1)}L${(z.to[0] * 1000).toFixed(1)} ${(z.to[1] * sectH).toFixed(1)}`} />
                      <circle cx={(z.at[0] * 1000).toFixed(1)} cy={(z.at[1] * sectH).toFixed(1)} r="5" />
                    </g>
                  ))}
                </svg>
                {LAYER_SECTION.at.map((_, i) => {
                  const [bx, by] = sectBadge(i);
                  return <span key={i} className="li-badge" style={{ left: pct(bx), top: pct(by) }} aria-hidden="true">{pad2(i + 1)}</span>;
                })}
                {LAYER_SECTION.zips.map((z) => (
                  <span key={z.label} className="li-zip" style={{ left: pct(z.to[0]), top: pct(z.to[1]) }}>{z.label}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="li-side">
            {/* mobiel: de vijf nummers als stappen, met een kaart eronder */}
            <div className="li-steps m-only" role="group" aria-label="Layers">
              {LAYERS.map((l, i) => (
                <button key={l.id} type="button" className={`li-num${i === shown ? ' is-active' : ''}`} onClick={() => goTo(i)} aria-label={`Layer ${i + 1}: ${l.title}`} aria-current={i === shown ? 'step' : undefined}>{pad2(i + 1)}</button>
              ))}
            </div>
            <p className="li-hint m-only" style={{ fontSize: T.sm[1], lineHeight: LH.body }}>
              {inside ? 'Every layer in place, top to bottom:' : after ? 'Back in one piece. Tap a number to see a layer again.' : 'Keep scrolling to take the pillow apart, one layer at a time.'}
            </p>

            <ol className="li-cards">
              {LAYERS.map((l, i) => (
                <li key={l.id} className={i === shown ? 'is-active' : ''}>
                  <button type="button" className={`li-card${i === shown ? ' is-active' : ''}`} onClick={() => goTo(i)} aria-current={i === shown ? 'step' : undefined}>
                    <span className="li-num">{pad2(i + 1)}</span>
                    <span>
                      <span className="li-ct" style={{ fontSize: T.lg[0] }}>{l.title}</span>
                      <span className="li-cx" style={{ fontSize: T.sm[0], lineHeight: LH.body }}>{l.text}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <button type="button" className="li-inside" style={{ ...BTNO, height: 46 }} onClick={toggleInside} aria-pressed={inside}>
              {inside ? 'Back to the layers' : 'Look inside'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
