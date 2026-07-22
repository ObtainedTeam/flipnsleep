import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { IMG } from '../data';
import { Link } from 'react-router-dom';
import { ReviewsBlock, CloudDivider, EmailCapture } from '../components/Blocks';

const ROWS = [
  ['Adjustable loft', 'Zip open, add or remove filling for your sleeping position', 'Fixed height — take it or leave it'],
  ['Temperature', 'Dual-sided: cool-touch (Q-max 0.26) and warm bamboo', 'One fabric, often too warm'],
  ['Filling', 'Generous shredded memory foam, air circulates freely', 'Solid block or thin fiber fill that flattens'],
  ['Hygiene', 'Removable, machine-washable outer cover', 'Often not removable or washable'],
  ['Safety', 'OEKO-TEX Standard 100 + CertiPUR-US certified', 'Certification unknown'],
  ['Risk', '100-night trial, free returns, money back', "Once slept on, it's yours"],
];

export default function WhyChooseUs() {
  const isMobile = useIsMobile();
  return (
    <div>
      <section style={{ textAlign: 'center', padding: isMobile ? '40px 20px 8px' : '56px 40px 12px' }}>
        <div style={EYEBROW}>The honest comparison</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 30 : 42, color: c.navy, margin: '8px 0 10px' }}>Why flip'nsleep?</h1>
        <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 460, margin: '0 auto' }}>
          Most pillows make you adapt to them. Ours adapts to you — in height, in temperature, and in how much risk you take buying it.
        </p>
      </section>

      <section style={{ maxWidth: 860, margin: '26px auto 0', padding: '0 16px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#fff', borderRadius: 22, overflow: 'hidden', boxShadow: '0 12px 30px rgba(32,27,93,.10)', minWidth: 560 }}>
          <thead>
            <tr style={{ background: c.navy, color: '#fff' }}>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: FONT_SUB, fontSize: 13 }}></th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: FONT_DISPLAY, fontSize: 15 }}>flip<span style={{ color: c.amber }}>'</span>nsleep ✅</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: FONT_SUB, fontSize: 13, opacity: .8 }}>Standard pillow ❌</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([k, us, them], i) => (
              <tr key={i} style={{ background: i % 2 ? '#F4F7FB' : '#fff' }}>
                <td style={{ padding: '13px 16px', fontFamily: FONT_SUB, fontSize: 13, fontWeight: 600, color: c.navy, whiteSpace: 'nowrap' }}>{k}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, lineHeight: 1.55 }}>{us}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, lineHeight: 1.55, color: c.grayD }}>{them}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ textAlign: 'center', padding: '34px 20px 10px' }}>
        <Link to="/product/signature-cold-pillow" style={BTN}>Shop the 1+1 deal</Link>
      </section>

      <div style={{ marginTop: 40 }}><ReviewsBlock /></div>
      <EmailCapture />
    </div>
  );
}
