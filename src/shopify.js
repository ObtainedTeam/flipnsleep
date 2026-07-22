// flip'nsleep — Shopify-koppeling.
// Zelfde mechaniek als bugaway: cart-permalinks naar het eigen checkout-domein.
// BELANGRIJK: één domeinconstante, overal hergebruikt (les van 20 juli).
export const DOMAIN = 'checkout.flipnsleep.com';

// Variant-IDs uit de flip'nsleep Shopify-store.
// TODO: vervangen zodra de producten in Shopify zijn aangemaakt.
export const VARIANT_IDS = {
  '1p1': 'REPLACE_WITH_VARIANT_ID_1P1',
  '2p2': 'REPLACE_WITH_VARIANT_ID_2P2',
};

export function getVariantId(bundleId) {
  return VARIANT_IDS[bundleId] || null;
}

// Directe checkout voor één bundel.
export function buyNow(bundleId, qty = 1) {
  const id = getVariantId(bundleId);
  if (!id) return;
  window.location.href = `https://${DOMAIN}/cart/${id}:${qty}`;
}

// Checkout-URL voor de volledige cart: [{bundleId, qty}, ...]
export function cartCheckoutUrl(items, discountCode) {
  const parts = items
    .map(i => `${getVariantId(i.bundleId)}:${i.qty}`)
    .join(',');
  const discount = discountCode ? `?discount=${encodeURIComponent(discountCode)}` : '';
  return `https://${DOMAIN}/cart/${parts}${discount}`;
}
