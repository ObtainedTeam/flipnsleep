import { Link } from 'react-router-dom';
import { HERO } from '../data/home-content';
import { IMG, dim } from '../data';
import { Cloud, CloudEdge, Ico } from './Sky';

// Black Friday-hero: de foto van de drie slapers is de achtergrond, de tekst
// staat er in code overheen. De foto heeft links een effen hemelvlak dat
// overloopt in het beeld; de hero krijgt dezelfde kleur, zodat de foto
// naadloos aansluit. Op mobiel een uitsnede rechts van de foto onder de tekst.
// Zwevende wolken, maan, het 1+1-wolkje en de wolkenrand blijven.
const SET = (name, widths, ext) => widths.map(w => `/images/${name}-${w}.${ext} ${w}w`).join(', ');
const MOBILE = '(max-width: 899px)';

export default function HomeHero() {
  return (
    <section className="sk-hero-sec"><div className="sk-wrap">
      <div className="sk-hero is-bf">
        <picture className="sk-bf-photo" aria-hidden="true">
          <source media={MOBILE} type="image/avif" srcSet={SET('hero-bf-m', [640, 960, 1280], 'avif')} sizes="100vw" />
          <source media={MOBILE} type="image/webp" srcSet={SET('hero-bf-m', [640, 960, 1280], 'webp')} sizes="100vw" />
          <source type="image/avif" srcSet={SET('hero-bf', [960, 1600, 2576], 'avif')} sizes="(max-width: 1280px) 140vw, 1700px" />
          <source type="image/webp" srcSet={SET('hero-bf', [960, 1600, 2576], 'webp')} sizes="(max-width: 1280px) 140vw, 1700px" />
          <img src="/images/hero-bf-1600.webp" width="2576" height="818" fetchPriority="high" decoding="async" alt="" />
        </picture>

        <div className="sk-hero-copy">
          <ul className="sk-bf-checks">
            {HERO.checks.map(t => <li key={t}><span><Ico name="check" size={14} /></span>{t}</li>)}
          </ul>
          <p className="sk-bf-eyebrow">{HERO.eyebrow}</p>
          <h1 className="sk-h1 sk-bf-title">{HERO.title[0]}<br />{HERO.title[1]}</h1>
          <p className="sk-lead sk-bf-sub">{HERO.sub[0]}<br />{HERO.sub[1]}</p>
          <div className="sk-hero-cta">
            <Link className="sk-btn" to={HERO.cta.to}>{HERO.cta.label}</Link>
          </div>
        </div>

        <div className="sk-bf-deco" aria-hidden="true">
          <Cloud className="is-c1 sk-drift" />
          <Cloud className="is-c2 sk-drift" />
          <img className="is-moon sk-rock" src={IMG.logoMark} {...dim(IMG.logoMark)} decoding="async" alt="" />
          <span className="sk-sticker sk-bob"><Cloud /><b>1+1 free</b></span>
        </div>
        <CloudEdge className="sk-hero-strip" color="var(--sky)" back="#c0e5ff" face />
      </div>
    </div></section>
  );
}
