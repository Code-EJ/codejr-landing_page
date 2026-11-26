/** Scroll-directed services scene — CODE / oEnzoRibas. */
import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Laptop.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function LaptopSection({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 759px)",
        },
        (context) => {
          if (!context.conditions?.motion) return;
          const scene = root.current;
          if (!scene) return;
          const camera = scene.querySelector("[data-camera]");
          const lid = scene.querySelector("[data-lid]");
          const hardware =
            scene.querySelectorAll<HTMLElement>("[data-hardware]");
          const frame = scene.querySelector("[data-frame]");
          const base = scene.querySelector("[data-base]");
          const screen = scene.querySelector<HTMLElement>("[data-display]");
          if (!camera || !lid || !frame || !screen) return;
          scene.dataset.animated = "true";
          const mobile = Boolean(context.conditions.mobile);
          const viewportWidth = () => document.documentElement.clientWidth;
          const aperture = () => viewportWidth() * 0.625;
          const cameraScale = () =>
            0.78 *
            (mobile
              ? 1
              : Math.min(1, window.innerHeight / (viewportWidth() * 0.7)));
          const content = screen.firstElementChild;
          if (!(content instanceof HTMLElement)) return;
          // Resolve geometry at setup and refresh, not during scroll.
          const previewScale = () => Math.min(1, aperture() / Math.max(1, content.offsetHeight));
          const closedCameraY = () => window.innerHeight * (mobile ? 0.24 : -0.22);
          const openCameraY = () => window.innerHeight * (mobile ? 0.24 : -0.03);
          const closedHeight = () => `${aperture()}px`;
          gsap.set(content, { transformOrigin: "50% 0" });
          gsap.set(scene, { "--display-height": closedHeight });
          const reserveContent = () => {
            scene.style.minHeight = `${Math.max(window.innerHeight, content.offsetHeight)}px`;
          };
          reserveContent();
          const observer =
            typeof ResizeObserver === "undefined"
              ? undefined
              : new ResizeObserver(reserveContent);
          observer?.observe(content);
          const screenReady = 0.9;
          const hardwareExitStart = 0.76;
          let hasEntered = false;
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            onUpdate: () => {
              const entered = timeline.time() >= screenReady;
              if (entered === hasEntered) return;
              hasEntered = entered;
              hardware.forEach((part) => {
                part.style.visibility = entered ? "hidden" : "visible";
              });
              scene.dataset.entered = String(entered);
            },
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: () =>
                `+=${window.innerHeight * (window.innerWidth < 760 ? 2.1 : 3)}`,
              // Lenis provides smoothing; do not let a delayed scrub outlive the pin.
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onToggle: (self) =>
                gsap.set([camera, lid], {
                  willChange: self.isActive ? "transform" : "auto",
                }),
            },
          });
          timeline
            .fromTo(
              camera,
              {
                z: mobile ? -160 : -850,
                scale: cameraScale,
                rotationX: -16,
                y: closedCameraY,
              },
              {
                z: mobile ? -160 : -850,
                scale: cameraScale,
                rotationX: -6,
                y: openCameraY,
                duration: 0.35,
              },
            )
            .fromTo(
              lid,
              { rotationX: -90 },
              { rotationX: 0, duration: 0.35, ease: "power1.inOut" },
              0,
            )
            .to(camera, { duration: 0.15 })
            // One pixel of overscan absorbs fractional pin positioning at browser zoom.
            .to(camera, {
              z: 0,
              scale: 1,
              y: -1,
              rotationX: 0,
              duration: screenReady - 0.5,
              ease: "power2.inOut",
            });
          // Expand only the physical bezel opening by 24px per side. This accounts
          // for its negative Z, border/shadow and subpixel projection at full zoom.
          // The deck moves below the screen before arrival; neither surface fades.
          timeline
            .fromTo(
              frame,
              { scaleX: 1, scaleY: 1 },
              {
                scaleX: () => 1 + 48 / viewportWidth(),
                scaleY: () => 1 + 48 / window.innerHeight,
                transformOrigin: "50% 50%",
                duration: 0.12,
                ease: "power2.inOut",
              },
              hardwareExitStart,
            )
            .fromTo(
              base,
              { y: 0 },
              { y: 36, duration: 0.12, ease: "power2.inOut" },
              hardwareExitStart,
            )
            .fromTo(
              scene,
              { "--display-height": closedHeight },
              {
                "--display-height": () => `${window.innerHeight + 2}px`,
                duration: screenReady - 0.5,
                ease: "power2.inOut",
              },
              0.5,
            )
            .fromTo(
              content,
              { scale: previewScale },
              {
                scale: 1,
                y: 0,
                duration: screenReady - 0.5,
                ease: "power2.inOut",
              },
              0.5,
            )
            // The completed viewport settles before normal document scroll resumes.
            .to(camera, { duration: 1 - screenReady }, screenReady);
          const revealForKeyboard = (event: FocusEvent) => {
            if (
              !(event.target instanceof HTMLElement) ||
              !event.target.matches(":focus-visible")
            )
              return;
            if (timeline.scrollTrigger && timeline.progress() < 1) {
              window.scrollTo({
                top: timeline.scrollTrigger.end,
                behavior: "instant",
              });
              timeline.progress(1);
            }
          };
          screen.addEventListener("focusin", revealForKeyboard);
          return () => {
            screen.removeEventListener("focusin", revealForKeyboard);
            observer?.disconnect();
            scene.style.removeProperty("min-height");
            delete scene.dataset.entered;
            hardware.forEach((part) => part.style.removeProperty("visibility"));
            [camera, lid].forEach((part) => {
              if (part instanceof HTMLElement)
                part.style.removeProperty("will-change");
            });
            delete scene.dataset.animated;
          };
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={styles.scene} data-laptop-scene>
      <div className={styles.camera} data-camera>
        <div className={styles.lid} data-lid>
          <div
            className={styles.frame}
            data-hardware
            data-frame
            aria-hidden="true"
          >
            <i />
          </div>
          <div
            className={styles.back}
            data-hardware
            aria-hidden="true"
          >
            <strong>CODE<span>[]</span></strong>
          </div>
          <div className={styles.display} data-display>
            {children}
          </div>
        </div>
        <div className={styles.base} data-hardware data-base aria-hidden="true">
          <div className={styles.hinge} />
          <div className={styles.keys}>
            {[
              "esc 1 2 3 4 5 6 7 8 9 0 ⌫",
              "tab Q W E R T Y U I O P ⏎",
              "⇧ A S D F G H J K L ; ⇧",
              "ctrl Z X C V B N M , . ↑ fn",
              "fn ctrl ⌥ ⌘ space ⌘ ⌥ ← ↓ →",
            ].map((row, index) => (
              <div className={styles.keyRow} key={index}>
                {row.split(" ").map((key, i) => (
                  <i
                    key={i}
                    className={key === "space" ? styles.spaceKey : undefined}
                  >
                    {key === "space" ? "" : key}
                  </i>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.trackpad} />
        </div>
      </div>
    </div>
  );
}
