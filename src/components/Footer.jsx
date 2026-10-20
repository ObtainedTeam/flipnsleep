import { Link } from 'react-router-dom';
import { c, rv, FONT_SUB, R, T, LH, SP, W, CHIP } from '../theme';
import { IMG, dim, PRODUCT, products } from '../data';
import { NewsletterSignup } from './Blocks';

const HEAD = { fontFamily: FONT_SUB, fontSize: T.xs[0], fontWeight: 600, marginBottom: 14, color: c.amber, letterSpacing: '0.08em', textTransform: 'uppercase' };
const LINK = { display: 'block', color: c.lilac, fontSize: T.sm[0], lineHeight: LH.head, marginBottom: 10 };
const LINE = '1px solid rgba(255,255,255,.14)';
const PILL = { ...CHIP, fontSize: T.xs[0], padding: '5px 12px', fontWeight: 600, background: 'rgba(255,255,255,.08)', color: c.white, border: '1px solid rgba(255,255,255,.18)' };

// Social-iconen (simpele lijn-SVG's, currentColor).
const SOCIAL = [
  ['Instagram', <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></>],
  ['Facebook', <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />],
  ['TikTok', <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6" />],
];

const COLS = [
  ['Shop', [
    [`/product/${PRODUCT.id}`, PRODUCT.name],
    ...products.map(p => [`/product/${p.id}`, p.name]),
    ['/shop', 'Pillow bundles'],
  ]],
  ['Learn', [
    ['/about', 'Our story'],
    ['/how-it-works', 'How it works'],
    ['/why-flipnsleep', "Why flip'nsleep"],
    ['/reviews', 'Reviews'],
    [null, 'Blog (coming soon)'],
  ]],
  ['Support', [
    ['/faq', 'FAQ'],
    ['/returns', 'Shipping & returns'],
    ['mailto:info@flipnsleep.com', 'Contact'],
    ['/privacy', 'Privacy policy'],
    ['/terms', 'Terms of service'],
  ]],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="r-pad r-mt" style={{ background: c.night, color: c.white, ...rv('pad', '64px 40px 32px', '48px 20px 28px'), ...rv('mt', 64, 48) }}>
      <div style={{ maxWidth: W.page, margin: '0 auto' }}>
        {/* Nieuwsbrief */}
        <div className="r-pad" style={{ borderBottom: LINE, ...rv('pad', '0 0 48px', '0 0 36px') }}>
          <NewsletterSignup />
        </div>

        {/* Merk + kolommen */}
        <div className="foot-grid r-pad" style={rv('pad', '48px 0', '36px 0')}>
          <div className="foot-brand">
            <img src={IMG.logoFull} {...dim(IMG.logoFull)} loading="lazy" decoding="async" alt="flip'nsleep" className="r-h" style={{ ...rv('h', 44, 36), width: 'auto', display: 'block' }} />
            <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.lilac, margin: '16px 0 20px', maxWidth: 300 }}>
              Cooling pillows and bedding for hot sleepers. Free shipping across the US and Canada, with 100 nights to decide.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {/* TODO: echte social-URL's invullen zodra de accounts live zijn */}
              {SOCIAL.map(([label, icon]) => (
                <a key={label} href="#" aria-label={label} style={{ width: 40, height: 40, borderRadius: R.pill, border: '1px solid rgba(255,255,255,.25)', color: c.white, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
                </a>
              ))}
            </div>
          </div>
          {COLS.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h3 style={HEAD}>{title}</h3>
              {links.map(([to, label]) => {
                if (!to) return <span key={label} style={{ ...LINK, color: c.gray }}>{label}</span>;
                if (to.startsWith('mailto:')) return <a key={label} href={to} className="foot-link" style={LINK}>{label}</a>;
                return <Link key={label} to={to} className="foot-link" style={LINK}>{label}</Link>;
              })}
            </nav>
          ))}
        </div>

        {/* Onderbalk */}
        <div className="foot-bottom" style={{ borderTop: LINE, paddingTop: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} aria-label="Accepted payment methods">
            {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Shop Pay'].map(p => <span key={p} style={PILL}>{p}</span>)}
            <span style={{ ...PILL, background: 'transparent', color: c.lilac }}>OEKO-TEX &amp; CertiPUR-US certified</span>
          </div>
          <p style={{ fontSize: T.xs[0], lineHeight: LH.body, color: c.gray }}>© {year} flip'nsleep · flip'nsleep is part of Obtained VOF</p>
        </div>
      </div>
    </footer>
  );
}
