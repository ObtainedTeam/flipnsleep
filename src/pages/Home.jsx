import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, BTN, BTNO, BTN_SM, ON_DARK, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W, CARD, CHIP } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG, dim, UGC_VIDEOS } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
import Reveal from '../components/Reveal';
import { ReviewsBlock, FAQBlock, TrustAccordion, PillowDeck, ShippingCountdown, ProductGrid, VideoRow, SectionHead } from '../components/Blocks';
import PillowQuiz from '../components/PillowQuiz';

// Drie kolommen onder "Redefining sleep": lijn-iconen in paars.
const INNOVATION = [
  [<><path d="M12 3v18M3 12h18" /><path d="M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></>,
    "Why flip'nsleep",
    'One pillow, two sides: a cool-touch face for warm nights and soft bamboo for cold ones. Unzip it and add or remove filling until the height is exactly right.'],
  [<><path d="M3 18V8" /><path d="M3 14h18v4" /><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
    'Built for every sleeper',
    'Side, back or stomach: the shredded memory foam adjusts to you. Side sleepers keep more filling, stomach sleepers take some out.',
    <Link to="/quiz" className="nav-link" style={{ display: 'inline-block', marginTop: 12, fontSize: T.sm[0], fontWeight: 700, color: c.purple }}>Find your fill →</Link>],
  [<><path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 3Z" /></>,
    'Innovation in every detail',
    'A cool side with a tested Q-max of 0.26, so it feels cool the moment you touch it. OEKO-TEX Standard 100 fabrics, CertiPUR-US certified foam and a cover that zips off for the wash.'],
];

export default function Home({ onCartOpen }) {
  const { symbol, isCA } = useCurrency();
  const [selected, setSelected] = useState('1p1');
  const [flipped, setFlipped] = useState(false);
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

      {/* ============ EXPLORE PRODUCTS (Mellow) ============ */}
      <ProductGrid />

      {/* ============ REDEFINING SLEEP (Mellow) ============ */}
      <section className="r-pad" style={rv('pad', ...SP.section)}>
        <SectionHead title="Redefining sleep." accent="One innovation at a time." mb={40}
          intro="Most pillows are a block of foam that holds heat and fits nobody in particular. We started from the other end: what does a hot sleeper actually need at 3 AM? The answer is a pillow with a cool side, a warm side and a height you set yourself." />
        <Reveal><div className="r-h" style={{ position: 'relative', maxWidth: W.page, margin: '0 auto', ...rv('h', 560, 300), borderRadius: R.lg, overflow: 'hidden', boxShadow: SH.strong, background: c.night }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html:
            `<video muted loop playsinline autoplay preload="none" poster="${IMG.heroPoster}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">` +
            `<source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 759px)">` +
            `<source src="/videos/hero.mp4" type="video/mp4">` +
            `</video>`
          }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(20,16,64,.18)' }} />
          <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,.92)', color: c.navy, borderRadius: R.pill, padding: '8px 22px 8px 8px', boxShadow: SH.float, fontFamily: FONT_SUB, fontSize: T.md[0], whiteSpace: 'nowrap' }}>
            <span style={{ width: 40, height: 40, borderRadius: R.pill, background: c.navy, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={c.white}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
            </span>
            Watch the story
          </span>
        </div></Reveal>
        <div className="grid-3m1 r-gap r-mar" style={{ ...rv('gap', 40, 28), maxWidth: W.page, ...rv('mar', '56px auto 0', '40px auto 0') }}>
          {INNOVATION.map(([icon, title, body, link], i) => (
            <Reveal key={i} delay={i * 100}><div>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={c.purple} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
              <h3 className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, margin: '14px 0 8px' }}>{title}</h3>
              <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD }}>{body}</p>
              {link}
            </div></Reveal>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}><Link to="/how-it-works" style={BTNO}>How it works</Link></div>
      </section>

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
      <Reveal><section className="r-pad" style={{ ...rv('pad', ...SP.section), textAlign: 'center' }}>
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
              {['Non-adjustable', 'Standard filling, often insufficient volume', 'No choice, often too warm', 'Not removable or washable', 'Certification unknown'].map((t, i) => (
                <li key={i} style={{ borderTop: '1px solid rgba(32,27,93,.12)', padding: '12px 2px', fontSize: T.sm[0], textAlign: 'center', color: c.grayD }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link to="/why-flipnsleep" style={{ ...BTNO, marginTop: 32 }}>See the full comparison</Link>
      </section></Reveal>

      {/* ============ WE DON'T SLEEP UNTIL YOU DO (Cloudpillo) ============ */}
      <section className="r-pad" style={{ background: c.sky, ...rv('pad', '96px 40px', '56px 20px 72px') }}>
        <div className="grid-2m1 r-gap" style={{ maxWidth: W.page, margin: '0 auto', ...rv('gap', 72, 40), alignItems: 'center' }}>
          <Reveal><div>
            <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h1), lineHeight: LH.tight, color: c.navy }}>
              We don't sleep until <span style={{ fontFamily: FONT_SUB, fontStyle: 'italic', color: c.purple }}>you do</span>
            </h2>
            <p className="r-fs" style={{ ...rv('fs', ...T.lg), lineHeight: LH.body, color: c.grayD, margin: '20px 0 32px', maxWidth: 460 }}>
              We're flip'nsleep. And good enough isn't good enough. Not in our products, not in our service, and not in your sleep.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <Link to="/about" style={BTN}>Our story</Link>
              <Link to="/how-it-works" className="nav-link" style={{ fontSize: T.sm[0], fontWeight: 700, color: c.navy, letterSpacing: '0.06em', textTransform: 'uppercase' }}>How it works →</Link>
            </div>
          </div></Reveal>
          <Reveal delay={120}><div style={{ position: 'relative' }}>
            <img src={IMG.bed} {...dim(IMG.bed)} loading="lazy" decoding="async" alt="The Signature Cold Pillow on a made bed" style={{ display: 'block', width: '100%', borderRadius: R.lg, boxShadow: SH.float }} />
            <div className="float-card" style={{ background: c.cream, borderRadius: R.sm, boxShadow: SH.strong, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span aria-hidden="true" style={{ flexShrink: 0, width: 44, height: 44, borderRadius: R.pill, background: c.navy, color: c.amber, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: T.xs[0] }}>100</span>
              <span style={{ fontSize: T.sm[0], lineHeight: LH.head, color: c.navy }}><b style={{ fontFamily: FONT_SUB }}>100 nights to decide.</b><br />Free shipping and free returns.</span>
            </div>
          </div></Reveal>
        </div>
      </section>

      {/* ============ VIDEO ROW ============ */}
      <VideoRow videos={UGC_VIDEOS} />

      {/* ============ REVIEWS (alleen met echte Judge.me-reviews) ============ */}
      <ReviewsBlock />

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
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.display), lineHeight: LH.tight, textShadow: SH.text }}>Sleep cooler.<span className="r-fs" style={{ display: 'block', ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.sky2, fontFamily: FONT_SUB }}>Wake rested.</span></h2>
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
