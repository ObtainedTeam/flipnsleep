import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, rv, FONT_SUB, T, LH, W } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { BUNDLES, dim } from '../data';
import { PROMO_VIDEO } from '../data/reviews-media';
import Reveal from '../components/Reveal';
import HomeHero from '../components/HomeHero';
import { Mascot, NightBand } from '../components/Sky';
import { TrustRow, ProductGrid, FlipBand, Special, Layers, Steps3, CompareBand, FAQSection } from '../components/Sections';
import { ReviewWallHome, ReviewCarouselBand, useHasReviews, HOME_TEXT_POOL } from '../components/ReviewWall';

// Achtergrond van de BOGO-tegel: poster, en zodra PROMO_VIDEO.src is ingevuld
// een video die muted speelt zolang de tegel in beeld is.
function PromoMedia() {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined; // alleen de poster
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!v.getAttribute('src')) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <div className="sk-promo-media" aria-hidden="true">
      {PROMO_VIDEO.src
        ? <video ref={ref} data-src={PROMO_VIDEO.src} poster={PROMO_VIDEO.poster} muted loop playsInline preload="none" />
        : <img src={PROMO_VIDEO.poster} {...dim(PROMO_VIDEO.poster)} loading="lazy" decoding="async" alt="" />}
    </div>
  );
}

// Homepage. Volgorde: hemel-hero, twee promo's en de beloftes, productraster,
// videoreviews, flip, special, lagen, drie stappen, vergelijking, nachtband met
// de doorlopende reviews, vragen.
export default function Home() {
  const { symbol, isCA } = useCurrency();
  const deal = formatPrice(getPrice(BUNDLES[0], isCA), symbol);
  const hasReviews = useHasReviews();

  return (
    <div>
      <HomeHero />

      <section><div className="sk-wrap">
        <div className="sk-promos">
          <Link className="sk-promo is-a has-media" to="/product/signature-cold-pillow?bundle=1p1">
            <div><h3>Buy one, <span className="sk-amber">get one free</span></h3><p>Two Signature Cold Pillows for {deal}, shipped free.</p><span className="is-go">Shop the deal</span></div>
            <PromoMedia />
          </Link>
          <Link className="sk-promo is-b" to="/quiz">
            <div><h3>How much filling do you need?</h3><p>Answer a few questions and find the height for the way you sleep.</p><span className="is-go">Take the sleep quiz</span></div>
            <div className="sk-promo-art"><Mascot className="sk-bob" /></div>
          </Link>
        </div>
        <TrustRow />
      </div></section>

      <ProductGrid />
      <ReviewWallHome />
      <FlipBand />
      <Special />
      <Layers />
      <Steps3 />
      <CompareBand flush />

      <NightBand id="offer" bottom={hasReviews ? 'sky' : 'ink'} title="Your coolest night" accent="starts tonight"
        text="Try it for 100 nights, risk-free. Not sleeping cooler? Ship it back for free and get a full refund."
        cta={{ label: 'Order your Cold Pillow', to: '/product/signature-cold-pillow' }} />

      {/* Doorlopende carousel met echte Judge.me-reviews; zonder reviews staat hier niets */}
      <ReviewCarouselBand skip={HOME_TEXT_POOL} />

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
