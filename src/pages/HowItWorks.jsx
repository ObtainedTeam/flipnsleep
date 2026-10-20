import { c, BTN, rv, FONT_DISPLAY, EYEBROW, R, SH, T, LH, SP, W } from '../theme';
import { IMG, dim } from '../data';
import { CloudDivider, RangeCards } from '../components/Blocks';
import Reveal from '../components/Reveal';

import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const Step = ({ n, title, text, img, reverse }) => (
    <section className="r-pad grid-2m1 r-gap" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', '40px 40px', '24px 20px'), ...rv('gap', 56, 24), alignItems: 'center' }}>
      <Reveal className="r-order" style={rv('order', reverse ? '2' : '0', '0')}>
        <div className="r-pad" style={{ background: `linear-gradient(160deg, ${c.sky}, ${c.sky2})`, borderRadius: R.lg, boxShadow: SH.card, ...rv('pad', ...SP.card), display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={img} {...dim(img)} loading="lazy" decoding="async" alt="" className="r-maxh" style={{ maxWidth: '100%', ...rv('maxh', 300, 230), objectFit: 'contain', filter: 'drop-shadow(0 12px 20px rgba(32,27,93,.18))' }} />
        </div>
      </Reveal>
      <Reveal delay={120}><div>
        <b style={{ width: 40, height: 40, borderRadius: R.pill, background: c.sky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: T.md[1], marginBottom: 12 }}>{n}</b>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>{title}</h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, color: c.grayD }}>{text}</p>
      </div></Reveal>
    </section>
  );

  return (
    <div>
      <section className="r-pad" style={{ background: `linear-gradient(180deg, ${c.skyDeep}, ${c.sky2})`, textAlign: 'center', ...rv('pad', ...SP.sectionTop) }}>
        <div style={{ ...EYEBROW, color: c.navy }}>How it works</div>
        <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.display), lineHeight: LH.tight, color: c.navy, margin: '8px 0 16px' }}>One flip to a cooler night</h1>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto 32px' }}>
          No fans, no plugs, no gimmicks. The Signature Cold Pillow works with two fabrics, one zipper and physics that never needs charging.
        </p>
        <CloudDivider fill={c.cream} />
      </section>

      <Step n="1" img={IMG.coverFront}
        title="The cool-touch side"
        text="The cooling side is woven from cool-touch fabric with a tested Q-max value of 0.26, that's the instant 'cold pillow feeling' when your skin touches it. Heat is conducted away from your head instead of building up underneath it, which is exactly what you need when a warm flash hits at 3 AM." />

      <Step n="2" img={IMG.coverInside} reverse
        title="Adjustable shredded foam"
        text="Inside sits recycled shredded memory foam (35–40D). Because it's shredded, air keeps moving between the pieces, far less heat retention than a solid foam block. And because there's a zipper, you decide the loft: add filling for side sleeping, remove some for stomach sleeping. One pillow, every sleeping position." />

      <Step n="3" img={IMG.coverBack}
        title="The warm bamboo side"
        text="Cold snap in January? Flip it. The other side is soft bamboo fiber fabric, gentle, breathable and noticeably warmer to the touch. That's why this is a pillow for every season, not just a summer purchase." />

      <section className="r-pad" style={{ textAlign: 'center', ...rv('pad', ...SP.section) }}>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>Try it for 100 nights</h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto 32px', color: c.grayD }}>
          Sleep on it. Adjust it. Flip it. If it doesn't earn its place on your bed within 100 nights, send it back for free and get every dollar refunded.
        </p>
        <Link to="/product/signature-cold-pillow" style={BTN}>Shop the deal</Link>
      </section>

      <RangeCards title="Shop the flip'nsleep range" intro="One pillow, and the cooling bedding built on the same simple idea." />
    </div>
  );
}
