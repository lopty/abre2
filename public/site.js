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
 const message=`Hi, I am from your website. My name is ${fields.get('name')}. I am interested in ${fields.get('interest')}. ${fields.get('message') || ''}`;
 if(window.SiteLeads){
  window.SiteLeads.capture({name:fields.get('name'),phone,email:fields.get('email'),interest:fields.get('interest'),notes:fields.get('message'),subject:'Contact form: '+fields.get('interest')},{waText:message,source:'contact-form'});
  return;
 }
 location.href='https://wa.me/971524435019?text='+encodeURIComponent(message);
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
