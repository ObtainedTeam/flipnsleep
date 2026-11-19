import { useState, useEffect } from 'react';
import { c, BTN, FONT_DISPLAY, R, SH, T, LH } from '../theme';
import { Cloud } from './Sky';

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
      <div style={{ position: 'relative', background: c.navy, color: c.white, borderRadius: 28, padding: '44px 28px 40px', maxWidth: 420, width: '100%', textAlign: 'center', boxShadow: SH.float }}>
        <button onClick={() => setShow(false)} aria-label="Close" style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: T.h3[0], cursor: 'pointer', color: c.white }}>×</button>
        <span className="sk-bob" style={{ position: 'relative', display: 'inline-grid', placeItems: 'center', width: 150, aspectRatio: '199 / 98', marginBottom: 16, '--r': '-5deg' }}><Cloud color={c.sky} style={{ position: 'absolute', inset: 0 }} /><b style={{ position: 'relative', fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: 17, lineHeight: 1, color: c.navy, paddingTop: 12 }}>1+1 free</b></span>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: T.h3[0], lineHeight: LH.head, fontWeight: 400, marginBottom: 12 }}>Leaving already?</h3>
        <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.lilac, marginBottom: 24 }}>Buy one pillow and get the second free, and you can try them for 100 nights, risk-free. Nothing to lose but the warm nights.</p>
        <a href="/product/signature-cold-pillow" onClick={() => setShow(false)} style={BTN}>Claim my deal</a>
      </div>
    </div>
  );
}
