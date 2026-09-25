import HomeExperience from '@/components/home-experience';
import {getSiteContent} from '@/lib/site-content';
import type {Entry} from '@/lib/acervo';
import {categoryMatcher} from '@/lib/acervo-filters';
import {calendar2026,withStatus} from '@/lib/calendario';
// Regera a home a cada hora para o status das etapas (realizada/próxima) acompanhar a data.
export const revalidate=3600;
export default async function Home(){
 const {entries,categories}=await getSiteContent();
 const lean=(e:Entry)=>({...e,search:''});
 const posts=entries.filter(e=>e.type==='post');
 const latest=posts.slice(0,3);
 const shown=new Set(latest.map(e=>e.id));
 // O grid de notícias renderiza <img src={n.image}>; scripts/snapshot-fgc.mjs só baixa
 // thumbnail local para uma lista curta de posts, então só entram candidatos com imagem.
 const news=posts.filter(e=>e.image&&!shown.has(e.id)).slice(0,3);
 news.forEach(e=>shown.add(e.id));
 // Resultados em vez de convites: convite antigo escrito no futuro contradiz o calendário da temporada.
 const isResult=categoryMatcher('resultados',categories);
 const results=posts.filter(e=>isResult(e)&&!shown.has(e.id)).slice(0,3);
 const docCounts={
  governanca:entries.filter(categoryMatcher('governanca',categories)).length,
  circulares:entries.filter(categoryMatcher('circulares',categories)).length,
  regulamento:entries.filter(categoryMatcher('regulamento',categories)).length,
 };
 return <HomeExperience news={news.map(lean)} results={results.map(lean)} latest={latest.map(lean)} docCounts={docCounts} calendar={withStatus(calendar2026)}/>;
}
