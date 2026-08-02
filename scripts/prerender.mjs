/**
 * prerender.mjs
 *
 * Rendert elke React-route naar statische HTML in dist/<route>/index.html.
 *
 * Waarom: een Vite SPA levert een lege div aan wie geen JavaScript draait.
 * Googlebot rendert JS meestal wel, de AI-crawlers (ChatGPT, Perplexity, Claude)
 * niet betrouwbaar. Zonder dit staan je productpagina's wél in de sitemap maar
 * is er niks te lezen als je er komt.
 *
 * Geen framework, geen browser, geen Next.js. Kale react-dom/server op de
 * bestaande componenten.
 *
 * Draait als onderdeel van de build:
 *   vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr
 *     && node scripts/prerender.mjs && node scripts/build-blog.mjs
 *
 * BEWUST NIET GEPRERENDERD:
 *   /blog en /blog/:slug — de blogpagina haalt zijn artikelen client-side op uit
 *     blog-articles.json, dus een geprerenderde versie toont "Loading articles…".
 *     De artikelpagina's zelf zijn al statische HTML via build-blog.mjs, en dat
 *     is waar de tekst staat. Zie de opmerking in build-blog.mjs.
 *   de * catch-all — die rendert Home op elke onbekende URL.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { products } from '../src/data.js';
import { activities } from '../src/data/activities.js';

const OUT_DIR = path.resolve('dist');
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js');

const log = (...a) => console.log('[prerender]', ...a);

/**
 * Titel, omschrijving en canonical per route.
 *
 * Tot nu toe had ELKE pagina dezelfde title en meta description, want die staan
 * in index.html en React zet ze nooit. Dat is een van de meest basale
 * SEO-problemen die er is: Google ziet 22 pagina's die zichzelf allemaal
 * "Bug Away — Tick-Proof Outdoor Clothing" noemen. Nu we toch per route HTML
 * schrijven, kunnen we ze meteen goed zetten.
 */
const SITE = (process.env.SITE_URL || 'https://www.bugawaygear.com').replace(/\/$/, '');

const META = {
  '/': {
    title: 'Bug Away — Chemical-Free Tick & Insect Protective Clothing',
    desc: 'No-see-um-grade mesh that stops ticks, mosquitoes and black flies by weave, not insecticide. Nothing to reapply, nothing to wash out. Ships to the US and Canada.',
  },
  '/shop': {
    title: 'Shop All Products | Bug Away',
    desc: 'Jackets, pants, combo sets and kids gear in no-see-um-grade mesh. Chemical-free tick and mosquito protection. Free US shipping over $150.',
  },
  '/how-it-works': {
    title: 'How It Works | Bug Away Mesh Explained',
    desc: 'Mesh openings under 0.6mm stop ticks and mosquitoes physically. No permethrin, no DEET, nothing that washes out. Here is why the weave is the protection.',
  },
  '/why-choose-us': {
    title: 'Why Choose Bug Away | Mesh vs Permethrin vs DEET',
    desc: 'An honest comparison of chemical-free mesh against permethrin clothing, DEET sprays and regular clothing, including what Bug Away does not do.',
  },
  '/about': { title: 'About Bug Away | Insecticide-Free Insect Protection', desc: 'Who Bug Away is and why the brand blocks biting insects with a weave instead of a chemical.' },
  '/reviews': { title: 'Reviews | Verified Customer Reviews | Bug Away', desc: 'Verified Bug Away customer reviews, collected independently through Trustpilot. Real trails, real reviews — unfiltered.' },
  '/faq': { title: 'FAQ | Sizing, Care, Shipping & Returns | Bug Away', desc: 'Answers on sizing, washing, shipping to the US and Canada, returns and how the mesh works.' },
  '/pets': { title: 'Tick Protection for Dogs — Coming Soon | Bug Away', desc: 'Dogs carry ticks straight back into the house. Sign up to hear when Bug Away pet protection launches.' },
  '/accessories': { title: 'Accessories — Coming Soon | Bug Away', desc: 'Head, neck, hand and ankle coverage for the gaps. Sign up to hear when Bug Away accessories launch.' },
  '/blog': {
    title: 'Blog | Tick Awareness & Insect Protection | Bug Away',
    desc: 'Field-tested articles on ticks, Lyme disease, insect protection and outdoor gear for the US and Canada. New pieces every week.',
  },
  '/privacy': { title: 'Privacy Policy | Bug Away', desc: 'How Bug Away handles your personal data.' },
  '/returns': { title: 'Returns & Refunds | Bug Away', desc: 'How to return or exchange a Bug Away order.' },
  '/terms': { title: 'Terms of Service | Bug Away', desc: 'The terms that apply to orders placed with Bug Away.' },
};

for (const a of activities) {
  META[`/${a.slug}`] = { title: a.metaTitle, desc: a.metaDescription };
}
for (const p of products) {
  META[`/product/${p.id}`] = {
    // Productnamen beginnen al met "Bug Away", dus geen merksuffix erachter.
    title: `${p.name} | Chemical-Free Tick Protection`,
    desc: String(p.desc || '').replace(/\s+/g, ' ').trim().slice(0, 158),
  };
}

const esc = (t = '') =>
  String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Vervangt title/description in de shell en zet canonical + OG per route. */
function applyMeta(html, route) {
  const m = META[route];
  if (!m) return html;
  const url = `${SITE}${route === '/' ? '' : route}`;

  let out = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(m.title)}</title>`);

  if (/<meta\s+name="description"[^>]*>/i.test(out)) {
    out = out.replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${esc(m.desc)}">`);
  } else {
    out = out.replace('</title>', `</title>\n    <meta name="description" content="${esc(m.desc)}">`);
  }

  const tags = [
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.desc)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:site_name" content="Bug Away">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ].join('\n    ');

  return out.replace('</head>', `    ${tags}\n  </head>`);
}

/**
 * NIET GEPRERENDERD, met reden:
 *
 *   '/'      Home.jsx gebruikt useIsMobile op 43 plekken, waarvan twee die echt
 *            andere markup renderen (het categorieblok en 3 vs 4 bestsellers).
 *            Geprerenderd levert dat op een telefoon 576px breed op tegen 390px
 *            na hydration, en ~800px hoogteverschil. Dus een verkeerde layout
 *            gedurende de eerste paar honderd ms, precies waar de Meta-ads op
 *            landen. Zet Home eerst om naar CSS media queries zoals Nav, Footer
 *            en de activiteitenpagina's, dan kan hij hier gewoon bij.
 *   '/shop'  zelfde verhaal, kleiner: 397px vs 390px en ~294px hoogteverschil.
 *   '/blog'  haalt artikelen client-side op, geprerenderd staat er
 *            "Loading articles…". De artikelpagina's zelf zijn al statisch via
 *            build-blog.mjs en daar staat de tekst.
 *
 * Alle andere routes zijn gemeten: identiek met en zonder JS.
 * Op /how-it-works, /about en de productpagina's loopt de layout op mobiel over,
 * maar exact even veel met als zonder JS. Dat is een bestaande bug in die
 * pagina's, geen gevolg van prerenderen, dus die staan er wel bij.
 */
/**
 * Alleen de <head>, lege body.
 *
 * Deze drie kunnen we niet volledig prerenderen (zie hierboven), maar de reden
 * daarvoor zit in de body, niet in de head. Titel en omschrijving staan los van
 * de layout. Dus schrijven we voor deze routes een pagina met de juiste head en
 * een leeg <div id="root">. React tekent de pagina daarna precies zoals hij nu
 * al doet: main.jsx ziet een lege root en kiest createRoot in plaats van
 * hydrateRoot. Geen HTML om mee te botsen, dus geen flits en geen risico.
 *
 * Crawlers krijgen wel de goede titel, en dat was het hele punt.
 */
const HEAD_ONLY = ['/', '/shop', '/blog'];

const ROUTES = [
  '/how-it-works',
  '/why-choose-us',
  '/about',
  '/reviews',
  '/faq',
  '/pets',
  '/accessories',
  '/privacy',
  '/returns',
  '/terms',
  ...activities.map((a) => `/${a.slug}`),
  ...products.map((p) => `/product/${p.id}`),
];

async function main() {
  if (!existsSync(OUT_DIR)) throw new Error('dist/ bestaat niet. Draai dit na `vite build`.');
  if (!existsSync(SSR_ENTRY)) {
    // Niet fataal: zonder SSR-bundel valt de site terug op het gedrag van
    // voorheen, een gewone SPA. Beter een site zonder prerender dan geen site.
    log('dist-ssr/entry-server.js ontbreekt, prerenderen overgeslagen.');
    return;
  }

  const { render } = await import(SSR_ENTRY);

  // Normaal is dist/index.html de kale shell van vite build. Maar dit script
  // schrijft daar zelf de homepage overheen, dus bij een tweede run zonder
  // rebuild is hij niet meer leeg. Vite leegt dist bij elke build, dus op Vercel
  // speelt dit niet. Lokaal wel, en dan pakken we de bewaarde app.html.
  const indexPath = path.join(OUT_DIR, 'index.html');
  const appPath = path.join(OUT_DIR, 'app.html');
  let shell = await readFile(indexPath, 'utf8');
  if (!shell.includes('<div id="root"></div>') && existsSync(appPath)) {
    shell = await readFile(appPath, 'utf8');
    log('index.html was al geprerenderd, app.html gebruikt als shell');
  }

  // dist/index.html wordt zo de geprerenderde homepage. Maar vercel.json stuurt
  // alles wat geen bestand is naar diezelfde index.html, en dan zou /blog de
  // homepage-HTML serveren voor React hem vervangt. Daarom zetten we de lege
  // shell apart in app.html en laat vercel.json de fallback daarheen wijzen.
  await writeFile(appPath, shell, 'utf8');

  if (!shell.includes('<div id="root"></div>')) {
    throw new Error('Kon <div id="root"></div> niet vinden in dist/index.html.');
  }

  let ok = 0;
  let words = 0;

  // Eerst de head-only routes: zelfde shell, alleen andere meta.
  for (const route of HEAD_ONLY) {
    const dir = route === '/' ? OUT_DIR : path.join(OUT_DIR, route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), applyMeta(shell, route), 'utf8');
  }
  log(`${HEAD_ONLY.length} routes head-only (${HEAD_ONLY.join(', ')}): eigen title, body blijft leeg`);

  for (const route of ROUTES) {
    let html;
    try {
      html = render(route);
    } catch (err) {
      // Eén kapotte route mag de hele build niet slopen. Die route valt terug
      // op de SPA en de rest van de site staat er gewoon.
      log(`LET OP ${route} overgeslagen: ${err.message}`);
      continue;
    }

    const page = applyMeta(
      shell.replace('<div id="root"></div>', `<div id="root">${html}</div>`),
      route
    );

    const dir = route === '/' ? OUT_DIR : path.join(OUT_DIR, route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), page, 'utf8');

    words += html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    ok++;
  }

  const noMeta = [...ROUTES, ...HEAD_ONLY].filter((r) => !META[r]);
  if (noMeta.length) log(`LET OP geen title/description voor: ${noMeta.join(', ')}`);
  log(`${ok}/${ROUTES.length} routes volledig geprerenderd, ${words.toLocaleString('nl-NL')} woorden HTML`);
  log(`${ROUTES.length + HEAD_ONLY.length - noMeta.length} unieke titles totaal`);
  if (ok < ROUTES.length) log(`LET OP ${ROUTES.length - ok} route(s) mislukt, die vallen terug op de SPA`);
}

main().catch((err) => {
  console.error('[prerender] FOUT:', err);
  process.exit(1);
});
