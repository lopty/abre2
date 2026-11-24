// Community, developer and agent pages. Called from build.mjs with its shared helpers.
// Data: data/communities.mjs, data/developers.mjs, data/agents/*.json, data/community-photos.json.
import fs from 'node:fs/promises';
import communities from '../data/communities.mjs';
import developers from '../data/developers.mjs';
import { agentShowcase, agentProjects } from './agents-ui.mjs';

export async function loadAgents() {
  const dir = 'data/agents';
  const files = (await fs.readdir(dir).catch(() => [])).filter((f) => f.endsWith('.json'));
  return Promise.all(files.map(async (f) => JSON.parse(await fs.readFile(`${dir}/${f}`, 'utf8'))));
}

export async function buildExpansion(h) {
  const { page, esc, link, crumb, intro, sidebar, cta, faqHtml, faqSchema, wa, icon, projects, business, projectGrid, projectNotice } = h;
  let photos = {};
  try { photos = JSON.parse(await fs.readFile('data/community-photos.json', 'utf8')); } catch { /* no photos yet */ }
  const agents = await loadAgents();
  const published = agents.filter((a) => a.status === 'published');

  const devBySlug = Object.fromEntries(developers.map((d) => [d.slug, d]));
  const short = (c) => c.name.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  const typeText = (types) => types.map((t) => t.toLowerCase() + 's').join(', ').replace(/, ([^,]*)$/, ' and $1');
  // Photo order: licensed community photo, then a developer photo of a project inside the community, then the city skyline.
  const projectPhoto = (c) => projects.find((p) => (p.communitySlug === c.slug || p.community === short(c)) && !p.imageIsCommunity && p.image && p.image !== 'dubai.webp');
  const commImg = (c, card = false, eager = false) => {
    const load = eager ? 'fetchpriority="high"' : 'loading="lazy"';
    if (photos[c.slug]) return `<img src="/assets/communities/${c.slug}${card ? '-card' : ''}.webp" width="${card ? 750 : 1600}" height="${card ? 500 : 900}" alt="${esc(short(c) + ', Dubai')}" ${load} decoding="async">`;
    const p = projectPhoto(c);
    if (p) return `<img src="/assets/${card ? p.image.replace('.webp', '-card.webp') : p.image}" width="${card ? 750 : 1400}" height="${card ? 500 : 788}" alt="${esc(p.name + ' in ' + short(c) + ', Dubai')}" ${load} decoding="async">`;
    return `<img src="/assets/${card ? 'dubai-card.webp' : 'dubai.webp'}" width="${card ? 750 : 1500}" height="${card ? 500 : 790}" alt="${esc('Dubai skyline, used where no photograph of ' + short(c) + ' is available')}" ${load} decoding="async">`;
  };
  const credit = (c) => {
    const ph = photos[c.slug];
    if (ph) return `<p class="photo-credit">Photo: ${esc(ph.author)}, ${ph.licenceUrl ? `<a href="${esc(ph.licenceUrl)}" rel="noopener">${esc(ph.licence)}</a>` : esc(ph.licence)}, via <a href="${esc(ph.page)}" rel="noopener">Wikimedia Commons</a>. The photograph shows the wider area and may not show a specific building.</p>`;
    const p = projectPhoto(c);
    if (p) return `<p class="photo-credit">Photo: ${esc(p.name)}, a ${esc(p.developer)} project in ${esc(short(c))}. Image from the developer; it may be a rendering.</p>`;
    return '';
  };
  const projectsIn = (c) => projects.filter((p) => p.community === c.name || p.communitySlug === c.slug || short(c) === p.community);
  const devLinks = (slugs) => slugs.map((s) => devBySlug[s]).filter(Boolean).map((d) => link('/developers/' + d.slug + '/', esc(d.name))).join(', ');
  const placeSchema = (c) => ({ '@type': 'Place', name: short(c), description: c.intro, address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' }, containedInPlace: { '@type': 'City', name: 'Dubai' }, ...(c.wiki ? { sameAs: ['https://en.wikipedia.org/wiki/' + c.wiki] } : {}) });

  // ---------- Communities ----------
  await page({
    route: '/communities/', title: `Dubai Communities Guide: ${communities.length} Areas | Al Basel`,
    description: `Compare ${communities.length} Dubai communities, from Dubai Hills Estate and Downtown to Palm Jumeirah and JVC. Home types, developers and projects in each area.`,
    h1: 'Find your corner of Dubai.',
    schemas: [{ '@type': 'ItemList', name: 'Dubai communities', itemListElement: communities.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: business.url + '/communities/' + c.slug + '/', name: short(c) })) }],
    body: `<div class="wrap">${crumb([[null, 'Communities']])}${intro('NEIGHBOURHOODS', 'Find your corner of Dubai.', `Begin with how you want to live. Compare ${communities.length} Dubai communities by home type, developer and the projects our team can help you with.`)}
<div class="filters"><div class="pills">${[['', 'All communities'], ['Apartment', 'Apartments'], ['Villa', 'Villas'], ['Townhouse', 'Townhouses']].map(([v, l], i) => `<button type="button" class="pill${i === 0 ? ' active' : ''}" data-community-filter="${v}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div></div>
<div class="community-index">${communities.map((c) => `<a class="community-tile" href="/communities/${c.slug}/" data-types="${c.types.join(' ')}">${commImg(c, true)}<div><h2>${esc(short(c))}</h2><p>${esc(c.types.join(' · '))}</p></div></a>`).join('')}</div>
<p class="legal-note">Community photographs are openly licensed images from Wikimedia Commons. Credits are on each community page.</p></div>${cta('Not sure which community fits? Ask us.')}`
  });

  for (const c of communities) {
    const inC = projectsIn(c);
    const covering = published.filter((a) => (a.communities || []).includes(c.slug));
    const nearby = communities.filter((o) => o.slug !== c.slug && o.developers.some((d) => c.developers.includes(d))).slice(0, 4);
    const fillers = communities.filter((o) => o.slug !== c.slug && !nearby.includes(o)).slice(0, 4 - nearby.length);
    const related = [...nearby, ...fillers];
    const devNames = c.developers.map((s) => devBySlug[s]?.name).filter(Boolean);
    const faqs = [
      [`Who developed ${short(c)}?`, devNames.length ? `${short(c)} is a ${devNames.join(' and ')} community.` : `${short(c)} is an established district built by several developers rather than one master developer.`],
      [`What types of homes are in ${short(c)}?`, `${short(c)} has ${typeText(c.types)}. Sub-communities include ${c.subcommunities.slice(0, 4).join(', ')}.`],
      [`What is near ${short(c)}?`, `Landmarks in and around ${short(c)} include ${c.landmarks.join(', ')}.`],
      [`Who is ${short(c)} a good fit for?`, `${c.suits.join('. ')}.`],
      [`Can Al Basel help me buy, sell or rent in ${short(c)}?`, `Yes. Al Basel Real Estate Brokers is licensed in Dubai for buying, selling and leasing brokerage. Contact us with your budget and timing and we will confirm the homes currently available in ${short(c)}.`]
    ];
    await page({
      route: `/communities/${c.slug}/`,
      title: `${short(c)} Homes & Area Guide | Al Basel`,
      description: `${c.intro} See ${typeText(c.types)}, projects and sub-communities in ${short(c)}.`.slice(0, 300),
      h1: short(c) + '.',
      imageName: photos[c.slug] ? `/assets/communities/${c.slug}.webp` : 'dubai.webp',
      schemas: [placeSchema(c), faqSchema(faqs)],
      body: `<div class="wrap">${crumb([['/communities/', 'Communities'], [null, short(c)]])}${intro('DUBAI COMMUNITY GUIDE', short(c) + '.', c.intro)}
<figure class="community-hero">${commImg(c, false, true)}${credit(c)}</figure>
<div class="detail-layout"><div class="detail-body">
<section><h2>Living in ${esc(short(c))}.</h2>${c.about.map((p) => `<p>${esc(p)}</p>`).join('')}
<div class="fact-grid">${[['Developer', devLinks(c.developers) || 'Several developers'], ['Home types', esc(c.types.join(', '))], ['Location', esc(c.area)], ['Sub-communities', String(c.subcommunities.length)]].map(([k, v]) => `<div class="fact"><small>${k}</small><strong>${v}</strong></div>`).join('')}</div></section>
<section><h2>Neighbourhoods in ${esc(short(c))}.</h2><ul class="chip-list">${c.subcommunities.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>
<section><h2>Around ${esc(short(c))}.</h2><ul>${c.landmarks.map((l) => `<li>${esc(l)}</li>`).join('')}</ul></section>
<section><h2>Who ${esc(short(c))} suits.</h2><ul>${c.suits.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>
<section><h2>Projects in ${esc(short(c))}.</h2>${inC.length ? projectGrid(inC) + projectNotice : `<div class="notice">We are adding project profiles for ${esc(short(c))}. Ask our team for current homes and off-plan releases here. ${link(wa('homes in ' + short(c)), 'Ask about ' + esc(short(c)) + ' ↗', 'text-link')}</div>`}</section>
${covering.length ? `<section><h2>Your ${esc(short(c))} specialists.</h2><div class="agent-grid">${covering.map(agentCard).join('')}</div></section>` : ''}
${faqHtml(faqs)}
<section><h2>Sources.</h2><p class="legal-note">Community facts reviewed ${esc(business.reviewedAt)}.${c.wiki ? ` Background: ${link('https://en.wikipedia.org/wiki/' + c.wiki, 'Wikipedia: ' + esc(c.wiki.replace(/_/g, ' ')))}.` : ''} ${c.developers.map((s) => devBySlug[s]).filter(Boolean).map((d) => link(d.site, esc(d.name) + ' official site')).join(' · ')}</p></section>
<div class="related-list">${related.map((o) => link('/communities/' + o.slug + '/', esc(short(o)))).join('')}${link('/guides/choosing-a-community/', 'How to choose a community')}</div>
</div>${sidebar(short(c))}</div></div>${cta(`Thinking about ${short(c)}? Let’s talk.`)}`
    });
  }

  // ---------- Developers ----------
  const ordered = [...developers.filter((d) => d.partner), ...developers.filter((d) => !d.partner)];
  const commsOf = (d) => communities.filter((c) => c.developers.includes(d.slug));
  const projectsOf = (d) => projects.filter((p) => (p.developer || '').toLowerCase().startsWith(d.name.toLowerCase().split(' ')[0]));
  await page({
    route: '/developers/', title: 'Dubai Property Developers | Al Basel',
    description: 'Emaar, Deyaar, Nakheel, Meraas, DAMAC, Sobha and other Dubai developers: their communities and the projects Al Basel can help you buy into.',
    h1: 'The people behind the places.',
    body: `<div class="wrap">${crumb([[null, 'Developers']])}${intro('DEVELOPERS', 'The people behind the places.', 'Al Basel holds Emaar and Deyaar performance awards from 2014. We also advise on homes from the other major Dubai developers below.')}
<div class="index-list">${ordered.map((d) => `<article class="index-item"><div class="eyebrow">${d.partner ? 'AL BASEL PARTNER DEVELOPER' : 'DUBAI DEVELOPER'}</div><h2>${esc(d.name)}</h2><p>${esc(d.summary)}</p>${link('/developers/' + d.slug + '/', `Explore ${esc(d.name)} ↗`, 'text-link')}</article>`).join('')}</div></div>${cta()}`
  });
  for (const d of ordered) {
    const cs = commsOf(d); const ps = projectsOf(d);
    await page({
      route: `/developers/${d.slug}/`,
      title: `${d.name} Communities & Projects | Al Basel`,
      description: d.summary.slice(0, 300),
      h1: `${d.name} developments.`,
      schemas: [{ '@type': 'Organization', name: d.name, url: d.site, ...(d.wiki ? { sameAs: ['https://en.wikipedia.org/wiki/' + d.wiki] } : {}) }],
      body: `<div class="wrap">${crumb([['/developers/', 'Developers'], [null, d.name]])}${intro(d.partner ? 'AL BASEL PARTNER DEVELOPER' : 'DEVELOPER PROFILE', d.name + ' developments.', `Communities, projects and buying advice for ${d.name} homes in Dubai${d.partner ? ', from a brokerage awarded by ' + d.name + ' in 2014' : ''}.`)}
<div class="detail-layout"><div class="detail-body">
<section><h2>About ${esc(d.name)}.</h2>${d.about.map((p) => `<p>${esc(p)}</p>`).join('')}</section>
${cs.length ? `<section><h2>${esc(d.name)} communities.</h2><div class="community-index">${cs.map((c) => `<a class="community-tile" href="/communities/${c.slug}/">${commImg(c, true)}<div><h3>${esc(short(c))}</h3><p>${esc(c.types.join(' · '))}</p></div></a>`).join('')}</div></section>` : ''}
${ps.length ? `<section><h2>${esc(d.name)} projects.</h2>${projectGrid(ps)}${projectNotice}</section>` : `<section><h2>Ask about ${esc(d.name)} projects.</h2><p>We are adding project profiles for ${esc(d.name)}. Contact our team for current releases, floor plans and the documents to request before reserving.</p></section>`}
<section><h2>Sources.</h2><p class="legal-note">${link(d.site, esc(d.name) + ' official site')}${d.wiki ? ' · ' + link('https://en.wikipedia.org/wiki/' + d.wiki, 'Wikipedia') : ''}. Reviewed ${esc(business.reviewedAt)}.</p></section>
<div class="related-list">${link('/developers/', 'All developers')}${link('/communities/', 'All communities')}${link('/guides/buying-off-plan/', 'Off-plan buying guide')}</div>
</div>${sidebar(d.name + ' homes')}</div></div>${cta()}`
    });
  }

  // ---------- Agents ----------
  function initials(n) { return n.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase(); }
  function avatar(a, big = false) {
    return a.photo
      ? `<img class="agent-photo${big ? ' big' : ''}" src="${esc(a.photo)}" width="${big ? 320 : 160}" height="${big ? 320 : 160}" alt="${esc(a.name)}, ${esc(a.title)} at Al Basel Real Estate">`
      : `<span class="agent-photo agent-initials${big ? ' big' : ''}" aria-hidden="true">${esc(initials(a.name))}</span>`;
  }
  function contactButtons(a, subject) {
    return `<button type="button" class="button primary" data-lead-open data-lead-source="Agent profile: ${esc(a.name)}" data-lead-subject="${esc(subject)}" data-lead-whatsapp="${esc(a.whatsapp)}" data-lead-tel="${esc(a.phoneLink)}" data-lead-tel-display="${esc(a.phone)}">Contact ${esc(a.name.split(' ')[0])} ${icon('chat')}</button>${link('tel:' + a.phoneLink, 'Call ' + esc(a.phone), 'button outline')}`;
  }
  function agentCard(a) {
    return `<a class="agent-card" href="/agents/${a.slug}/">${avatar(a)}<div><h3>${esc(a.name)}</h3><p>${esc(a.title)}</p><small>${esc(a.languages.join(' · '))}</small></div></a>`;
  }
  await page({
    route: '/team/', title: 'Meet the Al Basel Property Team',
    description: 'Meet the Al Basel Real Estate Brokers team. See each agent’s BRN, languages, specialist communities and assigned properties, and contact them directly.',
    h1: 'People you can ask directly.',
    body: `<div class="wrap">${crumb([[null, 'Our team']])}${intro('OUR TEAM', 'People you can ask directly.', 'Each agent profile shows the agent’s Dubai Broker Registration Number (BRN), languages, specialist communities and the properties assigned to them.')}
${published.length ? agentShowcase(published, { esc, projects, heading: 'Our agents.' }) : `<div class="notice">Agent profiles are being added as each agent’s registration details are confirmed. Until then, call or message the office and we will connect you with the right person.</div>`}
<div class="related-list">${link('/verification/', 'Licence & verification')}${link('/contact/', 'Contact the office')}</div></div>${cta()}`
  });
  const demoAgents = agents.filter((x) => x.demo);
  if (demoAgents.length) await page({
    route: '/team/preview/', noindex: true, title: 'Agent showcase preview | Al Basel',
    description: 'Private design preview of the Al Basel agent showcase with demo agents.', h1: 'Agent showcase preview',
    body: `<div class="wrap">${crumb([['/team/', 'Our team'], [null, 'Preview']])}<div class="notice sample-banner"><strong>Design preview with demo agents.</strong> These agents, photos and details are examples. This page is hidden from search engines. On the live site, the same section shows your real agents on the home page and team page.</div><h1 class="preview-h1">Agent showcase preview <span class="demo-flag">DEMO</span></h1>${agentShowcase(demoAgents, { esc, projects, demo: true })}</div>${cta()}`
  });
  for (const a of agents.filter((x) => x.status === 'published' || x.status === 'sample')) {
    const sample = a.status === 'sample';
    const assigned = agentProjects(a, projects);
    const comms = (a.communities || []).map((s) => communities.find((c) => c.slug === s)).filter(Boolean);
    await page({
      route: `/agents/${a.slug}/`, noindex: sample,
      title: `${a.name}, ${a.title} | Al Basel`.slice(0, 59),
      description: `${a.name} is a ${a.title} at Al Basel Real Estate Brokers, Dubai. Specialist in ${a.specialties.slice(0, 2).join(' and ').toLowerCase()}. Contact directly.`,
      h1: a.name,
      schemas: [{ '@type': 'RealEstateAgent', name: a.name, jobTitle: a.title, telephone: a.phone, email: a.email, worksFor: { '@id': business.url + '/#organization' }, knowsLanguage: a.languages, ...(a.brn && !/to be added/i.test(a.brn) ? { identifier: { '@type': 'PropertyValue', propertyID: 'Dubai BRN', value: a.brn } } : {}) }],
      body: `<div class="wrap">${crumb([['/team/', 'Our team'], [null, a.name]])}
${sample ? '<div class="notice sample-banner"><strong>Design preview.</strong> This sample shows how an agent profile looks. It is hidden from search engines and not linked from the site. Real agent details will replace it.</div>' : ''}
<section class="agent-hero">${avatar(a, true)}<div><div class="eyebrow">AL BASEL REAL ESTATE BROKERS</div><h1>${esc(a.name)}</h1><p class="agent-title">${esc(a.title)}</p><p class="agent-brn">Dubai BRN: <strong>${esc(a.brn)}</strong></p><div class="agent-actions">${contactButtons(a, 'Agent: ' + a.name)}</div></div></section>
<div class="detail-layout"><div class="detail-body">
<section><h2>About ${esc(a.name.split(' ')[0])}.</h2>${a.bio.map((p) => `<p>${esc(p)}</p>`).join('')}</section>
<div class="fact-grid">${[['Languages', a.languages.join(', ')], ['Email', a.email]].map(([k, v]) => `<div class="fact"><small>${k}</small><strong>${esc(v)}</strong></div>`).join('')}</div>
<section><h2>Specialties.</h2><ul class="chip-list">${a.specialties.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>
${comms.length ? `<section><h2>Communities.</h2><ul class="chip-list">${comms.map((c) => `<li>${link('/communities/' + c.slug + '/', esc(short(c)))}</li>`).join('')}</ul></section>` : ''}
<section><h2>Properties with ${esc(a.name.split(' ')[0])}.</h2>${assigned.length ? `<div class="project-grid">${assigned.map((p) => agentProjectCard(p, a)).join('')}</div>${projectNotice}` : '<p>No properties are assigned to this agent yet.</p>'}</section>
</div><aside class="sidebar"><div class="eyebrow">SPEAK WITH ${esc(a.name.split(' ')[0].toUpperCase())}</div><h2>Ask ${esc(a.name.split(' ')[0])} directly.</h2><p>Your details are saved for our team, then WhatsApp or a call connects you with ${esc(a.name.split(' ')[0])}.</p><div class="agent-actions stacked">${contactButtons(a, 'Agent: ' + a.name)}</div><small>Brokerage licence ${esc(business.licence.number)} · Agent BRN ${esc(a.brn)}</small></aside></div></div>${cta()}`
    });
  }
  function agentProjectCard(p, a) {
    return `<article class="project-card"><a class="card-image" href="/projects/${p.slug}/"><img src="/assets/${p.image.replace('.webp', '-card.webp')}" width="750" height="500" alt="${esc(p.name + ' in ' + p.community)}" loading="lazy" decoding="async"><span class="card-tag">${esc(p.tag)}</span><span class="card-arrow">↗</span></a><div class="card-info"><div class="card-top"><h3>${link('/projects/' + p.slug + '/', esc(p.name))}</h3><span class="developer">${esc(p.developer)}</span></div><p class="location">⌖ &nbsp;${esc(p.community)}, Dubai</p><div class="card-details">${esc(p.bedrooms)}</div><div class="card-bottom"><span>Enquire for current details</span><button type="button" class="text-link" data-lead-open data-lead-source="Agent property: ${esc(a.name)}" data-lead-subject="${esc(p.name + ' (agent: ' + a.name + ')')}" data-lead-whatsapp="${esc(a.whatsapp)}" data-lead-tel="${esc(a.phoneLink)}" data-lead-tel-display="${esc(a.phone)}">Enquire ${icon('chat')}</button></div></div></article>`;
  }

  return { communities, developers, agents: published, short };
}
