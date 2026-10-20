import { Link } from 'react-router-dom';
import { c, rv, FONT_SUB } from '../theme';
import { IMG, dim } from '../data';

export default function Footer() {
  return (
    <footer className="r-pad" style={{ background: c.navy, color: '#fff', borderRadius: '34px 34px 0 0', ...rv('pad', '70px 60px 44px', '38px 24px 30px'), marginTop: 60 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
          <img src={IMG.logoFull} {...dim(IMG.logoFull)} loading="lazy" decoding="async" alt="flip'nsleep" className="r-h" style={{ ...rv('h', 68, 44), width: 'auto' }} />
        </div>
        <div className="grid-4m2 r-gap r-fs r-mw" style={{ ...rv('gap', 40, 24), ...rv('fs', 13.5, 12.5), ...rv('mw', 980, 820), margin: '0 auto' }}>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: 13, marginBottom: 10, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Shop</h4>
            <Link to="/product/signature-cold-pillow" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Signature Cold Pillow</Link>
            <Link to="/shop" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Bundles</Link>
          </div>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: 13, marginBottom: 10, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Support</h4>
            <Link to="/faq" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>FAQ</Link>
            <Link to="/reviews" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Reviews</Link>
            <Link to="/returns" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Shipping & returns</Link>
            <a href="mailto:support@flipnsleep.com" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Contact</a>
          </div>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: 13, marginBottom: 10, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Company</h4>
            <Link to="/about" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Our story</Link>
            <Link to="/how-it-works" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>How it works</Link>
            <Link to="/why-flipnsleep" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Why flip'nsleep</Link>
          </div>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: 13, marginBottom: 10, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Legal</h4>
            <Link to="/privacy" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Privacy policy</Link>
            <Link to="/terms" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Terms of service</Link>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 10.5, color: c.gray, marginTop: 32 }}>© 2026 flip'nsleep · part of Obtained VOF · Ships to the US and Canada</p>
      </div>
    </footer>
  );
}
