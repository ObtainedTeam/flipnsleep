// Sectie-screenshot: node scripts/secshot.mjs <route> <css-selector|y> <out.png> [width]
import { chromium } from '/home/claude/beginbhv/node_modules/playwright/index.mjs';
import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
const root = '/home/claude/flipnsleep/dist';
const mime = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg','.woff2':'font/woff2','.json':'application/json','.mp4':'video/mp4'};
const srv = createServer(async (req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(root,p); try{ if((await stat(f)).isDirectory()) f=join(f,'index.html'); }catch{ f=join(root,'app.html'); } try{ const b=await readFile(f); res.setHeader('Content-Type',mime[extname(f)]||'application/octet-stream'); res.end(b);}catch{res.statusCode=404;res.end('nf');} }).listen(4333);
const [,, route='/', sel='0', out='/tmp/sec.png', w='1440'] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const pg = await b.newPage({ viewport:{width:+w,height:900} });
await pg.goto('http://localhost:4333'+route, { waitUntil:'networkidle' });
await pg.evaluate(()=>{ document.querySelectorAll('[data-reveal],.reveal').forEach(e=>e.style.opacity=1); });
let y = Number(sel); if (isNaN(y)) y = await pg.$eval(sel, e=>e.getBoundingClientRect().top + window.scrollY);
await pg.evaluate((y)=>window.scrollTo(0,y), y); await pg.waitForTimeout(1500);
await pg.screenshot({ path: out });
await b.close(); srv.close();
