'use client';
// Adapted from DavidHDev/react-bits ScrollVelocity. See THIRD-PARTY-NOTICES.md.
import {useEffect,useRef,type ReactNode} from 'react';
/** Faixa que corre sozinha e acelera (ou inverte) conforme a velocidade do scroll. */
export default function ScrollVelocity({children,speed=60,className}:{children:ReactNode;speed?:number;className?:string}){
 const track=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=track.current;if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let x=0,raf=0,last=performance.now(),lastY=scrollY,vel=0,dir=1,visible=true;
  const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible&&!raf){last=performance.now();raf=requestAnimationFrame(tick)}});io.observe(el);
  function tick(now:number){
   raf=0;if(!visible||!el)return;
   const dt=Math.min(now-last,64)/1000;last=now;
   const dy=(scrollY-lastY)/Math.max(dt,.001);lastY=scrollY;
   vel+=(Math.max(-3000,Math.min(3000,dy))-vel)*.12;
   if(Math.abs(vel)>5)dir=vel<0?-1:1;
   const w=el.scrollWidth/2;
   x-=dir*(speed+Math.abs(vel)*.05)*dt;
   if(w>0)x=((x%w)-w)%w;
   el.style.transform=`translate3d(${x}px,0,0)`;
   raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(raf);io.disconnect()};
 },[speed]);
 return <div className={`velocity ${className??''}`}><div ref={track} className="velocity-track"><div className="velocity-group">{children}</div><div className="velocity-group" aria-hidden="true">{children}</div></div></div>;
}
