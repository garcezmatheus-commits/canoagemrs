import snapshot from '@/data/acervo.json';
import images from '@/data/images.json';
import sanitizeHtml from 'sanitize-html';
export function plain(html:string){return sanitizeHtml(html,{allowedTags:[],allowedAttributes:{}}).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"').replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)));}
export type RawRecord={id:number;slug:string;date:string;link:string;type:string;title:{rendered:string};content:{rendered:string};excerpt:{rendered:string};categories?:number[]};
export type Entry={id:number;slug:string;title:string;date:string;categories:string[];categoryIds:number[];excerpt:string;image:string;original:string;type:string;search:string;source:'archive'|'live'};
export function normalizeRecord(raw:RawRecord,categoryLookup:Map<number,string>,image:string,source:'archive'|'live'):Entry{
 const ids=raw.categories??[];
 return {id:raw.id,slug:raw.slug,title:plain(raw.title.rendered),date:raw.date,categories:ids.map(id=>categoryLookup.get(id)||''),categoryIds:ids,excerpt:plain(raw.excerpt.rendered),image,original:raw.link,type:raw.type,search:plain(raw.content.rendered),source};
}
export const records:RawRecord[]=[...snapshot.posts,...snapshot.pages];
const mediaMap=images as Record<string,{path:string}>;
const archiveCategoryLookup=new Map(snapshot.categories.map(c=>[c.id,c.name]));
export const entries:Entry[]=records.map(p=>normalizeRecord(p,archiveCategoryLookup,mediaMap[p.id]?.path||'','archive')).sort((a,b)=>b.date.localeCompare(a.date));
export const categories=snapshot.categories.map(c=>({id:c.id,name:c.name,slug:c.slug,count:c.count}));
export const capturedAt=snapshot.capturedAt;
export function contentHTML(html:string){
 const slugs=new Set(records.map(p=>p.slug));
 function absolute(value:string){try{const url=new URL(value,snapshot.origin);if(url.hostname==='wd10.com.br'&&url.pathname.startsWith('/fgc/wp-content/')){url.hostname='canoagemrs.com.br';url.pathname=url.pathname.replace('/fgc/','/');}if(url.hostname==='canoagemrs.com.br')url.protocol='https:';return url.href}catch{return value}}
 return sanitizeHtml(html,{
 allowedTags:sanitizeHtml.defaults.allowedTags.concat(['img','figure','figcaption','iframe','video','source']),
 allowedAttributes:{a:['href','title','rel'],img:['src','alt','width','height','loading'],iframe:['src','title','allowfullscreen','loading'],video:['src','controls','poster'],source:['src','type'],td:['colspan','rowspan'],th:['colspan','rowspan']},
 allowedIframeHostnames:['www.youtube.com','www.youtube-nocookie.com','player.vimeo.com'],
 transformTags:{
 a:(_,attrs)=>{let href=absolute(attrs.href||'');try{const u=new URL(href);const slug=u.pathname.replace(/^\/|\/$/g,'');if(u.hostname==='canoagemrs.com.br'&&slugs.has(slug))href='/acervo/'+slug}catch{}return{tagName:'a',attribs:{href,rel:'noopener noreferrer'}}},
 img:(_,attrs)=>({tagName:'img',attribs:{...attrs,src:absolute(attrs.src||''),loading:'lazy',alt:attrs.alt||'Imagem da publicação original da FGC'}}),
 iframe:(_,attrs)=>({tagName:'iframe',attribs:{...attrs,src:absolute(attrs.src||''),title:attrs.title||'Vídeo da publicação',loading:'lazy'}})
 }});
}
export function dateLabel(date:string){return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(date.slice(0,10)+'T12:00:00Z'));}
