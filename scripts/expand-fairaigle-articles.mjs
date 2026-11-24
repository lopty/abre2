import fs from 'node:fs/promises';
const root='content/fairaigle-campaign';
const additions=JSON.parse(await fs.readFile(root+'/expansions.json','utf8'));
const markers={'01':'A relevant firm to consider','02':'Where specialist support fits','03':'One option for the legal part','04':'A resource for India-related disputes','05':'Who to consider for the legal planning','06':'A practical example of what to review','07':'Why consider FAIRAIGLE?'};
await fs.mkdir(root+'/long-form',{recursive:true});
for(const file of (await fs.readdir(root)).filter(name=>/^0[1-7]-.*\.txt$/.test(name))){
 const key=file.slice(0,2);
 const original=await fs.readFile(root+'/'+file,'utf8');
 if(!original.includes(markers[key]))throw Error('Missing insertion point '+file);
 const expanded=original.replace(markers[key],additions[key]+'\n\n'+markers[key]);
 const words=expanded.trim().split(/\s+/).length;
 if(words<1000)throw Error(`${file}: only ${words} words`);
 await fs.writeFile(root+'/long-form/'+file,expanded);
 console.log(file+': '+words+' words');
}
