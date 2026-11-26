import agendaflow from "../../assets/projects/agendaflow.jpg";
import aurora from "../../assets/projects/aurora.webp";
import insightlab from "../../assets/projects/insightlab.webp";
import menuverse from "../../assets/projects/menuverse.jpg";

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  repository: string;
  siteUrl?: string;
  image: string;
  imageAlt: string;
}

export const projectData: Project[] = [
  {
    id: "menuverse",
    name: "MenuVerse",
    category: "Cardápio digital e gestão de pedidos",
    description:
      "Da escolha no cardápio à fila da cozinha. O cliente personaliza e acompanha o pedido, enquanto a equipe gerencia produtos e atualiza o preparo.",
    repository: "https://github.com/Code-EJ/MenuVerse",
    image: menuverse,
    imageAlt: "Cardápio do MenuVerse com os hambúrgueres mais pedidos da Brasa & Co.",
  },
  {
    id: "insightlab",
    name: "InsightLab",
    category: "Análise de dados para varejo",
    description:
      "Transforma históricos de vendas em indicadores, rankings e previsões. A demonstração permite filtrar períodos, importar CSVs e simular cenários de receita.",
    repository: "https://github.com/Code-EJ/InsightLab",
    image: insightlab,
    imageAlt: "Painel do InsightLab com filtros, indicadores de vendas e gráficos de receita.",
  },
  {
    id: "aurora-odontologia",
    name: "Aurora Odontologia",
    category: "Site institucional e captação de contatos",
    description:
      "Site de portfólio para uma clínica fictícia. A experiência apresenta tratamentos, equipe e dúvidas frequentes, com um formulário que recebe o interesse do visitante.",
    repository: "https://github.com/Code-EJ/Aurora-Odontologia",
    siteUrl: "https://code-ej.github.io/Aurora-Odontologia/",
    image: aurora,
    imageAlt: "Página inicial do site da Aurora Odontologia em desktop e celular.",
  },
  {
    id: "agendaflow",
    name: "AgendaFlow",
    category: "Agendamento online e gestão de horários",
    description:
      "Clientes escolhem serviço, profissional e horário pelo portal. A equipe administra reservas, disponibilidade e indicadores em um painel próprio.",
    repository: "https://github.com/Code-EJ/AgendaFlow",
    image: agendaflow,
    imageAlt: "Painel do AgendaFlow com indicadores e gráfico de agendamentos do Studio Bloom.",
  },
];
