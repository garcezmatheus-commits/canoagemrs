import {cache} from 'react';
import {entries as archiveEntries, records as archiveRecords, categories as archiveCategories} from './acervo';
import {getLiveContent} from './live-news';

export const getSiteContent = cache(async () => {
  const live = await getLiveContent();
  const bySlug = new Map(archiveCategories.map(c => [c.slug, c]));
  // Categoria do WordPress novo com o mesmo slug de uma do acervo (resultados, noticias, circulares…)
  // vira a do acervo: remapeia o ID com offset dos posts novos, senão eles ficam fora dos filtros e da home.
  const toArchiveId = new Map<number, number>();
  for (const c of live.categories) {
    const archived = bySlug.get(c.slug);
    if (archived) toArchiveId.set(c.id, archived.id);
    else bySlug.set(c.slug, c);
  }
  const liveEntries = live.entries.map(e => ({
    ...e,
    categoryIds: [...new Set(e.categoryIds.map(id => toArchiveId.get(id) ?? id))],
  }));
  return {
    entries: [...archiveEntries, ...liveEntries].sort((a, b) => b.date.localeCompare(a.date)),
    records: [...archiveRecords, ...live.records],
    categories: [...bySlug.values()],
  };
});
