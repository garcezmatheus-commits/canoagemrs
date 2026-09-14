import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import ArchiveBrowser from '@/components/archive-browser';
import {getSiteContent} from '@/lib/site-content';
export const metadata={title:'Acervo — Federação Gaúcha de Canoagem',description:'Notícias, documentos oficiais, resultados e memória da canoagem gaúcha. Consulte por assunto, ano ou palavra-chave.'};
export default async function Archive({searchParams}:{searchParams:Promise<{categoria?:string}>}){
 const params=await searchParams;
 const {entries,categories}=await getSiteContent();
 const selected=categories.some(c=>c.slug===params.categoria)?params.categoria!:'todos';
 return <><SiteHeader/><main id="conteudo" className="archive-page"><div className="section-label"><span>MEMÓRIA & TRANSPARÊNCIA</span><span>FEDERAÇÃO GAÚCHA DE CANOAGEM</span></div><h1>O nosso esporte.<br/><em>A nossa história.</em></h1><p className="archive-intro">Notícias, resultados e documentos que fazem parte da canoagem gaúcha.<br/>Explore as publicações e encontre a informação que você precisa.</p><ArchiveBrowser entries={entries} categories={categories} initialCategory={selected}/></main><SiteFooter/></>;
}
