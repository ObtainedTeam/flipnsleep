import { useState } from 'react';
import { Link } from 'react-router-dom';
import { c, BTN, BTNO, ON_DARK, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W, CARD, CHIP } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG, dim, UGC_VIDEOS } from '../data';
import { UGC_BIG, VIDEO_REVIEWS, EXAMPLE_REVIEWS } from '../data/home-content';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
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
      <Reveal className="r-mt" style={{ position: 'relative', zIndex: 2, ...rv('mt', -84, -50) }}><section id="offer" className="r-mw r-mar r-disp" style={{ ...rv('mw', W.page, W.narrow), ...rv('mar', '0 auto 64px', '0 16px 48px'), background: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 100%)`, borderRadius: R.lg, overflow: 'hidden', boxShadow: SH.strong, ...rv('disp', 'grid', 'block'), gridTemplateColumns: '1.05fr 1fr' }}>
        <div className="r-pad" style={{ ...rv('pad', 28, 16), position: 'relative', display: 'flex', alignItems: 'center' }}>
          <PillowDeck count={bundle.pillows} height={[460, 230]} radius={R.lg} bg="transparent" priority />
          <span className="r-top r-left r-fs r-pad" style={{ position: 'absolute', ...rv('top', 44, 28), ...rv('left', 44, 28), zIndex: 20, background: c.amber, color: c.navy, fontWeight: 700, ...rv('fs', ...T.sm), borderRadius: R.pill, ...rv('pad', '9px 20px', '7px 16px'), boxShadow: SH.btn }}>{bundle.short}</span>
        </div>
        <div className="r-bg r-pad" style={{ ...rv('bg', `linear-gradient(135deg, ${c.purple}, ${c.navy})`, `linear-gradient(180deg, ${c.purple}, ${c.navy})`), color: c.white, ...rv('pad', 40, SP.card[1]), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, marginBottom: 6, textShadow: SH.text }}>{PRODUCT.name}</h2>
          <div className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h3), color: c.amber }}>
            {formatPrice(price, symbol)} <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: T.sm[0], color: c.lilac, opacity: .6 }}>{formatPrice(compare, symbol)}</span>
          </div>
          <div style={{ margin: '8px 0 2px', fontSize: T.sm[0], color: c.lilac }}>🌙 100-night sleep trial · 🛡️ 2-year warranty</div>
          <ul style={{ listStyle: 'none', margin: '16px 0 6px' }}>
            {PRODUCT.usps.map((u, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: T.sm[0], lineHeight: LH.body, marginBottom: 8 }}>
                <img src={IMG.iconCloud} {...dim(IMG.iconCloud)} loading="lazy" decoding="async" alt="" style={{ height: 14, marginTop: 3 }} />{u}
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
                style={{ display: 'flex', alignItems: 'center', gap: 10, background: active ? 'rgba(255,255,255,.24)' : 'rgba(255,255,255,.12)', border: `2px solid ${active ? c.amber : 'transparent'}`, borderRadius: R.sm, padding: '14px 16px', marginTop: 12, cursor: 'pointer', transition: 'all .15s' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: T.sm[0], fontFamily: FONT_SUB }}>{b.label}</div>
                  <div style={{ fontSize: T.sm[0] }}>{formatPrice(p, symbol)} <s style={{ opacity: .6, marginLeft: 6 }}>{formatPrice(cm, symbol)}</s></div>
                </div>
                <span style={{ ...CHIP, marginLeft: 'auto', background: c.navy, color: c.white, fontSize: T.xs[0] }}>Save {formatPrice(cm - p, symbol)}</span>
              </div>
            );
          })}
          <div style={{ textAlign: 'center', marginTop: 16 }}><ShippingCountdown /></div>
          <div className="row-m-col" style={{ display: 'flex', gap: 12, marginTop: 16, justifyContent: 'center' }}>
            <button onClick={() => buyNow(selected)} style={{ ...BTN, flex: '1 0 auto' }}>Order your Cold Pillow now</button>
            <button onClick={addToCart} className="r-flex" style={{ ...BTNO, ...ON_DARK, ...rv('flex', '0 0 auto', '0 1 auto') }}>Add to cart</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/product/signature-cold-pillow" style={{ color: c.white, fontSize: T.sm[0], fontWeight: 600, fontFamily: FONT_SUB, textDecoration: 'underline', textUnderlineOffset: 3, opacity: .9 }}>See full product details →</Link>
          </div>
        </div>
      </section>

      </Reveal>

      <Reveal delay={100}><div className="r-mw r-mar" style={{ ...rv('mw', W.page, W.narrow), ...rv('mar', '0 auto 48px', '0 16px 32px') }}>
        <TrustAccordion specs={<ul style={{ listStyle: 'none' }}>{PRODUCT.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>} />
      </div></Reveal>

      {/* ============ EMPATHY / NIGHT (breed publiek) ============ */}
      <section className="r-pad" style={{ background: `linear-gradient(180deg, ${c.night} 0%, ${c.navy} 100%)`, color: c.white, ...rv('pad', ...SP.section), position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.night} {...dim(IMG.night)} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .28 }} />
        <Reveal><div style={{ position: 'relative', maxWidth: W.text, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), lineHeight: LH.head, textShadow: SH.text }}>
            3 AM. Awake.<br /><span style={{ color: c.amber }}>Too warm to settle.</span>
          </h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, margin: '20px auto 0', maxWidth: W.narrow, color: c.lilac }}>
            A warm bedroom, a restless mind, or the way sleep shifts as we get older: waking up hot is one of the most common reasons people stir in the middle of the night. A pillow that traps heat keeps you there. Cooling your head is one of the quickest ways to drift back to sleep.
          </p>
          <div className="r-gap" style={{ display: 'flex', ...rv('gap', ...SP.gap), justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            {[['Both sides', 'cool-touch for warm nights, soft bamboo for cold ones'], ['Q-max 0.26', 'tested cool-touch value of the cold side'], ['100 nights', 'to try it risk-free']].map(([b, s], i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.10)', borderRadius: R.sm, padding: '16px 18px', textAlign: 'center', minWidth: 110, maxWidth: 160 }}>
                <b style={{ display: 'block', fontFamily: FONT_DISPLAY, fontSize: T.lg[0], color: c.amber }}>{b}</b>
                <span style={{ fontSize: T.xs[0], lineHeight: LH.body, display: 'block', marginTop: 6, color: c.lilac }}>{s}</span>
              </div>
            ))}
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
        <div style={{ textAlign: 'center', maxWidth: W.text, margin: '0 auto' }}>
          <div style={EYEBROW}>Rest, at every age</div>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), color: c.navy, margin: '8px 0 12px', lineHeight: LH.head }}>Good sleep gets more precious with age</h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, color: c.grayD, maxWidth: W.text, margin: '0 auto' }}>
            Sleep tends to get lighter and easier to interrupt as the years add up, and a warm room or a pillow that holds heat is often all it takes to cut a night short. Experts generally suggest most adults aim for seven to nine hours, yet comfortable, unbroken sleep gets harder to come by. We can't change your body clock, but we can make the bed a cooler, calmer place to be, so drifting off and staying asleep is a little easier.
          </p>
        </div>
        <div className="grid-3m1 r-gap r-mar" style={{ ...rv('gap', ...SP.gap), ...rv('mar', '40px auto 0', '28px auto 0') }}>
          {[
            ['😴', 'Lighter with age', 'Sleep naturally becomes shorter and easier to disturb over the years.'],
            ['🌡️', 'Temperature matters', 'A cooler sleep surface helps many people settle down and stay settled.'],
            ['🛏️', 'Comfort you control', 'Your pillow and bedding are the part of a good night you can actually change tonight.'],
          ].map(([icon, t, s], i) => (
            <div key={i} className="card-hover r-pad" style={{ ...CARD, ...rv('pad', ...SP.card) }}>
              <div style={{ fontSize: T.h3[0], marginBottom: 12 }}>{icon}</div>
              <h3 className="r-fs" style={{ fontFamily: FONT_SUB, ...rv('fs', ...T.h4), fontWeight: 600, color: c.navy, marginBottom: 8, lineHeight: LH.head }}>{t}</h3>
              <p className="r-fs" style={{ ...rv('fs', ...T.sm), lineHeight: LH.body, color: c.grayD }}>{s}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: T.xs[0], lineHeight: LH.body, color: c.grayD, textAlign: 'center', maxWidth: W.text, margin: '24px auto 0' }}>
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
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, textAlign: 'center', marginBottom: 24 }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h2>
        <FAQBlock limit={4} />
        <div style={{ textAlign: 'center', marginTop: 32 }}><Link to="/faq" style={BTNO}>All questions</Link></div>
      </section></Reveal>

      {/* ============ FINAL CTA (breder) ============ */}
      <section className="r-pad" style={{ background: `linear-gradient(180deg, ${c.navy}, ${c.purple})`, color: c.white, textAlign: 'center', ...rv('pad', ...SP.section), position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.logoMark} {...dim(IMG.logoMark)} loading="lazy" decoding="async" alt="" aria-hidden="true" className="r-left" style={{ position: 'absolute', ...rv('left', '8%', -30), bottom: -20, height: 160, opacity: .25 }} />
        <Reveal><div style={{ position: 'relative' }}>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.display), lineHeight: LH.tight, textShadow: SH.text }}>Your coolest night<span className="r-fs" style={{ display: 'block', ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.sky2, fontFamily: FONT_SUB }}>starts tonight.</span></h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.lilac, margin: '20px auto 32px', maxWidth: W.narrow, lineHeight: LH.body }}>
            Whatever keeps you up when the nights get warm, flip'nsleep makes the bed a cooler place to be. Try it for 100 nights, risk-free, with free shipping across the US and Canada.
          </p>
          <a href="#offer" style={BTN}>Order your Cold Pillow now</a>
        </div></Reveal>
      </section>

      {/* ============ SEO-TEKSTBLOK — koeler slapen, breder publiek ============ */}
      <Reveal y={16}><section className="r-pad" style={{ ...rv('pad', ...SP.section), color: c.grayD }}><div style={{ maxWidth: W.text, margin: '0 auto', textAlign: 'center' }}>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>The cooling pillow for hot sleepers</h2>
        <p style={{ fontSize: T.sm[0], lineHeight: LH.loose, marginBottom: 24 }}>
          If you regularly wake up hot, you're in good company: overheating at night is one of the most common sleep complaints, whether it comes from a warm bedroom, the way the body holds heat as we get older, or hormonal changes during menopause and perimenopause. An ordinary pillow that traps heat under your head only makes it harder to drift back off. A cooling pillow tackles the problem where it starts, since your head is one of the fastest places your body sheds heat.
        </p>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>How the Signature Cold Pillow helps you sleep cooler</h2>
        <p style={{ fontSize: T.sm[0], lineHeight: LH.loose, marginBottom: 24 }}>
          The flip'nsleep Signature Cold Pillow combines a cool-touch fabric side (tested Q-max cooling value of 0.26) with an adjustable shredded memory foam core that lets air circulate instead of building up heat. Flip it to the soft bamboo side in colder months, so it's one pillow for hot sleepers all year round. The loft adjusts to every sleeping position: side sleepers keep more filling for neck support, back and stomach sleepers take some out. Pair it with the Breeze Bamboo Sheet Set, the Cloudweight Weighted Blanket or the Arctic Air Cooling Comforter for a bed that stays cool from top to bottom. Every order comes with free shipping, a 100-night sleep trial and a 2-year warranty, so trying a better night is risk-free. We ship across the United States and Canada.
        </p>
      </div></section></Reveal>
    </div>
  );
}
