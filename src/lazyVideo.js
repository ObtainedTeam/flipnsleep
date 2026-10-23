import { useEffect } from 'react';

// Achtergrondvideo's pas laden als ze nodig zijn. De markup heeft geen src
// (alleen data-src en eventueel data-src-mobile) en geen autoplay, zodat de
// browser bij paginalading alleen de poster ophaalt. Deze hook zet de juiste
// bron zodra de video in beeld komt; met { afterLoad: true } pas na de
// paginalading en een rustig moment (voor de hero, zodat de poster de LCP is).
export function startVideo(v) {
  if (!v || v.dataset.started) return;
  v.dataset.started = '1';
  const mobile = v.dataset.srcMobile && window.matchMedia('(max-width: 759px)').matches;
  v.src = mobile ? v.dataset.srcMobile : v.dataset.src;
  v.muted = true;
  const p = v.play();
  if (p && p.catch) p.catch(() => {});
}

export function useLazyVideo(ref, { afterLoad = false } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined; // alleen de poster
    // Video's steeds opnieuw opzoeken in de container: React kan de innerHTML
    // na de hydration vervangen, de container zelf blijft hetzelfde element.
    const start = () => root.querySelectorAll('video[data-src]').forEach(startVideo);
    let cancelled = false;

    if (afterLoad) {
      const go = () => {
        if (cancelled) return;
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
        idle(() => { if (!cancelled) start(); }, { timeout: 2500 });
      };
      if (document.readyState === 'complete') go();
      else window.addEventListener('load', go, { once: true });
      // iOS energiebesparing: start alsnog bij de eerste aanraking
      const kick = () => root.querySelectorAll('video[data-started]').forEach((v) => { if (v.paused) v.play().catch(() => {}); });
      window.addEventListener('touchstart', kick, { once: true, passive: true });
      return () => { cancelled = true; window.removeEventListener('load', go); window.removeEventListener('touchstart', kick); };
    }

    if (!('IntersectionObserver' in window)) { start(); return undefined; }
    let seen = false;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { seen = true; start(); }
    }, { rootMargin: '200px 0px' });
    io.observe(root);
    // Wordt de video na het starten vervangen (nieuwe innerHTML), start die dan ook.
    const mo = new MutationObserver(() => { if (seen) start(); });
    mo.observe(root, { childList: true, subtree: true });
    return () => { cancelled = true; io.disconnect(); mo.disconnect(); };
  }, [ref, afterLoad]);
}

// HTML-string voor een gedempte achtergrondvideo (via innerHTML, zodat de
// attributen ook in de geprerenderde HTML staan).
export function videoHtml({ src, srcMobile, poster, width, height }) {
  return `<video muted loop playsinline webkit-playsinline preload="none"` +
    (poster ? ` poster="${poster}"` : '') +
    (width ? ` width="${width}" height="${height}"` : '') +
    ` data-src="${src}"` + (srcMobile ? ` data-src-mobile="${srcMobile}"` : '') +
    ` style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>`;
}
