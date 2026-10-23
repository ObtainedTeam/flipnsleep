/**
 * prerender.mjs — flip'nsleep
 *
 * Rendert elke route naar statische HTML in dist/<route>/index.html, zodat de
 * site volledig leesbare HTML serveert aan crawlers zonder JavaScript
 * (AI-crawlers, social previews, en als vangnet voor Google).
 * Zelfde aanpak als de bugaway-basis: kale react-dom/server, geen framework.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('dist');
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js');

const log = (...a) => console.log('[prerender]', ...a);

const SITE = (process.env.SITE_URL || 'https://www.flipnsleep.com').replace(/\/$/, '');

const META = {
  '/': {
    title: "flip'nsleep — The Adjustable Cooling Pillow for Hot Sleepers",
    desc: 'Adjustable shredded memory foam pillow with a cool-touch side and a warm bamboo side. Buy 1 get 1 free, 100-night sleep trial, free shipping. Ships to the US and Canada.',
  },
  '/shop': {
    title: "Shop Bundles | flip'nsleep",
    desc: 'Choose the 1+1 (two pillows) or 2+2 (four pillows) bundle of the Signature Cold Pillow. Free shipping and a 100-night sleep trial on every order.',
  },
  '/product/signature-cold-pillow': {
    title: "Signature Cold Pillow — 1+1 Free | flip'nsleep",
    desc: 'The adjustable cooling pillow for hot sleepers. Cool-touch side, warm bamboo side, adjustable shredded memory foam. Buy 1 get 1 free.',
  },
  '/product/cooling-weighted-blanket': {
    title: "Cloudweight Weighted Blanket | flip'nsleep",
    desc: 'A cooling weighted blanket with a bamboo-viscose cover and evenly distributed glass micro-beads. Grounding weight in a breathable fabric that stays cool. Free shipping and a 100-night trial.',
  },
  '/product/bamboo-sheet-set': {
    title: "Breeze Bamboo Sheet Set | flip'nsleep",
    desc: 'A four-piece 100% bamboo viscose sheet set at 400 thread count. Silky, breathable and moisture-wicking, with a deep-pocket fitted sheet that grips the mattress. Free shipping and a 100-night trial.',
  },
  '/product/cooling-comforter': {
    title: "Arctic Air Cooling Comforter | flip'nsleep",
    desc: 'A lightweight all-season comforter with a 100% organic-cotton shell and a double-sided cool-touch finish. Breathable, made for hot sleepers. Free shipping and a 100-night trial.',
  },
  '/how-it-works': {
    title: "How It Works | flip'nsleep",
    desc: 'A cool-touch fabric (Q-max 0.26), adjustable shredded memory foam and a warm bamboo side. One flip to a cooler night — no gadgets, no plugs.',
  },
  '/why-flipnsleep': {
    title: "Why flip'nsleep? The Honest Comparison",
    desc: 'Adjustable loft, dual-sided temperature, washable cover and certified materials — compared side by side with a standard pillow.',
  },
  '/about': {
    title: "Our Story | flip'nsleep",
    desc: "flip'nsleep was built for the 3 AM club: everyone flipping their pillow at night looking for the cold side. So we made a pillow where it's always there.",
  },
  '/faq': {
    title: "FAQ | flip'nsleep",
    desc: '100-night trial, shipping to the US and Canada, washing instructions and how to adjust your pillow — all questions answered.',
  },
  '/reviews': {
    title: "Reviews | flip'nsleep",
    desc: "Verified customer reviews of the Signature Cold Pillow, collected independently through Trustpilot. Real sleepers, real reviews — unfiltered.",
  },
  '/quiz': {
    title: "Sleep Quiz — 15% Off Your Order | flip'nsleep",
    desc: 'Answer a few quick questions about how you sleep and get 15% off your Signature Cold Pillow order.',
  },
  '/privacy': { title: "Privacy Policy | flip'nsleep", desc: "How flip'nsleep handles your data." },
  '/terms': { title: "Terms of Service | flip'nsleep", desc: "The terms that apply to orders on flipnsleep.com." },
  '/returns': { title: "Shipping & Returns | flip'nsleep", desc: 'Free shipping, a 100-night trial and free returns across the US and Canada.' },
  // 404: wordt naar dist/404.html geschreven (niet in de sitemap, noindex).
  '/404': { title: "Page not found | flip'nsleep", desc: "This page took a nap. Head back to flip'nsleep.", file: '404.html', noindex: true },
};

const ROUTES = Object.keys(META);

// JSON-LD: Organization op home, Product + Offer per productpagina (USD-prijzen
// uit data.js). Geen aggregateRating zolang er geen echte reviews zijn.
let DATA = null;
function jsonLd(route) {
  if (!DATA) return '';
  const { PRODUCT, BUNDLES, products } = DATA;
  const brand = { '@type': 'Brand', name: "flip'nsleep" };
  let obj = null;
  if (route === '/') {
    obj = { '@context': 'https://schema.org', '@type': 'Organization', name: "flip'nsleep", url: SITE,
      logo: `${SITE}/images/logo-dark-full.png`, email: 'info@flipnsleep.com',
      parentOrganization: { '@type': 'Organization', name: 'Obtained VOF' } };
  } else if (route === `/product/${PRODUCT.id}`) {
    const url = `${SITE}${route}`;
    obj = { '@context': 'https://schema.org', '@type': 'Product', name: PRODUCT.name, description: PRODUCT.desc,
      image: PRODUCT.images.map(i => `${SITE}${i}`), brand, url,
      offers: BUNDLES.map(b => ({ '@type': 'Offer', name: b.label, price: b.prices.usd.toFixed(2), priceCurrency: 'USD',
        availability: 'https://schema.org/InStock', url })) };
  } else {
    const p = products.find(x => route === `/product/${x.id}`);
    if (p) {
      const url = `${SITE}${route}`;
      obj = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.desc,
        image: p.images.map(i => `${SITE}${i}`), brand, url,
        offers: { '@type': 'Offer', price: p.prices.usd.toFixed(2), priceCurrency: 'USD',
          availability: 'https://schema.org/InStock', url } };
    }
  }
  if (!obj) return '';
  return `  <script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>\n`;
}

function applyMeta(html, route) {
  const m = META[route];
  const canonical = `${SITE}${route === '/' ? '' : route}`;
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${m.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${m.desc}$2`)
    .replace('</head>', m.noindex
      ? `  <meta name="robots" content="noindex" />\n  </head>`
      : `  <link rel="canonical" href="${canonical}" />\n${jsonLd(route)}  </head>`);
}

async function main() {
  // Idempotent: bij een tweede run is index.html al geprerenderd; neem dan de
  // lege shell uit app.html (van dezelfde vite-build) als sjabloon.
  let template = await readFile(path.join(OUT_DIR, 'index.html'), 'utf8');
  if (!template.includes('<div id="root"></div>')) template = await readFile(path.join(OUT_DIR, 'app.html'), 'utf8');
  // De SPA-shell blijft beschikbaar als app.html voor de Vercel-rewrite.
  await writeFile(path.join(OUT_DIR, 'app.html'), template);

  // De (kleine) CSS inline in de HTML zetten: scheelt een render-blokkerend
  // verzoek, vooral merkbaar op mobiel. app.html houdt de gewone <link>.
  let pageTemplate = template;
  const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
  if (cssLink) {
    const css = await readFile(path.join(OUT_DIR, cssLink[1]), 'utf8');
    pageTemplate = template.replace(cssLink[0], `<style>${css}</style>`);
  }

  const mod = await import(SSR_ENTRY);
  const { render } = mod;
  DATA = { PRODUCT: mod.PRODUCT, BUNDLES: mod.BUNDLES, products: mod.products };

  let ok = 0, words = 0;
  for (const route of ROUTES) {
    let html;
    try {
      const appHtml = render(route);
      words += appHtml.split(/\s+/).length;
      html = applyMeta((route === '/' ? pageTemplate : pageTemplate.replace(/\s*<link rel="preload" as="image" href="\/images\/hero-poster[^>]*>/g, '')).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`), route);
      ok++;
    } catch (e) {
      log(`FOUT bij ${route}: ${e.message} — schrijf head-only fallback`);
      html = applyMeta(template, route);
    }
    if (META[route].file) { await writeFile(path.join(OUT_DIR, META[route].file), html); continue; }
    const dir = route === '/' ? OUT_DIR : path.join(OUT_DIR, route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html);
  }

  // sitemap.xml + robots.txt
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.filter(r => !META[r].noindex).map(r => `  <url><loc>${SITE}${r === '/' ? '' : r}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(OUT_DIR, 'sitemap.xml'), sitemap);
  await writeFile(path.join(OUT_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

  log(`${ok}/${ROUTES.length} routes geprerenderd, ${words.toLocaleString('nl-NL')} woorden HTML, sitemap + robots geschreven`);
}

main().catch(e => { console.error(e); process.exit(1); });
