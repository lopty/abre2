// Agent showcase: Instagram-style story circles + a card carousel.
// Used on the home page and team page (published agents only) and on the private /team/preview/ page (demo agents).
import communities from '../data/communities.mjs';

const short = (c) => c.name.replace(/\s*\(.*?\)\s*/g, ' ').trim();
const first = (a) => a.name.split(' ')[0];
const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

/** Projects linked to an agent: assigned ones for real agents, or a preview set for demo agents. */
export function agentProjects(a, projects) {
  if (a.status === 'published') return projects.filter((p) => p.agent === a.slug);
  if (a.previewProjects?.length) return projects.filter((p) => a.previewProjects.includes(p.slug));
  const inMine = (p) => (a.communities || []).some((s) => p.communitySlug === s || p.community === short(communities.find((c) => c.slug === s) || { name: '' }));
  return projects.filter(inMine).slice(0, 8);
}

export function agentShowcase(agents, { esc, projects, heading = 'Meet our agents.', intro = 'Speak to the specialist who knows your community. Every enquiry reaches the agent directly on WhatsApp.', demo = false }) {
  if (!agents.length) return '';
  const avatar = (a, cls = '') => a.photo
    ? `<img class="${cls}" src="${esc(a.photo)}" width="160" height="160" alt="${esc(a.name)}" loading="lazy" decoding="async">`
    : `<span class="${cls} agent-initials" aria-hidden="true">${esc(initials(a.name))}</span>`;
  const commNames = (a) => (a.communities || []).map((s) => communities.find((c) => c.slug === s)).filter(Boolean).map(short);
  const contact = (a, label, cls) => `<button type="button" class="${cls}" data-lead-open data-lead-source="Agent showcase: ${esc(a.name)}" data-lead-subject="${esc('Agent: ' + a.name)}" data-lead-whatsapp="${esc(a.whatsapp)}" data-lead-tel="${esc(a.phoneLink)}" data-lead-tel-display="${esc(a.phone)}">${label}</button>`;

  const data = agents.map((a) => {
    const ps = agentProjects(a, projects);
    return {
      slug: a.slug, name: a.name, title: a.title, photo: a.photo || null, initials: initials(a.name),
      years: a.years || null, languages: a.languages || [], specialties: a.specialties || [], communities: commNames(a),
      count: ps.length, projects: ps.slice(0, 3).map((p) => ({ name: p.name, img: '/assets/' + p.image.replace('.webp', '-card.webp'), url: '/projects/' + p.slug + '/' })),
      // Cover: a real photo of one of the agent's own projects (developer photo, not a community stand-in).
      cover: (() => { const c = ps.find((p) => !p.imageIsCommunity && p.image && p.image !== 'dubai.webp') || ps[0]; return c ? { img: '/assets/' + c.image.replace('.webp', '-card.webp'), name: c.name } : null; })(),
      whatsapp: a.whatsapp, phone: a.phone, phoneLink: a.phoneLink
    };
  });

  return `<section class="agent-showcase${demo ? ' is-demo' : ''}" aria-label="Our agents">
<div class="as-head"><div><div class="eyebrow">OUR AGENTS</div><h2>${esc(heading)}</h2><p>${esc(intro)}</p></div>
<div class="as-arrows"><button type="button" class="as-arrow" data-as-prev aria-label="Previous agents">‹</button><button type="button" class="as-arrow" data-as-next aria-label="Next agents">›</button></div></div>

<div class="agent-stories" aria-label="Agent stories">${data.map((a, i) => `<button type="button" class="story" data-story="${i}" aria-label="Open ${esc(a.name)}’s story"><span class="story-ring">${avatar(agents[i], 'story-photo')}</span><span class="story-name">${esc(first(agents[i]))}</span></button>`).join('')}<a class="story story-all" href="/team/"><span class="story-ring is-plain"><span class="story-photo story-plus" aria-hidden="true">+</span></span><span class="story-name">All agents</span></a></div>

<div class="as-track" data-as-track>${agents.map((a, i) => {
    const d = data[i];
    return `<article class="as-card">
<a class="as-photo${d.cover ? ' has-cover' : ''}" href="/agents/${a.slug}/">${d.cover ? `<img class="as-cover" src="${esc(d.cover.img)}" width="750" height="500" alt="${esc(d.cover.name)}, a project handled by ${esc(a.name)}" loading="lazy" decoding="async">` : ''}${avatar(a, 'as-avatar')}${d.years ? `<span class="as-badge">${d.years} yrs experience</span>` : ''}${d.cover ? `<span class="as-cover-name">${esc(d.cover.name)}</span>` : ''}</a>
<div class="as-body"><h3><a href="/agents/${a.slug}/">${esc(a.name)}</a></h3><p class="as-title">${esc(a.title)}</p>
<p class="as-lang">Speaks ${esc(d.languages.join(', '))}</p>
<div class="as-label">Expert in</div><ul class="as-chips">${d.specialties.slice(0, 3).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
<p class="as-areas">${esc(d.communities.join(' · '))}</p>
<p class="as-count"><strong>${d.count}</strong> ${d.count === 1 ? 'project' : 'projects'} assigned</p></div>
<div class="as-actions">${contact(a, 'WhatsApp', 'as-btn as-wa')}<a class="as-btn as-call" href="tel:${esc(a.phoneLink)}">Call</a></div>
</article>`;
  }).join('')}</div>

<dialog class="story-viewer" aria-label="Agent stories"><div class="sv-bars">${data.map(() => '<span><i></i></span>').join('')}</div>
<button type="button" class="sv-close" aria-label="Close stories">×</button>
<div class="sv-slide" data-sv-slide></div>
<button type="button" class="sv-zone sv-left" aria-label="Previous agent"></button><button type="button" class="sv-zone sv-right" aria-label="Next agent"></button></dialog>
<script type="application/json" data-story-list>${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>
</section>`;
}
