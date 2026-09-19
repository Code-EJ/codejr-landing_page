import type { Service } from "./services.types";

export const services: Service[] = [
  {
    id: "design",
    title: "UI Design",
    category: "Design",
    summary: "Clareza em cada interação.",
    description:
      "Transformamos necessidades em interfaces claras, acessíveis e consistentes com a identidade do seu negócio.",
    deliverables: [
      "Pesquisa e arquitetura da informação",
      "Protótipos navegáveis",
      "Interface responsiva e design system",
    ],
    showcase: [
      {
        id: "design-interface",
        title: "Interfaces e Design Systems",
        description:
          "Referência visual ilustrativa de processos de UI e design de produto.",
        image:
          "https://images.unsplash.com/photo-1772272935464-2e90d8218987?auto=format&fit=crop&w=1400&q=85",
        alt: "Interface de design exibida em uma tela",
      },
      {
        id: "design-workspace",
        title: "Processo de criação",
        description:
          "Ambientes e ferramentas utilizados na construção de experiências digitais.",
        image:
          "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?auto=format&fit=crop&w=1400&q=85",
        alt: "Workspace com notebook e equipamentos de trabalho",
      },
    ],
  },

  {
    id: "frontend",
    title: "Frontend",
    category: "Desenvolvimento",
    summary: "Interfaces que ganham vida.",
    description:
      "Construímos experiências web responsivas, conectando design, acessibilidade e desempenho.",
    deliverables: [
      "Sites e aplicações web",
      "Componentes reutilizáveis",
      "Integração com APIs e testes",
    ],
    showcase: [
      {
        id: "frontend-code",
        title: "Desenvolvimento Web",
        description:
          "Referência visual para aplicações e interfaces construídas para web.",
        image:
          "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?auto=format&fit=crop&w=1400&q=85",
        alt: "Desenvolvedor trabalhando em código em um notebook",
      },
      {
        id: "frontend-ui",
        title: "Interfaces digitais",
        description:
          "Experiências responsivas pensadas para diferentes dispositivos.",
        image:
          "https://images.unsplash.com/photo-1772272935464-2e90d8218987?auto=format&fit=crop&w=1400&q=85",
        alt: "Interface gráfica sendo desenvolvida",
      },
    ],
  },

  {
    id: "backend",
    title: "Backend",
    category: "Desenvolvimento",
    summary: "Uma base para crescer.",
    description:
      "Organizamos dados e regras de negócio para dar suporte a produtos digitais confiáveis.",
    deliverables: [
      "APIs e integrações",
      "Modelagem de dados",
      "Autenticação e regras de negócio",
    ],
    showcase: [
      {
        id: "backend-infrastructure",
        title: "Arquiteturas distribuídas",
        description:
          "Representação visual de serviços, infraestrutura e aplicações escaláveis.",
        image:
          "https://images.unsplash.com/photo-1667372459510-55b5e2087cd0?auto=format&fit=crop&w=1400&q=85",
        alt: "Representação abstrata de servidores distribuídos",
      },
      {
        id: "backend-servers",
        title: "Serviços e infraestrutura",
        description:
          "Backends preparados para integrar sistemas, aplicações e dados.",
        image:
          "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1400&q=85",
        alt: "Rack de servidores em um data center",
      },
    ],
  },

  {
    id: "devops",
    title: "DevOps",
    category: "Infraestrutura",
    summary: "Da entrega à operação.",
    description:
      "Preparamos uma rotina de publicação e acompanhamento adequada ao contexto do projeto.",
    deliverables: [
      "Automação de entregas",
      "Configuração de ambientes",
      "Monitoramento e documentação",
    ],
    showcase: [
      {
        id: "devops-server",
        title: "Infraestrutura",
        description:
          "Ambientes preparados para publicação, operação e evolução do software.",
        image:
          "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1400&q=85",
        alt: "Equipamentos de rede e servidores em data center",
      },
      {
        id: "devops-kubernetes",
        title: "Automação e orquestração",
        description:
          "Referência visual de arquiteturas modernas e serviços distribuídos.",
        image:
          "https://images.unsplash.com/photo-1667372459470-5f61c93c6d3f?auto=format&fit=crop&w=1400&q=85",
        alt: "Representação abstrata de infraestrutura Kubernetes",
      },
    ],
  },

  {
    id: "mobile",
    title: "Mobile",
    category: "Desenvolvimento",
    summary: "Seu produto, em movimento.",
    description:
      "Desenhamos e desenvolvemos experiências pensadas para o uso no celular, do primeiro toque aos fluxos essenciais.",
    deliverables: [
      "Experiência mobile",
      "Integração com serviços",
      "Validação em diferentes telas",
    ],
    showcase: [
      {
        id: "mobile-interface",
        title: "Experiências mobile",
        description:
          "Interfaces pensadas para navegação simples e uso em dispositivos móveis.",
        image:
          "https://images.unsplash.com/photo-1663661746218-b46d343e8f4e?auto=format&fit=crop&w=1400&q=85",
        alt: "Pessoa utilizando aplicativo em smartphone",
      },
      {
        id: "mobile-product",
        title: "Produtos digitais",
        description:
          "Aplicações conectadas a serviços e experiências digitais completas.",
        image:
          "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?auto=format&fit=crop&w=1400&q=85",
        alt: "Notebook e dispositivos em um ambiente de trabalho",
      },
    ],
  },

  {
    id: "data",
    title: "Data",
    category: "Dados",
    summary: "Dados que fazem sentido.",
    description:
      "Transformamos informações dispersas em visualizações úteis para apoiar decisões.",
    deliverables: [
      "Organização e tratamento de dados",
      "Dashboards e relatórios",
      "Automação de processos",
    ],
    showcase: [
      {
        id: "data-dashboard",
        title: "Dashboards e indicadores",
        description:
          "Visualizações que transformam dados em informações mais fáceis de interpretar.",
        image:
          "https://unsplash.com/photos/JKUTrJ4vK00/download?force=true",
        alt: "Dashboard com gráficos e métricas exibidos em uma tela",
      },
      {
        id: "data-analytics",
        title: "Análise de dados",
        description:
          "Indicadores, métricas e visualizações para apoiar decisões.",
        image:
          "https://unsplash.com/photos/tR0jvlsmCuQ/download?force=true",
        alt: "Dashboard analítico exibido em um notebook",
      },
    ],
  },
];

export const serviceCategories = [
  "Todos",
  "Design",
  "Desenvolvimento",
  "Infraestrutura",
  "Dados",
] as const;