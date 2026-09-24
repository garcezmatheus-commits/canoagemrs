import type {MetadataRoute} from 'next';
import {getSiteContent} from '@/lib/site-content';
import {SITE_URL} from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {entries} = await getSiteContent();
  const slugs = new Set<string>();
  const articles = entries.filter(e => !slugs.has(e.slug) && slugs.add(e.slug)).map(e => ({
    url: `${SITE_URL}/acervo/${e.slug}`,
    lastModified: e.date,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));
  return [
    {url: SITE_URL, changeFrequency: 'weekly', priority: 1},
    {url: `${SITE_URL}/acervo`, changeFrequency: 'weekly', priority: 0.8},
    {url: `${SITE_URL}/historia`, changeFrequency: 'yearly', priority: 0.6},
    ...articles,
  ];
}
