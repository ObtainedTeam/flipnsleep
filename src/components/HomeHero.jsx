import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, BTN, rv, FONT_DISPLAY, FONT_SUB, R, SH, T, LH, CHIP } from '../theme';
import { IMG } from '../data';
import { HERO } from '../data/home-content';

// Kleine lijn-iconen voor de trustrij in de hero.
const ICONS = {
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  truck: <><path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7" /><circle cx="7" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></>,
};

export default function HomeHero() {
  // iOS-vangnet: als autoplay geblokkeerd werd (bv. energiebesparende modus),
  // start de video alsnog bij de eerste aanraking of klik.
  useEffect(() => {
    // Vangnet voor browsers die het media-attribuut op <source> negeren (o.a.
    // Firefox): kies daar handmatig de mobiele video. Alleen DOM, dus hydration-veilig.
    const v0 = document.querySelector('.home-hero video');
    if (v0 && window.innerWidth < 760 && !/hero-mobile/.test(v0.currentSrc || '')) {
      v0.src = '/videos/hero-mobile.mp4';
    }
    const kick = () => {
      const v = document.querySelector('.home-hero video');
      if (v && v.paused) { v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
    };
    kick();
    window.addEventListener('touchstart', kick, { once: true, passive: true });
    window.addEventListener('click', kick, { once: true });
    return () => { window.removeEventListener('touchstart', kick); window.removeEventListener('click', kick); };
  }, []);

  return (
    <section className="home-hero r-mh r-jc r-pad" style={{ backgroundImage: `url(${IMG.heroPoster})`, backgroundSize: 'cover', backgroundPosition: 'center', ...rv('mh', 720, 600), display: 'flex', flexDirection: 'column', ...rv('jc', 'center', 'flex-start'), ...rv('pad', '50px 40px 120px', '40px 20px 84px'), position: 'relative', overflow: 'hidden' }}>
      {/* Achtergrondvideo: ongewijzigd. Mobiel krijgt de kleine variant via het media-attribuut. */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html:
        `<video autoplay muted loop playsinline webkit-playsinline preload="metadata" poster="${IMG.heroPoster}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:translateZ(0);backface-visibility:hidden">` +
        `<source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 759px)">` +
        `<source src="/videos/hero.mp4" type="video/mp4">` +
        `</video>`
      }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(20,16,64,0.30)' }} />
      {/* Extra verloop achter de linkse tekst (desktop) of onderin (mobiel) */}
      <div aria-hidden="true" className="home-hero-shade" />

      <div className="home-hero-inner" style={{ position: 'relative', width: '100%', maxWidth: 1100, margin: '0 auto' }}>
        <div className="home-hero-copy">
          <span style={{ ...CHIP, background: 'rgba(255,255,255,.16)', color: c.white, border: '1px solid rgba(255,255,255,.45)', fontSize: T.xs[0], letterSpacing: '0.04em', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', whiteSpace: 'normal' }}>
            {HERO.eyebrow}
          </span>
          <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', 64, 40), color: c.white, margin: '18px 0 16px', lineHeight: LH.tight, textShadow: SH.textHero }}>
            {HERO.title[0]}<br /><span style={{ color: c.amber }}>{HERO.title[1]}</span>
          </h1>
          <p className="r-fs home-hero-sub" style={{ ...rv('fs', ...T.lg), lineHeight: LH.body, color: c.white, textShadow: SH.textHero, fontFamily: FONT_SUB, margin: '0 0 28px' }}>
            {HERO.sub}
          </p>
          <div className="home-hero-ctas">
            <Link to={HERO.cta.to} style={BTN}>{HERO.cta.label}</Link>
            <Link to={HERO.quiz.to} className="nav-link" style={{ color: c.white, fontWeight: 700, fontSize: T.sm[0], letterSpacing: '0.06em', textTransform: 'uppercase', textShadow: SH.textHero, padding: '12px 4px' }}>{HERO.quiz.label}</Link>
          </div>
          <ul className="home-hero-trust" style={{ listStyle: 'none', margin: '28px 0 0', padding: 0 }}>
            {HERO.trust.map(([icon, label]) => (
              <li key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: c.white, fontSize: T.sm[0], fontWeight: 600, fontFamily: FONT_SUB, textShadow: SH.text, whiteSpace: 'nowrap' }}>
                <span aria-hidden="true" style={{ width: 30, height: 30, borderRadius: R.pill, background: 'rgba(255,255,255,.16)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[icon]}</svg>
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
