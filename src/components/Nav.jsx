import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { c, useIsMobile, FONT_DISPLAY, FONT_SUB } from '../theme';
import { CartContext } from './Cart';
import { IMG } from '../data';

const LINKS = [
  ['/', 'Home'],
  ['/shop', 'Shop'],
  ['/how-it-works', 'How it works'],
  ['/why-flipnsleep', "Why flip'nsleep"],
  ['/faq', 'FAQ'],
  ['/about', 'Our story'],
];

export default function Nav({ onCartOpen }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(CartContext.count());
  const loc = useLocation();

  useEffect(() => {
    const update = () => setCount(CartContext.count());
    CartContext.subscribe(update);
    return () => CartContext.unsubscribe(update);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <>
      {/* Announcement bar */}
      <div style={{ background: c.navy, overflow: 'hidden', whiteSpace: 'nowrap' }} aria-hidden="true">
        <div style={{ display: 'inline-block', padding: '7px 0', color: c.amber, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em', animation: 'fnsslide 22s linear infinite' }}>
          {Array(2).fill('☁️ FREE SHIPPING ON EVERY ORDER · ☁️ 100-NIGHT SLEEP TRIAL · ☁️ ORDERED BEFORE 11PM, SHIPPED TODAY · ').join('')}
        </div>
        <style>{`@keyframes fnsslide { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      <header style={{ background: c.navy, position: 'sticky', top: 0, zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '12px 16px' : '14px 40px' }}>
        {isMobile ? (
          <button aria-label="Menu" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}>
            <i style={{ width: 22, height: 3, background: '#fff', borderRadius: 2, display: 'block' }} />
            <i style={{ width: 22, height: 3, background: '#fff', borderRadius: 2, display: 'block' }} />
            <i style={{ width: 22, height: 3, background: '#fff', borderRadius: 2, display: 'block' }} />
          </button>
        ) : (
          <nav style={{ display: 'flex', gap: 26 }}>
            {LINKS.map(([to, label]) => (
              <Link key={to} to={to} style={{ color: loc.pathname === to ? c.amber : '#fff', textDecoration: 'none', fontFamily: FONT_SUB, fontSize: 13, letterSpacing: '0.06em' }}>{label}</Link>
            ))}
          </nav>
        )}

        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={IMG.logoMark} alt="" style={{ height: 30, width: 'auto' }} />
          <span style={{ color: '#fff', fontFamily: FONT_DISPLAY, fontSize: 22, letterSpacing: '-0.02em' }}>flip<span style={{ color: c.amber }}>'</span>nsleep</span>
        </Link>

        <button aria-label="Cart" onClick={onCartOpen} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', fontSize: 22, color: '#fff' }}>
          🛒
          {count > 0 && (
            <b style={{ position: 'absolute', top: -6, right: -10, background: c.amber, color: c.navy, fontSize: 10, borderRadius: 10, padding: '1px 6px', fontFamily: 'Poppins, sans-serif' }}>{count}</b>
          )}
        </button>
      </header>

      {isMobile && open && (
        <nav style={{ position: 'sticky', top: 55, zIndex: 89, background: c.navy, borderTop: '1px solid rgba(255,255,255,.12)', padding: '10px 0 16px' }}>
          {LINKS.map(([to, label]) => (
            <Link key={to} to={to} style={{ display: 'block', padding: '11px 24px', color: loc.pathname === to ? c.amber : '#fff', textDecoration: 'none', fontFamily: FONT_SUB, fontSize: 15 }}>{label}</Link>
          ))}
        </nav>
      )}
    </>
  );
}
