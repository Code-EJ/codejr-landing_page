import {
  useRef,
  type MouseEvent,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import styles from "./ScrollJourney.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const checkpoints = [
  {
    progress: 0,
    label: "Início",
  },
  {
    progress: 0.25,
    label: "25%",
  },
  {
    progress: 0.5,
    label: "50%",
  },
  {
    progress: 0.75,
    label: "75%",
  },
  {
    progress: 1,
    label: "Fim",
  },
] as const;

export function ScrollJourney() {
  const root = useRef<HTMLElement>(null);

  const track = useRef<HTMLDivElement>(null);

  const fill = useRef<HTMLDivElement>(null);

  const rocket = useRef<HTMLDivElement>(null);

  const rocketBody = useRef<HTMLDivElement>(null);

  const flame = useRef<SVGGElement>(null);

  const glow = useRef<HTMLSpanElement>(null);

  const progressText =
    useRef<HTMLOutputElement>(null);

  const markerRefs =
    useRef<Array<HTMLButtonElement | null>>([]);

  useGSAP(
    () => {
      if (
        !root.current ||
        !track.current ||
        !fill.current ||
        !rocket.current ||
        !rocketBody.current
      ) {
        return;
      }

      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      gsap.set(fill.current, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      gsap.set(rocket.current, {
        y: 0,
      });

      if (!reducedMotion) {
        gsap.fromTo(
          root.current,
          {
            autoAlpha: 0,
            x: 30,
          },
          {
            autoAlpha: 1,
            x: 0,

            duration: 0.8,
            delay: 0.35,

            ease: "power3.out",
          },
        );

        if (glow.current) {
          gsap.to(glow.current, {
            scale: 1.45,
            opacity: 0.18,

            duration: 1.5,

            repeat: -1,
            yoyo: true,

            ease: "sine.inOut",
          });
        }

        if (flame.current) {
          gsap.to(flame.current, {
            scaleX: 0.75,
            opacity: 0.62,

            duration: 0.12,

            repeat: -1,
            yoyo: true,

            transformOrigin: "50% 0%",

            ease: "sine.inOut",
          });
        }
      }

      const moveRocket = gsap.quickTo(
        rocket.current,
        "y",
        {
          duration: reducedMotion
            ? 0
            : 0.28,

          ease: "power3.out",
        },
      );

      const fillTrack = gsap.quickTo(
        fill.current,
        "scaleY",
        {
          duration: reducedMotion
            ? 0
            : 0.18,

          ease: "power2.out",
        },
      );

      const rotateRocket = gsap.quickTo(
        rocketBody.current,
        "rotation",
        {
          duration: reducedMotion
            ? 0
            : 0.2,

          ease: "power2.out",
        },
      );

      const stretchFlame =
        flame.current
          ? gsap.quickTo(
              flame.current,
              "scaleY",
              {
                duration: reducedMotion
                  ? 0
                  : 0.12,

                ease: "power2.out",
              },
            )
          : null;

      let settleTimer:
        | ReturnType<typeof setTimeout>
        | undefined;

      const updateMarkers = (
        progress: number,
      ) => {
        markerRefs.current.forEach(
          (marker, index) => {
            if (!marker) return;

            const checkpoint =
              checkpoints[index];

            const next =
              checkpoints[index + 1];

            const passed =
              progress + 0.015 >=
              checkpoint.progress;

            const active =
              passed &&
              (!next ||
                progress <
                  next.progress);

            marker.dataset.passed =
              passed
                ? "true"
                : "false";

            marker.dataset.active =
              active
                ? "true"
                : "false";
          },
        );
      };

      const scrollTrigger =
        ScrollTrigger.create({
          start: 0,
          end: "max",

          onUpdate: (self) => {
            const progress =
              self.progress;

            const trackHeight =
              track.current?.clientHeight ??
              0;

            moveRocket(
              trackHeight * progress,
            );

            fillTrack(progress);

            if (
              progressText.current
            ) {
              progressText.current.textContent =
                `${String(
                  Math.round(
                    progress * 100,
                  ),
                ).padStart(
                  3,
                  "0",
                )}%`;
            }

            updateMarkers(progress);

            if (reducedMotion) {
              return;
            }

            const velocity =
              Math.abs(
                self.getVelocity(),
              );

            const velocityFactor =
              gsap.utils.clamp(
                0,
                1,
                velocity / 2600,
              );

            stretchFlame?.(
              1 +
                velocityFactor *
                  1.15,
            );

            rotateRocket(
              self.direction *
                velocityFactor *
                8,
            );

            if (settleTimer) {
              clearTimeout(
                settleTimer,
              );
            }

            settleTimer =
              setTimeout(() => {
                rotateRocket(0);

                stretchFlame?.(1);
              }, 140);
          },
        });

      ScrollTrigger.refresh();

      return () => {
        scrollTrigger.kill();

        if (settleTimer) {
          clearTimeout(
            settleTimer,
          );
        }
      };
    },
    {
      scope: root,
    },
  );

  const scrollToProgress = (
    progress: number,
  ) => {
    const maxScroll =
      Math.max(
        0,
        document.documentElement
          .scrollHeight -
          window.innerHeight,
      );

    window.scrollTo({
      top: maxScroll * progress,
      behavior: "smooth",
    });
  };

  const handleTrackClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (!track.current) {
      return;
    }

    if (
      (
        event.target as HTMLElement
      ).closest("button")
    ) {
      return;
    }

    const bounds =
      track.current.getBoundingClientRect();

    const relativeY =
      event.clientY -
      bounds.top;

    const progress =
      gsap.utils.clamp(
        0,
        1,
        relativeY /
          bounds.height,
      );

    scrollToProgress(progress);
  };

  return (
    <aside
      ref={root}
      className={styles.journey}
      aria-label="Progresso da página"
    >
      <div
        className={
          styles.progressHeader
        }
      >
        <span
          className={
            styles.progressLabel
          }
        >
          SCROLL
        </span>

        <output
          ref={progressText}
          className={
            styles.progressValue
          }
          aria-live="off"
        >
          000%
        </output>
      </div>

      <div
        ref={track}
        className={styles.track}
        onClick={
          handleTrackClick
        }
      >
        <span
          className={
            styles.trackBase
          }
          aria-hidden="true"
        />

        <div
          ref={fill}
          className={
            styles.trackFill
          }
          aria-hidden="true"
        />

        <span
          className={
            styles.trackGlow
          }
          aria-hidden="true"
        />

        {checkpoints.map(
          (
            checkpoint,
            index,
          ) => (
            <button
              key={
                checkpoint.progress
              }
              ref={(node) => {
                markerRefs.current[
                  index
                ] = node;
              }}
              type="button"
              className={
                styles.marker
              }
              style={{
                top: `${
                  checkpoint.progress *
                  100
                }%`,
              }}
              onClick={() =>
                scrollToProgress(
                  checkpoint.progress,
                )
              }
              aria-label={`Ir para ${checkpoint.label}`}
              data-passed={
                index === 0
                  ? "true"
                  : "false"
              }
              data-active={
                index === 0
                  ? "true"
                  : "false"
              }
            >
              <span
                className={
                  styles.markerDot
                }
              />

              <span
                className={
                  styles.markerTooltip
                }
              >
                {
                  checkpoint.label
                }
              </span>
            </button>
          ),
        )}

        <div
          ref={rocket}
          className={
            styles.rocket
          }
          aria-hidden="true"
        >
          <span
            ref={glow}
            className={
              styles.rocketGlow
            }
          />

          <div
            ref={rocketBody}
            className={
              styles.rocketBody
            }
          >
            <svg
              viewBox="0 0 44 72"
              className={
                styles.rocketSvg
              }
              focusable="false"
            >
              <defs>
                <linearGradient
                  id="scroll-rocket-body"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#ffffff"
                  />

                  <stop
                    offset="100%"
                    stopColor="#cdb7dc"
                  />
                </linearGradient>

                <linearGradient
                  id="scroll-rocket-window"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#fd0151"
                  />

                  <stop
                    offset="100%"
                    stopColor="#9413f6"
                  />
                </linearGradient>

                <linearGradient
                  id="scroll-rocket-flame"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#ffffff"
                  />

                  <stop
                    offset="35%"
                    stopColor="#fd0151"
                  />

                  <stop
                    offset="100%"
                    stopColor="#9413f6"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <g
                ref={flame}
                className={
                  styles.flame
                }
              >
                <path
                  d="
                    M17 53
                    C17 63 22 70 22 70
                    C22 70 27 63 27 53
                    Z
                  "
                  fill="url(#scroll-rocket-flame)"
                />
              </g>

              <path
                d="
                  M22 2
                  C13 11 10 24 10 38
                  C10 46 13 53 16 58
                  L28 58
                  C31 53 34 46 34 38
                  C34 24 31 11 22 2
                  Z
                "
                fill="url(#scroll-rocket-body)"
              />

              <path
                d="
                  M11 38
                  L3 52
                  L16 49
                  Z
                "
                fill="#8c7899"
              />

              <path
                d="
                  M33 38
                  L41 52
                  L28 49
                  Z
                "
                fill="#8c7899"
              />

              <circle
                cx="22"
                cy="27"
                r="6.5"
                fill="url(#scroll-rocket-window)"
              />

              <circle
                cx="20"
                cy="25"
                r="2"
                fill="white"
                opacity="0.65"
              />
            </svg>
          </div>
        </div>
      </div>

      <span
        className={
          styles.brandMark
        }
        aria-hidden="true"
      >
        CODE[]
      </span>
    </aside>
  );
}