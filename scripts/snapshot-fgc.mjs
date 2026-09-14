import { mkdir, writeFile } from 'node:fs/promises';
const origin = 'https://canoagemrs.com.br';
async function collection(type) {
  const first = await fetch(`${origin}/wp-json/wp/v2/${type}?per_page=100&page=1`);
  if (!first.ok) throw new Error(`${type}: ${first.status}`);
  const expected = Number(first.headers.get('x-wp-total'));
  const pages = Number(first.headers.get('x-wp-totalpages')) || Math.ceil(expected/100);
  const rows = await first.json();
  for(let page=2; page<=pages; page++) {
    const response = await fetch(`${origin}/wp-json/wp/v2/${type}?per_page=100&page=${page}`);
    if (!response.ok) throw new Error(`${type}/${page}: ${response.status}`);
    rows.push(...await response.json());
  }
  if(rows.length !== expected) {
    if(type !== 'media') throw new Error(`Contagem divergente: ${type}: ${rows.length}/${expected}`);
    console.warn(`A API anuncia ${expected} mídias, mas retorna ${rows.length} registros públicos. Não é backup integral de uploads.`);
  }
  return rows;
}
const [posts, pages, categories, media] = await Promise.all(['posts','pages','categories','media'].map(collection));
await mkdir('data', {recursive:true});
await mkdir('public/images', {recursive:true});
await writeFile('data/acervo.json', JSON.stringify({capturedAt:new Date().toISOString(), origin, posts, pages, categories, media},null,2));
const selected = posts.filter(p=>[1992,1960,2169,1982,2073].includes(p.id));
const images = {};
for(const post of selected) {
  const asset = media.find(m=>m.id === post.featured_media);
  if(!asset) continue;
  const url = asset.media_details?.sizes?.large?.source_url || asset.source_url;
  const response = await fetch(url);
  if(!response.ok) throw new Error(`Imagem ${post.id}: ${response.status}`);
  const ext = new URL(url).pathname.split('.').pop();
  const path = `/images/noticia-${post.id}.${ext}`;
  await writeFile(`public${path}`, Buffer.from(await response.arrayBuffer()));
  images[post.id] = {path, original:url, alt:asset.alt_text, caption:asset.caption?.rendered};
}
await writeFile('data/images.json', JSON.stringify(images,null,2));
console.log(JSON.stringify({posts:posts.length,pages:pages.length,categories:categories.length,media:media.length,images:Object.keys(images)}));
