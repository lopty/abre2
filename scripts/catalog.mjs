// Turns developer project data into the project shape used by build.mjs.
// Sources: data/emaar-projects.json (from scripts/fetch-emaar-projects.mjs) and data/catalog-projects.mjs (hand-checked).
import fs from 'node:fs/promises';
import communities from '../data/communities.mjs';
import curated from '../data/catalog-projects.mjs';

const short = (c) => c.name.replace(/\s*\(.*?\)\s*/g, ' ').trim();
const unescape = (s) => String(s || '').replace(/\\u0026/g, '&').replace(/\\u0027/g, "'");
// Emaar sometimes publishes names in capitals or with a '|' separator ("PARK HORIZON", "52 | 42").
const SMALL = new Set(['by', 'at', 'of', 'the', 'and', 'in']);
function pretty(raw) {
  let n = unescape(raw).trim().replace(/^(\d+)\s*\|\s*(\d+)$/, '$1|$2').replace(/\s*\|\s*/g, (m, i, s) => (/^\d+\|\d+$/.test(s) ? '|' : ', '));
  if (n === n.toUpperCase() && /[A-Z]{3}/.test(n)) {
    n = n.toLowerCase().split(' ').map((w, i) => (/\d/.test(w) && /^v\d+$/.test(w) ? w.toUpperCase() : (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))).join(' ');
  }
  return n;
}
const norm = (s) => unescape(s).toLowerCase().replace(/\biii\b/g, '3').replace(/\bii\b/g, '2').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();

// Emaar community names that differ from ours.
const ALIASES = {
  'rashid yachts and marina': 'mina-rashid',
  'mina rashid': 'mina-rashid',
  'dubai harbour': 'emaar-beachfront',
  'expo living': 'dubai-south',
  'expo city dubai': 'dubai-south',
  'arabian ranches 3': 'arabian-ranches-3',
  'arabian ranches 2': 'arabian-ranches-2',
  'downtown': 'downtown-dubai',
  'the oasis': 'the-oasis',
  'emirates living': 'emirates-living',
  'the greens': 'the-greens-and-views',
  'forte downtown dubai': 'downtown-dubai',
  'grand polo club and resort': 'grand-polo-club-and-resort'
};

function communityFor(name) {
  const n = norm(name);
  if (!n) return null;
  if (ALIASES[n]) return communities.find((c) => c.slug === ALIASES[n]);
  return communities.find((c) => norm(short(c)) === n || norm(c.name) === n) || null;
}

async function exists(p) { return fs.access(p).then(() => true, () => false); }

export async function catalogProjects(existing) {
  const out = [];
  const taken = new Set(existing.map((p) => p.slug));
  const seenSources = new Set(existing.map((p) => p.source));
  const unmatched = {};

  let emaar = [];
  try { emaar = JSON.parse(await fs.readFile('data/emaar-projects.json', 'utf8')); } catch { /* not fetched yet */ }

  for (const raw of emaar) {
    const e = { ...raw, name: pretty(raw.name), community: unescape(raw.community), units: raw.units ? unescape(raw.units) : null };
    if (seenSources.has(e.source)) continue;
    const c = communityFor(e.community);
    if (!c) { unmatched[e.community || 'none'] = (unmatched[e.community || 'none'] || 0) + 1; continue; }
    let slug = e.slug;
    if (taken.has(slug)) slug = slug + '-emaar';
    taken.add(slug);
    const type = e.types?.[0] || c.types[0];
    const hasImg = e.localImage && await exists(`public/assets/projects/${e.slug}-card.webp`);
    const where = short(c);
    const units = e.units || null;
    out.push({
      slug, name: e.name.replace(/\s+at\s+.*$/i, (m) => (norm(m).includes(norm(where)) ? '' : m)).trim() || e.name,
      developer: 'Emaar', community: where, communitySlug: c.slug, type,
      bedrooms: units || `${(e.types?.length ? e.types : [type]).join(', ')} (home types on request)`,
      image: hasImg ? `projects/${e.slug}.webp` : (await exists(`public/assets/communities/${c.slug}-card.webp`) ? `communities/${c.slug}.webp` : 'dubai.webp'),
      imageIsCommunity: !hasImg,
      tag: 'Emaar project',
      description: `${e.name} is an Emaar project in ${where}${units ? ', with ' + units.charAt(0).toLowerCase() + units.slice(1) : ''}. Ask Al Basel for the current price list, payment plan and handover status before choosing a unit.`,
      highlights: [units || 'Home types confirmed on request', `Part of ${where}`, e.brochure ? 'Developer brochure available' : 'Developer project page available'],
      gallery: (e.gallery || []).filter((g) => g.file),
      source: e.source, brochure: e.brochure || null, floorPlan: e.floorPlan || null,
      brokerSource: null, handover: null, paymentPlan: null, launch: false, reviewedAt: e.fetchedAt
    });
  }

  for (const p of curated) {
    const c = communities.find((x) => x.slug === p.communitySlug);
    if (!c) { unmatched[p.communitySlug] = (unmatched[p.communitySlug] || 0) + 1; continue; }
    if (taken.has(p.slug)) continue;
    taken.add(p.slug);
    out.push({
      slug: p.slug, name: p.name, developer: p.developer, community: short(c), communitySlug: c.slug, type: p.type,
      bedrooms: p.units, image: await exists(`public/assets/communities/${c.slug}-card.webp`) ? `communities/${c.slug}.webp` : 'dubai.webp',
      imageIsCommunity: true, tag: p.developer + ' project', description: p.description + ' Ask Al Basel for current availability, prices and documents.',
      highlights: [p.units, `Part of ${short(c)}`, `${p.developer} project page available`],
      source: p.source, brochure: null, floorPlan: null, brokerSource: null, handover: null, paymentPlan: null, launch: false, reviewedAt: '2026-11-19'
    });
  }

  // Shortened names can collide (two 'Address Residences'); fall back to the full name, then the slug.
  const count = (n) => out.filter((p) => p.name === n).length + existing.filter((p) => p.name === n).length;
  for (const p of out) p.name = pretty(p.name);
  for (const p of out) {
    if (count(p.name) < 2) continue;
    const full = (emaar.find((e) => e.source === p.source) || {}).name;
    if (full && pretty(full) !== p.name && count(pretty(full)) === 0) { p.name = pretty(full); continue; }
    p.name = p.slug.replace(/-emaar$/, '').split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  if (Object.keys(unmatched).length) console.log('Projects skipped (community not covered yet):', JSON.stringify(unmatched));
  return out;
}
