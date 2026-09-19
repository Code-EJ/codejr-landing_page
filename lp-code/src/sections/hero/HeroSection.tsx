import HeroRoot from "./components/HeroRoot";
import styles from "../../app/App.module.css";

export function HeroSection() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroCopy} data-hero-copy>
        <p className={styles.eyebrow}>
          <span className={styles.statusDot} />
          DESIGN + TECNOLOGIA + PESSOAS
        </p>

        <h1>
          Sua ideia.
          <br />
          Nosso código.
          <br />
          <span>Novas possibilidades.</span>
        </h1>

        <p className={styles.heroDescription}>
          Criamos experiências digitais que aproximam pessoas e transformam
          a maneira como o seu negócio acontece.
        </p>

        <div className={styles.actions}>
          <a
            className="liquid-glass glass-action glass-action--primary"
            href="#contact"
          >
            Vamos construir juntos <span aria-hidden="true">↗</span>
          </a>

          <a className={styles.textLink} href="#services">
            Explore nossos serviços <span aria-hidden="true">↓</span>
          </a>
        </div>

        <p className={styles.heroFootnote}>
          Empresa júnior. Energia para criar. Cuidado para entregar.
        </p>
      </div>

      <div className={styles.heroArt} aria-hidden="true">
        <div className={styles.orbit} />

        <div className={`liquid-glass ${styles.heroWindow}`}>
          <div className={styles.windowHeader}>
            <span>CODE / CREATIVE TECHNOLOGY</span>
            <span>•••</span>
          </div>

          <HeroRoot />

          <div className={styles.windowFooter}>
            <span>Da imaginação à interface.</span>
            <span>↗</span>
          </div>
        </div>

        <div className={`liquid-glass ${styles.floatingTag}`}>
          <span className={styles.statusDot} />
          Feito de ideias humanas.
        </div>
      </div>
    </section>
  );
}