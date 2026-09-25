'use client';
import {useState,useMemo} from 'react';
import Link from 'next/link';
import {Search,ArrowUpRight,X} from 'lucide-react';
import type {Entry} from '@/lib/acervo';
import {categoryMatcher} from '@/lib/acervo-filters';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
type Category={id:number;slug:string;name:string;count:number};
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
// O pai troca a `key` quando `?categoria=` muda, então o estado inicial basta.
export default function ArchiveBrowser({entries,categories,initialCategory}:{entries:Entry[];categories:Category[];initialCategory:string}){
 const [query,setQuery]=useState(''),[category,setCategory]=useState(initialCategory||'todos'),[year,setYear]=useState('todos'),[limit,setLimit]=useState(24);
 const years=useMemo(()=>[...new Set(entries.map(e=>e.date.slice(0,4)))].sort().reverse(),[entries]);
 const matches=useMemo(()=>categoryMatcher(category,categories),[category,categories]);
 const filtered=useMemo(()=>entries.filter(e=>{
  return matches(e)&&(year==='todos'||e.date.startsWith(year))&&normalize(e.title+' '+e.excerpt+' '+e.search).includes(normalize(query));
 }),[query,year,entries,matches]);
 const reset=()=>{setQuery('');setCategory('todos');setYear('todos');setLimit(24)};
 return <><div className="archive-controls"><label className="search-field"><Search size={20}/><span className="sr-only">Buscar no acervo</span><input value={query} placeholder="Buscar notícia, competição ou documento" onChange={e=>{setQuery(e.target.value);setLimit(24)}}/>{query&&<button aria-label="Limpar busca" onClick={()=>setQuery('')}><X size={17}/></button>}</label><Select value={category} onValueChange={v=>{setCategory(v);setLimit(24)}}><SelectTrigger className="archive-select" aria-label="Filtrar por assunto"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="todos">Todos os assuntos</SelectItem>{categories.filter(c=>c.count>0).map(c=><SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>)}</SelectContent></Select><Select value={year} onValueChange={v=>{setYear(v);setLimit(24)}}><SelectTrigger className="archive-select year-select" aria-label="Filtrar por ano"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="todos">Todos os anos</SelectItem>{years.map(y=><SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select></div><div className="archive-count" role="status" aria-live="polite">{filtered.length} {filtered.length===1?'publicação encontrada':'publicações encontradas'}{(query||category!=='todos'||year!=='todos')&&<button onClick={reset}>Limpar filtros <X size={14}/></button>}</div><div className="archive-results">{filtered.slice(0,limit).map(e=><Link key={e.id} className="archive-row" href={'/acervo/'+e.slug}><time dateTime={e.date}>{new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(e.date.slice(0,10)+'T12:00:00Z'))}</time><div><span className="archive-category">{e.categories.join(' · ')||(e.type==='page'?'Institucional':'Arquivo')}</span><h2>{e.title}</h2>{e.excerpt&&<p>{e.excerpt.replace(/\[.*?\]/g,'').slice(0,180)}</p>}</div><ArrowUpRight size={23}/></Link>)}</div>{filtered.length===0&&<div className="empty-state"><Search size={35}/><h2>Nenhuma publicação encontrada.</h2><p>Tente outro termo ou amplie os filtros de assunto e ano.</p><button className="button button-navy" onClick={reset}>Ver todo o acervo</button></div>}{filtered.length>limit&&<button className="button button-navy load-more" onClick={()=>setLimit(l=>l+24)}>Mostrar mais publicações <span>{Math.min(24,filtered.length-limit)} +</span></button>}</>;
}
