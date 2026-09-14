'use client';

import {useEffect,useRef,useState} from 'react';
import {Pause,Play} from 'lucide-react';

export default function HeroMedia(){
 const video=useRef<HTMLVideoElement>(null);
 const [paused,setPaused]=useState(true);
 const [failed,setFailed]=useState(false);
 const userPaused=useRef(false);
 const visible=useRef(true);
 useEffect(()=>{
  const el=video.current;if(!el)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{
   const connection=(navigator as unknown as {connection?:{saveData?:boolean;effectiveType?:string}}).connection;
   const limitedConnection=!!connection?.saveData||['slow-2g','2g','3g'].includes(connection?.effectiveType||'');
   if(document.hidden||!visible.current||userPaused.current||motion.matches||limitedConnection){el.pause();return;}
   void el.play().catch(()=>setPaused(true));
  };
  const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;sync()},{threshold:0.05});
  observer.observe(el);motion.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
  return()=>{observer.disconnect();motion.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);el.pause();};
 },[]);
 const toggle=()=>{const el=video.current;if(!el)return;
  if(el.paused){userPaused.current=false;void el.play().catch(()=>setPaused(true));}
  else{userPaused.current=true;el.pause();}
 };
 return <>
  <div className="hero-photo">
   <img className="hero-poster" src="/hero-velocidade.webp" alt="" fetchPriority="high" width="1920" height="1080"/>
   {!failed&&<video ref={video} className="hero-video" muted loop playsInline preload="metadata" poster="/hero-velocidade.webp" aria-hidden="true" onPlay={()=>setPaused(false)} onPause={()=>setPaused(true)} onError={()=>setFailed(true)}>
    <source src="/Hero-loop.mp4" type="video/mp4"/>
   </video>}
  </div>
  {!failed&&<button className="hero-media-control" type="button" onClick={toggle} aria-label={paused?'Reproduzir vídeo da abertura':'Pausar vídeo da abertura'}>{paused?<Play size={15}/>:<Pause size={15}/>}<span>{paused?'Reproduzir':'Pausar vídeo'}</span></button>}
 </>;
}
