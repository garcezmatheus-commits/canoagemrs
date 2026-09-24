import type {MetadataRoute} from 'next';
import {SITE_URL} from '@/lib/site';

// Rastreamento sempre liberado: bloquear aqui esconderia o noindex das páginas e a prévia de link do WhatsApp.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {userAgent: '*', allow: '/'},
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
