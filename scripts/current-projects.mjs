import fs from 'node:fs/promises';
import sharp from 'sharp';
const items=[
 {slug:'greencrest',name:'Greencrest',community:'Dubai Hills Estate',bedrooms:'1, 2 & 3 bedroom apartments',tag:'Developer launch',description:'An apartment project beside the golf-course landscape of Dubai Hills Estate. Emaar describes contemporary residences with balconies and open terraces. Request the current release documents to compare the actual unit and its outlook.',highlights:['Golf-course setting','Balconies and open terraces','Apartment collection'],source:'https://www.emaar.com/en/properties/greencrest-at-dubai-hills-estate'},
 {slug:'hillsedge',name:'Hillsedge',community:'Dubai Hills Estate',bedrooms:'1 & 2 bedroom apartments',tag:'Developer launch',description:'Apartments in Dubai Hills Estate overlooking Hillside Park and the Dubai skyline. The developer describes indoor and outdoor fitness facilities, swimming pools and children’s play areas. Confirm the specification attached to the chosen unit.',highlights:['Hillside Park setting','Indoor and outdoor gyms','Swimming pools and play areas'],source:'https://www.emaar.com/en/properties/hillsedge-at-dubai-hills-estate'},
 {slug:'fior-1',name:'Fior 1',community:'Mina Rashid',bedrooms:'Apartment collection',tag:'Developer launch',description:'A residential launch at Rashid Yachts & Marina, within the Mina Rashid area. Emaar includes Fior 1 in its current launch collection. Ask for the brochure, floor plans and release terms before selecting a specific home.',highlights:['Rashid Yachts & Marina','Residential launch','Developer information available'],source:'https://www.emaar.com/en/properties/fior-1-at-rashid-yachts-and-marina'}
];
let existing=await Promise.all((await fs.readdir('data/projects')).filter(f=>f.endsWith('.json')).map(async f=>JSON.parse(await fs.readFile('data/projects/'+f,'utf8'))));
for(const p of items){
 const html=await(await fetch(p.source)).text();
 const img=html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/)?.[1]||html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/)?.[1];
 if(!img) throw Error('No official image found for '+p.name);
 const response=await fetch(img.replaceAll('&amp;','&'));
 if(!response.ok)throw Error('Failed image '+p.name);
 const buffer=Buffer.from(await response.arrayBuffer());
 await sharp(buffer).resize({width:1600,withoutEnlargement:true}).webp({quality:85}).toFile('public/assets/'+p.slug+'.webp');
 await sharp(buffer).resize({width:750,withoutEnlargement:true}).webp({quality:84}).toFile('public/assets/'+p.slug+'-card.webp');
 existing=existing.filter(e=>e.slug!==p.slug);
 existing.push({...p,developer:'Emaar',type:'Apartment',image:p.slug+'.webp',brokerSource:null,handover:null,paymentPlan:null,launch:true,reviewedAt:'2026-11-18'});
 console.log('Added sourced project '+p.name);
}
for(const p of existing)await fs.writeFile('data/projects/'+p.slug+'.json',JSON.stringify(p,null,2)+'\n');
