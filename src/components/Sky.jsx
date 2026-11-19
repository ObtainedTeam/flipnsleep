import { Link } from 'react-router-dom';
import { IMG, dim } from '../data';

// Bouwstenen van de papieren hemel: wolkjes, wolkenranden, lijn-iconen, de
// wolkjes-opsomming, het accordeon met plusje, de paginakop en de nachtband.
// Stijlen staan in src/sky.css (klassen met sk-).

// Wolkje in elke kleur (masker van het eigen wolk-icoon). Puur decoratie.
export const Cloud = ({ className = '', color, style }) => (
  <i aria-hidden="true" className={`sk-cl${className ? ` ${className}` : ''}`} style={color ? { '--c': color, ...style } : style} />
);

// Wolkenrand als masker in één kleur: bovenkant (standaard) of onderkant van een band.
export const CloudEdge = ({ color, down = false }) => (
  <div aria-hidden="true" className={`sk-edge${down ? ' is-down' : ''}`} style={color ? { '--ec': color } : undefined} />
);

// De echte wolkenstrook (twee tinten blauw; de bovenrand heeft het lachende wolkje).
export const CloudStrip = ({ down = false, className = '', eager = false }) => {
  const src = down ? IMG.cloudsDownEdge : IMG.cloudsUpEdge;
  return (
    <div aria-hidden="true" className={`sk-strip${down ? ' is-down' : ''}${className ? ` ${className}` : ''}`}>
      <img src={src} {...dim(src)} loading={eager ? undefined : 'lazy'} decoding="async" alt="" />
    </div>
  );
};

const PATHS = {
  check: <path d="M20 6 9 17l-5-5" />,
  x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  right: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  cr: <path d="m9 18 6-6-6-6" />,
  cl: <path d="m15 18-6-6 6-6" />,
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  truck: <><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></>,
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  badge: <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></>,
  box: <><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></>,
  snow: <><path d="M12 2v20" /><path d="m4.9 6.5 14.2 11" /><path d="m19.1 6.5-14.2 11" /></>,
  wind: <><path d="M12.8 19.6A2 2 0 1 0 14 16H2" /><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /><path d="M9.8 4.4A2 2 0 1 1 11 8H2" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
  feather: <><path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" /><path d="M16 8 2 22" /><path d="M17.5 15H9" /></>,
  scale: <><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></>,
  bed: <><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></>,
  thermo: <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />,
};
// Lijn-icoon (één set, één lijndikte). Neemt de tekstkleur over.
export const Ico = ({ name, size }) => (
  <svg className="sk-ico" viewBox="0 0 24 24" aria-hidden="true" style={size ? { width: size, height: size } : undefined}>{PATHS[name]}</svg>
);

// Opsomming met wolkjes als bolletjes. items: string of [titel, toelichting].
export function CloudList({ items, small = false, className = '', style }) {
  return (
    <ul className={`sk-clist${small ? ' is-sm' : ''}${className ? ` ${className}` : ''}`} style={style}>
      {items.map((it, i) => Array.isArray(it)
        ? <li key={i}><div><b>{it[0]}</b><span>{it[1]}</span></div></li>
        : <li key={i}>{it}</li>)}
    </ul>
  );
}

// Accordeon met dunne lijnen en een plusje dat naar een kruisje draait.
// items: [[vraag, antwoord (string, string[] of JSX)], ...]
export function Acc({ items, open = -1, small = false, dark = false, className = '' }) {
  return (
    <div className={`sk-acc${small ? ' is-sm' : ''}${dark ? ' is-dark' : ''}${className ? ` ${className}` : ''}`}>
      {items.map(([q, a], i) => (
        <details key={i} open={i === open}>
          <summary>{q}<span className="sk-plus" aria-hidden="true"><Ico name="plus" /></span></summary>
          <div className="is-body">
            {Array.isArray(a)
              ? <CloudList small items={a} />
              : typeof a === 'string'
                ? a.split('\n\n').map((p, j) => <p key={j} style={{ margin: j ? '12px 0 0' : 0 }}>{p}</p>)
                : a}
          </div>
        </details>
      ))}
    </div>
  );
}

// Paginakop voor binnenpagina's: een stuk hemel met drijvende wolken en de maan.
export function PageHead({ title, intro, children, moon = true }) {
  return (
    <header>
      <div className="sk-pagehead">
        <Cloud className="is-c1 sk-drift" />
        <Cloud className="is-c2 sk-drift" />
        {moon && <img className="is-moon sk-rock" src={IMG.logoMark} {...dim(IMG.logoMark)} decoding="async" alt="" aria-hidden="true" />}
        <div className="sk-wrap sk-pagehead-in">
          <h1 className="sk-h1">{title}</h1>
          {intro && <p className="sk-lead">{intro}</p>}
          {children}
        </div>
      </div>
      <CloudEdge down />
    </header>
  );
}

// Nachtband met de maan: de afsluitende oproep. `strip` laat de wolken onderaan
// opkomen (als er een lichtblauwe band op volgt).
export function NightBand({ title, accent, text, cta, facts = ['100-night trial', 'Free shipping both ways', '2-year warranty'], strip = false, id }) {
  return (
    <section id={id} className={`sk-band sk-on-dark${strip ? '' : ' is-flat'}`}>
      <div className="sk-wrap sk-band-in">
        <div>
          <h2 className="sk-h2">{title}{accent && <> <span className="sk-amber">{accent}</span></>}</h2>
          {text && <p className="sk-lead">{text}</p>}
          {cta && (cta.onClick
            ? <button type="button" className="sk-btn" onClick={cta.onClick}>{cta.label}</button>
            : cta.to.startsWith('#') ? <a className="sk-btn" href={cta.to}>{cta.label}</a>
            : <Link className="sk-btn" to={cta.to}>{cta.label}</Link>)}
          {facts.length > 0 && <ul className="sk-band-facts">{facts.map(f => <li key={f}><Cloud />{f}</li>)}</ul>}
        </div>
        <div className="sk-band-art" aria-hidden="true">
          <Cloud className="is-c1 sk-drift" />
          <Cloud className="is-c2 sk-drift" />
          <img className="is-moon sk-rock" src={IMG.logoMark} {...dim(IMG.logoMark)} loading="lazy" decoding="async" alt="" />
        </div>
      </div>
      {strip && <CloudStrip className="is-flush" />}
    </section>
  );
}
