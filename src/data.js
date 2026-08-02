const STD = [
  "/images/proof-mosquito.jpg",
  "/images/proof-ticks.jpg",
  "/images/proof-spider.jpg",
  "/images/size-guide-jacket.png",
  "/images/size-guide-fittype.png",
  "/images/size-guide-chart.png",
];

// Region-aware prices for single items and sets.
// Used together with getPrice(product, isUS) from currency.jsx.
const PRICE_SINGLE = { usd: 44.99, eur: 38.99 };
const PRICE_SET    = { usd: 79.99, eur: 68.99 };

// Accessoires (losse producten zonder maat/kleur). COMPARE = doorstreepprijs.
const PRICE_TICK_KIT   = { usd: 14.99, eur: 12.99 };
const COMPARE_TICK_KIT = { usd: 24.99, eur: 21.99 };
const PRICE_POUCH      = { usd: 9.50,  eur: 7.99 };
const COMPARE_POUCH    = { usd: 12.99, eur: 10.99 };
const PRICE_LAMP       = { usd: 59.99, eur: 51.99 };
const COMPARE_LAMP     = { usd: 99.00, eur: 85.99 };
const PRICE_SPRAY      = { usd: 14.99, eur: 12.99 };

// Product colors: Arctic White and Black.
// Black maps to 'Zwart' in Shopify via normColor() in shopify.js.
const COLORS = ["Arctic White", "Black"];
const COLOR_HEX = ["#F5F5F0", "#1a1a1a"];

export const products = [
  {
    id: "ba-jacket-men",
    name: "Bug Away Jacket — Men",
    category: "MEN",
    price: PRICE_SINGLE.eur,          // legacy field, kept for backward compatibility
    prices: PRICE_SINGLE,              // new region-aware prices
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    desc: "Full-coverage mesh jacket for men. Drawstring hood, zip closure and side pockets. Pairs perfectly with our Bug Away Pants for complete 360° tick protection. Chemical-free, lightweight and breathable.",
    longDesc: `The Bug Away Jacket is built around one idea: a physical barrier is the only barrier you can truly trust. Made from noseeum-grade nylon mesh with openings smaller than 0.6mm, it stops ticks, mosquitoes, harvest mites and gnats before they ever reach your skin — without a single drop of insecticide.

Pull it on over your regular clothes in seconds. You'll barely notice it's there — the full set weighs under 80g — but the bugs certainly will. The drawstring hood seals around your face, the zip closure keeps the front protected, and the side pockets keep your hands bite-free while you hike, garden or camp.

This jacket is designed for the outdoors, not the lab. No DEET, no permethrin, no chemical residue on your clothes or your skin. Just a smart, breathable layer between you and the insects that carry Lyme disease, TBE and anaplasmosis.

Wear it as a base layer under your regular jacket, or on its own on warm days. It breathes freely, doesn't trap heat and packs small enough to throw in a daypack.`,
    features: [
      "Noseeum-grade mesh — openings < 0.6mm block ticks, mosquitoes and gnats",
      "Drawstring hood with full face coverage",
      "Full-length zip closure",
      "Two deep side pockets",
      "Weight: < 45g per jacket",
      "UPF 30+ sun protection",
      "Machine washable, cold gentle cycle",
      "100% chemical-free — no permethrin, no DEET",
      "Pairs with Bug Away Pants for 360° coverage",
    ],
    useCases: ["Hiking & trail running", "Gardening", "Camping", "Dog walking in tall grass", "Outdoor festivals", "Travel in tick-heavy regions"],
    // Order: studio front -> studio side -> studio back -> studio detail -> new lifestyle (4:5) -> detail collage -> STD
    images: [
      "/images/Male _ White mesh _ front 1_1.jpg",
      "/images/jacket-men-white-closeup.jpg",
      "/images/Male _ White mesh _ Side profile 1_1.jpg",
      "/images/Male _ White mesh _ backside 1_1.jpg",
      "/images/Male _ White mesh _ torso close up front 1_1.jpg",
      "/images/Male _ Black mesh _ full suit front 1_1.jpg",
      "/images/Male _ Black Mesh _torso front 1_1.jpg",
      "/images/Male _ Black mesh _ backside 1_1.jpg",
      "/images/Male _ Black Mesh _ Hoodie on 1_1.jpg",
      "/images/Male _ black mesh _ bino's hunting.png",
      "/images/MAle _ Black Mesh _ Fly fishing.png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-pants-men",
    name: "Bug Away Pants — Men",
    category: "MEN",
    price: PRICE_SINGLE.eur,
    prices: PRICE_SINGLE,
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    desc: "Tick-protection pants for men with integrated foot cover. The pant leg and foot are one continuous piece of mesh — no gap at the ankle, no entry point for ticks. Lightweight, breathable and chemical-free.",
    longDesc: `Ticks don't announce themselves. They wait in tall grass, brush their way onto your ankle and crawl upward before you ever notice. The Bug Away Pants close that gap — literally.

The pant leg and foot cover are one single, continuous piece of noseeum-grade mesh. There is no elastic band at the ankle, no separate sock to tuck in, no gap for insects to exploit. From waistband to toe, the mesh flows uninterrupted — the way proper tick protection should work.

Worn as a base layer under your regular trousers or directly as lightweight outdoor pants, they're virtually weightless and fully breathable. The elastic waistband sits comfortably, and the mesh allows air to circulate freely even on warm days.

No chemicals. No permethrin runoff into the environment. No DEET on your skin. Just a physical barrier made from nylon mesh finer than most insects can navigate.

Pair with the Bug Away Jacket for complete head-to-toe protection.`,
    features: [
      "Integrated foot cover — one continuous piece of mesh, no gap at the ankle",
      "Noseeum-grade mesh — openings < 0.6mm",
      "Elastic waistband — comfortable all-day wear",
      "Weight: < 35g per pair",
      "Machine washable, cold gentle cycle",
      "100% chemical-free",
      "Wear as base layer or standalone",
      "Pairs with Bug Away Jacket for full-body coverage",
    ],
    useCases: ["Hiking in tall grass", "Gardening & weeding", "Dog walking", "Camping & outdoor sleeping", "Fishing", "Foraging"],
    images: [
      "/images/Male _ White mesh _ pants 1_1.jpg",
      "/images/Male _ White mesh _ front angle pants 1_1.jpg",
      "/images/Male _ White mesh _ Pants zoomed out 1_1.jpg",
      "/images/Male _ black mesh _ pants fronts full body 1_1.jpg",
      "/images/Male _ Black mesh _ side front pants 1_1.jpg",
      "/images/Male _ Black mesh _ fish in hand.png",
      "/images/2 males _ Black MEesh _ Fly fishing.png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-jacket-women",
    name: "Bug Away Jacket — Women",
    category: "WOMEN",
    price: PRICE_SINGLE.eur,
    prices: PRICE_SINGLE,
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    desc: "Full-coverage mesh jacket for women. Slim tailored fit, drawstring hood and zip closure. Perfect as a base layer for hiking, gardening and outdoor adventures. Chemical-free and breathable.",
    longDesc: `The Bug Away Women's Jacket gives you the same noseeum-grade mesh protection as our men's version, in a slimmer, more tailored silhouette. It's designed to be worn comfortably under your regular outdoor layers — or on its own when it's warm.

The drawstring hood seals around your face to keep mosquitoes and gnats away from your neck and hairline — the most frequently bitten areas. The full zip closure keeps the front protected, and the slim fit means no excess fabric catching on branches or gear.

Made from nylon mesh finer than 0.6mm openings, the jacket physically blocks ticks, mosquitoes, harvest mites and black flies. No chemicals, no sprays, no residue. Just a layer of protection you put on and forget about.

Breathable enough for summer hikes, light enough to pack into a jacket pocket. Pair with the Bug Away Pants for complete coverage from collar to toe.`,
    features: [
      "Slim tailored fit — designed for women's proportions",
      "Noseeum-grade mesh — openings < 0.6mm",
      "Drawstring hood for face and neck coverage",
      "Full-length zip closure",
      "Weight: < 45g",
      "UPF 30+ sun protection",
      "Machine washable",
      "100% chemical-free and insecticide-free",
    ],
    useCases: ["Hiking", "Gardening", "Outdoor yoga & fitness", "Camping", "Dog walking", "Nature photography"],
    images: [
      "/images/Female _ White Mesh _ Front 1_1.jpg",
      "/images/Female _ white mesh _ smiling torso 1_1.jpg",
      "/images/Female _ white mesh _ full backside 1_1.jpg",
      "/images/Female _ White mesh _ hoodie on 1_1.jpg",
      "/images/Female _ black mesh _ Full 1_1.jpg",
      "/images/Female _ black mesh _ front angle 1_1.jpg",
      "/images/Female _ black mesh _ side profile 1_1.jpg",
      "/images/Female _ black mesh _ backside 1_1.jpg",
      "/images/Female _ black mesh _ hoodie on front 1_1.jpg",
      "/images/Female_ Black Mesh _ smiling 1_1.jpg",
      "/images/Female _ black mesh _ walking 1_1.jpg",
      "/images/Female _ White mesh _ Forest solo.png",
      "/images/Female _ Black mesh .png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-pants-women",
    name: "Bug Away Pants — Women",
    category: "WOMEN",
    price: PRICE_SINGLE.eur,
    prices: PRICE_SINGLE,
    badge: null,
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    desc: "Tick-protection pants for women with integrated foot cover. One continuous piece of mesh from waist to toe — no gap, no entry point. Tailored fit, lightweight and breathable.",
    longDesc: `The Bug Away Women's Pants solve the single biggest weakness in tick protection: the ankle gap. Where most solutions stop — at a sock, a cuff, an elastic band — Bug Away continues. The pant leg flows directly into the foot cover, one uninterrupted piece of noseeum-grade mesh from waist to toe.

No tucking your trousers into your socks. No separate foot covers to keep track of. No weak point for ticks to exploit.

The tailored fit is designed specifically for women's proportions: a clean silhouette that works as a base layer under your regular outdoor trousers or as a lightweight standalone layer on warmer days. The elastic waistband is comfortable for all-day wear, and the mesh breathes freely so you don't overheat.

0.6mm mesh openings. 100% chemical-free. Under 35g per pair. Machine washable.`,
    features: [
      "Integrated foot cover — one continuous mesh piece, no ankle gap",
      "Tailored fit for women's proportions",
      "Noseeum-grade mesh — openings < 0.6mm",
      "Comfortable elastic waistband",
      "Weight: < 35g",
      "Machine washable",
      "100% chemical-free",
    ],
    useCases: ["Hiking & trail walking", "Gardening", "Camping", "Outdoor yoga", "Dog walking in fields", "Countryside travel"],
    images: [
      "/images/Female _ White mesh _ Pants 1_1.jpg",
      "/images/Female _ White mesh _ pants backside 1_1.jpg",
      "/images/Female _ white mesh _ pants smiling 1_1.jpg",
      "/images/Female _ White mesh _ mountain solo .png",
      "/images/Female _ Black mesh .png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-combo-men",
    name: "Bug Away Combo Set — Men",
    category: "BUNDLES",
    price: PRICE_SET.eur,
    prices: PRICE_SET,
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    desc: "Complete tick protection in one set. Bug Away Jacket + Bug Away Pants bundled together — save versus buying separately. Chemical-free, lightweight noseeum-grade mesh with integrated foot cover.",
    longDesc: `The Bug Away Combo Set is the complete solution. Jacket and pants together, matched in color, covering every inch from hood to toe — including the integrated foot cover that closes the ankle gap ticks rely on.

The full set weighs under 80g and packs into its own jacket pocket. You'll barely feel it on. Bugs definitely will.

Both pieces are made from the same noseeum-grade nylon mesh with openings smaller than 0.6mm — a physical barrier that ticks, mosquitoes, harvest mites and black flies simply cannot penetrate. No chemicals, no permethrin, no DEET. Just mesh.

Wear the jacket and pants together for complete 360° coverage, or mix and match with your existing outdoor clothing. Machine washable, breathable, reusable for years.

Buying the set saves you compared to purchasing the items separately.`,
    features: [
      "Complete jacket + pants set — 360° coverage",
      "Integrated foot cover on pants — no ankle gap",
      "Noseeum-grade mesh — < 0.6mm openings throughout",
      "Full set weighs under 80g",
      "Packs into jacket pocket",
      "Save vs buying separately",
      "Machine washable",
      "100% chemical-free",
      "UPF 30+ sun protection",
    ],
    useCases: ["Multi-day hiking trips", "Camping", "Gardening", "Family outdoor adventures", "Travel in tick-endemic regions", "Outdoor work"],
    images: [
      "/images/2 guys _ white and black mesh_ hiking.png",
      "/images/Male _ White mesh _ front 1_1.jpg",
      "/images/Male _ Black mesh _ full suit front 1_1.jpg",
      "/images/Female _ black mesh _ Full 1_1.jpg",
      "/images/Couple _ camping.png",
      "/images/Men and female hiking on mountain.png",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-combo-women",
    name: "Bug Away Combo Set — Women",
    category: "BUNDLES",
    price: PRICE_SET.eur,
    prices: PRICE_SET,
    badge: "New",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    desc: "Complete tick protection in one set. Bug Away Jacket + Bug Away Pants for women, bundled together — save versus buying separately. Chemical-free, lightweight noseeum-grade mesh with integrated foot cover.",
    longDesc: `The Bug Away Combo Set for Women is the complete solution. Jacket and pants together, designed with a tailored fit, covering every inch from hood to toe — including the integrated foot cover that closes the ankle gap ticks rely on.\n\nThe full set weighs under 80g and packs into its own jacket pocket. You'll barely feel it on. Bugs definitely will.\n\nBoth pieces are made from the same noseeum-grade nylon mesh with openings smaller than 0.6mm — a physical barrier that ticks, mosquitoes, harvest mites and black flies simply cannot penetrate. No chemicals, no permethrin, no DEET. Just mesh.\n\nWear the jacket and pants together for complete 360° coverage, or mix and match with your existing outdoor clothing. Machine washable, breathable, reusable for years.\n\nBuying the set saves you compared to purchasing the items separately.`,
    features: [
      "Complete jacket + pants set — 360° coverage",
      "Tailored fit for women",
      "Integrated foot cover on pants — no ankle gap",
      "Noseeum-grade mesh — < 0.6mm openings throughout",
      "Full set weighs under 80g",
      "Packs into jacket pocket",
      "Save vs buying separately",
      "Machine washable",
      "100% chemical-free",
      "UPF 30+ sun protection",
    ],
    useCases: ["Multi-day hiking trips", "Camping", "Gardening", "Family outdoor adventures", "Travel in tick-endemic regions", "Outdoor work"],
    images: [
      "/images/Female _ White mesh _ mountain solo.png",
      "/images/Female _ White Mesh _ Front 1_1.jpg",
      "/images/combo-lifestyle-couple-forest-trail.jpg",
      "/images/jacket-women-lifestyle-garden-pruning.jpg",
      "/images/detail-collage-white.jpg",
      ...STD,
    ],
  },
  {
    id: "ba-kids-set",
    name: "Bug Away Kids Set",
    category: "KIDS",
    price: PRICE_SET.eur,
    prices: PRICE_SET,
    badge: "Best Seller",
    colors: COLORS,
    colorHex: COLOR_HEX,
    sizes: ["4-6Y", "6-8Y", "8-10Y", "10-12Y"],
    desc: "Complete tick protection for kids. Jacket + pants set designed for safe outdoor play. Safe elastic at the hood (no drawstrings), integrated foot cover and extra pockets for nature treasures.",
    longDesc: `Kids run through tall grass, tumble in leaves, and sit in the dirt — exactly where ticks wait. The Bug Away Kids Set keeps them protected without restricting a single moment of play.

The jacket and pants are made from the same noseeum-grade mesh as our adult range — openings smaller than 0.6mm that physically block ticks, mosquitoes and harvest mites. The hood uses a safe elastic trim instead of drawstrings, designed specifically for children's safety standards.

The pants include the same integrated foot cover as our adult version — one continuous piece of mesh from waistband to toe, no ankle gap, no separate parts to lose. The pockets are deep enough for the frogs, rocks and flowers that always end up in kids' hands on outdoor adventures.

Chemical-free. Machine washable. Gentle on sensitive skin. Safe for kids of all ages.

Lyme disease is not just an adult concern — children are particularly vulnerable due to time spent at ground level where ticks are most active. Bug Away gives parents one less thing to worry about.`,
    features: [
      "Complete jacket + pants set for kids",
      "Safe elastic hood trim — no drawstrings",
      "Integrated foot cover on pants — no ankle gap",
      "Noseeum-grade mesh — openings < 0.6mm",
      "Extra deep pockets for outdoor discoveries",
      "Gentle on sensitive skin",
      "Machine washable",
      "100% chemical-free — safe for children",
      "Available in sizes 4-6Y through 10-12Y",
    ],
    useCases: ["Forest play", "School nature trips", "Camping with family", "Garden play", "Hiking with parents", "Summer camps"],
    images: [
      "/images/Family .png",
      "/images/proof-mosquito.jpg",
      "/images/proof-ticks.jpg",
      "/images/proof-spider.jpg",
      "/images/size-guide-kids.png",
    ],
  },

  /* ---------------- ACCESSOIRES (losse producten, geen maat/kleur) ---------------- */
  {
    id: "ba-tick-kit",
    name: "Bug Away Tick Removal Kit",
    category: "ACCESSORIES",
    simple: true,
    imageFit: "contain", // witte productfoto: volledig tonen op witte achtergrond
    price: PRICE_TICK_KIT.eur,
    prices: PRICE_TICK_KIT,
    comparePrices: COMPARE_TICK_KIT,
    badge: "New",
    desc: "A complete tick-removal kit for people and pets. Graduated twister hooks, a lever pen, precision tweezers and a tick card with built-in magnifier, all in a snap-close carry pouch. Remove ticks cleanly, head and all, in seconds.",
    longDesc: `Wearing Bug Away means most ticks never reach skin. But dogs, cats and the occasional gap happen, and when a tick does latch on, how you remove it matters. Squeeze it, twist it off or yank it and you risk leaving the head embedded or pushing its stomach contents into the bite — which is exactly what raises the odds of infection.

This kit gives you the right tool for every situation. The graduated twister hooks slide under the tick and lift it out whole with a gentle rotation, no squeezing. The lever pen does the same one-handed. The precision slant-tip tweezers grip tiny nymphs close to the skin. The tick card with a built-in magnifier tucks into a wallet for the trailhead, and the stainless fork handles the stubborn ones.

Everything lives in a slim snap-close pouch that fits a glovebox, a daypack or a kitchen drawer. Stainless steel and durable TPR, washable, reusable for years. No chemicals, nothing to run out of.

Keep one where the dog gets checked after every walk, and one wherever you head outdoors.`,
    features: [
      "Graduated twister hooks — lift the tick out whole, no squeezing",
      "One-handed tick lever pen for quick removal",
      "Precision slant-tip tweezers for tiny nymph ticks",
      "Tick card with built-in magnifier — wallet-sized for the trail",
      "Stainless steel fork for stubborn ticks",
      "Snap-close carry pouch — glovebox, daypack or drawer",
      "Safe for people, dogs, cats and other pets",
      "Stainless steel + durable TPR — washable and reusable",
      "100% chemical-free — nothing to run out of",
    ],
    whatsIncluded: [
      "Tick card with built-in magnifier",
      "Curved tick twister hook",
      "3 graduated tick-remover hooks (small, medium, large)",
      "One-handed tick lever pen",
      "Precision slant-tip tweezers",
      "Stainless steel tick fork",
      "Snap-close carry pouch",
    ],
    highlights: [
      { icon: "🐾", label: "People & pets", sub: "Safe for both" },
      { icon: "♻️", label: "Reusable", sub: "Lasts for years" },
      { icon: "🌿", label: "Chemical-free", sub: "Nothing to run out of" },
    ],
    useCases: ["Dog & cat owners", "Hiking & camping", "Gardening", "After walks in tall grass", "Travel first-aid kit", "Trailhead essential"],
    images: [
      "/images/tick-kit-hero.jpg",
      "/images/tick-kit-contents.jpg",
      "/images/tick-kit-uses.jpg",
    ],
  },
  {
    id: "ba-storage-pouch",
    name: "Bug Away Storage Pouch",
    category: "ACCESSORIES",
    simple: true,
    price: PRICE_POUCH.eur,
    prices: PRICE_POUCH,
    comparePrices: COMPARE_POUCH,
    badge: "New",
    desc: "A sturdy drawstring pouch made to hold your complete Bug Away set. Pack it small, clip it to your bag, and your protection is always within reach — at the trailhead, the campsite or the bottom of your daypack.",
    longDesc: `Your Bug Away set only protects you when it's actually with you. That's the whole idea behind this pouch: the full set — jacket and pants — packs down into one compact bundle that lives wherever you might need it. The glovebox, your daypack, the camper, the boat.

The pouch is cut from a sturdy woven fabric with a double drawstring closure, so nothing works its way out on a bumpy trail. A loop at the top takes a carabiner or clips straight onto your backpack strap, keeping the set at hand instead of buried under your gear. And because the mesh stays packed away until you need it, it stays clean and snag-free between trips.

Reach the tall grass, pull the set out, suit up in under a minute, and stuff it back in when you're done. No folding ritual required — mesh doesn't crease.

One pouch per set is the golden rule: one in every pack, and nobody in the family walks into tick country unprotected.`,
    features: [
      "Fits a complete Bug Away set — jacket + pants",
      "Sturdy woven fabric with double drawstring closure",
      "Hanging loop — clips to a backpack or belt with a carabiner",
      "Packs small: daypack, glovebox, boat or camper",
      "Keeps the mesh clean and snag-free between trips",
      "Quick access: suit up in under a minute at the trailhead",
    ],
    whatsIncluded: [
      "1 × Bug Away storage pouch with double drawstring closure",
    ],
    highlights: [
      { icon: "🎒", label: "Always with you", sub: "Clips to any pack" },
      { icon: "🧺", label: "Fits the full set", sub: "Jacket + pants" },
      { icon: "💨", label: "Ready in seconds", sub: "No folding needed" },
    ],
    useCases: ["Hiking daypacks", "Glovebox essential", "Camping & fishing trips", "Family outings", "Boats & campers", "Travel"],
    images: [
      "/images/storage-pouch-hero.jpg",
      "/images/storage-pouch-open.jpg",
      "/images/storage-pouch-clip.jpg",
      "/images/storage-pouch-trail.jpg",
      "/images/storage-pouch-camp.jpg",
      "/images/storage-pouch-dock.jpg",
    ],
  },
  {
    id: "ba-mosquito-lamp",
    name: "Bug Away Indoor Insect Zapper",
    category: "ACCESSORIES",
    simple: true,
    price: PRICE_LAMP.eur,
    prices: PRICE_LAMP,
    comparePrices: COMPARE_LAMP,
    badge: null,
    desc: "A quiet, chemical-free insect zapper for indoors. UV light draws in mosquitoes, flies, moths and gnats, and an electric grid handles them on contact. Covers up to 1,600 sq ft. Wall-mount or hang it and forget it — no sprays, no smell, no fumes.",
    longDesc: `Bug Away clothing keeps insects off you outdoors. This handles the ones that make it inside.

A UV-A tube glows at the wavelength flying insects are drawn to. Mosquitoes, house flies, moths, gnats and fruit flies fly toward the light, meet the electrified metal grid and are dealt with on contact. There is no spray drifting through your kitchen, no plug-in chemical, no citronella smell. Just light and a grid.

At 40 watts it covers a large room — up to roughly 1,600 square feet — so one unit handles a living room, a kitchen or an open-plan space. The tough ABS housing mounts flat to a wall or hangs from the built-in hook, and the grid pulls out for a quick clean.

Run it in the evening in the room you are sitting in, or overnight in the bedroom. Chemical-free, odorless, and a natural companion to the mesh you wear outside.`,
    features: [
      "UV-A light attracts flying insects — mosquitoes, flies, moths, gnats and fruit flies",
      "Electric grid handles them on contact — no spray, no chemicals, no smell",
      "Covers up to ~1,600 sq ft (150 m²) — one unit for a large room",
      "40 W, runs on standard AC power",
      "Tough ABS housing — wall-mount or hang from the built-in hook",
      "Pull-out grid for easy cleaning",
      "Odorless and fume-free — safe to run in living spaces",
      "Chemical-free companion to Bug Away mesh",
    ],
    specs: [
      { label: "Coverage", value: "Up to 1,600 sq ft (150 m²)" },
      { label: "Power", value: "40 W" },
      { label: "Voltage", value: "AC 110 V" },
      { label: "Grid voltage", value: "~2,000 V" },
      { label: "Housing", value: "ABS" },
      { label: "Dimensions", value: "9.8 × 3.0 × 10.0 in (25 × 7.5 × 25.5 cm)" },
      { label: "Mounting", value: "Wall-mount or hang" },
      { label: "Use", value: "Indoor" },
    ],
    highlights: [
      { icon: "🔇", label: "Quiet & odorless", sub: "No spray, no smell" },
      { icon: "📐", label: "Up to 1,600 sq ft", sub: "One large room" },
      { icon: "🌿", label: "Chemical-free", sub: "Just light + grid" },
    ],
    useCases: ["Living rooms & kitchens", "Bedrooms", "Home office", "Garages & basements", "Cabins", "Screened porches"],
    images: [
      "/images/mosquito-lamp-hero.jpg",
      "/images/mosquito-lamp-product.jpg",
    ],
  },
  {
    id: "ba-repellent-spray",
    name: "Bug Away Natural Insect Repellent",
    category: "ACCESSORIES",
    simple: true,
    price: PRICE_SPRAY.eur,
    prices: PRICE_SPRAY,
    badge: null,
    desc: "A plant-based, DEET-free repellent spray for the skin Bug Away doesn't cover. Lemon eucalyptus and citronella keep mosquitoes and biting insects away for up to 6 hours, in a light, non-sticky mist. 120 ml.",
    longDesc: `The mesh covers most of you. This covers the rest — your face, your hands, wherever skin is exposed.

Bug Away Natural Insect Repellent is built on plant-based actives: lemon eucalyptus oil, citronella oil and isopulegol. No DEET, no synthetic solvents. It goes on as a fine, non-sticky mist and keeps mosquitoes and biting insects away for up to six hours, even as you sweat.

Shake, hold six to eight inches from the skin and spray in a sweeping motion over exposed areas. Reapply every couple of hours or after heavy sweating. It slips into a daypack, a glovebox or a jacket pocket for the moments the mesh can't reach.

External use only. Avoid eyes and mouth. Not recommended for children under 3, or for puppies and kittens under 4 months. A natural companion to Bug Away mesh, not a replacement for it.`,
    features: [
      "Plant-based, DEET-free actives — lemon eucalyptus, citronella and isopulegol",
      "Up to 6 hours of protection against mosquitoes and biting insects",
      "Light, non-sticky fine mist — comfortable on skin",
      "Works even when you're sweating",
      "120 ml (4.04 fl oz) — daypack and glovebox friendly",
      "MSDS and ISO documented",
      "For the exposed skin mesh clothing can't cover",
    ],
    specs: [
      { label: "Volume", value: "120 ml (4.04 fl oz)" },
      { label: "Active ingredients", value: "Lemon eucalyptus oil 2.5%, citronella oil 1.5%, isopulegol 0.5%" },
      { label: "Formula", value: "Plant-based, DEET-free" },
      { label: "Protection", value: "Up to 6 hours" },
      { label: "Documentation", value: "MSDS & ISO" },
      { label: "Use", value: "External use only. Not for children under 3, or puppies/kittens under 4 months" },
    ],
    highlights: [
      { icon: "🌿", label: "DEET-free", sub: "Plant-based actives" },
      { icon: "⏱️", label: "Up to 6 hours", sub: "Even when sweating" },
      { icon: "💧", label: "Non-sticky", sub: "Light fine mist" },
    ],
    useCases: ["Hiking & trail walking", "Camping", "Fishing", "Dog walking", "Backyard evenings", "Travel"],
    images: [
      "/images/repellent-lifestyle-spray.jpg",
      "/images/repellent-lifestyle-hiking.jpg",
      "/images/repellent-lifestyle-family.jpg",
    ],
  },
];

export const reviews = [
  { id: 1, name: "Maaike V.", rating: 5, text: "Finally something that actually keeps ticks away. Wore it hiking all weekend — not a single bite.", product: "ba-jacket-men" },
  { id: 2, name: "James R.", rating: 5, text: "My whole family wears these now. Kids can play in the forest without us constantly checking.", product: "ba-kids-set" },
  { id: 3, name: "Sophie L.", rating: 5, text: "The integrated foot cover is genius. No more tucking trousers into socks.", product: "ba-pants-women" },
  { id: 4, name: "Bart M.", rating: 4, text: "Lightweight, breathable, does exactly what it says. Great for gardening too.", product: "ba-jacket-women" },
  { id: 5, name: "Karen T.", rating: 5, text: "I got Lyme disease two years ago. I won't go outside without this now. Worth every penny.", product: "ba-combo-adults" },
  { id: 6, name: "David H.", rating: 5, text: "Bought the combo set for a hiking trip in the Veluwe. Zero tick checks needed. Incredible.", product: "ba-combo-adults" },
];
