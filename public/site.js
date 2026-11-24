const menu = document.querySelector('[data-menu]');
menu?.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open));
 document.querySelector('.main-nav')?.classList.toggle('is-open', open);
});
const form = document.querySelector('[data-search]');
const cards = [...document.querySelectorAll('[data-project]')];
function filterProjects() {
 if(!form) return;
 const values = new FormData(form);
 let count=0;
 cards.forEach(card=>{
  const matches=['location','type'].every(key=>!values.get(key)||card.dataset[key]===values.get(key));
  card.hidden=!matches; if(matches) count++;
 });
 const countEl=document.querySelector('[data-count]');
 if(countEl) countEl.textContent=`${count} project${count===1?'':'s'} to explore`;
 document.querySelector('[data-empty]')?.toggleAttribute('hidden',count!==0);
}
if(form) {
 const params=new URLSearchParams(location.search);
 ['location','type'].forEach(key=>{if(params.has(key)&&form.elements.namedItem(key)) form.elements.namedItem(key).value=params.get(key);});
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const values=new FormData(form);
  const purpose=values.get('purpose');
  const destination=purpose==='rent'?'/rent/':purpose==='off-plan'?'/off-plan/':'/projects/';
  if(location.pathname!==destination){location.href=destination+'?'+new URLSearchParams([...values.entries()]);return;}
  filterProjects();document.querySelector('#projects')?.scrollIntoView({behavior:'smooth',block:'start'});
 });
 document.querySelectorAll('[data-type-filter]').forEach(button=>button.addEventListener('click',()=>{
  form.elements.namedItem('type').value=button.dataset.typeFilter;
  document.querySelectorAll('[data-type-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  filterProjects();
 }));
 document.querySelector('[data-reset]')?.addEventListener('click',()=>{form.reset();document.querySelectorAll('[data-type-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.typeFilter==='');b.setAttribute('aria-pressed',String(b.dataset.typeFilter===''));});filterProjects();});
 filterProjects();
}
document.querySelectorAll('[data-contact-form]').forEach(form=>form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const fields=new FormData(form);
 const phone=String(fields.get('phone')||'').trim();
 const phoneInput=form.elements.namedItem('phone');
 if(phoneInput){
  const valid=phone.replace(/\D/g,'').length>=7&&/^[+0-9 ()\-.]+$/.test(phone);
  phoneInput.setCustomValidity(valid?'':'Please enter a valid phone number, including the country code.');
  if(!form.reportValidity()){phoneInput.addEventListener('input',()=>phoneInput.setCustomValidity(''),{once:true});return;}
 }
 const message=`Hi Al Basel Real Estate. I am from the website. I need more info about ${document.title.replace(/\s*\|\s*Al Basel.*$/i,'').replace(/[.]+$/,'')}.\nPage: ${location.origin}${location.pathname}\nName: ${fields.get('name')}\nInterest: ${fields.get('interest')}\n${fields.get('message') || ''}`;
 if(window.SiteLeads){
  window.SiteLeads.capture({name:fields.get('name'),phone,email:fields.get('email'),interest:fields.get('interest'),notes:fields.get('message'),subject:'Contact form: '+fields.get('interest')},{waText:message,source:'contact-form'});
  return;
 }
 location.href='https://wa.me/971529038948?text='+encodeURIComponent(message);
}));
const gallery=document.querySelector('[data-gallery]');
if(gallery) {
 const dialog=document.querySelector('#image-dialog');
 gallery.addEventListener('click',()=>dialog.showModal());
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
}
document.querySelectorAll('[data-unit-search]').forEach(unitForm=>{
 const section=unitForm.closest('section');
 const units=[...section.querySelectorAll('[data-unit]')];
 const filter=()=>{
  const values=new FormData(unitForm);let count=0;
  const min=values.get('min'),max=values.get('max');
  if(min&&max&&Number(min)>Number(max)){unitForm.querySelector('[name=max]').setCustomValidity('Maximum must be at least the minimum.');unitForm.reportValidity();return;}
  unitForm.querySelector('[name=max]').setCustomValidity('');
  units.forEach(unit=>{
   const exact=['location','type','purpose','bedrooms'].every(key=>!values.get(key)||String(unit.dataset[key])===values.get(key));
   const hasPrice=unit.dataset.price!=='';
   const priced=(!min||(hasPrice&&Number(unit.dataset.price)>=Number(min)))&&(!max||(hasPrice&&Number(unit.dataset.price)<=Number(max)));
   unit.hidden=!(exact&&priced);if(!unit.hidden)count++;
  });
  section.querySelector('[data-unit-count]').textContent=count+' matching verified listings';
  section.querySelector('[data-unit-empty]').hidden=count!==0;
 };
 unitForm.addEventListener('submit',event=>{event.preventDefault();filter();});
 unitForm.querySelector('[name=max]').addEventListener('input',()=>unitForm.querySelector('[name=max]').setCustomValidity(''));
 filter();
});
// Community index: filter tiles by home type.
document.querySelectorAll('[data-community-filter]').forEach(button=>button.addEventListener('click',()=>{
 const type=button.dataset.communityFilter;
 document.querySelectorAll('[data-community-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 document.querySelectorAll('.community-tile[data-types]').forEach(tile=>{tile.hidden=Boolean(type)&&!tile.dataset.types.split(' ').includes(type);});
}));
// Project photo gallery: thumbnails open a full-screen viewer with next/previous, arrow keys and swipe.
document.querySelectorAll('[data-pgallery]').forEach(root=>{
 const shots=JSON.parse(root.querySelector('[data-pg-list]').textContent);
 const box=root.querySelector('.pg-lightbox');const img=box.querySelector('[data-pg-img]');const counter=box.querySelector('.pg-counter');
 let i=0;
 const show=n=>{i=(n+shots.length)%shots.length;const s=shots[i];img.src=s.src;img.width=s.w;img.height=s.h;img.alt=s.alt;counter.textContent=(i+1)+' / '+shots.length;
  const next=new Image();next.src=shots[(i+1)%shots.length].src;};
 root.querySelectorAll('[data-pg-open]').forEach(b=>b.addEventListener('click',()=>{show(Number(b.dataset.pgOpen));box.showModal();}));
 box.querySelector('.pg-close').addEventListener('click',()=>box.close());
 box.querySelector('.pg-prev').addEventListener('click',()=>show(i-1));
 box.querySelector('.pg-next').addEventListener('click',()=>show(i+1));
 box.addEventListener('click',e=>{if(e.target===box)box.close();});
 box.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1);});
 let x0=null;box.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true});
 box.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(dx<0?i+1:i-1);x0=null;});
});
// Agent showcase: carousel arrows and Instagram-style stories.
document.querySelectorAll('.agent-showcase').forEach(root=>{
 const track=root.querySelector('[data-as-track]');
 const step=()=>{const card=track.querySelector('.as-card');return card?card.getBoundingClientRect().width+18:300;};
 root.querySelector('[data-as-prev]')?.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
 root.querySelector('[data-as-next]')?.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
 const list=JSON.parse(root.querySelector('[data-story-list]').textContent);
 const viewer=root.querySelector('.story-viewer');const slide=viewer.querySelector('[data-sv-slide]');const bars=[...viewer.querySelectorAll('.sv-bars span')];
 const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 let i=0;
 const render=a=>(a.cover?`<img class="sv-cover" src="${esc(a.cover.img)}" alt="">`:'')+`<div class="sv-top"><span class="story-ring big">${a.photo?`<img class="story-photo" src="${esc(a.photo)}" alt="${esc(a.name)}">`:`<span class="story-photo agent-initials">${esc(a.initials)}</span>`}</span><div><h3>${esc(a.name)}</h3><p>${esc(a.title)}${a.years?' · '+a.years+' years':''}</p></div></div>
<div class="sv-label">Expert in</div><ul class="sv-chips">${a.specialties.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>
<div class="sv-label">Communities</div><p class="sv-text">${esc(a.communities.join(' · '))}</p>
<div class="sv-label">Speaks</div><p class="sv-text">${esc(a.languages.join(', '))}</p>
${a.projects.length?`<div class="sv-label">${a.count} projects assigned</div><div class="sv-projects">${a.projects.map(p=>`<a href="${esc(p.url)}"><img src="${esc(p.img)}" alt="${esc(p.name)}"><span>${esc(p.name)}</span></a>`).join('')}</div>`:''}
<div class="sv-actions"><button type="button" class="button primary" data-lead-open data-lead-source="Agent story: ${esc(a.name)}" data-lead-subject="Agent: ${esc(a.name)}" data-lead-whatsapp="${esc(a.whatsapp)}" data-lead-tel="${esc(a.phoneLink)}" data-lead-tel-display="${esc(a.phone)}">WhatsApp ${esc(a.name.split(' ')[0])}</button><a class="button outline" href="/agents/${esc(a.slug)}/">View profile</a></div>`;
 const show=n=>{
  if(n<0)n=0; if(n>=list.length){viewer.close();return;}
  i=n;slide.innerHTML=render(list[i]);
  bars.forEach((b,k)=>{b.classList.toggle('done',k<i);b.classList.remove('active');void b.offsetWidth;if(k===i)b.classList.add('active');});
 };
 bars.forEach((b,k)=>b.querySelector('i').addEventListener('animationend',()=>{if(k===i&&viewer.open)show(i+1);}));
 root.querySelectorAll('[data-story]').forEach(b=>b.addEventListener('click',()=>{viewer.showModal();show(Number(b.dataset.story));}));
 viewer.querySelector('.sv-close').addEventListener('click',()=>viewer.close());
 viewer.querySelector('.sv-left').addEventListener('click',()=>show(i-1));
 viewer.querySelector('.sv-right').addEventListener('click',()=>show(i+1));
 viewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1);});
 // Hold to pause, like Instagram.
 const pause=on=>viewer.classList.toggle('paused',on);
 slide.addEventListener('pointerdown',()=>pause(true));['pointerup','pointerleave'].forEach(t=>slide.addEventListener(t,()=>pause(false)));
 let x0=null;viewer.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true});
 viewer.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)show(dx<0?i+1:i-1);x0=null;});
});
