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
  weightedHero: "/images/weighted-hero.webp",
  comforterHero: "/images/comforter-hero.webp",
  tileBlankets: "/images/tile-blankets.webp",
  tileComforters: "/images/tile-comforters.webp",
  tileSilk: "/images/tile-silk.webp",
  tileToppers: "/images/tile-toppers.webp",
  standardPillowSweaty: "/images/standard-pillow-sweaty.webp",
  flipCool: "/images/flip-cool.webp",
  flipWarm: "/images/flip-warm.webp",
  ugc1: "/images/ugc-1.webp",
  ugc2: "/images/ugc-2.webp",
  ugc3: "/images/ugc-3.webp",
  ugc4: "/images/ugc-4.webp",
};

// Intrinsieke afmetingen van elke afbeelding (voor width/height-attributen,
// zodat de browser de verhouding kent voordat het bestand geladen is).
export const IMG_DIM = {
  "/images/bamboo-sheets-1.webp": [800, 800],
  "/images/bamboo-sheets-2.webp": [800, 800],
  "/images/bamboo-sheets-3.webp": [800, 800],
  "/images/bamboo-sheets-4.webp": [800, 800],
  "/images/bamboo-sheets-5.webp": [800, 800],
  "/images/bamboo-sheets-6.webp": [800, 800],
  "/images/clouds-down.png": [2200, 247],
  "/images/clouds-up.png": [2133, 270],
  "/images/comforter-1.webp": [800, 800],
  "/images/comforter-2.webp": [800, 800],
  "/images/comforter-3.webp": [800, 800],
  "/images/comforter-4.webp": [800, 800],
  "/images/comforter-5.webp": [800, 800],
  "/images/comforter-hero.webp": [500, 460],
  "/images/flip-cool.webp": [1500, 1103],
  "/images/flip-warm.webp": [1500, 1181],
  "/images/hero-bg.jpg": [391, 453],
  "/images/hero-poster.jpg": [1080, 1080],
  "/images/icon-1plus1.png": [170, 126],
  "/images/icon-cloud-white.png": [199, 98],
  "/images/icon-cloud.png": [228, 136],
  "/images/icon-star.png": [13, 12],
  "/images/logo-contra-full.png": [888, 220],
  "/images/logo-dark-full.png": [888, 220],
  "/images/logo-mark.png": [459, 590],
  "/images/pillow-bed.webp": [1600, 1233],
  "/images/pillow-cover-back.webp": [1500, 1181],
  "/images/pillow-cover-duo.webp": [1700, 1364],
  "/images/pillow-cover-front.webp": [1500, 1103],
  "/images/pillow-cover-inside.webp": [1500, 1389],
  "/images/pillow-falling.webp": [1600, 1233],
  "/images/pillow-filling.webp": [1600, 1610],
  "/images/pillow-front-cut.webp": [1200, 835],
  "/images/pillow-front.webp": [1600, 1233],
  "/images/pillow-night.webp": [1600, 1233],
  "/images/random-pillow.png": [160, 149],
  "/images/slider-bg.jpg": [391, 453],
  "/images/standard-pillow-sweaty.webp": [500, 500],
  "/images/tile-blankets.webp": [500, 500],
  "/images/tile-comforters.webp": [500, 500],
  "/images/tile-silk.webp": [500, 500],
  "/images/tile-toppers.webp": [500, 500],
  "/images/ugc-1.webp": [540, 960],
  "/images/ugc-2.webp": [540, 960],
  "/images/ugc-3.webp": [540, 960],
  "/images/ugc-4.webp": [540, 960],
  "/images/weighted-1.webp": [750, 750],
  "/images/weighted-2.webp": [750, 750],
  "/images/weighted-4.webp": [750, 750],
  "/images/weighted-5.webp": [1300, 1201],
  "/images/weighted-hero.webp": [500, 415],
};
// Gebruik: <img src={src} {...dim(src)} />
export const dim = (src) => {
  const d = IMG_DIM[src];
  return d ? { width: d[0], height: d[1] } : {};
};

export const PRODUCT = {
  id: "signature-cold-pillow",
  name: "Signature Cold Pillow",
  tagline: "The adjustable pillow that finally fits your head.",
  desc: "Dual-sided and fully adjustable. A cool-touch side for warm nights, a soft bamboo side for winter, and shredded memory foam that breathes instead of baking under your head. Take out a few handfuls until the height fits your sleeping position exactly.",
  // Ankerprijs per kussen — doorgestreept naast elk aanbod.
  anchorPerPillow: { usd: 109.99, cad: 151 },
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
    label: "2 pillows (buy 1, get 1 free)",
    short: "Buy 1, Get 1 Free",
    pillows: 2,
    prices: { usd: 109.99, cad: 151 },
    compareAt: { usd: 219.98, cad: 299.98 },
    blurb: "One for you, one on us. Our signature deal.",
    image: IMG.coverFront,
  },
  {
    id: "2p2",
    label: "4 pillows (buy 2, get 2 free)",
    short: "Buy 2, Get 2 Free",
    pillows: 4,
    prices: { usd: 189.99, cad: 260 },
    compareAt: { usd: 439.96, cad: 599.96 },
    blurb: "For both sides of the bed, and the guest room.",
    image: IMG.coverFront,
  },
];

export const bundleById = (id) => BUNDLES.find(b => b.id === id);

/* ============================================================
   VARIANTPRODUCTEN, maat + kleur (zelfde vorm als bugaway).
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
    prices: { usd: 89.99, cad: 123 },
    compareAt: { usd: 119.99, cad: 164 },
    badge: "New",
    colors: ["Graphite"],
    colorHex: ["#4A4855"],
    sizes: ["Twin", "Queen", "King", "Super King"],
    sizeInfo: {
      "Twin": "135 \u00d7 200 cm \u00b7 7 kg (\u224815 lb)",
      "Queen": "150 \u00d7 200 cm \u00b7 9 kg (\u224820 lb)",
      "King": "200 \u00d7 200 cm \u00b7 11 kg (\u224824 lb)",
      "Super King": "200 \u00d7 200 cm \u00b7 13 kg (\u224829 lb)",
    },
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
      ["Care", "Machine wash gentle, cold; air dry"], // confirm tegen carelabel
      ["Country of origin", "China"],
    ],
    highlights: [
      { icon: "🌬️", label: "Breathable", sub: "Bamboo-viscose cover" },
      { icon: "🫧", label: "Even weight", sub: "No shifting beads" },
      { icon: "🌙", label: "100-night trial", sub: "Risk-free" },
    ],
    faq: [
      ["How heavy is it, and which size should I pick?", "Twin is 7 kg (about 15 lb), Queen 9 kg (about 20 lb), King 11 kg (about 24 lb) and Super King 13 kg (about 29 lb). A common rule of thumb is a blanket of roughly 10% of your body weight, but comfort is personal: if you're between two, the lighter one is the easier start."],
      ["Will a weighted blanket make me hot?", "It's designed not to. The cover is bamboo viscose, which breathes and feels cool to the touch, and the glass micro-beads don't hold heat the way a thick fill does. It's still a blanket, so in a very warm room many people use it on its own instead of on top of a duvet."],
      ["Do the beads shift or make noise?", "The beads are quilted into small squares, so the weight stays spread edge to edge and doesn't pool at one end. Glass micro-beads are fine and quiet compared with plastic pellets."],
      ["How do I wash it?", "Machine wash on a gentle, cold cycle and air dry. Because of the weight, the larger sizes are easier to wash in a large-capacity or laundromat machine. Always check the care label on your blanket."],
      ["What are the dimensions?", "Twin is 135 \u00d7 200 cm, Queen 150 \u00d7 200 cm, King and Super King are both 200 \u00d7 200 cm; the Super King is the heavier option of that size."],
      ["What if it isn't right for me?", "You have 100 nights to try it. If it's not for you, contact us and return it for free for a full refund. It's also covered by our 2-year warranty."],
    ],
    useCases: ["Warm bedrooms", "Over your duvet", "Evening wind-down", "Guest room", "Movie nights"],
    images: [
      "/images/weighted-hero.webp",
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
    prices: { usd: 119.99, cad: 164 },
    compareAt: { usd: 159.99, cad: 219 },
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
    faq: [
      ["Will these sheets fit my mattress?", "The fitted sheet has 16-inch deep pockets and a 360-degree elastic wrap, so it fits most standard and deeper mattresses. Sizes are Twin, Queen, King and Super King."],
      ["Do bamboo sheets really sleep cooler?", "Bamboo viscose is breathable and moisture-wicking, so it feels cool and dry against the skin and doesn't cling when you're warm. It won't cool a hot room, but most hot sleepers notice the difference compared with heavier cotton or polyester."],
      ["What's in the set?", "One flat sheet, one deep-pocket fitted sheet and two pillowcases. The pillowcases fit the Signature Cold Pillow."],
      ["How do I wash them?", "Machine wash cold on a gentle cycle and tumble dry low. Skip bleach and fabric softener to keep the fabric silky. They get softer with every wash."],
      ["Will they shrink or pill?", "Washed cold and dried low, shrinkage is minimal. Very hot washes and high heat are what make bamboo fabric shrink or lose its sheen."],
      ["What if I don't like them?", "You have 100 nights to try them. Contact us for a free return and full refund, and they're covered by our 2-year warranty."],
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
    prices: { usd: 89.99, cad: 123 },
    compareAt: { usd: 119.99, cad: 164 },
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
    faq: [
      ["Is it warm enough for winter?", "It's a lightweight, all-season comforter. In a heated bedroom that's enough for most hot sleepers year round; if your bedroom gets genuinely cold, layer it with a throw or blanket on the coldest nights."],
      ["How does the cooling finish work?", "Both sides have a cool-touch finish on a breathable organic-cotton shell. It feels fresh when you get in and lets heat and moisture escape instead of trapping them, so you're less likely to wake up hot."],
      ["What size should I choose?", "Twin is 68 \u00d7 90 in, Queen 90 \u00d7 90 in and King 105 \u00d7 90 in. If you like extra drape over the sides, size up."],
      ["How do I wash it?", "Machine wash cold on a gentle cycle and tumble dry low. A larger machine gives it room to rinse properly. The shell resists pilling, snagging and fading."],
      ["Do I need a duvet cover?", "No, it's designed to be used as is. A breathable cover is fine if you prefer one, but it adds a layer between you and the cool-touch finish."],
      ["What if it's not for me?", "You have 100 nights to try it. Contact us for a free return and full refund. It's covered by our 2-year warranty."],
    ],
    useCases: ["Hot sleepers", "Summer nights", "All-season use", "Guest room", "Pair with sheets"],
    images: [
      "/images/comforter-hero.webp",
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

// Video-rij op Home ("Sleep better with flip'nsleep"). Posters zijn stills uit
// de hero-video als placeholder. Zodra Thomas de echte video's levert: zet
// `src` op het mp4-pad en de kaart opent een modal met de video.
export const UGC_VIDEOS = [
  { poster: IMG.ugc1, caption: "The cool side, explained", src: null },
  { poster: IMG.ugc2, caption: "Adjusting the fill", src: null },
  { poster: IMG.ugc3, caption: "Flip it at 3 AM", src: null },
  { poster: IMG.ugc4, caption: "Unboxing", src: null },
];

export const FAQ_ITEMS = [
  ["Does it stay cool all night?", "Honestly: the cool-touch side feels cool the moment you touch it, and because the foam is shredded it sheds heat instead of trapping it, so it doesn't warm up and hold like a solid pillow. It won't stay ice-cold for eight hours, no cool-touch pillow does. Flip it for a fresh cool side, and a breathable pillowcase helps."],
  ["How is this different from a cheap cooling pillow?", "It's adjustable, dual-sided, breathable and certified, and you get two for the price of one. Most cheap cooling pillows are a fixed loft with a cool side only."],
  ["Will it go flat?", "Shredded memory foam holds its loft, and you can fluff it or top it up with a spare bag of filling if you ever want it fuller again."],
  ["What size is it, and will it fit my pillowcase?", "20 \u00d7 30 in (50 \u00d7 76 cm). It fits a standard or queen pillowcase."],
  ["Firm or soft: which is it?", "Your choice. Take filling out for a softer, flatter pillow, leave it in for firmer and taller. Most side sleepers keep more in, stomach sleepers take more out."],
  ["How does the 100-night trial work?", "Sleep on it for up to 100 nights. Not sleeping cooler? Contact us, ship it back for free and receive a full refund."],
  ["How do I adjust the pillow?", "Unzip the inner cover and add or remove filling until the height matches your sleeping position. Side sleepers usually keep more filling, stomach sleepers less."],
  ["Is the cover washable?", "Yes, the outer cover zips off and is machine-washable at 40\u00b0C / 104\u00b0F. The foam core itself should not be washed."],
  ["What if the cool side is too cold in winter?", "Just flip it. The other side is soft bamboo fabric, made for colder nights."],
  ["Shipping and returns?", "Free both ways across the United States and Canada, within the 100-night trial. Orders placed before 11 PM ET ship the same business day and you'll receive tracking as soon as it leaves the warehouse."],
  ["What warranty do I get?", "Every flip'nsleep product comes with a 2-year warranty on materials and workmanship, on top of the 100-night trial. If anything fails within two years, we repair, replace or refund it."],
  ["Is the foam safe?", "The foam is CertiPUR-US certified (no PBDE/TDCPP/TCEP flame retardants, no heavy metals, low VOC) and the fabrics are OEKO-TEX Standard 100 certified."],
];
