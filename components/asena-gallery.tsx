'use client';

import SmoothScrollSlider from './originkit/ui/smooth-scroll-slider';

const images = [
  {image:'/images/asena/remada-brasil.jpeg',offsetY:0},
  {image:'/images/asena/dupla-asena.jpg',offsetY:0},
  {image:'/images/asena/atleta-brasil-k1.jpg',offsetY:0},
  {image:'/images/asena/atleta-brasil-chegada.jpg',offsetY:0},
  {image:'/images/asena/raia-velocidade.jpg',offsetY:0},
  {image:'/images/asena/dupla-prova.jpg',offsetY:0},
];

export default function AsenaGallery(){
 return <section className="asena-gallery" aria-labelledby="asena-gallery-title">
  <div className="asena-gallery-heading">
   <div>
    <span className="eyebrow"><span className="flag-mark"/>GALERIA · CANOAGEM VELOCIDADE</span>
    <h2 id="asena-gallery-title">A força<br/><em>em movimento.</em></h2>
   </div>
   <p>Remadas, chegadas e histórias da canoagem brasileira para inspirar a próxima conquista.</p>
  </div>
  <div className="asena-gallery-slider">
   <SmoothScrollSlider images={images} slideWidth={360} slideHeight={470} spacing={2} direction="right" smoothness={8} radius={8} dim={7} background="#141239" sensitivity={4} loop />
  </div>
  <p className="asena-gallery-hint">Arraste ou use a rolagem horizontal para explorar</p>
 </section>;
}
