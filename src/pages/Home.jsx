import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, BTN, BTNO, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
import Reveal from '../components/Reveal';
import { CloudDivider, Stars, ReviewsBlock, FAQBlock, EmailCapture, TrustAccordion, ProductImageBlock, CollectionsBlock, SummerDealsSlider, ShippingCountdown } from '../components/Blocks';

export default function Home({ onCartOpen }) {
  const isMobile = useIsMobile();
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
      <Reveal><section id="offer" style={{ maxWidth: isMobile ? 560 : 1140, margin: isMobile ? '22px 14px' : '44px auto', background: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 100%)`, borderRadius: 26, overflow: 'hidden', boxShadow: '0 14px 34px rgba(32,27,93,.16)', display: isMobile ? 'block' : 'grid', gridTemplateColumns: isMobile ? undefined : '1.05fr 1fr' }}>
        <div style={{ padding: isMobile ? 16 : 28, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ProductImageBlock src={IMG.frontCut} alt="flip'nsleep Signature Cold Pillow" height={isMobile ? 230 : 460} radius={18} style={{ width: '100%' }} />
          <span style={{ position: 'absolute', top: isMobile ? 28 : 44, left: isMobile ? 28 : 44, background: c.amber, color: c.navy, fontWeight: 700, fontSize: isMobile ? 13 : 15, borderRadius: 999, padding: isMobile ? '7px 16px' : '9px 20px' }}>1+1 free</span>
        </div>
        <div style={{ background: isMobile ? `linear-gradient(180deg, ${c.purple}, ${c.navy})` : `linear-gradient(135deg, ${c.purple}, ${c.navy})`, color: '#fff', padding: isMobile ? '24px 20px 26px' : '38px 36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 32, marginBottom: 4 }}>{PRODUCT.name}</h2>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 19 : 24, color: c.amber }}>
            {formatPrice(price, symbol)} <s style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: 13, color: '#CFCBF2' }}>{formatPrice(compare, symbol)}</s>
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
        </div>
      </section>

      </Reveal>

      <Reveal delay={100}><div style={{ maxWidth: isMobile ? 560 : 1140, margin: isMobile ? '0 14px 20px' : '0 auto 34px' }}>
        <TrustAccordion specs={<ul style={{ listStyle: 'none' }}>{PRODUCT.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>} />
      </div></Reveal>

      {/* ============ EMPATHY / NIGHT ============ */}
      <section style={{ background: `linear-gradient(180deg, ${c.night} 0%, ${c.navy} 100%)`, color: '#fff', padding: isMobile ? '52px 24px' : '96px 40px', position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.night} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .28 }} />
        <Reveal><div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 30 : 50, lineHeight: 1.2 }}>
            3 AM. Awake.<br /><span style={{ color: c.amber }}>Soaked. Again.</span>
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.75, margin: '18px auto 0', maxWidth: isMobile ? 420 : 540, color: '#E4E1FF' }}>
            Night sweats aren't "just part of it". When hormones change, so does the way your body regulates temperature at night — and a pillow that traps heat makes it worse. Cooling down your head is one of the fastest ways to fall back asleep.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
            {[['3 in 4', 'women in menopause experience night sweats'], ['Q-max 0.26', 'tested cool-touch value of the cold side'], ['100', 'nights to try it risk-free']].map(([b, s], i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.10)', borderRadius: 18, padding: '16px 18px', textAlign: 'center', minWidth: 110, maxWidth: 150 }}>
                <b style={{ display: 'block', fontFamily: FONT_DISPLAY, fontSize: 20, color: c.amber }}>{b}</b>
                <span style={{ fontSize: 11, lineHeight: 1.45, display: 'block', marginTop: 5, color: '#D7D3FF' }}>{s}</span>
              </div>
            ))}
          </div>
        </div></Reveal>
      </section>

      {/* ============ SUMMER DEALS SLIDER ============ */}
      <SummerDealsSlider />

      {/* ============ JUST FLIP IT ============ */}
      <section style={{ padding: isMobile ? '44px 22px' : '64px 40px', textAlign: 'center' }}>
        <Reveal><div style={EYEBROW}>How it works</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 28 : 36, color: c.navy, margin: '8px 0 10px' }}>Just flip it.</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, maxWidth: 400, margin: '0 auto' }}>One pillow, two sides. Flip to the cooling side on warm nights, back to the soft bamboo side in winter.</p></Reveal>
        <Reveal delay={120}><div style={{ display: isMobile ? 'block' : 'flex', maxWidth: isMobile ? undefined : 980, margin: isMobile ? undefined : '38px auto 0', gap: 70, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 320, margin: isMobile ? '26px auto 0' : 0, flexShrink: 0 }}>
          <div style={{ width: isMobile ? 240 : 300, height: isMobile ? 156 : 196, margin: '0 auto', perspective: 900 }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform .6s', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 26, backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 700, fontSize: 15, boxShadow: '0 16px 28px rgba(32,27,93,.18)', background: `linear-gradient(160deg,#EAF6FF,${c.pastelBlue})`, color: c.navy }}>
                ❄️ Cool side
                <small style={{ fontWeight: 500, fontSize: 11.5, opacity: .85, maxWidth: 190, lineHeight: 1.45 }}>Cool-touch fabric pulls heat away from your head</small>
              </div>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 26, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 700, fontSize: 15, boxShadow: '0 16px 28px rgba(32,27,93,.18)', background: `linear-gradient(160deg,#FFF2DC,${c.pastelYellow})`, color: c.navy }}>
                ☀️ Warm side
                <small style={{ fontWeight: 500, fontSize: 11.5, opacity: .85, maxWidth: 190, lineHeight: 1.45 }}>Soft bamboo fabric for colder nights</small>
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
            [c.pastelYellow, '🪶', 'Adjustable comfort'],
            [c.pastelPink, '🌡️', 'Cool and warm side'],
            [c.pastelBlue, '🌙', '100-night sleep trial'],
            [c.pastelMint, '😴', 'Suits any sleeping position'],
          ].map(([bg, icon, label], i) => (
            <div key={i}>
              <div style={{ width: isMobile ? 84 : 108, height: isMobile ? 84 : 108, borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 32 : 42, background: bg }}>{icon}</div>
              <p style={{ fontSize: isMobile ? 13.5 : 15, fontWeight: 600, lineHeight: 1.35, fontFamily: FONT_SUB }}>{label}</p>
            </div>
          ))}
        </div></Reveal>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <Reveal><section style={{ background: '#fff', margin: isMobile ? '36px 16px 0' : '52px auto 0', maxWidth: isMobile ? 640 : 760, borderRadius: 22, padding: '24px 20px', textAlign: 'center', boxShadow: '0 10px 26px rgba(32,27,93,.08)' }}>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 16, marginBottom: 14, color: c.navy }}>Tested & certified</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {[['OEKO-TEX®', 'Standard 100'], ['CertiPUR-US®', 'Certified foam'], ['Q-max 0.26', 'Tested cooling value']].map(([a, b], i) => (
            <span key={i} style={{ border: `1.5px solid rgba(32,27,93,.25)`, borderRadius: 12, fontSize: 11.5, fontWeight: 600, padding: '10px 14px', color: c.navy, lineHeight: 1.4 }}>{a}<br /><span style={{ fontWeight: 400 }}>{b}</span></span>
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
              <img src={IMG.frontCut} alt="flip'nsleep Signature Cold Pillow" style={{ maxHeight: 130 }} />
            </div>
            <span style={{ display: 'block', textAlign: 'center', fontSize: 28, margin: '4px 0 8px' }}>✅</span>
            <ul style={{ listStyle: 'none' }}>
              {['Adjustable to any sleeping position', 'Generous amount of filling as standard', 'Dual-sided: cool and warm', 'Washable outer cover', 'OEKO-TEX & CertiPUR-US certified'].map((t, i) => (
                <li key={i} style={{ borderTop: '1px solid rgba(255,255,255,.22)', padding: '10px 2px', fontSize: 13, textAlign: 'center' }}>{t}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#fff', borderRadius: 22, padding: 22, opacity: .9, boxShadow: '0 10px 26px rgba(32,27,93,.07)' }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 19, textAlign: 'center', color: c.navy }}>Standard pillow</h3>
            <div style={{ textAlign: 'center', margin: '10px 0 4px' }}>
              <img src={IMG.randomPillow} alt="Standard pillow" style={{ maxHeight: 130 }} />
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

      {/* ============ FINAL CTA ============ */}
      <section style={{ background: `linear-gradient(180deg, ${c.night}, #2A2270)`, color: '#fff', textAlign: 'center', padding: isMobile ? '56px 24px' : '96px 40px', position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.logoMark} alt="" aria-hidden="true" style={{ position: 'absolute', left: isMobile ? -30 : '8%', bottom: -20, height: 160, opacity: .25 }} />
        <Reveal><div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 32 : 56, lineHeight: 1.15 }}>Say NO<span style={{ display: 'block', fontSize: isMobile ? 22 : 30, color: c.sky2, fontFamily: FONT_SUB }}>to night sweats</span></h2>
          <p style={{ fontSize: isMobile ? 13.5 : 15.5, color: '#D7D3FF', margin: '16px auto 26px', maxWidth: isMobile ? 340 : 420, lineHeight: 1.7 }}>
            Wake up fresh and rested — free from overheating. Try flip'nsleep for 100 nights, risk-free.
          </p>
          <a href="#offer" style={{ ...BTN, fontSize: 14 }}>Order your Cold Pillow now</a>
        </div></Reveal>
      </section>

      <EmailCapture />

      {/* ============ SEO-TEKSTBLOK — night sweats / menopauze zoektermen ============ */}
      <Reveal y={16}><section style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '40px 22px 10px' : '54px 24px 10px', color: c.grayD }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: c.navy, marginBottom: 10 }}>The cooling pillow for night sweats</h2>
        <p style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 14 }}>
          If you regularly wake up hot and sweaty, you're not alone: night sweats are one of the most common sleep complaints, especially for women in menopause and perimenopause. Hormonal changes disrupt the way your body regulates temperature at night, and an ordinary pillow that traps heat under your head makes those hot flashes at night even harder to sleep through. A cooling pillow tackles the problem where it starts — your head is one of the fastest places your body sheds heat.
        </p>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: c.navy, marginBottom: 10 }}>How the Signature Cold Pillow helps you sleep cooler</h2>
        <p style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 14 }}>
          The flip'nsleep Signature Cold Pillow combines a cool-touch fabric side (tested Q-max cooling value of 0.26) with an adjustable shredded memory foam core that lets air circulate instead of building up heat. Flip it to the soft bamboo side in colder months — one pillow for hot sleepers, all year round. The loft adjusts to every sleeping position: side sleepers keep more filling for neck support, back and stomach sleepers take some out. And because every order is a 1+1 set with free shipping, a 100-night sleep trial and a 2-year warranty, trying a better night is risk-free. We ship across the United States and Canada.
        </p>
      </section></Reveal>
    </div>
  );
}
