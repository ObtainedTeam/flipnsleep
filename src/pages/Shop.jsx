import { Link } from 'react-router-dom';
import { c, BTN, BTN_SM, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, T, LH, SP, W, CARD, CHIP } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { BUNDLES, PRODUCT, products, dim } from '../data';
import { ProductImageBlock } from '../components/Blocks';
import Reveal from '../components/Reveal';


export default function Shop() {
  const { symbol, isCA } = useCurrency();

  return (
    <div>
      <section className="r-pad" style={{ textAlign: 'center', ...rv('pad', ...SP.sectionTop) }}>
        <div style={EYEBROW}>Shop</div>
        <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), lineHeight: LH.tight, color: c.navy, margin: '8px 0 16px' }}>Pick your bundle</h1>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto' }}>
          Every order is a set, that's our buy-one-get-one-free promise. Choose two pillows or four, always with free shipping and a 100-night trial.
        </p>
      </section>

      <section className="grid-2m1 r-gap r-mw r-mar r-pad" style={{ ...rv('gap', ...SP.gap), ...rv('mw', W.page, W.narrow), ...rv('mar', '40px auto 0', '32px auto 0'), ...rv('pad', `0 ${SP.gutter[0]}px`, `0 ${SP.gutter[1]}px`) }}>
        {BUNDLES.map(b => {
          const p = getPrice(b, isCA);
          const cm = isCA ? b.compareAt.cad : b.compareAt.usd;
          return (
            <Reveal key={b.id} delay={BUNDLES.indexOf(b) * 130}><Link to="/product/signature-cold-pillow" className="card-hover" style={{ textDecoration: 'none', ...CARD, overflow: 'hidden', display: 'block', height: '100%' }}>
              <div style={{ position: 'relative' }}>
                <ProductImageBlock src={b.image} alt={b.label} height={[280, 210]} radius={0} priority={b.id === BUNDLES[0].id} />
                <span style={{ ...CHIP, position: 'absolute', top: 16, left: 16, background: c.amber, color: c.navy }}>{b.short}</span>
              </div>
              <div className="r-pad" style={rv('pad', ...SP.card)}>
                <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 6 }}>{PRODUCT.name}: {b.short}</h2>
                <div style={{ fontFamily: FONT_SUB, fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD, marginBottom: 10 }}>{b.label}. {b.blurb}</div>
                <div className="r-fs" style={{ ...rv('fs', ...T.lg), fontWeight: 700, color: c.navy }}>{formatPrice(p, symbol)} <s style={{ fontWeight: 400, color: c.gray, fontSize: T.sm[0] }}>{formatPrice(cm, symbol)}</s></div>
                <div style={{ fontSize: T.xs[0], color: c.purple, fontWeight: 600, marginTop: 4 }}>{formatPrice(p / b.pillows, symbol)} per pillow · free shipping</div>
                <span style={{ ...BTN, marginTop: 20 }}>View deal</span>
              </div>
            </Link></Reveal>
          );
        })}
      </section>

      {/* De volledige flip'nsleep-range: deken, lakens, comforter */}
      <section className="r-pad" style={rv('pad', ...SP.section)}>
        <Reveal><div style={{ textAlign: 'center' }}>
          <div style={EYEBROW}>More for your bed</div>
          <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, margin: '8px 0 12px' }}>The full <span style={{ fontFamily: FONT_SUB }}>flip'nsleep</span> range</h2>
          <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, maxWidth: W.narrow, margin: '0 auto' }}>Cooling bedding built on the same idea as the pillow: stay comfortable without trapping heat.</p>
        </div></Reveal>

        <div className="grid-3m1 r-gap r-mar" style={{ ...rv('gap', ...SP.gap), maxWidth: W.page, ...rv('mar', '40px auto 0', '28px auto 0') }}>
          {products.map((prod, idx) => {
            const p = getPrice(prod, isCA);
            const cm = prod.compareAt ? (isCA ? prod.compareAt.cad : prod.compareAt.usd) : null;
            return (
              <Reveal key={prod.id} delay={idx * 120}><Link to={`/product/${prod.id}`} className="card-hover" style={{ textDecoration: 'none', ...CARD, overflow: 'hidden', display: 'block', height: '100%' }}>
                <div className="r-h" style={{ position: 'relative', ...rv('h', 240, 220), background: c.cream, overflow: 'hidden' }}>
                  <img src={prod.images[0]} {...dim(prod.images[0])} loading="lazy" decoding="async" alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {prod.badge && <span style={{ ...CHIP, position: 'absolute', top: 16, left: 16, background: c.amber, color: c.navy }}>{prod.badge}</span>}
                </div>
                <div className="r-pad" style={rv('pad', ...SP.card)}>
                  <h3 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy, marginBottom: 6 }}>{prod.name}</h3>
                  <div style={{ fontSize: T.sm[0], color: c.grayD, marginBottom: 10, lineHeight: LH.body }}>{prod.tagline}</div>
                  <div className="r-fs" style={{ ...rv('fs', ...T.md), fontWeight: 700, color: c.navy }}>From {formatPrice(p, symbol)} {cm && <s style={{ fontWeight: 400, color: c.gray, fontSize: T.xs[0] }}>{formatPrice(cm, symbol)}</s>}</div>
                  <div style={{ fontSize: T.xs[0], color: c.purple, fontWeight: 600, marginTop: 4 }}>Free shipping · 100-night trial</div>
                  <span style={{ ...BTN_SM, marginTop: 16 }}>View product</span>
                </div>
              </Link></Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
