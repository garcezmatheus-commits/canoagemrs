# FGC — Direção implementada

Atualizado em 2026-09-25. Descreve o que está no ar em canoagemrs.vercel.app.

## Intenção
A força da nossa remada. Identidade esportiva gaúcha com fotografia real em grande escala e
narrativa de scroll. O assunto (canoagem, atletas, provas) vem antes do acabamento: evitar cara
de apresentação corporativa.

## Paleta
Marinho #211c5c, marinho profundo #141239, verde #008b49, vermelho #ed1838, amarelo #ffdb19,
papel #f7f8f6, branco. Cores aproximadas da logo JPEG; não equivalem a manual Pantone.
- Texto branco sobre verde usa #007c43, e sobre vermelho usa #c8102e (as cores da marca ficam
  em ~4,4:1, abaixo do AA). Texto verde sobre branco também usa #007c43.
- Amarelo é destaque e ação principal. Nunca é cor de texto sobre branco.

## Tipografia
Barlow 700 em caixa alta para títulos, Manrope 400/700 para leitura e controles. Fontes locais.
- Contraste "grito e sussurro": título grande em Barlow; rótulos, datas e categorias pequenos,
  em caixa alta e com espaçamento entre letras.

## Composição (home, de cima para baixo)
Cabeçalho fixo → hero pinada (mockup 16:9) → faixa verde/vermelho/amarelo → galeria de fotos →
calendário da temporada → A Federação → valores → notícias → competições e resultados →
documentos → Instagram → Seja um federado → rodapé.

- Logo em sticker no canto superior esquerdo, inclinada; encolhe ao rolar pra caber na barra fixa.
- Seções alternam papel/branco, marinho, verde e marinho profundo.

## Regras de sistema
- **Numeração só com dado real.** Nada de "01 / 02 / 03" decorativo em seções ou cards. Onde
  aparece número, ele informa: contagem de documentos do acervo, ano do resultado, dia da prova.
- **Uma forma de botão:** retângulo sem arredondamento. Amarelo = ação principal; marinho =
  secundária; link sublinhado = terciária. Pílula só no controle de pausar o vídeo.
- **Fotografia real primeiro.** O mockup gerado por IA fica restrito à hero (decisão aprovada);
  as demais imagens são fotos reais do acervo ou da galeria.
- **Conteúdo com data explícita.** Calendário com status calculado pela data; a seção de
  competições mostra resultados (passado), nunca convite antigo escrito no futuro.
- Página atual sublinhada no menu (mesmo sublinhado verde do hover).

## Componentes
- **Galeria:** Smooth Scroll Slider do Originkit, adaptado (ver `components/originkit/ui/`):
  arrastar, gesto horizontal, setas do teclado e botões de anterior/próxima. A roda vertical
  rola a página. Foto só é pedida quando o slide aparece. No celular, card 250×310.
- **Calendário:** cards nas cores da arte oficial; realizada em cinza; próxima etapa com selo.
- **Documentos:** três cards com a contagem real de cada filtro do acervo.
- **Resultados:** linhas com ano em amarelo, data de publicação e "Ver resultado".

## Movimento
Hero: GSAP ScrollTrigger pina a imagem abaixo do cabeçalho por 150vh (desktop) / 100vh (móvel);
zoom 1→1.18 e troca de mensagem. ScrollReveal nos títulos, Magnet nos CTAs, Waves no fundo da
filiação. Lenis só com ponteiro fino. Tudo respeita `prefers-reduced-motion`.

## Referências (repertório visual)
Consultadas em 2026-09-24 na coleção DESIGN.md (awesome-design-md / getdesign.md). Usadas como
princípio, sem copiar marca, cor ou fonte:
- **Nike:** uma só forma de botão, uma ação principal por tela, setas de carrossel visíveis,
  fotografia como protagonista.
- **The Verge:** contraste entre título gigante e rótulo pequeno espaçado; lista com data na
  lateral (usada nos resultados e nas últimas publicações).

## Conteúdo
Resultados, estatutos e listas do acervo usam dados reais; sem eventos ou métricas inventados.
Fotos da galeria com uso autorizado pela federação (2026-09-23).
