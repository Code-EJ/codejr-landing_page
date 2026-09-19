import styles from "../../app/App.module.css";

export function DisciplinesBar() {
  return (
    <div className={styles.disciplines} aria-label="Nossas áreas">
      <span>ESTRATÉGIA</span>
      <i />

      <span>DESIGN</span>
      <i />

      <span>DESENVOLVIMENTO</span>
      <i />

      <span>EXPERIÊNCIA</span>
    </div>
  );
}