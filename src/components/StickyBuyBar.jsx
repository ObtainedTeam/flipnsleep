import { useState, useEffect } from 'react';
import { c, SH, T, LH, BTN, FONT_SUB } from '../theme';

// Mobiele sticky koopbalk. Verschijnt pas als de hoofdknop (targetRef) boven
// uit beeld is gescrold. Eerste render is altijd verborgen, dus SSR en client
// leveren dezelfde HTML; zichtbaarheid komt uit een IntersectionObserver.
export default function StickyBuyBar({ targetRef, name, price, onAdd, disabled = false, label = 'Add to cart' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = targetRef && targetRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    // De root loopt ver onder het scherm door: het doel 'snijdt' zolang het in
    // of onder beeld staat, en valt pas weg als het boven uit beeld is. Zo vuurt
    // de observer ook bij een sprong (anker, scrollTo) van onder naar boven.
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { rootMargin: '0px 0px 100000px 0px' });
    io.observe(el);
    document.body.classList.add('has-sticky-buy');
    return () => { io.disconnect(); document.body.classList.remove('has-sticky-buy'); };
  }, [targetRef]);

  return (
    <div className="m-only" aria-hidden={!show} data-sticky-buy={show ? 'on' : 'off'}
      style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 80, background: c.white, boxShadow: SH.float,
        display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px calc(10px + env(safe-area-inset-bottom))',
        transform: show ? 'none' : 'translateY(110%)', visibility: show ? 'visible' : 'hidden',
        transition: show ? 'transform .25s ease, visibility 0s' : 'transform .25s ease, visibility 0s linear .25s',
      }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: T.sm[1], lineHeight: LH.head, color: c.navy, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ fontSize: T.sm[1], fontWeight: 700, color: c.purple }}>{price}</div>
      </div>
      <button type="button" onClick={onAdd} disabled={disabled} tabIndex={show ? 0 : -1}
        style={{ ...BTN, height: 46, padding: '0 22px', flexShrink: 0, opacity: disabled ? .5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>{label}</button>
    </div>
  );
}
