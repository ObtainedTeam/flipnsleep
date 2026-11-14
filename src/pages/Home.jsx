import { useState } from 'react';
import { Check } from 'lucide-react';
import Ico from '../components/Ico.jsx';
import { Link } from 'react-router-dom';
import { c, BTN, BTNO, ON_DARK, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W, CARD, CHIP } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG, dim, rs, UGC_VIDEOS } from '../data';
import { UGC_BIG, VIDEO_REVIEWS, EXAMPLE_REVIEWS } from '../data/home-content';
import { CartContext } from '../components/Cart';
import Reveal from '../components/Reveal';
import { ReviewsBlock, FAQBlock, TrustAccordion, PillowDeck, ShippingCountdown, ProductGrid, VideoRow } from '../components/Blocks';
import PillowQuiz from '../components/PillowQuiz';
import HomeHero from '../components/HomeHero';
import Innovation from '../components/home/Innovation';
import FlipSection from '../components/home/FlipSection';
import CompareHome from '../components/home/CompareHome';
import BrandStatement from '../components/home/BrandStatement';
import '../components/home/home.css';

export default function Home({ onCartOpen }) {
  const { symbol, isCA } = useCurrency();
  const [selected, setSelected] = useState('1p1');
  const bundle = BUNDLES.find(b => b.id === selected);
  const price = getPrice(bundle, isCA);
  const compare = isCA ? bundle.compareAt.cad : bundle.compareAt.usd;

  const addToCart = () => { CartContext.add(selected, 1); onCartOpen && onCartOpen(); };

  return (
    <div>
      <HomeHero />

      {/* ============ PRODUCT CARD + OFFER ============ */}
      <Reveal className="r-mt" style={{ position: 'relative', zIndex: 2, ...rv('mt', 80, 40) }}><section id="offer" className="r-mw r-mar r-disp" style={{ ...rv('mw', W.page, W.narrow), ...rv('mar', '0 auto 64px', '0 16px 48px'), background: c.sky, borderRadius: R.lg, overflow: 'hidden', border: `1px solid ${c.line}`, ...rv('disp', 'grid', 'block'), gridTemplateColumns: '1.05fr 1fr' }}>
        <div className="r-pad" style={{ ...rv('pad', 28, 16), position: 'relative', display: 'flex', alignItems: 'center' }}>
          <PillowDeck count={bundle.pillows} height={[460, 230]} radius={R.lg} bg="transparent" priority />
          <span className="r-top r-left r-fs r-pad" style={{ position: 'absolute', ...rv('top', 44, 28), ...rv('left', 44, 28), zIndex: 20, background: c.white, color: c.navy, fontWeight: 600, ...rv('fs', ...T.sm), borderRadius: 8, ...rv('pad', '6px 12px', '6px 12px') }}>{bundle.short}</span>
        </div>
        <div className="r-bg r-pad" style={{ ...rv('bg', c.white, c.white), color: c.navy, ...rv('pad', 48, SP.card[1]), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, marginBottom: 8 }}>{PRODUCT.name}</h2>
          <div className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h3), color: c.navy }}>
            {formatPrice(price, symbol)} <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: T.sm[0], color: c.grayD, textDecoration: 'line-through' }}>{formatPrice(compare, symbol)}</span>
          </div>
          <div style={{ margin: '8px 0 2px', fontSize: T.sm[0], color: c.grayD }}>100-night sleep trial, 2-year warranty</div>
          <ul style={{ listStyle: 'none', margin: '16px 0 6px' }}>
            {PRODUCT.usps.map((u, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: T.sm[0], lineHeight: LH.body, marginBottom: 8 }}>
                <Check size={16} strokeWidth={2} aria-hidden="true" style={{ flexShrink: 0, marginTop: 5, color: c.navy }} />{u}
              </li>
            ))}
          </ul>
          {BUNDLES.map(b => {
            const p = getPrice(b, isCA);
            const cm = isCA ? b.compareAt.cad : b.compareAt.usd;
            const active = selected === b.id;
            return (
              <div key={b.id} role="button" tabIndex={0}
                onClick={() => setSelected(b.id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(b.id); } }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, background: active ? c.tint : c.white, border: `1.5px solid ${active ? c.navy : c.line}`, borderRadius: R.sm, padding: '16px 20px', marginTop: 12, cursor: 'pointer', transition: 'background-color .15s, border-color .15s' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: T.sm[0], fontFamily: FONT_SUB }}>{b.label}</div>
                  <div style={{ fontSize: T.sm[0] }}>{formatPrice(p, symbol)} <s style={{ opacity: .6, marginLeft: 6 }}>{formatPrice(cm, symbol)}</s></div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: T.xs[0], color: c.navy, fontWeight: 600 }}>Save {formatPrice(cm - p, symbol)}</span>
              </div>
            );
          })}
          <div style={{ textAlign: 'center', marginTop: 16 }}><ShippingCountdown /></div>
          <div className="row-m-col" style={{ display: 'flex', gap: 12, marginTop: 16, justifyContent: 'center' }}>
            <button onClick={addToCart} style={{ ...BTN, flex: '1 0 auto' }}>Add to cart</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/product/signature-cold-pillow" style={{ color: c.navy, fontSize: T.sm[0], fontWeight: 600, fontFamily: FONT_SUB, textDecoration: 'underline', textUnderlineOffset: 4 }}>See full product details</Link>
          </div>
        </div>
      </section>

      </Reveal>

      <Reveal delay={100}><div className="r-mw r-mar" style={{ ...rv('mw', W.page, W.narrow), ...rv('mar', '0 auto 48px', '0 16px 32px') }}>
        <TrustAccordion specs={<ul style={{ listStyle: 'none' }}>{PRODUCT.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>} />
      </div></Reveal>

      {/* ============ EMPATHY / NIGHT (breed publiek) ============ */}
      <section className="r-pad" style={{ background: c.tint, ...rv('pad', ...SP.section) }}>
        <Reveal><div className="home-night" style={{ maxWidth: W.page, margin: '0 auto' }}>
          <img src={IMG.night} {...dim(IMG.night)} {...rs(IMG.night, '(max-width: 767px) 100vw, 560px')} loading="lazy" decoding="async" alt="The Signature Cold Pillow on a bed at night" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: R.lg, display: 'block', aspectRatio: '5 / 4' }} />
          <div>
            <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), lineHeight: LH.tight, color: c.navy, letterSpacing: '-0.01em' }}>
              3 AM. Awake.<br />Too warm to settle.
            </h2>
            <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, margin: '20px 0 0', maxWidth: 520, color: c.grayD }}>
              A warm bedroom, a restless mind, or the way sleep shifts as we get older: waking up hot is one of the most common reasons people stir in the middle of the night. A pillow that traps heat keeps you there. Cooling your head is one of the quickest ways to drift back to sleep.
            </p>
            <dl className="home-night-facts">
              {[['Both sides', 'cool-touch for warm nights, soft bamboo for cold ones'], ['Q-max 0.26', 'tested cool-touch value of the cold side'], ['100 nights', 'to try it risk-free']].map(([b, s], i) => (
                <div key={i}>
                  <dt style={{ fontFamily: FONT_DISPLAY, fontSize: T.h3[1], color: c.navy, lineHeight: LH.head }}>{b}</dt>
                  <dd style={{ fontSize: T.sm[1], lineHeight: 1.5, margin: '6px 0 0', color: c.grayD }}>{s}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div></Reveal>
      </section>

      {/* ============ EXPLORE PRODUCTS (Mellow) ============ */}
      <ProductGrid />

      {/* ============ REDEFINING SLEEP (Mellow) ============ */}
      <Innovation />

      {/* ============ JUST FLIP IT ============ */}
      <FlipSection />

      {/* ============ WAAROM SLAAP OP LEEFTIJD (geen medische claims) ============ */}
      <Reveal><section className="r-pad" style={{ ...rv('pad', ...SP.section), maxWidth: W.page, margin: '0 auto' }}>
        <div className="home-age">
          <div>
            <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), color: c.navy, margin: '0 0 20px', lineHeight: LH.head, letterSpacing: '-0.01em' }}>Good sleep gets more precious with age</h2>
            <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, color: c.grayD, maxWidth: 560 }}>
              Sleep tends to get lighter and easier to interrupt as the years add up, and a warm room or a pillow that holds heat is often all it takes to cut a night short. Experts generally suggest most adults aim for seven to nine hours, yet comfortable, unbroken sleep gets harder to come by. We can't change your body clock, but we can make the bed a cooler, calmer place to be, so drifting off and staying asleep is a little easier.
            </p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: `1px solid ${c.line}` }}>
            {[
              ['😴', 'Lighter with age', 'Sleep naturally becomes shorter and easier to disturb over the years.'],
              ['🌡️', 'Temperature matters', 'A cooler sleep surface helps many people settle down and stay settled.'],
              ['🛏️', 'Comfort you control', 'Your pillow and bedding are the part of a good night you can actually change tonight.'],
            ].map(([icon, t, s], i) => (
              <li key={i} style={{ display: 'flex', gap: 20, padding: '24px 0', borderBottom: `1px solid ${c.line}` }}>
                <Ico e={icon} size={24} style={{ color: c.navy, marginTop: 2 }} />
                <div>
                  <h3 className="r-fs" style={{ fontFamily: FONT_SUB, ...rv('fs', ...T.h4), fontWeight: 500, color: c.navy, marginBottom: 6, lineHeight: LH.head }}>{t}</h3>
                  <p className="r-fs" style={{ ...rv('fs', ...T.sm), lineHeight: LH.body, color: c.grayD }}>{s}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p style={{ fontSize: T.xs[0], lineHeight: LH.body, color: c.grayD, maxWidth: W.text, margin: '32px 0 0' }}>
          flip'nsleep makes comfort products, not medical devices. Nothing on this page is medical advice or a claim to diagnose, treat or prevent any condition. If sleep problems persist, please speak to a doctor.
        </p>
      </section></Reveal>

      {/* ============ WHY / COMPARISON TEASER ============ */}
      <CompareHome />

      {/* ============ WE DON'T SLEEP UNTIL YOU DO ============ */}
      <BrandStatement />

      {/* ============ VIDEO ROW ============ */}
      <VideoRow videos={UGC_VIDEOS} big={UGC_BIG} />

      {/* ============ REVIEWS (Judge.me; zonder echte reviews een gelabelde demo-staat) ============ */}
      <ReviewsBlock demo={{ videos: VIDEO_REVIEWS, reviews: EXAMPLE_REVIEWS }} />

      <PillowQuiz />

      {/* ============ FAQ TEASER ============ */}
      <Reveal><section className="r-pad" style={rv('pad', ...SP.section)}>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, textAlign: 'center', marginBottom: 24 }}>Questions, answered</h2>
        <FAQBlock limit={4} />
        <div style={{ textAlign: 'center', marginTop: 32 }}><Link to="/faq" style={BTNO}>All questions</Link></div>
      </section></Reveal>

      {/* ============ FINAL CTA (breder) ============ */}
      <section className="r-pad" style={{ background: c.navy, color: c.white, ...rv('pad', ...SP.section) }}>
        <Reveal><div className="home-cta" style={{ maxWidth: W.page, margin: '0 auto' }}>
          <div>
            <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), lineHeight: LH.tight, letterSpacing: '-0.01em' }}>Your coolest night starts tonight</h2>
            <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.lilac, margin: '16px 0 0', maxWidth: 560, lineHeight: LH.body }}>
              Whatever keeps you up when the nights get warm, flip'nsleep makes the bed a cooler place to be. Try it for 100 nights, risk-free, with free shipping across the US and Canada.
            </p>
          </div>
          <a href="#offer" style={BTN}>Order your Cold Pillow</a>
        </div></Reveal>
      </section>

      {/* ============ SEO-TEKSTBLOK — koeler slapen, breder publiek ============ */}
      <Reveal y={16}><section className="r-pad" style={{ ...rv('pad', ...SP.section), color: c.grayD }}><div className="home-seo" style={{ maxWidth: W.page, margin: '0 auto' }}><div>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>The cooling pillow for hot sleepers</h2>
        <p style={{ fontSize: T.sm[0], lineHeight: LH.loose, marginBottom: 24 }}>
          If you regularly wake up hot, you're in good company: overheating at night is one of the most common sleep complaints, whether it comes from a warm bedroom, the way the body holds heat as we get older, or hormonal changes during menopause and perimenopause. An ordinary pillow that traps heat under your head only makes it harder to drift back off. A cooling pillow tackles the problem where it starts, since your head is one of the fastest places your body sheds heat.
        </p>
        </div><div>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>How the Signature Cold Pillow helps you sleep cooler</h2>
        <p style={{ fontSize: T.sm[0], lineHeight: LH.loose, marginBottom: 24 }}>
          The flip'nsleep Signature Cold Pillow combines a cool-touch fabric side (tested Q-max cooling value of 0.26) with an adjustable shredded memory foam core that lets air circulate instead of building up heat. Flip it to the soft bamboo side in colder months, so it's one pillow for hot sleepers all year round. The loft adjusts to every sleeping position: side sleepers keep more filling for neck support, back and stomach sleepers take some out. Pair it with the Breeze Bamboo Sheet Set, the Cloudweight Weighted Blanket or the Arctic Air Cooling Comforter for a bed that stays cool from top to bottom. Every order comes with free shipping, a 100-night sleep trial and a 2-year warranty, so trying a better night is risk-free. We ship across the United States and Canada.
        </p>
      </div></div></section></Reveal>
    </div>
  );
}
