import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { PRODUCT, BUNDLES, SINGLE, GIFTS } from '../data';
import { CartContext } from '../components/Cart';
import { buyNow, singlePillowLive, giftsLive } from '../shopify';
import { trackAddToCart, trackViewContent } from '../track';
import PillowQuiz from '../components/PillowQuiz';
import { TrustAccordion, ShippingCountdown } from '../components/Blocks';
import StickyBuyBar from '../components/StickyBuyBar';
import LookInside from '../components/product/LookInside.jsx';
import { CloudList, NightBand, Ico, Cloud } from '../components/Sky';
import { FlipBand, Special, Steps3, CompareBand, FAQSection } from '../components/Sections';
import { ReviewWallProduct } from '../components/ReviewWall';
import { useReviews, Crumbs, Gallery, GalleryReview, BuyTrust, SpecList, CompleteYourBed } from '../components/product/ProductSections';

// Kussenpagina. Volgorde: koopblok, reviews (video en tekst), Just flip it,
// Ready in 3 steps, de doorsnede met What makes it special, daarna de vulling-
// quiz, de vergelijking, de nachtband, vragen en de rest van het assortiment.
const GALLERY = PRODUCT.gallery.map(([src, alt]) => ({ src, alt, thumb: src.replace('.webp', '-480.webp') }));
// Deal-label in de hoek van de keuzes met meer dan één kussen.
const DEAL = { 2: 'Buy 1, get 1 free', 4: 'Buy 2, get 2 free' };

export default function ProductPillow({ onCartOpen }) {
  const { symbol, isCA } = useCurrency();
  const [params] = useSearchParams();
  const [selected, setSelected] = useState('1p1'); // 2 pillows staat standaard aan
  const [single, setSingle] = useState(false);
  const [gifts, setGifts] = useState(false);
  const buyRef = useRef(null);
  useEffect(() => { trackViewContent({ content_type: 'product', content_name: 'flipnsleep-pillow' }); }, []);
  // Opties die van Shopify afhangen pas na het laden bepalen (SSR toont de vaste twee).
  useEffect(() => { setSingle(singlePillowLive()); setGifts(giftsLive()); }, []);
  const options = single ? [SINGLE, ...BUNDLES] : BUNDLES;
  // ?bundle=1p1 of ?bundle=2p2 (vanaf de homepage en het menu) kiest de optie vooraf.
  const wanted = params.get('bundle');
  useEffect(() => { if (wanted && options.some(o => o.id === wanted)) setSelected(wanted); }, [wanted, single]); // eslint-disable-line react-hooks/exhaustive-deps

  const rvw = useReviews();
  const hasReviews = !!(rvw && rvw.count > 0);
  const bundle = options.find(b => b.id === selected) || BUNDLES[0];
  const price = getPrice(bundle, isCA);
  const compare = isCA ? bundle.compareAt.cad : bundle.compareAt.usd;
  const dealPrice = getPrice(BUNDLES[0], isCA);

  const addToCart = () => {
    trackAddToCart({ content_type: 'product', content_name: 'flipnsleep-pillow', contents: [{ id: bundle.id, quantity: 1 }] });
    CartContext.add(bundle.id, 1);
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
            <CloudList small items={PRODUCT.usps} style={{ marginTop: 20 }} />

            <div className="pd-price"><b>{formatPrice(price, symbol)}</b><s>{formatPrice(compare, symbol)}</s>{bundle.pillows > 1 && <span>{formatPrice(price / bundle.pillows, symbol)} a pillow</span>}</div>

            <fieldset className="pd-opts">
              <legend className="sr-only">Choose how many pillows</legend>
              {options.map(b => {
                const p = getPrice(b, isCA);
                return (
                  <label key={b.id} className="pd-opt">
                    {DEAL[b.pillows] && <span className="pd-deal"><Cloud />{DEAL[b.pillows]}</span>}
                    <input type="radio" name="bundle" value={b.id} checked={bundle.id === b.id} onChange={() => setSelected(b.id)} />
                    <span><b>{b.pillows} pillow{b.pillows === 1 ? '' : 's'}</b><small>{b.blurb}</small></span>
                    <span className="is-p">{formatPrice(p, symbol)}<small>{b.pillows === 1 ? <s>{formatPrice(isCA ? b.compareAt.cad : b.compareAt.usd, symbol)}</s> : `${formatPrice(p / b.pillows, symbol)} each`}</small></span>
                  </label>
                );
              })}
            </fieldset>

            {gifts && (
              <div className="pd-gifts">
                <h3>Free gifts included</h3>
                <ul>
                  {GIFTS.map(g => {
                    const n = g.perPillow ? bundle.pillows : 1;
                    return (
                      <li key={g.id}>
                        <span className="is-ico"><Ico name={g.icon} /></span>
                        <span><b>{n > 1 ? `${n} × ${g.name}` : g.name}</b><small>{g.note}</small></span>
                        <span className="is-val"><s>value {formatPrice((isCA ? g.value.cad : g.value.usd) * n, symbol)}</s><b>Free</b></span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div ref={buyRef} className="pd-cta">
              <button type="button" className="sk-btn" onClick={addToCart}>Add to cart</button>
              <button type="button" className="sk-btn is-line" onClick={() => buyNow(bundle.id)}>Buy now</button>
            </div>
            <ShippingCountdown />
            <BuyTrust />
            <p className="pd-claim">Fewer than 0.5% of orders ever claim our money-back guarantee.</p>
            <p className="pd-desc">{PRODUCT.desc}</p>
            <TrustAccordion specs={<SpecList specs={PRODUCT.specs} />} />
          </div>
        </section>
      </div>

      <ReviewWallProduct productName={PRODUCT.name} />

      <FlipBand />
      <Steps3 />

      {/* Look inside: de scroll-gestuurde doorsnede, laag voor laag */}
      <LookInside />
      <Special cta={{ label: 'Add to cart', onClick: addToCart }} />

      {/* Filling finder: vier vragen, een advies in handjes schuim */}
      <PillowQuiz />

      <CompareBand />

      <NightBand id="offer" bottom="ink" title="Sleep cooler tonight," accent="or your money back"
        text={`Two pillows for ${formatPrice(dealPrice, symbol)}, with free shipping. Sleep on it for 100 nights. Not sleeping cooler? We refund you in full, with free return shipping.`}
        cta={{ label: 'Add to cart', onClick: addToCart }} />

      <FAQSection limit={8} />

      <CompleteYourBed current={PRODUCT.id} />

      <StickyBuyBar targetRef={buyRef} name="Signature Cold Pillow" price={`${formatPrice(price, symbol)} for ${bundle.pillows} pillow${bundle.pillows === 1 ? '' : 's'}`} onAdd={addToCart} />
    </div>
  );
}
