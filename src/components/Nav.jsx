import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { c, FONT_SUB, FONT_DISPLAY, R, SH, T, LH, W, BTN, CHIP, CARD } from '../theme';
import { CartContext } from './Cart';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { IMG, PRODUCT, BUNDLES, productById, dim, rs } from '../data';

// Navigatie in cloudpillo-stijl: aankondigingsbalk + categoriemenu met
// dropdownpanelen (desktop) en een drawer met accordeon (mobiel/tablet).
// Desktop vs mobiel gaat uitsluitend via CSS (.nav-lg / .nav-sm in index.css),
// zodat server- en client-HTML identiek zijn.

const pillowCard = (isCA) => ({
  to: `/product/${PRODUCT.id}`, name: PRODUCT.name, img: IMG.coverFront,
  price: getPrice(BUNDLES[0], isCA), compare: isCA ? BUNDLES[0].compareAt.cad : BUNDLES[0].compareAt.usd,
  badge: 'Bestseller', from: true,
});
const bundleCard = (b, isCA) => ({
  to: `/product/${PRODUCT.id}`, name: b.short, sub: `${b.pillows} Signature Cold Pillows`, img: b.id === '2p2' ? IMG.coverDuo : b.image,
  price: getPrice(b, isCA), compare: isCA ? b.compareAt.cad : b.compareAt.usd,
  badge: b.id === '2p2' ? 'Best value' : 'Our deal',
});
const prodCard = (id, isCA) => {
  const p = productById(id);
  return {
    to: `/product/${p.id}`, name: p.name, img: p.images[0], price: getPrice(p, isCA),
    compare: p.compareAt ? (isCA ? p.compareAt.cad : p.compareAt.usd) : null, badge: p.badge || 'New', from: true, cover: true,
  };
};

// [key, label, intro, cards(isCA) | null (soon), soonImage]
const CATS = [
  { key: 'pillows', label: 'Pillows', intro: 'Adjustable, dual-sided and cool to the touch. Every order is buy one, get one free.', cards: (ca) => [pillowCard(ca), ...BUNDLES.map(b => bundleCard(b, ca))] },
  { key: 'comforters', label: 'Comforters', intro: 'Lightweight, double-sided cooling comforters for people who sleep hot.', cards: (ca) => [prodCard('cooling-comforter', ca)] },
  { key: 'blankets', label: 'Blankets', intro: 'Grounding weight in a breathable bamboo cover that does not trap heat.', cards: (ca) => [prodCard('cooling-weighted-blanket', ca)] },
  { key: 'sheets', label: 'Sheets', intro: 'Silky 400-thread-count bamboo that wicks moisture and sleeps cool.', cards: (ca) => [prodCard('bamboo-sheet-set', ca)] },
  { key: 'toppers', label: 'Toppers', soon: IMG.tileToppers },
  { key: 'silk', label: 'Silk Series', soon: IMG.tileSilk },
];

const SECONDARY = [['/about', 'Our story'], ['/quiz', 'Quiz'], ['/faq', 'Help']];

const LINE = `1px solid ${c.navy}1A`;
const SOON_CHIP = { ...CHIP, fontSize: T.xs[0], padding: '3px 8px', fontWeight: 600 };

// Nieuwsbrief: scroll naar het formulier op de pagina, of open de popup.
function openNewsletter(e) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById('newsletter');
  if (e) e.preventDefault();
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  else window.dispatchEvent(new Event('fns:newsletter'));
}

function BagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </svg>
  );
}

function Chevron({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ transition: 'transform .2s ease', transform: open ? 'rotate(180deg)' : 'none' }}>
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Price({ card, symbol, size = T.sm[0] }) {
  return (
    <span style={{ fontSize: size, fontWeight: 700, color: c.navy }}>
      {card.from ? 'From ' : ''}{formatPrice(card.price, symbol)}
      {card.compare && <s style={{ fontWeight: 400, color: c.gray, fontSize: T.xs[0], marginLeft: 6 }}>{formatPrice(card.compare, symbol)}</s>}
    </span>
  );
}

function PanelCard({ card, symbol, onPick }) {
  return (
    <Link to={card.to} onClick={onPick} className="card-hover" style={{ ...CARD, textDecoration: 'none', overflow: 'hidden', display: 'block' }}>
      <div style={{ position: 'relative', background: c.sky, height: 150 }}>
        <img src={card.img} {...dim(card.img)} {...rs(card.img, '180px')} loading="lazy" decoding="async" alt="" style={{ width: '100%', height: '100%', objectFit: card.cover ? 'cover' : 'contain', display: 'block', padding: card.cover ? 0 : 10 }} />
        <span style={{ ...CHIP, position: 'absolute', top: 10, left: 10, fontSize: T.xs[0], padding: '5px 10px', background: card.badge === 'Bestseller' ? c.amber : c.navy, color: card.badge === 'Bestseller' ? c.navy : c.white }}>{card.badge}</span>
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: T.sm[0], lineHeight: LH.head, color: c.navy, marginBottom: 4 }}>{card.name}</div>
        {card.sub && <div style={{ fontSize: T.xs[0], color: c.grayD, marginBottom: 4 }}>{card.sub}</div>}
        <Price card={card} symbol={symbol} />
      </div>
    </Link>
  );
}

export default function Nav({ onCartOpen }) {
  const { symbol, isCA } = useCurrency();
  const [drawer, setDrawer] = useState(false);
  const [acc, setAcc] = useState(null);          // mobiel accordeon
  const [openCat, setOpenCat] = useState(null);  // desktop dropdown
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState(CartContext.count());
  const loc = useLocation();
  const headerRef = useRef(null);
  const btnRefs = useRef({});
  const drawerRef = useRef(null);

  useEffect(() => {
    const update = () => setCount(CartContext.count());
    CartContext.subscribe(update);
    return () => CartContext.unsubscribe(update);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bij routewissel menu's sluiten (tijdens render, geen effect nodig)
  const [path, setPath] = useState(loc.pathname);
  if (path !== loc.pathname) { setPath(loc.pathname); setDrawer(false); setOpenCat(null); }

  // Dropdown: sluiten met Escape of klik buiten de header
  useEffect(() => {
    if (!openCat) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { const b = btnRefs.current[openCat]; setOpenCat(null); b && b.focus(); }
    };
    const onDown = (e) => { if (headerRef.current && !headerRef.current.contains(e.target)) setOpenCat(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, [openCat]);

  // Drawer: Escape sluit, body scrollt niet mee
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e) => { if (e.key === 'Escape') setDrawer(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = drawerRef.current && drawerRef.current.querySelector('button, a');
    first && first.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [drawer]);

  const close = () => setOpenCat(null);

  return (
    <>
      {/* Aankondigingsbalk: één regel, gecentreerd */}
      <div style={{ background: c.navy, color: c.white, textAlign: 'center', padding: '9px 16px', fontSize: T.sm[0], lineHeight: LH.head, fontFamily: FONT_SUB }}>
        <Link to={`/product/${PRODUCT.id}`} className="nav-link" style={{ color: c.white }}>
          <b style={{ color: c.amber, fontWeight: 600 }}>Buy 1, Get 1 Free</b> on the Signature Cold Pillow<span className="d-only" style={{ display: 'inline' }}> · Free shipping to the US &amp; Canada</span>
        </Link>
      </div>

      <header ref={headerRef} onMouseLeave={close}
        style={{ position: 'sticky', top: 0, zIndex: 90, background: `${c.navy}EB`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: scrolled ? SH.card : 'none', transition: 'box-shadow .2s ease' }}>
        <div className="nav-bar" style={{ maxWidth: W.page + 80, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="nav-sm" aria-label="Open menu" aria-expanded={drawer} aria-controls="nav-drawer" onClick={() => setDrawer(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 8, marginLeft: -8 }}>
            {[0, 1, 2].map(i => <i key={i} style={{ width: 22, height: 2, background: c.white, borderRadius: R.pill, display: 'block' }} />)}
          </button>

          <Link to="/" onMouseEnter={close} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src={IMG.logoFull} {...dim(IMG.logoFull)} decoding="async" alt="flip'nsleep" className="nav-logo" style={{ width: 'auto' }} />
          </Link>

          {/* Desktop categorieën */}
          <nav className="nav-lg" aria-label="Shop by category" style={{ flex: 1, justifyContent: 'center' }}>
            <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: 0 }}>
              {CATS.map(cat => {
                const open = openCat === cat.key;
                return (
                  <li key={cat.key}>
                    <button ref={el => { btnRefs.current[cat.key] = el; }} type="button"
                      aria-expanded={open} aria-controls={`nav-panel-${cat.key}`}
                      onMouseEnter={() => setOpenCat(cat.key)}
                      onClick={(e) => setOpenCat(open && e.detail === 0 ? null : cat.key)}
                      className="nav-cat"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '10px 10px', borderRadius: R.pill, color: open ? c.amber : c.white, fontFamily: FONT_SUB, fontSize: T.sm[0], letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                      {cat.label}
                      {cat.soon && <span style={{ ...SOON_CHIP, background: `${c.white}24`, color: c.white }}>Soon</span>}
                      <Chevron open={open} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginLeft: 'auto' }} onMouseEnter={close}>
            <div className="nav-lg" style={{ gap: 20 }}>
              {SECONDARY.map(([to, label]) => (
                <Link key={to} to={to} className="nav-link" style={{ color: loc.pathname === to ? c.amber : c.white, fontFamily: FONT_SUB, fontSize: T.sm[0], letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{label}</Link>
              ))}
            </div>
            <button aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`} onClick={onCartOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', color: c.white, display: 'flex', padding: 6, marginRight: -6 }}>
              <BagIcon />
              {count > 0 && (
                <b style={{ position: 'absolute', top: -2, right: -4, minWidth: 18, height: 18, padding: '0 5px', background: c.amber, color: c.navy, fontSize: T.xs[0], lineHeight: 1, borderRadius: R.pill, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_SUB }}>{count}</b>
              )}
            </button>
          </div>
        </div>

        {/* Dropdownpanelen (desktop) */}
        <div className="nav-lg" style={{ position: 'absolute', top: '100%', left: 0, right: 0, justifyContent: 'center', pointerEvents: 'none' }}>
          {CATS.map(cat => {
            const open = openCat === cat.key;
            const cards = cat.soon ? [] : cat.cards(isCA);
            const pw = cat.soon ? W.narrow : (cards.length > 1 ? W.page : W.text);
            return (
              <div key={cat.key} id={`nav-panel-${cat.key}`} className={`nav-panel${open ? ' is-open' : ''}`} role="region" aria-label={cat.label}
                style={{ position: 'absolute', top: 0, width: `min(${pw}px, calc(100% - 48px))`, paddingTop: 10 }}>
                <div style={{ background: c.white, borderRadius: R.lg, boxShadow: SH.float, padding: 24 }}>
                  {cat.soon ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <img src={cat.soon} {...dim(cat.soon)} {...rs(cat.soon, '120px')} loading="lazy" decoding="async" alt="" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: R.sm, flexShrink: 0 }} />
                      <div>
                        <span style={{ ...SOON_CHIP, background: c.sky, color: c.navy, marginBottom: 8 }}>Coming soon</span>
                        <div style={{ fontFamily: FONT_DISPLAY, fontSize: T.h4[0], lineHeight: LH.head, color: c.navy, margin: '6px 0' }}>{cat.label}</div>
                        <a href="#newsletter" onClick={(e) => { close(); openNewsletter(e); }} className="nav-link" style={{ fontSize: T.sm[0], fontWeight: 600, color: c.purple }}>Join the list to hear first →</a>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28, alignItems: 'start' }}>
                      <div>
                        <div style={{ fontFamily: FONT_DISPLAY, fontSize: T.h4[0], lineHeight: LH.head, color: c.navy, marginBottom: 8 }}>{cat.label}</div>
                        <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD, marginBottom: 14 }}>{cat.intro}</p>
                        <Link to="/shop" onClick={close} className="nav-link" style={{ fontSize: T.sm[0], fontWeight: 600, color: c.purple }}>Shop all →</Link>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))`, gap: 16 }}>
                        {cards.map((card, i) => <PanelCard key={i} card={card} symbol={symbol} onPick={close} />)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </header>

      {/* Mobiele drawer */}
      <div className="nav-sm" style={{ display: 'contents' }}>
        <div onClick={() => setDrawer(false)} aria-hidden="true" className={`nav-scrim${drawer ? ' is-open' : ''}`} />
        <aside id="nav-drawer" ref={drawerRef} className={`nav-drawer${drawer ? ' is-open' : ''}`} aria-label="Menu" aria-hidden={!drawer}
          style={{ background: c.white, boxShadow: SH.float }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: LINE }}>
            <img src={IMG.logoDark} {...dim(IMG.logoDark)} decoding="async" alt="flip'nsleep" style={{ height: 28, width: 'auto' }} />
            <button aria-label="Close menu" onClick={() => setDrawer(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.navy, padding: 8, marginRight: -8, display: 'flex' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M5 5l12 12M17 5 5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            <div style={{ padding: '12px 20px 4px', color: c.grayD, fontSize: T.xs[0], fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: FONT_SUB }}>Shop by category</div>
            {CATS.map(cat => {
              const open = acc === cat.key;
              return (
                <div key={cat.key} style={{ borderBottom: LINE }}>
                  <button type="button" aria-expanded={open} aria-controls={`nav-acc-${cat.key}`} onClick={() => setAcc(open ? null : cat.key)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '14px 20px', color: c.navy, fontFamily: FONT_SUB, fontSize: T.md[1], textAlign: 'left' }}>
                    {cat.label}
                    {cat.soon && <span style={{ ...SOON_CHIP, background: c.sky, color: c.navy }}>Soon</span>}
                    <span style={{ marginLeft: 'auto', display: 'flex' }}><Chevron open={open} /></span>
                  </button>
                  <div id={`nav-acc-${cat.key}`} hidden={!open} style={{ padding: '0 20px 14px' }}>
                    {cat.soon ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={cat.soon} {...dim(cat.soon)} {...rs(cat.soon, '56px')} loading="lazy" decoding="async" alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: R.sm, flexShrink: 0 }} />
                        <div style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD }}>
                          Coming soon. <a href="#newsletter" onClick={(e) => { setDrawer(false); openNewsletter(e); }} style={{ color: c.purple, fontWeight: 600 }}>Join the list to hear first</a>
                        </div>
                      </div>
                    ) : cat.cards(isCA).map((card, i) => (
                      <Link key={i} to={card.to} onClick={() => setDrawer(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', textDecoration: 'none', color: c.navy }}>
                        <img src={card.img} {...dim(card.img)} {...rs(card.img, '56px')} loading="lazy" decoding="async" alt="" style={{ width: 56, height: 56, objectFit: 'contain', background: c.sky, borderRadius: R.sm, flexShrink: 0 }} />
                        <span style={{ minWidth: 0 }}>
                          <span style={{ display: 'block', fontFamily: FONT_SUB, fontWeight: 600, fontSize: T.sm[0], lineHeight: LH.head }}>{card.name}</span>
                          <Price card={card} symbol={symbol} size={T.xs[0]} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            <div style={{ padding: '12px 0' }}>
              {[...SECONDARY, ['/how-it-works', 'How it works'], ['/why-flipnsleep', "Why flip'nsleep"], ['/reviews', 'Reviews']].map(([to, label]) => (
                <Link key={to} to={to} onClick={() => setDrawer(false)} className="nav-link" style={{ display: 'block', padding: '10px 20px', color: loc.pathname === to ? c.purple : c.navy, fontFamily: FONT_SUB, fontSize: T.md[1] }}>{label}</Link>
              ))}
            </div>
          </div>

          <div style={{ padding: '16px 20px calc(16px + env(safe-area-inset-bottom))', borderTop: LINE }}>
            <Link to={`/product/${PRODUCT.id}`} onClick={() => setDrawer(false)} style={{ ...BTN, width: '100%' }}>Shop the deal</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
