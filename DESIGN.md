# FGC — Direção implementada
## Intenção
A força da nossa remada. Identidade esportiva gaúcha com fotografia de grande escala e narrativa de scroll.
## Paleta
Marinho #211c5c, marinho profundo #141239, verde #008b49, vermelho #ed1838, amarelo #ffdb19, branco.
Cores aproximadas visualmente da logo JPEG fornecida; não equivalem a manual oficial Pantone.
## Tipografia
Barlow Condensed 700 para títulos. Manrope 400/700 para leitura e controles. Fontes locais.
## Composição
Logo em suporte branco no canto superior esquerdo, inclinada 5 graus. Hero fotográfica em tela cheia; título editorial à esquerda; CTA amarelo.
Seções alternam manifesto branco, notícia editorial em grade assimétrica, competições em marinho, documentos em branco e filiação em verde com imagem lateral.
## Movimento
Hero: GSAP ScrollTrigger fixa a imagem por 150vh desktop/100vh móvel; zoom 1→1.18, deslocamento horizontal suave e troca de mensagem. Scroll reversível.
React Bits ScrollReveal: palavras ganham opacidade conforme rolagem; limpeza local, sem encerrar animações das outras seções.
React Bits Magnet: CTAs acompanham levemente o ponteiro; sem transformação em touch/reduced motion.
React Bits Waves: fundo em linhas na filiação; carregado apenas próximo à viewport, suspenso fora da tela e com aba oculta. Desativado em reduced motion.
Lenis: desktop com ponteiro fino; celular mantém rolagem nativa. Não é necessário Vanta, pois Waves já resolve a função.
## Conteúdo
Datas antigas são sempre explícitas. Mockup da hero é imagem conceitual; imagens nas matérias vêm do WordPress da Federação.
Resultados, estatutos e listas do acervo usam dados reais; sem eventos ou métricas inventados.

