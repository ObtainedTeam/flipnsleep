# flip'nsleep — flipnsleep.com

D2C-webshop voor de Signature Cold Pillow. Gebouwd op dezelfde basis als bugawaygear.com: React + Vite met SSR-prerender, gehost op Vercel, checkout via Shopify cart-permalinks op checkout.flipnsleep.com.

## Voor livegang invullen (zoek op TODO)

1. **src/shopify.js** — `VARIANT_IDS`: de twee variant-IDs uit de flip'nsleep Shopify-store (1+1 bundel en 2+2 bundel).
2. **src/brevo.js** — `LIST_IDS`: de Brevo lijst-IDs voor de nieuwsbrief/welkomstkorting. De Vercel-omgeving heeft daarnaast de `BREVO_API_KEY` environment variable nodig (zie api/subscribe.js).
3. **index.html** — GA4 measurement ID en Meta Pixel ID invullen en de uitgecommentarieerde blokken activeren.

## Demo-assets vervangen

Alle foto's staan op vaste namen in `public/images/`. Vervang het bestand, behoud de naam, deploy — geen codewijziging nodig:
`pillow-front.webp`, `pillow-filling.webp`, `pillow-night.webp`, `pillow-falling.webp`, `pillow-bed.webp`.

De reviews in `src/data.js` (REVIEWS) zijn demo-content en moeten vóór de launch vervangen worden door echte klantreviews.

## Prijzen

Prijsladder (definitief, 21 juli 2026) staat in `src/data.js`: 1+1 $109.99 / CA$149.99, 2+2 $189.99 / CA$259.99, ankerprijs $109.99 per kussen, gratis verzending op alles. De 1+1 is een permanente propositie.

## Build

```
npm install
npm run build   # client + SSR + prerender van alle 10 routes + sitemap/robots
npm run dev     # lokaal ontwikkelen
```
