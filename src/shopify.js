// flip'nsleep — Shopify-koppeling.
// Cart-permalinks naar het eigen checkout-domein (zelfde mechaniek als bugaway).
// BELANGRIJK: één domeinconstante, overal hergebruikt.
export const DOMAIN = 'checkout.flipnsleep.com';

/* ===================== KUSSEN — BUNDELS (ongewijzigd) ===================== */
export const VARIANT_IDS = {
  '1p1': '44265543073857', // 1+1 Signature bundle (2 kussens, $109.99)
  '2p2': '44265557098561', // 2+2 Signature Bundle (4 kussens, $189.99)
};

export function getVariantId(bundleId) {
  return VARIANT_IDS[bundleId] || null;
}

// Directe checkout voor één kussenbundel.
export function buyNow(bundleId, qty = 1) {
  const id = getVariantId(bundleId);
  if (!id) return;
  window.location.href = `https://${DOMAIN}/cart/${id}:${qty}`;
}

/* ================= VARIANTPRODUCTEN — MAAT + KLEUR =================
   Variant-ID's aangemaakt in Shopify op 3 aug 2026. Sleutel = "Size|Color".
   Een null-waarde zou "Coming soon" tonen; alle 36 staan nu ingevuld. */
function normColorP(x) { return x; } // pas aan als Shopify afwijkende kleurnamen gebruikt
function normSizeP(x) { return x; }

// Cloudweight Weighted Blanket — één kleur (Graphite), 4 maten.
const WEIGHTED = {
  "Twin|Graphite": 44288824901697,
  "Queen|Graphite": 44288824934465,
  "King|Graphite": 44288824967233,
  "Super King|Graphite": 44288825000001,
};

// Breeze Bamboo Sheet Set — 4 maten × 5 kleuren.
const BAMBOO = {
  "Twin|Sage": 44288678625345,       "Twin|Cloud White": 44288678690881,       "Twin|Dove Grey": 44288678756417,       "Twin|Blush": 44288678723649,       "Twin|Midnight Black": 44288678658113,
  "Queen|Sage": 44288679116865,      "Queen|Cloud White": 44288679182401,      "Queen|Dove Grey": 44288679247937,      "Queen|Blush": 44288679215169,      "Queen|Midnight Black": 44288679149633,
  "King|Sage": 44288678953025,       "King|Cloud White": 44288679018561,       "King|Dove Grey": 44288679084097,       "King|Blush": 44288679051329,       "King|Midnight Black": 44288678985793,
  "Super King|Sage": 44288678789185, "Super King|Cloud White": 44288678854721, "Super King|Dove Grey": 44288678920257, "Super King|Blush": 44288678887489, "Super King|Midnight Black": 44288678821953,
};

// Arctic Air Cooling Comforter — 3 maten × 4 kleuren.
const COMFORTER = {
  "Twin|Stone Grey": 44288675315777,  "Twin|Ash": 44288791281729,  "Twin|Driftwood": 44288791314497,  "Twin|Glacier Blue": 44288791347265,
  "Queen|Stone Grey": 44288675348545, "Queen|Ash": 44288791380033, "Queen|Driftwood": 44288791412801, "Queen|Glacier Blue": 44288791445569,
  "King|Stone Grey": 44288675381313,  "King|Ash": 44288791478337,  "King|Driftwood": 44288791511105,  "King|Glacier Blue": 44288791543873,
};

const VARIANT_MAPS = {
  'cooling-weighted-blanket': { map: WEIGHTED,  order: 'size|color' },
  'bamboo-sheet-set':         { map: BAMBOO,    order: 'size|color' },
  'cooling-comforter':        { map: COMFORTER, order: 'size|color' },
};

export const SHOPIFY_HANDLES = {
  'cooling-weighted-blanket': 'cloudweight-weighted-blanket',
  'bamboo-sheet-set':         'breeze-bamboo-sheet-set',
  'cooling-comforter':        'arctic-air-cooling-comforter',
};

// Winkelmand-aanbeveling: vast anker onderin de mand = de cooling comforter
// (de "bijbehorende deken"). Contextuele terugvallen daaronder.
export const CART_CROSSSELL_ANCHOR = 'cooling-comforter';
export const CART_CROSSSELL_CONTEXTUAL = ['bamboo-sheet-set', 'cooling-weighted-blanket'];

export function getProductVariantId(productId, size, color) {
  const entry = VARIANT_MAPS[productId];
  if (!entry) return null;
  const col = normColorP(color || '');
  const s = normSizeP(size || '');
  const key = entry.order === 'size|color' ? `${s}|${col}` : `${col}|${s}`;
  return entry.map[key] || null;
}

// Kan deze combinatie besteld worden? (variant-ID staat ingevuld, niet null)
export function isProductPurchasable(productId, size, color) {
  return getProductVariantId(productId, size, color) != null;
}

// Directe checkout voor één variantproduct.
export function buyNowProduct(productId, size, color, qty = 1) {
  const variantId = getProductVariantId(productId, size, color);
  const handle = SHOPIFY_HANDLES[productId];
  if (variantId) {
    window.location.href = `https://${DOMAIN}/cart/${variantId}:${qty}`;
    return;
  }
  // Nooit stil doorsturen vanaf een Buy-now: dat breekt de attributie.
  alert(`Sorry, this option (${color}, ${size}) isn't available yet. Please choose another size or colour.`);
  if (handle) window.location.href = `https://${DOMAIN}/products/${handle}`;
}

/* ===================== GEMENGDE WINKELMAND-CHECKOUT =====================
   items mogen bundels én variantproducten zijn:
   [{ bundleId, qty }]  en/of  [{ productId, size, color, qty }] */
export function cartCheckoutUrl(items, discountCode) {
  const parts = items
    .map(i => {
      const id = i.bundleId
        ? getVariantId(i.bundleId)
        : getProductVariantId(i.productId, i.size, i.color);
      return id ? `${id}:${i.qty || 1}` : null;
    })
    .filter(Boolean)
    .join(',');
  const discount = discountCode ? `?discount=${encodeURIComponent(discountCode)}` : '';
  return `https://${DOMAIN}/cart/${parts}${discount}`;
}
