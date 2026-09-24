'use client';

import SmoothScrollSlider from './originkit/ui/smooth-scroll-slider';

const images = Array.from({length:19},(_,i)=>({image:`/images/galeria/galeria-${String(i+1).padStart(2,'0')}.webp`,offsetY:0}));

export default function PhotoGallery(){
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
   <SmoothScrollSlider images={images} label="Galeria de fotos da canoagem" slideWidth={360} slideHeight={470} spacing={2} direction="right" smoothness={8} radius={8} dim={7} background="#141239" sensitivity={4} loop />
  </div>
  <p className="galeria-hint">Arraste, deslize ou use as setas do teclado para explorar</p>
 </section>;
}
