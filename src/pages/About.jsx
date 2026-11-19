import { Link } from 'react-router-dom';
import { IMG, dim, rs } from '../data';
import Bento from '../components/about/Bento';
import Reveal from '../components/Reveal';
import { Cloud, PageHead, NightBand } from '../components/Sky';

const VALUES = [
  ['Honest', 'Real specs, real certifications and no made-up reviews. If we say it, you can check it.'],
  ['Comfortable', 'Adjustable fill and soft fabrics, so the pillow fits you instead of the other way around.'],
  ['Cool', 'Breathable materials and a cool-touch side that help you stay comfortable on warm nights.'],
];

export default function About() {
  return (
    <div>
      <PageHead title="Built for the 3 AM club"
        intro="flip'nsleep started with a simple observation: hot sleepers everywhere lie awake at night, too warm to settle, flipping their pillow to find the cold side. So we built a pillow where the cold side is always there." />

      <section className="sk-sec" style={{ paddingTop: 32 }}><div className="sk-wrap">
        <Reveal once><div className="sk-tile" style={{ aspectRatio: 'auto', minHeight: 'clamp(240px, 36vw, 460px)' }}>
          <Cloud className="is-a sk-drift" style={{ width: '22%' }} /><Cloud className="is-b sk-drift" style={{ width: '26%' }} />
          <img className="sk-bob" src={IMG.coverDuo} {...dim(IMG.coverDuo)} {...rs(IMG.coverDuo, '(max-width: 767px) 70vw, 520px')} decoding="async" alt="Two Signature Cold Pillows, cool side and bamboo side" style={{ width: 'min(70%, 520px)' }} />
        </div></Reveal>
        <div className="sk-grid is-3" style={{ marginTop: 24 }}>
          {VALUES.map(([t, d]) => (
            <div key={t} className="sk-card"><h3 className="sk-h3">{t}</h3><p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 8 }}>{d}</p></div>
          ))}
        </div>
      </div></section>

      <Bento />

      <section className="sk-sec"><div className="sk-wrap"><Reveal once><div className="sk-prose">
        <h2 style={{ marginTop: 0 }}>What we believe</h2>
        <p>Sleep is not a luxury, and cooling down shouldn't require gadgets. We believe in simple, honest product design: two fabrics that do their job, a filling you can adjust yourself, and certifications you can verify: OEKO-TEX Standard 100 for the fabrics, CertiPUR-US for the foam.</p>
        <p>We also believe you shouldn't have to gamble on sleep. That's why every order is a buy-one-get-one-free set, ships free, and comes with a 100-night trial. If it doesn't make your nights better, it goes back on us.</p>
        <p>flip'nsleep is part of Obtained VOF and ships across the United States and Canada.</p>
        <div style={{ marginTop: 32 }}><Link to="/product/signature-cold-pillow" className="sk-btn">Shop the deal</Link></div>
      </div></Reveal></div></section>

      <NightBand title="We don't sleep" accent="until you do"
        text="Good enough isn't good enough. Not in our products, not in our service, and not in your sleep."
        cta={{ label: 'How it works', to: '/how-it-works' }} />
    </div>
  );
}
