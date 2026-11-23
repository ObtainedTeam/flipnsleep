import { useId } from 'react';
import { Link } from 'react-router-dom';
import { IMG, dim } from '../data';

// Bouwstenen van de papieren hemel: wolkjes, wolkenranden, lijn-iconen, de
// wolkjes-opsomming, het accordeon met plusje, de paginakop en de nachtband.
// Stijlen staan in src/sky.css (klassen met sk-).

// ---------------------------------------------------------------------------
// Wolken, volledig in code (geen PNG's meer): scherp op elke schermdichtheid
// en in elke kleur. Stijl: kleine rondingen, veel wolkenruggen per breedte.
//   Cloud      los wolkje (CSS-masker, zie --cloud in sky.css)
//   Mascot     het lachende wolkje
//   CloudEdge  wolkenrand boven of onder een band, één of twee tinten,
//              optioneel met het gezichtje
// ---------------------------------------------------------------------------
export const Cloud = ({ className = '', color, style }) => (
  <i aria-hidden="true" className={`sk-cl${className ? ` ${className}` : ''}`} style={color ? { '--c': color, ...style } : style} />
);

// Het gezichtje in een vak van 100 x 50: twee boogjes als ogen, een lach en blosjes.
const Face = () => (
  <g fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round">
    <path d="M22 22q7-13 14 0" /><path d="M64 22q7-13 14 0" /><path d="M36 28q14 20 28 0" />
    <ellipse cx="11" cy="31" rx="7" ry="4.5" fill="#ffbdb7" stroke="none" />
    <ellipse cx="89" cy="31" rx="7" ry="4.5" fill="#ffbdb7" stroke="none" />
  </g>
);

export const Mascot = ({ className = '', style, color = '#d5ebf9' }) => (
  <svg className={`sk-mascot${className ? ` ${className}` : ''}`} viewBox="0 0 200 112" aria-hidden="true" style={style}>
    <g fill={color}>
      <rect x="4" y="54" width="192" height="58" rx="29" />
      <circle cx="50" cy="66" r="32" /><circle cx="90" cy="44" r="40" /><circle cx="134" cy="50" r="34" /><circle cx="166" cy="72" r="26" />
    </g>
    <g transform="translate(50 50)"><Face /></g>
  </svg>
);

// Eén tegel van 480px die zich herhaalt: [x, straal, hoogte boven de basislijn].
// Hoogte kleiner dan de straal geeft vlakke, rustige ruggen.
const TILE = 480;
const HUMPS = [[26, 40, 30], [84, 34, 42], [138, 38, 33], [194, 30, 46], [246, 42, 37], [304, 32, 27], [352, 36, 44], [408, 34, 35], [456, 30, 25]];
const BACK = HUMPS.map(([x, r, t]) => [TILE - x, r + 4, t + 16]);
function Humps({ list, h }) {
  const all = [];
  list.forEach(([x, r, t]) => {
    all.push([x, r, t]);
    if (x - r < 0) all.push([x + TILE, r, t]);
    if (x + r > TILE) all.push([x - TILE, r, t]);
  });
  return <g fill="currentColor">{all.map(([x, r, t], i) => <circle key={i} cx={x} cy={h - t + r} r={r} />)}<rect y={h - 12} width={TILE} height="12" /></g>;
}

export function CloudEdge({ color, back, down = false, face = false, className = '', style }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const h = face ? 104 : back ? 66 : 50;
  return (
    <svg aria-hidden="true" focusable="false" className={`sk-edge${down ? ' is-down' : ''}${className ? ` ${className}` : ''}`}
      width="100%" height={h} style={color ? { color, ...style } : style}>
      <defs>
        <pattern id={`f${id}`} width={TILE} height={h} patternUnits="userSpaceOnUse"><Humps list={HUMPS} h={h} /></pattern>
        {back && <pattern id={`b${id}`} width={TILE} height={h} patternUnits="userSpaceOnUse" patternTransform="translate(-34 0)" style={{ color: back }}><Humps list={BACK} h={h} /></pattern>}
      </defs>
      {back && <rect width="100%" height={h} fill={`url(#b${id})`} />}
      <rect width="100%" height={h} fill={`url(#f${id})`} />
      {face && (
        <svg x="7%" y="0" width="210" height={h} overflow="visible">
          <g fill="currentColor">
            <circle cx="46" cy={h - 8} r="40" /><circle cx="104" cy={h - 40} r="60" /><circle cx="168" cy={h - 4} r="44" />
          </g>
          <g transform={`translate(66 ${h - 72}) scale(.76) rotate(-6 50 25)`}><Face /></g>
        </svg>
      )}
    </svg>
  );
}

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
      <CloudEdge down back="var(--sky)" />
    </header>
  );
}

// Nachtband met de maan: de afsluitende oproep, met wolkenranden.
// top: donkere wolkenrand erboven. bottom: 'sky' = lichtblauwe wolken met het
// gezichtje komen onderaan op (er volgt een lichtblauwe band), 'ink' = donkere
// wolken hangen eronder (er volgt wit), null = recht (er volgt de voet).
export function NightBand({ title, accent, text, cta, facts = ['100-night trial', 'Free shipping both ways', '2-year warranty'], top = true, bottom = null, id }) {
  return (
    <>
    {top && <CloudEdge color="var(--ink)" />}
    <section id={id} className={`sk-band sk-on-dark${bottom === 'sky' ? '' : ' is-flat'}`}>
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
      {bottom === 'sky' && <CloudEdge className="is-flush" color="var(--sky)" back="#c0e5ff" face />}
    </section>
    {bottom === 'ink' && <CloudEdge down color="var(--ink)" />}
    </>
  );
}
