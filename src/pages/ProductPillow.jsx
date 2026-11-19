import { useState, useEffect, useRef } from 'react';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow } from '../shopify';
import { trackAddToCart, trackViewContent } from '../track';
import PillowQuiz from '../components/PillowQuiz';
import { TrustAccordion, ShippingCountdown } from '../components/Blocks';
import StickyBuyBar from '../components/StickyBuyBar';
import LookInside from '../components/product/LookInside.jsx';
import { CloudList, NightBand } from '../components/Sky';
import { FlipBand, Special, Steps3, CompareBand, FAQSection } from '../components/Sections';
import { useReviews, Crumbs, Gallery, GalleryReview, BuyTrust, SpecList, ProductReviews, CompleteYourBed } from '../components/product/ProductSections';
import { EXAMPLE_REVIEWS } from '../data/product-content.js';

// Kussenpagina volgens het redesign: galerij en koopblok, daarna dezelfde
// secties als op home (flip, special, lagen, stappen, vergelijking, nachtband,
// reviews, vragen). Echte Judge.me-reviews tonen sterren; voorbeelden nooit.
const GALLERY = PRODUCT.gallery.map(([src, alt]) => ({ src, alt, thumb: src.replace('.webp', '-480.webp') }));

export default function ProductPillow({ onCartOpen }) {
  const { symbol, isCA } = useCurrency();
  const [selected, setSelected] = useState('1p1');
  const buyRef = useRef(null);
  useEffect(() => { trackViewContent({ content_type: 'product', content_name: 'flipnsleep-pillow' }); }, []);
  const rvw = useReviews();
  const hasReviews = !!(rvw && rvw.count > 0);
  const bundle = BUNDLES.find(b => b.id === selected);
  const price = getPrice(bundle, isCA);
  const compare = isCA ? bundle.compareAt.cad : bundle.compareAt.usd;
  const perPillow = price / bundle.pillows;
  const dealPrice = getPrice(BUNDLES[0], isCA);

  const addToCart = () => {
    trackAddToCart({ content_type: 'product', content_name: 'flipnsleep-pillow', contents: [{ id: selected, quantity: 1 }] });
    CartContext.add(selected, 1);
    onCartOpen && onCartOpen();
  };

  return (
    <div>
      <div className="sk-wrap">
        <Crumbs name={PRODUCT.name} />
        <section className="pd-top">
          <div className="pd-sticky">
            <Gallery images={GALLERY} />
            <GalleryReview rvw={rvw} productName={PRODUCT.name} />
          </div>

          <div className="pd-buy">
            <h1 className="sk-h1">{PRODUCT.name}</h1>
            {hasReviews && (
              <a href="#reviews" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 12, fontSize: 15, color: 'var(--ink-2)', textDecoration: 'none' }}>
                <span className="sk-stars" aria-label={`${rvw.avg} out of 5 stars`}>{'★'.repeat(Math.round(rvw.avg))}{'☆'.repeat(5 - Math.round(rvw.avg))}</span>
                {rvw.avg} from {rvw.count} verified review{rvw.count === 1 ? '' : 's'}
              </a>
            )}
            <p className="sk-lead">{PRODUCT.desc}</p>

            <div className="pd-price"><b>{formatPrice(price, symbol)}</b><s>{formatPrice(compare, symbol)}</s><span>{formatPrice(perPillow, symbol)} a pillow</span></div>

            <fieldset className="pd-opts">
              <legend className="sr-only">Choose your bundle</legend>
              {BUNDLES.map(b => {
                const p = getPrice(b, isCA);
                return (
                  <label key={b.id} className="pd-opt">
                    <input type="radio" name="bundle" value={b.id} checked={selected === b.id} onChange={() => setSelected(b.id)} />
                    <span><b>{b.pillows} pillows</b><small>{b.pillows === 2 ? 'Buy one, get one free' : 'Buy two, get two free'}. {b.blurb}</small></span>
                    <span className="is-p">{formatPrice(p, symbol)}<small>{formatPrice(p / b.pillows, symbol)} each</small></span>
                  </label>
                );
              })}
            </fieldset>

            <div ref={buyRef} className="pd-cta">
              <button type="button" className="sk-btn" onClick={addToCart}>Add to cart</button>
              <button type="button" className="sk-btn is-line" onClick={() => buyNow(selected)}>Buy now</button>
            </div>
            <ShippingCountdown />
            <BuyTrust />
            <CloudList small items={PRODUCT.usps} />
            <TrustAccordion specs={<SpecList specs={PRODUCT.specs} />} />
          </div>
        </section>
      </div>

      <FlipBand />
      <Special cta={{ label: 'Add to cart', onClick: addToCart }} />

      {/* Look inside: de scroll-gestuurde doorsnede, laag voor laag */}
      <LookInside />

      <Steps3 />

      {/* Filling finder: vier vragen, een advies in handjes schuim */}
      <PillowQuiz />

      <CompareBand />

      <NightBand id="offer" strip title="Sleep cooler tonight," accent="or your money back"
        text={`Two pillows for ${formatPrice(dealPrice, symbol)}, with free shipping. Sleep on it for 100 nights. Not sleeping cooler? We refund you in full, with free return shipping.`}
        cta={{ label: 'Add to cart', onClick: addToCart }} />

      <ProductReviews noTop rvw={rvw} productName={PRODUCT.name} examples={EXAMPLE_REVIEWS} />

      <FAQSection limit={8} />

      <CompleteYourBed current={PRODUCT.id} />

      <StickyBuyBar targetRef={buyRef} name="Signature Cold Pillow" price={`${formatPrice(price, symbol)} for ${bundle.pillows} pillows`} onAdd={addToCart} />
    </div>
  );
}
