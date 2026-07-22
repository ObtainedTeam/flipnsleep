import { useState, useEffect } from 'react';
import { c, BTN, FONT_DISPLAY } from '../theme';
import { subscribe } from '../brevo';
import { IMG } from '../data';

// Welkomstpopup: 10% op de eerste bestelling, gekoppeld aan Brevo.
export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | busy | done | error

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem('fns_news_seen')) return;
    const t = setTimeout(() => setShow(true), 14000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setShow(false);
    try { localStorage.setItem('fns_news_seen', '1'); } catch { /* ignore */ }
  };

  const submit = async (e) => {
    e.preventDefault();
    setState('busy');
    try {
      await subscribe(email, 'welcome10');
      setState('done');
    } catch {
      setState('error');
    }
  };

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(20,16,64,.6)' }} />
      <div style={{ position: 'relative', background: c.sky, borderRadius: 24, padding: '34px 28px', maxWidth: 380, width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(20,16,64,.4)' }}>
        <button onClick={close} aria-label="Close" style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: c.navy }}>×</button>
        <img src={IMG.iconCloud} alt="" style={{ height: 34, marginBottom: 10 }} />
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, marginBottom: 8, color: c.navy }}>Sleep better, pay less</h3>
        {state === 'done' ? (
          <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>Check your inbox — your 10% code is on its way. Sweet dreams!</p>
        ) : (
          <>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, marginBottom: 16 }}>Get 10% off your first order and our best tips for cooler nights.</p>
            <form onSubmit={submit} style={{ display: 'flex', background: '#fff', borderRadius: 999, padding: 5 }}>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address"
                style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'Poppins,sans-serif', fontSize: 13, padding: '10px 14px', color: c.navy, minWidth: 0, outline: 'none' }} />
              <button type="submit" disabled={state === 'busy'} style={{ ...BTN, padding: '10px 18px', fontSize: 12 }}>{state === 'busy' ? '…' : 'Get 10% off'}</button>
            </form>
            {state === 'error' && <p style={{ fontSize: 11.5, color: '#b3423f', marginTop: 8 }}>Something went wrong — please try again.</p>}
            <p style={{ fontSize: 10.5, color: c.grayD, marginTop: 10 }}>No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}
