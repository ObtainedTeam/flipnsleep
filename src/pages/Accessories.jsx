import { useState } from "react";
import { Link } from "react-router-dom";
import { c, useIsMobile, BTN, H2, LBL } from "../theme";
import { products } from "../data";
import { isPurchasable } from "../shopify";
import { useCurrency, formatPrice, getPrice } from "../currency.jsx";
import { subscribe } from "../brevo";

export default function Accessories() {
  const isMobile = useIsMobile();
  const { symbol, isUS } = useCurrency();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const items = products.filter((p) => p.category === "ACCESSORIES");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try { await subscribe(email, "accessories"); } catch (err) { console.error(err); }
    setSubmitted(true);
  };

  return (
    <div>
      {/* HERO */}
      <section style={{
        position: "relative", minHeight: isMobile ? 260 : 360,
        background: `linear-gradient(to right, rgba(30,50,40,.78) 55%, rgba(30,50,40,.4) 100%), url("/images/Men and female hiking on mountain.png") center/cover no-repeat`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ padding: isMobile ? "40px 24px" : "60px 64px", color: "#fff", maxWidth: 620 }}>
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>GEAR & EXTRAS</div>
          <h1 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 30 : 44, fontWeight: 900, margin: "0 0 14px" }}>
            Accessories
          </h1>
          <p style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.6 }}>
            The tick removal kit, indoor zapper and natural repellent that round out your Bug Away protection — for the moments and places the mesh can't reach.
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section style={{ padding: isMobile ? "28px 16px" : "48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 12 : 24 }}>
          {items.map((product) => {
            const price = getPrice(product, isUS);
            const compare = product.comparePrices ? (isUS ? product.comparePrices.usd : product.comparePrices.eur) : null;
            const comingSoon = product.simple && !isPurchasable(product.id);
            return (
              <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e8ede9", transition: "box-shadow 0.2s, transform 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ aspectRatio: "4 / 5", background: product.imageFit === "contain" ? "#fff" : "#f3f4f2", overflow: "hidden", position: "relative" }}>
                    <img src={product.images[0]} alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: product.imageFit || "cover", objectPosition: "center", display: "block" }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    {product.badge && (
                      <div style={{ position: "absolute", top: 10, left: 10, background: c.sageD, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
                        {product.badge}
                      </div>
                    )}
                    {comingSoon && (
                      <div style={{ position: "absolute", top: 10, right: 10, background: "#eef2f0", color: "#7c8a83", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
                        Coming soon
                      </div>
                    )}
                  </div>
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
                      {compare && (
                        <span style={{ fontSize: 12, color: "#aaa", textDecoration: "line-through", marginLeft: 8, fontWeight: 400 }}>
                          {formatPrice(compare, symbol)}
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
      </section>

      {/* EMAIL SIGNUP — more on the way */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "64px 40px", borderTop: "1px solid #e8ede9" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...H2, marginBottom: 16 }}>More accessories on the way</h2>
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            We are expanding the range with mesh gloves, gaiters and head nets. Sign up to hear when they drop and get an early-bird discount.
          </p>

          {submitted ? (
            <div style={{ background: "#F0F5F2", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
              <p style={{ fontWeight: 700, color: c.sageD, marginBottom: 4 }}>You're on the list!</p>
              <p style={{ fontSize: 13, color: "#888" }}>We'll email you as soon as new accessories are available.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexDirection: isMobile ? "column" : "row" }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1, padding: "14px 16px", borderRadius: 8, border: "2px solid #e8ede9",
                  fontSize: 14, outline: "none", fontFamily: "inherit",
                }}
              />
              <button type="submit" style={{ ...BTN, padding: "14px 24px", whiteSpace: "nowrap", cursor: "pointer", border: "none" }}>
                Notify Me
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
