import React from "react";
import { useRef } from "react";
import {
  useScrollTrigger,
  useStaggerScroll,
  useScrollTimeline,
} from "../../../hooks/scrollHooks";
import { useGSAP } from "@gsap/react";

/**
 * MotionDemo
 * Componente de demonstração da infraestrutura de animações (Motion Base).
 *
 * Objetivos:
 * - Validar hooks reutilizáveis de animação com ScrollTrigger
 * - Demonstrar animações simples, stagger e timeline
 *
 * Recursos:
 * - useScrollTrigger -> animação simples (fade + translate)
 * - useStaggerScroll -> animação em cascata (stagger)
 * - useScrollTimeline -> sequência orquestrada
 *
 * Responsividade:
 * - Layout adaptado para mobile, tablet e desktop
 * - Grid e tipografia ajustáveis via Tailwind
 *
 * Observações:
 * - Todas as animações utilizam cleanup automático via useGSAP
 * - Escopo controlado para evitar conflitos de seleção
 */
const MotionDemo: React.FC = () => {
  // Animação Simples (Fade + Slide)
  const singleRef = useScrollTrigger<HTMLElement>({
    opacity: 0,
    x: -100,
    duration: 1,
  });

  // Cartões para Animação em Cascata (Stagger)
  const cardsRef = useRef<HTMLDivElement>(null);

  // Stagger (cards em cascata)
  useStaggerScroll(
    cardsRef,
    ".card-item",
    // Estado inicial: invisível e deslocado para baixo
    {
      opacity: 0,
      y: 80,
      rotation: 5,
    },
    // Estado final: visível e na posição original
    {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 0.6,
      stagger: 0.15,
    },
  );

  // Timeline orquestrada
  const { containerRef, tl } = useScrollTimeline<HTMLElement>();

  useGSAP(
    () => {
      if (!tl.current) return;

      tl.current
        .from(".item-1", { opacity: 0, y: -30, duration: 0.6 })
        .from(
          ".item-2",
          { scaleX: 0, transformOrigin: "left center", duration: 0.8 },
          "-=0.2",
        )
        .from(".item-3", { opacity: 0, scale: 0.5, duration: 0.5 });
    },
    { scope: containerRef },
  );

  return (
    <div className="px-4 md:px-10 py-10 space-y-[40vh] md:space-y-[50vh] bg-slate-900 text-white">
      <section className="h-[20vh] flex items-center justify-center border-b border-slate-700 text-center">
        <h2 className="text-xl md:text-2xl animate-pulse">
          Faz scroll para baixo para ver a magia! ↓
        </h2>
      </section>

      {/* DEMO 1: SIMPLES */}
      <section
        ref={singleRef}
        className="
          p-6 md:p-10 
          bg-blue-600 
          rounded-xl 
          max-w-xl md:max-w-2xl 
          mx-auto
        "
      >
        <h3 className="text-2xl md:text-3xl font-bold">Animação Simples</h3>
        <p className="text-sm md:text-base mt-2">
          Eu apareci deslizando da esquerda usando o hook básico.
        </p>
      </section>

      {/* DEMO 2: STAGGER */}
      <section
        ref={cardsRef}
        className="max-w-4xl mx-auto will-change-transform"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Efeito Stagger (Cascata)
        </h3>

        <div
          className="
            grid 
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            gap-4
          "
        >
          {Array.from({ length: 9 }, (_, j) => {
            const base2Value = j.toString(2);
            return (
              <div
                key={j}
                className="
                card-item 
                p-6 md:p-10 
                bg-green-900 
                rounded-lg 
                text-center
                font-extrabold
              "
              >
                Card {base2Value}
              </div>
            );
          })}
        </div>
      </section>

      {/* DEMO 3: TIMELINE */}
      <section
        ref={containerRef}
        className="
          max-w-xl md:max-w-2xl 
          mx-auto 
          text-center 
          border-t border-slate-700 
          pt-16 md:pt-20
        "
      >
        <h3 className="item-1 text-3xl md:text-4xl font-black mb-2">
          A Timeline Master
        </h3>

        <div
          className="item-2 h-1 bg-yellow-400 mx-auto mb-4"
          style={{ width: "150px", maxWidth: "60%" }}
        />

        <p className="item-3 text-base md:text-xl text-slate-300">
          Esta sequência foi orquestrada pelo Hook de Timeline!
        </p>
      </section>

      <footer className="h-[40vh] md:h-[50vh]" />
    </div>
  );
};

export default MotionDemo;
