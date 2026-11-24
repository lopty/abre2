// Reads Emaar's official property sitemap and each project page, and records only factual fields:
// project name and community (from the page title), unit types (from the page's "Key facts"),
// the hero image and the source URL. Emaar's marketing text is NOT copied.
// Output: data/emaar-projects.json, images in public/assets/projects/.
// Run: node scripts/fetch-emaar-projects.mjs   (already-fetched projects are skipped; add --refresh to redo)
import fs from 'node:fs/promises';
import sharp from 'sharp';

const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; property-site-build/1.0)' };
const OUT = 'data/emaar-projects.json';
const IMG = 'public/assets/projects/';
const refresh = process.argv.includes('--refresh');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, binary = false) {
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url, { headers: UA });
      if (res.status === 429 || res.status >= 500) { await sleep(4000 * (i + 1)); continue; }
      if (!res.ok) return null;
      return binary ? Buffer.from(await res.arrayBuffer()) : await res.text();
    } catch { await sleep(3000 * (i + 1)); }
  }
  return null;
}

const decode = (s) => String(s || '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').trim();

function parse(html, url) {
  const flat = html.replace(/\\"/g, '"');
  const field = (k) => decode((flat.match(new RegExp('"' + k + '":"([^"]{2,160})"')) || [])[1] || '');
  const name = field('projectName') || decode(((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '').split('|')[0]);
  const community = field('communityName') || null;
  if (!name) return null;
  const image = field('heroImageUrl') || (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1] || null;
  const block = (flat.match(/ll-keyfacts.{0,2500}/) || [''])[0];
  const facts = [...block.matchAll(/"children":"([^"]{3,120})"/g)].map((m) => decode(m[1])).filter((t) => t !== 'Key facts');
  const units = facts.find((t) => /bed|studio|apartment|villa|townhouse|penthouse|mansion|duplex|plot/i.test(t)) || null;
  // Used only to classify the home type; the text itself is not published.
  const blurb = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1]) + ' ' + name + ' ' + (units || '');
  const types = ['Apartment', 'Townhouse', 'Villa'].filter((t) => new RegExp(t === 'Apartment' ? 'apartment|flat|penthouse|residence' : t.toLowerCase(), 'i').test(blurb));
  const pdf = (kind) => { const m = flat.match(new RegExp('"src":"(/cms-media/uploads/[^"]+_' + kind + '\\.pdf)"', 'i')); return m ? 'https://www.emaar.com' + m[1] : null; };
  const slug = url.split('/').filter(Boolean).pop();
  return { slug, name, community, units, types, image, brochure: pdf('brochure'), floorPlan: pdf('floorplan'), source: url };
}

const urls = (await (await fetch('https://www.emaar.com/sitemap-properties-en.xml', { headers: UA })).text())
  .match(/<loc>[^<]+<\/loc>/g).map((l) => l.replace(/<\/?loc>/g, ''));
let data = [];
try { data = JSON.parse(await fs.readFile(OUT, 'utf8')); } catch { /* first run */ }
const done = new Set(refresh ? [] : data.map((d) => d.source));
await fs.mkdir(IMG, { recursive: true });
console.log(`${urls.length} URLs in sitemap, ${done.size} already fetched`);

for (const url of urls) {
  if (done.has(url)) continue;
  const html = await get(url);
  const p = html && parse(html, url);
  if (!p) { console.log('skip (no data)  ', url); await sleep(800); continue; }
  if (p.image && !(await fs.access(IMG + p.slug + '-card.webp').then(() => true, () => false))) {
    const buf = await get(p.image, true);
    if (buf) {
      try {
        await sharp(buf).resize({ width: 1400, height: 788, fit: 'cover', withoutEnlargement: true }).webp({ quality: 74 }).toFile(IMG + p.slug + '.webp');
        await sharp(buf).resize({ width: 750, height: 500, fit: 'cover' }).webp({ quality: 72 }).toFile(IMG + p.slug + '-card.webp');
        p.localImage = true;
      } catch { p.localImage = false; }
    }
  }
  p.localImage = await fs.access(IMG + p.slug + '-card.webp').then(() => true, () => false);
  p.fetchedAt = new Date().toISOString().slice(0, 10);
  data = data.filter((d) => d.source !== url).concat(p);
  await fs.writeFile(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log('ok', p.name, '|', p.community, '|', p.types.join('/'), '|', p.units || '-');
  await sleep(1200);
}
console.log('done', data.length);
