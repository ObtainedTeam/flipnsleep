import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, BTN, BTNO, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG, products } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
import Reveal from '../components/Reveal';
import { CloudDivider, Stars, ReviewsBlock, FAQBlock, EmailCapture, TrustAccordion, ProductImageBlock, PillowDeck, CollectionsBlock, SummerDealsSlider, ShippingCountdown } from '../components/Blocks';
import PillowQuiz from '../components/PillowQuiz';
import InfoPopover from '../components/InfoPopover';

export default function Home({ onCartOpen }) {
  const isMobile = useIsMobile();
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
      <section style={{ backgroundImage: `url(${IMG.heroPoster})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: isMobile ? 560 : 720, display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'flex-start' : 'center', padding: isMobile ? '34px 22px 44px' : '50px 40px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Achtergrondvideo: loopt, gedempt, met de foto als poster/fallback */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html:
          `<video autoplay loop muted playsinline webkit-playsinline preload="auto" poster="${IMG.heroPoster}" src="/videos/hero.mp4" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>`
        }} />
        {/* Verdonkering zodat titel en knop leesbaar blijven, video blijft goed zichtbaar */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(20,16,64,0.30)' }} />
        <div style={{ position: 'relative', maxWidth: isMobile ? 720 : 1100, margin: '0 auto', width: '100%', display: isMobile ? 'block' : 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 60, textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{ maxWidth: isMobile ? undefined : 520 }}>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 36 : 62, color: '#fff', margin: '0 0 14px', lineHeight: 1.1, textShadow: '0 2px 18px rgba(20,16,64,.45)', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: isMobile ? 10 : 16, flexWrap: 'wrap' }}>
              Summer <img src={IMG.iconCloud} alt="" style={{ height: isMobile ? 30 : 50 }} /> <span style={{ fontFamily: FONT_SUB, fontWeight: 400 }}>Deals</span>
            </h1>
            <p style={{ fontSize: isMobile ? 14 : 17, lineHeight: 1.65, maxWidth: isMobile ? 380 : 440, margin: isMobile ? '0 auto 22px' : '0 0 24px', color: '#EFEDFF', textShadow: '0 1px 10px rgba(20,16,64,.5)' }}>
              Shop for summer with a <b style={{ fontSize: isMobile ? 15.5 : 19, fontFamily: FONT_SUB }}>buy-one-get-one-free</b> offer on our Signature Cold Pillow.
            </p>
            <a href="#offer" style={{ ...BTN, fontSize: isMobile ? 14 : 15, padding: isMobile ? '15px 38px' : '17px 44px' }}>Shop now</a>
          </div>

          {/* Sleep quiz widget — funnel naar /quiz */}
          <div style={{ background: 'rgba(30,38,72,0.72)', borderRadius: 15, padding: isMobile ? '18px 16px 16px' : '28px 26px 24px', width: isMobile ? '100%' : 420, maxWidth: 420, margin: isMobile ? '30px auto 0' : 0, boxShadow: '0 18px 40px rgba(10,8,40,.45)', flexShrink: 0, textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: isMobile ? 14 : 16, fontFamily: FONT_SUB }}>Try our <span style={{ fontFamily: FONT_DISPLAY }}>sleep quiz</span></div>
            <div style={{ color: '#fff', fontFamily: FONT_DISPLAY, fontSize: isMobile ? 32 : 40, lineHeight: 1.05, margin: '6px 0 2px' }}>For 15<span style={{ fontFamily: FONT_SUB }}>%</span> off</div>
            <div style={{ color: '#fff', fontSize: isMobile ? 15 : 17, fontFamily: FONT_SUB, marginBottom: 12 }}>your order</div>
            <div style={{ height: 1, background: 'rgba(255,255,255,.55)', margin: '0 6px 12px' }} />
            <div style={{ color: '#fff', fontSize: isMobile ? 14 : 15.5, fontFamily: FONT_SUB, marginBottom: 12 }}>What kind of <span style={{ fontFamily: FONT_DISPLAY }}>sleeper</span> are you?</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Link to="/quiz?sleeper=back" style={{ background: c.sky, borderRadius: 15, padding: isMobile ? '11px 8px' : '15px 10px', textDecoration: 'none', color: '#231D5D', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: isMobile ? 20 : 24 }}>😴</span>
                <span style={{ fontSize: isMobile ? 14 : 15 }}><b style={{ fontFamily: FONT_DISPLAY, fontWeight: 400 }}>Back</b> <span style={{ fontFamily: FONT_SUB }}>Sleeper</span></span>
              </Link>
              <Link to="/quiz?sleeper=stomach" style={{ background: c.sky, borderRadius: 15, padding: isMobile ? '11px 8px' : '15px 10px', textDecoration: 'none', color: '#231D5D', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: isMobile ? 20 : 24 }}>🛏️</span>
                <span style={{ fontSize: isMobile ? 14 : 15 }}><b style={{ fontFamily: FONT_DISPLAY, fontWeight: 400 }}>Stomach</b> <span style={{ fontFamily: FONT_SUB }}>Sleeper</span></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCT CARD + OFFER ============ */}
      <Reveal style={{ position: 'relative', zIndex: 2, marginTop: isMobile ? -50 : -84 }}><section id="offer" style={{ maxWidth: isMobile ? 560 : 1140, margin: isMobile ? '0 14px 44px' : '0 auto 66px', background: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 100%)`, borderRadius: 26, overflow: 'hidden', boxShadow: '0 14px 34px rgba(32,27,93,.16)', display: isMobile ? 'block' : 'grid', gridTemplateColumns: isMobile ? undefined : '1.05fr 1fr' }}>
        <div style={{ padding: isMobile ? 16 : 28, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <PillowDeck count={bundle.pillows} height={isMobile ? 230 : 460} radius={18} bg="transparent" />
          <span style={{ position: 'absolute', top: isMobile ? 28 : 44, left: isMobile ? 28 : 44, background: c.amber, color: c.navy, fontWeight: 700, fontSize: isMobile ? 13 : 15, borderRadius: 999, padding: isMobile ? '7px 16px' : '9px 20px' }}>{bundle.short.toLowerCase()}</span>
        </div>
        <div style={{ background: isMobile ? `linear-gradient(180deg, ${c.purple}, ${c.navy})` : `linear-gradient(135deg, ${c.purple}, ${c.navy})`, color: '#fff', padding: isMobile ? '24px 20px 26px' : '38px 36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 32, marginBottom: 4 }}>{PRODUCT.name}</h2>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 19 : 24, color: c.amber }}>
            {formatPrice(price, symbol)} <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: 13, color: '#CFCBF2', opacity: .5 }}>{formatPrice(compare, symbol)}</span>
          </div>
          <div style={{ margin: '6px 0 2px', fontSize: 12.5, color: '#DDD9FF' }}>🌙 100-night sleep trial · 🛡️ 2-year warranty</div>
          <ul style={{ listStyle: 'none', margin: '14px 0 6px' }}>
            {PRODUCT.usps.map((u, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, lineHeight: 1.5, marginBottom: 9 }}>
                <img src={IMG.iconCloud} alt="" style={{ height: 14, marginTop: 3 }} />{u}
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
                style={{ display: 'flex', alignItems: 'center', gap: 10, background: active ? 'rgba(255,255,255,.24)' : 'rgba(255,255,255,.12)', border: `2px solid ${active ? c.amber : 'transparent'}`, borderRadius: 16, padding: '12px 14px', marginTop: 12, cursor: 'pointer', transition: 'all .15s' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: FONT_SUB }}>{b.label}</div>
                  <div style={{ fontSize: 13 }}>{formatPrice(p, symbol)} <s style={{ opacity: .6, marginLeft: 6 }}>{formatPrice(cm, symbol)}</s></div>
                </div>
                <span style={{ marginLeft: 'auto', background: c.navy, color: '#fff', fontSize: 11.5, fontWeight: 600, borderRadius: 999, padding: '6px 12px', whiteSpace: 'nowrap' }}>Save {formatPrice(cm - p, symbol)}</span>
              </div>
            );
          })}
          <div style={{ textAlign: 'center', marginTop: 14 }}><ShippingCountdown /></div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center' }}>
            <button onClick={() => buyNow(selected)} style={{ ...BTN, fontSize: 14, flex: 1, textAlign: 'center' }}>Order your Cold Pillow now</button>
            <button onClick={addToCart} style={{ ...BTNO, color: '#fff', borderColor: '#fff', flex: isMobile ? undefined : '0 0 auto' }}>Add to cart</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Link to="/product/signature-cold-pillow" style={{ color: '#fff', fontSize: 12.5, fontWeight: 600, fontFamily: FONT_SUB, textDecoration: 'underline', textUnderlineOffset: 3, opacity: .9 }}>See full product details →</Link>
          </div>
        </div>
      </section>

      </Reveal>

      <Reveal delay={100}><div style={{ maxWidth: isMobile ? 560 : 1140, margin: isMobile ? '0 14px 20px' : '0 auto 34px' }}>
        <TrustAccordion specs={<ul style={{ listStyle: 'none' }}>{PRODUCT.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>} />
      </div></Reveal>

      {/* ============ EMPATHY / NIGHT (breed publiek) ============ */}
      <section style={{ background: `linear-gradient(180deg, ${c.night} 0%, ${c.navy} 100%)`, color: '#fff', padding: isMobile ? '52px 24px' : '96px 40px', position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.night} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .28 }} />
        <Reveal><div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 30 : 50, lineHeight: 1.2 }}>
            3 AM. Awake.<br /><span style={{ color: c.amber }}>Too warm to settle.</span>
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.75, margin: '18px auto 0', maxWidth: isMobile ? 420 : 560, color: '#E4E1FF' }}>
            A warm bedroom, a restless mind, or the way sleep shifts as we get older: waking up hot is one of the most common reasons people stir in the middle of the night. A pillow that traps heat keeps you there. Cooling your head is one of the quickest ways to drift back to sleep.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
            {[['Both sides', 'cool-touch for warm nights, soft bamboo for cold ones'], ['Q-max 0.26', 'tested cool-touch value of the cold side'], ['100 nights', 'to try it risk-free']].map(([b, s], i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.10)', borderRadius: 18, padding: '16px 18px', textAlign: 'center', minWidth: 110, maxWidth: 160 }}>
                <b style={{ display: 'block', fontFamily: FONT_DISPLAY, fontSize: 19, color: c.amber }}>{b}</b>
                <span style={{ fontSize: 11, lineHeight: 1.45, display: 'block', marginTop: 5, color: '#D7D3FF' }}>{s}</span>
              </div>
            ))}
          </div>
        </div></Reveal>
      </section>

      {/* ============ WAAROM SLAAP OP LEEFTIJD (geen medische claims) ============ */}
      <Reveal><section style={{ padding: isMobile ? '48px 22px 56px' : '74px 40px 78px', maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <div style={EYEBROW}>Rest, at every age</div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 27 : 38, color: c.navy, margin: '8px 0 12px', lineHeight: 1.2 }}>Good sleep gets more precious with age</h2>
          <p style={{ fontSize: isMobile ? 14 : 15.5, lineHeight: 1.75, color: c.grayD }}>
            Sleep tends to get lighter and easier to interrupt as the years add up, and a warm room or a pillow that holds heat is often all it takes to cut a night short. Experts generally suggest most adults aim for seven to nine hours, yet comfortable, unbroken sleep gets harder to come by. We can't change your body clock, but we can make the bed a cooler, calmer place to be, so drifting off and staying asleep is a little easier.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 14 : 20, margin: isMobile ? '26px auto 0' : '34px auto 0' }}>
          {[
            ['😴', 'Lighter with age', 'Sleep naturally becomes shorter and easier to disturb over the years.'],
            ['🌡️', 'Temperature matters', 'A cooler sleep surface helps many people settle down and stay settled.'],
            ['🛏️', 'Comfort you control', 'Your pillow and bedding are the part of a good night you can actually change tonight.'],
          ].map(([icon, t, s], i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 20, padding: '22px 22px', boxShadow: '0 10px 26px rgba(32,27,93,.08)' }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{icon}</div>
              <h3 style={{ fontFamily: FONT_SUB, fontSize: 15.5, fontWeight: 600, color: c.navy, marginBottom: 6 }}>{t}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: c.grayD }}>{s}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11.5, lineHeight: 1.6, color: c.gray, textAlign: 'center', maxWidth: 620, margin: '18px auto 0' }}>
          flip'nsleep makes comfort products, not medical devices. Nothing on this page is medical advice or a claim to diagnose, treat or prevent any condition. If sleep problems persist, please speak to a doctor.
        </p>
      </section></Reveal>

      {/* ============ SUMMER DEALS SLIDER ============ */}
      <SummerDealsSlider />

      {/* ============ UITGELICHT: DE VOLLEDIGE RANGE ============ */}
      <Reveal><section style={{ padding: isMobile ? '44px 20px 8px' : '64px 40px 10px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={EYEBROW}>More for cooler nights</div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 27 : 36, color: c.navy, margin: '8px 0 8px' }}>Cooling comfort, from head to toe</h2>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.grayD, maxWidth: 460, margin: '0 auto' }}>The same idea as the pillow, across the whole bed: stay comfortable without trapping heat.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 18 : 24, maxWidth: 1080, margin: isMobile ? '26px auto 0' : '34px auto 0' }}>
          {products.map((prod, i) => {
            const pp = getPrice(prod, isCA);
            const cm = prod.compareAt ? (isCA ? prod.compareAt.cad : prod.compareAt.usd) : null;
            return (
              <Reveal key={prod.id} delay={i * 110}><Link to={`/product/${prod.id}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: 22, overflow: 'hidden', boxShadow: '0 12px 30px rgba(32,27,93,.10)', display: 'block', height: '100%' }}>
                <div style={{ position: 'relative', height: isMobile ? 210 : 230, background: c.cream, overflow: 'hidden' }}>
                  <img src={prod.images[0]} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {prod.badge && <span style={{ position: 'absolute', top: 12, left: 12, background: c.amber, color: c.navy, fontWeight: 700, fontSize: 11.5, borderRadius: 999, padding: '5px 13px' }}>{prod.badge}</span>}
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: c.navy, marginBottom: 4 }}>{prod.name}</h3>
                  <div style={{ fontSize: 12.5, color: c.grayD, marginBottom: 8, lineHeight: 1.5 }}>{prod.tagline}</div>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: c.navy }}>From {formatPrice(pp, symbol)} {cm && <s style={{ fontWeight: 400, color: '#999', fontSize: 12.5 }}>{formatPrice(cm, symbol)}</s>}</div>
                  <span style={{ ...BTN, marginTop: 12, padding: '10px 22px', fontSize: 11.5 }}>View product</span>
                </div>
              </Link></Reveal>
            );
          })}
        </div>
      </section></Reveal>

      {/* ============ JUST FLIP IT ============ */}
      <section style={{ padding: isMobile ? '44px 22px' : '64px 40px', textAlign: 'center' }}>
        <Reveal><div style={EYEBROW}>How it works</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 28 : 36, color: c.navy, margin: '8px 0 10px' }}>Just flip it.</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, maxWidth: 400, margin: '0 auto' }}>One pillow, two sides. Flip to the cooling side on warm nights, back to the soft bamboo side in winter.</p></Reveal>
        <Reveal delay={120}><div style={{ display: isMobile ? 'block' : 'flex', maxWidth: isMobile ? undefined : 980, margin: isMobile ? undefined : '38px auto 0', gap: 70, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 320, margin: isMobile ? '26px auto 0' : 0, flexShrink: 0 }}>
          <div style={{ width: isMobile ? 240 : 300, height: isMobile ? 176 : 220, margin: '0 auto', perspective: 900 }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform .6s', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 26, overflow: 'hidden', backfaceVisibility: 'hidden', boxShadow: '0 16px 28px rgba(32,27,93,.18)', backgroundImage: `url(${IMG.flipCool})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundColor: '#fff', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,.82)', borderRadius: 14, padding: '10px 16px', textAlign: 'center', maxWidth: '84%', boxShadow: '0 4px 12px rgba(32,27,93,.14)' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: c.navy }}>❄️ Cool side</div>
                  <div style={{ fontWeight: 500, fontSize: 11.5, color: c.grayD, lineHeight: 1.45, marginTop: 2 }}>Cool-touch fabric pulls heat away from your head</div>
                </div>
              </div>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 26, overflow: 'hidden', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', boxShadow: '0 16px 28px rgba(32,27,93,.18)', backgroundImage: `url(${IMG.flipWarm})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundColor: '#fff', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,.82)', borderRadius: 14, padding: '10px 16px', textAlign: 'center', maxWidth: '84%', boxShadow: '0 4px 12px rgba(32,27,93,.14)' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: c.navy }}>☀️ Warm side</div>
                  <div style={{ fontWeight: 500, fontSize: 11.5, color: c.grayD, lineHeight: 1.45, marginTop: 2 }}>Soft bamboo fabric for colder nights</div>
                </div>
              </div>
            </div>
          </div>
          <div role="group" aria-label="Choose pillow side" style={{ marginTop: 18, display: 'inline-flex', background: '#fff', border: `2px solid ${c.navy}`, borderRadius: 999, overflow: 'hidden' }}>
            {[['cool', '❄️ Cool'], ['warm', '☀️ Warm']].map(([side, label]) => (
              <button key={side} onClick={() => setFlipped(side === 'warm')}
                style={{ border: 'none', background: (side === 'warm') === flipped ? c.navy : 'transparent', color: (side === 'warm') === flipped ? '#fff' : c.navy, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 13, padding: '10px 22px', cursor: 'pointer' }}>{label}</button>
            ))}
          </div>
        </div>
        <ol style={{ listStyle: 'none', maxWidth: isMobile ? 380 : 440, margin: isMobile ? '30px auto 0' : 0, textAlign: 'left' }}>
          {[
            ['Unzip and adjust.', 'Add or remove filling until the height matches your sleeping position.'],
            ['Pick your side.', 'Cool-touch fabric on one side, soft bamboo on the other.'],
            ['Sleep through the night.', 'Less heat build-up means fewer wake-ups.'],
          ].map(([t, s], i) => (
            <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, fontSize: isMobile ? 13.5 : 15, lineHeight: 1.6 }}>
              <b style={{ flex: '0 0 34px', height: 34, borderRadius: '50%', background: c.sky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 14 }}>{i + 1}</b>
              <div><strong>{t}</strong> {s}</div>
            </li>
          ))}
        </ol>
        </div></Reveal>
        <div style={{ textAlign: 'center' }}><Link to="/how-it-works" style={{ ...BTNO, marginTop: isMobile ? 10 : 30, display: 'inline-block' }}>See how it works</Link></div>
      </section>

      {/* ============ USP ICONS ============ */}
      <section style={{ padding: '0 20px 10px' }}>
        <Reveal><div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? '26px 12px' : '34px 24px', maxWidth: isMobile ? 380 : 1000, margin: isMobile ? '10px auto 0' : '30px auto 0', textAlign: 'center' }}>
          {[
            [c.pastelYellow, '🪶', 'Adjustable comfort', 'Unzip the pillow and add or remove the shredded memory foam until the height and firmness match how you sleep. No more pillow that is too high or too flat, and if your needs change you just adjust it again.'],
            [c.pastelPink, '🌡️', 'Cool and warm side', 'One side has a cool-touch fabric that pulls heat away for warm nights. Flip it to the soft bamboo side when it gets colder. One pillow that works all year round.'],
            [c.pastelBlue, '🌙', '100-night sleep trial', 'Sleep on it for 100 nights. If it is not right for you, send it back for a full refund. Shipping and returns are free within the trial period.'],
            [c.pastelMint, '😴', 'Suits any sleeping position', 'Because the loft is adjustable, the pillow works for back, side and stomach sleepers alike. Keep more filling for side sleeping, take some out for stomach sleeping.'],
          ].map(([bg, icon, label, body], i) => (
            <button key={i} onClick={() => setInfo({ title: label, body })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
              <div style={{ position: 'relative', width: isMobile ? 84 : 108, height: isMobile ? 84 : 108, borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 32 : 42, background: bg }}>
                {icon}
                <span aria-hidden="true" style={{ position: 'absolute', right: isMobile ? 2 : 6, bottom: isMobile ? 2 : 6, width: 20, height: 20, borderRadius: '50%', background: '#fff', color: c.navy, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(32,27,93,.2)' }}>?</span>
              </div>
              <p style={{ fontSize: isMobile ? 13.5 : 15, fontWeight: 600, lineHeight: 1.35, fontFamily: FONT_SUB, color: c.navy }}>{label}</p>
            </button>
          ))}
        </div></Reveal>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <Reveal><section style={{ background: '#fff', margin: isMobile ? '36px 16px 0' : '52px auto 0', maxWidth: isMobile ? 640 : 760, borderRadius: 22, padding: '24px 20px', textAlign: 'center', boxShadow: '0 10px 26px rgba(32,27,93,.08)' }}>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 16, marginBottom: 14, color: c.navy }}>Tested & certified</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {[
            ['OEKO-TEX®', 'Standard 100', 'An independent certification that every component of the textile has been tested for harmful substances. It means the fabric that touches your skin is safe.'],
            ['CertiPUR-US®', 'Certified foam', 'The memory foam is made without harmful chemicals or heavy metals and is tested for low emissions. Better for you and for the air in your bedroom.'],
            ['Q-max 0.26', 'Tested cooling value', 'Q-max measures how cool a fabric feels the moment you touch it. A value of 0.26 puts the cool side firmly in cooling-fabric territory, so it feels genuinely cold against your skin.'],
          ].map(([a, b, body], i) => (
            <button key={i} onClick={() => setInfo({ title: `${a} — ${b}`, body })} style={{ border: `1.5px solid rgba(32,27,93,.25)`, background: '#fff', borderRadius: 12, fontSize: 11.5, fontWeight: 600, padding: '10px 14px', color: c.navy, lineHeight: 1.4, cursor: 'pointer', fontFamily: 'inherit', position: 'relative' }}>{a} <span aria-hidden="true" style={{ color: c.purple }}>ⓘ</span><br /><span style={{ fontWeight: 400 }}>{b}</span></button>
          ))}
        </div>
      </section></Reveal>

      {/* ============ REVIEWS ============ */}
      <div style={{ marginTop: 46 }}><ReviewsBlock /></div>

      {/* ============ COLLECTIONS ============ */}
      <CollectionsBlock />

      {/* ============ WHY / COMPARISON TEASER ============ */}
      <Reveal><section style={{ padding: isMobile ? '36px 22px 10px' : '50px 40px 10px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 26 : 32, color: c.navy, marginBottom: 20 }}>Why <span style={{ color: c.purple }}>flip'nsleep?</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 18 : 26, maxWidth: isMobile ? 780 : 940, margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(180deg, ${c.navy}, ${c.purple})`, color: '#fff', borderRadius: 22, padding: 22 }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 19, textAlign: 'center' }}>flip<span style={{ color: c.amber }}>'</span>nsleep</h3>
            <div style={{ textAlign: 'center', margin: '10px 0 4px' }}>
              <img src={IMG.coverFront} alt="flip'nsleep Signature Cold Pillow" style={{ maxHeight: 130 }} />
            </div>
            <span style={{ display: 'block', textAlign: 'center', fontSize: 28, margin: '4px 0 8px' }}>✅</span>
            <ul style={{ listStyle: 'none' }}>
              {['Adjustable to any sleeping position', 'Generous amount of filling as standard', 'Dual-sided: cool and warm', 'Washable outer cover', 'OEKO-TEX & CertiPUR-US certified'].map((t, i) => (
                <li key={i} style={{ borderTop: '1px solid rgba(255,255,255,.22)', padding: '10px 2px', fontSize: 13, textAlign: 'center' }}>{t}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#fff', borderRadius: 22, padding: 22, opacity: .9, boxShadow: '0 10px 26px rgba(32,27,93,.07)' }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 19, textAlign: 'center', color: c.navy }}>Sweaty old pillow</h3>
            <div style={{ textAlign: 'center', margin: '10px 0 4px' }}>
              <img src={IMG.standardPillowSweaty} alt="Sweaty, stained old pillow" style={{ maxHeight: 150, borderRadius: 10 }} />
            </div>
            <span style={{ display: 'block', textAlign: 'center', fontSize: 28, margin: '4px 0 8px' }}>❌</span>
            <ul style={{ listStyle: 'none' }}>
              {['Non-adjustable', 'Standard filling, often insufficient volume', 'No choice — often too warm', 'Not removable or washable', 'Certification unknown'].map((t, i) => (
                <li key={i} style={{ borderTop: '1px solid rgba(32,27,93,.12)', padding: '10px 2px', fontSize: 13, textAlign: 'center', color: c.grayD }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link to="/why-flipnsleep" style={{ ...BTNO, marginTop: 24 }}>See the full comparison</Link>
      </section></Reveal>

      {/* ============ FAQ TEASER ============ */}
      <Reveal><section style={{ padding: isMobile ? '40px 22px' : '54px 40px' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 30, color: c.navy, textAlign: 'center', marginBottom: 14 }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h2>
        <FAQBlock limit={4} />
        <div style={{ textAlign: 'center', marginTop: 18 }}><Link to="/faq" style={BTNO}>All questions</Link></div>
      </section></Reveal>

      {/* ============ FINAL CTA (breder) ============ */}
      <section style={{ background: `linear-gradient(180deg, ${c.night}, #2A2270)`, color: '#fff', textAlign: 'center', padding: isMobile ? '56px 24px' : '96px 40px', position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.logoMark} alt="" aria-hidden="true" style={{ position: 'absolute', left: isMobile ? -30 : '8%', bottom: -20, height: 160, opacity: .25 }} />
        <Reveal><div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 32 : 56, lineHeight: 1.15 }}>Sleep cooler.<span style={{ display: 'block', fontSize: isMobile ? 22 : 30, color: c.sky2, fontFamily: FONT_SUB }}>Wake rested.</span></h2>
          <p style={{ fontSize: isMobile ? 13.5 : 15.5, color: '#D7D3FF', margin: '16px auto 26px', maxWidth: isMobile ? 340 : 440, lineHeight: 1.7 }}>
            Whatever keeps you up when the nights get warm, flip'nsleep makes the bed a cooler place to be. Try it for 100 nights, risk-free, with free shipping across the US and Canada.
          </p>
          <a href="#offer" style={{ ...BTN, fontSize: 14 }}>Order your Cold Pillow now</a>
        </div></Reveal>
      </section>

      <PillowQuiz />

      <EmailCapture />

      {/* ============ SEO-TEKSTBLOK — koeler slapen, breder publiek ============ */}
      <Reveal y={16}><section style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '40px 22px 10px' : '54px 24px 10px', color: c.grayD }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: c.navy, marginBottom: 10 }}>The cooling pillow for hot sleepers</h2>
        <p style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 14 }}>
          If you regularly wake up hot, you're in good company: overheating at night is one of the most common sleep complaints, whether it comes from a warm bedroom, the way the body holds heat as we get older, or hormonal changes during menopause and perimenopause. An ordinary pillow that traps heat under your head only makes it harder to drift back off. A cooling pillow tackles the problem where it starts, since your head is one of the fastest places your body sheds heat.
        </p>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: c.navy, marginBottom: 10 }}>How the Signature Cold Pillow helps you sleep cooler</h2>
        <p style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 14 }}>
          The flip'nsleep Signature Cold Pillow combines a cool-touch fabric side (tested Q-max cooling value of 0.26) with an adjustable shredded memory foam core that lets air circulate instead of building up heat. Flip it to the soft bamboo side in colder months, so it's one pillow for hot sleepers all year round. The loft adjusts to every sleeping position: side sleepers keep more filling for neck support, back and stomach sleepers take some out. Pair it with the Breeze Bamboo Sheet Set, the Cloudweight Weighted Blanket or the Arctic Air Cooling Comforter for a bed that stays cool from top to bottom. Every order comes with free shipping, a 100-night sleep trial and a 2-year warranty, so trying a better night is risk-free. We ship across the United States and Canada.
        </p>
      </section></Reveal>

      <InfoPopover info={info} onClose={() => setInfo(null)} />
    </div>
  );
}
