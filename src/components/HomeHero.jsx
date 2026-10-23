import { useRef } from 'react';
import { useLazyVideo, videoHtml } from '../lazyVideo';
import { Link } from 'react-router-dom';
import { c, BTN, rv, FONT_DISPLAY, FONT_SUB, R, SH, T, LH, CHIP } from '../theme';
import { HERO } from '../data/home-content';

// Kleine lijn-iconen voor de trustrij in de hero.
const ICONS = {
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  truck: <><path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7" /><circle cx="7" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></>,
};

export default function HomeHero() {
  // Video pas na de paginalading: eerst telt de poster (LCP), daarna start de film.
  const ref = useRef(null);
  useLazyVideo(ref, { afterLoad: true });

  return (
    <section className="home-hero r-mh r-jc r-pad" style={{ ...rv('mh', 720, 600), display: 'flex', flexDirection: 'column', ...rv('jc', 'center', 'flex-start'), ...rv('pad', '50px 40px 120px', '40px 20px 84px'), position: 'relative', overflow: 'hidden' }}>
      {/* Achtergrondvideo: mobiel krijgt de kleine variant, geladen na de poster. */}
      <div ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html:
        videoHtml({ src: '/videos/hero.mp4', srcMobile: '/videos/hero-mobile.mp4' })
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
