import { useState, useEffect } from 'react';
import { c, BTN, FONT_DISPLAY } from '../theme';
import { IMG } from '../data';

// Exit-intent: herinner aan de 1+1 en de proefperiode. Eén keer per sessie.
export default function ExitPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('fns_exit_seen')) return;
    const handler = (e) => {
      if (e.clientY <= 0) {
        setShow(true);
        try { sessionStorage.setItem('fns_exit_seen', '1'); } catch { /* ignore */ }
        document.removeEventListener('mouseleave', handler);
      }
    };
    document.addEventListener('mouseleave', handler);
    return () => document.removeEventListener('mouseleave', handler);
  }, []);

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={() => setShow(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(20,16,64,.6)' }} />
      <div style={{ position: 'relative', background: c.navy, color: '#fff', borderRadius: 24, padding: '36px 30px', maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(20,16,64,.5)' }}>
        <button onClick={() => setShow(false)} aria-label="Close" style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#fff' }}>×</button>
        <img src={IMG.icon1p1} alt="1+1 free" style={{ height: 64, marginBottom: 12 }} />
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, marginBottom: 10 }}>Leaving already?</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#DDD9FF', marginBottom: 18 }}>The 1+1 deal means two pillows for the price of one — and you can try them for 100 nights, risk-free. Nothing to lose but the night sweats.</p>
        <a href="/product/signature-cold-pillow" onClick={() => setShow(false)} style={BTN}>Claim my 1+1 deal</a>
      </div>
    </div>
  );
}
