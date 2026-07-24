import { c, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW, BTN } from '../theme';
import { FAQ_ITEMS } from '../data';
import { FAQBlock, EmailCapture } from '../components/Blocks';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const isMobile = useIsMobile();
  return (
    <div>
      <section style={{ textAlign: 'center', padding: isMobile ? '40px 20px 8px' : '56px 40px 10px' }}>
        <div style={EYEBROW}>Support</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 30 : 50, color: c.navy, margin: '8px 0 10px' }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h1>
        <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 420, margin: '0 auto' }}>
          Everything about the trial, shipping, washing and adjusting. Still stuck? Email <a href="mailto:support@flipnsleep.com" style={{ fontWeight: 600 }}>support@flipnsleep.com</a>.
        </p>
      </section>
      <section style={{ padding: isMobile ? '20px 22px 40px' : '26px 40px 56px' }}>
        <FAQBlock items={FAQ_ITEMS} />
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link to="/product/signature-cold-pillow" style={BTN}>Shop the 1+1 deal</Link>
        </div>
      </section>
      <EmailCapture />
    </div>
  );
}
