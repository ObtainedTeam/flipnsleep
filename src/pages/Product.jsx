import { useState } from 'react';
import { c, BTN, BTNO, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, IMG } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
import { Stars, ReviewsBlock, FAQBlock, TrustAccordion, CloudDivider, ProductImageBlock, ShippingCountdown } from '../components/Blocks';

export default function Product({ onCartOpen }) {
  const isMobile = useIsMobile();
  const { symbol, isCA } = useCurrency();
  const [selected, setSelected] = useState('1p1');
  const [img, setImg] = useState(0);
  const bundle = BUNDLES.find(b => b.id === selected);
  const price = getPrice(bundle, isCA);
  const compare = isCA ? bundle.compareAt.cad : bundle.compareAt.usd;
  const perPillow = price / bundle.pillows;

  const addToCart = () => { CartContext.add(selected, 1); onCartOpen && onCartOpen(); };

  return (
    <div>
      <section style={{ maxWidth: 1060, margin: '0 auto', padding: isMobile ? '20px 16px' : '40px 24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr', gap: isMobile ? 24 : 44 }}>
        {/* Gallery */}
        <div>
          <ProductImageBlock src={PRODUCT.images[img]} alt={PRODUCT.name} height={isMobile ? 320 : 460} radius={22} />
          <div style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto' }}>
            {PRODUCT.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`}
                style={{ border: `2px solid ${i === img ? c.navy : 'transparent'}`, borderRadius: 12, padding: 0, cursor: 'pointer', background: c.sky, flexShrink: 0 }}>
                <img src={src} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10, display: 'block' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={EYEBROW}>Signature series</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 28 : 36, color: c.navy, margin: '6px 0 6px', lineHeight: 1.15 }}>{PRODUCT.name}</h1>
          <div style={{ marginBottom: 8 }}><Stars n={5} /><span style={{ fontSize: 12.5, color: c.grayD, marginLeft: 8 }}>4.7 · loved by hot sleepers</span></div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: c.navy }}>
            {formatPrice(price, symbol)} <s style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: 14, color: '#999' }}>{formatPrice(compare, symbol)}</s>
          </div>
          <div style={{ fontSize: 12.5, color: '#2e6b4f', fontWeight: 600, marginBottom: 8 }}>That's {formatPrice(perPillow, symbol)} per pillow · free shipping included</div>
          <div style={{ marginBottom: 14 }}><ShippingCountdown /></div>

          {/* FAMILY-DEAL badge-stijl blok */}
          <div style={{ background: '#F0F5F2', border: '1px solid #d4e6da', borderRadius: 12, padding: '12px 16px', marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#2e6b4f', letterSpacing: .5, marginBottom: 4 }}>🌙 1+1 FREE — OUR SIGNATURE DEAL</div>
            <div style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>Every order comes as a set: one for you, one on us. Applied automatically at checkout.</div>
          </div>

          <p style={{ fontSize: 14, color: c.grayD, lineHeight: 1.7, marginBottom: 18 }}>{PRODUCT.desc}</p>

          {BUNDLES.map(b => {
            const p = getPrice(b, isCA);
            const cm = isCA ? b.compareAt.cad : b.compareAt.usd;
            const active = selected === b.id;
            return (
              <div key={b.id} role="button" tabIndex={0}
                onClick={() => setSelected(b.id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(b.id); } }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `2px solid ${active ? c.navy : 'rgba(32,27,93,.15)'}`, borderRadius: 16, padding: '13px 15px', marginBottom: 10, cursor: 'pointer', boxShadow: active ? '0 8px 20px rgba(32,27,93,.10)' : 'none', transition: 'all .15s' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: FONT_SUB }}>{b.label}</div>
                  <div style={{ fontSize: 12.5, color: c.grayD }}>{b.blurb}</div>
                  <div style={{ fontSize: 13.5, marginTop: 3 }}>{formatPrice(p, symbol)} <s style={{ opacity: .5, marginLeft: 6, fontSize: 12 }}>{formatPrice(cm, symbol)}</s></div>
                </div>
                <span style={{ marginLeft: 'auto', background: active ? c.navy : 'rgba(32,27,93,.08)', color: active ? '#fff' : c.navy, fontSize: 11.5, fontWeight: 600, borderRadius: 999, padding: '6px 12px', whiteSpace: 'nowrap' }}>Save {formatPrice(cm - p, symbol)}</span>
              </div>
            );
          })}

          <div style={{ display: 'flex', gap: 10, margin: '16px 0 18px', flexDirection: isMobile ? 'column' : 'row' }}>
            <button onClick={() => buyNow(selected)} style={{ ...BTN, flex: 1, textAlign: 'center', fontSize: 14 }}>Buy now</button>
            <button onClick={addToCart} style={{ ...BTNO, flex: 1, textAlign: 'center' }}>Add to cart</button>
          </div>

          <TrustAccordion specs={<ul style={{ listStyle: 'none' }}>{PRODUCT.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>} />
        </div>
      </section>

      {/* Detail: vulling */}
      <section style={{ maxWidth: 1060, margin: '0 auto', padding: isMobile ? '10px 16px 30px' : '20px 24px 50px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 18 : 40, alignItems: 'center' }}>
        <img src={IMG.filling} alt="Inside the Signature Cold Pillow: adjustable shredded memory foam" style={{ borderRadius: 22 }} />
        <div>
          <div style={EYEBROW}>A look inside the pillow</div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 30, color: c.navy, margin: '8px 0 14px' }}>Four layers, one cool night</h2>
          <ol style={{ listStyle: 'none' }}>
            {[
              ['Cool-touch outer side', 'Woven cooling fabric with a tested Q-max value of 0.26 — the instant cold feeling when your skin touches it.'],
              ['Adjustable foam core', 'Recycled shredded memory foam (35–40D). Unzip, add or remove filling until the loft fits your sleeping position exactly.'],
              ['Breathing room', 'Because the foam is shredded, air keeps circulating between the pieces — no heat build-up under your head.'],
              ['Warm bamboo side', 'Flip it in winter: the reverse side is soft, breathable bamboo fabric. The outer cover zips off and is machine-washable.'],
            ].map(([t, d], i) => (
              <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, fontSize: 13.5, lineHeight: 1.65 }}>
                <b style={{ flex: '0 0 30px', height: 30, borderRadius: '50%', background: c.sky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 13 }}>{i + 1}</b>
                <div><strong>{t}.</strong> <span style={{ color: c.grayD }}>{d}</span></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ReviewsBlock />
      <section style={{ padding: isMobile ? '30px 22px 10px' : '40px 40px 20px' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: c.navy, textAlign: 'center', marginBottom: 12 }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h2>
        <FAQBlock limit={5} />
      </section>
    </div>
  );
}
