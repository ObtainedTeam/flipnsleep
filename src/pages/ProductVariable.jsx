import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { c, BTN, rv, FONT_DISPLAY, T, LH, SP, W } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { productById } from '../data';
import { CartContext } from '../components/Cart';
import { buyNowProduct, isProductPurchasable } from '../shopify';
import { trackAddToCart, trackViewContent } from '../track';
import StickyBuyBar from '../components/StickyBuyBar';
import { TrustAccordion, ShippingCountdown } from '../components/Blocks';
import { NightBand } from '../components/Sky';
import { FAQSection } from '../components/Sections';
import { useReviews, Crumbs, Gallery, GalleryReview, BuyTrust, SpecList, ExplainAccordion, SplitImages, HotSleeperStats, ProductReviews, CompleteYourBed } from '../components/product/ProductSections';
import { VARIANT_SPLIT, VARIANT_STATS, VARIANT_EXAMPLE_REVIEWS, variantAccordion } from '../data/product-content.js';

// Productpagina voor de variantproducten (maat + kleur). Zelfde bouwstenen en
// wolk-achtergronden als de kussenpagina, gevoed uit products[] in data.js.
export default function ProductVariable({ onCartOpen }) {
  const { symbol, isCA } = useCurrency();
  const { id } = useParams();
  const product = productById(id);

  const [size, setSize] = useState(product ? product.sizes[0] : null);
  const [color, setColor] = useState(product ? product.colors[0] : null);
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

  const specs = product.sizeInfo ? [['Dimensions and weight', product.sizeInfo[size]], ...product.specs] : product.specs;

  return (
    <div>
      <div className="sk-wrap">
        <Crumbs name={product.name} />
        <section className="pd-top">
          <div className="pd-sticky">
            <Gallery key={product.id} images={product.images.map((src, i) => ({ src, alt: `${product.name}, photo ${i + 1}` }))} />
            <GalleryReview rvw={rvw} productName={product.name} />
          </div>

          <div className="pd-buy">
            <h1 className="sk-h1">{product.name}</h1>
            <p className="sk-lead">{product.desc}</p>

            <div className="pd-price">
              <b>{formatPrice(price, symbol)}</b>
              {compare && <s>{formatPrice(compare, symbol)}</s>}
              {compare && <span>Save {formatPrice(compare - price, symbol)}</span>}
            </div>

            <div style={{ margin: '24px 0 20px' }}>
              <div className="pd-label">Size: <span>{size}</span></div>
              <div className="pd-chips" role="group" aria-label="Size">
                {product.sizes.map(s => <button key={s} type="button" className="pd-chip" aria-pressed={s === size} onClick={() => setSize(s)}>{s}</button>)}
              </div>
              {product.sizeInfo && <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 12 }}>{product.sizeInfo[size]}</div>}
            </div>

            {hasColors && (
              <div style={{ marginBottom: 24 }}>
                <div className="pd-label">Colour: <span>{color}</span></div>
                <div className="pd-chips" role="group" aria-label="Colour" style={{ gap: 12 }}>
                  {product.colors.map((col, i) => (
                    <button key={col} type="button" className="pd-swatch" aria-pressed={col === color} aria-label={col} title={col} onClick={() => setColor(col)} style={{ background: product.colorHex[i] || c.gray }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={buyRef} className="pd-cta">
              <button type="button" className="sk-btn" onClick={addToCart} disabled={!purchasable}>{purchasable ? 'Add to cart' : 'Coming soon'}</button>
              <button type="button" className="sk-btn is-line" onClick={() => buyNowProduct(product.id, size, color)} disabled={!purchasable}>Buy now</button>
            </div>
            <ShippingCountdown />
            <BuyTrust />
            <TrustAccordion specs={<SpecList specs={specs} />} />
          </div>
        </section>
      </div>

      <SplitImages items={split} />

      <ExplainAccordion title={product.tagline.replace(/\.$/, '')} chips={product.highlights} items={variantAccordion(product)} />

      <HotSleeperStats stats={VARIANT_STATS}
        text="Built for people who sleep warm, in breathable materials that don't trap heat. Try it at home with free shipping and plenty of time to decide." />

      <NightBand strip={examples.length > 0} title="Try it for 100 nights," accent="risk-free"
        text="Free shipping across the US and Canada. Not for you? Send it back for free and get a full refund."
        cta={purchasable ? { label: 'Add to cart', onClick: addToCart } : null} />

      {examples.length > 0 && <ProductReviews noTop rvw={rvw} productName={product.name} examples={examples} />}

      <FAQSection items={product.faq || undefined} limit={0} more={false} />

      <CompleteYourBed current={product.id} />

      <StickyBuyBar targetRef={buyRef} name={product.name} price={`${formatPrice(price, symbol)}, ${size}${hasColors ? `, ${color}` : ''}`} onAdd={addToCart} disabled={!purchasable} label={purchasable ? 'Add to cart' : 'Coming soon'} />
    </div>
  );
}
