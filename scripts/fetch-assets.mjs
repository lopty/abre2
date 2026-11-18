import fs from 'node:fs/promises';
const root='https://albaselrealestate.ae/wp-content/uploads/';
const files={
 'park-field.webp':'2023/07/1-43-1500x790.webp',
 'elie-saab.webp':'2023/07/feature-image-35-1500x790.webp',
 'seagate.webp':'2023/07/1-42-1500x790.webp',
 'orania.webp':'2023/07/1-45-1500x790.webp',
 'lime-gardens.webp':'2023/07/1-41-1500x790.webp',
 'lila.webp':'2024/02/278690450-800x600-1-766x467.webp',
 'dubai.jpg':'2023/03/city-1.png',
 'about.png':'2023/03/broker-img.png',
 'emaar.png':'2023/03/logo-1.png',
 'deyaar.png':'2023/03/logo-2.png'
};
await fs.mkdir('public/assets',{recursive:true});
await Promise.all(Object.entries(files).map(async([name,path])=>{
 const response=await fetch(root+path);
 if(!response.ok) throw Error(`${name}: ${response.status}`);
 await fs.writeFile('public/assets/'+name,Buffer.from(await response.arrayBuffer()));
 console.log('Downloaded '+name);
}));
