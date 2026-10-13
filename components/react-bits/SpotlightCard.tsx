'use client';
// Adapted from DavidHDev/react-bits SpotlightCard. See THIRD-PARTY-NOTICES.md.
import {useEffect} from 'react';
/** Publica a posição do cursor (--mx/--my) nos cards; o brilho é CSS (.spot::after). */
export default function SpotlightCard({selector='.calendar-card,.document-card'}:{selector?:string}){
 useEffect(()=>{
  if(!matchMedia('(pointer: fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const onMove=(e:PointerEvent)=>{
   const card=(e.target as Element).closest?.<HTMLElement>(selector);if(!card)return;
   const r=card.getBoundingClientRect();
   card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`);
  };
  document.addEventListener('pointermove',onMove,{passive:true});
  return()=>document.removeEventListener('pointermove',onMove);
 },[selector]);
 return null;
}
