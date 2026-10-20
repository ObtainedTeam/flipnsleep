import { useState, useEffect, useRef } from 'react';
import { c, BTN, BTNO, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W, CARD, CHIP } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG, dim } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
import { trackAddToCart, trackViewContent } from '../track';
import Reveal from '../components/Reveal';
import PillowQuiz from '../components/PillowQuiz';
import { Stars, ReviewsBlock, FAQBlock, TrustAccordion, ProductImageBlock, ShippingCountdown, CompareCards } from '../components/Blocks';
import StickyBuyBar from '../components/StickyBuyBar';

// Echte Judge.me-review-samenvatting. Toont sterren + aantal zodra er
// geverifieerde reviews zijn; tot die tijd het eerlijke verkoopcijfer.
// Nooit verzonnen sterren of aantallen.
function useReviews() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/api/reviews').then(r => r.json()).then(setData).catch(() => setData(null)); }, []);
  return data;
}

export default function ProductPillow({ onCartOpen }) {
  const { symbol, isCA } = useCurrency();
  const [selected, setSelected] = useState('1p1');
  const [img, setImg] = useState(0);
  const buyRef = useRef(null);
  useEffect(() => { trackViewContent({ content_type: 'product', content_name: 'flipnsleep-pillow' }); }, []);
  const rvw = useReviews();
  const hasReviews = !!(rvw && rvw.count > 0);
  const bundle = BUNDLES.find(b => b.id === selected);
  const price = getPrice(bundle, isCA);
  const perPillow = price / bundle.pillows;
  const dealPrice = getPrice(BUNDLES[0], isCA);

  const addToCart = () => {
    trackAddToCart({ content_type: 'product', content_name: 'flipnsleep-pillow', contents: [{ id: selected, quantity: 1 }] });
    CartContext.add(selected, 1);
    onCartOpen && onCartOpen();
  };

  const compareRows = [
    ['Price', `Two for ${formatPrice(price, symbol)}, so ${formatPrice(perPillow, symbol)} each`, 'Often one pillow for $120 to $150'],
    ['All year', 'Cool side and warm side', 'Cool side only'],
    ['Fit', 'Adjustable fill for your position', 'Fixed loft'],
    ['Heat', 'Breathable shredded foam', 'Often solid foam that heats up'],
    ['Trying it', '100-night trial, free returns', 'Varies, sometimes restocking fees'],
    ['Certified', 'OEKO-TEX and CertiPUR-US', 'Certification varies'],
  ];

  return (
    <div>
      {/* 1 — Above the fold + buy box */}
      <section className="r-pad r-cols r-gap" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', '48px 40px 56px', '24px 20px 40px'), display: 'grid', ...rv('cols', 'minmax(0, 1.05fr) minmax(0, 1fr)', 'minmax(0, 1fr)'), ...rv('gap', 56, 24) }}>
        {/* Gallery */}
        <Reveal><div>
          <ProductImageBlock src={PRODUCT.images[img]} alt={PRODUCT.name} height={[460, 320]} radius={R.lg} priority />
          <div className="thumbs">
            {PRODUCT.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`}
                style={{ border: `2px solid ${i === img ? c.navy : 'transparent'}`, borderRadius: R.sm, padding: 0, cursor: 'pointer', background: c.sky, flexShrink: 0, overflow: 'hidden' }}>
                <img src={src} {...dim(src)} loading="lazy" decoding="async" alt="" style={{ width: 64, height: 64, objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>
        </div></Reveal>

        {/* Info / buy box */}
        <Reveal delay={120}><div>
          <div style={EYEBROW}>Signature series</div>
          <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), color: c.navy, margin: '8px 0 8px', lineHeight: LH.tight }}>{PRODUCT.name}</h1>
          <p className="r-fs" style={{ fontFamily: FONT_SUB, ...rv('fs', ...T.lg), color: c.purple, fontWeight: 500, lineHeight: LH.head, margin: '0 0 12px' }}>Sleep cooler on a pillow that finally fits your head.</p>

          {/* Proof: echte sterren zodra er reviews zijn (geen verzonnen cijfers) */}
          {hasReviews && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Stars n={Math.round(rvw.avg)} size={T.md[1]} />
              <a href="#reviews" style={{ fontSize: T.sm[0], color: c.grayD, textDecoration: 'none' }}><b style={{ color: c.navy }}>{rvw.avg}</b> · {rvw.count} verified review{rvw.count === 1 ? '' : 's'}</a>
            </div>
          )}

          {/* Mechanisme-subhead */}
          <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.grayD, lineHeight: LH.body, marginBottom: 16 }}>{PRODUCT.desc}</p>

          {/* Aanbod: BOGO, echte prijs per kussen, geen nep-anker */}
          <div className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.navy, marginBottom: 4 }}>Buy one, get one free</div>
          <div style={{ fontSize: T.sm[0], color: c.grayD, marginBottom: 12 }}>Two pillows for {formatPrice(price, symbol)}, that's <b style={{ color: c.purple }}>{formatPrice(perPillow, symbol)} a pillow</b>, with free shipping.</div>

          <div style={{ marginBottom: 16 }}><ShippingCountdown /></div>

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
                style={{ display: 'flex', alignItems: 'center', gap: 12, background: c.white, border: `2px solid ${active ? c.navy : 'rgba(32,27,93,.15)'}`, borderRadius: R.sm, padding: 16, marginBottom: 12, cursor: 'pointer', boxShadow: active ? SH.card : 'none', transition: 'all .15s' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: T.sm[0], fontFamily: FONT_SUB }}>{b.pillows} pillows · {b.short}</div>
                  <div style={{ fontSize: T.xs[0], color: c.grayD }}>{b.blurb}</div>
                  <div style={{ fontSize: T.sm[0], marginTop: 4 }}>{formatPrice(p, symbol)} <span style={{ color: c.grayD }}>· {formatPrice(per, symbol)} each</span></div>
                </div>
                <span style={{ ...CHIP, marginLeft: 'auto', background: best ? c.purple : (active ? c.navy : 'rgba(32,27,93,.08)'), color: best || active ? c.white : c.navy, fontSize: T.xs[0], fontWeight: 600 }}>{best ? 'Best value' : 'Our deal'}</span>
              </div>
            );
          })}

          {/* CTA — Add to cart primair, Buy now secundair */}
          <div ref={buyRef} className="row-m-col" style={{ display: 'flex', gap: 12, margin: '16px 0 12px' }}>
            <button onClick={addToCart} style={{ ...BTN, flex: '1.4 0 auto' }}>Add to cart</button>
            <button onClick={() => buyNow(selected)} style={{ ...BTNO, flex: '1 0 auto' }}>Buy now</button>
          </div>
          <TrustAccordion specs={<ul style={{ listStyle: 'none' }}>{PRODUCT.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>} />
        </div></Reveal>
      </section>

      {/* 3 — The problem, up front */}
      <section className="r-pad" style={rv('pad', ...SP.sectionTop)}>
        <Reveal><div style={{ maxWidth: W.text, margin: '0 auto', textAlign: 'center' }}>
          <div style={EYEBROW}>The real reason you wake up hot</div>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), color: c.navy, margin: '8px 0 16px', lineHeight: LH.head }}>The problem was never you. It was the pillow.</h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.grayD, lineHeight: LH.loose }}>
            Waking up hot is one of the most common reasons people stir at night, and a solid memory foam pillow makes it worse. Dense foam holds heat, so it warms up under your head and keeps you there. You flip to the cold side, and a minute later it's warm again. You're not a bad sleeper. You've been sleeping on a heat trap.
          </p>
        </div></Reveal>
      </section>

      {/* 4 — Mechanism */}
      <section className="r-pad grid-2m1 r-gap" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', ...SP.section), ...rv('gap', 56, 24), alignItems: 'center' }}>
        <Reveal><img src={IMG.coverInside} {...dim(IMG.coverInside)} loading="lazy" decoding="async" alt="Inside the Signature Cold Pillow: shredded memory foam that breathes" style={{ borderRadius: R.lg, boxShadow: SH.card, width: '100%' }} /></Reveal>
        <Reveal delay={120}><div>
          <div style={EYEBROW}>Why it's different</div>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), color: c.navy, margin: '8px 0 16px', lineHeight: LH.head }}>Built to lose heat, not hold it</h2>
          <ol style={{ listStyle: 'none' }}>
            {[
              ['Shredded, not solid', 'The foam is broken into small pieces so air moves between them. Heat escapes instead of building up under your head, the way it does in a single block of foam.'],
              ['A genuinely cool surface', 'The cold side is woven from a cool-touch fabric with a tested Q-max of 0.26. The higher that number, the colder the fabric feels the moment your skin touches it, and 0.26 is a real cool-touch reading, not marketing.'],
              ['You set the height', 'Unzip and take out filling until the loft fits your sleeping position, so your neck is supported without piling on bulk that traps heat.'],
              ['Warm side for winter', 'Flip it over to the soft bamboo face when the nights turn cold. The outer cover zips off and goes in the wash.'],
            ].map(([t, d], i) => (
              <li key={i} className="r-fs" style={{ display: 'flex', gap: 16, marginBottom: 16, ...rv('fs', ...T.md), lineHeight: LH.body }}>
                <b style={{ flex: '0 0 30px', height: 30, borderRadius: R.pill, background: c.sky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: T.sm[0] }}>{i + 1}</b>
                <div><strong>{t}.</strong> <span style={{ color: c.grayD }}>{d}</span></div>
              </li>
            ))}
          </ol>
          <p style={{ fontSize: T.xs[0], color: c.grayD, lineHeight: LH.body, marginTop: 8, fontStyle: 'italic' }}>It loses heat and feels cool to the touch. Like every cool-touch fabric it doesn't stay ice-cold all night, so flip for a fresh cool side and use a breathable pillowcase.</p>
        </div></Reveal>
      </section>

      {/* 5 — Made to fit you + Filling Finder */}
      <section className="r-pad" style={rv('pad', `0 ${SP.gutter[0]}px`, `0 ${SP.gutter[1]}px`)}>
        <Reveal><div style={{ maxWidth: W.text, margin: '0 auto', textAlign: 'center' }}>
          <div style={EYEBROW}>Made to fit you</div>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), color: c.navy, margin: '8px 0 16px', lineHeight: LH.head }}>One pillow that actually fits you</h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.grayD, lineHeight: LH.loose }}>
            Most pillows are a single height for every head, which is why they work for some people and fail everyone else. Side sleepers need loft. Stomach sleepers need almost none. Your Signature Cold Pillow arrives generously filled, and you take out handfuls until it's exactly right. Answer four quick questions and we'll tell you roughly how much to remove. No email needed, and you can re-tune any time.
          </p>
        </div></Reveal>
      </section>
      <PillowQuiz />

      {/* 6 — Reviews wall (verschijnt vanzelf zodra er reviews zijn) */}
      <div id="reviews"><ReviewsBlock /></div>

      {/* 7 — Comparison vs a generic cooling pillow */}
      <section className="r-pad" style={rv('pad', ...SP.sectionTop)}>
        <Reveal><h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, textAlign: 'center', marginBottom: 8 }}>How it compares</h2></Reveal>
        <Reveal><p className="r-fs" style={{ textAlign: 'center', ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, maxWidth: W.narrow, margin: '0 auto 24px' }}>Against a typical single-sided cooling pillow, your real edge is value and all-season use.</p></Reveal>
        <Reveal delay={100}><div className="m-only"><CompareCards rows={compareRows} ours="Signature Cold Pillow" theirs="Generic cooling pillow" /></div>
        <div className="d-only" style={{ maxWidth: W.text, margin: '0 auto', ...CARD, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: T.sm[0] }}>
            <thead>
              <tr>
                <th style={{ padding: '14px 16px', textAlign: 'left' }}></th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: FONT_SUB, color: c.navy, background: c.sky }}>Signature Cold Pillow</th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: FONT_SUB, color: c.grayD }}>A generic cooling pillow</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(([label, ours, theirs], i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(32,27,93,.1)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: c.navy, fontFamily: FONT_SUB }}>{label}</td>
                  <td style={{ padding: '12px 16px', color: c.navy, background: 'rgba(213,235,249,.4)' }}>{ours}</td>
                  <td style={{ padding: '12px 16px', color: c.grayD }}>{theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></Reveal>
      </section>

      {/* 8 — Offer, guarantee, final CTA */}
      <section id="offer" className="r-pad" style={rv('pad', ...SP.section)}>
        <Reveal><div className="r-pad" style={{ maxWidth: W.text, margin: '0 auto', background: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 100%)`, borderRadius: R.lg, boxShadow: SH.card, ...rv('pad', 40, SP.card[1]), textAlign: 'center' }}>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), color: c.navy, marginBottom: 16, lineHeight: LH.head }}>Sleep cooler tonight, or your money back</h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.grayD, lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto 20px' }}>
            Buy one, get one free: two pillows for {formatPrice(dealPrice, symbol)}, {formatPrice(dealPrice / 2, symbol)} a pillow, with free shipping. Sleep on it for 100 nights under our <b style={{ color: c.navy }}>100-Night Cool Sleep Promise</b>. If you're not sleeping cooler, we refund you in full, with no return-shipping hassle. Backed by a 2-year warranty.
          </p>
          <div style={{ marginBottom: 20, display: 'inline-block' }}><ShippingCountdown /></div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={addToCart} style={BTN}>Add to cart</button>
            <button onClick={() => buyNow(selected)} style={BTNO}>Buy now</button>
          </div>
        </div></Reveal>
      </section>

      {/* 9 — FAQ */}
      <section className="r-pad" style={rv('pad', `0 ${SP.gutter[0]}px`, `0 ${SP.gutter[1]}px`)}>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, textAlign: 'center', marginBottom: 24 }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h2>
        <FAQBlock limit={8} />
      </section>

      {/* 10 — Certifications + Q-max in plain language */}
      <section className="r-pad" style={rv('pad', ...SP.section)}>
        <Reveal><div className="r-pad" style={{ maxWidth: W.page - 200, margin: '0 auto', ...CARD, ...rv('pad', 40, SP.card[1]) }}>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.navy, textAlign: 'center', marginBottom: 8 }}>Tested and certified</h2>
          <p style={{ textAlign: 'center', fontSize: T.sm[0], color: c.grayD, maxWidth: W.narrow, margin: '0 auto 24px', lineHeight: LH.body }}>The cool side has a tested Q-max of 0.26, a real cool-touch reading, so it feels cold the moment you touch it. The materials are independently certified.</p>
          <div className="grid-3m1 r-gap" style={rv('gap', ...SP.gap)}>
            {[
              ['❄️', 'Q-max 0.26', 'Tested cool-touch value. The higher the number, the colder it feels on contact.'],
              ['✅', 'OEKO-TEX Standard 100', 'Fabrics tested for harmful substances.'],
              ['🛡️', 'CertiPUR-US foam', 'No harmful flame retardants or heavy metals, low VOC.'],
            ].map(([icon, t, d], i) => (
              <div key={i} style={{ background: c.sky, borderRadius: R.sm, padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: T.h3[0], marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: T.sm[0], color: c.navy, marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: T.xs[0], lineHeight: LH.body, color: c.grayD }}>{d}</div>
              </div>
            ))}
          </div>
        </div></Reveal>
      </section>

      <StickyBuyBar targetRef={buyRef} name="Signature Cold Pillow" price={`${formatPrice(price, symbol)} · ${bundle.pillows} pillows`} onAdd={addToCart} />
    </div>
  );
}
