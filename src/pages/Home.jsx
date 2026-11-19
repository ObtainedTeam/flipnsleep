import { Link } from 'react-router-dom';
import { c, rv, FONT_SUB, T, LH, W } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { BUNDLES, IMG, dim, rs } from '../data';
import { EXAMPLE_REVIEWS } from '../data/home-content';
import Reveal from '../components/Reveal';
import { ReviewsBlock } from '../components/Blocks';
import HomeHero from '../components/HomeHero';
import { Cloud, NightBand } from '../components/Sky';
import { TrustRow, ProductRail, FlipBand, Special, Layers, Steps3, CompareBand, FAQSection } from '../components/Sections';

// Homepage volgens het redesign (kleurset 1). Volgorde: hemel-hero, twee
// promo's en de beloftes, productrij, flip, special, lagen, drie stappen,
// vergelijking, nachtband, reviews, vragen.
export default function Home() {
  const { symbol, isCA } = useCurrency();
  const deal = formatPrice(getPrice(BUNDLES[0], isCA), symbol);

  return (
    <div>
      <HomeHero />

      <section><div className="sk-wrap">
        <div className="sk-promos">
          <Link className="sk-promo is-a" to="/product/signature-cold-pillow">
            <div><h3>Buy one, <span className="sk-amber">get one free</span></h3><p>Two Signature Cold Pillows for {deal}, shipped free.</p><span className="is-go">Shop the deal</span></div>
            <div className="sk-promo-art"><Cloud className="sk-drift" /><img src={IMG.coverDuo} {...dim(IMG.coverDuo)} {...rs(IMG.coverDuo, '210px')} loading="lazy" decoding="async" alt="" /></div>
          </Link>
          <Link className="sk-promo is-b" to="/quiz">
            <div><h3>How much fill do you need?</h3><p>Answer a few questions and find the height for the way you sleep.</p><span className="is-go">Take the sleep quiz</span></div>
            <div className="sk-promo-art"><img className="sk-bob" src={IMG.iconCloud} {...dim(IMG.iconCloud)} loading="lazy" decoding="async" alt="" /></div>
          </Link>
        </div>
        <TrustRow />
      </div></section>

      <ProductRail />
      <FlipBand />
      <Special />
      <Layers />
      <Steps3 />
      <CompareBand flush />

      <NightBand id="offer" strip title="Your coolest night" accent="starts tonight"
        text="Try it for 100 nights, risk-free. Not sleeping cooler? Ship it back for free and get a full refund."
        cta={{ label: 'Order your Cold Pillow', to: '/product/signature-cold-pillow' }} />

      {/* Reviews: echte Judge.me-reviews, anders gelabelde voorbeelden */}
      <ReviewsBlock demo={{ reviews: EXAMPLE_REVIEWS }} noTop />

      <FAQSection />

      {/* Tekstblok voor zoekmachines: rustig, twee kolommen, zonder opsmuk */}
      <Reveal y={16} once><section style={{ borderTop: `1px solid ${c.line}` }}><div className="sk-wrap sk-sec grid-2m1 r-gap" style={{ ...rv('gap', 64, 32), color: c.grayD, maxWidth: W.page + 80 }}>
        <div>
          <h2 className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>The cooling pillow for hot sleepers</h2>
          <p style={{ fontSize: T.sm[0], lineHeight: LH.loose }}>
            If you regularly wake up hot, you're in good company: overheating at night is one of the most common sleep complaints, whether it comes from a warm bedroom, the way the body holds heat as we get older, or hormonal changes during menopause and perimenopause. An ordinary pillow that traps heat under your head only makes it harder to drift back off. A cooling pillow tackles the problem where it starts, since your head is one of the fastest places your body sheds heat.
          </p>
        </div>
        <div>
          <h2 className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>How the Signature Cold Pillow helps you sleep cooler</h2>
          <p style={{ fontSize: T.sm[0], lineHeight: LH.loose }}>
            The flip'nsleep Signature Cold Pillow combines a cool-touch fabric side (tested Q-max cooling value of 0.26) with an adjustable shredded memory foam core that lets air circulate instead of building up heat. Flip it to the soft bamboo side in colder months, so it's one pillow for hot sleepers all year round. The loft adjusts to every sleeping position: side sleepers keep more filling for neck support, back and stomach sleepers take some out. Pair it with the Breeze Bamboo Sheet Set, the Cloudweight Weighted Blanket or the Arctic Air Cooling Comforter for a bed that stays cool from top to bottom. Every order comes with free shipping, a 100-night sleep trial and a 2-year warranty, so trying a better night is risk-free. We ship across the United States and Canada.
          </p>
        </div>
      </div></section></Reveal>
    </div>
  );
}
