import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import HeroRoot from "./components/hero-section/HeroRoot";
import { CodeIntro } from "./components/hero-section/CodeIntro";
import LaptopSection from "./components/laptop-section/LaptopSection";
import { TestimonialCard } from "./components/Testimonial-card/TestimonialCard";
import { FileExplorer } from "./components/ui/file-explorer/FileExplorer";
import { Footer } from "./components/ui/footer/Footer";
import { Navbar } from "./components/ui/navbar/NavBar";
import { ContactBrief } from "./components/contact/ContactBrief";
import { Card } from "./components/ui/card/Card";
import { PartnersMarquee } from "./components/partners/PartnersMarquee";
import { partnerReferences } from "./data/partners";
import Carousel from "./components/Carousel/carousel";
import type { CarouselItem } from "./components/Carousel/types";
import styles from "./App.module.css";
gsap.registerPlugin(useGSAP, ScrollTrigger);

function ProjectPreview({
  name,
  kind,
  index,
}: {
  name: string;
  kind: string;
  index: number;
}) {
  return (
    <div className={styles.projectPreview}>
      <div className={styles.projectCopy}>
        <p className={styles.eyebrow}>CONCEITO / 0{index}</p>
        <h3>{name}</h3>
        <p>{kind}</p>
        <span>Estudo visual demonstrativo</span>
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
const projects: CarouselItem[] = [
  {
    id: "web",
    type: "text",
    content: (
      <ProjectPreview
        name="Presença digital."
        kind="Web design · Desenvolvimento responsivo"
        index={1}
      />
    ),
  },
  {
    id: "data",
    type: "text",
    content: (
      <ProjectPreview
        name="Informação que guia."
        kind="Dashboards · Visualização de dados"
        index={2}
      />
    ),
  },
  {
    id: "product",
    type: "text",
    content: (
      <ProjectPreview
        name="Do fluxo ao produto."
        kind="UX/UI · Experiências digitais"
        index={3}
      />
    ),
  },
];
const quotes = [
  {
    text: "Melhor empresa júnior do Brasil!",
    authorName: "Enzo Ribas",
    authorRole: "Diretor de Projetos",
    rating: 5,
  },
  {
    text: "Trabalho excepcional e entrega muito rápida. A Code superou todas as nossas expectativas e elevou o nível do nosso produto.",
    authorName: "Maria Silva",
    authorRole: "CEO na Tech Solutions",
    rating: 4,
  },
  {
    text: "Recomendo de olhos fechados! Layout impecável e código limpo.",
    authorName: "João Pedro",
    authorRole: "Recomendação",
    rating: 5,
  },
];
const principles = [
  {
    title: "Produto antes da implementação.",
    description:
      "Mapeamos o problema, os fluxos e as prioridades. Protótipos ajudam a validar o caminho antes de transformá-lo em código.",
  },
  {
    title: "Engenharia de ponta a ponta.",
    description:
      "Conectamos interfaces responsivas, APIs e dados. Componentes reutilizáveis, testes e documentação fazem parte da construção.",
  },
  {
    title: "Entrega que pode evoluir.",
    description:
      "Organizamos ambientes e automatizamos publicações. Cada etapa é compartilhada para que a solução acompanhe as necessidades do negócio.",
  },
];

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const sync = () => {
      lenis?.destroy();
      lenis = media.matches
        ? undefined
        : new Lenis({ autoRaf: true, anchors: true, lerp: 0.08 });
      lenis?.on("scroll", ScrollTrigger.update);
    };
    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-copy] > *", {
          y: 18,
          opacity: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
        root.current
          ?.querySelectorAll("[data-reveal]")
          .forEach((node) =>
            gsap.from(node, {
              y: 22,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: node, start: "top 92%", once: true },
            }),
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className={styles.page}>
      <CodeIntro />
      <a href="#main-content" className={styles.skipLink}>
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="main-content">
        <section id="home" className={styles.hero}>
          <div className={styles.heroCopy} data-hero-copy>
            <p className={styles.eyebrow}>
              <span className={styles.statusDot} /> DESIGN + TECNOLOGIA +
              PESSOAS
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
              <span className={styles.statusDot} /> Feito de ideias humanas.
            </div>
          </div>
        </section>
        <div className={styles.disciplines} aria-label="Nossas áreas">
          <span>ESTRATÉGIA</span>
          <i /> <span>DESIGN</span>
          <i />
          <span>DESENVOLVIMENTO</span>
          <i />
          <span>EXPERIÊNCIA</span>
        </div>
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
              interfaces, integrar sistemas e transformar dados em informação
              útil. Do primeiro fluxo à publicação, design e engenharia
              trabalham juntos.
            </p>
          </div>
          <div className={styles.principles}>
            {principles.map((item, index) => (
              <div data-reveal key={item.title}>
                <Card
                  title={item.title}
                  description={item.description}
                  icon={
                    <span className={styles.cardNumber}>0{index + 1} ↗</span>
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
            <FileExplorer />
          </section>
        </LaptopSection>
        <section id="projects" className={styles.section}>
          <div className={styles.splitHead} data-reveal>
            <div>
              <p className={styles.eyebrow}>03 / POSSIBILIDADES EM TELA</p>
              <h2>
                Uma ideia pode
                <br />
                <span>ganhar muitas formas.</span>
              </h2>
            </div>
            <p>
              Uma seleção de conceitos visuais para mostrar como design e
              tecnologia se encontram. Projetos reais serão adicionados ao
              portfólio.
            </p>
          </div>
          <Carousel items={projects} label="Estudos de interface" />
        </section>
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
          <p className={styles.demoNotice}>
            Marcas de exemplo para esta prévia visual. Sua presença não indica
            parceria ou endosso à CODE.
          </p>
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
      </main>
      <Footer />
    </div>
  );
}
