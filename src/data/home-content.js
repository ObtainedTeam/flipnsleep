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
  quiz: { label: 'Take the sleep quiz →', to: '/quiz' },
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
  warm: { label: 'Warm side', text: 'Soft bamboo fabric for cooler nights.' },
};

// Vergelijking: [label, flip'nsleep, oud kussen]
export const COMPARE_ROWS = [
  ['Adjustability', 'Adjustable to any sleeping position', 'Non-adjustable'],
  ['Filling', 'Generous amount of filling as standard', 'Standard filling, often too little'],
  ['Sides', 'Dual-sided: cool and warm', 'One side, often too warm'],
  ['Cover', 'Washable outer cover', 'Not removable or washable'],
  ['Certification', 'OEKO-TEX & CertiPUR-US certified', 'Certification unknown'],
];
