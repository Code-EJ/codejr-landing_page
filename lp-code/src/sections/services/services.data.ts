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
  },
];

export const serviceCategories = [
  "Todos",
  "Design",
  "Desenvolvimento",
  "Infraestrutura",
  "Dados",
] as const;