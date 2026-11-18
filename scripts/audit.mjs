import fs from 'node:fs/promises';
import path from 'node:path';
import {assertPublishable} from './policy.mjs';
const pages=JSON.parse(await fs.readFile('dist/page-manifest.json','utf8'));
const issues=[]; const allUrls=new Set(pages.map(p=>p.route));
const inbound=new Map(pages.map(p=>[p.route,0]));
const unique=new Map(); const paragraphs=new Map();
const text=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&#\d+;/g,'').replace(/\s+/g,' ').trim();
for(const page of pages){
 const file=page.route==='/'?'dist/index.html':path.join('dist',page.route,'index.html');
 const html=await fs.readFile(file,'utf8');
 for(const field of ['route','title','description','h1']){
  const key=field+':'+page[field];
  if(unique.has(key))issues.push(`Duplicate ${field}: ${page[field]}`);unique.set(key,page.route);
 }
 if(page.title.length>=60)issues.push(`Title >=60 characters (${page.title.length}): ${page.route}`);
 if(!/<link rel="canonical" href="https:\/\/albaselrealestate.ae[^\"]*"/.test(html))issues.push('Missing canonical: '+page.route);
 if(!/<meta name="description" content="[^"]+"/.test(html))issues.push('Missing description: '+page.route);
 if((html.match(/<h1[ >]/g)||[]).length!==1)issues.push('Expected exactly one H1: '+page.route);
 for(const nav of html.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/g))if(/<button\b/.test(nav[1]))issues.push('Button navigation: '+page.route);
 const visible=text(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''));
 if(/\u2014/.test(visible))issues.push('Em dash: '+page.route);
 if(/\b(bespoke|curated|seamless|world-class|unparalleled)\b/i.test(visible))issues.push('Banned copy: '+page.route);
 let main=(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)||[])[1]||'';
 main=main.replace(/<aside\b[^>]*>[\s\S]*?<\/aside>/g,'');
 for(const p of main.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)){
  const para=text(p[1]); if(para.length<=140)continue;
  if(paragraphs.has(para)&&paragraphs.get(para)!==page.route)issues.push(`Repeated long paragraph: ${page.route} and ${paragraphs.get(para)}: ${para.slice(0,65)}`);
  paragraphs.set(para,page.route);
 }
 for(const m of html.matchAll(/href="([^"#]*)[^\"]*"/g)){
  const href=m[1];if(!href.startsWith('/')||href.startsWith('//'))continue;
  const target=href.split('?')[0];
  if(target.endsWith('/')){if(!allUrls.has(target))issues.push(`Broken route ${target} on ${page.route}`);else if(target!==page.route)inbound.set(target,inbound.get(target)+1);}
  else try{await fs.access(path.join('dist',target));}catch{issues.push(`Missing file ${target} on ${page.route}`);}
 }
 for(const m of html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)){
  if(!/\balt="[^"]*"/.test(m[0])||!/\bwidth="\d+"/.test(m[0])||!/\bheight="\d+"/.test(m[0]))issues.push('Missing image attributes: '+page.route);
  if(m[1].startsWith('/'))try{await fs.access(path.join('dist',m[1]));}catch{issues.push('Broken image '+m[1]);}
 }
 for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))try{JSON.parse(m[1]);}catch{issues.push('Invalid structured data: '+page.route);}
}
for(const [route,count]of inbound)if(count===0)issues.push('Orphan page: '+route);
const business=JSON.parse(await fs.readFile('data/business.json','utf8'));
for(const f of await fs.readdir('data/properties'))if(f.endsWith('.json'))try{assertPublishable(JSON.parse(await fs.readFile('data/properties/'+f,'utf8')),business);}catch(e){issues.push(e.message);}
await fs.mkdir('reports',{recursive:true});await fs.writeFile('reports/audit.json',JSON.stringify({pages:pages.length,issues},null,2));
if(issues.length){console.error(issues.join('\n'));process.exit(1);}
console.log(`Audit passed: ${pages.length} routes, unique metadata, links, images, copy and publication records checked.`);
