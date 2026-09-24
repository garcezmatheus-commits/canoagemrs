import Link from 'next/link';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import ScrollReveal from '@/components/react-bits/ScrollReveal';
import {records,contentHTML} from '@/lib/acervo';
import {pageOpenGraph} from '@/lib/site';

const description='As origens da canoagem, sua trajetória no Rio Grande do Sul e a memória preservada pela FGC.';
export const metadata={title:'Nossa história — Federação Gaúcha de Canoagem',description,alternates:{canonical:'/historia'},openGraph:pageOpenGraph({title:'Nossa história — Federação Gaúcha de Canoagem',description,url:'/historia'})};

// Milestones summarized from the institutional text; the full text remains below.
const milestones=[
 {year:'1943',title:'Uma história que passa pelo Taquari',text:'O acervo institucional registra a prática esportiva de José Wingen em Estrela, onde construiu uma embarcação de madeira inspirada nos caiaques de sua infância.'},
 {year:'1970–1980',title:'A retomada da modalidade',text:'A chegada de caiaques de fibra de vidro da Europa e da Argentina ajudou a impulsionar a construção de embarcações no Brasil.'},
 {year:'1985',title:'O Rio Grande do Sul na organização nacional',text:'O estado esteve representado na fundação da Associação Brasileira de Canoagem, durante a Volta da Ilha de Vitória.'},
 {year:'1997',title:'Três Coroas recebe o mundo',text:'A cidade gaúcha sediou o Campeonato Mundial de Canoagem Slalom, um marco registrado na memória da modalidade.'},
];

export default function History(){
 const record=records.find(p=>p.slug==='institucional')!;
 // Promote the original section labels to semantic headings without rewriting its text.
 const original=record.content.rendered.replace(/<p><strong>(HISTÓRIA|PRIMEIROS FATOS|INÍCIO DA CANOAGEM NO BRASIL|PERGUNTAS E RESPOSTAS)<\/strong><\/p>/g,'<h2>$1</h2>');
 return <><SiteHeader/><main id="conteudo" className="history-page">
  <header className="history-hero"><Link className="text-link light" href="/"><ArrowLeft size={17}/> Voltar ao início</Link><h1>Nossa história<br/>segue <em>em movimento.</em></h1><p>Das primeiras embarcações às conquistas nas águas gaúchas. Uma memória feita de pessoas, lugares e muitas remadas.</p><a href="#trajetoria" className="button button-yellow">Explore a trajetória <ArrowUpRight size={18}/></a></header>
  <section id="trajetoria" className="section history-timeline"><ScrollReveal>O Rio Grande do Sul faz parte dessa história.</ScrollReveal><p className="history-source">Marcos selecionados do acervo institucional da Federação.</p><ol>{milestones.map(item=><li key={item.year}><span className="history-year">{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></section>
  <section className="section history-record"><div className="history-record-intro"><h2>A memória, na íntegra.</h2><p>Texto institucional preservado do site da FGC. Referências e informações correspondem à publicação original.</p><Link className="text-link" href="/acervo/institucional">Consultar registro no acervo <ArrowUpRight size={17}/></Link></div><article className="article-body" dangerouslySetInnerHTML={{__html:contentHTML(original)}}/></section>
  <section className="section history-links"><h2>Quem construiu esse caminho.</h2><div><Link className="text-link" href="/acervo/galeria-dos-ex-presidentes">Galeria dos ex-presidentes <ArrowUpRight size={18}/></Link><Link className="text-link" href="/acervo">Explorar todo o acervo <ArrowUpRight size={18}/></Link></div></section>
 </main><SiteFooter/></>;
}
