import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import type {NextConfig} from 'next';

type Snapshot = {posts: {slug: string}[]; pages: {slug: string}[]; categories: {slug: string}[]};

// Quando canoagemrs.com.br passar para este site, as URLs do WordPress antigo (/<slug>/ e
// /category/<slug>/) precisam continuar abrindo. O acervo vive em /acervo/<slug>; a página
// "institucional" é a /historia. Um redirect curinga (/:slug) engoliria /acervo e /historia,
// por isso a lista sai do snapshot, slug por slug.
const snapshot = JSON.parse(readFileSync(join(process.cwd(), 'data/acervo.json'), 'utf8')) as Snapshot;

// Onde ficam os arquivos do site antigo (wp-content/uploads) depois da troca de domínio.
// Sem a variável, nada muda: os links continuam apontando para canoagemrs.com.br.
const legacyOrigin = process.env.LEGACY_UPLOADS_ORIGIN?.replace(/\/$/, '');

const nextConfig: NextConfig = {
  async redirects() {
    const slugs = [...new Set([...snapshot.posts, ...snapshot.pages].map(r => r.slug))];
    const rules = [
      ...slugs.map(slug => ({
        source: `/${slug}`,
        destination: slug === 'institucional' ? '/historia' : `/acervo/${slug}`,
        permanent: true,
      })),
      ...snapshot.categories.map(c => ({
        source: `/category/${c.slug}/:rest*`,
        destination: `/acervo?categoria=${c.slug}`,
        permanent: true,
      })),
      {source: '/category/:rest*', destination: '/acervo', permanent: true},
      {source: '/tag/:rest*', destination: '/acervo', permanent: true},
      {source: '/author/:rest*', destination: '/acervo', permanent: true},
    ];
    if (legacyOrigin) {
      for (const base of ['wp-content', 'wp-admin', 'wp-json']) {
        rules.push({source: `/${base}/:rest*`, destination: `${legacyOrigin}/${base}/:rest*`, permanent: false});
      }
      rules.push({source: '/wp-login.php', destination: `${legacyOrigin}/wp-login.php`, permanent: false});
    }
    return rules;
  },
};

export default nextConfig;
