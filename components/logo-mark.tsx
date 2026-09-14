'use client';

import {useId} from 'react';

/** Non-destructive sticker treatment: the original JPEG remains the artwork. */
export default function LogoMark(){
 const id='fgc-sticker-'+useId().replace(/:/g,'');
 return <svg className="logo-mark" viewBox="-16 -16 479 479" role="img" aria-label="Federação Gaúcha de Canoagem">
  <defs><filter id={id} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
   <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1 -1 -1 3 0" result="ink"/>
   <feComponentTransfer in="ink" result="silhouette"><feFuncA type="discrete" tableValues="0 1 1 1 1"/></feComponentTransfer>
   <feMorphology in="silhouette" operator="dilate" radius="9" result="edge"/>
   <feGaussianBlur in="edge" stdDeviation="1" result="softEdge"/>
   <feFlood floodColor="white" result="white"/>
   <feComposite in="white" in2="softEdge" operator="in" result="border"/>
   <feComposite in="SourceGraphic" in2="softEdge" operator="in" result="artwork"/>
   <feMerge><feMergeNode in="border"/><feMergeNode in="artwork"/></feMerge>
  </filter></defs>
  <image href="/logo-fgc.jpeg" width="447" height="447" filter={`url(#${id})`}/>
 </svg>;
}
