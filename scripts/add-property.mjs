import fs from 'node:fs/promises';
import path from 'node:path';
const [template,photos]=process.argv.slice(2);
if(!template){console.error('Usage: npm run add-property -- path/to/property.json path/to/photos');process.exit(1);}
const property=JSON.parse(await fs.readFile(template,'utf8'));
if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(property.slug||''))throw Error('A lowercase hyphenated slug is required.');
property.status='draft';
if(photos){
 const destination=path.resolve('public/assets/properties',property.slug);
 await fs.mkdir(destination,{recursive:true});property.images=[];
 const sharp=(await import('sharp')).default;
 for(const name of (await fs.readdir(photos)).filter(f=>/\.(jpg|jpeg|png|webp)$/i.test(f))){
  const output=path.parse(name).name+'.webp';await sharp(path.join(photos,name)).resize({width:1600,withoutEnlargement:true}).webp({quality:85}).toFile(path.join(destination,output));
  property.images.push('/assets/properties/'+property.slug+'/'+output);
 }
}
await fs.mkdir('data/properties',{recursive:true});
await fs.writeFile('data/properties/'+property.slug+'.json',JSON.stringify(property,null,2)+'\n',{flag:'wx'});
console.log(`Created draft ${property.slug}. Supply compliance records and review the property before changing status.`);
