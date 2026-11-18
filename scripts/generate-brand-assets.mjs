import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public');
const sourceLogo = join(dir, 'images', 'logo.jpg');
const origin = (process.env.VITE_SITE_URL || process.env.URL || '').trim().replace(/\/$/, '');
await mkdir(dir, { recursive: true });

// Use the actual studio logo, never a replacement monogram.
for (const size of [32, 48, 180, 192, 512]) {
  const filename = size === 180 ? 'apple-touch-icon.png'
    : size < 100 ? 'favicon-' + size + '.png'
    : 'icon-' + size + '.png';
  await sharp(sourceLogo).resize(size, size, {fit:'cover',position:'centre'}).png().toFile(join(dir,filename));
}
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#261810"/><stop offset=".6" stop-color="#100b09"/><stop offset="1" stop-color="#3b2619"/></linearGradient><linearGradient id="gold" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#a77438"/><stop offset=".45" stop-color="#ffe2ab"/><stop offset="1" stop-color="#c68a45"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#bg)"/><rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#bb8a4d" stroke-width="2"/>
<path d="M562 112V519" stroke="#aa7540" stroke-width="2" opacity=".65"/>
<text x="635" y="198" font-size="67" font-family="Georgia,serif" font-style="italic" fill="url(#gold)">Deluxe</text>
<text x="636" y="255" font-size="43" font-family="Georgia,serif" fill="#f6d49b">Brow Studio</text>
<path d="M634 287H1126" stroke="#bd8950" stroke-width="2"/>
<text x="636" y="342" font-size="22" font-family="Arial,sans-serif" letter-spacing="2" fill="#fae4c2">PERFEKTE BROWS MIT STIL</text>
<text x="636" y="394" font-size="20" font-family="Arial,sans-serif" fill="#efdbba">Augenbrauenkorrektur</text>
<text x="636" y="431" font-size="20" font-family="Arial,sans-serif" fill="#efdbba">Färben &amp; Laminierung</text>
<text x="636" y="504" font-size="22" font-family="Arial,sans-serif" fill="#edbd7b">Hildesheim · Brow Artist Anastasia</text>
</svg>`);
const logoBuffer = await sharp(sourceLogo).resize(468,468,{fit:'cover'}).png().toBuffer();
await sharp(svg).composite([{input:logoBuffer,left:66,top:80}]).jpeg({quality:89,mozjpeg:true}).toFile(join(dir,'og-deluxe.jpg'));
await writeFile(join(dir,'site.webmanifest'),JSON.stringify({
 name:'Deluxe Brow Studio',short_name:'Deluxe Brow Studio',
 description:'Augenbrauenstudio in Hildesheim',
 start_url:'/',display:'browser',background_color:'#100b09',theme_color:'#100b09',
 icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'}]
},null,2)+'\n');
await writeFile(join(dir,'robots.txt'),'User-agent: *\nAllow: /\n'+(origin?'Sitemap: '+origin+'/sitemap.xml\n':''));
if (origin) await writeFile(join(dir,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+origin+'/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url></urlset>\n');
console.log('Deluxe brand icons and share image created',origin||'without canonical URL');
