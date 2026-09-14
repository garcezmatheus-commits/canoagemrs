'use client';
// Adapted from DavidHDev/react-bits ScrollReveal. See THIRD-PARTY-NOTICES.md.
// Scoped cleanup, semantic headings and reduced-motion fallback added for FGC.
import {useRef,useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export default function ScrollReveal({children,className=''}:{children:string;className?:string}){
 const ref=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
 const ctx=gsap.context(()=>{gsap.fromTo('.word',{opacity:.3,y:8},{opacity:1,y:0,stagger:.08,ease:'none',scrollTrigger:{trigger:ref.current,start:'top 88%',end:'bottom 65%',scrub:1}})},ref);return()=>ctx.revert()});return()=>mm.revert()},[]);
 return <h2 ref={ref} className={`scroll-reveal ${className}`} aria-label={children}>{children.split(/(\s+)/).map((w,i)=>/^\s+$/.test(w)?w:<span className="word" aria-hidden="true" key={i}>{w}</span>)}</h2>;
}
