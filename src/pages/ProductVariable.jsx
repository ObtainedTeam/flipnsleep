import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { c, BTN, BTNO, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W, CARD } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { productById, dim } from '../data';
import { CartContext } from '../components/Cart';
import { buyNowProduct, isProductPurchasable } from '../shopify';
import { trackAddToCart, trackViewContent } from '../track';
import Reveal from '../components/Reveal';
import StickyBuyBar from '../components/StickyBuyBar';
import { TrustAccordion, FAQBlock, ShippingCountdown } from '../components/Blocks';
import { useReviews, GalleryReview, ExplainAccordion, SplitImages, HotSleeperStats, ProductReviews, CompleteYourBed } from '../components/product/ProductSections';
import { VARIANT_SPLIT, VARIANT_STATS, VARIANT_EXAMPLE_REVIEWS, variantAccordion, completeYourBed } from '../data/product-content.js';

// Productpagina voor de variantproducten (maat + kleur). Zelfde bouwstenen en
// wolk-achtergronden als de kussenpagina, gevoed uit products[] in data.js.
export default function ProductVariable({ onCartOpen }) {
  const { symbol, isCA } = useCurrency();
  const { id } = useParams();
  const product = productById(id);

  const [size, setSize] = useState(product ? product.sizes[0] : null);
  const [color, setColor] = useState(product ? product.colors[0] : null);
  const [img, setImg] = useState(0);
  const buyRef = useRef(null);
  const rvw = useReviews();

  useEffect(() => {
    if (product) trackViewContent({ content_type: 'product', content_name: product.id });
  }, [product && product.id]);

  if (!product) {
    return (
      <section className="r-pad" style={{ maxWidth: W.narrow, margin: '0 auto', ...rv('pad', ...SP.section), textAlign: 'center' }}>
        <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), lineHeight: LH.head, color: c.navy, marginBottom: 24 }}>Product not found</h1>
        <Link to="/shop" style={BTN}>Back to shop</Link>
      </section>
    );
  }

  const price = getPrice(product, isCA);
  const compare = product.compareAt ? (isCA ? product.compareAt.cad : product.compareAt.usd) : null;
  const purchasable = isProductPurchasable(product.id, size, color);
  const hasColors = product.colors.length > 1;
  const examples = VARIANT_EXAMPLE_REVIEWS[product.id] || [];
  const split = VARIANT_SPLIT[product.id] || product.images.slice(1, 3).map((image) => ({ image, caption: product.tagline, fit: 'cover' }));

  const addToCart = () => {
    if (!purchasable) return;
    trackAddToCart({ content_type: 'product', content_name: product.id, contents: [{ size, color, quantity: 1 }] });
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
      <section className="r-pad r-cols r-gap pd-top" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', '48px 40px 56px', '24px 20px 40px'), display: 'grid', ...rv('cols', 'minmax(0, 1.05fr) minmax(0, 1fr)', 'minmax(0, 1fr)'), ...rv('gap', 56, 24) }}>
        {/* Gallery: sticky op desktop tot het eind van de koopsectie */}
        <div className="pd-sticky"><Reveal><div>
          <div className="r-h" style={{ background: c.cream, borderRadius: R.lg, boxShadow: SH.card, overflow: 'hidden', ...rv('h', 460, 320) }}>
            <img src={product.images[img]} {...dim(product.images[img])} fetchPriority="high" decoding="async" alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div className="thumbs">
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`}
                style={{ border: `2px solid ${i === img ? c.navy : 'transparent'}`, borderRadius: R.sm, padding: 0, cursor: 'pointer', background: c.cream, flexShrink: 0, overflow: 'hidden' }}>
                <img src={src} {...dim(src)} loading="lazy" decoding="async" alt="" style={{ width: 64, height: 64, objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>
          {examples[0] && <GalleryReview rvw={rvw} productName={product.name} example={examples[0]} />}
        </div></Reveal></div>

        {/* Info */}
        <Reveal delay={120}><div>
          <div style={EYEBROW}>{product.badge || 'flip\u2019nsleep'}</div>
          <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), color: c.navy, margin: '8px 0 8px', lineHeight: LH.tight }}>{product.name}</h1>
          {product.tagline && <p className="r-fs" style={{ fontFamily: FONT_SUB, ...rv('fs', ...T.lg), lineHeight: LH.head, color: c.grayD, marginBottom: 12 }}>{product.tagline}</p>}

          <div className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h3), color: c.navy }}>
            {formatPrice(price, symbol)}
            {compare && <s style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 400, fontSize: T.sm[0], color: c.gray, marginLeft: 8 }}>{formatPrice(compare, symbol)}</s>}
          </div>
          {compare && <div style={{ fontSize: T.sm[0], color: c.purple, fontWeight: 600, marginBottom: 8 }}>Save {formatPrice(compare - price, symbol)}</div>}
          <div style={{ margin: '12px 0 16px' }}><ShippingCountdown /></div>

          <p className="r-fs" style={{ ...rv('fs', ...T.md), color: c.grayD, lineHeight: LH.body, marginBottom: 20 }}>{product.desc}</p>

          {/* Size selector */}
          <div style={{ marginBottom: hasColors ? 16 : 20 }}>
            <div style={{ fontSize: T.xs[0], fontWeight: 700, color: c.navy, letterSpacing: .4, marginBottom: 8, fontFamily: FONT_SUB }}>Size: <span style={{ color: c.grayD, fontWeight: 500 }}>{size}</span></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {product.sizes.map(s => {
                const active = s === size;
                return (
                  <button key={s} onClick={() => setSize(s)} style={{
                    border: `2px solid ${active ? c.navy : 'rgba(32,27,93,.18)'}`, background: active ? c.navy : c.white,
                    color: active ? c.white : c.navy, borderRadius: R.sm, padding: '10px 16px', cursor: 'pointer',
                    fontSize: T.sm[0], fontWeight: 600, fontFamily: FONT_SUB, transition: 'all .12s',
                  }}>{s}</button>
                );
              })}
            </div>
            {product.sizeInfo && <div style={{ fontSize: T.sm[0], color: c.grayD, marginTop: 12, fontFamily: FONT_SUB }}>{product.sizeInfo[size]}</div>}
          </div>

          {/* Colour selector */}
          {hasColors && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: T.xs[0], fontWeight: 700, color: c.navy, letterSpacing: .4, marginBottom: 8, fontFamily: FONT_SUB }}>Colour: <span style={{ color: c.grayD, fontWeight: 500 }}>{color}</span></div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {product.colors.map((col, i) => {
                  const hex = product.colorHex[i] || c.gray;
                  const active = col === color;
                  return (
                    <button key={col} onClick={() => setColor(col)} aria-label={col} title={col} style={{
                      width: 34, height: 34, borderRadius: R.pill, background: hex, cursor: 'pointer',
                      border: swatchBorder(hex),
                      outline: active ? `2px solid ${c.navy}` : 'none', outlineOffset: 2, transition: 'outline-color .12s',
                    }} />
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA's: Add to cart primair, Buy now secundair */}
          <div ref={buyRef} className="row-m-col" style={{ display: 'flex', gap: 12, margin: '4px 0 20px' }}>
            <button onClick={addToCart} disabled={!purchasable}
              style={{ ...BTN, flex: '1.4 0 auto', opacity: purchasable ? 1 : .5, cursor: purchasable ? 'pointer' : 'not-allowed' }}>
              {purchasable ? 'Add to cart' : 'Coming soon'}
            </button>
            <button onClick={() => buyNowProduct(product.id, size, color)} disabled={!purchasable}
              style={{ ...BTNO, flex: '1 0 auto', opacity: purchasable ? 1 : .5, cursor: purchasable ? 'pointer' : 'not-allowed' }}>
              Buy now
            </button>
          </div>

          <TrustAccordion specs={
            <ul style={{ listStyle: 'none' }}>{product.sizeInfo && <li style={{ marginBottom: 5 }}><b>Dimensions &amp; weight:</b> {product.sizeInfo[size]}</li>}{product.specs.map(([k, v], i) => <li key={i} style={{ marginBottom: 5 }}><b>{k}:</b> {v}</li>)}</ul>
          } />
        </div></Reveal>
      </section>

      {/* Uitleg als accordeon */}
      <ExplainAccordion eyebrow="Why you'll love it" title={product.tagline}
        chips={product.highlights} items={variantAccordion(product)} />

      <SplitImages items={split} />

      <HotSleeperStats stats={VARIANT_STATS}
        text="Built for people who sleep warm, in breathable materials that don't trap heat. Try it at home with free shipping and plenty of time to decide." />

      {examples.length > 0 && <ProductReviews rvw={rvw} productName={product.name} examples={examples} />}

      <section className="r-pad" style={rv('pad', ...SP.section)}>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, textAlign: 'center', marginBottom: 24 }}>Questions? <span style={{ fontFamily: FONT_SUB }}>Answered.</span></h2>
        <FAQBlock items={product.faq || undefined} />
      </section>

      <CompleteYourBed items={completeYourBed(product.id)} />

      <StickyBuyBar targetRef={buyRef} name={product.name} price={`${formatPrice(price, symbol)}${hasColors ? ` · ${size}, ${color}` : ` · ${size}`}`} onAdd={addToCart} disabled={!purchasable} label={purchasable ? 'Add to cart' : 'Coming soon'} />
    </div>
  );
}
