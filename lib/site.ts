import type {Metadata} from 'next';

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')).replace(/\/$/, '');

// Enquanto canoagemrs.com.br for o site oficial, a prévia não deve competir com ele no Google.
export const SITE_INDEXABLE = process.env.SITE_INDEXABLE === 'true';

export const SITE_NAME = 'Federação Gaúcha de Canoagem';

export function pageOpenGraph(og: NonNullable<Metadata['openGraph']>): Metadata['openGraph'] {
  return {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE_NAME,
    images: [{url: '/og-fgc.jpg', width: 1200, height: 630, alt: 'Caiaque com a marca da Federação Gaúcha de Canoagem'}],
    ...og,
  };
}

export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL || 'https://www.instagram.com/canoagemgaucha/';
export const INSTAGRAM_HANDLE = '@' + new URL(INSTAGRAM_URL).pathname.replaceAll('/', '');
