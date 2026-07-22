import { useState } from 'react';
import { Link } from 'react-router-dom';
import { c, BTN, BTNO, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
import { CloudDivider, Stars, ReviewsBlock, FAQBlock, EmailCapture, TrustAccordion } from '../components/Blocks';

export default function Home({ onCartOpen }) {
  const isMobile = useIsMobile();
  const { symbol, isCA } = useCurrency();
  const [selected, setSelected] = useState('1p1');
  const [flipped, setFlipped] = useState(false);
  const bundle = BUNDLES.find(b => b.id === selected);
  const price = getPrice(bundle, isCA);
  const compare = isCA ? bundle.compareAt.cad : bundle.compareAt.usd;

  const addToCart = () => { CartContext.add(selected, 1); onCartOpen && onCartOpen(); };

  return (
    <div>
      {/* ============ HERO ============ */}
      <section style={{ background: `linear-gradient(180deg, ${c.skyDeep} 0%, ${c.sky} 55%, ${c.sky2} 100%)`, padding: isMobile ? '46px 22px 0' : '70px 40px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.falling} alt="" aria-hidden="true" style={{ position: 'absolute', top: isMobile ? -10 : 0, right: isMobile ? -70 : '6%', width: isMobile ? 220 : 340, opacity: .9, transform: 'rotate(8deg)', mixBlendMode: 'multiply' }} />
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <img src={IMG.icon1p1} alt="1 plus 1 free" style={{ height: isMobile ? 84 : 110, transform: 'rotate(-4deg)', filter: 'drop-shadow(0 10px 24px rgba(32,27,93,.25))' }} />
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 36 : 54, color: c.navy, margin: '18px 0 10px', lineHeight: 1.1 }}>
            Summer <span style={{ fontFamily: FONT_SUB, fontWeight: 400 }}>Deals</span>
          </h1>
          <p style={{ fontSize: isMobile ? 14 : 15.5, lineHeight: 1.65, maxWidth: 380, margin: '0 auto 22px' }}>
            Shop for summer with a buy-one-get-one-free offer on our Signature Cold Pillow.
          </p>
          <a href="#offer" style={{ ...BTN, fontSize: 14, padding: '15px 38px' }}>Shop now</a>
        </div>
        <CloudDivider fill={c.cream} />
      </section>

      {/* ============ PRODUCT CARD + OFFER ============ */}
      <section id="offer" style={{ maxWidth: 560, margin: isMobile ? '22px 14px' : '30px auto', background: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 100%)`, borderRadius: 26, overflow: 'hidden', boxShadow: '0 14px 34px rgba(32,27,93,.16)' }}>
        <div style={{ padding: 22, textAlign: 'center', position: 'relative' }}>
          <span style={{ position: 'absolute', top: 16, left: 16, background: c.amber, color: c.navy, fontWeight: 700, fontSize: 13, borderRadius: 999, padding: '7px 16px' }}>1+1 free</span>
          <img src={IMG.front} alt="flip'nsleep Signature Cold Pillow" style={{ maxHeight: 250, borderRadius: 16 }} />
        </div>
        <div style={{ background: `linear-gradient(180deg, ${c.purple}, ${c.navy})`, color: '#fff', padding: '24px 20px 26px' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, marginBottom: 4 }}>{PRODUCT.name}</h2>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: c.amber }}>
            {formatPrice(price, symbol)} <s style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: 13, color: '#CFCBF2' }}>{formatPrice(compare, symbol)}</s>
          </div>
          <div style={{ margin: '6px 0 2px' }}><Stars n={5} /><span style={{ fontSize: 12.5, color: '#DDD9FF', marginLeft: 8 }}>Loved by hot sleepers</span></div>
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
          <div style={{ display: 'flex', gap: 10, marginTop: 18, flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center' }}>
            <button onClick={() => buyNow(selected)} style={{ ...BTN, fontSize: 14, flex: 1, textAlign: 'center' }}>Order your Cold Pillow now</button>
            <button onClick={addToCart} style={{ ...BTNO, color: '#fff', borderColor: '#fff', flex: isMobile ? undefined : '0 0 auto' }}>Add to cart</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 560, margin: isMobile ? '0 14px 20px' : '0 auto 26px' }}>
        <TrustAccordion specs={<ul style={{ listStyle: 'none' }}>{PRODUCT.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>} />
      </div>

      {/* ============ EMPATHY / NIGHT ============ */}
      <section style={{ background: `linear-gradient(180deg, ${c.night} 0%, ${c.navy} 100%)`, color: '#fff', padding: isMobile ? '52px 24px' : '72px 40px', position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.night} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .28 }} />
        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 30 : 40, lineHeight: 1.2 }}>
            3 AM. Awake.<br /><span style={{ color: c.amber }}>Soaked. Again.</span>
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.75, margin: '16px auto 0', maxWidth: 420, color: '#E4E1FF' }}>
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
        </div>
      </section>
      <CloudDivider fill={c.cream} flip />

      {/* ============ JUST FLIP IT ============ */}
      <section style={{ padding: isMobile ? '44px 22px' : '64px 40px', textAlign: 'center' }}>
        <div style={EYEBROW}>How it works</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 28 : 36, color: c.navy, margin: '8px 0 10px' }}>Just flip it.</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, maxWidth: 400, margin: '0 auto' }}>One pillow, two sides. Flip to the cooling side on warm nights, back to the soft bamboo side in winter.</p>
        <div style={{ maxWidth: 320, margin: '26px auto 0' }}>
          <div style={{ width: 240, height: 156, margin: '0 auto', perspective: 900 }}>
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
        <ol style={{ listStyle: 'none', maxWidth: 380, margin: '30px auto 0', textAlign: 'left' }}>
          {[
            ['Unzip and adjust.', 'Add or remove filling until the height matches your sleeping position.'],
            ['Pick your side.', 'Cool-touch fabric on one side, soft bamboo on the other.'],
            ['Sleep through the night.', 'Less heat build-up means fewer wake-ups.'],
          ].map(([t, s], i) => (
            <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, fontSize: 13.5, lineHeight: 1.6 }}>
              <b style={{ flex: '0 0 34px', height: 34, borderRadius: '50%', background: c.sky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 14 }}>{i + 1}</b>
              <div><strong>{t}</strong> {s}</div>
            </li>
          ))}
        </ol>
        <Link to="/how-it-works" style={{ ...BTNO, marginTop: 10 }}>See how it works</Link>
      </section>

      {/* ============ USP ICONS ============ */}
      <section style={{ padding: '0 20px 10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '26px 12px', maxWidth: isMobile ? 380 : 820, margin: '10px auto 0', textAlign: 'center' }}>
          {[
            [c.pastelYellow, '🪶', 'Adjustable comfort'],
            [c.pastelPink, '🌡️', 'Cool and warm side'],
            [c.pastelBlue, '🌙', '100-night sleep trial'],
            [c.pastelMint, '😴', 'Suits any sleeping position'],
          ].map(([bg, icon, label], i) => (
            <div key={i}>
              <div style={{ width: 84, height: 84, borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, background: bg }}>{icon}</div>
              <p style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.35, fontFamily: FONT_SUB }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <section style={{ background: '#fff', margin: isMobile ? '36px 16px 0' : '46px auto 0', maxWidth: 640, borderRadius: 22, padding: '24px 20px', textAlign: 'center', boxShadow: '0 10px 26px rgba(32,27,93,.08)' }}>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 16, marginBottom: 14, color: c.navy }}>Tested & certified</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {[['OEKO-TEX®', 'Standard 100'], ['CertiPUR-US®', 'Certified foam'], ['Q-max 0.26', 'Tested cooling value']].map(([a, b], i) => (
            <span key={i} style={{ border: `1.5px solid rgba(32,27,93,.25)`, borderRadius: 12, fontSize: 11.5, fontWeight: 600, padding: '10px 14px', color: c.navy, lineHeight: 1.4 }}>{a}<br /><span style={{ fontWeight: 400 }}>{b}</span></span>
          ))}
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <div style={{ marginTop: 46 }}><ReviewsBlock /></div>
      <CloudDivider fill={c.cream} flip />

      {/* ============ WHY / COMPARISON TEASER ============ */}
      <section style={{ padding: isMobile ? '36px 22px 10px' : '50px 40px 10px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 26 : 32, color: c.navy, marginBottom: 20 }}>Why <span style={{ color: c.purple }}>flip'nsleep?</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18, maxWidth: 780, margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(180deg, ${c.navy}, ${c.purple})`, color: '#fff', borderRadius: 22, padding: 22 }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 19, textAlign: 'center' }}>flip<span style={{ color: c.amber }}>'</span>nsleep</h3>
            <span style={{ display: 'block', textAlign: 'center', fontSize: 28, margin: '6px 0 8px' }}>✅</span>
            <ul style={{ listStyle: 'none' }}>
              {['Adjustable to any sleeping position', 'Generous amount of filling as standard', 'Dual-sided: cool and warm', 'Washable outer cover', 'OEKO-TEX & CertiPUR-US certified'].map((t, i) => (
                <li key={i} style={{ borderTop: '1px solid rgba(255,255,255,.22)', padding: '10px 2px', fontSize: 13, textAlign: 'center' }}>{t}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#fff', borderRadius: 22, padding: 22, opacity: .9, boxShadow: '0 10px 26px rgba(32,27,93,.07)' }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 19, textAlign: 'center', color: c.navy }}>Standard pillow</h3>
            <span style={{ display: 'block', textAlign: 'center', fontSize: 28, margin: '6px 0 8px' }}>❌</span>
            <ul style={{ listStyle: 'none' }}>
              {['Non-adjustable', 'Standard filling, often insufficient volume', 'No choice — often too warm', 'Not removable or washable', 'Certification unknown'].map((t, i) => (
                <li key={i} style={{ borderTop: '1px solid rgba(32,27,93,.12)', padding: '10px 2px', fontSize: 13, textAlign: 'center', color: c.grayD }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link to="/why-flipnsleep" style={{ ...BTNO, marginTop: 24 }}>See the full comparison</Link>
      </section>

      {/* ============ FAQ TEASER ============ */}
      <section style={{ padding: isMobile ? '40px 22px' : '54px 40px' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 30, color: c.navy, textAlign: 'center', marginBottom: 14 }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h2>
        <FAQBlock limit={4} />
        <div style={{ textAlign: 'center', marginTop: 18 }}><Link to="/faq" style={BTNO}>All questions</Link></div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section style={{ background: `linear-gradient(180deg, ${c.night}, #2A2270)`, color: '#fff', textAlign: 'center', padding: isMobile ? '56px 24px' : '72px 40px', position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.logoMark} alt="" aria-hidden="true" style={{ position: 'absolute', left: isMobile ? -30 : '8%', bottom: -20, height: 160, opacity: .25 }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 32 : 44, lineHeight: 1.15 }}>Say NO<span style={{ display: 'block', fontSize: isMobile ? 22 : 30, color: c.sky2, fontFamily: FONT_SUB }}>to night sweats</span></h2>
          <p style={{ fontSize: 13.5, color: '#D7D3FF', margin: '14px auto 22px', maxWidth: 340, lineHeight: 1.7 }}>
            Wake up fresh and rested — free from overheating. Try flip'nsleep for 100 nights, risk-free.
          </p>
          <a href="#offer" style={{ ...BTN, fontSize: 14 }}>Order your Cold Pillow now</a>
        </div>
      </section>

      <EmailCapture />
    </div>
  );
}
