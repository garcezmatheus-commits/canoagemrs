'use client';
// Adapted from DavidHDev/react-bits Magnet. See THIRD-PARTY-NOTICES.md.
import {useRef,type ReactNode} from 'react';
export default function Magnet({children}:{children:ReactNode}){
 const ref=useRef<HTMLDivElement>(null);
 return <div className="magnet" onPointerMove={e=>{if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=e.currentTarget.getBoundingClientRect();if(ref.current)ref.current.style.transform=`translate(${(e.clientX-r.left-r.width/2)/10}px,${(e.clientY-r.top-r.height/2)/7}px)`}} onPointerLeave={()=>{if(ref.current)ref.current.style.transform='translate(0,0)'}}><div ref={ref}>{children}</div></div>;
}
