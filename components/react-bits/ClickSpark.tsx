'use client';
// Adapted from DavidHDev/react-bits ClickSpark. See THIRD-PARTY-NOTICES.md.
import {useEffect} from 'react';
const COLORS=['#ffdb19','#008b49','#ed1838','#ffffff'];
/** Faíscas no clique de botões amarelos. Um único ouvinte delegado, sem canvas. */
export default function ClickSpark({selector='.button-yellow'}:{selector?:string}){
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const onClick=(e:MouseEvent)=>{
   if(!(e.target as Element).closest?.(selector))return;
   for(let i=0;i<9;i++){
    const s=document.createElement('span');
    const a=(Math.PI*2*i)/9+Math.random()*.4,d=26+Math.random()*22;
    s.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:3px;height:12px;margin:-6px 0 0 -1.5px;background:${COLORS[i%COLORS.length]};pointer-events:none;z-index:9999;transform:rotate(${a+Math.PI/2}rad)`;
    document.body.appendChild(s);
    s.animate([{transform:`translate(0,0) rotate(${a+Math.PI/2}rad)`,opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) rotate(${a+Math.PI/2}rad) scaleY(.3)`,opacity:0}],{duration:520,easing:'cubic-bezier(.2,.7,.3,1)'}).onfinish=()=>s.remove();
   }
  };
  document.addEventListener('click',onClick);
  return()=>document.removeEventListener('click',onClick);
 },[selector]);
 return null;
}
