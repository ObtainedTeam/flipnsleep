import { useState } from "react";
import { Link } from "react-router-dom";
import { c, useIsMobile, BTN, H2, LBL } from "../theme";
import { products } from "../data";
import { useCurrency, formatPrice, getPrice } from "../currency";

const Star = () => <span style={{ color: "#F59E0B" }}>★</span>;

function ProductCard({ product }) {
  const { symbol, isUS } = useCurrency();
  const isMobile = useIsMobile();
  const price = getPrice(product, isUS);
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", transition: "transform .2s, box-shadow .2s", cursor: "pointer" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.13)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
      >
        <div style={{ position: "relative", aspectRatio: "4 / 5", background: product.imageFit === "contain" ? "#fff" : "#f3f4f2", overflow: "hidden" }}>
          <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: product.imageFit || "cover", objectPosition: product.imageFit ? "center" : "center top" }} />
          {product.badge && (
            <span style={{ position: "absolute", top: 12, left: 12, background: c.sage, color: "#fff", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{product.badge}</span>
          )}
        </div>
        <div style={{ padding: "16px 16px 20px" }}>
          <div style={{ fontSize: 11, color: c.sage, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{product.category}</div>
          <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{product.name}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 800, fontSize: 16, color: c.sageD }}>{formatPrice(price, symbol)}</span>
            <span style={{ ...BTN, fontSize: 12, padding: "6px 14px" }}>View</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const TESTIMONIALS = [
  { name: "Maaike V.", stars: 5, text: "Finally something that actually keeps ticks away. Wore it hiking all weekend — not a single bite.", location: "Vermont" },
  { name: "James R.", stars: 5, text: "My whole family wears these now. Kids can play in the forest without us constantly checking.", location: "Ontario, Canada" },
  { name: "Sophie L.", stars: 5, text: "The integrated foot cover is genius. No more tucking trousers into socks.", location: "Minnesota" },
  { name: "Bart M.", stars: 4, text: "Lightweight, breathable, does exactly what it says. Great for gardening too.", location: "Connecticut" },
  { name: "Rachel K.", stars: 5, text: "I was terrified of ticks after my neighbor got Lyme. This suit gave me my backyard back.", location: "New Jersey" },
  { name: "Dave T.", stars: 5, text: "Ditched the spray for good. Wore this fly fishing all summer — not one bite.", location: "Montana" },
  { name: "Karen P.", stars: 5, text: "Bought the combo set for my husband and me. We garden every weekend now without a worry.", location: "Virginia" },
  { name: "Mike S.", stars: 5, text: "As a trail runner, I was skeptical. But this thing breathes and keeps every tick off. Game changer.", location: "New Hampshire" },
  { name: "Linda W.", stars: 5, text: "I have alpha-gal from a tick bite. This suit is the only reason I still go outside.", location: "North Carolina" },
  { name: "Tom H.", stars: 4, text: "Great concept, well made. My only note is I wish they made one for my dog too.", location: "Wisconsin" },
];

const DISEASES = [
  { name: "Lyme Disease", severity: "High Risk", color: "#dc2626", desc: "Caused by Borrelia bacteria transmitted through tick bites. Can lead to chronic fatigue, joint pain and neurological issues if untreated." },
  { name: "TBE (Tick-Borne Encephalitis)", severity: "Serious", color: "#d97706", desc: "Viral infection affecting the nervous system. No cure — prevention is the only protection." },
  { name: "Anaplasmosis", severity: "Moderate Risk", color: "#ca8a04", desc: "Bacterial infection causing fever, headache and muscle aches. Increasingly common in Europe and North America." },
  { name: "Babesiosis", severity: "Moderate Risk", color: "#ca8a04", desc: "Parasitic infection of red blood cells. Can be life-threatening in elderly or immunocompromised individuals." },
];

export default function Home() {
  const isMobile = useIsMobile();
  const { symbol, isUS } = useCurrency();
  const bestsellers = products.filter(p => p.badge === "Best Seller");

  return (
    <div>
      {/* HERO — looping video with green overlay */}
      <section style={{
        position: "relative", minHeight: isMobile ? 420 : 520,
        display: "flex", alignItems: "center",
        overflow: "hidden",
      }}>
        {/* Background video — autoplay, muted, loops, plays inline on iOS */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/Men and female hiking on mountain.png"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: isMobile ? "center" : "center 25%",
            zIndex: 0,
          }}
        >
          {isMobile && <source src="/videos/hero-mobile.mp4" type="video/mp4" />}
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Green gradient overlay — same look as the photo version */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(30,50,40,.72) 55%, rgba(30,50,40,.3) 100%)",
          zIndex: 1,
        }} />

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640, padding: isMobile ? "60px 24px" : "80px 64px", color: "#fff" }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 24, padding: "5px 16px", fontSize: 12, marginBottom: 20 }}>
            🛡️ Insecticide-free · Tick-proof · Eco-responsible
          </span>
          <h1 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 36 : 56, fontWeight: 900, lineHeight: 1.1, margin: "0 0 12px" }}>
            Enjoy the Outdoors.<br /><span style={{ color: c.sageL }}>Safe & Carefree.</span>
          </h1>
          <p style={{ fontSize: 16, opacity: 0.88, maxWidth: 420, lineHeight: 1.6, margin: "0 0 12px" }}>
            Lightweight mesh clothing that physically blocks ticks and insects. No DEET, no chemicals — just a smart layer between you and nature.
          </p>
          <p style={{ fontStyle: "italic", color: c.sageL, fontSize: 14, marginBottom: 28 }}>"Like a screen porch for your body 🌿"</p>
          <Link to="/shop" style={{ ...BTN, fontSize: 15, padding: "14px 32px", display: "inline-block", textDecoration: "none" }}>SHOP NOW</Link>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e8ede9", padding: "14px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: isMobile ? 16 : 40 }}>
          {[
            { icon: "⭐", text: "500+ happy customers" },
            { icon: "🔵", text: "100% chemical-free" },
            { icon: "🚚", text: "Free shipping over $150 US/CA" },
            { icon: "📦", text: "30-day money-back guarantee" },
          ].map(({ icon, text }) => (
            <span key={text} style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
              <span>{icon}</span>{text}
            </span>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY — kept as studio/product imagery per spec (not lifestyle) */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 16px" : "0 32px" }}>
          <div style={{ ...LBL, marginBottom: 8, paddingLeft: isMobile ? 4 : 8 }}>SHOP BY CATEGORY</div>
          <h2 style={{ ...H2, marginBottom: 28, paddingLeft: isMobile ? 4 : 8 }}>Protection for everyone</h2>

          {!isMobile ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gridTemplateRows: "340px", gap: 12 }}>
              {/* Men */}
              <Link to="/shop?cat=men" style={{ textDecoration: "none", gridColumn: "1 / 2", gridRow: "1 / 2" }}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: "100%", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; e.currentTarget.querySelector(".overlay").style.opacity = "0.75"; }}
                  onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".overlay").style.opacity = "0.5"; }}
                >
                  <img src="/images/2 guys _ white and black mesh_ hiking.png" alt="Men" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform .5s" }} />
                  <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)", transition: "opacity .3s", opacity: 0.5 }} />
                  <div style={{ position: "absolute", bottom: 24, left: 24, color: "#fff" }}>
                    <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: "-0.02em" }}>Men</div>
                    <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Shop collection →</div>
                  </div>
                </div>
              </Link>

              {/* Women */}
              <Link to="/shop?cat=women" style={{ textDecoration: "none", gridColumn: "2 / 3", gridRow: "1 / 2" }}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: "100%", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; e.currentTarget.querySelector(".overlay").style.opacity = "0.75"; }}
                  onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".overlay").style.opacity = "0.5"; }}
                >
                  <img src="/images/Female _ White mesh _ mountain solo.png" alt="Women" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform .5s" }} />
                  <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)", transition: "opacity .3s", opacity: 0.5 }} />
                  <div style={{ position: "absolute", bottom: 24, left: 24, color: "#fff" }}>
                    <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: "-0.02em" }}>Women</div>
                    <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Shop collection →</div>
                  </div>
                </div>
              </Link>

              {/* Kids */}
              <Link to="/shop?cat=kids" style={{ textDecoration: "none", gridColumn: "3 / 4", gridRow: "1 / 2" }}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: "100%", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; e.currentTarget.querySelector(".overlay").style.opacity = "0.75"; }}
                  onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".overlay").style.opacity = "0.5"; }}
                >
                  <img src="/images/kids-set-green-flatlay.jpg" alt="Kids" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }} />
                  <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)", transition: "opacity .3s", opacity: 0.5 }} />
                  <div style={{ position: "absolute", bottom: 24, left: 24, color: "#fff" }}>
                    <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: "-0.02em" }}>Kids</div>
                    <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Shop collection →</div>
                  </div>
                </div>
              </Link>

              {/* Bundles — new bundle lifestyle photo */}
              <Link to="/shop?cat=bundles" style={{ textDecoration: "none", gridColumn: "4 / 5", gridRow: "1 / 2" }}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: "100%", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; e.currentTarget.querySelector(".overlay").style.opacity = "0.75"; }}
                  onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".overlay").style.opacity = "0.5"; }}
                >
                  <img src="/images/Couple _ camping.png" alt="Bundles" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform .5s" }} />
                  <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)", transition: "opacity .3s", opacity: 0.5 }} />
                  <div style={{ position: "absolute", bottom: 24, left: 24, color: "#fff" }}>
                    <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: "-0.02em" }}>Bundles</div>
                    <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Best value →</div>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            /* Mobile: 2 columns, tall cards */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Men", img: "/images/2 guys _ white and black mesh_ hiking.png", link: "/shop?cat=men", sub: "Shop →" },
                { label: "Women", img: "/images/Female _ White mesh _ mountain solo.png", link: "/shop?cat=women", sub: "Shop →" },
                { label: "Kids", img: "/images/kids-set-green-flatlay.jpg", link: "/shop?cat=kids", sub: "Shop →" },
                { label: "Bundles", img: "/images/Couple _ camping.png", link: "/shop?cat=bundles", sub: "Best value →" },
              ].map(({ label, img, link, sub }) => (
                <Link key={label} to={link} style={{ textDecoration: "none" }}>
                  <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 220, cursor: "pointer" }}>
                    <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 55%)" }} />
                    <div style={{ position: "absolute", bottom: 16, left: 14, color: "#fff" }}>
                      <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 20 }}>{label}</div>
                      <div style={{ fontSize: 12, opacity: 0.85 }}>{sub}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NATURE PHOTO STRIP — new outdoor photos */}
      <section style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", height: isMobile ? "auto" : 300, overflow: "hidden" }}>
        <div style={{ overflow: "hidden", height: isMobile ? 180 : "100%" }}>
          <img src="/images/Male _ black mesh _ bino's hunting.png" alt="Outdoor hunting" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        </div>
        <div style={{ overflow: "hidden", height: isMobile ? 180 : "100%" }}>
          <img src="/images/Buddies camping together.png" alt="Buddies camping" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        </div>
        <div style={{ overflow: "hidden", height: isMobile ? 180 : "100%" }}>
          <img src="/images/Female _ White mesh _ Forest solo.png" alt="Solo forest walk" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
        </div>
      </section>

      {/* STATS BAR — desktop: solid green bar. Mobile: overlay on photo strip */}
      {!isMobile && (
        <section style={{ background: c.sage, padding: "32px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 24, textAlign: "center", color: "#fff" }}>
            {[
              { num: "1.5M+", label: "Tick bites/year US" },
              { num: "27,000", label: "New Lyme cases/yr" },
              { num: "100%", label: "Chemical-free" },
              { num: "360°", label: "Body coverage" },
              { num: "< 80g", label: "Per set" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 28 }}>{num}</div>
                <div style={{ fontSize: 12, opacity: 0.82, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      {isMobile && (
        <section style={{ position: "relative", overflow: "hidden" }}>
          <img src="/images/Buddies camping together.png" alt="" style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "center 40%", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(30,50,40,0.75)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 8, padding: "16px 12px" }}>
            {[
              { num: "1.5M+", label: "Tick bites/yr" },
              { num: "27K", label: "Lyme cases/yr" },
              { num: "100%", label: "Chemical-free" },
              { num: "360°", label: "Coverage" },
              { num: "< 80g", label: "Per set" },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: "center", width: "30%", color: "#fff" }}>
                <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 20 }}>{num}</div>
                <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAMILY BUNDLE PROMO — buy 4 sets, get 1 free */}
      <section style={{ background: "#1a2e24", padding: isMobile ? "40px 20px" : "56px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? 20 : 40 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: "#9dc4ab", textTransform: "uppercase", marginBottom: 10 }}>Family Bundle Deal</div>
            <h2 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 26 : 34, fontWeight: 900, color: "#fff", margin: "0 0 10px", lineHeight: 1.15 }}>
              Buy 4 Sets, Get 1 <span style={{ color: "#9dc4ab" }}>FREE</span>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0, maxWidth: 520 }}>
              Protect the whole family. Mix &amp; match men's, women's and kids' sets — the 4th set is on us, applied automatically at checkout.
            </p>
          </div>
          <Link to="/shop" style={{ background: "#fff", color: c.sageD, padding: "14px 32px", borderRadius: 8, fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
            Shop the Sets →
          </Link>
        </div>
      </section>

      {/* BESTSELLERS — 3 columns on desktop (was 4), 2 on mobile edge-to-edge */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 0" : "72px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: isMobile ? 16 : 0, paddingRight: isMobile ? 16 : 0 }}>
          <div style={{ ...LBL, marginBottom: 8 }}>OUR PICKS</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <h2 style={{ ...H2, margin: 0 }}>Best Sellers</h2>
            <Link to="/shop" style={{ fontSize: 13, color: c.sage, textDecoration: "none", fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 8 : 20
          }}>
            {bestsellers.slice(0, isMobile ? 4 : 3).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* GEAR UP — uitgelichte accessoires */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 0" : "72px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: isMobile ? 16 : 0, paddingRight: isMobile ? 16 : 0 }}>
          <div style={{ ...LBL, marginBottom: 8 }}>COMPLETE YOUR KIT</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <h2 style={{ ...H2, margin: 0 }}>Gear that goes with you</h2>
            <Link to="/accessories" style={{ fontSize: 13, color: c.sage, textDecoration: "none", fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 8 : 20
          }}>
            {products.filter((p) => p.category === "ACCESSORIES").slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>HOW IT WORKS</div>
          <h2 style={{ ...H2, marginBottom: 40 }}>The science is simple</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)", gap: 28 }}>
            {[
              { step: "01", title: "Put it on", desc: "Slip on the lightweight mesh suit as a base layer under your regular clothes." },
              { step: "02", title: "Physical barrier", desc: "The ultra-fine noseeum mesh creates a physical barrier — ticks and insects simply can't get through." },
              { step: "03", title: "Sealed at the foot", desc: "The pant leg and foot cover are one continuous piece — no gap, no entry point at the ankle." },
              { step: "04", title: "Enjoy nature freely", desc: "Hike, garden, camp — no sprays, no worry, just comfort and protection all day." },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 32, color: c.sageL, marginBottom: 12 }}>{step}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{title}</div>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEE IT IN ACTION VIDEO — unchanged per spec */}
      <section style={{ background: "#1a2e24", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...LBL, color: c.sageL, marginBottom: 8 }}>SEE IT IN ACTION</div>
          <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 28 : 36, color: "#fff", marginBottom: 32 }}>Watch it in the wild</h2>
          <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 16, maxHeight: 480, objectFit: "cover" }}>
            <source src="/videos/see-in-action.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* WHO IS IT FOR — Hikers + Families updated, Gardeners unchanged */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>WHO IS IT FOR</div>
          <h2 style={{ ...H2, marginBottom: 36 }}>Designed for outdoor life</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 12 : 24 }}>
            {[
              { label: "Hikers", icon: "🥾", desc: "Hours in the forest without constantly checking for ticks. Focus on the trail, not the bugs.", img: "/images/2 guys  _ white and black mesh_ hiking.png", link: "/hiking" },
              { label: "Gardeners", icon: "🌿", desc: "Weeding, planting, pruning — tick territory. Bug Away lets you garden without worry.", img: "/images/jacket-women-lifestyle-gardening.jpg", link: "/gardening" },
              { label: "Anglers", icon: "🎣", desc: "Standing still in wet ground at dusk. Everything that bites lives where the fish are.", img: "/images/2 males _ Black MEesh _ Fly fishing.png", link: "/fishing" },
              { label: "Families", icon: "👨‍👩‍👧", desc: "Kids playing in tall grass or exploring nature — protected without any chemical sprays.", img: "/images/Family .png", link: "/families" },
            ].map(({ label, icon, desc, img, link }) => (
              <Link key={label} to={link} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ background: "#F7F9F8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", transition: "transform .2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}
                >
                  <div style={{ height: isMobile ? 130 : 180, overflow: "hidden" }}>
                    <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: isMobile ? 14 : 20 }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{label} →</div>
                    <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TICK AWARENESS VIDEO */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>TICK AWARENESS</div>
          <h2 style={{ ...H2, marginBottom: 32 }}>Know your risk</h2>
          <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 16, maxHeight: 480, objectFit: "cover" }}>
            <source src="/videos/lyme-awareness.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* DISEASE INFO */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>HEALTH & SAFETY</div>
          <h2 style={{ ...H2, marginBottom: 36 }}>Diseases ticks carry</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 20 }}>
            {DISEASES.map(({ name, severity, color, desc }) => (
              <div key={name} style={{ background: "#F7F9F8", borderRadius: 16, padding: 24, borderLeft: `4px solid ${color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
                  <span style={{ background: color + "20", color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 8 }}>{severity}</span>
                </div>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36, background: c.sage, borderRadius: 16, padding: isMobile ? "28px 20px" : "36px 40px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 6 }}>Don't leave it to chance</div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, margin: 0 }}>Bug Away gives you physical tick protection — no chemicals, no sprays, no compromise.</p>
            </div>
            <Link to="/shop" style={{ ...BTN, background: "#fff", color: c.sageD, whiteSpace: "nowrap", flexShrink: 0, textDecoration: "none", display: "inline-block" }}>Shop Now</Link>
          </div>
          <p style={{ fontSize: 11, color: "#999", marginTop: 16, lineHeight: 1.5 }}>Bug Away is a physical barrier garment designed to prevent insect bites. It is not a medical device and does not prevent or treat tick-borne illness. If you suspect a tick-borne infection, consult a healthcare professional.</p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>WHY BUG AWAY</div>
          <h2 style={{ ...H2, marginBottom: 36 }}>How we compare</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: c.sageD, color: "#fff" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderRadius: "8px 0 0 0" }}>Feature</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 900 }}>Bug Away</th>
                  <th style={{ padding: "12px 16px", textAlign: "center" }}>DEET Spray</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", borderRadius: "0 8px 0 0" }}>Permethrin Clothing</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Chemical-free", "✅ Yes", "❌ No", "❌ No"],
                  ["Reapplication needed", "✅ Never", "❌ Every 2 hours", "❌ Every 5-6 washes"],
                  ["Safe for kids", "✅ Yes", "⚠️ Limited", "❌ Not recommended"],
                  ["Physical barrier", "✅ Yes", "❌ No", "❌ No"],
                  ["Lasts for years", "✅ Yes", "❌ Single use", "⚠️ Degrades over time"],
                  ["Breathable", "✅ Ultra-light mesh", "N/A", "⚠️ Treated regular fabric"],
                  ["Damages gear", "✅ No", "❌ Dissolves synthetics", "⚠️ Can stain"],
                  ["Cost per season", "✅ One purchase", "❌ $40-80/season", "❌ $30-60/season"],
                ].map(([feature, ba, deet, perm], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#F7F9F8" : "#fff" }}>
                    <td style={{ padding: "10px 16px", fontWeight: 600 }}>{feature}</td>
                    <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: 700, color: c.sageD }}>{ba}</td>
                    <td style={{ padding: "10px 16px", textAlign: "center", color: "#666" }}>{deet}</td>
                    <td style={{ padding: "10px 16px", textAlign: "center", color: "#666" }}>{perm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link to="/shop" style={{ ...BTN, fontSize: 15, padding: "14px 32px", display: "inline-block", textDecoration: "none" }}>Shop Bug Away</Link>
          </div>
        </div>
      </section>

      {/* REVIEWS SLIDER */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 0" : "72px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>REVIEWS</div>
          <h2 style={{ ...H2, marginBottom: 36 }}>What our customers say</h2>
        </div>
        <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 12, paddingLeft: isMobile ? 20 : 40, paddingRight: isMobile ? 20 : 40, scrollbarWidth: "none", msOverflowStyle: "none", WebkitScrollbar: "none" }}>
          {TESTIMONIALS.map(({ name, stars, text, location }) => (
            <div key={name} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", minWidth: isMobile ? 280 : 340, maxWidth: isMobile ? 280 : 340, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: c.sage, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, fontWeight: 900, color: "#fff" }}>
                  {name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{name}</div>
                  <div style={{ fontSize: 12, color: "#999" }}>{location}</div>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>{Array(stars).fill(0).map((_, i) => <Star key={i} />)}</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#444", margin: 0, fontStyle: "italic" }}>"{text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <div style={{ ...LBL, marginBottom: 8 }}>KNOWLEDGE BASE</div>
              <h2 style={{ ...H2, margin: 0 }}>Learn about tick protection</h2>
            </div>
            <Link to="/blog" style={{ fontSize: 13, color: c.sage, textDecoration: "none", fontWeight: 600 }}>All articles →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24 }}>
            {[
              { cat: "EDUCATION", title: "Tick Season 2025: When Are Ticks Most Active?", excerpt: "Ticks become active as soon as temperatures rise above 7°C. Find out when the risk is highest and how to protect yourself.", img: "/images/proof-ticks.jpg" },
              { cat: "HEALTH", title: "How to Recognize a Tick Bite and What to Do", excerpt: "Not every tick bite leads to Lyme disease. But knowing what to do immediately after a bite can make all the difference.", img: "/images/proof-mosquito.jpg" },
              { cat: "PETS", title: "Ticks and Dogs: Risks and How to Protect Your Pet", excerpt: "Dogs face the exact same tick risks as humans. Discover how to protect your dog this outdoor season.", img: "/images/pants-detail-feet-grass.jpg" },
            ].map(({ cat, title, excerpt, img }) => (
              <Link key={title} to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ background: "#F0F5F2", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", transition: "transform .2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}
                >
                  <div style={{ height: 160, overflow: "hidden" }}>
                    <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: c.sage, marginBottom: 8 }}>{cat}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, lineHeight: 1.4 }}>{title}</div>
                    <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, margin: "0 0 12px" }}>{excerpt}</p>
                    <span style={{ fontSize: 13, color: c.sage, fontWeight: 600 }}>Read more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
