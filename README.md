# Federação Gaúcha de Canoagem — Landing Page

Site em React, TypeScript e Vinext, com identidade baseada na logo original da FGC.
Não altera nem substitui automaticamente o site oficial.

## Executar no computador

Requer Node.js 22.13 ou superior.

```sh
npm ci
npm run dev
```

Abra o endereço informado no terminal (normalmente http://localhost:5173).

```sh
npx tsc --noEmit
npm run build
npm start
```

Os dois primeiros comandos verificam tipos e compilação. `npm start` permite testar
o resultado compilado localmente; não publica na internet.

## Experiência

- Logo original no canto superior esquerdo e cores derivadas da marca.
- Hero com a imagem 16:9 aprovada, zoom e troca de mensagem acompanhando o scroll.
- Seções da Federação, notícias, competições, documentos e filiação.
- React Bits: ScrollReveal, Magnet e Waves; GSAP/ScrollTrigger e Lenis.
- Menu responsivo, foco visível e alternativa para movimento reduzido.
- “Seja um federado!” direciona ao cadastro externo de atleta da CBCa.

## Acervo e preservação

`data/acervo.json` contém o snapshot público de 2026-09-10: 146 posts, 14 páginas,
17 categorias e 472 registros de mídia. `/acervo` permite busca e filtros;
`/acervo/[slug]` apresenta cada publicação com data e referência à fonte.

**Não é backup integral do WordPress.** PDFs e parte das imagens continuam
apontando para o site original. A API anunciava 495 mídias, mas retornou 472.
Antes de trocar o domínio, obter backup administrativo do banco e uploads,
conferir todos os anexos e implementar os redirecionamentos das URLs antigas.
Não desligar o site antigo enquanto essas dependências existirem.

`scripts/snapshot-fgc.mjs` recupera o conteúdo da API pública; sua execução
atualiza o snapshot. Preserve uma cópia datada antes de executá-lo novamente.

## Organização

- `app/`: páginas, metadados e estilos.
- `components/`: navegação, seções, busca e animações.
- `lib/acervo.ts`: normalização e sanitização do conteúdo importado.
- `public/`: logo, mockups otimizados, fotos selecionadas e fontes locais.
- `THIRD-PARTY-NOTICES.md`: créditos e licenças dos componentes.

Os mockups são imagens conceituais geradas por IA; as fotos das notícias vêm
do acervo da Federação. Não apresentar competições históricas como eventos futuros.

O passo a passo completo está na nota `processo-de-construcao-do-site.md`,
na pasta FG-Canoagem do cofre Obsidian.
