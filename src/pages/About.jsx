import { c, BTN, rv, FONT_DISPLAY, EYEBROW } from '../theme';
import { IMG, dim } from '../data';
import { Link } from 'react-router-dom';
import { CloudDivider, EmailCapture } from '../components/Blocks';
import Reveal from '../components/Reveal';


export default function About() {
  return (
    <div>
      <section className="r-pad" style={{ background: `linear-gradient(180deg, ${c.night}, ${c.navy})`, color: '#fff', textAlign: 'center', ...rv('pad', '70px 40px 0', '48px 24px 0'), position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.night} {...dim(IMG.night)} decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .25 }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ ...EYEBROW, color: c.amber }}>Our story</div>
          <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', 42, 30), margin: '10px 0 12px', lineHeight: 1.2 }}>Built for the 3 AM club</h1>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#E4E1FF', marginBottom: 30 }}>
            flip'nsleep started with a simple observation: millions of people — especially women going through menopause — lie awake at night, too warm to sleep, flipping their pillow to find the cold side. So we built a pillow where the cold side is always there.
          </p>
        </div>
        <CloudDivider fill={c.cream} />
      </section>

      <Reveal><section className="r-pad" style={{ maxWidth: 720, margin: '0 auto', ...rv('pad', '44px 24px', '30px 22px') }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'var(--h2)', color: c.navy, marginBottom: 12 }}>What we believe</h2>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: c.grayD, marginBottom: 18 }}>
          Sleep is not a luxury, and cooling down shouldn't require gadgets. We believe in simple, honest product design: two fabrics that do their job, a filling you can adjust yourself, and certifications you can verify — OEKO-TEX Standard 100 for the fabrics, CertiPUR-US for the foam.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: c.grayD, marginBottom: 18 }}>
          We also believe you shouldn't have to gamble on sleep. That's why every order is a buy-one-get-one-free set, ships free, and comes with a 100-night trial. If it doesn't make your nights better, it goes back on us.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: c.grayD }}>
          flip'nsleep is part of Obtained VOF and ships across the United States and Canada.
        </p>
        <div style={{ textAlign: 'center', marginTop: 26 }}>
          <Link to="/product/signature-cold-pillow" style={BTN}>Shop the deal</Link>
        </div>
      </section></Reveal>

      <EmailCapture />
    </div>
  );
}
