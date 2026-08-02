// flip'nsleep — Shopify-koppeling.
// Zelfde mechaniek als bugaway: cart-permalinks naar het eigen checkout-domein.
// BELANGRIJK: één domeinconstante, overal hergebruikt (les van 20 juli).
export const DOMAIN = 'checkout.flipnsleep.com';

// Variant-IDs uit de flip'nsleep Shopify-store.
// TODO: vervangen zodra de producten in Shopify zijn aangemaakt.
export const VARIANT_IDS = {
  '1p1': '44265543073857', // 1+1 Signature bundle (2 kussens, $109.99)
  '2p2': '44265557098561', // 2+2 Signature Bundle (4 kussens, $189.99)
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
