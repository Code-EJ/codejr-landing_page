import type { Project } from "./projects.data";
import styles from "./ProjectsSection.module.css";

export function ProjectPreview({ project }: { project: Project }) {
  const { name, category, description, repository, siteUrl, image, imageAlt } = project;
  const actionLabel = siteUrl ? "Visitar site" : "Ver demonstração";

  return (
    <article className={styles.project} data-carousel-project>
      <div className={styles.copy}>
        <p className={styles.category}>{category}</p>
        <h3>{name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <a
            className="liquid-glass glass-action"
            href={siteUrl ?? `${repository}#demonstração-da-plataforma`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${actionLabel} de ${name} (nova aba)`}
          >
            {actionLabel} <span aria-hidden="true">↗</span>
          </a>
          <a
            className={styles.link}
            href={repository}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repositório de ${name} no GitHub (nova aba)`}
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <img
        className={styles.screenshot}
        src={image}
        alt={imageAlt}
        decoding="async"
      />
    </article>
  );
}
