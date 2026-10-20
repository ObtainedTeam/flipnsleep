import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, BTN, BTN_SM, rv, FONT_DISPLAY, FONT_SUB, R, SH, T, LH } from '../theme';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { cartCheckoutUrl, CART_CROSSSELL_ANCHOR, CART_CROSSSELL_CONTEXTUAL } from '../shopify';
import { bundleById, productById, dim } from '../data';

// Module-level cart store met pub/sub. Items zijn óf een kussenbundel
// { bundleId, qty } óf een variantproduct { productId, size, color, qty }.
// De bundel- en productmethodes raken elkaar niet: bundelitems hebben geen
// productId en omgekeerd, dus de find-filters kruisen nooit.
const listeners = new Set();
export const CartContext = {
  items: [],
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },

  // Kussenbundels
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

  // Variantproducten (maat + kleur)
  addProduct(productId, size, color, qty = 1) {
    const found = this.items.find(i => i.productId === productId && i.size === size && i.color === color);
    if (found) found.qty += qty;
    else this.items.push({ productId, size, color, qty });
    this.emit();
  },
  updateProductQty(productId, size, color, qty) {
    if (qty <= 0) return this.removeProduct(productId, size, color);
    const found = this.items.find(i => i.productId === productId && i.size === size && i.color === color);
    if (found) { found.qty = qty; this.emit(); }
  },
  removeProduct(productId, size, color) {
    this.items = this.items.filter(i => !(i.productId === productId && i.size === size && i.color === color));
    this.emit();
  },

  subscribe(fn) { listeners.add(fn); },
  unsubscribe(fn) { listeners.delete(fn); },
  emit() { listeners.forEach(fn => fn([...this.items])); },
};

export default function Cart({ isOpen, onClose }) {
  const { symbol, isCA } = useCurrency();
  const [items, setItems] = useState([...CartContext.items]);

  useEffect(() => {
    const update = () => setItems([...CartContext.items]);
    CartContext.subscribe(update);
    return () => CartContext.unsubscribe(update);
  }, []);

  // Normaliseer elk item naar een regel; onbekende id's vallen weg.
  const lines = items.map(i => {
    if (i.bundleId) {
      const b = bundleById(i.bundleId);
      if (!b) return null;
      return {
        type: 'bundle', key: `b:${i.bundleId}`, item: i, qty: i.qty,
        name: 'Signature Cold Pillow', sub: b.label, image: b.image, imgFit: 'cover',
        unit: getPrice(b, isCA), compare: isCA ? b.compareAt.cad : b.compareAt.usd,
        pillows: b.pillows * i.qty,
        dec: () => CartContext.updateQty(i.bundleId, i.qty - 1),
        inc: () => CartContext.updateQty(i.bundleId, i.qty + 1),
        del: () => CartContext.remove(i.bundleId),
      };
    }
    const p = productById(i.productId);
    if (!p) return null;
    const compare = p.compareAt ? (isCA ? p.compareAt.cad : p.compareAt.usd) : null;
    return {
      type: 'product', key: `p:${i.productId}|${i.size}|${i.color}`, item: i, qty: i.qty,
      name: p.name, sub: p.colors.length > 1 ? `${i.size} · ${i.color}` : i.size, image: p.images[0], imgFit: 'contain',
      unit: getPrice(p, isCA), compare, pillows: 0,
      dec: () => CartContext.updateProductQty(i.productId, i.size, i.color, i.qty - 1),
      inc: () => CartContext.updateProductQty(i.productId, i.size, i.color, i.qty + 1),
      del: () => CartContext.removeProduct(i.productId, i.size, i.color),
    };
  }).filter(Boolean);

  const total = lines.reduce((s, l) => s + l.unit * l.qty, 0);
  const compareTotal = lines.reduce((s, l) => s + (l.compare || l.unit) * l.qty, 0);
  const savings = compareTotal - total;
  const pillowCount = lines.reduce((s, l) => s + l.pillows, 0);
  const onlyPillows = lines.length > 0 && lines.every(l => l.type === 'bundle');
  const onlyOnePlusOne = lines.length > 0 && lines.every(l => l.item.bundleId === '1p1');

  // Cross-sell: comforter-anker + contextuele deken/lakens die nog niet in de mand zitten.
  const inCartIds = new Set(items.map(i => i.productId).filter(Boolean));
  const recs = [CART_CROSSSELL_ANCHOR, ...CART_CROSSSELL_CONTEXTUAL]
    .filter(id => !inCartIds.has(id))
    .map(productById).filter(Boolean).slice(0, 2);

  const handleCheckout = () => {
    if (items.length === 0) return;
    window.location.href = cartCheckoutUrl(items);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(20,16,64,.55)' }} />
      <aside className="r-w" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, ...rv('w', 420, '100%'), background: c.cream, display: 'flex', flexDirection: 'column', boxShadow: SH.float }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', background: c.navy, color: c.white }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: T.lg[0] }}>Your cart</span>
          <button onClick={onClose} aria-label="Close cart" style={{ background: 'none', border: 'none', color: c.white, fontSize: T.h3[0], cursor: 'pointer' }}>×</button>
        </header>

        <div style={{ background: c.sky, borderBottom: '1px solid rgba(32,27,93,.10)', padding: '10px 20px', fontSize: T.xs[0], fontWeight: 600, color: c.navy }}>
          🚚 Free shipping on every order, always included
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {lines.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 60 }}>
              <p style={{ fontSize: T.sm[0], color: c.grayD, marginBottom: 20 }}>Your cart is empty.</p>
              <a href="/product/signature-cold-pillow" style={BTN}>Shop the deal</a>
            </div>
          ) : lines.map(l => (
            <div key={l.key} style={{ display: 'flex', gap: 12, background: c.white, borderRadius: R.sm, padding: 16, marginBottom: 12, boxShadow: SH.card }}>
              <img src={l.image} {...dim(l.image)} loading="lazy" decoding="async" alt="" style={{ width: 74, height: 74, objectFit: l.imgFit, borderRadius: R.sm, background: c.sky }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT_SUB, fontSize: T.sm[0], marginBottom: 2 }}>{l.name}</div>
                <div style={{ fontSize: T.xs[0], color: c.grayD, marginBottom: 6 }}>{l.sub}</div>
                <div style={{ fontSize: T.sm[0], fontWeight: 700 }}>{formatPrice(l.unit, symbol)} {l.compare && <s style={{ fontWeight: 400, color: c.gray, fontSize: T.xs[0] }}>{formatPrice(l.compare, symbol)}</s>}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                  <button onClick={l.dec} style={{ width: 26, height: 26, background: 'none', border: `1px solid ${c.navy}22`, borderRadius: R.sm, cursor: 'pointer' }}>−</button>
                  <span style={{ minWidth: 22, textAlign: 'center', fontSize: T.sm[0] }}>{l.qty}</span>
                  <button onClick={l.inc} style={{ width: 26, height: 26, background: 'none', border: `1px solid ${c.navy}22`, borderRadius: R.sm, cursor: 'pointer' }}>+</button>
                </div>
              </div>
              <button onClick={l.del} aria-label="Remove" style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.gray, fontSize: T.sm[0], alignSelf: 'flex-start' }}>🗑</button>
            </div>
          ))}

          {/* Upsell 1+1 -> 2+2 (alleen bij louter 1+1-bundels) */}
          {onlyOnePlusOne && (
            <div style={{ background: c.sky, borderRadius: R.sm, padding: 16, marginTop: 4 }}>
              <div style={{ fontSize: T.sm[0], fontWeight: 700, marginBottom: 4 }}>Make it 4 pillows for less per pillow</div>
              <div style={{ fontSize: T.xs[0], lineHeight: LH.body, color: c.grayD, marginBottom: 12 }}>Buy 2, Get 2 Free brings the price down to {isCA ? 'CA$65.00' : '$47.50'} per pillow.</div>
              <button onClick={() => { CartContext.remove('1p1'); CartContext.add('2p2', 1); }} style={BTN_SM}>Upgrade to 4 pillows</button>
            </div>
          )}

          {/* Cross-sell: bijbehorende deken / lakens */}
          {lines.length > 0 && recs.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: T.xs[0], fontWeight: 700, color: c.grayD, letterSpacing: .4, textTransform: 'uppercase', margin: '16px 2px 8px', fontFamily: FONT_SUB }}>Complete your bed</div>
              {recs.map(r => {
                const rp = getPrice(r, isCA);
                return (
                  <Link key={r.id} to={`/product/${r.id}`} onClick={onClose} className="card-hover" style={{ display: 'flex', gap: 12, alignItems: 'center', background: c.white, borderRadius: R.sm, padding: '12px 16px', marginBottom: 8, textDecoration: 'none', boxShadow: SH.card }}>
                    <img src={r.images[0]} {...dim(r.images[0])} loading="lazy" decoding="async" alt="" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: R.sm, background: c.sky, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: FONT_SUB, fontSize: T.sm[0], color: c.navy, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                      <div style={{ fontSize: T.xs[0], color: c.grayD }}>From {formatPrice(rp, symbol)}</div>
                    </div>
                    <span style={{ fontSize: T.xs[0], fontWeight: 700, color: c.purple, flexShrink: 0 }}>View →</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <footer style={{ padding: 20, background: c.white, borderTop: `1px solid ${c.navy}14` }}>
            {savings > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: T.sm[0], color: c.grayD }}>Value</span>
                  <span style={{ fontSize: T.sm[0], color: c.gray, textDecoration: 'line-through' }}>{formatPrice(compareTotal, symbol)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: T.sm[0], color: c.purple, fontWeight: 600 }}>{onlyPillows && pillowCount > 0 ? `Your savings (${pillowCount} pillows)` : 'Your savings'}</span>
                  <span style={{ fontSize: T.sm[0], fontWeight: 700, color: c.purple }}>−{formatPrice(savings, symbol)}</span>
                </div>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: T.sm[0], fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: T.lg[0], fontWeight: 700 }}>{formatPrice(total, symbol)}</span>
            </div>
            <p style={{ fontSize: T.xs[0], color: c.gray, marginBottom: 16 }}>Free shipping included. Taxes calculated at checkout.</p>
            <button onClick={handleCheckout} style={{ ...BTN, width: '100%' }}>Checkout</button>
          </footer>
        )}
      </aside>
    </div>
  );
}
