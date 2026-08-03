import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { c, BTN, BTNO, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { productById, products } from '../data';
import { CartContext } from '../components/Cart';
import { buyNowProduct, isProductPurchasable } from '../shopify';
import Reveal from '../components/Reveal';
import { ProductImageBlock, TrustAccordion, ReviewsBlock, FAQBlock, ShippingCountdown } from '../components/Blocks';

// Productpagina voor de variantproducten (maat + kleur). Zelfde bouwstenen en
// wolk-achtergronden als de kussenpagina, gevoed uit products[] in data.js.
export default function ProductVariable({ onCartOpen }) {
  const isMobile = useIsMobile();
  const { symbol, isCA } = useCurrency();
  const { id } = useParams();
  const product = productById(id);

  const [size, setSize] = useState(product ? product.sizes[0] : null);
  const [color, setColor] = useState(product ? product.colors[0] : null);
  const [img, setImg] = useState(0);

  if (!product) {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: c.navy, marginBottom: 12 }}>Product not found</h1>
        <Link to="/shop" style={BTN}>Back to shop</Link>
      </section>
    );
  }

  const price = getPrice(product, isCA);
  const compare = product.compareAt ? (isCA ? product.compareAt.cad : product.compareAt.usd) : null;
  const purchasable = isProductPurchasable(product.id, size, color);
  const hasColors = product.colors.length > 1;
  const others = products.filter(p => p.id !== product.id).slice(0, 2);

  const addToCart = () => {
    if (!purchasable) return;
    CartContext.addProduct(product.id, size, color, 1);
    onCartOpen && onCartOpen();
  };

  const swatchBorder = (hex) => {
    // lichte kleuren krijgen een randje zodat ze zichtbaar zijn op wit
    const light = ['#F4F4EF', '#FFFFFF', '#FFF', '#D3D3D3'].includes((hex || '').toUpperCase());
    return light ? '1px solid rgba(32,27,93,.20)' : '1px solid rgba(32,27,93,.08)';
  };

  return (
    <div>
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '20px 16px' : '52px 24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr', gap: isMobile ? 24 : 60 }}>
        {/* Gallery */}
        <Reveal><div>
          <ProductImageBlock src={product.images[img]} alt={product.name} height={isMobile ? 320 : 460} radius={22} />
          <div className="fns-scroll" style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto' }}>
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`}
                style={{ border: `2px solid ${i === img ? c.navy : 'transparent'}`, borderRadius: 12, padding: 0, cursor: 'pointer', background: '#D5EBFA', flexShrink: 0 }}>
                <img src={src} alt="" style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 10, display: 'block' }} />
              </button>
            ))}
          </div>
        </div></Reveal>

        {/* Info */}
        <Reveal delay={120}><div>
          <div style={EYEBROW}>{product.badge || 'flip\u2019nsleep'}</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 28 : 42, color: c.navy, margin: '6px 0 6px', lineHeight: 1.15 }}>{product.name}</h1>
          {product.tagline && <p style={{ fontFamily: FONT_SUB, fontSize: 14.5, color: c.grayD, marginBottom: 10 }}>{product.tagline}</p>}
          <div style={{ marginBottom: 10, fontSize: 12.5, color: c.grayD }}>🌙 100-night sleep trial · 🛡️ 2-year warranty · 📦 Free shipping</div>

          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: c.navy }}>
            {formatPrice(price, symbol)}
            {compare && <s style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: 14, color: '#999', marginLeft: 8 }}>{formatPrice(compare, symbol)}</s>}
          </div>
          {compare && <div style={{ fontSize: 12.5, color: '#2e6b4f', fontWeight: 600, marginBottom: 8 }}>Save {formatPrice(compare - price, symbol)} · free shipping included</div>}
          <div style={{ margin: '10px 0 16px' }}><ShippingCountdown /></div>

          <p style={{ fontSize: 14, color: c.grayD, lineHeight: 1.7, marginBottom: 18 }}>{product.desc}</p>

          {/* Size selector */}
          <div style={{ marginBottom: hasColors ? 16 : 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.navy, letterSpacing: .4, marginBottom: 8, fontFamily: FONT_SUB }}>Size: <span style={{ color: c.grayD, fontWeight: 500 }}>{size}</span></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {product.sizes.map(s => {
                const active = s === size;
                return (
                  <button key={s} onClick={() => setSize(s)} style={{
                    border: `2px solid ${active ? c.navy : 'rgba(32,27,93,.18)'}`, background: active ? c.navy : '#fff',
                    color: active ? '#fff' : c.navy, borderRadius: 12, padding: '9px 16px', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, fontFamily: FONT_SUB, transition: 'all .12s',
                  }}>{s}</button>
                );
              })}
            </div>
          </div>

          {/* Colour selector */}
          {hasColors && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.navy, letterSpacing: .4, marginBottom: 8, fontFamily: FONT_SUB }}>Colour: <span style={{ color: c.grayD, fontWeight: 500 }}>{color}</span></div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {product.colors.map((col, i) => {
                  const hex = product.colorHex[i] || '#ccc';
                  const active = col === color;
                  return (
                    <button key={col} onClick={() => setColor(col)} aria-label={col} title={col} style={{
                      width: 34, height: 34, borderRadius: '50%', background: hex, cursor: 'pointer',
                      border: swatchBorder(hex),
                      boxShadow: active ? `0 0 0 2px #fff, 0 0 0 4px ${c.navy}` : 'none', transition: 'box-shadow .12s',
                    }} />
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA's */}
          <div style={{ display: 'flex', gap: 10, margin: '4px 0 18px', flexDirection: isMobile ? 'column' : 'row' }}>
            <button onClick={() => buyNowProduct(product.id, size, color)} disabled={!purchasable}
              style={{ ...BTN, flex: 1, textAlign: 'center', fontSize: 14, opacity: purchasable ? 1 : .5, cursor: purchasable ? 'pointer' : 'not-allowed' }}>
              {purchasable ? 'Buy now' : 'Coming soon'}
            </button>
            <button onClick={addToCart} disabled={!purchasable}
              style={{ ...BTNO, flex: 1, textAlign: 'center', opacity: purchasable ? 1 : .5, cursor: purchasable ? 'pointer' : 'not-allowed' }}>
              Add to cart
            </button>
          </div>

          <TrustAccordion specs={
            <ul style={{ listStyle: 'none' }}>{product.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>
          } />
        </div></Reveal>
      </section>

      {/* Why you'll love it: longDesc + highlights + features */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '14px 16px 30px' : '20px 24px 50px' }}>
        <Reveal><div>
          <div style={EYEBROW}>Why you'll love it</div>
          {product.longDesc.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontSize: 14, color: c.grayD, lineHeight: 1.75, margin: '10px 0 0' }}>{para}</p>
          ))}
        </div></Reveal>

        {product.highlights && (
          <Reveal delay={100}><div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14, margin: '26px 0 6px' }}>
            {product.highlights.map((h, i) => (
              <div key={i} style={{ background: c.sky, borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{h.icon}</span>
                <div>
                  <div style={{ fontFamily: FONT_SUB, fontSize: 13.5, fontWeight: 600, color: c.navy }}>{h.label}</div>
                  <div style={{ fontSize: 12, color: c.grayD }}>{h.sub}</div>
                </div>
              </div>
            ))}
          </div></Reveal>
        )}

        <Reveal delay={140}><div style={{ marginTop: 24 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 22 : 26, color: c.navy, marginBottom: 12 }}>What's inside</h2>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px 24px' }}>
            {product.features.map((f, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.6, color: c.grayD }}>
                <span style={{ color: c.amberD, flexShrink: 0 }}>✓</span>{f}
              </li>
            ))}
          </ul>
        </div></Reveal>
      </section>

      {/* Pairing / cross-sell */}
      {others.length > 0 && (
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '0 16px 34px' : '0 24px 50px' }}>
          <Reveal><h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 22 : 26, color: c.navy, textAlign: 'center', marginBottom: 18 }}>Complete your <span style={{ fontFamily: FONT_SUB }}>bed</span></h2></Reveal>
          <Reveal delay={100}><div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
            {others.map(o => {
              const op = getPrice(o, isCA);
              return (
                <Link key={o.id} to={`/product/${o.id}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 10px 26px rgba(32,27,93,.10)', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: isMobile ? 110 : 140, flexShrink: 0 }}><ProductImageBlock src={o.images[0]} alt={o.name} height={isMobile ? 110 : 130} radius={0} /></div>
                  <div style={{ padding: '12px 14px 12px 0' }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, color: c.navy, marginBottom: 3 }}>{o.name}</div>
                    <div style={{ fontSize: 12, color: c.grayD, marginBottom: 6, lineHeight: 1.45 }}>{o.tagline}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: c.navy }}>From {formatPrice(op, symbol)}</div>
                  </div>
                </Link>
              );
            })}
          </div></Reveal>
        </section>
      )}

      <ReviewsBlock />
      <section style={{ padding: isMobile ? '30px 22px 40px' : '40px 40px 60px' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: c.navy, textAlign: 'center', marginBottom: 12 }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h2>
        <FAQBlock limit={5} />
      </section>
    </div>
  );
}
