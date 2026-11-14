import { Link } from 'react-router-dom';
import { c, BTNO, rv, FONT_DISPLAY, FONT_BODY, FONT_SUB, R, SH, T, LH, SP, W } from '../../theme';
import { IMG, dim } from '../../data';
import { COMPARE_ROWS } from '../../data/home-content';
import { CompareCards } from '../Blocks';
import Reveal from '../Reveal';

const Check = () => (
  <span aria-hidden="true" style={{ width: 28, height: 28, borderRadius: R.pill, background: c.navy, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c.white} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  </span>
);
const Cross = () => (
  <span aria-hidden="true" style={{ width: 28, height: 28, borderRadius: R.pill, background: c.tint, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c.gray} strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
  </span>
);

// "Why flip'nsleep?": twee blokken met VS-chip ertussen (desktop),
// CompareCards-stapeling op mobiel.
export default function CompareHome() {
  const row = { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', ...rv('fs', ...T.lg), lineHeight: LH.head };
  return (
    <section className="r-pad" style={rv('pad', ...SP.section)}>
      <Reveal><h2 className="r-fs r-mb" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h1), lineHeight: LH.head, color: c.navy, textAlign: 'center', ...rv('mb', 48, 28) }}>
        Why flip'nsleep?
      </h2></Reveal>

      <div className="d-only">
        <Reveal><div className="home-vs" style={{ maxWidth: W.page - 120, margin: '0 auto' }}>
          <div style={{ background: c.sky, color: c.navy, borderRadius: R.lg, padding: '40px 44px', position: 'relative', zIndex: 2 }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: T.h3[0], lineHeight: LH.head, textAlign: 'center' }}>flip'nsleep</h3>
            <div style={{ height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0 16px' }}>
              <img src={IMG.coverFront} {...dim(IMG.coverFront)} loading="lazy" decoding="async" alt="flip'nsleep Signature Cold Pillow" style={{ maxHeight: 170, filter: 'drop-shadow(0 14px 16px rgba(32,27,93,.18))' }} />
            </div>
            <ul style={{ listStyle: 'none' }}>
              {COMPARE_ROWS.map(([k, us]) => (
                <li key={k} className="r-fs" style={{ ...row, borderTop: '1px solid rgba(32,27,93,.12)', fontWeight: 500 }}><Check />{us}</li>
              ))}
            </ul>
          </div>
          <span className="home-vs-chip" aria-hidden="true" style={{ width: 44, height: 44, borderRadius: R.pill, background: c.cream, color: c.grayD, border: '1px solid rgba(32,27,93,.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_BODY, fontWeight: 500, fontSize: 14 }}>vs</span>
          <div style={{ background: c.white, color: c.grayD, borderRadius: R.lg, border: `1px solid ${c.line}`, padding: '32px 36px' }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: T.h4[0], lineHeight: LH.head, textAlign: 'center', color: c.grayD }}>Sweaty old pillow</h3>
            <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0 14px' }}>
              <img src={IMG.standardPillowSweaty} {...dim(IMG.standardPillowSweaty)} loading="lazy" decoding="async" alt="Sweaty, stained old pillow" style={{ maxHeight: 150, borderRadius: R.sm, opacity: .9 }} />
            </div>
            <ul style={{ listStyle: 'none' }}>
              {COMPARE_ROWS.map(([k, , them]) => (
                <li key={k} className="r-fs" style={{ ...row, borderTop: '1px solid rgba(32,27,93,.10)', color: c.grayD }}><Cross />{them}</li>
              ))}
            </ul>
          </div>
        </div></Reveal>
      </div>

      <div className="m-only" style={{ maxWidth: W.narrow, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ background: c.sky, borderRadius: R.lg, padding: 14, textAlign: 'center' }}>
            <img src={IMG.coverFront} {...dim(IMG.coverFront)} loading="lazy" decoding="async" alt="flip'nsleep Signature Cold Pillow" style={{ height: 90, objectFit: 'contain', }} />
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: T.sm[0], color: c.navy, marginTop: 6 }}>flip'nsleep</div>
          </div>
          <div style={{ background: c.white, borderRadius: R.lg, border: `1px solid ${c.line}`, padding: 14, textAlign: 'center' }}>
            <img src={IMG.standardPillowSweaty} {...dim(IMG.standardPillowSweaty)} loading="lazy" decoding="async" alt="Sweaty, stained old pillow" style={{ height: 90, objectFit: 'contain', borderRadius: R.sm }} />
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: T.sm[0], color: c.grayD, marginTop: 6 }}>Old pillow</div>
          </div>
        </div>
        <CompareCards rows={COMPARE_ROWS} ours="flip'nsleep" theirs="Old pillow" />
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}><Link to="/why-flipnsleep" style={BTNO}>See the full comparison</Link></div>
    </section>
  );
}
