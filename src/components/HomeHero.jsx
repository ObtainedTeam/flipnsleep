import { Link } from 'react-router-dom';
import { Moon, Truck, ShieldCheck } from 'lucide-react';
import { c, BTN, rv, FONT_DISPLAY, FONT_SUB, T, LH } from '../theme';
import { HERO } from '../data/home-content';
import { IMG, dim, rs } from '../data';

const ICONS = { moon: Moon, truck: Truck, shield: ShieldCheck };

// Lichte hero: links de tekst op een zachtblauw vlak, rechts de slaapkamerfoto tot aan de rand.
export default function HomeHero() {
  return (
    <section className="home-hero2" style={{ background: c.tint }}>
      <div className="home-hero2-copy">
        <p style={{ fontFamily: FONT_SUB, fontSize: T.sm[0], color: c.grayD, margin: 0 }}>{HERO.eyebrow}</p>
        <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', 68, 42), color: c.navy, margin: '12px 0 20px', lineHeight: 1.04, letterSpacing: '-0.02em' }}>
          {HERO.title[0]}<br />{HERO.title[1]}
        </h1>
        <p className="r-fs" style={{ ...rv('fs', ...T.lg), lineHeight: LH.body, color: c.grayD, margin: '0 0 32px', maxWidth: 480 }}>
          {HERO.sub}
        </p>
        <div className="home-hero2-ctas">
          <Link to={HERO.cta.to} style={BTN}>{HERO.cta.label}</Link>
          <Link to={HERO.quiz.to} className="nav-link" style={{ color: c.navy, fontWeight: 600, fontSize: T.sm[0], padding: '12px 4px', textDecoration: 'underline', textUnderlineOffset: 4 }}>{HERO.quiz.label}</Link>
        </div>
        <ul className="home-hero2-trust" style={{ listStyle: 'none', padding: 0 }}>
          {HERO.trust.map(([icon, label]) => {
            const I = ICONS[icon];
            return (
              <li key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: c.navy, fontSize: T.sm[1], fontWeight: 500, whiteSpace: 'nowrap' }}>
                <I size={18} strokeWidth={1.5} aria-hidden="true" />{label}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="home-hero2-media">
        <img src={IMG.bed} {...dim(IMG.bed)} {...rs(IMG.bed, '(max-width: 767px) 100vw, 56vw')} fetchPriority="high" decoding="async" alt="The Signature Cold Pillow on a made bed in morning light" />
      </div>
    </section>
  );
}
