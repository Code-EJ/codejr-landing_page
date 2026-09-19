export type ServiceCategory =
  | "Design"
  | "Desenvolvimento"
  | "Infraestrutura"
  | "Dados";

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  description: string;
  deliverables: string[];
}