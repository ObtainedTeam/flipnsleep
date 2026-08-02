import { useState } from 'react';
import { Link } from 'react-router-dom';
import { c, useIsMobile, BTN, H2, LBL } from '../theme';
import { products } from '../data';
import { isPurchasable } from '../shopify';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';

const CATS = [
  { label: "All", key: "all" },
  { label: "Men", key: "MEN" },
  { label: "Women", key: "WOMEN" },
  { label: "Kids", key: "KIDS" },
  { label: "Bundles", key: "BUNDLES" },
  { label: "Accessories", key: "ACCESSORIES" },
];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState("all");
  const isMobile = useIsMobile();
  const { symbol, isUS } = useCurrency();

  const PRIORITY_ORDER = ['ba-combo-men', 'ba-combo-women', 'ba-kids-set'];
  const sortedProducts = [...products].sort((a, b) => {
    const ai = PRIORITY_ORDER.indexOf(a.id);
    const bi = PRIORITY_ORDER.indexOf(b.id);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });

  const visible = activeFilter === "all"
    ? sortedProducts
    : sortedProducts.filter(p => p.category === activeFilter);

  return (
    <div>
      {/* HERO — new outdoor photo */}
      <div style={{
        position: "relative", minHeight: isMobile ? 200 : 280,
        background: `linear-gradient(to right, rgba(30,50,40,.72) 55%, rgba(30,50,40,.3) 100%), url("/images/Men and female hiking on mountain.png") center/cover no-repeat`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ padding: isMobile ? "40px 24px" : "60px 64px", color: "#fff" }}>
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>COLLECTION</div>
          <h1 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 900, margin: 0 }}>
            Shop Bug Away
          </h1>
          <p style={{ fontSize: 14, opacity: 0.85, marginTop: 8 }}>
            Tick-proof mesh clothing — chemical-free, lightweight, always effective.
          </p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8ede9", padding: `12px ${isMobile ? "16px" : "40px"}`, display: "flex", gap: 8, flexWrap: "wrap", overflowX: "auto" }}>
        {CATS.map(cat => (
          <button key={cat.key} onClick={() => setActiveFilter(cat.key)} style={{
            padding: "7px 18px", borderRadius: 24, whiteSpace: "nowrap",
            border: `1.5px solid ${activeFilter === cat.key ? c.sageD : "#e0e8e3"}`,
            background: activeFilter === cat.key ? c.sageD : "#fff",
            color: activeFilter === cat.key ? "#fff" : "#555",
            fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            {cat.label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#999", alignSelf: "center", whiteSpace: "nowrap" }}>
          {visible.length} product{visible.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* PRODUCT GRID */}
      <section style={{ padding: isMobile ? "24px 16px" : "40px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 12 : 24 }}>
          {visible.map(product => {
            const price = getPrice(product, isUS);
            return (
              <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e8ede9", transition: "box-shadow 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  {/* IMAGE — 4:5 portrait, object-position center top so faces stay visible */}
                  <div style={{ aspectRatio: "4 / 5", background: product.imageFit === "contain" ? "#fff" : "#f3f4f2", overflow: "hidden", position: "relative" }}>
                    <img src={product.images[0]} alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: product.imageFit || "cover", objectPosition: product.imageFit ? "center" : "center top", display: "block" }}
                      onError={e => e.target.style.display = "none"}
                    />
                    {product.badge && (
                      <div style={{ position: "absolute", top: 10, left: 10, background: c.sageD, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
                        {product.badge}
                      </div>
                    )}
                    {product.simple && !isPurchasable(product.id) && (
                      <div style={{ position: "absolute", top: 10, right: 10, background: "#eef2f0", color: "#7c8a83", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
                        Coming soon
                      </div>
                    )}
                    {product.colorHex && (
                      <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", gap: 5 }}>
                        {product.colorHex.slice(0, 4).map((col, i) => (
                          <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: col, border: "1.5px solid rgba(255,255,255,0.8)" }} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div style={{ padding: isMobile ? "12px" : "18px 20px 20px" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: c.sage, fontWeight: 700, marginBottom: 3 }}>
                      {product.category}
                    </div>
                    <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
                      {product.name}
                    </div>
                    {!isMobile && (
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 8, lineHeight: 1.5 }}>
                        {product.desc.substring(0, 80)}…
                      </div>
                    )}
                    <div style={{ fontSize: 15, color: "#333", marginBottom: 12, fontWeight: 600 }}>
                      {formatPrice(price, symbol)}
                      {product.comparePrices && (
                        <span style={{ fontSize: 12, color: "#aaa", textDecoration: "line-through", marginLeft: 8, fontWeight: 400 }}>
                          {formatPrice(isUS ? product.comparePrices.usd : product.comparePrices.eur, symbol)}
                        </span>
                      )}
                    </div>
                    <div style={{ ...BTN, width: "100%", fontSize: 11, padding: "10px 0", textAlign: "center", borderRadius: 6 }}>
                      View Product
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>
            No products found in this category.
          </div>
        )}

        {/* COMING SOON — pets only; accessories are shoppable now */}
        <div style={{ marginTop: 40 }}>
          <div style={{ background: "#F7F9F8", borderRadius: 12, padding: 32, textAlign: "center", border: "2px dashed #d5ddd8" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🐕</div>
            <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 8, color: c.sageD }}>Pets</div>
            <p style={{ fontSize: 14, color: "#888", margin: 0 }}>Tick protection for your four-legged family members. Coming soon.</p>
          </div>
        </div>
      </section>

      {/* SIZE GUIDE BANNER */}
      <div style={{ background: "#F0F5F2", margin: `0 ${isMobile ? "16px" : "40px"}`, marginBottom: isMobile ? 24 : 40, borderRadius: 12, padding: isMobile ? "24px 20px" : "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexDirection: isMobile ? "column" : "row" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>Not sure which size?</div>
          <div style={{ fontSize: 13, color: "#666" }}>Check our size guide — Bug Away is designed to fit loosely as a base layer.</div>
        </div>
        <Link to="/faq" style={{ ...BTN, whiteSpace: "nowrap", textDecoration: "none" }}>Size Guide</Link>
      </div>
    </div>
  );
}
