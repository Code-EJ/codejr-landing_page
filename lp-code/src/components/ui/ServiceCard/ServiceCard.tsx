import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Carousel from "../../visual/Carousel/carousel";
import type { CarouselItem } from "../../visual/Carousel/types";

import { cn } from "../../../lib/cn";

import styles from "./ServiceCard.module.css";

type ShowcaseItem = {
  id: string;
  title: string;
  description?: string;
  image: string;
  alt: string;
};

type Props = {
  title: string;
  onClose: () => void;
  className?: string;
  description?: string;
  deliverables?: string[];
  showcase?: ShowcaseItem[];
};

export function ServiceCard({
  title,
  onClose,
  className,
  description = "Vamos entender sua ideia e definir juntos o melhor caminho para o projeto.",
  deliverables = [],
  showcase = [],
}: Props) {
  const overlay = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const titleId = useId();
  const descriptionId = useId();

  const closing = useRef(false);

  const hasShowcase = showcase.length > 0;

  const carouselItems: CarouselItem[] = showcase.map((item) => ({
    id: item.id,
    type: "text",
    content: (
      <article
        className={styles.showcaseItem}
        data-carousel-showcase
      >
        <img
          className={styles.showcaseImage}
          src={item.image}
          alt={item.alt}
          loading="lazy"
          decoding="async"
        />

        <div className={styles.showcaseCopy}>
          <span>REFERÊNCIA VISUAL</span>

          <h4>{item.title}</h4>

          {item.description && (
            <p>{item.description}</p>
          )}
        </div>
      </article>
    ),
  }));

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            overlay.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.22,
              ease: "power2.out",
            },
          );

          gsap.fromTo(
            panel.current,
            {
              y: 24,
              scale: 0.97,
              opacity: 0,
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.38,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
          );
        },
      );

      return () => mm.revert();
    },
    {
      scope: overlay,
    },
  );

  const close = contextSafe(() => {
    if (closing.current) return;

    closing.current = true;

    const finish = () => {
      onClose();
    };

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      finish();
      return;
    }

    gsap.to(panel.current, {
      y: 12,
      scale: 0.985,
      opacity: 0,
      duration: 0.18,
      ease: "power2.in",
      overwrite: true,
    });

    gsap.to(overlay.current, {
      opacity: 0,
      duration: 0.18,
      overwrite: true,
      onComplete: finish,
    });
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      closeButton.current?.focus({
        preventScroll: true,
      });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "Tab" && panel.current) {
        const focusableElements =
          panel.current.querySelectorAll<HTMLElement>(
            [
              "a[href]",
              "button:not([disabled])",
              "input:not([disabled])",
              "select:not([disabled])",
              "textarea:not([disabled])",
              '[tabindex]:not([tabindex="-1"])',
            ].join(","),
          );

        if (focusableElements.length === 0) {
          return;
        }

        const first = focusableElements[0];
        const last =
          focusableElements[
            focusableElements.length - 1
          ];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();

          last.focus({
            preventScroll: true,
          });
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();

          first.focus({
            preventScroll: true,
          });
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [close]);

  return createPortal(
    <div
      ref={overlay}
      className={styles.overlay}
      role="presentation"
      data-lenis-prevent
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          close();
        }
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          "liquid-glass",
          styles.dialog,
          hasShowcase &&
            styles.dialogWithShowcase,
          className,
        )}
      >
        <div className={styles.dialogHeader}>
          <span>
            CODE / ESPECIALIDADES
          </span>

          <button
            ref={closeButton}
            type="button"
            className="liquid-glass glass-action"
            onClick={close}
            aria-label="Fechar serviço"
          >
            ×
          </button>
        </div>

        <div
          className={cn(
            styles.dialogBody,
            hasShowcase &&
              styles.dialogBodyWithShowcase,
          )}
        >
          <div className={styles.dialogContent}>
            <p className={styles.dialogEyebrow}>
              DA IDEIA À ENTREGA
            </p>

            <h3 id={titleId}>
              {title}
            </h3>

            <p id={descriptionId}>
              {description}
            </p>

            {deliverables.length > 0 && (
              <>
                <h4>
                  O que podemos construir
                </h4>

                <ul>
                  {deliverables.map(
                    (item) => (
                      <li key={item}>
                        <span
                          aria-hidden="true"
                        >
                          ↗
                        </span>

                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </>
            )}

            <a
              className="liquid-glass glass-action glass-action--primary"
              href="#contact"
              onClick={onClose}
            >
              Planejar meu projeto

              <span aria-hidden="true">
                {" "}
                ↗
              </span>
            </a>
          </div>

          {hasShowcase && (
            <div className={styles.dialogMedia}>
              <Carousel
                items={carouselItems}
                label={`Referências visuais de ${title}`}
                maxWidth="480px"
              />

              <p
                className={
                  styles.showcaseNotice
                }
              >
                Imagens ilustrativas para
                apresentação das soluções.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}