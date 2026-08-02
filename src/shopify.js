const DOMAIN = 'checkout.bugawaygear.com';

// Normalize color names between website and Shopify.
// Website uses: 'Arctic White', 'Black'
// Shopify uses: 'Arctic White', 'Zwart'
function normColor(c) {
  if (c === 'Black')      return 'Zwart';
  if (c === 'Stone Gray') return 'Stone Grey';   // legacy fallback, not used in current UI
  return c;
}

// Normalize size: website uses XXL/XXXL, Shopify uses 2XL/3XL
function normSize(s) {
  if (s === 'XXL') return '2XL';
  if (s === 'XXXL') return '3XL';
  return s;
}

// ba-jacket-men: Size|Color
const JACKET_MEN = {
  "XS|Arctic White":56675277308284, "XS|Zwart":56675277341052,
  "S|Arctic White":56675277439356,  "S|Zwart":56675277472124,
  "M|Arctic White":56675277570428,  "M|Zwart":56675277603196,
  "L|Arctic White":56675277701500,  "L|Zwart":56675277734268,
  "XL|Arctic White":56675277832572, "XL|Zwart":56675277865340,
  "2XL|Arctic White":56675277963644,"2XL|Zwart":56675277996412,
  "3XL|Arctic White":56675278094716,"3XL|Zwart":56675278127484,
};

// ba-pants-men: Size|Color
const PANTS_MEN = {
  "XS|Arctic White":56708819222908, "XS|Zwart":56708819255676,
  "S|Arctic White":56708819353980,  "S|Zwart":56708819386748,
  "M|Arctic White":56708819485052,  "M|Zwart":56708819517820,
  "L|Arctic White":56708819616124,  "L|Zwart":56708819648892,
  "XL|Arctic White":56708819747196, "XL|Zwart":56708819779964,
  "2XL|Arctic White":56708819878268,"2XL|Zwart":56708819911036,
  "3XL|Arctic White":56708820009340,"3XL|Zwart":56708820042108,
};

// ba-jacket-women: Color|Size, only XS-L
const JACKET_WOMEN = {
  "Arctic White|XS":56708821516668, "Arctic White|S":56708821549436,
  "Arctic White|M":56708821582204,  "Arctic White|L":56708821614972,
  "Zwart|XS":56708821647740,        "Zwart|S":56708821680508,
  "Zwart|M":56708821713276,         "Zwart|L":56708821746044,
};

// ba-pants-women: Color|Size, only XS-L
const PANTS_WOMEN = {
  "Arctic White|XS":56708820369788, "Arctic White|S":56708820435324,
  "Arctic White|M":56708820402556,  "Arctic White|L":56708820468092,
  "Zwart|XS":56708820500860,        "Zwart|S":56708820566396,
  "Zwart|M":56708820533628,         "Zwart|L":56708820599164,
};

// ba-combo-men: Color|Size, XS-3XL
const COMBO_MEN = {
  "Arctic White|XS":56708822106492, "Arctic White|S":56708822073724,
  "Arctic White|M":56708822040956,  "Arctic White|L":56708822008188,
  "Arctic White|XL":57136032022908, "Arctic White|2XL":57136031990140,
  "Arctic White|3XL":57136031957372,
  "Zwart|XS":56708822237564,        "Zwart|S":56708822204796,
  "Zwart|M":56708822172028,         "Zwart|L":56708822139260,
  "Zwart|XL":57136032121212,        "Zwart|2XL":57136032088444,
  "Zwart|3XL":57136032055676,
};

// ba-combo-women: Color|Size, XS-3XL
const COMBO_WOMEN = {
  "Zwart|3XL":57136274899324,       "Zwart|2XL":57136274932092,
  "Zwart|XL":57136274964860,        "Zwart|L":57136274997628,
  "Zwart|M":57136275030396,         "Zwart|S":57136275063164,
  "Zwart|XS":57136275095932,
  "Arctic White|3XL":57136275128700, "Arctic White|2XL":57136275161468,
  "Arctic White|XL":57136275194236,  "Arctic White|L":57136275227004,
  "Arctic White|M":57136275259772,   "Arctic White|S":57136275292540,
  "Arctic White|XS":57136275325308,
};

// ba-kids-set: Color|Size
// NOTE: All variant IDs (including Arctic White) were updated on 2026-05-20
// after Thomas recreated the kids variants in Shopify.
const KIDS = {
  "Arctic White|4-6Y":56795880128892, "Arctic White|6-8Y":56795880161660,
  "Arctic White|8-10Y":56795880194428,"Arctic White|10-12Y":56795880227196,
  "Zwart|4-6Y":56795879670140,        "Zwart|6-8Y":56795879702908,
  "Zwart|8-10Y":56795879735676,       "Zwart|10-12Y":56795879768444,
};

// Losse accessoires zonder maat of kleur: één variant per product.
// null = nog niet aangemaakt in Shopify, het product staat dan op de site als
// "Coming soon". Zet hier het echte Shopify-variant-ID zodra het product is
// aangemaakt (Producten > het product > variant > ... > kopieer het ID uit de
// URL, of vraag mij). Daarmee worden de bestelknop op de productpagina, de
// accessoirekaart én het cross-sell-blok in de winkelmand automatisch actief.
export const SIMPLE_VARIANTS = {
  'ba-tick-kit':        '57236750565756',
  'ba-mosquito-lamp':   '57236750926204',
  'ba-repellent-spray': '57236752007548',
  'ba-storage-pouch':   '57236748829052',
};

// Winkelmand-aanbeveling: het vaste anker onderin de mand.
export const CART_CROSSSELL_ANCHOR = 'ba-tick-kit';
// Contextuele tweede aanbeveling bij kledingproducten in de mand: de eerste
// uit deze lijst die bestelbaar is en nog niet in de mand zit, wordt getoond.
// Pouch eerst (hoort bij elke set), repellent als terugval.
export const CART_CROSSSELL_CONTEXTUAL = ['ba-storage-pouch', 'ba-repellent-spray'];

const VARIANT_MAPS = {
  'ba-jacket-men':   { map: JACKET_MEN,   order: 'size|color' },
  'ba-pants-men':    { map: PANTS_MEN,    order: 'size|color' },
  'ba-jacket-women': { map: JACKET_WOMEN, order: 'color|size' },
  'ba-pants-women':  { map: PANTS_WOMEN,  order: 'color|size' },
  'ba-combo-men':    { map: COMBO_MEN,    order: 'color|size' },
  'ba-combo-women':  { map: COMBO_WOMEN,  order: 'color|size' },
  'ba-kids-set':     { map: KIDS,         order: 'color|size' },
};

export const SHOPIFY_HANDLES = {
  'ba-jacket-men':   'bug-away-jacket-men',
  'ba-pants-men':    'bug-away-pants-men',
  'ba-jacket-women': 'bug-away-jacket-women',
  'ba-pants-women':  'bug-away-pants-women',
  'ba-combo-men':    'bug-away-combo-set-jacket-pants',
  'ba-combo-women':  'bug-away-combo-set-women-jacket-pants',
  'ba-kids-set':     'bug-away-kids-set',
  'ba-tick-kit':        'bug-away-tick-removal-kit',
  'ba-mosquito-lamp':   'bug-away-indoor-insect-zapper',
  'ba-repellent-spray': 'bug-away-natural-insect-repellent',
};

export const SHOPIFY_IDS = {
  'ba-jacket-men':   'gid://shopify/Product/15967022023036',
  'ba-pants-men':    'gid://shopify/Product/15967033393532',
  'ba-jacket-women': 'gid://shopify/Product/15968024068476',
  'ba-pants-women':  'gid://shopify/Product/15967035064700',
  'ba-combo-men':    'gid://shopify/Product/15968028721532',
  'ba-combo-women':  'gid://shopify/Product/16040815133052',
  'ba-kids-set':     'gid://shopify/Product/15972000825724',
};

// Products that count toward the Family Bundle deal (buy 4 sets, get 1 free).
// Mirrors the Shopify automatic "Buy 3 Get 1 free" discount on the
// "Family Bundle Sets" collection — keep both in sync.
export const FAMILY_BUNDLE_SET_IDS = ['ba-combo-men', 'ba-combo-women', 'ba-kids-set'];

// Single -> matching combo set mapping, used by the cart upsell.
export const COMBO_FOR_SINGLE = {
  'ba-jacket-men':   'ba-combo-men',
  'ba-pants-men':    'ba-combo-men',
  'ba-jacket-women': 'ba-combo-women',
  'ba-pants-women':  'ba-combo-women',
};

export function getVariantId(productId, size, color) {
  // Losse accessoires: één variant, ongeacht maat/kleur (kan null zijn = coming soon).
  if (productId in SIMPLE_VARIANTS) return SIMPLE_VARIANTS[productId];
  const entry = VARIANT_MAPS[productId];
  if (!entry) return null;
  const c = normColor(color || '');
  const s = normSize(size || '');
  const key = entry.order === 'size|color' ? `${s}|${c}` : `${c}|${s}`;
  return entry.map[key] || null;
}

// Kan dit product/deze combinatie besteld worden? Voor accessoires betekent dat:
// het Shopify-variant-ID staat ingevuld (niet meer null).
export function isPurchasable(productId, size, color) {
  return getVariantId(productId, size, color) != null;
}

export async function fetchProduct() { return null; }

export async function buyNow(productId, size, color) {
  const variantId = getVariantId(productId, size, color);
  const handle = SHOPIFY_HANDLES[productId];
  if (variantId) {
    window.location.href = `https://${DOMAIN}/cart/${variantId}:1`;
  } else {
    // Safety: never silently redirect to the product page from a Buy Now click,
    // because that breaks ad attribution and confuses the buyer.
    console.error(`No variant found for ${productId} / size ${size} / color ${color}`);
    alert(`Sorry, this combination (${color}, size ${size}) is not available yet. Please choose another size or color.`);
    if (handle) {
      window.location.href = `https://${DOMAIN}/products/${handle}`;
    }
  }
}
