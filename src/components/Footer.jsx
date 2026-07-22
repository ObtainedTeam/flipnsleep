import { Link } from 'react-router-dom';
import { c, useIsMobile, FONT_DISPLAY, FONT_SUB } from '../theme';
import { IMG } from '../data';

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: c.navy, color: '#fff', borderRadius: '34px 34px 0 0', padding: isMobile ? '38px 24px 30px' : '54px 60px 36px', marginTop: 60 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
          <img src={IMG.logoFull} alt="flip'nsleep" style={{ height: isMobile ? 44 : 58, width: 'auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 24, fontSize: 12.5, maxWidth: 820, margin: '0 auto' }}>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: 13, marginBottom: 10, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Shop</h4>
            <Link to="/product/signature-cold-pillow" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Signature Cold Pillow</Link>
            <Link to="/shop" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>Bundles</Link>
          </div>
          <div>
            <h4 style={{ fontFamily: FONT_SUB, fontSize: 13, marginBottom: 10, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Support</h4>
            <Link to="/faq" style={{ display: 'block', color: '#CFCBF2', textDecoration: 'none', marginBottom: 7 }}>FAQ</Link>
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
