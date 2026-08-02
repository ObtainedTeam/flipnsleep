import { Link } from 'react-router-dom';
import { c } from '../theme';

const cols = [
  { head:"Collection", links:[{l:"Men",to:"/shop/men"},{l:"Women",to:"/shop/women"},{l:"Kids",to:"/shop/kids"},{l:"Bundles",to:"/shop/bundles"},{l:"Extras",to:"/shop/extras"}] },
  { head:"Info", links:[{l:"How It Works",to:"/how-it-works"},{l:"Ticks & Lyme",to:"/blog"},{l:"Size Guide",to:"/faq"},{l:"FAQ",to:"/faq"},{l:"Reviews",to:"/reviews"}] },
  { head:"Service", links:[{l:"Shipping",to:"/faq"},{l:"Returns",to:"/faq"},{l:"Contact",to:"/about"},{l:"Reviews",to:"/shop"}] },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-root { padding: 48px 60px 32px; }
        .ft-grid { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        .ft-brand { grid-column: auto; }
        .ft-news { flex-direction: row; align-items: center; }
        .ft-form { width: auto; }
        .ft-input { min-width: 220px; }
        .ft-bot { flex-direction: row; align-items: center; gap: 0; }
        @media (max-width: 767px) {
          .ft-root { padding: 36px 20px 24px; }
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          .ft-brand { grid-column: 1/-1; }
          .ft-news { flex-direction: column; align-items: flex-start; }
          .ft-form { width: 100%; }
          .ft-input { min-width: 0; }
          .ft-bot { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>
    <footer className="ft-root" style={{ background:c.dark, color:c.mist }}>
      <div className="ft-grid" style={{ display:"grid", marginBottom:32 }}>
        {/* Brand */}
        <div className="ft-brand">
          <Link to="/" style={{ fontSize:19, fontWeight:800, letterSpacing:"0.1em", color:"#fff", textTransform:"uppercase", textDecoration:"none", display:"block", marginBottom:14 }}>Bug Away</Link>
          <p style={{ fontSize:13, lineHeight:1.7, color:c.gray, fontFamily:"'Poppins',sans-serif", maxWidth:240, marginBottom:16 }}>
            Insecticide-free protection against ticks and mosquitoes. For hikers, families and everyone who enjoys the outdoors.
          </p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["♻️ Eco","🌿 Chemical-free","🐝 Bee-safe"].map((t,i)=>(
              <span key={i} style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.sage, background:"rgba(255,255,255,0.07)", borderRadius:12, padding:"3px 10px" }}>{t}</span>
            ))}
          </div>
          {/* Social */}
          <div style={{ display:"flex", gap:12, marginTop:20 }}>
            {[{icon:"📸",label:"Instagram"},{icon:"▶️",label:"TikTok"},{icon:"👥",label:"Facebook"}].map((s,i)=>(
              <div key={i} style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14 }}>
                {s.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {cols.map((col,i)=>(
          <div key={i}>
            <div style={{ fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", color:c.sage, fontFamily:"'Poppins',sans-serif", fontWeight:700, marginBottom:14 }}>{col.head}</div>
            {col.links.map(l=>(
              <Link key={l.l} to={l.to} style={{ fontSize:12, color:c.gray, fontFamily:"'Poppins',sans-serif", marginBottom:10, cursor:"pointer", display:"block", textDecoration:"none" }}>{l.l}</Link>
            ))}
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div style={{ borderTop:`1px solid rgba(255,255,255,0.08)`, borderBottom:`1px solid rgba(255,255,255,0.08)`, padding:"24px 0", marginBottom:24 }}>
        <div className="ft-news" style={{ display:"flex", justifyContent:"space-between", gap:16 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:4 }}>Stay protected this season</div>
            <div style={{ fontSize:12, color:c.gray, fontFamily:"'Poppins',sans-serif" }}>Tick alerts, tips and exclusive offers — no spam.</div>
          </div>
          <div className="ft-form" style={{ display:"flex", gap:8 }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{ flex:1, padding:"10px 16px", borderRadius:4, border:`1px solid rgba(255,255,255,0.15)`, background:"rgba(255,255,255,0.08)", color:"#fff", fontFamily:"'Poppins',sans-serif", fontSize:12, outline:"none", minWidth:0 }} className="ft-input"
            />
            <button style={{ background:c.sageD, color:"#fff", border:"none", borderRadius:4, padding:"10px 20px", fontSize:11, fontFamily:"'Poppins',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft-bot" style={{ display:"flex", justifyContent:"space-between" }}>
        <span style={{ fontSize:11, color:c.grayD, fontFamily:"'Poppins',sans-serif" }}>© 2025 Bug Away. All rights reserved.</span>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap", alignItems:"center" }}>
          <Link to="/privacy" style={{ fontSize:11, color:c.grayD, fontFamily:"'Poppins',sans-serif", textDecoration:"none" }}>Privacy</Link>
          <Link to="/returns" style={{ fontSize:11, color:c.grayD, fontFamily:"'Poppins',sans-serif", textDecoration:"none" }}>Returns</Link>
          <Link to="/terms" style={{ fontSize:11, color:c.grayD, fontFamily:"'Poppins',sans-serif", textDecoration:"none" }}>Terms</Link>
          {["Visa","Mastercard","iDEAL","PayPal"].map(m=><span key={m} style={{ fontSize:11, color:c.grayD, fontFamily:"'Poppins',sans-serif" }}>{m}</span>)}
        </div>
      </div>
    </footer>
    </>
  );
}
