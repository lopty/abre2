// Adds the official gallery photos (exterior, interior, amenities) to each Emaar project in data/emaar-projects.json.
// Up to MAX photos per project, resized to 1200px WebP in public/assets/projects/gallery/.
// Run: node scripts/fetch-emaar-galleries.mjs        (projects that already have a gallery are skipped)
import fs from 'node:fs/promises';
import sharp from 'sharp';

const MAX = 8;
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; property-site-build/1.0)' };
const DATA = 'data/emaar-projects.json';
const DIR = 'public/assets/projects/gallery/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, binary = false) {
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30000) });
      if (res.status === 429 || res.status >= 500) { await sleep(4000 * (i + 1)); continue; }
      if (!res.ok) return null;
      return binary ? Buffer.from(await res.arrayBuffer()) : await res.text();
    } catch { await sleep(3000 * (i + 1)); }
  }
  return null;
}

function galleryUrls(html) {
  const flat = html.replace(/\\"/g, '"');
  const block = (flat.match(/"galleries":\[.*?\]\}\]/s) || flat.match(/"galleries":\[.{0,30000}/s) || [''])[0];
  const out = [];
  for (const g of block.matchAll(/"key":"([a-z]+)".*?"images":\[(.*?)\]/gs)) {
    for (const m of g[2].matchAll(/"url":"(\/uploads\/[^"]+\.(?:jpe?g|png|webp))"/gi)) out.push({ key: g[1], url: 'https://uae-cms.emaar.com' + m[1] });
  }
  // Some pages have an empty gallery but show feature photos of the project instead.
  if (!out.length) for (const m of flat.matchAll(/"url":"(\/uploads\/(?!large_|medium_|small_|thumbnail_)[^"]*feature_block[^"]+\.(?:jpe?g|png|webp))"/gi)) out.push({ key: 'feature', url: 'https://uae-cms.emaar.com' + m[1] });
  const seen = new Set();
  return out.filter((x) => !seen.has(x.url) && seen.add(x.url));
}

const data = JSON.parse(await fs.readFile(DATA, 'utf8'));
await fs.mkdir(DIR, { recursive: true });
let n = 0;
for (const p of data) {
  n++;
  if (Array.isArray(p.gallery) && p.gallery.length) continue;
  const html = await get(p.source);
  if (!html) { console.log(`${n}/${data.length} no page`, p.slug); continue; }
  // Spread the picks across the gallery groups (exterior, interior, amenities...).
  const all = galleryUrls(html);
  const groups = [...new Set(all.map((x) => x.key))];
  const picks = [];
  for (let i = 0; picks.length < MAX && picks.length < all.length; i++) {
    for (const k of groups) { const g = all.filter((x) => x.key === k); if (g[i] && picks.length < MAX) picks.push(g[i]); }
    if (i > 20) break;
  }
  const gallery = [];
  for (const [i, img] of picks.entries()) {
    const buf = await get(img.url, true);
    if (!buf) continue;
    const file = `${p.slug}-${i + 1}.webp`;
    try {
      const info = await sharp(buf).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 70 }).toFile(DIR + file);
      gallery.push({ file: 'projects/gallery/' + file, w: info.width, h: info.height, kind: img.key });
    } catch { /* unreadable image */ }
    await sleep(250);
  }
  p.gallery = gallery;
  await fs.writeFile(DATA, JSON.stringify(data, null, 2) + '\n');
  console.log(`${n}/${data.length} ok`, p.slug, gallery.length, 'photos');
  await sleep(800);
}
console.log('done');
