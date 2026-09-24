import {notFound} from 'next/navigation';
import Link from 'next/link';
import {ArrowLeft,ArrowUpRight,FileText} from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import {contentHTML,dateLabel} from '@/lib/acervo';
import {getSiteContent} from '@/lib/site-content';
import {pageOpenGraph} from '@/lib/site';
import snapshot from '@/data/acervo.json';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const {entries}=await getSiteContent();const e=entries.find(p=>p.slug===slug);if(!e)return {title:'Publicação não encontrada — FGC'};const title=e.title+' — FGC';const description=(e.excerpt||e.search).replace(/\[.*?\]/g,'').trim().slice(0,160)||'Publicação do acervo da Federação Gaúcha de Canoagem.';return {title,description,alternates:{canonical:'/acervo/'+slug},openGraph:pageOpenGraph({type:'article',title,description,url:'/acervo/'+slug,publishedTime:e.date,...(e.image?{images:[{url:e.image}]}:{})})}}
export default async function Article({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const {entries,records}=await getSiteContent();const e=entries.find(p=>p.slug===slug);const record=records.find(p=>p.slug===slug);if(!e||!record)notFound();
 const docs=e.source==='archive'?snapshot.media.filter(m=>m.post===e.id&&!m.mime_type.startsWith('image/')):[];
 const html=contentHTML(record.content.rendered);
 return <><SiteHeader/><main id="conteudo" className="article-page"><Link className="text-link" href="/acervo"><ArrowLeft size={17}/> Voltar ao acervo</Link><header className="article-header"><span className="eyebrow">{e.categories.join(' · ')||'FEDERAÇÃO'}</span><h1>{e.title}</h1><div className="article-meta"><time dateTime={e.date}>Publicado em {dateLabel(e.date)}</time><a href={e.original} target="_blank" rel="noopener noreferrer">Ver publicação original <ArrowUpRight size={15}/></a></div></header><p className="historical-notice">Publicação do acervo da FGC. Informações, cargos, datas e valores correspondem ao conteúdo original e podem ter sido atualizados posteriormente.</p><article className="article-body" dangerouslySetInnerHTML={{__html:html}}/>{!html.trim()&&<p className="empty-article">Esta publicação não possui texto na API pública. Consulte os anexos ou a publicação original.</p>}{docs.length>0&&<aside className="article-docs"><h2>Documentos da publicação</h2>{docs.map(doc=><a key={doc.id} href={doc.source_url} target="_blank" rel="noopener noreferrer"><FileText size={20}/><span>{doc.title.rendered}</span><ArrowUpRight size={17}/></a>)}</aside>}<div className="article-end"><Link className="button button-navy" href="/acervo">Continuar explorando <ArrowLeft size={17}/></Link><a className="text-link" href={e.original} target="_blank" rel="noopener noreferrer">Abrir conteúdo no site original <ArrowUpRight size={17}/></a></div></main><SiteFooter/></>;
}
