# Landing page CODE

Developed by Code · Crédito de projeto e direção desta evolução: **oEnzoRibas** ([GitHub](https://github.com/oEnzoRibas)).

## Composição

Abertura CODE → hero e composição em perspectiva → apresentação → serviços/FileExplorer → conceitos de projetos → recomendações → formulário de briefing → footer.

A evolução preserva a estrutura da página, o formulário e o componente em perspectiva. O FileExplorer mantém as categorias, suas seis especialidades e os detalhes em diálogo. Pastas mais compactas preservam as camadas traseira, papel e vidro frontal.

## Identidade e material

- Referências da identidade existente: roxo `#9413F6`, magenta avermelhado `#FD0151`, vinho `#631434` e detalhes verdes `#4ADE80`.
- Ajuste sutil de vivacidade: roxo principal `#A820F4`, vidro `88 18 72` e destaque `#F39ED7`; o verde permanece inalterado. Estrelas usam dourado `#FFD43B` com brilho e hover GSAP em sequência, sem loop.
- `src/styles/glass.css` centraliza preenchimento, opacidade de 50%, blur, reflexos, highlights, contornos e sombra.
- A opacidade pertence ao material, nunca ao texto. Superfícies de leitura modal usam maior densidade para preservar contraste.
- `data-glass-theme="light"` disponibiliza tokens de contraste para fundos claros. Alto contraste, transparência reduzida e fallback sem blur também estão previstos.
- Não há refração óptica nativa: a implementação web interpreta o material com camadas CSS, iluminação e profundidade.

## Movimento

- GSAP/`useGSAP`: abertura CODE descendente, hero, revelação de seções, filtros do Explorer, diálogo, navbar, depoimentos e carousel.
- `useGlassMotion`: tweens reutilizados via `quickTo`, plano de referência estável, inclinação e elevação do papel.
- Lenis: apenas rolagem suave, sincronizada com ScrollTrigger; conteúdo do diálogo usa rolagem nativa.
- `prefers-reduced-motion` desativa animações decorativas, pinning e Lenis; o conteúdo segue diretamente no fluxo normal.

### Sequências cinematográficas — oEnzoRibas

O modelo inicia com tela 16:10 e base de profundidade compatível com a tampa. A tela é um contêiner de altura explícita com `overflow: clip` e contenção de pintura; não depende de uma máscara calculada sobre conteúdo excedente. Tampa, moldura e dobradiça compartilham `--display-height`. Essa altura muda durante o zoom (um custo de layout deliberado para manter o recorte físico coerente), enquanto câmera e conteúdo usam transforms. A seção real é ajustada à área inicial e volta à escala 1 na saída. O overflow só é liberado no fim, junto à retirada do hardware; o espaço da seção é reservado e acompanhado por ResizeObserver. O teclado tem cinco fileiras, barra de espaço, dobradiça e trackpad.

- `CodeIntro`: uma entrada em perspectiva real (`translateZ`, rotação, deslocamento e opacidade) precede a descida CODE existente. A timeline inteira acompanha o scroll; o trecho fixado acrescenta uma distância de 1,6 viewport à abertura. Links profundos dispensam essa abertura.
- `LaptopSection`: evolução do protótipo existente, agora recebendo a seção real como `children`. Não há screenshot, clone ou segunda instância do FileExplorer.
- Timeline: 0–35% abre a tampa pela dobradiça; 35–50% estabiliza; 50–100% avança a câmera até escala 1 e Z 0. A moldura fica fora da viewport, e o conteúdo segue no mesmo DOM após o pin.
- A distância de scroll é menor em mobile (2 viewports, contra 2,8 em desktop). Em celulares, uma abertura horizontal mostra as pastas e se expande para a viewport vertical usando recorte e transforms da mesma interface. Medidas de scroll são recalculadas no refresh, sem leitura de layout a cada frame. Hardware decorativo não participa da navegação acessível.
- `useGSAP` e `matchMedia` revertem timelines, estilos e pins. Foco visível por teclado permite chegar diretamente à interface sem percorrer o efeito.

## Conteúdo e privacidade

Projetos e recomendações demonstrativos são identificados na interface. Devem ser substituídos por casos e depoimentos autorizados antes de publicação comercial. O formulário de contato integra o Web3Forms, com envio explícito e autorizado de nome, e-mail, serviço e mensagem. O envio fica desabilitado até configurar a chave. WhatsApp e e-mail direto usam os contatos provisórios. Consulte `CONTACT.md` para ativação, privacidade e verificação de entrega.

## Verificação

Build de produção e ESLint dos arquivos desta alteração passaram. A execução direcionada do Vitest passou em 55 testes (15 arquivos); ainda informa três snapshots antigos obsoletos, anteriores às sequências cinematográficas. A prévia de produção foi inspecionada em desktop e mobile: avanço/reversão do scroll, abertura da pasta, uma única instância de Serviços, hardware fora da tela ao terminar e ausência de overflow horizontal. Testes de fallback cobrem renderização sem movimento e desmontagem da abertura. Validar também a sensação de scroll e o desempenho em dispositivos físicos antes da publicação.

## Créditos e manutenção

`oEnzoRibas` é o principal desenvolvedor e mantenedor desta evolução. O desenvolvimento pertence à Code e aos seus colaboradores.

Próximas etapas: ativar e validar a entrega de e-mail, confirmar os contatos definitivos, conteúdo real autorizado, revisão de privacidade e validação de produção/CI. Backend próprio não é necessário para o fluxo atual.
