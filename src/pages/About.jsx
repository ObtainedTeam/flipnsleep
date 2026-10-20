import { c, BTN, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W, CARD } from '../theme';
import { IMG, dim } from '../data';
import { Link } from 'react-router-dom';
import { CloudDivider } from '../components/Blocks';
import Reveal from '../components/Reveal';


export default function About() {
  return (
    <div>
      <section className="r-pad" style={{ background: `linear-gradient(180deg, ${c.navy}, ${c.purple})`, color: c.white, textAlign: 'center', ...rv('pad', ...SP.sectionTop), position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.night} {...dim(IMG.night)} decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .25 }} />
        <div style={{ position: 'relative', maxWidth: W.text, margin: '0 auto' }}>
          <div style={{ ...EYEBROW, color: c.amber }}>Our story</div>
          <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), margin: '8px 0 16px', lineHeight: LH.tight, textShadow: SH.text }}>Built for the 3 AM club</h1>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, color: c.lilac, maxWidth: W.narrow, margin: '0 auto 32px' }}>
            flip'nsleep started with a simple observation: hot sleepers everywhere lie awake at night, too warm to settle, flipping their pillow to find the cold side. Whether it's a warm bedroom, a partner who runs hot or the way sleep shifts over the years, the fix should be simple. So we built a pillow where the cold side is always there.
          </p>
        </div>
        {/* Boven de donkere foto-overlay leggen, anders kleurt de wolkenrand grijs */}
        <div style={{ position: 'relative', zIndex: 1 }}><CloudDivider fill={c.cream} /></div>
      </section>

      <Reveal><section className="r-pad" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', '48px 40px 0', '32px 20px 0') }}>
        <img src={IMG.bed} {...dim(IMG.bed)} loading="lazy" decoding="async" alt="The Signature Cold Pillow on a made bed" className="r-h" style={{ display: 'block', width: '100%', ...rv('h', 460, 240), objectFit: 'cover', borderRadius: R.lg, boxShadow: SH.strong }} />
        <div className="grid-3m1 r-gap" style={{ ...rv('gap', ...SP.gap), marginTop: 40 }}>
          {[
            ['Honest', 'Real specs, real certifications and no made-up reviews. If we say it, you can check it.'],
            ['Comfortable', 'Adjustable fill and soft fabrics, so the pillow fits you instead of the other way around.'],
            ['Cool', 'Breathable materials and a cool-touch side that help you stay comfortable on warm nights.'],
          ].map(([t, d], i) => (
            <div key={i} className="r-pad" style={{ ...CARD, ...rv('pad', ...SP.card) }}>
              <h3 className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 8 }}>{t}</h3>
              <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD }}>{d}</p>
            </div>
          ))}
        </div>
      </section></Reveal>

      <Reveal><section className="r-pad" style={{ maxWidth: W.text + 80, margin: '0 auto', ...rv('pad', ...SP.section) }}>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, marginBottom: 16 }}>What we believe</h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, color: c.grayD, marginBottom: 20 }}>
          Sleep is not a luxury, and cooling down shouldn't require gadgets. We believe in simple, honest product design: two fabrics that do their job, a filling you can adjust yourself, and certifications you can verify: OEKO-TEX Standard 100 for the fabrics, CertiPUR-US for the foam.
        </p>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, color: c.grayD, marginBottom: 20 }}>
          We also believe you shouldn't have to gamble on sleep. That's why every order is a buy-one-get-one-free set, ships free, and comes with a 100-night trial. If it doesn't make your nights better, it goes back on us.
        </p>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, color: c.grayD }}>
          flip'nsleep is part of Obtained VOF and ships across the United States and Canada.
        </p>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/product/signature-cold-pillow" style={BTN}>Shop the deal</Link>
        </div>
      </section></Reveal>
    </div>
  );
}
