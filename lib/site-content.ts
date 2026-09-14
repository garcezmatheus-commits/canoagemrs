import {cache} from 'react';
import {entries as archiveEntries, records as archiveRecords, categories as archiveCategories} from './acervo';
import {getLiveContent} from './live-news';

export const getSiteContent = cache(async () => {
  const live = await getLiveContent();
  const bySlug = new Map(archiveCategories.map(c => [c.slug, c]));
  for (const c of live.categories) if (!bySlug.has(c.slug)) bySlug.set(c.slug, c);
  return {
    entries: [...archiveEntries, ...live.entries].sort((a, b) => b.date.localeCompare(a.date)),
    records: [...archiveRecords, ...live.records],
    categories: [...bySlug.values()],
  };
});
