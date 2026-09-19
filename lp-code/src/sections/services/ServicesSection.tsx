import { ServicesExplorer } from "./components/ServicesExplorer/ServicesExplorer";
import LaptopSection from "../../components/visual/Laptop/Laptop";
import styles from "../../app/App.module.css";

export function ServicesSection() {
return (
    <LaptopSection>
        <section aria-label="Serviços" className={styles.section}>
            <div className={styles.splitHead}>
            <div>
                <p className={styles.eyebrow}>02 / O QUE CONSTRUÍMOS</p>
                <h2>
                Abra uma pasta.
                <br />
                <span>Descubra um caminho.</span>
                </h2>
            </div>
            <p>
                Explore nossas especialidades e encontre o ponto de partida para
                a sua próxima ideia.
            </p>
            </div>
            <ServicesExplorer />
        </section>
    </LaptopSection>
)
}