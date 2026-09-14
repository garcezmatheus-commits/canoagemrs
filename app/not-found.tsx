import Link from 'next/link';
import SiteHeader from '@/components/site-header';
export default function NotFound(){return <><SiteHeader/><main id="conteudo" className="archive-page empty-state"><span className="eyebrow">404 / FORA DA RAIA</span><h1>Vamos retomar<br/>o caminho?</h1><p>Esta página não foi encontrada. O acervo reúne as publicações e documentos da Federação.</p><Link className="button button-navy" href="/acervo">Explorar o acervo</Link></main></>}
