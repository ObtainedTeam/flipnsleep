// flip'nsleep — Meta Pixel event helper.
// De pixel-base + PageView staan in index.html; hier vuren we de funnel-events.
// Purchase komt uit Shopify (checkout.flipnsleep.com), niet uit deze code.
//
// Alles is guarded: bij server-side rendering (prerender.mjs) of wanneer de
// pixel nog niet geladen is, doet dit niets in plaats van te crashen.

function fbqReady() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

// Algemene track-wrapper.
export function track(event, params) {
  if (!fbqReady()) return;
  try {
    window.fbq('track', event, params || {});
  } catch (e) {
    // stil falen — tracking mag de site nooit breken
  }
}

// Productpagina bekeken.
export function trackViewContent(params) {
  track('ViewContent', params);
}

// Toegevoegd aan winkelmand.
export function trackAddToCart(params) {
  track('AddToCart', params);
}

// Doorgestuurd naar de Shopify-checkout.
export function trackInitiateCheckout(params) {
  track('InitiateCheckout', params);
}
