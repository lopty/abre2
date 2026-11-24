// Downloads one openly licensed photograph per community from Wikimedia Commons and records its credit.
// Order: the community's Wikipedia lead image, then a Commons search for "<name> Dubai".
// Output: public/assets/communities/<slug>.webp and -card.webp, data/community-photos.json (credits).
// Run: node scripts/fetch-community-images.mjs [slug ...]   (existing photos are kept unless named)
import fs from 'node:fs/promises';
import sharp from 'sharp';
import communities from '../data/communities.mjs';

const UA = { 'User-Agent': 'website-build-script/1.0 (static site image credits)' };
const OUT = 'public/assets/communities/';
const CREDITS = 'data/community-photos.json';
const OK_LICENCE = /^(cc[- ]by|cc[- ]by-sa|cc0|public domain|pd)/i;
const only = process.argv.slice(2);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Wikimedia rate-limits bursts (HTTP 429), so retry with growing pauses.
async function politeFetch(url) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) }).catch(() => null);
    if (!res) { await sleep(5000 * (attempt + 1)); continue; }
    if (res.status !== 429) return res;
    const wait = Number(res.headers.get('retry-after')) * 1000 || 5000 * (attempt + 1);
    await sleep(wait);
  }
  throw new Error('rate limited');
}
const api = async (host, params) => {
  const url = `https://${host}/w/api.php?` + new URLSearchParams({ format: 'json', origin: '*', ...params });
  const res = await politeFetch(url);
  if (!res.ok) throw new Error(`${host} ${res.status}`);
  return res.json();
};
const strip = (html) => String(html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function fileInfo(fileTitle) {
  const data = await api('commons.wikimedia.org', { action: 'query', titles: fileTitle, prop: 'imageinfo', iiprop: 'url|extmetadata|size|mime', iiurlwidth: '1800' });
  const page = Object.values(data.query.pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info || !/jpeg|png|webp/.test(info.mime) || info.width < 900) return null;
  const meta = info.extmetadata || {};
  const licence = strip(meta.LicenseShortName?.value);
  if (!OK_LICENCE.test(licence)) return null;
  return {
    file: fileTitle,
    page: info.descriptionurl,
    image: info.thumburl || info.url,
    author: strip(meta.Artist?.value) || 'Unknown author',
    licence,
    licenceUrl: meta.LicenseUrl?.value || null
  };
}

async function fromWikipedia(title) {
  if (!title) return null;
  const data = await api('en.wikipedia.org', { action: 'query', titles: title, prop: 'pageimages', piprop: 'name', redirects: '1' });
  const page = Object.values(data.query.pages)[0];
  return page?.pageimage ? fileInfo('File:' + page.pageimage) : null;
}

async function fromCommonsSearch(name) {
  const q = name.replace(/\(.*?\)/g, '').trim() + ' Dubai';
  const data = await api('commons.wikimedia.org', { action: 'query', list: 'search', srsearch: q + ' filetype:bitmap', srnamespace: '6', srlimit: '10' });
  for (const hit of data.query?.search || []) {
    if (/map|logo|plan|diagram|svg/i.test(hit.title)) continue;
    const info = await fileInfo(hit.title);
    if (info) return info;
  }
  return null;
}

await fs.mkdir(OUT, { recursive: true });
let credits = {};
try { credits = JSON.parse(await fs.readFile(CREDITS, 'utf8')); } catch { /* first run */ }

for (const c of communities) {
  if (only.length ? !only.includes(c.slug) : credits[c.slug]) continue;
  try {
    const info = (await fromWikipedia(c.wiki)) /* keyword search disabled: it returned photos of the wrong places */;
    if (!info) { console.log('NO PHOTO  ', c.slug); continue; }
    const res = await politeFetch(info.image);
    if (!res.ok) throw new Error('download ' + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).resize({ width: 1600, height: 900, fit: 'cover', withoutEnlargement: true }).webp({ quality: 80 }).toFile(OUT + c.slug + '.webp');
    await sharp(buf).resize({ width: 750, height: 500, fit: 'cover' }).webp({ quality: 78 }).toFile(OUT + c.slug + '-card.webp');
    credits[c.slug] = { ...info, community: c.name };
    await fs.writeFile(CREDITS, JSON.stringify(credits, null, 2) + '\n');
    console.log('ok        ', c.slug, '|', info.file, '|', info.licence);
  } catch (e) {
    console.log('ERROR     ', c.slug, e.message);
  }
  await sleep(6000);
}
await fs.writeFile(CREDITS, JSON.stringify(credits, null, 2) + '\n');
