import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IMG, BUNDLES, products, FAQ_ITEMS, dim, rs } from '../data';
import { useCurrency, formatPrice, getPrice } from '../currency.jsx';
import { TRUST, FLIP, SPECIAL, LAYERS, STEPS, COMPARE } from '../data/home-content';
import Reveal from './Reveal';
import { Cloud, CloudEdge, CloudStrip, CloudList, Ico, Acc } from './Sky';

// Secties van het redesign die op meerdere pagina's terugkomen (home en
// productpagina's). Tekst staat in data/home-content.js, stijl in sky.css.

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------------------
// Vier beloftes op een rij
// ---------------------------------------------------------------------------
export function TrustRow() {
  return (
    <ul className="sk-trust">
      {TRUST.map(([icon, t, s]) => (
        <li key={t}><Ico name={icon} /><div><b>{t}</b><span>{s}</span></div></li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Productrij met pijlen. Elk product één keer; de kussenbundels eerst.
// ---------------------------------------------------------------------------
export function ProductRail({ title = 'Our most loved sleep products', intro = 'Cooling comfort from head to toe.', exclude }) {
  const { symbol, isCA } = useCurrency();
  const rail = useRef(null);
  const slide = (d) => { const el = rail.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: reduced() ? 'auto' : 'smooth' }); };
  const items = [
    ...BUNDLES.map(b => ({
      key: b.id, to: '/product/signature-cold-pillow', pillows: b.pillows,
      name: `Cold Pillow ${b.pillows === 2 ? '1+1' : '2+2'}`,
      desc: b.pillows === 2 ? 'Two adjustable cooling pillows, one price.' : 'Four pillows for both sides of the bed.',
      tag: b.pillows === 2 ? 'Buy 1, get 1 free' : 'Buy 2, get 2 free',
      price: getPrice(b, isCA), compare: isCA ? b.compareAt.cad : b.compareAt.usd, from: false,
    })),
    ...products.map(p => ({
      key: p.id, to: `/product/${p.id}`, img: p.images[0], name: p.name, desc: p.tagline,
      price: getPrice(p, isCA), compare: p.compareAt ? (isCA ? p.compareAt.cad : p.compareAt.usd) : null, from: true,
    })),
  ].filter(it => it.key !== exclude && !(exclude === 'signature-cold-pillow' && it.pillows));

  return (
    <section className="sk-sec"><div className="sk-wrap">
      <div className="sk-row-head">
        <div><h2 className="sk-h2">{title}</h2>{intro && <p className="sk-lead" style={{ marginTop: 12 }}>{intro}</p>}</div>
        <div className="sk-arrows">
          <button type="button" onClick={() => slide(-1)} aria-label="Previous products"><Ico name="cl" /></button>
          <button type="button" onClick={() => slide(1)} aria-label="Next products"><Ico name="cr" /></button>
        </div>
      </div>
      <div className="sk-rail" ref={rail}>
        {items.map(it => (
          <Link key={it.key} to={it.to} className="sk-pc">
            <div className="sk-pc-img">
              {it.tag && <span className="sk-tag">{it.tag}</span>}
              {it.pillows ? (<>
                <Cloud className="is-a" /><Cloud className="is-b" />
                <img className={`is-cut${it.pillows === 4 ? ' is-two' : ''}`} src={IMG.coverDuo} {...dim(IMG.coverDuo)} {...rs(IMG.coverDuo, '(max-width: 639px) 60vw, 240px')} loading="lazy" decoding="async" alt={`${it.pillows} Signature Cold Pillows`} />
                {it.pillows === 4 && <img className="is-cut is-two" src={IMG.coverDuo} {...dim(IMG.coverDuo)} {...rs(IMG.coverDuo, '(max-width: 639px) 60vw, 240px')} loading="lazy" decoding="async" alt="" />}
              </>) : <img className="is-ph" src={it.img} {...dim(it.img)} loading="lazy" decoding="async" alt={it.name} />}
            </div>
            <b>{it.name}</b>
            <span className="is-desc">{it.desc}</span>
            <div className="sk-pc-foot">
              <span className="sk-price">{it.from ? 'From ' : ''}{formatPrice(it.price, symbol)}{it.compare && <s>{formatPrice(it.compare, symbol)}</s>}</span>
              <span className="sk-go" aria-hidden="true"><Ico name="right" /></span>
            </div>
          </Link>
        ))}
        <a href="#newsletter" className="sk-pc">
          <div className="sk-pc-img is-soon">
            <span className="sk-tag">Coming soon</span>
            <img className="is-ph" src={IMG.tileSilk} {...dim(IMG.tileSilk)} loading="lazy" decoding="async" alt="Silk pillowcases" />
          </div>
          <b>Silk Series &amp; Toppers</b>
          <span className="is-desc">Mulberry silk pillowcases and a cooler mattress layer are on the way.</span>
          <div className="sk-pc-foot"><span className="sk-price">Notify me</span><span className="sk-go" aria-hidden="true"><Ico name="right" /></span></div>
        </a>
      </div>
    </div></section>
  );
}

// ---------------------------------------------------------------------------
// Just flip it: het kussen draait in 3D tussen de koele en de cozy kant.
// SSR rendert de koele kant; in beeld flipt het vanzelf tot de bezoeker klikt.
// ---------------------------------------------------------------------------
export function FlipBand() {
  const [side, setSide] = useState('cool');
  const [touched, setTouched] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (touched || !el || reduced() || typeof IntersectionObserver === 'undefined') return;
    let timer = null;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => setSide(s => (s === 'cool' ? 'cozy' : 'cool')), 3600);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [touched]);

  const pick = (s) => { setTouched(true); setSide(s); };
  return (
    <section ref={ref}>
      <CloudEdge />
      <div className="sk-flipsec"><div className="sk-wrap sk-flip-in">
        <Reveal once>
          <h2 className="sk-h2">{FLIP.title}</h2>
          <p className="sk-lead" style={{ marginTop: 12 }}>{FLIP.text}</p>
          <div className="sk-toggle" role="group" aria-label="Choose a side">
            <button type="button" aria-pressed={side === 'cool'} onClick={() => pick('cool')}><i className="sk-dot" />Cool side</button>
            <button type="button" aria-pressed={side === 'cozy'} onClick={() => pick('cozy')}><i className="sk-dot is-open" />Cozy side</button>
          </div>
          <div aria-live="polite"><CloudList items={FLIP[side]} /></div>
        </Reveal>
        <div className="sk-flip-stage">
          <i className="is-disc" aria-hidden="true" /><Cloud className="is-c1 sk-drift" /><Cloud className="is-c2 sk-drift" />
          <button type="button" className={`sk-flipper${side === 'cozy' ? ' is-cozy' : ''}`} onClick={() => pick(side === 'cool' ? 'cozy' : 'cool')} aria-label="Flip the pillow">
            <img src={IMG.flipCool} {...dim(IMG.flipCool)} {...rs(IMG.flipCool, '(max-width: 899px) 88vw, 560px')} loading="lazy" decoding="async" alt="The cool-touch side of the pillow" />
            <img src={IMG.flipWarm} {...dim(IMG.flipWarm)} {...rs(IMG.flipWarm, '(max-width: 899px) 88vw, 560px')} loading="lazy" decoding="async" alt="The soft bamboo side of the pillow" />
          </button>
          <span className="sk-flip-hint">Tap the pillow to flip it</span>
        </div>
      </div></div>
      <CloudEdge down />
    </section>
  );
}

// ---------------------------------------------------------------------------
// What makes it special: modelfoto met het lachende wolkje + vijf punten
// ---------------------------------------------------------------------------
export function Special({ cta = { label: 'Shop the pillow', to: '/product/signature-cold-pillow' } }) {
  return (
    <section className="sk-sec"><div className="sk-wrap sk-special">
      <Reveal once className="sk-special-ph">
        <img className="is-ph" src={IMG.specialModel} {...dim(IMG.specialModel)} loading="lazy" decoding="async" alt="A woman holding three Signature Cold Pillows" />
        <img className="is-mascot sk-bob" src={IMG.iconCloud} {...dim(IMG.iconCloud)} loading="lazy" decoding="async" alt="" aria-hidden="true" />
      </Reveal>
      <Reveal once delay={100}>
        <h2 className="sk-h2">{SPECIAL.title}</h2>
        <CloudList items={SPECIAL.items} />
        {cta && (cta.onClick
          ? <button type="button" className="sk-btn" onClick={cta.onClick}>{cta.label}</button>
          : <Link className="sk-btn" to={cta.to}>{cta.label}</Link>)}
      </Reveal>
    </div></section>
  );
}

// ---------------------------------------------------------------------------
// Five layers: de stapel schuift uit elkaar zodra hij in beeld is
// ---------------------------------------------------------------------------
export function Layers() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || typeof IntersectionObserver === 'undefined') { setOpen(true); return; }
    const io = new IntersectionObserver(([e]) => setOpen(e.isIntersecting), { threshold: 0.55 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section>
      <CloudEdge color="var(--sky)" />
      <div className="sk-sky"><div className="sk-wrap sk-inside">
        <div ref={ref} className={`sk-stack${open ? ' is-open' : ''}`}>
          {LAYERS.map(([name, , file, w, h]) => (
            <img key={file} src={`/images/layers/${file}.webp`} srcSet={`/images/layers/${file}-640.webp 640w, /images/layers/${file}.webp 1200w`} sizes="(max-width: 899px) 90vw, 520px" width={w} height={h} loading="lazy" decoding="async" alt={name} />
          ))}
        </div>
        <Reveal once>
          <h2 className="sk-h2">Five layers, one cool night</h2>
          <p className="sk-lead" style={{ marginTop: 12 }}>Every layer has one job, from the cool-touch face you feel first to the foam you tune to your height.</p>
          <ol className="sk-layers">
            {LAYERS.map(([name, text]) => <li key={name}><b>{name}</b><span>{text}</span></li>)}
          </ol>
        </Reveal>
      </div></div>
      <CloudStrip down />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Ready in 3 steps: drie fotokaarten (dit ís een volgorde, dus genummerd)
// ---------------------------------------------------------------------------
export function Steps3() {
  return (
    <section className="sk-sec"><div className="sk-wrap">
      <Reveal once><div className="sk-head is-mid"><h2 className="sk-h2">Ready in 3 steps</h2><p className="sk-lead">It starts full. You take out what you don't need.</p></div></Reveal>
      <ol className="sk-steps">
        {STEPS.map(([img, alt, t, s], i) => (
          <li key={t} className="sk-step">
            <div className="sk-step-ph"><img src={IMG[img]} {...dim(IMG[img])} loading="lazy" decoding="async" alt={alt} /></div>
            <span className="is-n" aria-hidden="true">{i + 1}</span>
            <b>{t}</b><span className="is-sub">{s}</span>
          </li>
        ))}
      </ol>
    </div></section>
  );
}

// ---------------------------------------------------------------------------
// flip'nsleep vs your pillow
// ---------------------------------------------------------------------------
export function CompareBand({ more = true, flush = false }) {
  return (
    <section className="sk-sec" style={flush ? { paddingTop: 0 } : undefined}><div className="sk-wrap">
      <Reveal once><div className="sk-head is-mid"><h2 className="sk-h2">flip'nsleep vs your pillow</h2></div></Reveal>
      <Reveal once><div className="sk-cmp">
        <div className="sk-cmp-heads">
          <div className="sk-cmp-head">
            <div className="sk-cmp-pic"><Cloud className="sk-drift" /><img src={IMG.coverFront} {...dim(IMG.coverFront)} {...rs(IMG.coverFront, '260px')} loading="lazy" decoding="async" alt="Signature Cold Pillow" /></div>
            <span className="sk-cmp-name">flip'nsleep</span>
          </div>
          <div className="sk-cmp-head">
            <div className="sk-cmp-pic"><img className="is-old" src={IMG.standardPillowSweaty} {...dim(IMG.standardPillowSweaty)} loading="lazy" decoding="async" alt="A worn, stained ordinary pillow" /></div>
            <span className="sk-cmp-name is-them">Your pillow</span>
          </div>
        </div>
        <ul className="sk-cmp-rows">
          {COMPARE.map(t => (
            <li key={t}>
              <span className="sk-yes"><Ico name="check" /><span className="sr-only">flip'nsleep: yes</span></span>
              {t}
              <span className="sk-no"><Ico name="x" /><span className="sr-only">Your pillow: no</span></span>
            </li>
          ))}
        </ul>
      </div></Reveal>
      {more && <div style={{ textAlign: 'center', marginTop: 32 }}><Link to="/why-flipnsleep" className="sk-btn is-line">See the full comparison</Link></div>}
    </div></section>
  );
}

// ---------------------------------------------------------------------------
// Reviews op een lichtblauwe band. reviews: [{ title, body, name, rating?, example?, verified? }]
// Voorbeelden krijgen het label "Example review" en geen sterren.
// ---------------------------------------------------------------------------
export function ReviewBand({ title = 'What happy sleepers are saying', summary, reviews, more = true, id, noTop = false }) {
  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
  return (
    <section id={id}>
      {!noTop && <CloudStrip />}
      <div className="sk-sky"><div className="sk-wrap" style={{ paddingBlock: '48px 40px' }}>
        <Reveal once><div className="sk-head is-mid">
          <h2 className="sk-h2">{title}</h2>
          {summary && <p className="sk-lead">{summary}</p>}
        </div></Reveal>
        <div className="sk-revs">
          {reviews.map((r, i) => (
            <figure key={i} className="sk-rev">
              {!r.example && r.rating ? <span className="sk-stars" aria-label={`${r.rating} out of 5 stars`}>{stars(r.rating)}</span> : null}
              {r.title && <b className="is-title">{r.title}</b>}
              <p className="clamp-5">{r.body}</p>
              <footer><span>{r.name}</span><span>{r.example ? 'Example review' : r.verified ? 'Verified buyer' : ''}</span></footer>
            </figure>
          ))}
        </div>
        {more && <div style={{ textAlign: 'center', marginTop: 32 }}><Link to="/reviews" className="sk-btn is-line">Read all reviews</Link></div>}
      </div></div>
      <CloudStrip down />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Questions? Answered. Kop links, accordeon rechts.
// ---------------------------------------------------------------------------
export function FAQSection({ items = FAQ_ITEMS, limit = 6, more = true }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <section className="sk-sec"><div className="sk-wrap sk-faq">
      <Reveal once>
        <h2 className="sk-h2">Questions? Answered.</h2>
        <p className="sk-lead" style={{ margin: '12px 0 24px' }}>Still unsure about something? Send us an email.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {more && <Link className="sk-btn is-line" to="/faq">All questions</Link>}
          <a className="sk-tlink" href="mailto:info@flipnsleep.com" style={{ alignSelf: 'center' }}>info@flipnsleep.com</a>
        </div>
      </Reveal>
      <Acc items={list} />
    </div></section>
  );
}
