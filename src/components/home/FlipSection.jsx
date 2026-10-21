import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, BTNO, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W } from '../../theme';
import { IMG, dim } from '../../data';
import { FLIP_STEPS, FLIP_SIDES } from '../../data/home-content';
import Reveal from '../Reveal';

const Snow = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" /><path d="M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5" />
  </svg>
);
const Sun = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </svg>
);

// "Just flip it": groot kussen dat in 3D draait tussen koele en warme kant.
// SSR rendert de koele kant; in de browser draait het elke 4 s tot de
// bezoeker zelf de toggle gebruikt.
export default function FlipSection() {
  const [warm, setWarm] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setWarm(w => !w), 4000);
    return () => clearInterval(t);
  }, [touched]);

  const pick = (side) => { setTouched(true); setWarm(side === 'warm'); };
  const side = warm ? FLIP_SIDES.warm : FLIP_SIDES.cool;

  return (
    <section className="r-pad" style={{ background: `linear-gradient(180deg, ${c.cream} 0%, ${c.sky} 100%)`, ...rv('pad', '96px 40px', '64px 20px') }}>
      <div style={{ maxWidth: W.page, margin: '0 auto' }}>
        <div className="home-flip">
          <div className="home-flip-media" style={{ textAlign: 'center' }}>
            <div className="home-flip-stage">
              <div className={`home-flip-card${warm ? ' is-warm' : ''}`}>
                <div className="home-flip-face">
                  <img src={IMG.flipCool} {...dim(IMG.flipCool)} loading="lazy" decoding="async" alt="Cool side of the Signature Cold Pillow" />
                </div>
                <div className="home-flip-face back">
                  <img src={IMG.flipWarm} {...dim(IMG.flipWarm)} loading="lazy" decoding="async" alt="Warm side of the Signature Cold Pillow" />
                </div>
              </div>
            </div>
            <div role="group" aria-label="Choose pillow side" className={`home-seg${warm ? ' is-warm' : ''}`} style={{ background: c.white, boxShadow: SH.card, marginTop: 24 }}>
              <span aria-hidden="true" className="home-seg-thumb" style={{ background: c.navy }} />
              {[['cool', 'Cool side'], ['warm', 'Warm side']].map(([key, label]) => {
                const active = (key === 'warm') === warm;
                return (
                  <button key={key} type="button" aria-pressed={active} onClick={() => pick(key)}
                    style={{ color: active ? c.white : c.navy, fontWeight: 700, fontSize: T.md[0], fontFamily: FONT_SUB }}>
                    {key === 'warm' ? <Sun color={active ? c.amber : c.purple} /> : <Snow color={active ? c.amber : c.purple} />}{label}
                  </button>
                );
              })}
            </div>
            <p aria-live="polite" className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, margin: '16px auto 0', maxWidth: 420, minHeight: 54 }}>
              <b style={{ color: c.navy, fontFamily: FONT_SUB }}>{side.label}:</b> {side.text}
            </p>
          </div>

          <div className="home-flip-head">
            <Reveal>
              <div style={EYEBROW}>How it works</div>
              <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h1), lineHeight: LH.head, color: c.navy, margin: '10px 0 14px' }}>
                Just <span style={{ fontFamily: FONT_SUB, color: c.purple }}>flip it.</span>
              </h2>
              <p className="r-fs" style={{ ...rv('fs', ...T.lg), lineHeight: LH.body, color: c.grayD, maxWidth: 480 }}>
                One pillow, two sides. Flip to the cool side on warm nights, back to the soft bamboo side when it gets colder.
              </p>
            </Reveal>
          </div>
          <div className="home-flip-steps">
            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {FLIP_STEPS.map(([t, s], i) => (
                <Reveal key={t} delay={i * 90}><li style={{ display: 'flex', gap: 18, marginBottom: 24, alignItems: 'flex-start' }}>
                  <b style={{ flex: '0 0 48px', height: 48, borderRadius: R.pill, background: c.navy, color: c.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: T.lg[0] }}>{i + 1}</b>
                  <div>
                    <h3 className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 4 }}>{t}</h3>
                    <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD }}>{s}</p>
                  </div>
                </li></Reveal>
              ))}
            </ol>
            <Link to="/how-it-works" style={{ ...BTNO, marginTop: 8 }}>See how it works</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
