'use client';
// Adapted from DavidHDev/react-bits CountUp. See THIRD-PARTY-NOTICES.md.
import {useEffect,useRef,useState} from 'react';
/** Conta de 0 até `to` quando entra na tela. Sem movimento: mostra o valor final. */
export default function CountUp({to,duration=1.4}:{to:number;duration?:number}){
 const ref=useRef<HTMLSpanElement>(null);
 const [n,setN]=useState(to);
 useEffect(()=>{
  const el=ref.current;if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  setN(0);let raf=0;
  const io=new IntersectionObserver(([e])=>{
   if(!e.isIntersecting)return;io.disconnect();
   const t0=performance.now();
   const step=(now:number)=>{const p=Math.min((now-t0)/(duration*1000),1);setN(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)raf=requestAnimationFrame(step)};
   raf=requestAnimationFrame(step);
  },{threshold:.6});io.observe(el);
  return()=>{io.disconnect();cancelAnimationFrame(raf)};
 },[to,duration]);
 return <span ref={ref}>{n}</span>;
}
