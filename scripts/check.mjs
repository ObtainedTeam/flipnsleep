// Controle: console-fouten en horizontale scroll op alle routes bij 390 en 1440px. Draai na npm run build.
import { chromium } from '/home/claude/beginbhv/node_modules/playwright/index.mjs';
import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
const root = '/home/claude/flipnsleep/dist';
const mime = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg','.woff2':'font/woff2','.json':'application/json','.mp4':'video/mp4'};
const srv = createServer(async (req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(root,p); try{ if((await stat(f)).isDirectory()) f=join(f,'index.html'); }catch{ f=join(root,'app.html'); } try{ const b=await readFile(f); res.setHeader('Content-Type',mime[extname(f)]||'application/octet-stream'); res.end(b);}catch{res.statusCode=404;res.end('nf');} }).listen(4334);
const routes=['/','/shop','/product/signature-cold-pillow','/product/cooling-weighted-blanket','/product/bamboo-sheet-set','/product/cooling-comforter','/how-it-works','/why-flipnsleep','/about','/faq','/reviews','/quiz','/privacy','/terms','/returns','/nope'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const w of [390,1440]) { const pg = await b.newPage({ viewport:{width:w,height:900} }); const errs=[]; pg.on('console',m=>{ if(m.type()==='error' && !m.text().includes('TUNNEL')) errs.push(m.text().slice(0,90)); }); pg.on('pageerror',e=>errs.push('PAGEERR '+e.message.slice(0,90)));
 for (const r of routes){ await pg.goto('http://localhost:4334'+r,{waitUntil:'networkidle'}); const ov = await pg.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1); if(ov) errs.push(r+' hscroll'); }
 console.log(w, errs.length? errs : 'ok'); await pg.close(); }
await b.close(); srv.close();
