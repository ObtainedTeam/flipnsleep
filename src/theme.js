// flip'nsleep brand tokens — afgeleid uit het Figma-ontwerp.
export const c = {
  navy:"#201B5D", purple:"#201B5D", night:"#201B5D",
  cream:"#FFFFFF", sky:"#E9F3FB", tint:"#F3F8FC", line:"rgba(32,27,93,.12)", sky2:"#C0E5FF", skyDeep:"#8FC4F4",
  amber:"#FDCA6F", amberD:"#F5B54A",
  pastelYellow:"#FBDD8E", pastelPink:"#F4A0B5", pastelMint:"#B9E4C1", pastelBlue:"#BFE0F8",
  white:"#FFFFFF", ink:"#201B5D", grayD:"#55507A", gray:"#8B86C9",
  lilac:"#DDD9FF", // gedempte tekst op donkere (navy/purple) vlakken
  danger:"#B3423F", // foutmeldingen in formulieren
};

export const FONT_HERO = "'Palo Wide Black','Archivo Black',sans-serif";
// Variant B: koppen in Masiva (één gewicht), Palo Wide alleen nog in de hero.
export const FONT_DISPLAY = "'Masiva Medium','Poppins',sans-serif";
export const FONT_SUB = "'Masiva Medium','Poppins',sans-serif";
export const FONT_BODY = "'Poppins','Poppins Fallback',sans-serif";

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
export const R = { sm: 12, lg: 20, pill: 999 };

// Schaduwen: zacht, laag en getint in navy zodat ze zichtbaar zijn op crème (#F9F8F3).
export const SH = {
  card:   "none",
  strong: "none",
  float:  "0 16px 40px -20px rgba(32,27,93,.25)",
  btn:    "none",
  text:   "0 1px 2px rgba(0,0,0,.25)",
  textHero: "0 2px 18px rgba(20,16,64,.45)",
};

// Typografische trap [desktop, mobiel] in px. Gebruik met rv('fs', ...T.h1).
export const T = {
  display: [60, 38], h1: [48, 32], h2: [40, 28], h3: [26, 22], h4: [21, 18],
  lg: [20, 17], md: [18, 16], sm: [16, 15], xs: [14, 13],
};
export const LH = { tight: 1.08, head: 1.15, body: 1.6, loose: 1.7 };

// Ruimte: sectiepadding [desktop, mobiel], kaartmarge, gutter, maximale breedtes.
export const SP = {
  section: ["104px 40px", "64px 20px"],
  sectionTop: ["104px 40px 0", "64px 20px 0"],
  card: [32, 24],
  gutter: [40, 20],
  gap: [24, 16],
};
export const W = { page: 1200, text: 720, narrow: 600 };

// Knoppen: precies drie varianten. Altijd inline-flex en gecentreerd, vaste hoogte.
const BTN_BASE = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  borderRadius: R.pill, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15,
  letterSpacing: 0, cursor: "pointer",
  textDecoration: "none", whiteSpace: "nowrap", lineHeight: 1,
  transition: "background-color .15s ease, color .15s ease, transform .15s ease",
};
export const BTN = {
  ...BTN_BASE, height: 56, padding: "0 36px", fontSize: 16,
  background: c.amber, color: c.navy, border: "none",
};
export const BTNO = {
  ...BTN_BASE, height: 56, padding: "0 32px", fontSize: 16,
  background: "transparent", color: c.navy, border: `1.5px solid ${c.navy}`,
};
export const BTN_SM = {
  ...BTN_BASE, height: 48, padding: "0 24px", fontSize: 15,
  background: c.navy, color: c.white, border: "none",
};
// Varianten op donkere achtergrond: spread erna, bv. {...BTNO, ...ON_DARK}
export const ON_DARK = { color: c.white, borderColor: c.white };

// Chip: niet-klikbare badge/label. Kleur en achtergrond per plek erbij zetten.
export const CHIP = {
  display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 8,
  fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500, lineHeight: 1.2,
  padding: "4px 8px", whiteSpace: "nowrap",
};

// Kaartbasis
export const CARD = { background: c.white, borderRadius: R.lg, border: `1px solid ${c.line}` };
export const CARD_SOFT = { background: c.sky, borderRadius: R.lg };

export const H2 = {
  fontFamily:FONT_DISPLAY, fontWeight:400, color:c.navy,
  marginBottom:12, letterSpacing:"0", lineHeight:LH.head,
};

// Kleine kop boven een sectie: gewone zinsbouw, geen hoofdletters of brede spatiëring.
export const EYEBROW = {
  fontFamily:FONT_BODY, fontSize:15, fontWeight:500, letterSpacing:0, color:c.grayD,
};
