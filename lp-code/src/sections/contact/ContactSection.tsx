import styles from "../../app/App.module.css";
import { ContactBrief } from "../../components/contact/ContactBrief";

export function ContactSection(){
  return (
    <section id="contact" className={`${styles.section} ${styles.contact}`}>
          <div data-reveal>
            <p className={styles.eyebrow}>05 / VAMOS COMEÇAR?</p>
            <h2>
              Boas ideias merecem
              <br />
              <span>um próximo passo.</span>
            </h2>
            <p className={styles.contactText}>
              Pode ser um novo site, um produto ou uma pergunta. Conte o que
              você tem em mente e organize seu primeiro briefing.
            </p>
            <div className={styles.contactSteps}>
              <span>
                01 <strong>Você conta sua ideia.</strong>
              </span>
              <span>
                02 <strong>Definimos um caminho.</strong>
              </span>
              <span>
                03 <strong>Construímos em parceria.</strong>
              </span>
            </div>
          </div>
          <ContactBrief />
        </section>
  )
}