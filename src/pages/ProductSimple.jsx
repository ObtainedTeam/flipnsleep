import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { c, useIsMobile, BTN, BTNO, H2, LBL } from '../theme';
import { products } from '../data';
import { buyNow, isPurchasable } from '../shopify';
import { CartContext } from '../components/Cart';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';

/**
 * Productpagina voor losse accessoires (simple: true, geen maat/kleur).
 * Bewust zonder de mesh-specifieke blokken van de kledingpagina
 * (proof-foto's, "not a single bite"-garantie, maat/kleurkiezers).
 * Zolang het Shopify-variant-ID nog niet is ingevuld staat het product op
 * "Coming soon" en zijn de bestelknoppen uitgeschakeld.
 */
export default function ProductSimple({ onCartOpen }) {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const { symbol, isUS } = useCurrency();
  const product = products.find((p) => p.id === id) || products[0];

  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => { setMainImg(0); setQty(1); }, [id]);

  const price = getPrice(product, isUS);
  const compare = product.comparePrices ? (isUS ? product.comparePrices.usd : product.comparePrices.eur) : null;
  const savings = compare ? compare - price : 0;
  const purchasable = isPurchasable(product.id);

  const handleAdd = () => {
    if (!purchasable) return;
    CartContext.add(product, null, null, qty);
    setAdded(true);
    if (onCartOpen) onCartOpen();
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuy = () => {
    if (!purchasable) return;
    buyNow(product.id);
  };

  const related = products.filter((p) => p.id !== product.id);
  // Toon eerst kledingsets, dan de rest — zo staat "complete your protection" logisch.
  const relatedSorted = [...related].sort((a, b) => {
    const rank = (p) => (p.category === 'BUNDLES' ? 0 : p.category === 'ACCESSORIES' ? 2 : 1);
    return rank(a) - rank(b);
  }).slice(0, 4);

  const thumbs = product.images.slice(0, 6);

  return (
    <div style={{ fontFamily: "'Archivo', sans-serif", color: '#1a1a1a' }}>
      {/* BREADCRUMB */}
      <div style={{ padding: isMobile ? '12px 16px' : '12px 40px', fontSize: 12, color: '#999', borderBottom: '1px solid #e8ede9' }}>
        <Link to="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
        {' › '}
        <Link to="/accessories" style={{ color: '#999', textDecoration: 'none' }}>Accessories</Link>
        {' › '}
        <span style={{ color: '#333' }}>{product.name}</span>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '24px 16px' : '40px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48 }}>

        {/* GALLERY */}
        <div>
          <div style={{ borderRadius: 16, overflow: 'hidden', background: product.imageFit === 'contain' ? '#fff' : '#f7f9f8', aspectRatio: '1', marginBottom: 12 }}>
            <img src={product.images[mainImg]} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: product.imageFit || 'cover', objectPosition: 'center' }}
              onError={(e) => (e.target.style.display = 'none')} />
          </div>
          {thumbs.length > 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(thumbs.length, 5)}, 1fr)`, gap: 8 }}>
              {thumbs.map((img, i) => (
                <div key={i} onClick={() => setMainImg(i)} style={{
                  borderRadius: 8, overflow: 'hidden', aspectRatio: '1', cursor: 'pointer',
                  border: mainImg === i ? `2px solid ${c.sageD}` : '2px solid transparent', background: '#f7f9f8',
                }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: product.imageFit || 'cover', objectPosition: 'center' }}
                    onError={(e) => (e.target.style.display = 'none')} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: c.sage, textTransform: 'uppercase', marginBottom: 8 }}>{product.category}</div>
          <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: isMobile ? 26 : 32, fontWeight: 900, lineHeight: 1.15, margin: '0 0 14px' }}>{product.name}</h1>

          {/* PRICE */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: c.sageD }}>{formatPrice(price, symbol)}</span>
            {compare && (
              <span style={{ fontSize: 18, color: '#aaa', textDecoration: 'line-through' }}>{formatPrice(compare, symbol)}</span>
            )}
            {savings > 0 && (
              <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: 12, fontWeight: 800, borderRadius: 20, padding: '4px 12px' }}>
                Save {formatPrice(savings, symbol)}
              </span>
            )}
          </div>
          <div style={{ fontSize: 13, color: '#999', marginBottom: 20 }}>Incl. VAT</div>

          {/* SHORT DESC */}
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 24 }}>{product.desc}</p>

          {/* BUY AREA */}
          {purchasable ? (
            <>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e8ede9', borderRadius: 10, overflow: 'hidden' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 48, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>−</button>
                  <span style={{ width: 40, textAlign: 'center', fontWeight: 700, fontSize: 15 }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} style={{ width: 40, height: 48, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>+</button>
                </div>
                <button onClick={handleBuy} style={{ flex: 1, ...BTN, fontSize: 15, padding: '14px 0', textAlign: 'center' }}>Buy Now →</button>
              </div>
              <button onClick={handleAdd} style={{
                width: '100%', ...BTNO, fontSize: 14, padding: '12px 0', textAlign: 'center', marginBottom: 20,
                background: added ? '#F0F5F2' : 'transparent', transition: 'background .3s',
              }}>
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </>
          ) : (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                width: '100%', textAlign: 'center', background: '#eef2f0', color: '#7c8a83',
                borderRadius: 4, padding: '14px 0', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                Coming Soon
              </div>
              <p style={{ fontSize: 13, color: '#888', textAlign: 'center', margin: 0 }}>Available shortly — check back soon.</p>
            </div>
          )}

          {/* TRUST ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, padding: '16px 0', borderTop: '1px solid #e8ede9', borderBottom: '1px solid #e8ede9' }}>
            {(product.highlights || [
              { icon: '🚚', label: 'Free shipping', sub: 'over $150 US/CA' },
              { icon: '↩️', label: '30-day returns', sub: 'Hassle-free' },
              { icon: '🌿', label: 'Chemical-free', sub: 'No DEET' },
            ]).map(({ icon, label, sub }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#333' }}>{label}</div>
                <div style={{ fontSize: 10, color: '#999' }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* PAYMENT METHODS */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {['VISA', 'Mastercard', 'PayPal', 'Klarna', 'iDEAL'].map((m) => (
              <span key={m} style={{ fontSize: 11, color: '#999', background: '#f5f5f5', borderRadius: 4, padding: '3px 8px', fontWeight: 600, letterSpacing: 0.3 }}>{m}</span>
            ))}
          </div>

          {/* USE CASES */}
          {product.useCases && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Perfect for</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {product.useCases.map((use) => (
                  <span key={use} style={{ background: '#F0F5F2', color: c.sageD, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{use}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WHAT'S INCLUDED + SPECS */}
      {(product.whatsIncluded || product.specs) && (
        <section style={{ background: '#fff', padding: isMobile ? '8px 16px 40px' : '8px 40px 56px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (product.whatsIncluded && product.specs ? '1fr 1fr' : '1fr'), gap: isMobile ? 24 : 40 }}>
            {product.whatsIncluded && (
              <div>
                <div style={{ ...LBL, marginBottom: 8 }}>WHAT'S IN THE KIT</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {product.whatsIncluded.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#F7F9F8', borderRadius: 10, padding: '12px 16px' }}>
                      <span style={{ color: c.sage, fontWeight: 900, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 14, color: '#333', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {product.specs && (
              <div>
                <div style={{ ...LBL, marginBottom: 8 }}>SPECIFICATIONS</div>
                <div style={{ border: '1px solid #e8ede9', borderRadius: 12, overflow: 'hidden' }}>
                  {product.specs.map(({ label, value }, i) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '11px 16px', fontSize: 13, background: i % 2 ? '#F7F9F8' : '#fff' }}>
                      <span style={{ color: '#888', fontWeight: 600, flexShrink: 0 }}>{label}</span>
                      <span style={{ color: '#333', textAlign: 'right' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TABS */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '8px 16px 40px' : '8px 40px 60px' }}>
        <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #e8ede9', marginBottom: 32 }}>
          {['description', 'features'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 700, textTransform: 'capitalize',
              color: activeTab === tab ? c.sageD : '#999',
              borderBottom: activeTab === tab ? `3px solid ${c.sageD}` : '3px solid transparent',
              marginBottom: -2, transition: 'all .2s',
            }}>{tab}</button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div style={{ maxWidth: 720 }}>
            {product.longDesc?.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: '#444', lineHeight: 1.8, marginBottom: 20 }}>{para}</p>
            ))}
          </div>
        )}

        {activeTab === 'features' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12, maxWidth: 800 }}>
            {product.features.map((f) => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#F7F9F8', borderRadius: 10, padding: '12px 16px' }}>
                <span style={{ color: c.sage, fontWeight: 900, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 14, color: '#333', lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RELATED — complete your protection */}
      <section style={{ background: '#fff', padding: isMobile ? '48px 20px' : '72px 40px', borderTop: '1px solid #e8ede9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ ...H2, marginBottom: 8 }}>Complete your protection</h2>
          <p style={{ color: '#555', fontSize: 15, marginBottom: 32 }}>Bug Away accessories work best alongside the mesh you wear.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 20 }}>
            {relatedSorted.map((p) => {
              const relPrice = getPrice(p, isUS);
              return (
                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: '#F7F9F8', borderRadius: 14, overflow: 'hidden', transition: 'transform .2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = '')}>
                    <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', background: p.imageFit === 'contain' ? '#fff' : 'transparent' }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: p.imageFit || 'cover', objectPosition: 'center' }}
                        onError={(e) => (e.target.style.display = 'none')} />
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 11, color: c.sage, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{p.category}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{p.name}</div>
                      <div style={{ fontWeight: 800, color: c.sageD }}>{formatPrice(relPrice, symbol)}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
