import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {countries, articles, futureMarkets, sources} from '../data/international-buyers.mjs';

const routes=['/international-buyers/',...countries.map(c=>'/international-buyers/'+c.slug+'/'),...articles.map(a=>'/guides/'+a.slug+'/')];
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
assert.equal(countries.length,6);
assert.equal(new Set([...countries.map(c=>c.name),...futureMarkets]).size,21);
let whatsapp=0;
for(const route of routes){
  const html=await fs.readFile(path.join('dist',route,'index.html'),'utf8');
  assert.ok(sitemap.includes('https://albaselrealestate.ae'+route),'Not in sitemap: '+route);
  assert.ok(html.includes('rel="canonical" href="https://albaselrealestate.ae'+route+'"'),'Wrong canonical: '+route);
  assert.ok(!html.includes('name="robots" content="noindex'),'Unexpected noindex: '+route);
  assert.ok(html.includes('data-lead-open'),'No booking CTA: '+route);
  for(const match of html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)){
    const url=new URL(match[1].replaceAll('&amp;','&'));
    assert.equal(url.pathname,'/971529038948');
    assert.ok(url.searchParams.get('text').startsWith('Hi Al Basel Real Estate. I am from the website. I need more info about '));
    assert.ok(url.searchParams.get('text').includes('Page: https://albaselrealestate.ae'+route));
    whatsapp++;
  }
}
for(const c of countries){
  const html=await fs.readFile('dist/international-buyers/'+c.slug+'/index.html','utf8');
  assert.ok(html.includes('data-buyer-country="'+c.name+'"'));
  assert.equal(articles.filter(a=>a.country===c.slug).length,2);
  for(const slug of c.articles)assert.ok(html.includes('/guides/'+slug+'/'),'Country missing supporting guide');
}
for(const a of articles){
  assert.ok(sources[a.source],'Unknown source');
  assert.ok(countries.some(c=>c.slug===a.country),'Unknown country');
  const html=await fs.readFile('dist/guides/'+a.slug+'/index.html','utf8');
  for(let i=1;i<=a.sections.length;i++)assert.ok(html.includes('id="buyer-section-'+i+'"'),'Broken contents anchor');
}
console.log(`International checks passed: ${routes.length} pages, 6 country journeys, 12 supporting guides, ${whatsapp} WhatsApp links, 21-market roadmap.`);
