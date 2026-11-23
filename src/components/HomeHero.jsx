import { Link } from 'react-router-dom';
import { HERO } from '../data/home-content';
import { IMG, BUNDLES, dim } from '../data';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { Cloud, CloudEdge } from './Sky';

// De kussenfoto: opnieuw geëxporteerd met lichte kleurcorrectie (zie
// scripts/grade-hero-pillows.py), in AVIF en WebP en vier breedtes.
const HERO_SET = (ext) => [640, 960, 1280, 1700].map(w => `/images/hero-pillows-${w}.${ext} ${w}w`).join(', ');
const HERO_SIZES = '(max-width: 899px) 84vw, 520px';

// Hero als papieren hemel, zoals op de productfoto's: één hemelkaart met de
// zwevende kussens, de maan, drijvende wolken en de wolkenrand onderaan.
// Geen video meer; het kussenbeeld is de LCP en laadt met voorrang.
export default function HomeHero() {
  const { symbol, isCA } = useCurrency();
  const deal = formatPrice(getPrice(BUNDLES[0], isCA), symbol);
  return (
    <section className="sk-hero-sec"><div className="sk-wrap">
      <div className="sk-hero">
        <div className="sk-hero-copy">
          <span className="sk-kicker">{HERO.eyebrow}</span>
          <h1 className="sk-h1">{HERO.title[0]}<br />{HERO.title[1]}</h1>
          <p className="sk-lead">{HERO.sub}</p>
          <div className="sk-hero-cta">
            <Link className="sk-btn" to={HERO.cta.to}>{HERO.cta.label}</Link>
            <Link className="sk-tlink" to={HERO.quiz.to}>{HERO.quiz.label}</Link>
          </div>
          <p className="sk-hero-note">Two pillows for {deal}, {HERO.note}</p>
        </div>
        <div className="sk-stage" aria-hidden="true">
          <i className="is-disc" />
          <Cloud className="is-c1 sk-drift" />
          <Cloud className="is-c2 sk-drift" />
          <img className="is-moon sk-rock" src={IMG.logoMark} {...dim(IMG.logoMark)} decoding="async" alt="" />
          <picture>
            <source type="image/avif" srcSet={HERO_SET('avif')} sizes={HERO_SIZES} />
            <source type="image/webp" srcSet={HERO_SET('webp')} sizes={HERO_SIZES} />
            <img className="is-pillows sk-bob" src="/images/hero-pillows-960.webp" width="1700" height="1364" fetchPriority="high" decoding="async" alt="" />
          </picture>
          <span className="sk-sticker sk-bob"><Cloud /><b>1+1 free</b></span>
        </div>
        <div className="sk-hero-pad" />
        <CloudEdge className="sk-hero-strip" color="var(--sky)" back="#c0e5ff" face />
      </div>
    </div></section>
  );
}
