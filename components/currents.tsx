'use client';
import {useEffect,useRef,useState,lazy,Suspense} from 'react';
const Waves=lazy(()=>import('./react-bits/Waves'));
export default function Currents(){
 const ref=useRef<HTMLDivElement>(null);const [active,setActive]=useState(false);
 useEffect(()=>{const el=ref.current;if(!el)return;let visible=false;const media=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setActive(visible&&!media.matches&&!document.hidden);const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{rootMargin:'100px'});observer.observe(el);media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);return()=>{observer.disconnect();media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync)}},[]);
 return <div ref={ref} className="currents" aria-hidden="true">{active&&<Suspense fallback={null}><Waves lineColor="#ffffff28" xGap={24} yGap={36} waveAmpX={24} waveAmpY={10} waveSpeedX={.006} waveSpeedY={.003} maxCursorMove={40}/></Suspense>}</div>;
}
