// flip'nsleep brand tokens — afgeleid uit het Figma-ontwerp.
export const c = {
  navy:"#201B5D", purple:"#3A217F", night:"#141040",
  cream:"#F9F8F3", sky:"#D5EBF9", sky2:"#C0E5FF", skyDeep:"#8FC4F4",
  amber:"#FDCA6F", amberD:"#F5B54A",
  pastelYellow:"#FBDD8E", pastelPink:"#F4A0B5", pastelMint:"#B9E4C1", pastelBlue:"#BFE0F8",
  white:"#FFFFFF", ink:"#201B5D", grayD:"#55507A", gray:"#8B86C9",
  lilac:"#DDD9FF", // gedempte tekst op donkere (navy/purple) vlakken
  danger:"#B3423F", // foutmeldingen in formulieren
};

export const FONT_DISPLAY = "'Palo Wide Black','Archivo Black',sans-serif";
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
export const R = { sm: 12, lg: 24, pill: 999 };

// Schaduwen: zacht, laag en getint in navy zodat ze zichtbaar zijn op crème (#F9F8F3).
export const SH = {
  card:   "0 2px 6px rgba(32,27,93,.06), 0 16px 36px -12px rgba(32,27,93,.20)",
  strong: "0 4px 10px rgba(32,27,93,.08), 0 28px 56px -16px rgba(32,27,93,.30)",
  float:  "0 36px 64px -24px rgba(32,27,93,.38), 0 12px 24px -12px rgba(32,27,93,.16)",
  btn:    "0 2px 6px rgba(32,27,93,.12), 0 10px 22px -8px rgba(245,181,74,.60)",
  text:   "0 1px 2px rgba(0,0,0,.25)",
  textHero: "0 2px 18px rgba(20,16,64,.45)",
};

// Typografische trap [desktop, mobiel] in px. Gebruik met rv('fs', ...T.h1).
export const T = {
  display: [56, 36], h1: [44, 32], h2: [36, 27], h3: [24, 20], h4: [20, 18],
  lg: [18, 16], md: [17, 16], sm: [14, 13], xs: [12, 12],
};
export const LH = { tight: 1.1, head: 1.2, body: 1.65, loose: 1.75 };

// Ruimte: sectiepadding [desktop, mobiel], kaartmarge, gutter, maximale breedtes.
export const SP = {
  section: ["80px 40px", "56px 20px"],
  sectionTop: ["80px 40px 0", "56px 20px 0"],
  card: [28, 22],
  gutter: [40, 20],
  gap: [24, 16],
};
export const W = { page: 1140, text: 720, narrow: 560 };

// Knoppen: precies drie varianten. Altijd inline-flex en gecentreerd, vaste hoogte.
const BTN_BASE = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  borderRadius: R.pill, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 13,
  letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
  textDecoration: "none", whiteSpace: "nowrap", lineHeight: 1,
  transition: "transform .15s ease, filter .15s ease, box-shadow .15s ease",
};
export const BTN = {
  ...BTN_BASE, height: 52, padding: "0 34px",
  background: `linear-gradient(180deg, ${c.amber}, ${c.amberD})`, color: c.navy, border: "none",
  boxShadow: SH.btn,
};
export const BTNO = {
  ...BTN_BASE, height: 52, padding: "0 30px",
  background: "transparent", color: c.navy, border: `2px solid ${c.navy}`,
};
export const BTN_SM = {
  ...BTN_BASE, height: 42, padding: "0 22px", fontSize: 12,
  background: c.navy, color: c.white, border: "none", boxShadow: SH.card,
};
// Varianten op donkere achtergrond: spread erna, bv. {...BTNO, ...ON_DARK}
export const ON_DARK = { color: c.white, borderColor: c.white };

// Chip: niet-klikbare badge/label. Kleur en achtergrond per plek erbij zetten.
export const CHIP = {
  display: "inline-flex", alignItems: "center", gap: 6, borderRadius: R.pill,
  fontFamily: FONT_BODY, fontSize: T.sm[0], fontWeight: 700, lineHeight: 1.2,
  padding: "7px 14px", whiteSpace: "nowrap",
};

// Kaartbasis
export const CARD = { background: c.white, borderRadius: R.lg, boxShadow: SH.card };
export const CARD_SOFT = { background: c.sky, borderRadius: R.lg };

export const H2 = {
  fontFamily:FONT_DISPLAY, fontWeight:400, color:c.navy,
  marginBottom:12, letterSpacing:"0", lineHeight:LH.head,
};

export const EYEBROW = {
  fontFamily:FONT_SUB, fontSize:12, fontWeight:500, letterSpacing:"0.14em",
  textTransform:"uppercase", color:c.purple,
};
