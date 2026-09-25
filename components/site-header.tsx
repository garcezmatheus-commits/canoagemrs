'use client';
import {useState,useEffect,useRef} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,Menu,X} from 'lucide-react';
import LogoMark from './logo-mark';
export default function SiteHeader(){
 const [open,setOpen]=useState(false);
 const pathname=usePathname();
 const logo=useRef<HTMLAnchorElement>(null);
 useEffect(()=>{
  const motion=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
  const update=()=>{frame=0;const y=window.scrollY;const progress=motion.matches?0:Math.min(y/300,1);const el=logo.current;if(!el)return;el.style.setProperty('--sticker-angle',`${-5+progress*7}deg`);el.style.setProperty('--sticker-y',`${progress*7}px`);el.style.setProperty('--sticker-shrink',String(motion.matches?(y>60?1:0):progress));};
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  window.addEventListener('scroll',scroll,{passive:true});motion.addEventListener('change',update);update();
  return()=>{window.removeEventListener('scroll',scroll);motion.removeEventListener('change',update);cancelAnimationFrame(frame);};
 },[]);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[]);
 return <header className="site-header"><Link ref={logo} href="/" className="logo-sticker" aria-label="FGC — início"><LogoMark/></Link><a href="#conteudo" className="skip-link">Pular para conteúdo</a><nav id="main-nav" className={`main-nav ${open?'is-open':''}`} aria-label="Principal">{[['A Federação','/#federacao'],['Calendário','/#calendario'],['Competições','/#competicoes'],['Notícias','/#noticias'],['Acervo','/acervo']].map(([name,url])=><Link key={name} href={url} aria-current={url==='/acervo'&&pathname.startsWith('/acervo')?'page':undefined} onClick={()=>setOpen(false)}>{name}</Link>)}</nav><Link className="header-join" href="/#federado">Seja um federado <ArrowUpRight size={17}/></Link><button className="menu-toggle" aria-label={open?'Fechar menu':'Abrir menu'} aria-controls="main-nav" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>;
}
