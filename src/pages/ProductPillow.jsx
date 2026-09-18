import { useState, useEffect } from 'react';
import { c, BTN, BTNO, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
import Reveal from '../components/Reveal';
import PillowQuiz from '../components/PillowQuiz';
import { Stars, ReviewsBlock, FAQBlock, TrustAccordion, ProductImageBlock, ShippingCountdown } from '../components/Blocks';

// Echte Judge.me-review-samenvatting. Toont sterren + aantal zodra er
// geverifieerde reviews zijn; tot die tijd het eerlijke verkoopcijfer.
// Nooit verzonnen sterren of aantallen.
function useReviews() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/api/reviews').then(r => r.json()).then(setData).catch(() => setData(null)); }, []);
  return data;
}

export default function ProductPillow({ onCartOpen }) {
  const isMobile = useIsMobile();
  const { symbol, isCA } = useCurrency();
  const [selected, setSelected] = useState('1p1');
  const [img, setImg] = useState(0);
  const rv = useReviews();
  const hasReviews = !!(rv && rv.count > 0);
  const bundle = BUNDLES.find(b => b.id === selected);
  const price = getPrice(bundle, isCA);
  const perPillow = price / bundle.pillows;
  const dealPrice = getPrice(BUNDLES[0], isCA);

  const addToCart = () => { CartContext.add(selected, 1); onCartOpen && onCartOpen(); };

  const trust = [['🌙', '100-night trial'], ['🚚', 'Free shipping & returns'], ['✅', 'OEKO-TEX & CertiPUR-US'], ['🛡️', '2-year warranty']];

  return (
    <div>
      {/* 1 — Above the fold + buy box */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '20px 16px' : '48px 24px 28px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr', gap: isMobile ? 22 : 56 }}>
        {/* Gallery */}
        <Reveal><div>
          <ProductImageBlock src={PRODUCT.images[img]} alt={PRODUCT.name} height={isMobile ? 320 : 460} radius={22} />
          <div style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto' }}>
            {PRODUCT.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`}
                style={{ border: `2px solid ${i === img ? c.navy : 'transparent'}`, borderRadius: 12, padding: 0, cursor: 'pointer', background: c.sky, flexShrink: 0 }}>
                <img src={src} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10, display: 'block' }} />
              </button>
            ))}
          </div>
        </div></Reveal>

        {/* Info / buy box */}
        <Reveal delay={120}><div>
          <div style={EYEBROW}>Signature series</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 27 : 40, color: c.navy, margin: '6px 0 6px', lineHeight: 1.12 }}>{PRODUCT.name}</h1>
          <p style={{ fontFamily: FONT_SUB, fontSize: isMobile ? 16 : 19, color: c.purple, fontWeight: 500, lineHeight: 1.3, margin: '0 0 10px' }}>Sleep cooler on a pillow that finally fits your head.</p>

          {/* Proof: echte sterren zodra er reviews zijn, anders het verkoopcijfer */}
          {hasReviews ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Stars n={Math.round(rv.avg)} size={15} />
              <a href="#reviews" style={{ fontSize: 13, color: c.grayD, textDecoration: 'none' }}><b style={{ color: c.navy }}>{rv.avg}</b> · {rv.count} verified review{rv.count === 1 ? '' : 's'}</a>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: c.grayD, marginBottom: 12 }}>🌙 <b style={{ color: c.navy }}>500+ pillows</b> already shipped to hot sleepers</div>
          )}

          {/* Mechanisme-subhead */}
          <p style={{ fontSize: 14, color: c.grayD, lineHeight: 1.7, marginBottom: 14 }}>{PRODUCT.desc}</p>

          {/* Aanbod: BOGO, echte prijs per kussen, geen nep-anker */}
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: c.navy, marginBottom: 2 }}>Buy one, get one free</div>
          <div style={{ fontSize: 14, color: c.grayD, marginBottom: 12 }}>Two pillows for {formatPrice(price, symbol)}, that's <b style={{ color: '#2e6b4f' }}>{formatPrice(perPillow, symbol)} a pillow</b>, with free shipping.</div>

          <div style={{ marginBottom: 12 }}><ShippingCountdown /></div>

          {/* Bundelkeuze — per-kussen waarde, best value op 2+2 */}
          {BUNDLES.map(b => {
            const p = getPrice(b, isCA);
            const per = p / b.pillows;
            const active = selected === b.id;
            const best = b.id === '2p2';
            return (
              <div key={b.id} role="button" tabIndex={0}
                onClick={() => setSelected(b.id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(b.id); } }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `2px solid ${active ? c.navy : 'rgba(32,27,93,.15)'}`, borderRadius: 16, padding: '13px 15px', marginBottom: 10, cursor: 'pointer', boxShadow: active ? '0 8px 20px rgba(32,27,93,.10)' : 'none', transition: 'all .15s' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: FONT_SUB }}>{b.pillows} pillows · {b.short}</div>
                  <div style={{ fontSize: 12.5, color: c.grayD }}>{b.blurb}</div>
                  <div style={{ fontSize: 13.5, marginTop: 3 }}>{formatPrice(p, symbol)} <span style={{ color: c.grayD }}>· {formatPrice(per, symbol)} each</span></div>
                </div>
                <span style={{ marginLeft: 'auto', background: best ? '#2e6b4f' : (active ? c.navy : 'rgba(32,27,93,.08)'), color: best || active ? '#fff' : c.navy, fontSize: 11.5, fontWeight: 600, borderRadius: 999, padding: '6px 12px', whiteSpace: 'nowrap' }}>{best ? 'Best value' : 'Our deal'}</span>
              </div>
            );
          })}

          {/* CTA — Add to cart primair, Buy now secundair */}
          <div style={{ display: 'flex', gap: 10, margin: '14px 0 10px', flexDirection: isMobile ? 'column' : 'row' }}>
            <button onClick={addToCart} style={{ ...BTN, flex: 1.4, textAlign: 'center', fontSize: 14 }}>Add to cart</button>
            <button onClick={() => buyNow(selected)} style={{ ...BTNO, flex: 1, textAlign: 'center' }}>Buy now</button>
          </div>
          <div style={{ fontSize: 12.5, color: c.grayD, textAlign: 'center', marginBottom: 16 }}>100 nights to feel the difference. Not sleeping cooler? Full refund, no return hassle.</div>

          {/* Trust row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginBottom: 16 }}>
            {trust.map(([i, t], k) => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: c.grayD, fontFamily: FONT_SUB }}><span>{i}</span>{t}</span>
            ))}
          </div>

          <TrustAccordion specs={<ul style={{ listStyle: 'none' }}>{PRODUCT.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>} />
        </div></Reveal>
      </section>

      {/* 2 — Proof strip */}
      <section style={{ background: '#fff', borderTop: '1px solid rgba(32,27,93,.08)', borderBottom: '1px solid rgba(32,27,93,.08)', padding: isMobile ? '15px 16px' : '18px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '10px 16px' : '10px 26px', textAlign: 'center' }}>
          {hasReviews && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 700, color: c.navy }}><Stars n={Math.round(rv.avg)} size={13} /> {rv.avg} · {rv.count} reviews</span>}
          {[['🌙', '500+ pillows sold'], ['🚚', 'Free shipping & returns'], ['🛌', '100-night sleep trial'], ['✅', 'OEKO-TEX & CertiPUR-US'], ['🛡️', '2-year warranty']].map(([i, t], k) => (
            <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: c.navy, fontFamily: FONT_SUB }}><span>{i}</span>{t}</span>
          ))}
        </div>
      </section>

      {/* 3 — The problem, up front */}
      <section style={{ padding: isMobile ? '40px 20px 6px' : '60px 24px 16px' }}>
        <Reveal><div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={EYEBROW}>The real reason you wake up hot</div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 26 : 34, color: c.navy, margin: '10px 0 14px', lineHeight: 1.15 }}>The problem was never you. It was the pillow.</h2>
          <p style={{ fontSize: 15, color: c.grayD, lineHeight: 1.75 }}>
            Waking up hot is one of the most common reasons people stir at night, and a solid memory foam pillow makes it worse. Dense foam holds heat, so it warms up under your head and keeps you there. You flip to the cold side, and a minute later it's warm again. You're not a bad sleeper. You've been sleeping on a heat trap.
          </p>
        </div></Reveal>
      </section>

      {/* 4 — Mechanism */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '20px 16px 26px' : '30px 24px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 18 : 44, alignItems: 'center' }}>
        <Reveal><img src={IMG.coverInside} alt="Inside the Signature Cold Pillow: shredded memory foam that breathes" style={{ borderRadius: 22, width: '100%' }} /></Reveal>
        <Reveal delay={120}><div>
          <div style={EYEBROW}>Why it's different</div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 31, color: c.navy, margin: '8px 0 16px', lineHeight: 1.15 }}>Built to lose heat, not hold it</h2>
          <ol style={{ listStyle: 'none' }}>
            {[
              ['Shredded, not solid', 'The foam is broken into small pieces so air moves between them. Heat escapes instead of building up under your head, the way it does in a single block of foam.'],
              ['A genuinely cool surface', 'The cold side is woven from a cool-touch fabric with a tested Q-max of 0.26. The higher that number, the colder the fabric feels the moment your skin touches it, and 0.26 is a real cool-touch reading, not marketing.'],
              ['You set the height', 'Unzip and take out filling until the loft fits your sleeping position, so your neck is supported without piling on bulk that traps heat.'],
              ['Warm side for winter', 'Flip it over to the soft bamboo face when the nights turn cold. The outer cover zips off and goes in the wash.'],
            ].map(([t, d], i) => (
              <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, fontSize: 13.5, lineHeight: 1.65 }}>
                <b style={{ flex: '0 0 30px', height: 30, borderRadius: '50%', background: c.sky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 13 }}>{i + 1}</b>
                <div><strong>{t}.</strong> <span style={{ color: c.grayD }}>{d}</span></div>
              </li>
            ))}
          </ol>
          <p style={{ fontSize: 12, color: c.gray, lineHeight: 1.6, marginTop: 4, fontStyle: 'italic' }}>It loses heat and feels cool to the touch. Like every cool-touch fabric it doesn't stay ice-cold all night, so flip for a fresh cool side and use a breathable pillowcase.</p>
        </div></Reveal>
      </section>

      {/* 5 — Made to fit you + Filling Finder */}
      <section style={{ padding: isMobile ? '8px 20px 0' : '8px 24px 0' }}>
        <Reveal><div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={EYEBROW}>Made to fit you</div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 32, color: c.navy, margin: '10px 0 12px', lineHeight: 1.15 }}>One pillow that actually fits you</h2>
          <p style={{ fontSize: 14.5, color: c.grayD, lineHeight: 1.75 }}>
            Most pillows are a single height for every head, which is why they work for some people and fail everyone else. Side sleepers need loft. Stomach sleepers need almost none. Your Signature Cold Pillow arrives generously filled, and you take out handfuls until it's exactly right. Answer four quick questions and we'll tell you roughly how much to remove. No email needed, and you can re-tune any time.
          </p>
        </div></Reveal>
      </section>
      <PillowQuiz />

      {/* 6 — Reviews wall (verschijnt vanzelf zodra er reviews zijn) */}
      <div id="reviews"><ReviewsBlock /></div>

      {/* 7 — Comparison vs a generic cooling pillow */}
      <section style={{ padding: isMobile ? '40px 16px 6px' : '56px 24px 16px' }}>
        <Reveal><h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 32, color: c.navy, textAlign: 'center', marginBottom: 6 }}>How it compares</h2></Reveal>
        <Reveal><p style={{ textAlign: 'center', fontSize: 13.5, color: c.grayD, maxWidth: 470, margin: '0 auto 22px' }}>Against a typical single-sided cooling pillow, your real edge is value and all-season use.</p></Reveal>
        <Reveal delay={100}><div style={{ maxWidth: 720, margin: '0 auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}></th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontFamily: FONT_SUB, color: c.navy, background: c.sky }}>Signature Cold Pillow</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontFamily: FONT_SUB, color: c.grayD }}>A generic cooling pillow</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Price', `Two for ${formatPrice(price, symbol)}, so ${formatPrice(perPillow, symbol)} each`, 'Often one pillow for $120 to $150'],
                ['All year', 'Cool side and warm side', 'Cool side only'],
                ['Fit', 'Adjustable fill for your position', 'Fixed loft'],
                ['Heat', 'Breathable shredded foam', 'Often solid foam that heats up'],
                ['Trying it', '100-night trial, free returns', 'Varies, sometimes restocking fees'],
                ['Certified', 'OEKO-TEX and CertiPUR-US', 'Certification varies'],
              ].map(([label, ours, theirs], i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(32,27,93,.1)' }}>
                  <td style={{ padding: '11px 14px', fontWeight: 700, color: c.navy, fontFamily: FONT_SUB }}>{label}</td>
                  <td style={{ padding: '11px 14px', color: c.navy, background: 'rgba(213,235,249,.4)' }}>{ours}</td>
                  <td style={{ padding: '11px 14px', color: c.grayD }}>{theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></Reveal>
      </section>

      {/* 8 — Offer, guarantee, final CTA */}
      <section id="offer" style={{ padding: isMobile ? '36px 20px 40px' : '54px 24px 60px' }}>
        <Reveal><div style={{ maxWidth: 620, margin: '0 auto', background: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 100%)`, borderRadius: 26, padding: isMobile ? '30px 22px 34px' : '40px 40px 44px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 32, color: c.navy, marginBottom: 12, lineHeight: 1.15 }}>Sleep cooler tonight, or your money back</h2>
          <p style={{ fontSize: 14.5, color: c.grayD, lineHeight: 1.75, maxWidth: 470, margin: '0 auto 18px' }}>
            Buy one, get one free: two pillows for {formatPrice(dealPrice, symbol)}, {formatPrice(dealPrice / 2, symbol)} a pillow, with free shipping. Sleep on it for 100 nights under our <b style={{ color: c.navy }}>100-Night Cool Sleep Promise</b>. If you're not sleeping cooler, we refund you in full, with no return-shipping hassle. Backed by a 2-year warranty.
          </p>
          <div style={{ marginBottom: 14, display: 'inline-block' }}><ShippingCountdown /></div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={addToCart} style={{ ...BTN, fontSize: 14 }}>Add to cart</button>
            <button onClick={() => buyNow(selected)} style={{ ...BTNO, fontSize: 13 }}>Buy now</button>
          </div>
        </div></Reveal>
      </section>

      {/* 9 — FAQ */}
      <section style={{ padding: isMobile ? '10px 22px 10px' : '10px 40px 18px' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: c.navy, textAlign: 'center', marginBottom: 14 }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h2>
        <FAQBlock limit={8} />
      </section>

      {/* 10 — Certifications + Q-max in plain language */}
      <section style={{ padding: isMobile ? '18px 20px 50px' : '24px 24px 64px' }}>
        <Reveal><div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 22, padding: isMobile ? '24px 20px' : '30px 34px', boxShadow: '0 10px 26px rgba(32,27,93,.07)' }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 20 : 24, color: c.navy, textAlign: 'center', marginBottom: 6 }}>Tested and certified</h2>
          <p style={{ textAlign: 'center', fontSize: 12.5, color: c.grayD, maxWidth: 560, margin: '0 auto 20px', lineHeight: 1.6 }}>The cool side has a tested Q-max of 0.26, a real cool-touch reading, so it feels cold the moment you touch it. The materials are independently certified.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
            {[
              ['❄️', 'Q-max 0.26', 'Tested cool-touch value. The higher the number, the colder it feels on contact.'],
              ['✅', 'OEKO-TEX Standard 100', 'Fabrics tested for harmful substances.'],
              ['🛡️', 'CertiPUR-US foam', 'No harmful flame retardants or heavy metals, low VOC.'],
            ].map(([icon, t, d], i) => (
              <div key={i} style={{ background: c.sky, borderRadius: 16, padding: '18px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: 14, color: c.navy, marginBottom: 5 }}>{t}</div>
                <div style={{ fontSize: 12, lineHeight: 1.55, color: c.grayD }}>{d}</div>
              </div>
            ))}
          </div>
        </div></Reveal>
      </section>
    </div>
  );
}
