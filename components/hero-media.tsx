'use client';

import {useEffect,useRef,useState} from 'react';
import {Pause,Play} from 'lucide-react';

const VIDEO_SRC='/Hero-loop.mp4';

export default function HeroMedia(){
 const video=useRef<HTMLVideoElement>(null);
 const [paused,setPaused]=useState(true);
 const [failed,setFailed]=useState(false);
 const userPaused=useRef(false);
 const visible=useRef(true);
 // O vídeo só começa a baixar depois do carregamento da página, para não disputar banda com a foto da abertura.
 const armed=useRef(false);
 const sync=useRef(()=>{});
 useEffect(()=>{
  const el=video.current;if(!el)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  sync.current=()=>{
   const connection=(navigator as unknown as {connection?:{saveData?:boolean;effectiveType?:string}}).connection;
   const limitedConnection=!!connection?.saveData||['slow-2g','2g','3g'].includes(connection?.effectiveType||'');
   if(document.hidden||!visible.current||userPaused.current||motion.matches||limitedConnection){el.pause();return;}
   if(!armed.current)return;
   if(!el.getAttribute('src'))el.src=VIDEO_SRC;
   void el.play().catch(()=>setPaused(true));
  };
  const run=()=>sync.current();
  let idle=0;
  const arm=()=>{idle=window.setTimeout(()=>{armed.current=true;run();},300);};
  if(document.readyState==='complete')arm();else window.addEventListener('load',arm,{once:true});
  const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;run()},{threshold:0.05});
  observer.observe(el);motion.addEventListener('change',run);document.addEventListener('visibilitychange',run);run();
  return()=>{window.removeEventListener('load',arm);window.clearTimeout(idle);observer.disconnect();motion.removeEventListener('change',run);document.removeEventListener('visibilitychange',run);el.pause();};
 },[]);
 const toggle=()=>{const el=video.current;if(!el)return;
  if(el.paused){userPaused.current=false;armed.current=true;sync.current();}
  else{userPaused.current=true;el.pause();}
 };
 return <>
  <div className="hero-photo">
   {/* No celular vai um recorte quadrado da mesma foto, com o mesmo enquadramento do vídeo (object-position 58%). */}
   <picture>
    <source media="(max-width: 640px)" srcSet="/hero-velocidade-mobile.webp" width={1080} height={1080}/>
    <img className="hero-poster" src="/hero-velocidade.webp" alt="" fetchPriority="high" width="1920" height="1080"/>
   </picture>
   {!failed&&<video ref={video} className="hero-video" muted loop playsInline preload="none" aria-hidden="true" onPlay={()=>setPaused(false)} onPause={()=>setPaused(true)} onError={()=>setFailed(true)}/>}
  </div>
  {!failed&&<button className="hero-media-control" type="button" onClick={toggle} aria-label={paused?'Reproduzir vídeo da abertura':'Pausar vídeo da abertura'}>{paused?<Play size={15}/>:<Pause size={15}/>}<span>{paused?'Reproduzir':'Pausar vídeo'}</span></button>}
 </>;
}
