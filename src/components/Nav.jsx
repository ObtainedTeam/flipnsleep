import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { c } from "../theme";
import { activities } from "../data/activities";

const NAV_LINKS = [
  { label: "How It Works", path: "/how-it-works" },
  { label: "Why Us", path: "/why-choose-us" },
  { label: "Blog", path: "/blog" },
  { label: "Reviews", path: "/reviews" },
  { label: "FAQ", path: "/faq" },
  { label: "About", path: "/about" },
];

// Afgeleid uit activities.js zodat de nav niet uit de pas loopt met de routes.
const ACTIVITY_DROPDOWN = activities.map(a => ({ label: a.nav, path: `/${a.slug}` }));

const SHOP_DROPDOWN = [
  { label: "All Products", path: "/shop" },
  { label: "Men", path: "/shop?cat=MEN" },
  { label: "Women", path: "/shop?cat=WOMEN" },
  { label: "Kids", path: "/shop?cat=KIDS" },
  { label: "Bundles", path: "/shop?cat=BUNDLES" },
  { label: "Pets — Coming Soon", path: "/pets" },
  { label: "Accessories", path: "/accessories" },
];

export default function Nav({ cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [actOpen, setActOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* Layout via CSS in plaats van useIsMobile. Reden: deze nav zit op elke
          geprerenderde pagina, en useIsMobile leest window.innerWidth, wat er
          tijdens het prerenderen niet is. Dan schrijft de server altijd de
          desktopnav weg en loopt een telefoon over de rand tot React hem
          corrigeert. Met media queries klopt de HTML meteen. */}
      <style>{`
        .nav-desk { display: flex; }
        .nav-burger { display: none; }
        .nav-mob { display: block; }
        @media (max-width: 767px) {
          .nav-desk { display: none; }
          .nav-burger { display: block; }
        }
        @media (min-width: 768px) {
          .nav-mob { display: none; }
        }
      `}</style>

      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: c.sage, color: "#fff", textAlign: "center", fontSize: 12, fontWeight: 600, padding: "8px 16px", letterSpacing: 0.5 }}>
        🌿 Free shipping over $150 in the US · Chemical-free · Eco-responsible
      </div>

      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e8ede9", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 60, gap: 32 }}>

          {/* LOGO */}
          <Link to="/" style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 18, color: c.sageD, textDecoration: "none", letterSpacing: "-0.02em", flexShrink: 0 }}>
            BUG AWAY
          </Link>

          <div className="nav-desk" style={{ alignItems: "center", gap: 4, flex: 1 }}>
              {/* SHOP DROPDOWN */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link to="/shop" style={{
                  textDecoration: "none", fontSize: 13, fontWeight: 700, padding: "8px 12px",
                  color: pathname === "/shop" ? c.sageD : "#555",
                  borderBottom: pathname === "/shop" ? `2px solid ${c.sageD}` : "2px solid transparent",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  SHOP <span style={{ fontSize: 10, opacity: 0.7 }}>▾</span>
                </Link>
                {shopOpen && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, background: "#fff",
                    borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "1px solid #e8ede9", minWidth: 180, overflow: "hidden", zIndex: 200,
                  }}>
                    {SHOP_DROPDOWN.map(({ label, path }) => (
                      <Link key={label} to={path} onClick={() => setShopOpen(false)} style={{
                        display: "block", padding: "10px 18px", textDecoration: "none",
                        fontSize: 13, fontWeight: 600, color: "#333",
                        borderBottom: "1px solid #f0f0f0",
                        transition: "background .15s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = "#F7F9F8"}
                        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTIVITIES DROPDOWN */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setActOpen(true)}
                onMouseLeave={() => setActOpen(false)}
              >
                <span style={{
                  fontSize: 13, fontWeight: 700, padding: "8px 12px", cursor: "pointer",
                  color: ACTIVITY_DROPDOWN.some(a => a.path === pathname) ? c.sageD : "#555",
                  borderBottom: ACTIVITY_DROPDOWN.some(a => a.path === pathname) ? `2px solid ${c.sageD}` : "2px solid transparent",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  ACTIVITIES <span style={{ fontSize: 10, opacity: 0.7 }}>▾</span>
                </span>
                {actOpen && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, background: "#fff",
                    borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "1px solid #e8ede9", minWidth: 160, overflow: "hidden", zIndex: 200,
                  }}>
                    {ACTIVITY_DROPDOWN.map(({ label, path }) => (
                      <Link key={label} to={path} onClick={() => setActOpen(false)} style={{
                        display: "block", padding: "10px 18px", textDecoration: "none",
                        fontSize: 13, fontWeight: 600, color: "#333", borderBottom: "1px solid #f0f0f0",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = "#F7F9F8"}
                        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* OTHER NAV LINKS */}
              {NAV_LINKS.map(({ label, path }) => (
                <Link key={label} to={path} style={{
                  textDecoration: "none", fontSize: 13, fontWeight: 700, padding: "8px 12px",
                  color: pathname === path ? c.sageD : "#555",
                  borderBottom: pathname === path ? `2px solid ${c.sageD}` : "2px solid transparent",
                  transition: "color .2s",
                }}>
                  {label.toUpperCase()}
                </Link>
              ))}
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
            {/* CART */}
            <button onClick={onCartOpen} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.sageD} strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: -4, right: -4, background: c.sageD, color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* HAMBURGER */}
              <button className="nav-burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <div style={{ width: 22, height: 2, background: "#333", marginBottom: 5, transition: "all .3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
                <div style={{ width: 22, height: 2, background: "#333", marginBottom: 5, opacity: menuOpen ? 0 : 1 }} />
                <div style={{ width: 22, height: 2, background: "#333", transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
              </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="nav-mob" style={{ background: "#fff", borderTop: "1px solid #e8ede9", padding: "16px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Collections</div>
            {SHOP_DROPDOWN.map(({ label, path }) => (
              <Link key={label} to={path} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "10px 0", fontSize: 14, fontWeight: 600, color: "#333", textDecoration: "none", borderBottom: "1px solid #f5f5f5" }}>
                {label}
              </Link>
            ))}
            <div style={{ fontSize: 11, fontWeight: 800, color: "#999", textTransform: "uppercase", letterSpacing: 1, margin: "16px 0 8px" }}>Activities</div>
            {ACTIVITY_DROPDOWN.map(({ label, path }) => (
              <Link key={label} to={path} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "10px 0", fontSize: 14, fontWeight: 600, color: "#333", textDecoration: "none", borderBottom: "1px solid #f5f5f5" }}>
                {label}
              </Link>
            ))}
            <div style={{ fontSize: 11, fontWeight: 800, color: "#999", textTransform: "uppercase", letterSpacing: 1, margin: "16px 0 8px" }}>More</div>
            {NAV_LINKS.map(({ label, path }) => (
              <Link key={label} to={path} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "10px 0", fontSize: 14, fontWeight: 600, color: "#333", textDecoration: "none", borderBottom: "1px solid #f5f5f5" }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
