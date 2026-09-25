'use client';

import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight} from 'lucide-react';
import SmoothScrollSlider,{type SliderHandle} from './originkit/ui/smooth-scroll-slider';

const images = Array.from({length:19},(_,i)=>({image:`/images/galeria/galeria-${String(i+1).padStart(2,'0')}.webp`,offsetY:0}));

export default function PhotoGallery(){
 const slider=useRef<SliderHandle>(null);
 // No celular o card cabe inteiro na faixa de 330 px, em vez de um slide de 470 px cortado.
 const [compact,setCompact]=useState(false);
 useEffect(()=>{
  const mq=matchMedia('(max-width:640px)');
  const sync=()=>setCompact(mq.matches);
  sync();mq.addEventListener('change',sync);
  return()=>mq.removeEventListener('change',sync);
 },[]);
 return <section id="galeria" className="galeria" aria-labelledby="galeria-title">
  <div className="galeria-heading">
   <div>
    <span className="eyebrow"><span className="flag-mark"/>GALERIA · VELOCIDADE E VA&apos;A</span>
    <h2 id="galeria-title">A força<br/><em>em movimento.</em></h2>
   </div>
   <p>Remadas, chegadas e bastidores das provas para inspirar a próxima conquista.</p>
  </div>
  <div className="galeria-slider">
   <noscript dangerouslySetInnerHTML={{__html:'<style>.galeria-slider>div{opacity:1!important}</style>'}}/>
   <SmoothScrollSlider ref={slider} images={images} label="Galeria de fotos da canoagem" slideWidth={compact?250:360} slideHeight={compact?310:470} spacing={2} direction="right" smoothness={8} radius={8} dim={7} background="#141239" sensitivity={4} loop />
  </div>
  <div className="galeria-footer">
   <p className="galeria-hint">Arraste ou use as setas para ver as 19 fotos</p>
   <div className="galeria-controls">
    <button type="button" aria-label="Foto anterior" onClick={()=>slider.current?.move(-1)}><ArrowLeft size={20}/></button>
    <button type="button" aria-label="Próxima foto" onClick={()=>slider.current?.move(1)}><ArrowRight size={20}/></button>
   </div>
  </div>
 </section>;
}
