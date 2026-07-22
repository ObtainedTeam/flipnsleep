// flip'nsleep — productdata.
// Eén product, twee bundels. Prijsladder definitief goedgekeurd 21 juli 2026.
// Foto's staan op vaste bestandsnamen in /public/images zodat demo-beelden
// later 1-op-1 vervangen kunnen worden zonder codewijziging.

export const IMG = {
  front: "/images/pillow-front.webp",
  frontCut: "/images/pillow-front-cut.webp",
  filling: "/images/pillow-filling.webp",
  night: "/images/pillow-night.webp",
  falling: "/images/pillow-falling.webp",
  bed: "/images/pillow-bed.webp",
  heroBg: "/images/hero-bg.jpg",
  sliderBg: "/images/slider-bg.jpg",
  cloudsUp: "/images/clouds-up.png",
  cloudsDown: "/images/clouds-down.png",
  cloudWhite: "/images/icon-cloud-white.png",
  randomPillow: "/images/random-pillow.png",
  logoFull: "/images/logo-contra-full.png",
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
  images: [IMG.front, IMG.filling, IMG.bed, IMG.falling, IMG.night],
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
    image: IMG.frontCut,
  },
  {
    id: "2p2",
    label: "4 pillows (2+2)",
    short: "2+2 DEAL",
    pillows: 4,
    prices: { usd: 189.99, cad: 259.99 },
    compareAt: { usd: 439.96, cad: 599.96 },
    blurb: "For both sides of the bed — and the guest room.",
    image: IMG.frontCut,
  },
];

export const bundleById = (id) => BUNDLES.find(b => b.id === id);

// LET OP: demo-reviews. Vervangen door echte klantreviews vóór de launch.
export const REVIEWS = [
  { stars: 5, text: "First summer in years I'm not waking up drenched at 3 AM. I flip it once before bed and sleep straight through.", who: "Karen M.", when: "Verified buyer" },
  { stars: 5, text: "Bought the 1+1 — one for me, one for my husband. He runs hot too, and we finally stopped fighting over the thermostat.", who: "Linda R.", when: "Verified buyer" },
  { stars: 4, text: "Took a few nights to get the filling right for side sleeping, but once adjusted it's the best pillow I've owned.", who: "Susan T.", when: "Verified buyer" },
];

export const FAQ_ITEMS = [
  ["How does the 100-night trial work?", "Sleep on it for up to 100 nights. Not convinced? Contact us, ship it back for free and receive a full refund."],
  ["How do I adjust the pillow?", "Unzip the inner cover and add or remove filling until the height matches your sleeping position. Side sleepers usually keep more filling, stomach sleepers less."],
  ["Is the cover washable?", "Yes — the outer cover zips off and is machine-washable at 40°C / 104°F. The foam core itself should not be washed."],
  ["What if the cool side is too cold in winter?", "Just flip it. The other side is soft bamboo fabric, made for colder nights."],
  ["Do you ship to my country?", "We ship across the United States and Canada. Shipping is free on every order."],
  ["When will my order ship?", "Orders placed before 11 PM ET ship the same business day. You'll receive tracking as soon as it leaves the warehouse."],
  ["Is the foam safe?", "The foam is CertiPUR-US certified (no PBDE/TDCPP/TCEP flame retardants, no heavy metals, low VOC) and the fabrics are OEKO-TEX Standard 100 certified."],
];
