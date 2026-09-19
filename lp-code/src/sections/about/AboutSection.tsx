import { Card } from "../../components/ui/Card/Card";
import styles from "../../app/App.module.css";

import { principles } from "./about.data.ts";

export function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionHead} data-reveal>
        <p className={styles.eyebrow}>01 / QUEM SOMOS</p>

        <h2>
          Software com propósito.
          <br />
          <span>Engenharia em cada decisão.</span>
        </h2>

        <p>
          Somos a CODE, uma empresa júnior de desenvolvimento de software.
          Conectamos formação técnica e prática de projeto para construir
          interfaces, integrar sistemas e transformar dados em informação útil.
          Do primeiro fluxo à publicação, design e engenharia trabalham juntos.
        </p>
      </div>

      <div className={styles.principles}>
        {principles.map((item, index) => (
          <div data-reveal key={item.title}>
            <Card
              title={item.title}
              description={item.description}
              icon={
                <span className={styles.cardNumber}>
                  0{index + 1} ↗
                </span>
              }
              className={styles.principle}
            />
          </div>
        ))}
      </div>

      <div className={styles.aboutHighlights} data-reveal>
        <div>
          <span className={styles.statusDot} />

          <strong>Da necessidade à operação.</strong>

          <p>
            Uma solução sob medida começa pelo contexto, não pela escolha da
            ferramenta.
          </p>
        </div>

        <ul aria-label="Focos técnicos da CODE">
          {[
            "UX e acessibilidade",
            "Web e mobile",
            "APIs e integrações",
            "Dados e automação",
          ].map((focus) => (
            <li key={focus}>{focus}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}