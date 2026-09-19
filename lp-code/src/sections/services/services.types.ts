export type ServiceCategory =
  | "Design"
  | "Desenvolvimento"
  | "Infraestrutura"
  | "Dados";

export type ServiceShowcaseItem = {
  id: string;
  title: string;
  description?: string;
  image: string;
  alt: string;
};

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  description: string;
  deliverables: string[];
  showcase?: ServiceShowcaseItem[];
}