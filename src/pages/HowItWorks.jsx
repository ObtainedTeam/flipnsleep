import { IMG, dim, rs } from '../data';
import Reveal from '../components/Reveal';
import { Cloud, PageHead, NightBand } from '../components/Sky';
import { Steps3, ProductRail } from '../components/Sections';

// Drie onderdelen van het kussen, elk met een wolkentegel; daarna de drie
// stappen om het af te stellen.
const PARTS = [
  [IMG.coverFront, 'The cool-touch side',
    "The cooling side is woven from cool-touch fabric with a tested Q-max value of 0.26: that instant cold-pillow feeling when your skin touches it. Heat is conducted away from your head instead of building up underneath it, which is exactly what you want when you wake up warm at 3 AM."],
  [IMG.coverInside, 'Adjustable shredded foam',
    "Inside sits recycled shredded memory foam (35–40D). Because it's shredded, air keeps moving between the pieces, with far less heat retention than a solid foam block. And because there's a zipper, you decide the loft: add filling for side sleeping, remove some for stomach sleeping. One pillow, every sleeping position."],
  [IMG.coverBack, 'The cozy bamboo side',
    "Cold snap in January? Flip it. The other side is soft bamboo fiber fabric: gentle, breathable and noticeably warmer to the touch. That's why this is a pillow for every season, not just a summer purchase."],
];

export default function HowItWorks() {
  return (
    <div>
      <PageHead title="One flip to a cooler night" intro="No fans, no plugs, no gimmicks. The Signature Cold Pillow works with two fabrics, one zipper and physics that never needs charging." />

      <section className="sk-sec" style={{ paddingTop: 32 }}><div className="sk-wrap sk-stack-rows">
        {PARTS.map(([img, title, text], i) => (
          <div key={title} className={`sk-duo${i % 2 ? ' is-rev' : ''}`}>
            <Reveal once><div className="sk-tile">
              <Cloud className="is-a sk-drift" /><Cloud className="is-b sk-drift" />
              <img className="sk-bob" src={img} {...dim(img)} {...rs(img, '(max-width: 899px) 64vw, 400px')} loading={i ? 'lazy' : undefined} decoding="async" alt="" />
            </div></Reveal>
            <Reveal once delay={100}>
              <h2 className="sk-h2">{title}</h2>
              <p className="sk-lead" style={{ marginTop: 16 }}>{text}</p>
            </Reveal>
          </div>
        ))}
      </div></section>

      <Steps3 />

      <NightBand title="Try it for" accent="100 nights"
        text="Sleep on it. Adjust it. Flip it. If it doesn't earn its place on your bed within 100 nights, send it back for free and get every dollar refunded."
        cta={{ label: 'Shop the deal', to: '/product/signature-cold-pillow' }} />

      <ProductRail title="Shop the flip'nsleep range" intro="One pillow, and the cooling bedding built on the same simple idea." />
    </div>
  );
}
