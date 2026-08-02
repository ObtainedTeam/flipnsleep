import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { c, useIsMobile, BTN, H2, LBL } from "../theme";
import { JUDGEME_REVIEW_FORM_URL } from "../judgeme";

export default function Reviews() {
  const isMobile = useIsMobile();
  const [data, setData] = useState(null); // { reviews, count, avg }

  useEffect(() => {
    fetch("/api/reviews").then((r) => r.json()).then(setData).catch(() => setData(null));
  }, []);

  const hasReviews = !!(data && data.count > 0);

  return (
    <div>
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>REVIEWS</div>
          <h1 style={{ ...H2, fontSize: isMobile ? 30 : 42, marginBottom: 14 }}>Real trails, real reviews</h1>
          <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Every review on this page is collected independently through Judge.me from verified Bug Away buyers. We can't edit them, hide them or make them up — and that's exactly the point.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff", padding: isMobile ? "36px 20px" : "48px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {hasReviews ? (
            <>
              <div style={{ textAlign: "center", marginBottom: 22 }}>
                <span style={{ color: "#E8A33D", fontSize: 22, letterSpacing: 2 }}>{"★".repeat(Math.round(data.avg))}</span>
                <span style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 20, color: c.sageD, marginLeft: 10 }}>{data.avg}</span>
                <span style={{ fontSize: 13, color: "#666", marginLeft: 8 }}>based on {data.count} verified review{data.count === 1 ? "" : "s"}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 14 }}>
                {data.reviews.map((r, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e8ede9", borderRadius: 16, padding: "20px 20px 16px" }}>
                    <div style={{ color: "#E8A33D", fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>{"★".repeat(r.rating)}<span style={{ color: "#e3e7e4" }}>{"★".repeat(5 - r.rating)}</span></div>
                    {r.title && <div style={{ fontWeight: 700, fontSize: 14.5, color: c.sageD, marginBottom: 6 }}>{r.title}</div>}
                    <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#555", marginBottom: 12 }}>{r.body}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#999" }}>
                      <b style={{ color: c.sageD }}>{r.name}</b>
                      <span>{r.verified ? "Verified buyer" : r.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ background: "#F7F9F8", borderRadius: 16, padding: isMobile ? "26px 20px" : "36px 34px", textAlign: "center" }}>
              <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 20 : 24, color: c.sageD, marginBottom: 10 }}>The first reviews are on their way</h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#666", maxWidth: 520, margin: "0 auto" }}>
                Bug Away customers are out on the trails right now. Every verified buyer automatically gets a review invitation, and as their reviews come in, they'll appear on this page — unfiltered. Until then, we'd rather show you no reviews than fake ones.
              </p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14, marginTop: 24 }}>
            {[
              ["🕸️", "Physical protection", "Ultra-fine noseeum mesh — a barrier ticks and insects simply can't get through. No sprays, no chemicals."],
              ["👨‍👩‍👧‍👦", "For the whole family", "Men's, women's and kids' sets — buy 4, and the 4th is free, applied automatically at checkout."],
              ["🚚", "Easy from day one", "Fast shipping from our US warehouse and free shipping on orders over $150."],
            ].map(([icon, t, d], i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e8ede9", borderRadius: 16, padding: "20px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: c.sageD, marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: "#666" }}>{d}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ fontSize: 14, color: "#666", margin: "0 auto 16px", maxWidth: 440 }}>
              Already exploring in your Bug Away gear? Your honest review helps other outdoor lovers find their way.
            </p>
            {JUDGEME_REVIEW_FORM_URL && (
              <a href={JUDGEME_REVIEW_FORM_URL} target="_blank" rel="noopener noreferrer" style={{ ...BTN, display: "inline-block", textDecoration: "none", marginBottom: 14 }}>Write a review</a>
            )}
            <div>
              <Link to="/shop" style={{ fontSize: 13, color: c.sage, textDecoration: "none", fontWeight: 600 }}>Shop the sets →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
