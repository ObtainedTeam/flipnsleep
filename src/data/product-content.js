// Inhoud voor de productpagina-secties (sticky galerij, accordeons, bento,
// split-beelden, stats). Alles data-driven zodat Thomas media kan wisselen
// zonder de componenten aan te raken.
import { IMG, PRODUCT, products } from '../data.js';

// Grote videokaart in "Designed for real sleep".
// Fallback als innovation.mp4 ooit verdwijnt: { src: '/videos/hero-mobile.mp4', poster: IMG.heroPoster }
export const PRODUCT_MEDIA = {
  feature: { src: '/videos/innovation.mp4', poster: '/images/innovation-poster.webp' },
};

// Bento-rijen op de kussenpagina. Zet `video` op een mp4-pad (3 tot 5 sec)
// zodra Thomas de clips levert; dan speelt die in plaats van de foto.
export const PRODUCT_BENTO = [
  {
    title: 'Soft as a cloud, never too soft',
    text: 'Shredded memory foam shapes itself around your head and neck. Because you set the fill yourself, it holds the height you chose instead of flattening out by morning.',
    image: IMG.coverDuo,
    video: null,
  },
  {
    title: 'Cool the moment you lie down',
    text: 'The cool side is woven from a cool-touch fabric with a tested Q-max of 0.26, so it feels cold on contact. Underneath, the shredded foam lets air move and heat escape.',
    image: IMG.flipCool,
    video: null,
  },
  {
    title: 'Flip it when the seasons change',
    text: 'When the nights turn cold, turn it over to the soft bamboo side. One pillow for every season, so nothing ends up in the closet.',
    image: IMG.flipWarm,
    video: null,
  },
];

// Mellow-stijl uitleg-accordeon direct onder de koopsectie (kussen).
export const PILLOW_ACCORDION = [
  ['What makes it cool', 'Two things work together. The filling is shredded memory foam, so air moves between the pieces and heat escapes instead of building up like it does in a solid block. The cool side is a cool-touch fabric with a tested Q-max of 0.26, which means it feels cold the moment your skin touches it. Like every cool-touch fabric it does not stay ice-cold all night, so flip it for a fresh cool side.'],
  ['How the adjustable fill works', 'Your pillow arrives generously filled. Unzip it and take out a few handfuls until the height fits your sleeping position: side sleepers usually keep the most, back sleepers a little less, stomach sleepers the least. Keep the spare filling in a bag so you can add it back any time.'],
  ['Cool side vs warm side', 'One face is the cool-touch fabric for warm nights. The other is a soft bamboo fiber fabric that feels cozy when the bedroom gets colder. Same pillow, same fit, just flip it over.'],
  ['Care and washing', 'The outer cover zips off and goes in the washing machine at 40°C / 104°F. Do not wash the foam filling itself. Fluff the pillow now and then to keep the filling evenly spread.'],
  ['Size and fit', 'It measures 50 × 76 cm (20 × 30 in), the US standard size, so it fits standard pillowcases, including the ones in our Breeze Bamboo Sheet Set. The foam is CertiPUR-US certified and the fabrics are OEKO-TEX Standard 100.'],
];

// "Designed for real sleep": accordeon links naast de grote videokaart.
export const PILLOW_DESIGN = [
  ['How it works', 'Shredded memory foam breathes instead of holding heat, and the cool-touch cover feels cold on contact. Together they keep the heat from building up under your head the way it does on a solid foam pillow.'],
  ['Built for every sleeping position', 'Side, back or stomach: you decide the loft by taking out or adding filling. Your neck gets the support it needs without extra bulk that traps heat.'],
  ['Cool where it counts', 'The cool-touch face sits right where your cheek and neck rest. When it warms up, flip the pillow for a fresh cool side.'],
];

// Split-beeldpaar (volle breedte). `fit: contain` zet een uitsnede op een verloop.
export const PILLOW_SPLIT = [
  { image: IMG.coverFront, caption: 'Cool where it counts', bg: 'sky', fit: 'contain' },
  { image: IMG.coverInside, caption: 'Adapts to you', bg: 'lilac', fit: 'contain' },
];
export const VARIANT_SPLIT = {
  'cooling-weighted-blanket': [
    { image: '/images/weighted-5.webp', caption: 'Even weight, edge to edge', fit: 'cover' },
    { image: '/images/weighted-hero.webp', caption: 'Breathes while it settles you', fit: 'cover' },
  ],
  'bamboo-sheet-set': [
    { image: '/images/bamboo-sheets-1.webp', caption: 'Silky 400-thread-count bamboo', fit: 'cover' },
    { image: '/images/bamboo-sheets-6.webp', caption: 'Deep pockets that stay put', fit: 'cover' },
  ],
  'cooling-comforter': [
    { image: '/images/comforter-2.webp', caption: 'Cool on both sides', fit: 'cover' },
    { image: '/images/comforter-hero.webp', caption: 'Light enough for every season', fit: 'cover' },
  ],
};

// Stats ("Made for hot sleepers"). Alleen echte productfeiten.
// value = getal om naar op te tellen; text = vaste tekst zonder telanimatie.
export const PILLOW_STATS = [
  { value: 100, decimals: 0, label: 'nights to try it' },
  { value: 0.26, decimals: 2, label: 'Q-max cool-touch' },
  { value: 2, decimals: 0, label: 'years warranty' },
];
export const VARIANT_STATS = [
  { value: 100, decimals: 0, label: 'nights to try it' },
  { text: 'Free', label: 'shipping to the US & Canada' },
  { value: 2, decimals: 0, label: 'years warranty' },
];

// Voorbeeldreviews: altijd met zichtbare chip "Example review".
export const EXAMPLE_REVIEWS = [
  { name: 'Jamie R.', title: 'No more flipping at 3 AM', body: 'I took out two handfuls of filling and it was finally the right height. The cool side feels cold when I lie down, and I flip it when it warms up.' },
  { name: 'Priya S.', title: 'Two pillows for one price', body: 'Bought the deal for me and my partner. He sleeps on his side, I sleep on my back, and we each set our own height in a couple of minutes.' },
  { name: 'Marcus T.', title: 'Washable cover is a plus', body: 'The cover zips off and goes straight in the wash. I use the bamboo side in winter and the cool side the rest of the year.' },
];

// Accordeon voor variantproducten, afgeleid uit hun eigen data.
export function variantAccordion(p) {
  if (!p) return [];
  const spec = (k) => (p.specs.find(([key]) => key === k) || [])[1];
  const skip = ['Care', 'Sizes', 'Country of origin'];
  const items = [];
  items.push(['Why you’ll love it', p.longDesc]);
  items.push(['Materials', p.specs.filter(([k]) => !skip.includes(k)).map(([k, v]) => `${k}: ${v}`)]);
  if (p.sizeInfo) items.push(['Size and weight', p.sizes.map((s) => `${s}: ${p.sizeInfo[s]}`)]);
  else if (spec('Sizes')) items.push(['Size and fit', [spec('Sizes')].concat(spec('Fitted sheet') ? [`Fitted sheet: ${spec('Fitted sheet')}`] : [])]);
  if (spec('Care')) items.push(['Care and washing', `${spec('Care')}. Always check the care label on your product.`]);
  items.push(['What you get', p.features]);
  return items;
}

// Cross-sell "Complete your bed".
export function completeYourBed(currentId) {
  const pillow = { id: PRODUCT.id, name: PRODUCT.name, tagline: PRODUCT.tagline, image: IMG.coverFront, contain: true, pillow: true };
  const rest = products.filter((p) => p.id !== currentId).map((p) => ({ id: p.id, name: p.name, tagline: p.tagline, image: p.images[0], product: p }));
  const list = currentId === PRODUCT.id ? rest : [pillow, ...rest];
  return list.slice(0, 3);
}

// Voorbeeldreviews per variantproduct (zelfde regels: altijd met chip).
export const VARIANT_EXAMPLE_REVIEWS = {
  'cooling-weighted-blanket': [
    { name: 'Jamie R.', title: 'Heavy in a good way', body: 'The weight feels even from edge to edge and the cover stays cool. I use it on its own in summer and over my duvet in winter.' },
    { name: 'Priya S.', title: 'No lumps, no noise', body: 'The beads stay where they should. It is quiet when I turn over, which was my worry with weighted blankets.' },
    { name: 'Marcus T.', title: 'Went one size lighter', body: 'Picked the lighter option to start and it was the right call. Easy to get used to, and it does not trap heat.' },
  ],
  'bamboo-sheet-set': [
    { name: 'Jamie R.', title: 'Silky and cool', body: 'These feel smooth and cool when I get into bed, and they do not cling on warm nights.' },
    { name: 'Priya S.', title: 'The fitted sheet stays on', body: 'Deep pockets fit our thick mattress and the corners stay put all night.' },
    { name: 'Marcus T.', title: 'Softer after washing', body: 'Washed cold and dried low like the label says. They got softer after a few washes.' },
  ],
  'cooling-comforter': [
    { name: 'Jamie R.', title: 'Light but cozy', body: 'Light enough that I do not kick it off, but it still feels like a proper comforter.' },
    { name: 'Priya S.', title: 'Fresh on both sides', body: 'Whichever side lands up, it feels fresh. My partner runs warm and finally stays covered.' },
    { name: 'Marcus T.', title: 'Holds up in the wash', body: 'A few washes in and no pilling. It still looks new.' },
  ],
};

// "Look inside the pillow": scroll-gestuurde exploded view (LookInside.jsx).
// De beelden zijn fotorealistische renders met transparante achtergrond, per laag uitgesneden op het
// object zelf (scripts/gen-layers.py maakt ze uit de bron-PNG's: 1200 px breed plus een -640 variant).
// Vaste bestandsnamen: een nieuwe render met dezelfde naam vervangt het beeld zonder codewijziging,
// zolang w/h/fw hieronder kloppen (gen-layers.py print ze).
//   w, h  = pixelmaat van het webp-bestand
//   fw    = breedte van het object in het 2048 px render-frame (bepaalt hoe groot het in beeld staat)
//   off   = plek van de laag in de uitgeklapte stapel, in frame-px vanaf het midden (omlaag = positief)
const LAYER_DIR = '/images/layers/';
const layerImg = (name, w, h) => ({ src: `${LAYER_DIR}${name}.webp`, srcSet: `${LAYER_DIR}${name}-640.webp 640w, ${LAYER_DIR}${name}.webp 1200w`, w, h });
export const LAYER_IMAGES = {
  closed: { ...layerImg('layer-0-closed', 1200, 535), fw: 1989 },
  exploded: layerImg('layer-exploded', 1200, 1030),
};
export const LAYERS = [
  { id: 'cool-cover', title: 'Cool-touch outer cover',
    text: 'The white and blue quilted side is woven from a cool-touch fabric with a tested Q-max of 0.26, so it feels cold the moment your cheek lands on it.',
    img: layerImg('layer-1-cool-cover', 1200, 430), fw: 1986, off: -560 },
  { id: 'inner-top', title: 'Inner mesh case, top',
    text: 'A breathable mesh case holds the filling in place, so it stays evenly spread while air keeps moving through it.',
    img: layerImg('layer-2-inner-top', 1200, 422), fw: 1816, off: -270 },
  { id: 'foam', title: 'Shredded memory foam',
    text: 'Recycled 35-40D shredded foam. Air flows between the pieces instead of getting trapped, and you set the height by adding or removing fill.',
    img: layerImg('layer-3-foam', 1200, 506), fw: 1799, off: 20 },
  { id: 'inner-bottom', title: 'Inner mesh case, bottom',
    text: 'The second half of the inner case closes the filling in, so you can unzip the outer cover and wash it without the foam spilling out.',
    img: layerImg('layer-4-inner-bottom', 1200, 421), fw: 1862, off: 320 },
  { id: 'bamboo-cover', title: 'Bamboo outer cover, cozy side',
    text: 'Soft bamboo-viscose for cooler nights. When the bedroom gets chilly, flip the pillow over. Same fit, cozier feel.',
    img: layerImg('layer-5-bamboo-cover', 1200, 468), fw: 1989, off: 585 },
];
// De doorsnede achter de knop "Look inside": hetzelfde kussen, het voorste derde weggesneden.
// at = punt op elke laag van het snijvlak (boven naar onder), als fractie van het beeld; zips = de twee
// ritsen op de korte zijde (at = de rits, to = waar het label staat).
export const LAYER_SECTION = {
  img: layerImg('layer-section', 1200, 604), fw: 2036,
  alt: 'Cross-section of the Signature Cold Pillow: cool-touch cover, inner mesh case, shredded foam core, inner mesh case and cozy bamboo cover, with a zipper on the inner case and one on the outer cover',
  at: [[0.12, 0.515], [0.22, 0.53], [0.30, 0.70], [0.16, 0.86], [0.12, 0.885]],
  zips: [
    { label: 'Outer cover zipper', at: [0.868, 0.72], to: [0.92, 1.05] },
    { label: 'Inner case zipper', at: [0.842, 0.755], to: [0.80, 1.19] },
  ],
};
