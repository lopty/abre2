import sharp from 'sharp';
import fs from 'node:fs/promises';
await fs.mkdir('public/assets',{recursive:true});
await sharp('public/assets/logo-original.png').trim({threshold:15}).resize({width:420}).webp().toFile('public/assets/logo.webp');
await sharp('public/assets/dubai.jpg').webp({quality:88}).toFile('public/assets/dubai.webp');
await sharp('public/assets/about.png').webp({quality:85}).toFile('public/assets/about.webp');
for(const name of ['park-field','elie-saab','seagate','orania','lime-gardens','lila']) {
 await sharp(`public/assets/${name}.webp`).resize({width:750,withoutEnlargement:true}).webp({quality:84}).toFile(`public/assets/${name}-card.webp`);
}
