import Carousel from "../../components/visual/Carousel/carousel";
import type { CarouselItem } from "../../components/visual/Carousel/types";
import { ProjectPreview } from "./ProjectPreview";
import styles from "../../app/App.module.css";
import { projectData } from "./projects.data.ts";

export const projects: CarouselItem[] = projectData.map(
  (project, index) => ({
    id: project.id,
    type: "text",
    content: (
      <ProjectPreview
        name={project.name}
        description={project.description}
        kind={project.kind}
        index={index + 1}
      />
    ),
  }),
);

export function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.splitHead} data-reveal>
        <div>
          <p className={styles.eyebrow}>
            03 / SOLUÇÕES QUE CONSTRUÍMOS
          </p>

          <h2>
            Tecnologia para transformar
            <br />
            <span>problemas em soluções.</span>
          </h2>
        </div>

        <p>
          Desenvolvemos soluções digitais de ponta a ponta, combinando
          software, dados e design para resolver desafios reais de empresas
          e organizações.
        </p>
      </div>

      <Carousel
        items={projects}
        label="Soluções desenvolvidas pela CODE"
      />
    </section>
  );
}