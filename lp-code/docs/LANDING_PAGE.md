# Landing page CODE

Developed by Code · Crédito de projeto e direção desta evolução: **oEnzoRibas** ([GitHub](https://github.com/oEnzoRibas)).

## Composição

Abertura CODE → hero e composição em perspectiva → apresentação → serviços/FileExplorer → conceitos de projetos → recomendações → formulário de briefing → footer.

A evolução preserva a estrutura da página, o formulário e o componente em perspectiva. O FileExplorer mantém as categorias, suas seis especialidades e os detalhes em diálogo. Pastas mais compactas preservam as camadas traseira, papel e vidro frontal.

## Identidade e material

- Referências da identidade existente: roxo `#9413F6`, magenta avermelhado `#FD0151`, vinho `#631434` e detalhes verdes `#4ADE80`.
- `src/styles/glass.css` centraliza preenchimento, opacidade de 50%, blur, reflexos, highlights, contornos e sombra.
- A opacidade pertence ao material, nunca ao texto. Superfícies de leitura modal usam maior densidade para preservar contraste.
- `data-glass-theme="light"` disponibiliza tokens de contraste para fundos claros. Alto contraste, transparência reduzida e fallback sem blur também estão previstos.
- Não há refração óptica nativa: a implementação web interpreta o material com camadas CSS, iluminação e profundidade.

## Movimento

- GSAP/`useGSAP`: abertura CODE descendente, hero, revelação de seções, filtros do Explorer, diálogo, navbar, depoimentos e carousel.
- `useGlassMotion`: tweens reutilizados via `quickTo`, plano de referência estável, inclinação e elevação do papel.
- Lenis: apenas rolagem suave, sincronizada com ScrollTrigger; conteúdo do diálogo usa rolagem nativa.
- `prefers-reduced-motion` desativa animações decorativas e Lenis. A abertura não bloqueia cliques nem acrescenta altura à página.

## Conteúdo e privacidade

Projetos e recomendações demonstrativos são identificados na interface. Devem ser substituídos por casos e depoimentos autorizados antes de publicação comercial. O formulário prepara um briefing local; não envia, armazena persistentemente ou comunica dados a um servidor. A cópia só ocorre por ação explícita no botão.

## Verificação

Conferir larguras de desktop, tablet e celular; ausência de overflow horizontal; filtros de serviços; modal por teclado/Escape e retorno de foco; menu mobile; carousel; formulário; crédito no footer; comportamento com movimento reduzido. No ambiente restrito de edição, o Vite pode falhar com `spawn EPERM`; uma prévia isolada não substitui o build de produção.

## Créditos e manutenção

`oEnzoRibas` é registrado no footer, metadados HTML, package.json, configuração da stack e documentação desta evolução. O desenvolvimento pertence à Code e aos seus colaboradores. Não foram alterados autores de dependências, licenças nem histórico de commits para atribuir autoria retroativamente.

Próximas etapas: contato oficial/backend, conteúdo real autorizado, revisão de privacidade e validação de produção/CI. Nenhuma dessas integrações é simulada como concluída.
