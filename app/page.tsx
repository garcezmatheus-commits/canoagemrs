import HomeExperience from '@/components/home-experience';
import {getSiteContent} from '@/lib/site-content';
import type {Entry} from '@/lib/acervo';
const EVENT_CATEGORY_SLUGS=['campeonatos','convite','calendario'];
export default async function Home(){
 const {entries,categories}=await getSiteContent();
 const lean=(e:Entry)=>({...e,search:''});
 const latest=entries.filter(e=>e.type==='post').slice(0,3);
 const latestIds=new Set(latest.map(e=>e.id));
 // O grid de notícias renderiza <img src={n.image}>; scripts/snapshot-fgc.mjs só baixa
 // thumbnail local para uma lista curta de posts, então só entram candidatos com imagem.
 const news=entries.filter(e=>e.type==='post'&&e.image&&!latestIds.has(e.id)).slice(0,3).map(lean);
 const eventCategoryIds=categories.filter(c=>EVENT_CATEGORY_SLUGS.includes(c.slug)).map(c=>c.id);
 const events=entries.filter(e=>e.type==='post'&&e.categoryIds.some(id=>eventCategoryIds.includes(id))).slice(0,3).map(lean);
 return <HomeExperience news={news} events={events} latest={latest.map(lean)}/>;
}
