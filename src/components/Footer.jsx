import { Link } from 'react-router-dom';
import { c, rv, FONT_SUB, R, T, SP, W } from '../theme';
import { IMG, dim } from '../data';

export default function Footer() {
  return (
    <footer className="r-pad" style={{ background: c.night, color: c.white, borderRadius: `${R.lg}px ${R.lg}px 0 0`, ...rv('pad', ...SP.section), marginTop: 64 }}>
      <div style={{ maxWidth: W.page, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
          <img src={IMG.logoFull} {...dim(IMG.logoFull)} loading="lazy" decoding="async" alt="flip'nsleep" className="r-h" style={{ ...rv('h', 68, 44), width: 'auto' }} />
        </div>
        <div className="grid-4m2 r-gap r-fs r-mw" style={{ ...rv('gap', 40, 24), ...rv('fs', ...T.sm), ...rv('mw', W.page - 160, W.narrow), margin: '0 auto' }}>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: T.xs[0], marginBottom: 12, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Shop</h4>
            <Link to="/product/signature-cold-pillow" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>Signature Cold Pillow</Link>
            <Link to="/shop" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>Bundles</Link>
          </div>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: T.xs[0], marginBottom: 12, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Support</h4>
            <Link to="/faq" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>FAQ</Link>
            <Link to="/reviews" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>Reviews</Link>
            <Link to="/returns" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>Shipping & returns</Link>
            <a href="mailto:support@flipnsleep.com" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>Contact</a>
          </div>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: T.xs[0], marginBottom: 12, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Company</h4>
            <Link to="/about" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>Our story</Link>
            <Link to="/how-it-works" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>How it works</Link>
            <Link to="/why-flipnsleep" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>Why flip'nsleep</Link>
          </div>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: T.xs[0], marginBottom: 12, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Legal</h4>
            <Link to="/privacy" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>Privacy policy</Link>
            <Link to="/terms" className="foot-link" style={{ display: 'block', color: c.lilac, marginBottom: 8 }}>Terms of service</Link>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: T.xs[0], color: c.gray, marginTop: 40 }}>© 2026 flip'nsleep · part of Obtained VOF · Ships to the US and Canada</p>
      </div>
    </footer>
  );
}
