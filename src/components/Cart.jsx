import { useState, useEffect } from 'react';
import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { cartCheckoutUrl } from '../shopify';
import { bundleById } from '../data';

// Module-level cart store met pub/sub — zelfde patroon als de bugaway-basis.
// Items: [{ bundleId, qty }]
const listeners = new Set();
export const CartContext = {
  items: [],
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  add(bundleId, qty = 1) {
    const found = this.items.find(i => i.bundleId === bundleId);
    if (found) found.qty += qty;
    else this.items.push({ bundleId, qty });
    this.emit();
  },
  updateQty(bundleId, qty) {
    if (qty <= 0) return this.remove(bundleId);
    const found = this.items.find(i => i.bundleId === bundleId);
    if (found) { found.qty = qty; this.emit(); }
  },
  remove(bundleId) {
    this.items = this.items.filter(i => i.bundleId !== bundleId);
    this.emit();
  },
  subscribe(fn) { listeners.add(fn); },
  unsubscribe(fn) { listeners.delete(fn); },
  emit() { listeners.forEach(fn => fn([...this.items])); },
};

export default function Cart({ isOpen, onClose }) {
  const isMobile = useIsMobile();
  const { symbol, isCA } = useCurrency();
  const [items, setItems] = useState([...CartContext.items]);

  useEffect(() => {
    const update = () => setItems([...CartContext.items]);
    CartContext.subscribe(update);
    return () => CartContext.unsubscribe(update);
  }, []);

  const lines = items.map(i => {
    const b = bundleById(i.bundleId);
    return { ...i, bundle: b, unit: getPrice(b, isCA), compare: isCA ? b.compareAt.cad : b.compareAt.usd };
  });
  const total = lines.reduce((s, l) => s + l.unit * l.qty, 0);
  const compareTotal = lines.reduce((s, l) => s + l.compare * l.qty, 0);
  const savings = compareTotal - total;
  const pillowCount = lines.reduce((s, l) => s + l.bundle.pillows * l.qty, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    window.location.href = cartCheckoutUrl(items);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(20,16,64,.55)' }} />
      <aside style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: isMobile ? '100%' : 420, background: c.cream, display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 40px rgba(32,27,93,.25)' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', background: c.navy, color: '#fff' }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18 }}>Your cart</span>
          <button onClick={onClose} aria-label="Close cart" style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}>×</button>
        </header>

        {/* Free shipping — vaste belofte, geen drempel */}
        <div style={{ background: '#EAF4EE', borderBottom: '1px solid #d4e6da', padding: '10px 20px', fontSize: 12, fontWeight: 600, color: '#2e6b4f' }}>
          🚚 Free shipping on every order — always included
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {lines.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 60 }}>
              <p style={{ fontSize: 14, color: c.grayD, marginBottom: 16 }}>Your cart is empty.</p>
              <a href="/product/signature-cold-pillow" style={BTN}>Shop the 1+1 deal</a>
            </div>
          ) : lines.map(l => (
            <div key={l.bundleId} style={{ display: 'flex', gap: 12, background: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, boxShadow: '0 4px 14px rgba(32,27,93,.06)' }}>
              <img src={l.bundle.image} alt="" style={{ width: 74, height: 74, objectFit: 'cover', borderRadius: 12, background: c.sky }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT_SUB, fontSize: 14, marginBottom: 2 }}>Signature Cold Pillow</div>
                <div style={{ fontSize: 12, color: c.grayD, marginBottom: 6 }}>{l.bundle.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{formatPrice(l.unit, symbol)} <s style={{ fontWeight: 400, color: '#aaa', fontSize: 11.5 }}>{formatPrice(l.compare, symbol)}</s></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                  <button onClick={() => CartContext.updateQty(l.bundleId, l.qty - 1)} style={{ width: 26, height: 26, background: 'none', border: `1px solid ${c.navy}22`, borderRadius: 6, cursor: 'pointer' }}>−</button>
                  <span style={{ minWidth: 22, textAlign: 'center', fontSize: 13 }}>{l.qty}</span>
                  <button onClick={() => CartContext.updateQty(l.bundleId, l.qty + 1)} style={{ width: 26, height: 26, background: 'none', border: `1px solid ${c.navy}22`, borderRadius: 6, cursor: 'pointer' }}>+</button>
                </div>
              </div>
              <button onClick={() => CartContext.remove(l.bundleId)} aria-label="Remove" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: 15, alignSelf: 'flex-start' }}>🗑</button>
            </div>
          ))}

          {/* Upsell 1+1 -> 2+2 */}
          {lines.length > 0 && lines.every(l => l.bundleId === '1p1') && (
            <div style={{ background: '#F0F5F2', border: '1px solid #d4e6da', borderRadius: 14, padding: 14, marginTop: 4 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>Make it 4 pillows for less per pillow</div>
              <div style={{ fontSize: 11.5, color: c.grayD, marginBottom: 10 }}>The 2+2 bundle brings the price down to {isCA ? 'CA$65.00' : '$47.50'} per pillow.</div>
              <button onClick={() => { CartContext.remove('1p1'); CartContext.add('2p2', 1); }} style={{ ...BTN, padding: '9px 18px', fontSize: 11.5 }}>Upgrade to 2+2</button>
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <footer style={{ padding: 18, background: '#fff', borderTop: `1px solid ${c.navy}14` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: c.grayD }}>Value</span>
              <span style={{ fontSize: 13, color: '#999', textDecoration: 'line-through' }}>{formatPrice(compareTotal, symbol)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: '#2e6b4f', fontWeight: 600 }}>Your savings ({pillowCount} pillows)</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#2e6b4f' }}>−{formatPrice(savings, symbol)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: 16, fontWeight: 700 }}>{formatPrice(total, symbol)}</span>
            </div>
            <p style={{ fontSize: 10.5, color: '#aaa', marginBottom: 12 }}>Free shipping included. Taxes calculated at checkout.</p>
            <button onClick={handleCheckout} style={{ ...BTN, width: '100%', textAlign: 'center', fontSize: 14 }}>Checkout</button>
          </footer>
        )}
      </aside>
    </div>
  );
}
