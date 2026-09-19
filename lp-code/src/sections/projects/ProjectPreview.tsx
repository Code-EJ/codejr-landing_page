import styles from "../../app/App.module.css";

interface ProjectPreviewProps {
  name: string;
  kind: string;
  description: string;
  index: number;
}

export function ProjectPreview({
  name,
  kind,
  description,
  index,
}: ProjectPreviewProps) {
  return (
    <div className={styles.projectPreview}>
      <div className={styles.projectCopy}>
        <p className={styles.eyebrow}>CONCEITO / 0{index}</p>

        <h3>{name}</h3>
        <p>{kind}</p>
        <p>{description}</p>

      </div>

      <div className={styles.projectScreen} aria-hidden="true">
        <div className={styles.screenTop}>
          <span>CODE / STUDIO</span>
          <span>•••</span>
        </div>

        <div className={styles.screenContent}>
          <span className={styles.screenTag}>CREATE SOMETHING NEW</span>

          <strong>
            {index === 1
              ? "Menos ruído. Mais foco."
              : index === 2
                ? "Cada dado, uma direção."
                : "Sua próxima ideia começa aqui."}
          </strong>

          <div className={styles.chart}>
            {[40, 65, 48, 82, 62, 92].map((height, i) => (
              <i key={i} style={{ height: `${height}%` }} />
            ))}
          </div>

          <div className={styles.screenLines}>
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}