import { c, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, BTN, T, LH, SP, W } from '../theme';
import { FAQ_ITEMS } from '../data';
import { FAQBlock } from '../components/Blocks';
import Reveal from '../components/Reveal';

import { Link } from 'react-router-dom';

export default function FAQ() {
  return (
    <div>
      <section className="r-pad" style={{ textAlign: 'center', ...rv('pad', ...SP.sectionTop) }}>
        <div style={EYEBROW}>Support</div>
        <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), lineHeight: LH.tight, color: c.navy, margin: '8px 0 16px' }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h1>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto' }}>
          Everything about the trial, shipping, washing and adjusting. Still stuck? Email <a href="mailto:info@flipnsleep.com" style={{ fontWeight: 600 }}>info@flipnsleep.com</a>.
        </p>
      </section>
      <Reveal><section className="r-pad" style={rv('pad', '40px 40px 80px', '32px 20px 56px')}>
        <FAQBlock items={FAQ_ITEMS} />
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/product/signature-cold-pillow" style={BTN}>Shop the deal</Link>
        </div>
      </section></Reveal>
    </div>
  );
}
