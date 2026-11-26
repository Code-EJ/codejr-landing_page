import Carousel from "../../components/visual/Carousel/carousel";
import type { CarouselItem } from "../../components/visual/Carousel/types";
import { ProjectPreview } from "./ProjectPreview";
import styles from "../../app/App.module.css";
import { projectData } from "./projects.data";

const projects: CarouselItem[] = projectData.map((project) => ({
  id: project.id,
  type: "text",
  previewSrc: project.image,
  content: <ProjectPreview project={project} />,
}));

export function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.splitHead} data-reveal>
        <div>
          <p className={styles.eyebrow}>
            03 / SOLUÇÕES QUE CONSTRUÍMOS
          </p>

          <h2>Nossos projetos</h2>
        </div>

        <p>
          Explore projetos do portfólio da CODE. Cada demonstração mostra como
          a solução funciona, do primeiro clique à operação.
        </p>
      </div>

      <Carousel
        items={projects}
        label="Projetos de referência da CODE"
      />
    </section>
  );
}
