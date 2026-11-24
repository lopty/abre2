import fs from 'node:fs/promises';
import path from 'node:path';
for(const root of ['dist','C:/Users/Lopty/Desktop/App/tuwaiq-travel/dist']) {
 const greeting=root==='dist'?'Hi Al Basel Real Estate. I am from the website. I need more info about ':'Hi, I am from your website.';
 let links=0;
 async function scan(directory){
  for(const entry of await fs.readdir(directory,{withFileTypes:true})){
   const file=path.join(directory,entry.name);
   if(entry.isDirectory())await scan(file);
   else if(entry.name.endsWith('.html')){
    const html=await fs.readFile(file,'utf8');
    for(const match of html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)){
     const message=new URL(match[1].replaceAll('&amp;','&')).searchParams.get('text');
     if(!message?.startsWith(greeting))throw Error('Wrong WhatsApp opening on '+file);
     links++;
    }
   }
  }
 }
 await scan(root);
 console.log(`${root}: ${links} WhatsApp links checked; all use the requested opening.`);
}
