import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "../../../lib/cn";
import styles from "./ServiceCard.module.css";

type Props = {
  title: string;
  onClose: () => void;
  className?: string;
  description?: string;
  deliverables?: string[];
};

export function ServiceCard({
  title,
  onClose,
  className,
  description = "Vamos entender sua ideia e definir juntos o melhor caminho para o projeto.",
  deliverables = [],
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const titleId = useId();
  const descriptionId = useId();

  const closing = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            dialog.current,
            {
              y: 18,
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
      scope: dialog,
    },
  );

  useEffect(() => {
    const element = dialog.current;

    if (!element) return;

    /*
     * Guarda a posição ANTES do browser abrir
     * e focar o dialog.
     */
    const scrollPosition = window.scrollY;

    if (!element.open) {
      element.showModal();
    }

    /*
     * O browser já terminou o showModal().
     * Agora controlamos o foco sem permitir
     * que ele altere o viewport.
     */
    requestAnimationFrame(() => {
      closeButton.current?.focus({
        preventScroll: true,
      });

      /*
       * Proteção extra contra browsers que
       * tenham movido o viewport durante
       * showModal().
       */
      if (Math.abs(window.scrollY - scrollPosition) > 1) {
        window.scrollTo({
          top: scrollPosition,
          left: 0,
          behavior: "instant",
        });
      }
    });

    return () => {
      if (element.open) {
        element.close();
      }
    };
  }, []);

  const close = contextSafe(() => {
    if (closing.current) return;

    closing.current = true;

    const finish = () => {
      if (dialog.current?.open) {
        dialog.current.close();
      }

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

    gsap.to(dialog.current, {
      opacity: 0,
      y: 10,
      scale: 0.985,
      duration: 0.18,
      overwrite: true,
      onComplete: finish,
    });
  });

  return createPortal(
    <dialog
      ref={dialog}
      className={cn(
        "liquid-glass",
        styles.dialog,
        className,
      )}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }

        const rect =
          event.currentTarget.getBoundingClientRect();

        const clickedOutside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;

        if (clickedOutside) {
          close();
        }
      }}
    >
      <div className={styles.dialogHeader}>
        <span>CODE / ESPECIALIDADES</span>

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
            <h4>O que podemos construir</h4>

            <ul>
              {deliverables.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">
                    ↗
                  </span>

                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        <a
          className="
            liquid-glass
            glass-action
            glass-action--primary
          "
          href="#contact"
          onClick={() => {
            if (dialog.current?.open) {
              dialog.current.close();
            }

            onClose();
          }}
        >
          Planejar meu projeto
          <span aria-hidden="true"> ↗</span>
        </a>
      </div>
    </dialog>,
    document.body,
  );
}