import { Link } from 'react-router-dom';
import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { BUNDLES, PRODUCT, products } from '../data';
import { EmailCapture, ProductImageBlock } from '../components/Blocks';
import Reveal from '../components/Reveal';


export default function Shop() {
  const isMobile = useIsMobile();
  const { symbol, isCA } = useCurrency();

  return (
    <div>
      <section style={{ textAlign: 'center', padding: isMobile ? '36px 20px 10px' : '54px 40px 16px' }}>
        <div style={EYEBROW}>Shop</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 30 : 48, color: c.navy, margin: '8px 0 12px' }}>Pick your bundle</h1>
        <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 420, margin: '0 auto' }}>
          Every order is a set — that's our buy-one-get-one-free promise. Choose two pillows or four, always with free shipping and a 100-night trial.
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 22 : 30, maxWidth: isMobile ? 860 : 1040, margin: isMobile ? '26px auto 0' : '36px auto 0', padding: '0 20px' }}>
        {BUNDLES.map(b => {
          const p = getPrice(b, isCA);
          const cm = isCA ? b.compareAt.cad : b.compareAt.usd;
          return (
            <Reveal key={b.id} delay={BUNDLES.indexOf(b) * 130}><Link to="/product/signature-cold-pillow" style={{ textDecoration: 'none', background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 12px 30px rgba(32,27,93,.10)', display: 'block' }}>
              <div style={{ position: 'relative' }}>
                <ProductImageBlock src={b.image} alt={b.label} height={isMobile ? 210 : 280} radius={0} />
                <span style={{ position: 'absolute', top: 14, left: 14, background: c.amber, color: c.navy, fontWeight: 700, fontSize: 12, borderRadius: 999, padding: '6px 14px' }}>{b.short}</span>
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: c.navy, marginBottom: 4 }}>{PRODUCT.name} — {b.short}</h2>
                <div style={{ fontFamily: FONT_SUB, fontSize: 13.5, color: c.grayD, marginBottom: 8 }}>{b.label} — {b.blurb}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: c.navy }}>{formatPrice(p, symbol)} <s style={{ fontWeight: 400, color: '#999', fontSize: 13 }}>{formatPrice(cm, symbol)}</s></div>
                <div style={{ fontSize: 12, color: '#2e6b4f', fontWeight: 600, marginTop: 2 }}>{formatPrice(p / b.pillows, symbol)} per pillow · free shipping</div>
                <span style={{ ...BTN, marginTop: 14, padding: '11px 26px', fontSize: 12 }}>View deal</span>
              </div>
            </Link></Reveal>
          );
        })}
      </section>

      {/* De volledige flip'nsleep-range: deken, lakens, comforter */}
      <section style={{ padding: isMobile ? '46px 20px 8px' : '64px 40px 10px' }}>
        <Reveal><div style={{ textAlign: 'center' }}>
          <div style={EYEBROW}>More for your bed</div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 26 : 34, color: c.navy, margin: '8px 0 6px' }}>The full <span style={{ fontFamily: FONT_SUB }}>flip'nsleep</span> range</h2>
          <p style={{ fontSize: 13.5, color: c.grayD, maxWidth: 440, margin: '0 auto' }}>Cooling bedding built on the same idea as the pillow: stay comfortable without trapping heat.</p>
        </div></Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 18 : 24, maxWidth: 1080, margin: isMobile ? '26px auto 0' : '34px auto 0' }}>
          {products.map((prod, idx) => {
            const p = getPrice(prod, isCA);
            const cm = prod.compareAt ? (isCA ? prod.compareAt.cad : prod.compareAt.usd) : null;
            return (
              <Reveal key={prod.id} delay={idx * 120}><Link to={`/product/${prod.id}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: 22, overflow: 'hidden', boxShadow: '0 12px 30px rgba(32,27,93,.10)', display: 'block', height: '100%' }}>
                <div style={{ position: 'relative', height: isMobile ? 220 : 240, background: c.cream, overflow: 'hidden' }}>
                  <img src={prod.images[0]} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {prod.badge && <span style={{ position: 'absolute', top: 14, left: 14, background: c.amber, color: c.navy, fontWeight: 700, fontSize: 11.5, borderRadius: 999, padding: '5px 13px' }}>{prod.badge}</span>}
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: c.navy, marginBottom: 4 }}>{prod.name}</h3>
                  <div style={{ fontSize: 12.5, color: c.grayD, marginBottom: 8, lineHeight: 1.5 }}>{prod.tagline}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: c.navy }}>From {formatPrice(p, symbol)} {cm && <s style={{ fontWeight: 400, color: '#999', fontSize: 12.5 }}>{formatPrice(cm, symbol)}</s>}</div>
                  <div style={{ fontSize: 11.5, color: '#2e6b4f', fontWeight: 600, marginTop: 2 }}>Free shipping · 100-night trial</div>
                  <span style={{ ...BTN, marginTop: 13, padding: '10px 22px', fontSize: 11.5 }}>View product</span>
                </div>
              </Link></Reveal>
            );
          })}
        </div>
      </section>

      <div style={{ marginTop: 50 }}><EmailCapture /></div>
    </div>
  );
}
