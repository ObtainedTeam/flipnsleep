import { Link } from 'react-router-dom';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { BUNDLES, PRODUCT, products, IMG, dim, rs } from '../data';
import Reveal from '../components/Reveal';
import { Cloud, Ico, PageHead, NightBand } from '../components/Sky';
import { TrustRow } from '../components/Sections';

// Shop: de twee kussenbundels groot bovenaan, daaronder de rest van het assortiment.
export default function Shop() {
  const { symbol, isCA } = useCurrency();

  return (
    <div>
      <PageHead title="Shop the flip'nsleep range" intro="Buy one, get one free on the Signature Cold Pillow. Free shipping across the US and Canada." />

      <section id="bundles" className="sk-sec" style={{ scrollMarginTop: 96, paddingTop: 32 }}><div className="sk-wrap">
        <div className="sk-head">
          <h2 className="sk-h2">Pick your bundle</h2>
          <p className="sk-lead">Every order is a set: that's our buy-one-get-one-free promise. Choose two pillows or four, always with free shipping and a 100-night trial.</p>
        </div>
        <div className="sk-grid is-2">
          {BUNDLES.map((b, i) => {
            const p = getPrice(b, isCA);
            const cm = isCA ? b.compareAt.cad : b.compareAt.usd;
            const img = { src: IMG.coverDuo, ...dim(IMG.coverDuo), ...rs(IMG.coverDuo, '(max-width: 699px) 60vw, 340px'), decoding: 'async' };
            return (
              <Reveal key={b.id} once delay={i * 100}><Link to={`/product/${PRODUCT.id}?bundle=${b.id}`} className="sk-pc is-wide">
                <div className="sk-pc-img">
                  <span className="sk-tag">{b.pillows === 2 ? 'Buy 1, get 1 free' : 'Buy 2, get 2 free'}</span>
                  <Cloud className="is-a" /><Cloud className="is-b" />
                  <img className={`is-cut${b.pillows === 4 ? ' is-two' : ''}`} {...img} fetchPriority={i === 0 ? 'high' : undefined} alt={`${b.pillows} Signature Cold Pillows`} />
                  {b.pillows === 4 && <img className="is-cut is-two" {...img} alt="" />}
                </div>
                <b>{b.pillows} pillows</b>
                <span className="is-desc">{b.blurb}</span>
                <div className="sk-pc-foot">
                  <span className="sk-price">{formatPrice(p, symbol)}<s>{formatPrice(cm, symbol)}</s><span style={{ fontWeight: 400, fontSize: 15, color: 'var(--ink-2)', marginLeft: 10 }}>{formatPrice(p / b.pillows, symbol)} a pillow</span></span>
                  <span className="sk-go" aria-hidden="true"><Ico name="right" /></span>
                </div>
              </Link></Reveal>
            );
          })}
        </div>
        <TrustRow />
      </div></section>

      <section className="sk-sec" style={{ paddingTop: 0 }}><div className="sk-wrap">
        <div className="sk-head">
          <h2 className="sk-h2">More for your bed</h2>
          <p className="sk-lead">Cooling bedding built on the same idea as the pillow: stay comfortable without trapping heat.</p>
        </div>
        <div className="sk-grid is-3">
          {products.map((prod, i) => {
            const p = getPrice(prod, isCA);
            const cm = prod.compareAt ? (isCA ? prod.compareAt.cad : prod.compareAt.usd) : null;
            return (
              <Reveal key={prod.id} once delay={i * 80}><Link to={`/product/${prod.id}`} className="sk-pc">
                <div className="sk-pc-img"><img className="is-ph" src={prod.images[0]} {...dim(prod.images[0])} loading="lazy" decoding="async" alt={prod.name} /></div>
                <b>{prod.name}</b>
                <span className="is-desc">{prod.tagline}</span>
                <div className="sk-pc-foot">
                  <span className="sk-price">From {formatPrice(p, symbol)}{cm && <s>{formatPrice(cm, symbol)}</s>}</span>
                  <span className="sk-go" aria-hidden="true"><Ico name="right" /></span>
                </div>
              </Link></Reveal>
            );
          })}
        </div>
      </div></section>

      <NightBand title="Your coolest night" accent="starts tonight"
        text="Try it for 100 nights, risk-free. Not sleeping cooler? Ship it back for free and get a full refund."
        cta={{ label: 'Shop the pillow', to: `/product/${PRODUCT.id}` }} />
    </div>
  );
}
