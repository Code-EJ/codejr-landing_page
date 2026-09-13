import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroImage from "./HeroImage";
import HeroLogo from "./HeroLogo";

import type { HeroRootProps } from "../../types/hero.type";

import zeroum from "../../assets/images/ZeroUmHeroSection.png";
import ftFundo from "../../assets/images/fundoHeroSection.png";
import cinza from "../../assets/images/fundo-cinza.avif";


gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroRoot({ onAnimationComplete, className = "" }: HeroRootProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !logoRef.current || !textRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {

        if (context.conditions?.reduce) {
          gsap.set(textRef.current, { rotateX: 0, opacity: 1 });
          onAnimationComplete?.();
          return;
        }

        /*
        texto começa deitado (90 graus) e invisível.
        transformOrigin bem acima do elemento simula um pêndulo pendurado
        fora da tela: girar em torno desse eixo distante faz o texto se
        aproximar da câmera (parece maior na base das
        letras) e descer, encolhendo ao tamanho normal conforme se
        aproxima de rotateX 0.
        */
        gsap.set(textRef.current, {
          rotateX: 90,
          opacity: 0,
          transformOrigin: "50% -650px",
          force3D: true
        });

        // --- TIMELINE DE SCROLL ---
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onLeave: () => onAnimationComplete?.(),
          },
        });

        tl
          // texto caindo sobre a tela com efeito de rotação 3D (pêndulo)
          .to(
            textRef.current,
            { 
              rotateX: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out"
            },
            0
          )

          // vai direto pra Home sem pausa
          .to(
            containerRef.current, 
            { scale: 0.94, opacity: 0, duration: 0.3 }, 
            0.6
          );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-black ${className}`}
    >
      <HeroImage
        ref={imageRef}
        src={ftFundo}
        alt="Imagem de fundo"
      />

      <HeroLogo
        ref={logoRef}
        textRef={textRef}
        src={zeroum}
        cutoutSrc={cinza}
        alt="Textura binária"
      />

    </section>
  );
}