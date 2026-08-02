import { useRef, useState, useEffect } from 'react';

// Scroll-reveal: laat een blok zacht infaden (en weer uitfaden bij het
// uitscrollen). Gebruik: <Reveal>…</Reveal>, optioneel met delay (ms) voor
// cascade-effecten en y (px) voor de opschuifafstand.
// - Respecteert prefers-reduced-motion (dan geen animatie).
// - Server-side gerenderde HTML blijft volledig zichtbaar (SEO/no-JS);
//   de animatie activeert pas in de browser.
export default function Reveal({ children, delay = 0, y = 26, once = false, style = {} }) {
  const ref = useRef(null);
  const [state, setState] = useState('ssr'); // ssr | hidden | shown

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    setState('hidden');
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setState('shown');
        if (once) io.disconnect();
      } else if (!once) {
        setState('hidden');
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const hidden = state === 'hidden';
  return (
    <div ref={ref} style={{
      ...style,
      opacity: hidden ? 0 : 1,
      transform: hidden ? `translateY(${y}px)` : 'translateY(0)',
      transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      willChange: 'opacity, transform',
    }}>
      {children}
    </div>
  );
}
