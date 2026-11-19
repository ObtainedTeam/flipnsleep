// Homepage-content (alleen tekst en data, geen JSX). Demo-items zijn
// placeholders tot er echte video's en reviews zijn; ze worden op de pagina
// zichtbaar gelabeld ("Video coming soon", "Example review").

// Afmetingen van de nieuwe homepage-assets (data.js valt buiten deze map).
export const HOME_IMG = {
  innovationPoster: { src: '/images/innovation-poster.webp', width: 864, height: 1080 },
  innovationVideo: '/videos/innovation.mp4',
  ugcBig1: { src: '/images/ugc-big-1.webp', width: 1080, height: 960 },
  ugcBig2: { src: '/images/ugc-big-2.webp', width: 1080, height: 960 },
};

export const HERO = {
  eyebrow: "The flip'nsleep Signature Cold Pillow",
  title: ['Sleep cool.', 'Wake rested.'],
  sub: 'One pillow, two sides: cool-touch for warm nights, soft bamboo for cooler ones. Adjustable fill for every sleeper.',
  cta: { label: 'Shop the pillow', to: '/product/signature-cold-pillow' },
  quiz: { label: 'Take the sleep quiz', to: '/quiz' },
  note: 'with a 100-night trial',
  trust: [
    ['moon', '100-night trial'],
    ['truck', 'Free shipping US & Canada'],
    ['shield', '2-year warranty'],
  ],
};

// Grote video-kaarten boven de vier kleine (zelfde structuur als UGC_VIDEOS).
export const UGC_BIG = [
  { poster: HOME_IMG.ugcBig1.src, width: 1080, height: 960, caption: 'Meet the Signature Cold Pillow', src: null },
  { poster: HOME_IMG.ugcBig2.src, width: 1080, height: 960, caption: 'Cool nights for two', src: null },
];

// Video-review-placeholders voor de demo-staat van de reviewsectie.
export const VIDEO_REVIEWS = [
  { poster: '/images/ugc-1.webp', width: 540, height: 960, caption: 'First night on the cool side' },
  { poster: '/images/ugc-2.webp', width: 540, height: 960, caption: 'Finding the right height' },
  { poster: '/images/ugc-3.webp', width: 540, height: 960, caption: 'Why I flip it' },
];

// Voorbeeldreviews: altijd met het label "Example review" tonen.
export const EXAMPLE_REVIEWS = [
  { name: 'Sarah K.', title: 'Finally a pillow that stays comfortable', body: "I run warm at night and my old pillow always felt hot after an hour. This one feels cool when I lie down, and I took out a handful of filling to get the height right." },
  { name: 'Mike R.', title: 'Love the two sides', body: 'Cool side through the warm months, bamboo side now that the nights are colder. The cover zips off and washes easily.' },
  { name: 'Jenna L.', title: 'One for each of us', body: 'We ordered the 1+1 so my partner and I each have one. Setup took a couple of minutes and we both adjusted the fill to suit how we sleep.' },
];

export const FLIP_STEPS = [
  ['Unzip and adjust.', 'Add or remove filling until the height matches your sleeping position.'],
  ['Pick your side.', 'Cool-touch fabric on one side, soft bamboo on the other.'],
  ['Sleep through the night.', 'Less heat build-up under your head, all night long.'],
];

export const FLIP_SIDES = {
  cool: { label: 'Cool side', text: 'Cool-touch fabric with a tested Q-max of 0.26 for warm nights.' },
  warm: { label: 'Cozy side', text: 'Soft bamboo fabric for cooler nights.' },
};

// Vergelijking: [label, flip'nsleep, oud kussen]
export const COMPARE_ROWS = [
  ['Adjustability', 'Adjustable to any sleeping position', 'Non-adjustable'],
  ['Filling', 'Generous amount of filling as standard', 'Standard filling, often too little'],
  ['Sides', 'Dual-sided: cool and warm', 'One side, often too warm'],
  ['Cover', 'Washable outer cover', 'Not removable or washable'],
  ['Certification', 'OEKO-TEX & CertiPUR-US certified', 'Certification unknown'],
];

// ---------------------------------------------------------------------------
// Redesign nov 2026: tekst van de gedeelde secties (components/Sections.jsx)
// ---------------------------------------------------------------------------

// [icoon, titel, toelichting]
export const TRUST = [
  ['moon', '100-night trial', 'Sleep on it before you decide'],
  ['truck', 'Free shipping', 'US and Canada, both ways'],
  ['shield', '2-year warranty', 'Materials and workmanship'],
  ['badge', 'Certified materials', 'OEKO-TEX Standard 100, CertiPUR-US'],
];

export const FLIP = {
  title: 'Just flip it',
  text: 'One pillow, two sides. Flip to the cool side on warm nights, back to the soft bamboo side when it gets colder.',
  cool: [
    ['Cool-touch fabric', 'Feels cool the moment you lie down'],
    ['Tested Q-max 0.26', 'The measured cool-touch value of this side'],
    ['For warm nights', 'Flip the pillow for a fresh cool side'],
  ],
  cozy: [
    ['Soft bamboo fiber', 'A cozy, warmer feel against your cheek'],
    ['Same fit, same height', 'Only the fabric changes when you flip'],
    ['For colder nights', 'Turn it over when the weather does'],
  ],
};

export const SPECIAL = {
  title: 'What makes it special?',
  items: [
    ['Flip to cool', 'Cool-touch side and a soft bamboo side'],
    ['Adjustable fill', 'Set your own height and firmness'],
    ['Breathable shredded foam', 'Airflow instead of a hot block'],
    ['Washable cover', 'Zip it off, machine wash at 40°C / 104°F'],
    ['Certified safe', 'OEKO-TEX Standard 100 and CertiPUR-US'],
  ],
};

// [naam, uitleg, bestand in /images/layers, breedte, hoogte]
export const LAYERS = [
  ['Cool-touch outer cover', 'Woven from a cool-touch fabric with a tested Q-max of 0.26.', 'layer-1-cool-cover', 1200, 430],
  ['Inner mesh case, top', 'Holds the filling in place while air keeps moving through it.', 'layer-2-inner-top', 1200, 422],
  ['Shredded memory foam', 'Recycled 35–40D foam. Add or remove fill to set the height.', 'layer-3-foam', 1200, 506],
  ['Inner mesh case, bottom', 'Closes the filling in, so the outer cover can go in the wash.', 'layer-4-inner-bottom', 1200, 421],
  ['Bamboo outer cover, cozy side', 'Soft bamboo viscose for when the bedroom gets chilly.', 'layer-5-bamboo-cover', 1200, 468],
];

// [IMG-sleutel, alt, titel, toelichting]
export const STEPS = [
  ['step1', 'Hands fluffing the pillow', 'Unpack and fluff', 'Shake it so the foam spreads out.'],
  ['step2', 'A hand taking foam out of the unzipped pillow', 'Take out a few handfuls', 'Until the height matches how you sleep.'],
  ['step3', 'A woman asleep on the pillow', 'Sleep on it', 'Flip to the cool side on warm nights.'],
];

export const COMPARE = [
  'Flip-to-cool side',
  'Adjustable height and firmness',
  'Breathable shredded foam',
  'Removable, washable cover',
  '100-night trial',
];
