/** Sticker pronto: PNG/WebP com alfa real e borda branca de recorte (gerado do logo-fgc.jpeg). */
export default function LogoMark(){
 return <picture>
  <source srcSet="/logo-fgc-sticker.webp" type="image/webp"/>
  <img className="logo-mark" src="/logo-fgc-sticker.png" width={720} height={720} alt="Federação Gaúcha de Canoagem" decoding="async"/>
 </picture>;
}
