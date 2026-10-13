/** Foto da abertura: caiaque na raia com a bandeira do RS no alto, à direita. O enquadramento
 * começa abaixo do menu transparente (ver .hero-photo) para a bandeira não ficar atrás do botão. */
export default function HeroMedia(){
 return <div className="hero-photo">
  <picture>
   <source media="(max-width: 640px)" srcSet="/hero-fgc-mobile.webp" width={1080} height={1080}/>
   <img className="hero-poster" src="/hero-fgc.webp" alt="Caiaque de competição com a marca da FGC na raia, com a bandeira do Rio Grande do Sul ao fundo" fetchPriority="high" width="1920" height="1080"/>
  </picture>
 </div>;
}
