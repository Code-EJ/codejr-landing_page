# Entrega da Landing Page — CODE

> Documento de referência da entrega funcional e técnica da landing page da CODE, versão `1.0.0`.

## 1. Visão geral

A landing page foi entregue como a presença digital institucional da **Code Soluções em Tecnologia Júnior**, reunindo apresentação da empresa, áreas de atuação, serviços, soluções, prova social, canais de contato e informações institucionais em uma única experiência web.

A solução foi construída como uma aplicação frontend em **React + TypeScript + Vite**, com foco em:

- apresentação institucional clara;
- experiência visual responsiva;
- navegação orientada por seções;
- animações e interações baseadas em scroll;
- acessibilidade e suporte a movimento reduzido;
- arquitetura modular e preparada para manutenção;
- apresentação detalhada dos serviços;
- canais de contato diretos e formulário integrado;
- publicação de produção em hospedagem **Hostinger**.

A versão `1.0.0` representa o primeiro baseline oficial da landing page.

---

## 2. Escopo entregue

A experiência principal é composta por:

1. abertura cinematográfica da marca CODE;
2. navbar responsiva;
3. hero institucional;
4. barra de disciplinas/áreas;
5. seção sobre a CODE;
6. experiência interativa de serviços;
7. apresentação das soluções que a empresa desenvolve;
8. parceiros e depoimentos;
9. formulário e canais de contato;
10. footer institucional;
11. indicador global de progresso da página.

A aplicação principal está organizada em seções independentes:

```text
src/
├── app/
├── components/
│   ├── feedback/
│   ├── layout/
│   ├── ui/
│   └── visual/
├── sections/
│   ├── about/
│   ├── contact/
│   ├── disciplines/
│   ├── hero/
│   ├── projects/
│   ├── services/
│   └── testimonials/
├── data/
├── hooks/
├── lib/
└── styles/
```

Essa estrutura substitui a organização anterior mais concentrada no `App.tsx` e estabelece separação entre layout, componentes reutilizáveis, componentes visuais, dados e seções da página.

---

## 3. Funcionalidades entregues

### 3.1. Abertura e Hero

A experiência inicial da página inclui uma abertura animada da marca **CODE[]**, controlada por scroll.

A sequência utiliza GSAP e ScrollTrigger para:

- introdução em perspectiva;
- entrada e saída da marca;
- sincronização da animação com o scroll;
- transição para o conteúdo principal;
- desativação da sequência quando o usuário acessa a página diretamente por uma âncora;
- fallback para usuários com preferência por movimento reduzido.

Após a introdução, o Hero apresenta a proposta institucional da CODE e os principais caminhos de navegação e conversão.

---

### 3.2. Navegação principal

A Navbar disponibiliza acesso direto às principais áreas:

- Início;
- Sobre nós;
- Serviços;
- Destaques;
- Contato.

A navegação foi implementada para desktop e mobile.

No mobile, o menu inclui:

- abertura e fechamento animados;
- fechamento ao clicar fora do menu;
- fechamento com `Escape`;
- abertura pelo teclado;
- navegação com `ArrowUp`, `ArrowDown`, `Home` e `End`;
- gerenciamento de foco;
- atributos ARIA para indicar o estado do menu.

Há também um CTA permanente para a seção de contato.

---

### 3.3. Scroll suave e animações

A página utiliza **Lenis** para rolagem suave e **GSAP + ScrollTrigger** para animações orientadas por scroll.

A implementação inclui:

- revelação progressiva de conteúdo;
- sincronização do Lenis com ScrollTrigger;
- animações de entrada das seções;
- limpeza e reversão das timelines quando necessário;
- comportamento adaptado a diferentes tamanhos de tela.

A preferência do sistema `prefers-reduced-motion` é respeitada. Quando movimento reduzido está habilitado, animações decorativas e scroll suavizado são reduzidos ou removidos.

---

### 3.4. Scroll Journey

Foi entregue um indicador global de progresso da página, exibido como uma jornada lateral.

O componente:

- acompanha a posição atual do usuário;
- exibe percentual de progresso;
- possui checkpoints em 0%, 25%, 50%, 75% e 100%;
- utiliza um foguete animado como marcador visual;
- reage à velocidade e direção do scroll;
- permite clicar na trilha ou nos checkpoints para navegar pela página;
- possui comportamento específico para `prefers-reduced-motion`.

---

### 3.5. Seção Sobre a CODE

A seção institucional apresenta:

- posicionamento da empresa;
- proposta de valor;
- princípios de trabalho;
- foco em produto, engenharia e evolução da solução;
- áreas técnicas atendidas.

Os cards de princípios utilizam componentes reutilizáveis do design system da aplicação.

---

## 4. Experiência de Serviços

A área de serviços é uma das principais entregas interativas da landing page.

### 4.1. Laptop cinematográfico

A entrada na seção de serviços utiliza uma composição visual de notebook controlada pelo scroll.

A sequência inclui:

- abertura da tampa;
- movimento de câmera em perspectiva;
- aproximação progressiva da interface;
- transição da tela do notebook para a interface real da seção;
- tratamento específico para dispositivos móveis;
- reserva dinâmica de espaço para evitar saltos de layout;
- suporte a navegação por teclado sem obrigar o usuário a percorrer toda a animação.

O conteúdo da seção permanece no mesmo DOM; não é utilizada uma captura de tela ou uma segunda versão da interface.

---

### 4.2. Services Explorer

O antigo explorador genérico foi substituído pelo **ServicesExplorer**, específico para o domínio da landing page.

A interface permite filtrar serviços pelas categorias:

- Todos;
- Design;
- Desenvolvimento;
- Infraestrutura;
- Dados.

Os serviços entregues atualmente são:

- **UI Design**
- **Frontend**
- **Backend**
- **DevOps**
- **Mobile**
- **Data**

Cada item apresenta resumo e acesso aos detalhes do serviço.

---

### 4.3. Detalhamento dos serviços

Ao selecionar um serviço, é aberto um modal acessível com:

- título;
- descrição;
- entregáveis;
- CTA para planejamento do projeto;
- showcase visual opcional;
- carousel de referências visuais.

O modal possui:

- `role="dialog"`;
- `aria-modal="true"`;
- título e descrição associados por ARIA;
- foco inicial no botão de fechar;
- focus trap;
- fechamento com `Escape`;
- fechamento ao clicar no backdrop;
- retorno do foco ao elemento que abriu o modal;
- animações de abertura e fechamento;
- fallback para movimento reduzido.

---

### 4.4. Showcases

O modelo de dados dos serviços suporta showcases opcionais com:

- título;
- descrição;
- imagem;
- texto alternativo;
- identificação própria.

As referências visuais são exibidas usando o componente de Carousel compartilhado.

As imagens utilizadas nessa área são **ilustrativas** e servem como apoio visual para apresentação das soluções.

---

## 5. Soluções apresentadas

A seção de projetos/destaques apresenta tipos de soluções que a CODE pode desenvolver.

Atualmente são apresentados:

- ERP e sistemas internos;
- sites, landing pages e aplicações web;
- dashboards e BI;
- análise de dados;
- Data Science e Machine Learning;
- APIs, integrações e automação.

Esses conteúdos são apresentados em um Carousel reutilizável.

A seção funciona como demonstração das capacidades da empresa e não deve ser interpretada automaticamente como catálogo de cases comerciais concluídos.

---

## 6. Parceiros e depoimentos

A landing page possui uma seção dedicada à prova social, composta por:

- marquee de marcas e referências;
- cards de depoimentos;
- avaliação visual por estrelas.

### Conteúdo demonstrativo

No estado atual do projeto:

- os depoimentos são explicitamente identificados na própria interface como demonstrativos;
- as referências de parceiros possuem comentário no código orientando a confirmação de relacionamento e autorização de uso de marca antes da publicação como parceria oficial.

Antes de converter essa seção em prova social comercial definitiva, devem ser confirmados:

- depoimentos autorizados;
- nomes e cargos;
- relações institucionais;
- permissões de uso das marcas.

---

## 7. Contato

A landing page possui três caminhos principais para contato:

1. formulário;
2. WhatsApp;
3. e-mail.

A configuração centralizada dos canais está em:

```text
src/lib/contact.ts
```

Canais configurados atualmente:

- e-mail: `contato@juniorcode.com.br`;
- WhatsApp institucional configurado no código.

---

### 7.1. Formulário

O formulário solicita:

- nome;
- e-mail;
- tipo de serviço;
- descrição da ideia;
- consentimento para envio.

O envio é realizado pelo **Web3Forms**.

A aplicação implementa:

- validação de nome;
- validação de e-mail;
- limites de tamanho dos campos;
- mensagem mínima;
- consentimento obrigatório;
- honeypot contra bots;
- bloqueio de envio duplicado;
- timeout;
- tratamento de erro de rede;
- tratamento de erro da API;
- preservação dos dados quando ocorre falha;
- feedback de estado para o usuário.

A aplicação não simula sucesso: a confirmação só é mostrada quando a API retorna uma resposta de sucesso.

---

### 7.2. Variável de ambiente

O formulário depende de:

```env
VITE_WEB3FORMS_ACCESS_KEY=
```

A chave não deve ser commitada no repositório.

Sem a configuração da chave:

- o botão do formulário permanece indisponível;
- a interface informa que o envio ainda precisa ser ativado;
- WhatsApp e e-mail continuam disponíveis.

Detalhes adicionais estão em `docs/CONTACT.md`.

---

## 8. Footer

O footer entregue reúne:

- navegação interna;
- redes sociais;
- endereço institucional;
- link para Google Maps;
- razão social;
- CNPJ;
- direitos reservados;
- crédito de desenvolvimento;
- ação para voltar ao início.

Redes configuradas:

- Instagram;
- LinkedIn;
- GitHub.

O endereço institucional apresentado é:

```text
R. Álvares Maciel, 628
Santa Efigênia
Belo Horizonte — MG
30150-250
```

---

## 9. Acessibilidade

A implementação inclui diferentes cuidados de acessibilidade.

Entre eles:

- skip link para pular diretamente ao conteúdo principal;
- landmarks semânticos;
- labels de navegação;
- estados ARIA;
- gerenciamento de foco;
- focus trap em modal;
- navegação completa por teclado no menu mobile;
- textos alternativos nas imagens dos showcases;
- conteúdo decorativo removido da árvore acessível quando apropriado;
- suporte a `prefers-reduced-motion`;
- links externos com `rel="noopener noreferrer"`;
- formulários associados a labels;
- status e alertas de envio semanticamente identificados.

A acessibilidade deve continuar sendo validada a cada nova alteração visual ou funcional.

---

## 10. Responsividade

A interface foi construída para funcionar em desktop e dispositivos móveis.

Há comportamentos específicos para:

- Navbar;
- laptop e sequência de serviços;
- Carousel;
- Scroll Journey;
- layout dos serviços;
- modais;
- footer;
- animações orientadas por scroll.

A experiência de movimento também possui parâmetros diferentes para telas menores, evitando aplicar diretamente as mesmas distâncias e enquadramentos utilizados no desktop.

---

## 11. Design system e identidade visual

A landing page utiliza uma linguagem visual baseada em:

- superfícies translúcidas;
- efeito de vidro;
- gradientes;
- profundidade;
- destaque em roxo e magenta;
- elementos verdes de status;
- microinterações;
- animações de entrada e hover.

Os estilos de material compartilhado são centralizados para reduzir divergências entre componentes.

Componentes reutilizáveis incluem, entre outros:

- Button;
- Card;
- Container;
- Folder;
- ServiceCard;
- Carousel;
- ScrollIndicator.

Os diretórios `Button`, `Card` e `Container` foram normalizados em PascalCase também no índice do Git, evitando falhas de resolução em sistemas de arquivos case-sensitive, como ambientes Linux de produção.

---

## 12. Stack técnica

Principais tecnologias da versão `1.0.0`:

| Camada | Tecnologia |
| --- | --- |
| UI | React 19 |
| Linguagem | TypeScript |
| Build | Vite |
| Estilos | CSS Modules + Tailwind CSS |
| Animações | GSAP / @gsap/react |
| Scroll | Lenis + ScrollTrigger |
| Variantes de componentes | class-variance-authority |
| Utilitários CSS | clsx / tailwind-merge |
| Testes | Vitest + Testing Library |
| Formulário externo | Web3Forms |
| Hospedagem de produção | Hostinger |

---

## 13. Scripts de desenvolvimento

Comandos disponíveis no projeto:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

O build de produção executa:

```bash
tsc -b && vite build
```

Portanto, erros de TypeScript impedem a geração do bundle antes da etapa final do Vite.

---

## 14. Testes

O repositório possui testes automatizados para componentes e fluxos relevantes, incluindo áreas como:

- Navbar;
- Footer;
- ServiceCard;
- ServicesExplorer;
- ContactBrief;
- Carousel;
- Laptop;
- ScrollIndicator;
- CodeIntro;
- componentes de UI.

Os testes utilizam **Vitest**, **Testing Library**, **jsdom** e mocks para integrações externas.

O envio do formulário é testado com `fetch` simulado; os testes não enviam mensagens reais ao Web3Forms.

---

## 15. Produção e Hostinger

A publicação de produção da landing page utiliza a **Hostinger** como ambiente de hospedagem.

O projeto gera uma aplicação frontend estática por meio do Vite. O artefato de produção é gerado pelo comando:

```bash
npm run build
```

A publicação deve utilizar o conteúdo gerado em `dist/`.

### Configuração de ambiente

A variável abaixo precisa estar disponível no ambiente usado para realizar o build de produção:

```env
VITE_WEB3FORMS_ACCESS_KEY=<chave do formulário>
```

Como variáveis prefixadas por `VITE_` são incorporadas ao bundle durante a compilação, qualquer alteração nessa configuração exige um novo build e uma nova publicação na Hostinger.

A chave utilizada pelo Web3Forms é própria para integração frontend. Mesmo assim, não devem ser armazenadas em variáveis `VITE_`:

- senhas de e-mail;
- credenciais SMTP;
- tokens privados;
- segredos de infraestrutura.

### Importante

Não existe, no estado atual do repositório, um pipeline específico da Hostinger versionado junto ao código.

Isso significa que:

- a aplicação contém tudo que é necessário para gerar o build frontend;
- a configuração da hospedagem, domínio e publicação é mantida no ambiente da Hostinger;
- alterações nessa infraestrutura devem ser documentadas separadamente caso passem a fazer parte de um fluxo automatizado de CI/CD.

### Checklist de publicação

Antes de publicar uma nova versão:

1. instalar as dependências;
2. conferir as variáveis de ambiente;
3. executar `npm run build`;
4. confirmar que TypeScript e Vite finalizaram sem erro;
5. executar `npm run lint`;
6. validar a aplicação gerada;
7. publicar o conteúdo de `dist/` na Hostinger;
8. validar navegação e assets no domínio de produção;
9. testar WhatsApp e e-mail;
10. realizar um envio real autorizado pelo formulário;
11. validar responsividade;
12. validar navegação por teclado;
13. validar comportamento com movimento reduzido.

---

## 16. Arquitetura e manutenção

A organização atual foi estruturada para evitar o crescimento de um `App.tsx` monolítico.

Como regra geral:

- componentes exclusivos de uma seção devem permanecer dentro da própria seção;
- componentes reutilizáveis pertencem a `components/`;
- dados estáticos de uma feature devem permanecer próximos da feature;
- integrações e utilidades compartilhadas ficam em `lib/`;
- componentes puramente visuais ficam em `components/visual/`;
- componentes estruturais globais ficam em `components/layout/`.

Essa separação deve ser preservada nas próximas evoluções.

---

## 17. Pontos que exigem manutenção de conteúdo

Alguns conteúdos precisam ser revisados conforme a landing page passa do estágio inicial para uso comercial contínuo.

### Depoimentos

Os depoimentos atuais são demonstrativos e devem ser substituídos por relatos reais e autorizados.

### Parceiros

As marcas exibidas devem ter relacionamento e autorização confirmados antes de serem apresentadas publicamente como parceiros oficiais.

### Showcases

As imagens de serviços são referências ilustrativas e não representam necessariamente projetos executados pela CODE.

### Contato

Sempre que e-mail ou WhatsApp forem alterados, atualizar de forma sincronizada:

- `src/lib/contact.ts`;
- `docs/CONTACT.md`;
- testes do formulário;
- qualquer material institucional externo que dependa desses canais.

---

## 18. Resultado da entrega

A versão `1.0.0` entrega uma landing page institucional completa e modular, com:

- identidade visual consolidada;
- experiência responsiva;
- narrativa orientada por scroll;
- navegação acessível;
- apresentação estruturada da empresa;
- catálogo interativo de serviços;
- showcases visuais;
- apresentação das capacidades da CODE;
- prova social preparada para conteúdo real;
- formulário integrado;
- canais institucionais;
- informações legais e endereço;
- arquitetura preparada para evolução;
- build de produção compatível com publicação na Hostinger.

A partir desta versão, novas funcionalidades e alterações relevantes devem ser registradas por release, mantendo este documento como referência do escopo inicial entregue.

---

## 19. Documentação relacionada

- `docs/LANDING_PAGE.md` — decisões visuais, movimento e detalhes da experiência.
- `docs/CONTACT.md` — configuração e operação do formulário e canais de contato.
- `docs/SOCIAL-PROOF.md` — documentação relacionada à prova social.
- `.env.example` — variável necessária para ativação do formulário.

---

## 20. Créditos

Desenvolvido pela **CODE**.

Direção e desenvolvimento desta evolução: **oEnzoRibas**.
