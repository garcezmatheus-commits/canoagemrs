'use client';
import {useEffect,useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
import SiteHeader from './site-header';
import ScrollReveal from './react-bits/ScrollReveal';
import Magnet from './react-bits/Magnet';
import HomeSections from './home-sections';
import SiteFooter from './site-footer';
import HeroMedia from './hero-media';
import type {Entry} from '@/lib/acervo';
export default function HomeExperience({news,events,latest}:{news:Entry[];events:Entry[];latest:Entry[]}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
 gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();let lenis:Lenis|undefined;
 const tick=(time:number)=>lenis?.raf(time*1000);
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
 if(matchMedia('(pointer: fine)').matches){lenis=new Lenis({duration:1.05,anchors:true});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(tick)}
 const ctx=gsap.context(()=>{
 gsap.from('.hero-lead > *',{y:30,opacity:0,duration:.9,stagger:.11,ease:'power3.out',delay:.15});
 gsap.set('.hero-story',{autoAlpha:0,y:45});
 const t=gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:()=>`+=${innerHeight*(innerWidth>760?1.5:1)}`,pin:true,scrub:1,anticipatePin:1,invalidateOnRefresh:true}});
 t.to('.hero-photo',{scale:1.18,xPercent:-3,ease:'none',duration:1},0).to('.hero-shade',{opacity:1,duration:1},0).to('.hero-lead',{y:-65,autoAlpha:0,duration:.32},.12).to('.hero-story',{y:0,autoAlpha:1,duration:.32},.43).to('.hero-progress-fill',{scaleX:1,ease:'none',duration:1},0);
 gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.from(el,{y:35,opacity:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 93%',once:true}}));
 },root);
 return()=>{ctx.revert();gsap.ticker.remove(tick);lenis?.destroy();lenis=undefined};
 });return()=>mm.revert();
 },[]);
 return <div ref={root}><SiteHeader/><main id="conteudo">
  <section className="hero" aria-label="Canoagem gaúcha">
   <HeroMedia/><div className="hero-shade"/>
   <div className="hero-topline"><span>FEDERAÇÃO GAÚCHA DE CANOAGEM</span><span>RIO GRANDE DO SUL · BRASIL</span></div>
   <div className="hero-lead">
    <p className="eyebrow light"><span className="flag-mark"/>O NOSSO ESPORTE. A NOSSA FORÇA.</p>
    <h1>A força da<br/>nossa <em>remada.</em></h1>
    <p className="hero-description">Das águas do Rio Grande do Sul para cada nova conquista.</p>
    <Magnet><a className="button button-yellow" href="#federacao">Explore a canoagem gaúcha <ArrowUpRight size={19}/></a></Magnet>
   </div>
   <div className="hero-story"><span className="eyebrow light">UM ESTADO. MUITAS HISTÓRIAS.</span><h2>A água nos move.<br/>O esporte <em>nos une.</em></h2><p>Atletas, clubes e comunidades.<br/>Uma mesma direção para a canoagem gaúcha.</p><a className="text-link light" href="#federacao">Conheça a Federação <ArrowDown size={18}/></a></div>
   <div className="hero-bottom"><a href="#federacao"><ArrowDown size={17}/> ROLE PARA DESCOBRIR</a><span>01 — A NOSSA ESSÊNCIA</span><span className="hero-progress"><i className="hero-progress-fill"/></span></div>
  </section>
  <div className="color-ribbon"><span/><span/><span/></div>
  <section id="federacao" className="section intro"><div className="section-label"><span>01 / A FEDERAÇÃO</span><span>JUNTOS, DENTRO E FORA D’ÁGUA</span></div><div className="intro-grid"><ScrollReveal>Muito além da linha de chegada.</ScrollReveal><div className="intro-copy"><p>A canoagem gaúcha é feita de gente. De quem chega para aprender, de quem treina todos os dias e de quem ajuda o esporte a seguir em frente.</p><p>A Federação Gaúcha de Canoagem conecta essa comunidade. Aqui você encontra as competições, as conquistas e a memória do nosso esporte.</p><a className="text-link" href="/historia">Conheça nossa história <ArrowUpRight size={18}/></a></div></div></section>
  <HomeSections news={news} events={events} latest={latest}/>
 </main><SiteFooter/></div>;
}
