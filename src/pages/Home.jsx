import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, BTN, BTNO, BTN_SM, ON_DARK, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W, CARD, CHIP } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG, products, dim } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
import Reveal from '../components/Reveal';
import { CloudDivider, Stars, ReviewsBlock, FAQBlock, EmailCapture, TrustAccordion, ProductImageBlock, PillowDeck, CollectionsBlock, SummerDealsSlider, ShippingCountdown } from '../components/Blocks';
import PillowQuiz from '../components/PillowQuiz';
import InfoPopover from '../components/InfoPopover';

export default function Home({ onCartOpen }) {
  const { symbol, isCA } = useCurrency();
  const [selected, setSelected] = useState('1p1');
  const [flipped, setFlipped] = useState(false);
  const [info, setInfo] = useState(null); // { title, body } voor de klikbare uitleg
  const bundle = BUNDLES.find(b => b.id === selected);
  const price = getPrice(bundle, isCA);
  const compare = isCA ? bundle.compareAt.cad : bundle.compareAt.usd;

  const addToCart = () => { CartContext.add(selected, 1); onCartOpen && onCartOpen(); };

  // iOS-vangnet: als autoplay geblokkeerd werd (bv. energiebesparende modus),
  // start de video alsnog bij de eerste aanraking of klik.
  useEffect(() => {
    // Vangnet voor browsers die het media-attribuut op <source> negeren (o.a.
    // Firefox): kies daar handmatig de mobiele video. Alleen DOM, dus hydration-veilig.
    const v0 = document.querySelector('video');
    if (v0 && window.innerWidth < 760 && !/hero-mobile/.test(v0.currentSrc || '')) {
      v0.src = '/videos/hero-mobile.mp4';
    }
    const kick = () => {
      const v = document.querySelector('video');
      if (v && v.paused) { v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
    };
    kick();
    window.addEventListener('touchstart', kick, { once: true, passive: true });
    window.addEventListener('click', kick, { once: true });
    return () => { window.removeEventListener('touchstart', kick); window.removeEventListener('click', kick); };
  }, []);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="r-mh r-jc r-pad" style={{ backgroundImage: `url(${IMG.heroPoster})`, backgroundSize: 'cover', backgroundPosition: 'center', ...rv('mh', 720, 560), display: 'flex', flexDirection: 'column', ...rv('jc', 'center', 'flex-start'), ...rv('pad', '50px 40px 56px', '34px 22px 44px'), textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Achtergrondvideo: loopt gedempt op alle schermen, met de posterfoto als fallback.
            Mobiel krijgt de kleine variant via het media-attribuut op <source>; als HTML-string
            zodat `muted` als attribuut in de SSR-HTML staat (nodig voor autoplay). */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html:
          `<video autoplay muted loop playsinline webkit-playsinline preload="metadata" poster="${IMG.heroPoster}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:translateZ(0);backface-visibility:hidden">` +
          `<source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 759px)">` +
          `<source src="/videos/hero.mp4" type="video/mp4">` +
          `</video>`
        }} />
        {/* Verdonkering zodat titel en knop leesbaar blijven, video blijft goed zichtbaar */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(20,16,64,0.30)' }} />
        <div className="r-mw r-disp r-ta" style={{ position: 'relative', ...rv('mw', 1100, 720), margin: '0 auto', width: '100%', ...rv('disp', 'flex', 'block'), alignItems: 'center', justifyContent: 'space-between', gap: 60, ...rv('ta', 'left', 'center') }}>
          <div className="r-mw" style={rv('mw', 520, 'none')}>
            <h1 className="r-fs r-jc r-gap" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.display), color: c.white, margin: '0 0 16px', lineHeight: LH.tight, textShadow: SH.textHero, display: 'flex', alignItems: 'center', ...rv('jc', 'flex-start', 'center'), ...rv('gap', 16, 10), flexWrap: 'wrap' }}>
              Summer <img src={IMG.iconCloud} {...dim(IMG.iconCloud)} fetchPriority="high" decoding="async" alt="" className="r-h" style={rv('h', 50, 30)} /> <span style={{ fontFamily: FONT_SUB, fontWeight: 400 }}>Deals</span>
            </h1>
            <p className="r-fs r-mw r-mar" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, ...rv('mw', 440, 380), ...rv('mar', '0 0 28px', '0 auto 24px'), color: c.white, textShadow: SH.textHero }}>
              Shop for summer with a <b className="r-fs" style={{ ...rv('fs', ...T.lg), fontFamily: FONT_SUB }}>buy-one-get-one-free</b> offer on our Signature Cold Pillow.
            </p>
            <a href="#offer" style={BTN}>Shop now</a>
          </div>

          {/* Sleep quiz widget — funnel naar /quiz */}
          <div className="r-pad r-w r-mar" style={{ background: 'rgba(32,27,93,.72)', borderRadius: R.lg, ...rv('pad', ...SP.card), ...rv('w', 420, '100%'), maxWidth: 420, ...rv('mar', 0, '32px auto 0'), boxShadow: SH.float, flexShrink: 0, textAlign: 'center' }}>
            <div className="r-fs" style={{ color: c.white, ...rv('fs', ...T.md), fontFamily: FONT_SUB }}>Try our <span style={{ fontFamily: FONT_DISPLAY }}>sleep quiz</span></div>
            <div className="r-fs" style={{ color: c.white, fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), lineHeight: LH.tight, margin: '6px 0 2px' }}>For 15<span style={{ fontFamily: FONT_SUB }}>%</span> off</div>
            <div className="r-fs" style={{ color: c.white, ...rv('fs', ...T.md), fontFamily: FONT_SUB, marginBottom: 12 }}>your order</div>
            <div style={{ height: 1, background: 'rgba(255,255,255,.55)', margin: '0 6px 12px' }} />
            <div className="r-fs" style={{ color: c.white, ...rv('fs', ...T.md), fontFamily: FONT_SUB, marginBottom: 16 }}>What kind of <span style={{ fontFamily: FONT_DISPLAY }}>sleeper</span> are you?</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Link to="/quiz?sleeper=back" className="card-hover" style={{ background: c.sky, borderRadius: R.sm, padding: 16, textDecoration: 'none', color: c.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span className="r-fs" style={rv('fs', ...T.h3)}>😴</span>
                <span className="r-fs" style={rv('fs', ...T.sm)}><b style={{ fontFamily: FONT_DISPLAY, fontWeight: 400 }}>Back</b> <span style={{ fontFamily: FONT_SUB }}>Sleeper</span></span>
              </Link>
              <Link to="/quiz?sleeper=stomach" className="card-hover" style={{ background: c.sky, borderRadius: R.sm, padding: 16, textDecoration: 'none', color: c.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span className="r-fs" style={rv('fs', ...T.h3)}>🛏️</span>
                <span className="r-fs" style={rv('fs', ...T.sm)}><b style={{ fontFamily: FONT_DISPLAY, fontWeight: 400 }}>Stomach</b> <span style={{ fontFamily: FONT_SUB }}>Sleeper</span></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      {/* ============ SUMMER DEALS SLIDER ============ */}
      <SummerDealsSlider />

      {/* ============ UITGELICHT: DE VOLLEDIGE RANGE ============ */}
      <Reveal><section className="r-pad" style={rv('pad', ...SP.sectionTop)}>
        <div style={{ textAlign: 'center' }}>
          <div style={EYEBROW}>More for cooler nights</div>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, margin: '8px 0 12px' }}>Cooling comfort, from head to toe</h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, maxWidth: W.narrow, margin: '0 auto' }}>The same idea as the pillow, across the whole bed: stay comfortable without trapping heat.</p>
        </div>
        <div className="grid-3m1 r-gap r-mar" style={{ ...rv('gap', ...SP.gap), maxWidth: W.page, ...rv('mar', '40px auto 0', '28px auto 0') }}>
          {products.map((prod, i) => {
            const pp = getPrice(prod, isCA);
            const cm = prod.compareAt ? (isCA ? prod.compareAt.cad : prod.compareAt.usd) : null;
            return (
              <Reveal key={prod.id} delay={i * 110}><Link to={`/product/${prod.id}`} className="card-hover" style={{ textDecoration: 'none', ...CARD, overflow: 'hidden', display: 'block', height: '100%' }}>
                <div className="r-h" style={{ position: 'relative', ...rv('h', 230, 210), background: c.cream, overflow: 'hidden' }}>
                  <img src={prod.images[0]} {...dim(prod.images[0])} loading="lazy" decoding="async" alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {prod.badge && <span style={{ ...CHIP, position: 'absolute', top: 16, left: 16, background: c.amber, color: c.navy }}>{prod.badge}</span>}
                </div>
                <div className="r-pad" style={rv('pad', ...SP.card)}>
                  <h3 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 6 }}>{prod.name}</h3>
                  <div style={{ fontSize: T.sm[0], color: c.grayD, marginBottom: 10, lineHeight: LH.body }}>{prod.tagline}</div>
                  <div className="r-fs" style={{ ...rv('fs', ...T.md), fontWeight: 700, color: c.navy }}>From {formatPrice(pp, symbol)} {cm && <s style={{ fontWeight: 400, color: c.gray, fontSize: T.xs[0] }}>{formatPrice(cm, symbol)}</s>}</div>
                  <span style={{ ...BTN_SM, marginTop: 16 }}>View product</span>
                </div>
              </Link></Reveal>
            );
          })}
        </div>
      </section></Reveal>

      {/* ============ JUST FLIP IT ============ */}
      <section className="r-pad" style={{ ...rv('pad', ...SP.section), textAlign: 'center' }}>
        <Reveal><div style={EYEBROW}>How it works</div>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, margin: '8px 0 12px' }}>Just flip it.</h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto' }}>One pillow, two sides. Flip to the cooling side on warm nights, back to the soft bamboo side in winter.</p></Reveal>
        <Reveal delay={120}><div className="r-disp r-mw r-mar" style={{ ...rv('disp', 'flex', 'block'), ...rv('mw', 980, 'none'), ...rv('mar', '38px auto 0', 0), gap: 70, alignItems: 'center', justifyContent: 'center' }}>
        <div className="r-mar" style={{ maxWidth: 320, ...rv('mar', 0, '26px auto 0'), flexShrink: 0 }}>
          <div className="r-w r-h" style={{ ...rv('w', 300, 240), ...rv('h', 220, 176), margin: '0 auto', perspective: 900 }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform .6s', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={IMG.flipCool} {...dim(IMG.flipCool)} loading="lazy" decoding="async" alt="Cool side of the Signature Cold Pillow" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 14px 20px rgba(32,27,93,.22))' }} />
                <div style={{ position: 'absolute', background: 'rgba(255,255,255,.82)', borderRadius: R.sm, padding: '10px 16px', textAlign: 'center', maxWidth: '78%', boxShadow: SH.card }}>
                  <div style={{ fontWeight: 700, fontSize: T.sm[0], color: c.navy }}>❄️ Cool side</div>
                  <div style={{ fontWeight: 500, fontSize: T.xs[0], color: c.grayD, lineHeight: LH.head, marginTop: 2 }}>Cool-touch fabric pulls heat away from your head</div>
                </div>
              </div>
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={IMG.flipWarm} {...dim(IMG.flipWarm)} loading="lazy" decoding="async" alt="Warm side of the Signature Cold Pillow" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 14px 20px rgba(32,27,93,.22))' }} />
                <div style={{ position: 'absolute', background: 'rgba(255,255,255,.82)', borderRadius: R.sm, padding: '10px 16px', textAlign: 'center', maxWidth: '78%', boxShadow: SH.card }}>
                  <div style={{ fontWeight: 700, fontSize: T.sm[0], color: c.navy }}>☀️ Warm side</div>
                  <div style={{ fontWeight: 500, fontSize: T.xs[0], color: c.grayD, lineHeight: LH.head, marginTop: 2 }}>Soft bamboo fabric for colder nights</div>
                </div>
              </div>
            </div>
          </div>
          <div role="group" aria-label="Choose pillow side" style={{ marginTop: 18, display: 'inline-flex', background: c.white, border: `2px solid ${c.navy}`, borderRadius: R.pill, overflow: 'hidden' }}>
            {[['cool', '❄️ Cool'], ['warm', '☀️ Warm']].map(([side, label]) => (
              <button key={side} onClick={() => setFlipped(side === 'warm')}
                style={{ border: 'none', background: (side === 'warm') === flipped ? c.navy : 'transparent', color: (side === 'warm') === flipped ? c.white : c.navy, fontFamily: 'inherit', fontWeight: 600, fontSize: T.sm[0], padding: '10px 22px', cursor: 'pointer' }}>{label}</button>
            ))}
          </div>
        </div>
        <ol className="r-mw r-mar" style={{ listStyle: 'none', ...rv('mw', 440, 380), ...rv('mar', 0, '30px auto 0'), textAlign: 'left' }}>
          {[
            ['Unzip and adjust.', 'Add or remove filling until the height matches your sleeping position.'],
            ['Pick your side.', 'Cool-touch fabric on one side, soft bamboo on the other.'],
            ['Sleep through the night.', 'Less heat build-up means fewer wake-ups.'],
          ].map(([t, s], i) => (
            <li key={i} className="r-fs" style={{ display: 'flex', gap: 16, marginBottom: 16, ...rv('fs', ...T.md), lineHeight: LH.body }}>
              <b style={{ flex: '0 0 34px', height: 34, borderRadius: R.pill, background: c.sky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: T.sm[0] }}>{i + 1}</b>
              <div><strong>{t}</strong> {s}</div>
            </li>
          ))}
        </ol>
        </div></Reveal>
        <div style={{ textAlign: 'center' }}><Link to="/how-it-works" className="r-mt" style={{ ...BTNO, ...rv('mt', 32, 16) }}>See how it works</Link></div>
      </section>

      {/* ============ USP ICONS ============ */}
      <section className="r-pad" style={rv('pad', `0 ${SP.gutter[0]}px`, `0 ${SP.gutter[1]}px`)}>
        <Reveal><div className="grid-4m2 r-gap r-mw r-mar" style={{ ...rv('gap', '34px 24px', '26px 12px'), ...rv('mw', W.page, 380), ...rv('mar', '0 auto', '0 auto'), textAlign: 'center' }}>
          {[
            [c.pastelYellow, '🪶', 'Adjustable comfort', 'Unzip the pillow and add or remove the shredded memory foam until the height and firmness match how you sleep. No more pillow that is too high or too flat, and if your needs change you just adjust it again.'],
            [c.pastelPink, '🌡️', 'Cool and warm side', 'One side has a cool-touch fabric that pulls heat away for warm nights. Flip it to the soft bamboo side when it gets colder. One pillow that works all year round.'],
            [c.pastelBlue, '🌙', '100-night sleep trial', 'Sleep on it for 100 nights. If it is not right for you, send it back for a full refund. Shipping and returns are free within the trial period.'],
            [c.pastelMint, '😴', 'Suits any sleeping position', 'Because the loft is adjustable, the pillow works for back, side and stomach sleepers alike. Keep more filling for side sleeping, take some out for stomach sleeping.'],
          ].map(([bg, icon, label, body], i) => (
            <button key={i} className="card-hover" onClick={() => setInfo({ title: label, body })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
              <div className="r-w r-h r-fs" style={{ position: 'relative', ...rv('w', 108, 84), ...rv('h', 108, 84), borderRadius: R.pill, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', ...rv('fs', ...T.h1), background: bg }}>
                {icon}
                <span aria-hidden="true" className="r-right r-bottom" style={{ position: 'absolute', ...rv('right', 6, 2), ...rv('bottom', 6, 2), width: 20, height: 20, borderRadius: R.pill, background: c.white, color: c.navy, fontSize: T.xs[0], fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: SH.card }}>?</span>
              </div>
              <p className="r-fs" style={{ ...rv('fs', ...T.md), fontWeight: 600, lineHeight: LH.head, fontFamily: FONT_SUB, color: c.navy }}>{label}</p>
            </button>
          ))}
        </div></Reveal>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <Reveal><section className="r-mar r-mw r-pad" style={{ ...CARD, ...rv('mar', '64px auto 0', '48px 16px 0'), ...rv('mw', W.text, W.narrow), ...rv('pad', ...SP.card), textAlign: 'center' }}>
        <h3 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, marginBottom: 16, color: c.navy }}>Tested & certified</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          {[
            ['OEKO-TEX®', 'Standard 100', 'An independent certification that every component of the textile has been tested for harmful substances. It means the fabric that touches your skin is safe.'],
            ['CertiPUR-US®', 'Certified foam', 'The memory foam is made without harmful chemicals or heavy metals and is tested for low emissions. Better for you and for the air in your bedroom.'],
            ['Q-max 0.26', 'Tested cooling value', 'Q-max measures how cool a fabric feels the moment you touch it. A value of 0.26 puts the cool side firmly in cooling-fabric territory, so it feels genuinely cold against your skin.'],
          ].map(([a, b, body], i) => (
            <button key={i} onClick={() => setInfo({ title: `${a} — ${b}`, body })} className="card-hover" style={{ border: `1.5px solid rgba(32,27,93,.25)`, background: c.white, borderRadius: R.sm, fontSize: T.sm[0], fontWeight: 600, padding: '12px 16px', color: c.navy, lineHeight: LH.head, cursor: 'pointer', fontFamily: 'inherit', position: 'relative' }}>{a} <span aria-hidden="true" style={{ color: c.purple }}>ⓘ</span><br /><span style={{ fontWeight: 400 }}>{b}</span></button>
          ))}
        </div>
      </section></Reveal>

      {/* ============ REVIEWS ============ */}
      <div style={{ marginTop: 46 }}><ReviewsBlock /></div>

      {/* ============ COLLECTIONS ============ */}
      <CollectionsBlock />

      {/* ============ WHY / COMPARISON TEASER ============ */}
      <Reveal><section className="r-pad" style={{ ...rv('pad', ...SP.sectionTop), textAlign: 'center' }}>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, marginBottom: 32 }}>Why <span style={{ color: c.purple }}>flip'nsleep?</span></h2>
        <div className="grid-2m1 r-gap r-mw" style={{ ...rv('gap', ...SP.gap), ...rv('mw', W.page - 200, W.narrow), margin: '0 auto' }}>
          <div className="r-pad" style={{ background: `linear-gradient(180deg, ${c.navy}, ${c.purple})`, color: c.white, borderRadius: R.lg, boxShadow: SH.card, ...rv('pad', ...SP.card) }}>
            <h3 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, textAlign: 'center' }}>flip<span style={{ color: c.amber }}>'</span>nsleep</h3>
            <div style={{ textAlign: 'center', margin: '10px 0 4px' }}>
              <img src={IMG.coverFront} {...dim(IMG.coverFront)} loading="lazy" decoding="async" alt="flip'nsleep Signature Cold Pillow" style={{ maxHeight: 130 }} />
            </div>
            <span style={{ display: 'block', textAlign: 'center', fontSize: T.h3[0], margin: '4px 0 8px' }}>✅</span>
            <ul style={{ listStyle: 'none' }}>
              {['Adjustable to any sleeping position', 'Generous amount of filling as standard', 'Dual-sided: cool and warm', 'Washable outer cover', 'OEKO-TEX & CertiPUR-US certified'].map((t, i) => (
                <li key={i} style={{ borderTop: '1px solid rgba(255,255,255,.22)', padding: '12px 2px', fontSize: T.sm[0], textAlign: 'center' }}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="r-pad" style={{ ...CARD, ...rv('pad', ...SP.card) }}>
            <h3 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, textAlign: 'center', color: c.navy }}>Sweaty old pillow</h3>
            <div style={{ textAlign: 'center', margin: '10px 0 4px' }}>
              <img src={IMG.standardPillowSweaty} {...dim(IMG.standardPillowSweaty)} loading="lazy" decoding="async" alt="Sweaty, stained old pillow" style={{ maxHeight: 150, borderRadius: R.sm }} />
            </div>
            <span style={{ display: 'block', textAlign: 'center', fontSize: T.h3[0], margin: '4px 0 8px' }}>❌</span>
            <ul style={{ listStyle: 'none' }}>
              {['Non-adjustable', 'Standard filling, often insufficient volume', 'No choice — often too warm', 'Not removable or washable', 'Certification unknown'].map((t, i) => (
                <li key={i} style={{ borderTop: '1px solid rgba(32,27,93,.12)', padding: '12px 2px', fontSize: T.sm[0], textAlign: 'center', color: c.grayD }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link to="/why-flipnsleep" style={{ ...BTNO, marginTop: 32 }}>See the full comparison</Link>
      </section></Reveal>

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
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.display), lineHeight: LH.tight, textShadow: SH.text }}>Sleep cooler.<span className="r-fs" style={{ display: 'block', ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.sky2, fontFamily: FONT_SUB }}>Wake rested.</span></h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.lilac, margin: '20px auto 32px', maxWidth: W.narrow, lineHeight: LH.body }}>
            Whatever keeps you up when the nights get warm, flip'nsleep makes the bed a cooler place to be. Try it for 100 nights, risk-free, with free shipping across the US and Canada.
          </p>
          <a href="#offer" style={BTN}>Order your Cold Pillow now</a>
        </div></Reveal>
      </section>

      <PillowQuiz />

      <EmailCapture />

      {/* ============ SEO-TEKSTBLOK — koeler slapen, breder publiek ============ */}
      <Reveal y={16}><section className="r-pad" style={{ maxWidth: W.text + 80, margin: '0 auto', ...rv('pad', ...SP.section), color: c.grayD }}>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>The cooling pillow for hot sleepers</h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.sm), lineHeight: LH.loose, marginBottom: 24 }}>
          If you regularly wake up hot, you're in good company: overheating at night is one of the most common sleep complaints, whether it comes from a warm bedroom, the way the body holds heat as we get older, or hormonal changes during menopause and perimenopause. An ordinary pillow that traps heat under your head only makes it harder to drift back off. A cooling pillow tackles the problem where it starts, since your head is one of the fastest places your body sheds heat.
        </p>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>How the Signature Cold Pillow helps you sleep cooler</h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.sm), lineHeight: LH.loose, marginBottom: 24 }}>
          The flip'nsleep Signature Cold Pillow combines a cool-touch fabric side (tested Q-max cooling value of 0.26) with an adjustable shredded memory foam core that lets air circulate instead of building up heat. Flip it to the soft bamboo side in colder months, so it's one pillow for hot sleepers all year round. The loft adjusts to every sleeping position: side sleepers keep more filling for neck support, back and stomach sleepers take some out. Pair it with the Breeze Bamboo Sheet Set, the Cloudweight Weighted Blanket or the Arctic Air Cooling Comforter for a bed that stays cool from top to bottom. Every order comes with free shipping, a 100-night sleep trial and a 2-year warranty, so trying a better night is risk-free. We ship across the United States and Canada.
        </p>
      </section></Reveal>

      <InfoPopover info={info} onClose={() => setInfo(null)} />
    </div>
  );
}
