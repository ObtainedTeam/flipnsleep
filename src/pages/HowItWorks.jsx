import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { IMG } from '../data';
import { CloudDivider, EmailCapture } from '../components/Blocks';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const isMobile = useIsMobile();

  const Step = ({ n, title, text, img, reverse }) => (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: isMobile ? '18px 20px' : '40px 24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 40, alignItems: 'center' }}>
      <img src={img} alt="" style={{ borderRadius: 22, order: isMobile ? 0 : (reverse ? 2 : 0) }} />
      <div>
        <b style={{ width: 40, height: 40, borderRadius: '50%', background: c.sky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 16, marginBottom: 10 }}>{n}</b>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 30, color: c.navy, marginBottom: 10 }}>{title}</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: c.grayD }}>{text}</p>
      </div>
    </section>
  );

  return (
    <div>
      <section style={{ background: `linear-gradient(180deg, ${c.skyDeep}, ${c.sky2})`, textAlign: 'center', padding: isMobile ? '44px 22px 0' : '64px 40px 0' }}>
        <div style={{ ...EYEBROW, color: c.navy }}>How it works</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 32 : 54, color: c.navy, margin: '8px 0 10px' }}>One flip to a cooler night</h1>
        <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 460, margin: '0 auto 26px' }}>
          No fans, no plugs, no gimmicks. The Signature Cold Pillow works with two fabrics, one zipper and physics that never needs charging.
        </p>
        <CloudDivider fill={c.cream} />
      </section>

      <Step n="1" img={IMG.front}
        title="The cool-touch side"
        text="The cooling side is woven from cool-touch fabric with a tested Q-max value of 0.26 — that's the instant 'cold pillow feeling' when your skin touches it. Heat is conducted away from your head instead of building up underneath it, which is exactly what you need when a warm flash hits at 3 AM." />

      <Step n="2" img={IMG.filling} reverse
        title="Adjustable shredded foam"
        text="Inside sits recycled shredded memory foam (35–40D). Because it's shredded, air keeps moving between the pieces — far less heat retention than a solid foam block. And because there's a zipper, you decide the loft: add filling for side sleeping, remove some for stomach sleeping. One pillow, every sleeping position." />

      <Step n="3" img={IMG.bed}
        title="The warm bamboo side"
        text="Cold snap in January? Flip it. The other side is soft bamboo fiber fabric — gentle, breathable and noticeably warmer to the touch. That's why this is a pillow for every season, not just a summer purchase." />

      <section style={{ textAlign: 'center', padding: isMobile ? '26px 22px 46px' : '30px 40px 60px' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 30, color: c.navy, marginBottom: 10 }}>Try it for 100 nights</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 20px', color: c.grayD }}>
          Sleep on it. Adjust it. Flip it. If it doesn't earn its place on your bed within 100 nights, send it back for free and get every dollar refunded.
        </p>
        <Link to="/product/signature-cold-pillow" style={BTN}>Shop the 1+1 deal</Link>
      </section>

      <EmailCapture />
    </div>
  );
}
