import type {Entry} from './acervo';

type CategoryRef = {id: number; slug: string};

const governanceSlugPages = ['diretoria', 'estatuto', 'estatuto-2024', 'estatuto-fgc', 'balanco', 'governanca', 'galeria-dos-ex-presidentes', 'institucional'];
const governanceCategorySlugs = ['institucional', 'governanca', 'balanco', 'editais-de-assembleia', 'editais-de-convocacao'];
const circularesCategorySlugs = ['circulares', 'editais-de-assembleia', 'editais-de-convocacao'];

// "Governança" e "Circulares" juntam várias categorias do WordPress antigo (e páginas soltas) num filtro só.
export function categoryMatcher(category: string, categories: CategoryRef[]): (e: Entry) => boolean {
  if (category === 'todos') return () => true;
  const idsOf = (slugs: string[]) => new Set(categories.filter(c => slugs.includes(c.slug)).map(c => c.id));
  if (category === 'governanca') {
    const ids = idsOf(governanceCategorySlugs);
    return e => governanceSlugPages.includes(e.slug) || e.categoryIds.some(id => ids.has(id));
  }
  if (category === 'circulares') {
    const ids = idsOf(circularesCategorySlugs);
    return e => e.categoryIds.some(id => ids.has(id));
  }
  const cat = categories.find(c => c.slug === category);
  return e => !!cat && e.categoryIds.includes(cat.id);
}
