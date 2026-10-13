'use client';
// Adapted from DavidHDev/react-bits StickerPeel. See THIRD-PARTY-NOTICES.md.
import {useRef,type ReactNode} from 'react';
/** Adesivo que se arrasta e se solta: levanta ao pegar, brilho de "descolar" no hover. */
export default function StickerPeel({children,className}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);
 const drag=useRef<{x:number;y:number;ox:number;oy:number}|null>(null);
 const pos=useRef({x:0,y:0});
 const moved=useRef(false);
 const apply=(lift:boolean)=>{if(ref.current)ref.current.style.transform=`translate(${pos.current.x}px,${pos.current.y}px) rotate(${lift?-9:-4}deg) scale(${lift?1.08:1})`};
 return <div ref={ref} className={`sticker-peel ${className??''}`}
  onPointerDown={e=>{if(e.pointerType==='touch')return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY,ox:pos.current.x,oy:pos.current.y};moved.current=false;e.currentTarget.classList.add('is-held');apply(true)}}
  onPointerMove={e=>{const d=drag.current;if(!d)return;if(Math.abs(e.clientX-d.x)+Math.abs(e.clientY-d.y)>4)moved.current=true;pos.current={x:d.ox+e.clientX-d.x,y:d.oy+e.clientY-d.y};apply(true)}}
  onPointerUp={e=>{drag.current=null;e.currentTarget.classList.remove('is-held');apply(false)}}
  onPointerCancel={()=>{drag.current=null;apply(false)}}
  onClickCapture={e=>{if(moved.current){e.preventDefault();e.stopPropagation();moved.current=false}}}
 >{children}</div>;
}
