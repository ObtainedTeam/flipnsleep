import { c, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, BTN } from '../theme';
import { FAQ_ITEMS } from '../data';
import { FAQBlock, EmailCapture } from '../components/Blocks';
import Reveal from '../components/Reveal';

import { Link } from 'react-router-dom';

export default function FAQ() {
  return (
    <div>
      <section className="r-pad" style={{ textAlign: 'center', ...rv('pad', '56px 40px 10px', '40px 20px 8px') }}>
        <div style={EYEBROW}>Support</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 'var(--h1)', color: c.navy, margin: '8px 0 10px' }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h1>
        <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 420, margin: '0 auto' }}>
          Everything about the trial, shipping, washing and adjusting. Still stuck? Email <a href="mailto:support@flipnsleep.com" style={{ fontWeight: 600 }}>support@flipnsleep.com</a>.
        </p>
      </section>
      <Reveal><section className="r-pad" style={rv('pad', '26px 40px 56px', '20px 22px 40px')}>
        <FAQBlock items={FAQ_ITEMS} />
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link to="/product/signature-cold-pillow" style={BTN}>Shop the deal</Link>
        </div>
      </section></Reveal>
      <EmailCapture />
    </div>
  );
}
