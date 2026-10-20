import { c, BTN, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, T, LH, SP, W, CARD } from '../theme';
import { Link } from 'react-router-dom';
import { ReviewsBlock, EmailCapture, CompareCards } from '../components/Blocks';
import Reveal from '../components/Reveal';


const ROWS = [
  ['Adjustable loft', 'Zip open, add or remove filling for your sleeping position', 'Fixed height — take it or leave it'],
  ['Temperature', 'Dual-sided: cool-touch (Q-max 0.26) and warm bamboo', 'One fabric, often too warm'],
  ['Filling', 'Generous shredded memory foam, air circulates freely', 'Solid block or thin fiber fill that flattens'],
  ['Hygiene', 'Removable, machine-washable outer cover', 'Often not removable or washable'],
  ['Safety', 'OEKO-TEX Standard 100 + CertiPUR-US certified', 'Certification unknown'],
  ['Risk', '100-night trial, free returns, money back', "Once slept on, it's yours"],
];

export default function WhyChooseUs() {
  return (
    <div>
      <section className="r-pad" style={{ textAlign: 'center', ...rv('pad', ...SP.sectionTop) }}>
        <div style={EYEBROW}>The honest comparison</div>
        <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), lineHeight: LH.tight, color: c.navy, margin: '8px 0 16px' }}>Why flip'nsleep?</h1>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto' }}>
          Most pillows make you adapt to them. Ours adapts to you — in height, in temperature, and in how much risk you take buying it.
        </p>
      </section>

      <Reveal><section className="r-mw r-mar r-pad" style={{ ...rv('mw', W.page - 80, W.page), ...rv('mar', '40px auto 0', '32px auto 0'), ...rv('pad', `8px ${SP.gutter[0]}px 40px`, `8px ${SP.gutter[1]}px 40px`) }}>
        <div className="m-only"><CompareCards rows={ROWS} ours="flip'nsleep" theirs="Standard pillow" /></div>
        <table className="d-only" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, ...CARD, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: c.navy, color: c.white }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: FONT_SUB, fontSize: T.sm[0] }}></th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: FONT_DISPLAY, fontSize: T.md[1] }}>flip<span style={{ color: c.amber }}>'</span>nsleep ✅</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: FONT_SUB, fontSize: T.sm[0], opacity: .8 }}>Standard pillow ❌</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([k, us, them], i) => (
              <tr key={i} style={{ background: i % 2 ? c.cream : c.white }}>
                <td style={{ padding: '14px 20px', fontFamily: FONT_SUB, fontSize: T.sm[0], fontWeight: 600, color: c.navy, whiteSpace: 'nowrap' }}>{k}</td>
                <td style={{ padding: '14px 20px', fontSize: T.sm[0], lineHeight: LH.body }}>{us}</td>
                <td style={{ padding: '14px 20px', fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD }}>{them}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section></Reveal>

      <section className="r-pad" style={{ textAlign: 'center', ...rv('pad', '16px 40px 80px', '8px 20px 56px') }}>
        <Link to="/product/signature-cold-pillow" style={BTN}>Shop the deal</Link>
      </section>

      <ReviewsBlock />
      <EmailCapture />
    </div>
  );
}
