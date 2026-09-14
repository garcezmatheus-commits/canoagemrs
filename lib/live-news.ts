import {cache} from 'react';
import {normalizeRecord, type RawRecord, type Entry} from './acervo';

const ORIGIN = process.env.LIVE_WORDPRESS_ORIGIN?.replace(/\/$/, '');
const REVALIDATE = Number(process.env.LIVE_WORDPRESS_REVALIDATE_SECONDS) || 300;
const ID_OFFSET = 1_000_000_000;

export type LiveCategory = {id: number; slug: string; name: string; count: number};
type LiveContent = {records: RawRecord[]; entries: Entry[]; categories: LiveCategory[]};
const EMPTY: LiveContent = {records: [], entries: [], categories: []};

type EmbeddedTerm = {id: number; slug: string; name: string; taxonomy: string};
type EmbeddedMedia = {code?: string; source_url?: string; media_details?: {sizes?: Record<string, {source_url: string}>}};
type LivePost = RawRecord & {_embedded?: {'wp:featuredmedia'?: EmbeddedMedia[]; 'wp:term'?: EmbeddedTerm[][]}};

// Sem LIVE_WORDPRESS_ORIGIN configurado, ou em erro/timeout: retorna vazio sem quebrar o
// site. Trade-off aceito: se o WordPress novo cair depois de já ter mostrado conteúdo ao
// vivo, esse conteúdo some no próximo ciclo de revalidação em vez de manter a última versão
// conhecida — não vale a complexidade de um cache de fallback customizado para este projeto.
export const getLiveContent = cache(async (): Promise<LiveContent> => {
  if (!ORIGIN) return EMPTY;
  try {
    const url = `${ORIGIN}/wp-json/wp/v2/posts?per_page=20&_embed=wp:featuredmedia,wp:term&orderby=date&order=desc`;
    const res = await fetch(url, {next: {revalidate: REVALIDATE}, signal: AbortSignal.timeout(5000)});
    if (!res.ok) throw new Error(`WP ao vivo respondeu ${res.status}`);
    const posts = (await res.json()) as LivePost[];
    const categoryMap = new Map<number, LiveCategory>();
    const records: RawRecord[] = [];
    const entries: Entry[] = [];
    for (const post of posts) {
      const id = ID_OFFSET + post.id;
      // wp:term é array-de-arrays (uma sublista por taxonomia) — achatar e filtrar por categoria.
      const terms = (post._embedded?.['wp:term'] ?? []).flat().filter(t => t?.taxonomy === 'category');
      const categoryLookup = new Map<number, string>();
      const categoryIds = terms.map(t => {
        const catId = ID_OFFSET + t.id;
        categoryLookup.set(t.id, t.name);
        const prev = categoryMap.get(catId);
        // O contexto "embed" do WP não traz o count real da categoria; aproxima pela
        // contagem no lote atual — suficiente para o filtro `count>0` não esconder a categoria.
        categoryMap.set(catId, {id: catId, slug: t.slug, name: t.name, count: (prev?.count || 0) + 1});
        return catId;
      });
      const media = post._embedded?.['wp:featuredmedia']?.[0];
      // featured_media inválido vem como objeto de erro no _embedded, não ausente.
      const image = media && !('code' in media)
        ? media.media_details?.sizes?.large?.source_url || media.media_details?.sizes?.medium_large?.source_url || media.source_url || ''
        : '';
      const raw: RawRecord = {...post, id};
      records.push(raw);
      entries.push({...normalizeRecord(raw, categoryLookup, image, 'live'), categoryIds});
    }
    entries.sort((a, b) => b.date.localeCompare(a.date));
    return {records, entries, categories: [...categoryMap.values()]};
  } catch (err) {
    console.warn('[live-news] WordPress ao vivo indisponível, ignorando:', err);
    return EMPTY;
  }
});
