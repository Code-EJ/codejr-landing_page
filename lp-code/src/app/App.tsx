import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { CodeIntro } from "../sections/hero/components/CodeIntro/CodeIntro";
import { Footer } from "../components/layout/Footer/Footer";
import { Navbar } from "../components/layout/Navbar/NavBar";
import { ScrollJourney } from "../components/visual/ScrollJourney/ScrollJourney";

import styles from "./App.module.css";
import {
  AboutSection,
  ContactSection,
  DisciplinesBar,
  HeroSection,
  ProjectsSection,
  ServicesSection,
  TestimonialsSection,
} from "../sections";
gsap.registerPlugin(useGSAP, ScrollTrigger);

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

      <ScrollJourney />
      <main id="main-content">
        <HeroSection />
        <DisciplinesBar />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
