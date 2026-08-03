// flip'nsleep — productdata.
// Kussen: één product met twee bundels (prijsladder goedgekeurd 21 juli 2026).
// Daarnaast drie variantproducten (weighted blanket, bamboe lakenset, cooling
// comforter), elk met maten en kleuren — zelfde vorm als de bugaway-producten
// zodat de PDP/dispatcher hetzelfde patroon kan volgen.
// Alle foto's op vaste bestandsnamen in /public/images zodat beelden zonder
// codewijziging vervangbaar zijn.

export const IMG = {
  front: "/images/pillow-front.webp",
  frontCut: "/images/pillow-front-cut.webp",
  filling: "/images/pillow-filling.webp",
  night: "/images/pillow-night.webp",
  falling: "/images/pillow-falling.webp",
  bed: "/images/pillow-bed.webp",
  // Nieuwe kussenfoto's — cover-herontwerp, transparante achtergrond.
  coverFront: "/images/pillow-cover-front.webp",
  coverBack: "/images/pillow-cover-back.webp",
  coverDuo: "/images/pillow-cover-duo.webp",
  coverInside: "/images/pillow-cover-inside.webp",
  heroBg: "/images/hero-bg.jpg",
  heroPoster: "/images/hero-poster.jpg",
  sliderBg: "/images/slider-bg.jpg",
  cloudsUp: "/images/clouds-up.png",
  cloudsDown: "/images/clouds-down.png",
  cloudWhite: "/images/icon-cloud-white.png",
  randomPillow: "/images/random-pillow.png",
  logoFull: "/images/logo-contra-full.png",
  logoDark: "/images/logo-dark-full.png",
  logoMark: "/images/logo-mark.png",
  iconCloud: "/images/icon-cloud.png",
  icon1p1: "/images/icon-1plus1.png",
  iconStar: "/images/icon-star.png",
};

export const PRODUCT = {
  id: "signature-cold-pillow",
  name: "Signature Cold Pillow",
  tagline: "The adjustable pillow that keeps the night sweats away.",
  desc: "An adjustable shredded memory foam pillow with a dual-sided cover: a cool-touch side for warm nights and a soft bamboo side for cold ones. Unzip to add or remove filling until it fits your sleeping position exactly.",
  // Ankerprijs per kussen — doorgestreept naast elk aanbod.
  anchorPerPillow: { usd: 109.99, cad: 149.99 },
  images: [IMG.coverFront, IMG.coverDuo, IMG.coverInside, IMG.coverBack],
  usps: [
    "50 × 76 cm (20 × 30 in), shredded memory foam filling",
    "Adjust the filling to your sleeping position",
    "Dual-sided: cool-touch and soft bamboo",
    "Removable, machine-washable outer cover",
  ],
  specs: [
    ["Size", "50 × 76 cm (20 × 30 in, US standard)"],
    ["Filling", "Recycled shredded memory foam, 35–40D"],
    ["Cool side", "Cool-touch fabric, tested Q-max cooling value 0.26"],
    ["Warm side", "Soft bamboo fiber fabric"],
    ["Cover", "Removable and machine-washable at 40°C / 104°F (do not wash the foam)"],
    ["Certifications", "OEKO-TEX Standard 100 · CertiPUR-US certified foam"],
    ["Country of origin", "China"],
  ],
};

export const BUNDLES = [
  {
    id: "1p1",
    label: "2 pillows (1+1 free)",
    short: "1+1 FREE",
    pillows: 2,
    prices: { usd: 109.99, cad: 149.99 },
    compareAt: { usd: 219.98, cad: 299.98 },
    blurb: "One for you, one on us. Our signature deal.",
    image: IMG.coverFront,
  },
  {
    id: "2p2",
    label: "4 pillows (2+2)",
    short: "2+2 DEAL",
    pillows: 4,
    prices: { usd: 189.99, cad: 259.99 },
    compareAt: { usd: 439.96, cad: 599.96 },
    blurb: "For both sides of the bed — and the guest room.",
    image: IMG.coverFront,
  },
];

export const bundleById = (id) => BUNDLES.find(b => b.id === id);

/* ============================================================
   VARIANTPRODUCTEN — maat + kleur (zelfde vorm als bugaway).
   Prijzen region-aware {usd, cad}. compareAt = doorstreepprijs.
   Kleurnamen afgeleid van de Alibaba-kleurcodes.
   Specs zijn ingevuld uit de leverancierdata; regels met "confirm"
   nog te bevestigen tegen het carelabel voordat het product live gaat.
   ============================================================ */

export const products = [
  {
    id: "cooling-weighted-blanket",
    name: "Cloudweight Weighted Blanket",
    category: "BLANKETS",
    tagline: "Deep, even weight that settles you, without the heat.",
    prices: { usd: 89.99, cad: 122.99 },
    compareAt: { usd: 119.99, cad: 162.99 },
    badge: "New",
    colors: ["Graphite"],
    colorHex: ["#4A4855"],
    sizes: ["Twin", "Queen", "King", "Super King"],
    desc: "A cooling weighted blanket with a bamboo-viscose cover and evenly distributed glass micro-beads. The gentle, grounding weight of a hug, in a breathable fabric that doesn't trap heat.",
    longDesc: `A cooling weighted blanket with a bamboo-viscose cover and evenly distributed glass micro-beads. It gives you the gentle, grounding weight of a hug in a breathable fabric that doesn't trap heat, so you stay settled without overheating. The beads are quilted into small, even squares that keep the weight spread edge to edge, with no shifting and no lumps. Use it over your duvet or on its own. Free shipping across the US and Canada, a 100-night trial and a 2-year warranty.`,
    features: [
      "Bamboo-viscose cover, soft, breathable and cool to the touch",
      "Evenly distributed glass micro-beads (0.8 to 2.5 mm)",
      "Small-square quilting keeps the weight even and silent",
      "Grounding weight without trapping heat",
      "Machine washable on a gentle cold cycle",
    ],
    specs: [
      ["Cover", "Viscose derived from bamboo"],
      ["Fill", "Hypoallergenic glass micro-beads (0.8 to 2.5 mm)"],
      ["Construction", "Small-square quilting for even weight distribution"],
      ["Sizes", "Twin, Queen, King, Super King"],
      ["Weight", "Matched to size (see selector)"], // confirm: exacte lb per maat
      ["Care", "Machine wash gentle, cold; air dry"], // confirm tegen carelabel
      ["Country of origin", "China"],
    ],
    highlights: [
      { icon: "🌬️", label: "Breathable", sub: "Bamboo-viscose cover" },
      { icon: "🫧", label: "Even weight", sub: "No shifting beads" },
      { icon: "🌙", label: "100-night trial", sub: "Risk-free" },
    ],
    useCases: ["Warm bedrooms", "Over your duvet", "Evening wind-down", "Guest room", "Movie nights"],
    images: [
      "/images/weighted-3.webp",
      "/images/weighted-1.webp",
      "/images/weighted-2.webp",
      "/images/weighted-4.webp",
      "/images/weighted-5.webp",
    ],
  },
  {
    id: "bamboo-sheet-set",
    name: "Breeze Bamboo Sheet Set",
    category: "BEDDING",
    tagline: "Silky 400-thread-count bamboo that sleeps cool all night.",
    prices: { usd: 119.99, cad: 162.99 },
    compareAt: { usd: 159.99, cad: 216.99 },
    badge: "New",
    colors: ["Sage", "Cloud White", "Dove Grey", "Blush", "Midnight Black"],
    colorHex: ["#9AD6A0", "#F4F4EF", "#D3D3D3", "#F3C0CB", "#1b1b1b"],
    sizes: ["Twin", "Queen", "King", "Super King"],
    desc: "A four-piece sheet set woven from 100% bamboo viscose at 400 thread count. Silky, breathable and temperature-regulating, with a deep-pocket fitted sheet that actually stays put.",
    longDesc: `A four-piece set woven from 100% bamboo viscose at 400 thread count: silky, breathable and temperature-regulating. The weave stays cool against the skin and wicks away moisture, so you spend less of the night flipping to the cold side. You get a flat sheet, a deep-pocket fitted sheet and two pillowcases, with 16-inch pockets and a 360-degree wrap that grips the mattress and stays put. Free shipping across the US and Canada, a 100-night trial and a 2-year warranty.`,
    features: [
      "100% bamboo viscose at 400 thread count",
      "Breathable and moisture-wicking for hot sleepers",
      "Four pieces: flat sheet, fitted sheet and two pillowcases",
      "16-inch deep-pocket fitted sheet with a 360-degree elastic wrap",
      "OEKO-TEX Standard 100 certified",
    ],
    specs: [
      ["Material", "100% bamboo viscose"],
      ["Thread count", "400 TC"],
      ["Set includes", "1 flat sheet, 1 fitted sheet, 2 pillowcases"],
      ["Fitted sheet", "16-inch deep pockets, 360° elastic wrap"],
      ["Sizes", "Twin, Queen, King, Super King"],
      ["Certifications", "OEKO-TEX Standard 100"],
      ["Care", "Machine wash cold, gentle; tumble dry low"],
      ["Country of origin", "China"],
    ],
    highlights: [
      { icon: "🎋", label: "Bamboo viscose", sub: "400 thread count" },
      { icon: "❄️", label: "Sleeps cool", sub: "Breathable weave" },
      { icon: "✅", label: "OEKO-TEX 100", sub: "Tested safe" },
    ],
    useCases: ["Hot sleepers", "All-season bedding", "Sensitive skin", "Guest room", "Gift"],
    images: [
      "/images/bamboo-sheets-1.webp",
      "/images/bamboo-sheets-5.webp",
      "/images/bamboo-sheets-3.webp",
      "/images/bamboo-sheets-6.webp",
      "/images/bamboo-sheets-2.webp",
      "/images/bamboo-sheets-4.webp",
    ],
  },
  {
    id: "cooling-comforter",
    name: "Arctic Air Cooling Comforter",
    category: "BEDDING",
    tagline: "A lightweight, double-sided cooling comforter for hot sleepers.",
    prices: { usd: 89.99, cad: 122.99 },
    compareAt: { usd: 119.99, cad: 162.99 },
    badge: "New",
    colors: ["Stone Grey", "Ash", "Driftwood", "Glacier Blue"],
    colorHex: ["#858182", "#898791", "#B3ADA8", "#91B3C2"],
    sizes: ["Twin", "Queen", "King"],
    desc: "A lightweight all-season comforter with a 100% organic-cotton shell and a double-sided cool-tech finish. Breathable, moisture-wicking and made for people who sleep hot.",
    longDesc: `A lightweight, all-season comforter with a 100% organic-cotton shell and a double-sided cool-touch finish, so whichever way it lands it feels fresh. It's built for hot sleepers: the weave wicks moisture and lets heat escape instead of trapping it, and the light fill drapes softly without weighing you down. The surface resists pilling, snagging and fading, so it stays like new wash after wash. Pair it with the Breeze Bamboo Sheet Set for a bed that stays cool top to bottom. Free shipping across the US and Canada, a 100-night trial and a 2-year warranty.`,
    features: [
      "100% organic-cotton shell with a double-sided cool-tech finish",
      "Lightweight, all-season drape",
      "Moisture-wicking and breathable, built for hot sleepers",
      "Anti-pilling, anti-snagging and fade-resistant",
      "Machine washable",
    ],
    specs: [
      ["Shell", "100% organic cotton"],
      ["Finish", "Double-sided cool-touch, moisture-wicking, breathable"],
      ["Weight", "Lightweight fill (all-season)"],
      ["Sizes", "Twin (68 × 90 in), Queen (90 × 90 in), King (105 × 90 in)"],
      ["Durability", "Anti-pilling, anti-snagging, fade-resistant"],
      ["Care", "Machine wash cold, gentle; tumble dry low"],
      ["Country of origin", "China"],
    ],
    highlights: [
      { icon: "❄️", label: "Cool both sides", sub: "Fresh either way" },
      { icon: "🪶", label: "Lightweight", sub: "All-season drape" },
      { icon: "🌿", label: "Organic cotton", sub: "Breathable shell" },
    ],
    useCases: ["Hot sleepers", "Summer nights", "All-season use", "Guest room", "Pair with sheets"],
    images: [
      "/images/comforter-2.webp",
      "/images/comforter-1.webp",
      "/images/comforter-3.webp",
      "/images/comforter-4.webp",
      "/images/comforter-5.webp",
    ],
  },
];

export const productById = (id) => products.find(p => p.id === id);

// Echte klantreviews. Leeg tot de eerste geverifieerde reviews binnen zijn;
// de reviewsectie toont dan automatisch de eerlijke launch-variant.
export const REVIEWS = [];

export const FAQ_ITEMS = [
  ["How does the 100-night trial work?", "Sleep on it for up to 100 nights. Not convinced? Contact us, ship it back for free and receive a full refund."],
  ["How do I adjust the pillow?", "Unzip the inner cover and add or remove filling until the height matches your sleeping position. Side sleepers usually keep more filling, stomach sleepers less."],
  ["Is the cover washable?", "Yes — the outer cover zips off and is machine-washable at 40°C / 104°F. The foam core itself should not be washed."],
  ["What if the cool side is too cold in winter?", "Just flip it. The other side is soft bamboo fabric, made for colder nights."],
  ["Do you ship to my country?", "We ship across the United States and Canada. Shipping is free on every order."],
  ["When will my order ship?", "Orders placed before 11 PM ET ship the same business day. You'll receive tracking as soon as it leaves the warehouse."],
  ["What warranty do I get?", "Every flip'nsleep product comes with a 2-year warranty on materials and workmanship, on top of the 100-night trial. If anything fails within two years, we repair, replace or refund it."],
  ["Is the foam safe?", "The foam is CertiPUR-US certified (no PBDE/TDCPP/TCEP flame retardants, no heavy metals, low VOC) and the fabrics are OEKO-TEX Standard 100 certified."],
];
