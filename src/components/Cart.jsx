import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, useIsMobile } from '../theme';
import { SHOPIFY_HANDLES, getVariantId, isPurchasable, COMBO_FOR_SINGLE, FAMILY_BUNDLE_SET_IDS, CART_CROSSSELL_ANCHOR, CART_CROSSSELL_CONTEXTUAL } from '../shopify';
import { useCurrency, formatPrice, getPrice, FREE_GIFT_THRESHOLD } from '../currency.jsx';
import { products } from '../data';

const DOMAIN = 'checkout.bugawaygear.com';

export const CartContext = {
  items: [],
  listeners: [],
  subscribe(fn) { this.listeners.push(fn); },
  unsubscribe(fn) { this.listeners = this.listeners.filter(l => l !== fn); },
  notify() { this.listeners.forEach(fn => fn([...this.items])); },
  add(product, size, color, quantity = 1) {
    const key = `${product.id}-${size}-${color}`;
    const existing = this.items.find(i => i.key === key);
    if (existing) { existing.quantity += quantity; }
    else { this.items.push({ key, product, size, color, quantity }); }
    this.notify();
  },
  remove(key) { this.items = this.items.filter(i => i.key !== key); this.notify(); },
  updateQty(key, qty) {
    const item = this.items.find(i => i.key === key);
    if (item) { if (qty <= 0) this.remove(key); else { item.quantity = qty; this.notify(); } }
  },
  // Replace a single item with the matching combo set (same size, same color when possible).
  // Used by the "Make it a set" upsell.
  swapToSet(singleKey, comboProductId) {
    const single = this.items.find(i => i.key === singleKey);
    const combo = products.find(p => p.id === comboProductId);
    if (!single || !combo) return;
    this.items = this.items.filter(i => i.key !== singleKey);
    const targetColor = combo.colors.includes(single.color) ? single.color : combo.colors[0];
    const targetSize  = combo.sizes.includes(single.size)  ? single.size  : combo.sizes[0];
    const key = `${combo.id}-${targetSize}-${targetColor}`;
    const existing = this.items.find(i => i.key === key);
    if (existing) existing.quantity += single.quantity;
    else this.items.push({ key, product: combo, size: targetSize, color: targetColor, quantity: single.quantity });
    this.notify();
  },
};

export default function Cart({ isOpen, onClose }) {
  const isMobile = useIsMobile();
  const { symbol, isUS, region } = useCurrency();
  const [items, setItems] = useState([...CartContext.items]);
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscount, setShowDiscount] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    CartContext.subscribe(setItems);
    return () => CartContext.unsubscribe(setItems);
  }, []);

  const threshold = FREE_GIFT_THRESHOLD[region] || FREE_GIFT_THRESHOLD.EU;

  // Region-aware totals: use getPrice per item.
  const total = items.reduce((sum, i) => sum + getPrice(i.product, isUS) * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const remaining = Math.max(0, threshold - total);
  const progress = Math.min(100, (total / threshold) * 100);

  // Family Bundle: buy 4 sets, get 1 free. Mirrors the Shopify automatic
  // "Buy 3 Get 1 free" discount on the Family Bundle Sets collection, so the
  // cart total here matches the Shopify checkout total exactly.
  // The cheapest set(s) become free, one per 4 sets in the cart.
  const bundleUnitPrices = items
    .filter(i => FAMILY_BUNDLE_SET_IDS.includes(i.product.id))
    .flatMap(i => Array(i.quantity).fill(getPrice(i.product, isUS)))
    .sort((a, b) => a - b);
  const setCount = bundleUnitPrices.length;
  const freeSets = Math.floor(setCount / 4);
  const bundleDiscount = bundleUnitPrices.slice(0, freeSets).reduce((s, p) => s + p, 0);
  const netTotal = total - bundleDiscount;

  // Detect a single item (jacket OR pants) that has a matching combo and no combo in cart.
  // The upsell offers to swap that single item for the combo set.
  const hasCombo = items.some(i => i.product.category === 'BUNDLES');
  const singleCandidate = !hasCombo
    ? items.find(i => COMBO_FOR_SINGLE[i.product.id])
    : null;

  let upsell = null;
  if (singleCandidate) {
    const comboId = COMBO_FOR_SINGLE[singleCandidate.product.id];
    const comboProduct = products.find(p => p.id === comboId);
    if (comboProduct) {
      const singlePrice = getPrice(singleCandidate.product, isUS);
      const comboPrice  = getPrice(comboProduct, isUS);
      const savings = (singlePrice * 2) - comboPrice;
      upsell = {
        singleKey: singleCandidate.key,
        comboProduct,
        comboPrice,
        savings,
        twoSinglesPrice: singlePrice * 2,
      };
    }
  }

  // Winkelmand-aanbevelingen. Anker = tick removal kit: altijd getoond zolang
  // hij niet in de mand zit (bestelbaar => Add-knop, coming soon => View-link,
  // zodat het blok nu al zichtbaar is en vanzelf actief wordt zodra het
  // variant-ID erin staat). Contextueel = repellent spray: alleen bij kleding
  // in de mand, en pas zodra die bestelbaar is.
  const anchorProduct = products.find((p) => p.id === CART_CROSSSELL_ANCHOR);
  const anchorInCart = items.some((i) => i.product.id === CART_CROSSSELL_ANCHOR);
  const anchorBuyable = anchorProduct ? isPurchasable(anchorProduct.id) : false;
  const showAnchor = anchorProduct && !anchorInCart && items.length > 0;

  const contextualIds = Array.isArray(CART_CROSSSELL_CONTEXTUAL) ? CART_CROSSSELL_CONTEXTUAL : [CART_CROSSSELL_CONTEXTUAL];
  const contextualProduct = contextualIds
    .map((id) => products.find((p) => p.id === id))
    .find((p) => p && p.id !== CART_CROSSSELL_ANCHOR && isPurchasable(p.id)
      && !items.some((i) => i.product.id === p.id)) || null;
  const hasApparel = items.some((i) => ['MEN', 'WOMEN', 'KIDS', 'BUNDLES'].includes(i.product.category));
  const showContextual = !!contextualProduct && hasApparel;

  const compareOf = (p) => (p.comparePrices ? (isUS ? p.comparePrices.usd : p.comparePrices.eur) : null);

  // Checkout: build Shopify cart URL with all variants
  const handleCheckout = () => {
    if (items.length === 0) return;
    const cartParts = items
      .map(item => {
        const variantId = getVariantId(item.product.id, item.size, item.color);
        return variantId ? `${variantId}:${item.quantity}` : null;
      })
      .filter(Boolean)
      .join(',');
    const discountParam = discountCode ? `?discount=${encodeURIComponent(discountCode)}` : '';
    if (cartParts) {
      window.location.href = `https://${DOMAIN}/cart/${cartParts}${discountParam}`;
    } else {
      const handle = SHOPIFY_HANDLES[items[0].product.id];
      window.location.href = handle ? `https://${DOMAIN}/products/${handle}` : `https://${DOMAIN}`;
    }
  };

  const panelWidth = isMobile ? '100%' : '400px';

  return (
    <>
      {isOpen && (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 300, backdropFilter: 'blur(2px)' }} />
      )}

      <div style={{ position: 'fixed', top: 0, right: isOpen ? 0 : `-${panelWidth}`, width: panelWidth, height: '100%', background: '#fff', zIndex: 301, transition: 'right 0.3s ease', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)' }}>

        {/* Header */}
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #e8ede9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', fontFamily: "Archivo, sans-serif" }}>Your Cart</span>
            {count > 0 && (
              <span style={{ background: c.sageD, color: '#fff', borderRadius: 20, padding: '1px 8px', fontSize: 11, fontWeight: 600 }}>{count}</span>
            )}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#999', lineHeight: 1 }}>✕</button>
        </div>

        {/* Free shipping bar */}
        <div style={{ padding: '14px 20px', background: '#F7F9F8', borderBottom: '1px solid #e8ede9', flexShrink: 0 }}>
          {netTotal < 150 ? (
            <p style={{ fontSize: 12, color: '#555', marginBottom: 8 }}>
              🚚 Only <strong style={{ color: c.sageD }}>{formatPrice(150 - netTotal, '$')}</strong> away from free shipping!
            </p>
          ) : (
            <p style={{ fontSize: 12, color: c.sageD, marginBottom: 8, fontWeight: 600 }}>
              🚚 You've unlocked free shipping!
            </p>
          )}
          <div style={{ height: 4, background: '#e0e8e3', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(100, (netTotal / 150) * 100)}%`, background: c.sageD, borderRadius: 2, transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
            <span style={{ fontSize: 10, color: '#aaa' }}>$0</span>
            <span style={{ fontSize: 10, color: '#aaa' }}>Free shipping at $150</span>
          </div>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🛒</div>
              <p style={{ fontSize: 14, color: '#999', marginBottom: 20 }}>Your cart is empty</p>
              <Link to="/shop" onClick={onClose} style={{ background: c.sageD, color: '#fff', padding: '11px 24px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
                Shop Now
              </Link>
            </div>
          ) : (
            items.map(item => {
              const itemPrice = getPrice(item.product, isUS);
              return (
                <div key={item.key} style={{ display: 'flex', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e8ede9' }}>
                  <div style={{ width: 72, height: 72, borderRadius: 8, overflow: 'hidden', background: item.product.imageFit === 'contain' ? '#fff' : '#f3f4f2', flexShrink: 0 }}>
                    <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: item.product.imageFit || 'cover', objectPosition: 'center' }} onError={e => e.target.style.display = 'none'} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 3, lineHeight: 1.3 }}>{item.product.name}</div>
                    {(item.color || item.size) && (
                      <div style={{ fontSize: 11, color: '#999', marginBottom: 8 }}>
                        {[item.color, item.size ? `Size ${item.size}` : null].filter(Boolean).join(' · ')}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e8ede9', borderRadius: 6, overflow: 'hidden' }}>
                        <button onClick={() => CartContext.updateQty(item.key, item.quantity - 1)} style={{ width: 28, height: 28, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>−</button>
                        <span style={{ width: 28, textAlign: 'center', fontSize: 12, fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => CartContext.updateQty(item.key, item.quantity + 1)} style={{ width: 28, height: 28, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>+</button>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{formatPrice(itemPrice * item.quantity, symbol)}</span>
                    </div>
                  </div>
                  <button onClick={() => CartContext.remove(item.key)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: 16, alignSelf: 'flex-start', flexShrink: 0 }}>🗑</button>
                </div>
              );
            })
          )}

          {/* Family Bundle — buy 4 sets, get 1 free */}
          {items.length > 0 && setCount > 0 && (
            <div style={{ background: '#F0F5F2', border: '1px solid #d4e6da', borderRadius: 12, padding: 14, marginTop: 8, marginBottom: 8 }}>
              {freeSets > 0 ? (
                <div style={{ fontSize: 12, fontWeight: 700, color: c.sageD }}>
                  👨‍👩‍👧‍👦 Family Bundle applied — {freeSets === 1 ? '1 set' : `${freeSets} sets`} FREE ({formatPrice(bundleDiscount, symbol)} off)
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.sageD, marginBottom: 6 }}>
                    👨‍👩‍👧‍👦 Family Bundle — buy 4 sets, get 1 FREE
                  </div>
                  <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>
                    Add {4 - setCount} more {4 - setCount === 1 ? 'set' : 'sets'} — mix &amp; match men's, women's and kids' — and one is free.
                  </div>
                  <div style={{ height: 4, background: '#dbe7df', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(setCount / 4) * 100}%`, background: c.sageD, borderRadius: 2, transition: 'width 0.4s ease' }} />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Upsell — Make it a set (swap single -> combo, show actual savings) */}
          {upsell && items.length > 0 && (
            <div style={{ background: '#F0F5F2', border: '1px solid #d4e6da', borderRadius: 12, padding: 14, marginTop: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.sageD, marginBottom: 8 }}>
                🎯 Make it a set — save {formatPrice(upsell.savings, symbol)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 52, height: 52, borderRadius: 6, overflow: 'hidden', background: '#e8f0eb', flexShrink: 0 }}>
                  <img src={upsell.comboProduct.images[0]} alt={upsell.comboProduct.name} style={{ width: '100%', height: '100%', objectFit: upsell.comboProduct.imageFit || 'cover', objectPosition: 'center' }} onError={e => e.target.style.display = 'none'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{upsell.comboProduct.name}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>
                    <span style={{ textDecoration: 'line-through', marginRight: 6 }}>{formatPrice(upsell.twoSinglesPrice, symbol)}</span>
                    <span style={{ color: c.sageD, fontWeight: 700 }}>{formatPrice(upsell.comboPrice, symbol)}</span>
                  </div>
                </div>
                <button
                  onClick={() => CartContext.swapToSet(upsell.singleKey, upsell.comboProduct.id)}
                  style={{ background: c.sageD, color: '#fff', border: 'none', borderRadius: 6, padding: '7px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Make it a set
                </button>
              </div>
            </div>
          )}

          {/* CROSS-SELL — vast anker: tick removal kit */}
          {showAnchor && (
            <div style={{ background: '#F0F5F2', border: '1px solid #d4e6da', borderRadius: 12, padding: 14, marginTop: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.sageD, marginBottom: 8 }}>
                🪝 {anchorBuyable ? "Don't forget your tick removal kit" : 'The essential companion — Tick Removal Kit'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 52, height: 52, borderRadius: 6, overflow: 'hidden', background: '#e8f0eb', flexShrink: 0 }}>
                  <img src={anchorProduct.images[0]} alt={anchorProduct.name} style={{ width: '100%', height: '100%', objectFit: anchorProduct.imageFit || 'cover', objectPosition: 'center' }} onError={e => e.target.style.display = 'none'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{anchorProduct.name}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>
                    {anchorBuyable ? (
                      <>
                        {compareOf(anchorProduct) && (
                          <span style={{ textDecoration: 'line-through', marginRight: 6 }}>{formatPrice(compareOf(anchorProduct), symbol)}</span>
                        )}
                        <span style={{ color: c.sageD, fontWeight: 700 }}>{formatPrice(getPrice(anchorProduct, isUS), symbol)}</span>
                      </>
                    ) : (
                      <span style={{ color: '#999' }}>Coming soon</span>
                    )}
                  </div>
                </div>
                {anchorBuyable ? (
                  <button onClick={() => CartContext.add(anchorProduct, null, null, 1)}
                    style={{ background: c.sageD, color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    Add
                  </button>
                ) : (
                  <Link to={`/product/${anchorProduct.id}`} onClick={onClose}
                    style={{ background: '#fff', color: c.sageD, border: `1px solid ${c.sageD}`, borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    View →
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* CROSS-SELL — contextueel: repellent spray bij kleding in de mand */}
          {showContextual && (
            <div style={{ background: '#F0F5F2', border: '1px solid #d4e6da', borderRadius: 12, padding: 14, marginTop: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.sageD, marginBottom: 8 }}>
                🌿 For the skin the mesh can't cover
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 52, height: 52, borderRadius: 6, overflow: 'hidden', background: '#e8f0eb', flexShrink: 0 }}>
                  <img src={contextualProduct.images[0]} alt={contextualProduct.name} style={{ width: '100%', height: '100%', objectFit: contextualProduct.imageFit || 'cover', objectPosition: 'center' }} onError={e => e.target.style.display = 'none'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{contextualProduct.name}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>
                    <span style={{ color: c.sageD, fontWeight: 700 }}>{formatPrice(getPrice(contextualProduct, isUS), symbol)}</span>
                  </div>
                </div>
                <button onClick={() => CartContext.add(contextualProduct, null, null, 1)}
                  style={{ background: c.sageD, color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ borderTop: '1px solid #e8ede9', flexShrink: 0 }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #e8ede9' }}>
              <button onClick={() => { setShowDiscount(!showDiscount); setShowNotes(false); }} style={{ flex: 1, padding: 12, background: 'none', border: 'none', borderRight: '1px solid #e8ede9', cursor: 'pointer', fontSize: 12, color: showDiscount ? c.sageD : '#888', fontWeight: showDiscount ? 600 : 400 }}>
                🏷 Discount
              </button>
              <button onClick={() => { setShowNotes(!showNotes); setShowDiscount(false); }} style={{ flex: 1, padding: 12, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: showNotes ? c.sageD : '#888', fontWeight: showNotes ? 600 : 400 }}>
                📝 Notes
              </button>
            </div>
            {showDiscount && (
              <div style={{ padding: '12px 20px', borderBottom: '1px solid #e8ede9', display: 'flex', gap: 8 }}>
                <input type="text" placeholder="Discount code" value={discountCode} onChange={e => setDiscountCode(e.target.value)} style={{ flex: 1, padding: '8px 12px', border: '1px solid #e8ede9', borderRadius: 6, fontSize: 12, outline: 'none' }} />
                <button style={{ background: c.sageD, color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Apply</button>
              </div>
            )}
            {showNotes && (
              <div style={{ padding: '12px 20px', borderBottom: '1px solid #e8ede9' }}>
                <textarea placeholder="Add a note for your order..." value={notes} onChange={e => setNotes(e.target.value)} rows={3} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e8ede9', borderRadius: 6, fontSize: 12, outline: 'none', resize: 'none' }} />
              </div>
            )}
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: '#666' }}>Subtotal</span>
                <span style={{ fontSize: 15, fontWeight: bundleDiscount > 0 ? 400 : 700, color: bundleDiscount > 0 ? '#999' : '#1a1a1a', textDecoration: bundleDiscount > 0 ? 'line-through' : 'none' }}>{formatPrice(total, symbol)}</span>
              </div>
              {bundleDiscount > 0 && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: c.sageD, fontWeight: 600 }}>Family Bundle — {freeSets === 1 ? '1 free set' : `${freeSets} free sets`}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: c.sageD }}>−{formatPrice(bundleDiscount, symbol)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Total</span>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{formatPrice(netTotal, symbol)}</span>
                  </div>
                </>
              )}
              <p style={{ fontSize: 11, color: '#aaa', marginBottom: 14 }}>{bundleDiscount > 0 ? 'Discount applied automatically at checkout. Taxes and shipping calculated at checkout' : 'Taxes and shipping calculated at checkout'}</p>
              <button onClick={handleCheckout} style={{ width: '100%', background: c.sageD, color: '#fff', border: 'none', padding: 14, borderRadius: 8, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: 8 }}>
                Checkout →
              </button>
              <button onClick={onClose} style={{ width: '100%', background: 'none', border: '1px solid #e8ede9', color: '#666', padding: 11, borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
