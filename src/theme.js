// flip'nsleep brand tokens: kleurset 1 van het redesign (nov 2026).
// Vier kleuren met een vaste rol, geen verlopen:
//   ink   #141040  tekst en de nachtvlakken
//   sky   #D5EBF9  wolken en lichte banden
//   amber #FFB022  kopen, en de maan
//   pop   #8ACEFF  de hemel (hero, flip-band)
// De oude namen (navy, purple, cream, sky2, amberD ...) blijven bestaan als alias
// zodat elke pagina dezelfde kleuren krijgt.
const INK = "#141040", SKY = "#D5EBF9", AMBER = "#FFB022", POP = "#8ACEFF", WHITE = "#FFFFFF";
export const c = {
  ink: INK, sky: SKY, amber: AMBER, pop: POP, white: WHITE,
  navy: INK, purple: INK, night: INK,
  cream: WHITE, sky2: SKY, skyDeep: POP, amberD: AMBER,
  pastelYellow: SKY, pastelPink: "#F4A0B5", pastelMint: SKY, pastelBlue: SKY,
  grayD: "#4D4A70",  // ink op 76%: lopende tekst
  gray: "#6E6C8A",   // ink op 60%: bijschriften, doorgestreepte prijzen
  lilac: "#D5D4DC",  // gedempte tekst op de nachtvlakken (wit op 82%)
  line: "rgba(20,16,64,.14)",
  danger: "#B3423F", // foutmeldingen in formulieren
};

export const FONT_DISPLAY = "'Palo Wide Black','Archivo Black',sans-serif";
export const FONT_BODY = "'Poppins','Poppins Fallback',sans-serif";
// Tussenkoppen en labels staan in Poppins (600); Masiva is uit het ontwerp.
export const FONT_SUB = FONT_BODY;

// Responsive helper (zie index.css): rv('fs', 62, 36) geeft
// { '--d-fs': '62px', '--m-fs': '36px' }; combineer met className="r-fs".
// Getallen krijgen px, strings gaan ongewijzigd door.
const px = (v) => (typeof v === 'number' ? `${v}px` : v);
export const rv = (prop, d, m) => ({ [`--d-${prop}`]: px(d), [`--m-${prop}`]: px(m) });

// ---------------------------------------------------------------------------
// Designtokens (blok 2). Gebruik ALLEEN deze waarden in componenten; geen losse
// px, hex, box-shadow of border-radius meer in inline stijlen.
// ---------------------------------------------------------------------------

// Radius: twee maten plus pill. sm = chips, inputs, kleine kaarten; lg = kaarten, panelen, hero-foto's.
export const R = { sm: 14, lg: 24, xl: 28, pill: 999 };

// Schaduwen: het ontwerp is vlak. Kaarten krijgen een haarlijn in plaats van een
// schaduw; alleen wat echt boven de pagina zweeft (menu, winkelwagen, popup)
// houdt een zachte, neutrale schaduw.
export const SH = {
  card:   "inset 0 0 0 1px rgba(20,16,64,.12)",
  strong: "inset 0 0 0 1px rgba(20,16,64,.12)",
  float:  "0 24px 48px -16px rgba(20,16,64,.28), 0 0 0 1px rgba(20,16,64,.06)",
  btn:    "none",
  text:   "0 1px 2px rgba(20,16,64,.35)",
  textHero: "0 1px 2px rgba(20,16,64,.35)",
};

// Typografische trap [desktop, mobiel] in px. Gebruik met rv('fs', ...T.h1).
export const T = {
  display: [58, 34], h1: [46, 30], h2: [38, 26], h3: [24, 20], h4: [20, 18],
  lg: [18, 17], md: [17, 16], sm: [15, 14], xs: [13, 13],
};
export const LH = { tight: 1.08, head: 1.2, body: 1.6, loose: 1.7 };

// Ruimte: sectiepadding [desktop, mobiel], kaartmarge, gutter, maximale breedtes.
export const SP = {
  section: ["96px 40px", "64px 20px"],
  sectionTop: ["96px 40px 0", "64px 20px 0"],
  card: [28, 22],
  gutter: [40, 20],
  gap: [24, 16],
};
export const W = { page: 1200, text: 760, narrow: 560 };

// Knoppen: precies drie varianten. Altijd inline-flex en gecentreerd, vaste hoogte.
const BTN_BASE = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
  borderRadius: R.pill, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 16,
  cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", lineHeight: 1,
};
// Amber is alleen voor kopen (en de hoofdactie van een pagina).
export const BTN = {
  ...BTN_BASE, height: 54, padding: "0 30px",
  background: c.amber, color: c.ink, border: "none",
};
export const BTNO = {
  ...BTN_BASE, height: 54, padding: "0 28px",
  background: "transparent", color: c.ink, border: `2px solid ${c.ink}`,
};
export const BTN_SM = {
  ...BTN_BASE, height: 44, padding: "0 22px", fontSize: 15,
  background: c.ink, color: c.white, border: "none",
};
// Varianten op donkere achtergrond: spread erna, bv. {...BTNO, ...ON_DARK}
export const ON_DARK = { color: c.white, borderColor: c.white };

// Chip: niet-klikbare badge/label. Kleur en achtergrond per plek erbij zetten.
export const CHIP = {
  display: "inline-flex", alignItems: "center", gap: 6, borderRadius: R.pill,
  fontFamily: FONT_BODY, fontSize: T.sm[0], fontWeight: 600, lineHeight: 1.2,
  padding: "8px 14px", whiteSpace: "nowrap",
};

// Kaartbasis
export const CARD = { background: c.white, borderRadius: R.lg, boxShadow: SH.card };
export const CARD_SOFT = { background: c.sky, borderRadius: R.lg };

export const H2 = {
  fontFamily:FONT_DISPLAY, fontWeight:400, color:c.navy,
  marginBottom:12, letterSpacing:"0", lineHeight:1.12,
};

// Klein label boven een kop. Geen hoofdletters of spatiëring meer: gewoon een rustige regel.
export const EYEBROW = {
  fontFamily:FONT_BODY, fontSize:15, fontWeight:600, lineHeight:1.3, color:c.gray,
};
