import { Link } from 'react-router-dom';
import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { BUNDLES, PRODUCT } from '../data';
import { EmailCapture, ProductImageBlock } from '../components/Blocks';

export default function Shop() {
  const isMobile = useIsMobile();
  const { symbol, isCA } = useCurrency();

  return (
    <div>
      <section style={{ textAlign: 'center', padding: isMobile ? '36px 20px 10px' : '54px 40px 16px' }}>
        <div style={EYEBROW}>Shop</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 30 : 48, color: c.navy, margin: '8px 0 12px' }}>Pick your bundle</h1>
        <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 420, margin: '0 auto' }}>
          Every order is a set — that's our 1+1 promise. Choose two pillows or four, always with free shipping and a 100-night trial.
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 22 : 30, maxWidth: isMobile ? 860 : 1040, margin: isMobile ? '26px auto 0' : '36px auto 0', padding: '0 20px' }}>
        {BUNDLES.map(b => {
          const p = getPrice(b, isCA);
          const cm = isCA ? b.compareAt.cad : b.compareAt.usd;
          return (
            <Link key={b.id} to="/product/signature-cold-pillow" style={{ textDecoration: 'none', background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 12px 30px rgba(32,27,93,.10)', display: 'block' }}>
              <div style={{ position: 'relative' }}>
                <ProductImageBlock src={b.image} alt={b.label} height={isMobile ? 210 : 280} radius={0} />
                <span style={{ position: 'absolute', top: 14, left: 14, background: c.amber, color: c.navy, fontWeight: 700, fontSize: 12, borderRadius: 999, padding: '6px 14px' }}>{b.short}</span>
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: c.navy, marginBottom: 4 }}>{PRODUCT.name}</h2>
                <div style={{ fontFamily: FONT_SUB, fontSize: 13.5, color: c.grayD, marginBottom: 8 }}>{b.label} — {b.blurb}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: c.navy }}>{formatPrice(p, symbol)} <s style={{ fontWeight: 400, color: '#999', fontSize: 13 }}>{formatPrice(cm, symbol)}</s></div>
                <div style={{ fontSize: 12, color: '#2e6b4f', fontWeight: 600, marginTop: 2 }}>{formatPrice(p / b.pillows, symbol)} per pillow · free shipping</div>
                <span style={{ ...BTN, marginTop: 14, padding: '11px 26px', fontSize: 12 }}>View deal</span>
              </div>
            </Link>
          );
        })}
      </section>

      <div style={{ marginTop: 50 }}><EmailCapture /></div>
    </div>
  );
}
