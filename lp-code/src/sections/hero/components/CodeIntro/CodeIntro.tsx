/** CODE opening sequence. Interface direction and project credit: oEnzoRibas. */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CodeIntro.module.css";
import { ScrollIndicator } from "../../../../components/ui";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function CodeIntro() {
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!root.current || !word.current || window.location.hash) return;
        root.current.dataset.animated = "true";
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.6}`,
            pin: true,
            scrub: 0.3,
            anticipatePin: 1,
          },
        });
        gsap.set(root.current, { visibility: "visible", opacity: 1 });
        timeline
          .fromTo(
            word.current,
            {
              z: 1050,
              y: "30vh",
              rotationX: -28,
              rotationY: -16,
              scale: 1.12,
              opacity: 0,
            },
            {
              z: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              opacity: 1,
              duration: 1.4,
              ease: "power1.out",
            },
          )
          .to(word.current, {
            y: "-65vh",
            rotationX: 75,
            opacity: 0,
            duration: 0.45,
            ease: "power2.in",
          })
          .fromTo(
            word.current,
            {
              y: "-65vh",
              rotationX: 75,
              scale: 1.12,
              opacity: 0,
              transformOrigin: "50% -180px",
            },
            {
              y: 0,
              rotationX: 0,
              scale: 1,
              opacity: 1,
              duration: 1.05,
              ease: "power3.out",
              immediateRender: false,
            },
          )
          .to(
            word.current,
            {
              y: "32vh",
              scale: 0.82,
              opacity: 0,
              duration: 0.7,
              ease: "power2.inOut",
            },
            "+=.12",
          )
          .to(root.current, { autoAlpha: 0, duration: 0.55 }, "-=.5");
        return () => {
          if (root.current) delete root.current.dataset.animated;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
     <div
    ref={root}
    className={styles.intro}
  >
    <div
      ref={word}
      className={styles.word}
      aria-hidden="true"
    >
      CODE<span>[]</span>
    </div>

    <ScrollIndicator href="#about" />
  </div>
  );
}
