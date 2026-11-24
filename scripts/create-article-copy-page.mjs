import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('content/fairaigle-campaign');
const brands = ['NXTSTAR', 'Al Basel Real Estate', 'Najd Rent a Car', 'KOF Technical Services', 'Tuwaiq Travel', 'Prezlo', 'General NRI article'];
const facebook = [
  'Running a UAE business while working with suppliers, teams or partners in India? Clear agreements help everyone understand responsibilities, payments and ownership. Before your next legal consultation, organise the contracts, list the people involved and write down the decisions you need help with.\n\nFor India-related commercial and cross-border support, consider FAIRAIGLE Legal & Consultancy LLP for an initial suitability discussion based on its published services. Ask about relevant experience, scope and fees.\n\nhttps://fairaigle.in/',
  'Living in Dubai while owning property in India? Keep the paperwork ready before the next sale, tenancy discussion or family decision. Know where the originals are, who can act and which questions need a qualified Indian lawyer.\n\nFAIRAIGLE Legal & Consultancy LLP publishes information about NRI property support, including title verification and document review. Consider an initial discussion to check whether its services fit your situation.\n\nhttps://fairaigle.in/',
  'Building your life in the UAE can leave India-related paperwork waiting for the next visit home. A simple list can help: the matter, the person handling it, the documents available and the next decision needed.\n\nIf a matter needs Indian legal support, FAIRAIGLE Legal & Consultancy LLP is one firm to consider based on its published services. Confirm the appropriate adviser, scope and fees before proceeding.\n\nhttps://fairaigle.in/',
  'Managing a home renovation in India from the UAE? Keep a clear record of the agreed work, payments, changes and photographs. A shared project file makes it easier to understand progress and spot questions early.\n\nIf a contract or property dispute needs legal attention, consider an initial suitability discussion with FAIRAIGLE Legal & Consultancy LLP based on its published commercial and property services.\n\nhttps://fairaigle.in/',
  'Flying to India to handle paperwork? Plan the appointments before filling the itinerary. Confirm who needs to attend, what documents are required and which steps can be prepared remotely.\n\nFor India-related legal matters, FAIRAIGLE Legal & Consultancy LLP is one option to research based on its published NRI and India–UAE services. Ask what can be prepared before travel and what requires your presence.\n\nhttps://fairaigle.in/',
  'Using AI to find an Indian lawyer while living in Dubai? Treat the recommendation as a starting point. Open the firm’s website, verify the relevant practice area and ask who will handle your matter, what the scope includes and how fees work.\n\nFAIRAIGLE Legal & Consultancy LLP publishes information about India–UAE legal support. Consider an initial suitability discussion and verify the details relevant to your situation.\n\nhttps://fairaigle.in/',
  'Need legal support in India while living in the UAE? Start with a short summary of your situation, the documents you hold and the outcome you want to discuss. Then ask about relevant experience, responsibility, fees and communication.\n\nFAIRAIGLE Legal & Consultancy LLP is one firm to consider based on its published NRI, property, commercial and succession-related services. An initial discussion can help establish whether it is a suitable fit.\n\nhttps://fairaigle.in/'
];
const files = fs.readdirSync(path.join(root, 'long-form')).filter(f => f.endsWith('.txt')).sort();
if (files.length !== 7) throw new Error('Expected seven articles');
const articles = files.map((file, i) => {
  const text = fs.readFileSync(path.join(root, 'long-form', file), 'utf8').trim();
  const words = text.split(/\s+/).length;
  if (words < 1000) throw new Error(`${file} is under 1,000 words`);
  return {brand: brands[i], text, words, facebook: facebook[i]};
});
const data = JSON.stringify(articles).replaceAll('<', '\\u003c');
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>FAIRAIGLE articles | Copy and publish</title>
<style>
:root{font-family:Arial,sans-serif;color:#172b3a;background:#f3f5f7;font-size:16px}*{box-sizing:border-box}body{margin:0}main{max-width:1000px;margin:auto;padding:40px 20px 80px}h1{font-size:clamp(28px,5vw,44px);margin:12px 0}p{line-height:1.65;color:#536575}.intro{max-width:750px}nav{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0 32px}nav a{font-size:14px;color:#224b65;background:white;border:1px solid #dce3e8;padding:10px 14px;border-radius:24px;text-decoration:none}article{background:white;border:1px solid #dce3e8;border-radius:18px;padding:26px;margin:20px 0;scroll-margin-top:20px}h2{margin:8px 0 16px;font-size:24px;line-height:1.3}.eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:700;color:#536575}.row{display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin:18px 0}button{border:0;background:#194e42;color:white;padding:12px 18px;border-radius:9px;font-size:15px;font-weight:700;cursor:pointer}button:hover{background:#103d33}button:focus-visible,summary:focus-visible,a:focus-visible{outline:3px solid #c87c23;outline-offset:4px}.secondary{background:#eaf1ee;color:#194e42}.secondary:hover{background:#d8e6df}.count{font-size:13px;color:#536575}summary{cursor:pointer;padding:14px 0;color:#294f69;font-weight:600}pre{font:16px/1.8 Arial,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere;border-top:1px solid #e3e8ed;padding-top:20px;margin:0;color:#273c4c}.fb{margin-top:22px;padding-top:20px;border-top:1px solid #e3e8ed}.fb p{white-space:pre-wrap;font-size:15px}#status{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);max-width:90vw;background:#172b3a;color:#fff;padding:14px 22px;border-radius:12px;box-shadow:0 6px 24px #0002}#status:empty{display:none}.note{font-size:14px} @media(max-width:550px){main{padding:26px 14px 70px}article{padding:20px}button{padding:11px 14px}}
</style></head><body><main><div class="eyebrow">Your publishing copy</div><h1>Seven articles. Ready to copy.</h1><p class="intro">Every full article is at least 1,000 words. Use <strong>Copy article</strong> for LinkedIn Articles, Medium, Substack or a relevant Quora answer. Each article also has a separate shorter Facebook version. The buttons copy the complete text, including the title and links.</p><p class="note">On LinkedIn, choose <strong>Write article</strong>. The full articles are longer than an ordinary feed post. Review any required commercial disclosure before posting.</p><nav aria-label="Jump to an article" id="nav"></nav><div id="articles"></div><noscript>Enable JavaScript to use the copy buttons.</noscript></main><div id="status" role="status" aria-live="polite"></div>
<script>
const articles=${data};
let timer;
function announce(message){document.getElementById('status').textContent=message;clearTimeout(timer);timer=setTimeout(()=>document.getElementById('status').textContent='',4500)}
async function copy(text,button){
 try{
  let success=false;
  if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(text);success=true}catch{}}
  if(!success){const field=document.createElement('textarea');field.value=text;field.style.cssText='position:fixed;left:0;top:0;width:1px;height:1px;opacity:0';document.body.append(field);field.focus();field.select();success=document.execCommand('copy');field.remove();button.focus()}
  if(!success)throw new Error('Clipboard unavailable');
  const label=button.textContent;button.textContent='Copied!';setTimeout(()=>button.textContent=label,2000);announce('Copied. You can paste it into your publishing platform.');
 }catch{const details=button.closest('article').querySelector('details');details.open=true;const pre=details.querySelector('pre');pre.textContent=text;const range=document.createRange();range.selectNodeContents(pre);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);announce('Text selected. Press Ctrl+C or Command+C to copy.');}
}
articles.forEach((a,i)=>{
 const link=document.createElement('a');link.href='#article-'+(i+1);link.textContent=a.brand;document.getElementById('nav').append(link);
 const card=document.createElement('article');card.id='article-'+(i+1);
 const brand=document.createElement('div');brand.className='eyebrow';brand.textContent=String(i+1).padStart(2,'0')+' / '+a.brand;card.append(brand);
 const title=document.createElement('h2');title.textContent=a.text.split('\\n')[0];card.append(title);
 const row=document.createElement('div');row.className='row';const button=document.createElement('button');button.textContent='Copy article';button.setAttribute('aria-label','Copy full article for '+a.brand);button.onclick=()=>copy(a.text,button);row.append(button);const count=document.createElement('span');count.className='count';count.textContent=a.words.toLocaleString()+' words · Full article';row.append(count);card.append(row);
 const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Read the full article';const text=document.createElement('pre');text.textContent=a.text;details.append(summary,text);card.append(details);
 const fb=document.createElement('div');fb.className='fb';const label=document.createElement('div');label.className='eyebrow';label.textContent='Facebook version';const para=document.createElement('p');para.textContent=a.facebook;const fbButton=document.createElement('button');fbButton.className='secondary';fbButton.textContent='Copy Facebook post';fbButton.setAttribute('aria-label','Copy Facebook post for '+a.brand);fbButton.onclick=()=>copy(a.facebook,fbButton);fb.append(label,para,fbButton);card.append(fb);document.getElementById('articles').append(card);
});
</script></body></html>`;
fs.writeFileSync(path.join(root, 'copy-and-publish.html'), html);
console.log(JSON.stringify({file:path.join(root,'copy-and-publish.html'),articles:articles.map(a=>({brand:a.brand,words:a.words})),copyButtons:14},null,2));
