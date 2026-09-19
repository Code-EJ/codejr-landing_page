import { TestimonialCard } from "../../components/feedback/Testimonial-card/TestimonialCard";
import { quotes } from "./testimonials.data";
import styles from "../../app/App.module.css";
import { PartnersMarquee } from "../../components/partners/PartnersMarquee";
import { partnerReferences } from "../../data/partners";

export function TestimonialsSection() {
    return (
        <section id="testimonials" className={styles.section}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.eyebrow}>04 / CONEXÕES QUE IMPORTAM</p>
            <h2>
              O resultado também
              <br />
              <span>está na experiência.</span>
            </h2>
            <p>
              Software se constrói em colaboração. Este espaço reúne a
              experiência de trabalhar com a CODE — da conversa inicial ao
              cuidado com cada entrega.
            </p>
          </div>
          <PartnersMarquee partners={partnerReferences} />
          <p className={styles.demoNotice}>
            Prévia de layout · Os depoimentos abaixo são demonstrativos e serão
            substituídos por relatos autorizados.
          </p>
          <div className={styles.testimonials}>
            {quotes.map((quote) => (
              <TestimonialCard key={quote.authorName} {...quote} />
            ))}
          </div>
        </section>
    )
}