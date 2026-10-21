import { Link } from 'react-router-dom';
import { c, BTN, rv, FONT_DISPLAY, FONT_SUB, R, SH, T, LH, W, CARD_SOFT } from '../../theme';
import { IMG, dim } from '../../data';
import Reveal from '../Reveal';

// "We don't sleep until you do": productcutout zwevend op een sky-paneel.
export default function BrandStatement() {
  return (
    <section className="r-pad" style={{ background: c.white, ...rv('pad', '96px 40px', '56px 20px 80px') }}>
      <div className="grid-2m1 r-gap" style={{ maxWidth: W.page, margin: '0 auto', ...rv('gap', 72, 40), alignItems: 'center' }}>
        <Reveal><div>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h1), lineHeight: LH.tight, color: c.navy }}>
            We don't sleep until <span style={{ fontFamily: FONT_SUB, fontStyle: 'italic', color: c.purple }}>you do</span>
          </h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.lg), lineHeight: LH.body, color: c.grayD, margin: '20px 0 32px', maxWidth: 460 }}>
            We're flip'nsleep. And good enough isn't good enough. Not in our products, not in our service, and not in your sleep.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <Link to="/about" style={BTN}>Our story</Link>
            <Link to="/how-it-works" className="nav-link" style={{ fontSize: T.sm[0], fontWeight: 700, color: c.navy, letterSpacing: '0.06em', textTransform: 'uppercase' }}>How it works →</Link>
          </div>
        </div></Reveal>
        <Reveal delay={120}><div className="home-brand-panel" style={{ ...CARD_SOFT, background: `linear-gradient(160deg, ${c.sky2} 0%, ${c.sky} 100%)` }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: R.lg, overflow: 'hidden' }}>
            <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" style={{ position: 'absolute', left: '-6%', top: '8%', width: '42%', filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.12))' }} />
            <img src={IMG.cloudWhite} {...dim(IMG.cloudWhite)} loading="lazy" decoding="async" alt="" style={{ position: 'absolute', right: '-6%', bottom: '10%', width: '48%', filter: 'drop-shadow(0 6px 10px rgba(32,27,93,.12))' }} />
          </div>
          <img src={IMG.coverDuo} {...dim(IMG.coverDuo)} loading="lazy" decoding="async" alt="Both sides of the Signature Cold Pillow" style={{ position: 'relative', width: '82%', objectFit: 'contain', filter: 'drop-shadow(0 34px 36px rgba(32,27,93,.30))', transform: 'translateY(-4%)' }} />
          <div className="float-card" style={{ background: c.cream, borderRadius: R.sm, boxShadow: SH.strong, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, zIndex: 2 }}>
            <span aria-hidden="true" style={{ flexShrink: 0, width: 44, height: 44, borderRadius: R.pill, background: c.navy, color: c.amber, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: T.xs[0] }}>100</span>
            <span style={{ fontSize: T.sm[0], lineHeight: LH.head, color: c.navy }}><b style={{ fontFamily: FONT_SUB }}>100 nights to decide.</b><br />Free shipping and free returns.</span>
          </div>
        </div></Reveal>
      </div>
    </section>
  );
}
