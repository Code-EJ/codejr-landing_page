import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Folder } from "../../../../components/ui/FolderCard/Folder";
import { ServiceCard } from "../../../../components/ui/ServiceCard/ServiceCard";

import {
  services,
  serviceCategories,
} from "../../services.data";

import type {
  ServiceCategory,
} from "../../services.types";

import styles from "./ServicesExplorer.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ServiceFilter = "Todos" | ServiceCategory;

const indexedServices = services.map(
  (service, index) => ({
    ...service,
    index: index + 1,
  }),
);

export function ServicesExplorer() {
  const [category, setCategory] =
    useState<ServiceFilter>("Todos");

  const [activeId, setActiveId] =
    useState<string | null>(null);

  const root = useRef<HTMLDivElement>(null);

  const lastTrigger =
    useRef<HTMLElement | null>(null);

  const filtered = indexedServices.filter(
    (service) =>
      category === "Todos" ||
      service.category === category,
  );

  const active = services.find(
    (service) => service.id === activeId,
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            "[data-folder-entry]",
            {
              y: 18,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.055,
              ease: "power3.out",
              clearProps: "transform,opacity",

              scrollTrigger: {
                trigger: root.current,
                start: "top 90%",
                once: true,
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    {
      scope: root,
      dependencies: [category],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={root}
      className={`liquid-glass ${styles.explorer}`}
    >
      <div className={styles.toolbar}>
        <span
          className={styles.windowDots}
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
        </span>

        <span>CODE / serviços</span>

        <span className={styles.toolbarMeta}>
          Explore as possibilidades
        </span>
      </div>

      <div className={styles.workspace}>
        <aside
          className={styles.sidebar}
          aria-label="Filtrar serviços"
        >
          <p>ESPECIALIDADES</p>

          {serviceCategories.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}

              <span aria-hidden="true">
                {item === "Todos"
                  ? String(services.length).padStart(2, "0")
                  : String(
                      services.filter(
                        (service) =>
                          service.category === item,
                      ).length,
                    ).padStart(2, "0")}
              </span>
            </button>
          ))}

          <div className={styles.sidebarNote}>
            Do primeiro esboço
            <br />
            à próxima entrega.

            <span>
              Vamos construir juntos.
            </span>
          </div>
        </aside>

        <div className={styles.browser}>
          <div className={styles.breadcrumb}>
            <span>
              Serviços
              <span aria-hidden="true"> / </span>
              <strong>{category}</strong>
            </span>

            <span role="status">
              {filtered.length} serviços
            </span>
          </div>

          <div className={styles.grid}>
            {filtered.map((service) => (
              <div
                key={service.id}
                data-folder-entry
              >
                <Folder
                  title={service.title}
                  description={service.summary}
                  index={service.index}
                  onClick={() => {
                    lastTrigger.current =
                      document.activeElement as HTMLElement;

                    setActiveId(service.id);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.statusBar}>
        <span>
          <i />
          Design e tecnologia, conectados.
        </span>

        <span>
          Selecione uma pasta para explorar ↗
        </span>
      </div>

      {active && (
        <ServiceCard
          title={active.title}
          description={active.description}
          deliverables={active.deliverables}
          onClose={() => {
            setActiveId(null);

            requestAnimationFrame(() => {
              lastTrigger.current?.focus({
                preventScroll: true,
              });
            });
          }}
        />
      )}
    </div>
  );
}