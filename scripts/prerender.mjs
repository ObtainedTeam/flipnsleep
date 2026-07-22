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
    title: "flip'nsleep — The Adjustable Cooling Pillow for Night Sweats",
    desc: 'Adjustable shredded memory foam pillow with a cool-touch side and a warm bamboo side. Buy 1 get 1 free, 100-night sleep trial, free shipping. Ships to the US and Canada.',
  },
  '/shop': {
    title: "Shop Bundles | flip'nsleep",
    desc: 'Choose the 1+1 (two pillows) or 2+2 (four pillows) bundle of the Signature Cold Pillow. Free shipping and a 100-night sleep trial on every order.',
  },
  '/product/signature-cold-pillow': {
    title: "Signature Cold Pillow — 1+1 Free | flip'nsleep",
    desc: 'The adjustable pillow that keeps the night sweats away. Cool-touch side, warm bamboo side, adjustable shredded memory foam. Buy 1 get 1 free.',
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
  '/privacy': { title: "Privacy Policy | flip'nsleep", desc: "How flip'nsleep handles your data." },
  '/terms': { title: "Terms of Service | flip'nsleep", desc: "The terms that apply to orders on flipnsleep.com." },
  '/returns': { title: "Shipping & Returns | flip'nsleep", desc: 'Free shipping, a 100-night trial and free returns across the US and Canada.' },
};

const ROUTES = Object.keys(META);

function applyMeta(html, route) {
  const m = META[route];
  const canonical = `${SITE}${route === '/' ? '' : route}`;
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${m.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${m.desc}$2`)
    .replace('</head>', `  <link rel="canonical" href="${canonical}" />\n  </head>`);
}

async function main() {
  const template = await readFile(path.join(OUT_DIR, 'index.html'), 'utf8');
  // De SPA-shell blijft beschikbaar als app.html voor de Vercel-rewrite.
  await writeFile(path.join(OUT_DIR, 'app.html'), template);

  const { render } = await import(SSR_ENTRY);

  let ok = 0, words = 0;
  for (const route of ROUTES) {
    let html;
    try {
      const appHtml = render(route);
      words += appHtml.split(/\s+/).length;
      html = applyMeta(template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`), route);
      ok++;
    } catch (e) {
      log(`FOUT bij ${route}: ${e.message} — schrijf head-only fallback`);
      html = applyMeta(template, route);
    }
    const dir = route === '/' ? OUT_DIR : path.join(OUT_DIR, route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html);
  }

  // sitemap.xml + robots.txt
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map(r => `  <url><loc>${SITE}${r === '/' ? '' : r}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(OUT_DIR, 'sitemap.xml'), sitemap);
  await writeFile(path.join(OUT_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

  log(`${ok}/${ROUTES.length} routes geprerenderd, ${words.toLocaleString('nl-NL')} woorden HTML, sitemap + robots geschreven`);
}

main().catch(e => { console.error(e); process.exit(1); });
