/** Scroll-directed services scene — CODE / oEnzoRibas. */
import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './LaptopSection.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function LaptopSection({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 759px)' }, context => {
      if (!context.conditions?.motion) return;
      const scene = root.current;
      if (!scene) return;
      const camera = scene.querySelector('[data-camera]');
      const lid = scene.querySelector('[data-lid]');
      const hardware = scene.querySelectorAll<HTMLElement>('[data-hardware]');
      const shell = scene.querySelectorAll('[data-shell]');
      const base = scene.querySelector('[data-base]');
      const screen = scene.querySelector<HTMLElement>('[data-display]');
      if (!camera || !lid || !screen) return;
      scene.dataset.animated = 'true';
      const mobile = Boolean(context.conditions.mobile);
      const aperture = window.innerWidth * .625;
      const cameraScale = .78 * (mobile ? 1 : Math.min(1, window.innerHeight / (window.innerWidth * .7)));
      const content = screen.firstElementChild;
      if (!(content instanceof HTMLElement)) return;
      // Fit the complete window once; no layout reads during scroll.
      const previewScale = Math.min(1, aperture / Math.max(1, content.offsetHeight));
      gsap.set(content, { scale: previewScale, transformOrigin: '50% 0' });
      gsap.set(scene, { '--display-height': `${aperture}px`, '--deck-depth': `${aperture + 36}px` });
      const reserveContent = () => { scene.style.minHeight = `${Math.max(window.innerHeight, content.offsetHeight)}px`; };
      reserveContent();
      const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(reserveContent);
      observer?.observe(content);
      const screenReady = .9;
      const hardwareExitStart = .76;
      let hasEntered = false;
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: () => {
          const entered = timeline.time() >= screenReady;
          if (entered === hasEntered) return;
          hasEntered = entered;
          hardware.forEach(part => { part.style.visibility = entered ? 'hidden' : 'visible'; });
          scene.dataset.entered = String(entered);
        },
        scrollTrigger: {
          trigger: scene, start: 'top top',
          end: () => `+=${window.innerHeight * (window.innerWidth < 760 ? 2.1 : 3)}`,
          // Lenis provides smoothing; do not let a delayed scrub outlive the pin.
          pin: true, scrub: true, anticipatePin: 1,
          onToggle: self => gsap.set([camera, lid], { willChange: self.isActive ? 'transform' : 'auto' }),
        },
      });
      timeline.fromTo(camera, { z: mobile ? -160 : -850, scale: cameraScale, rotationX: -16, y: window.innerHeight * (mobile ? .24 : .1) },
        { z: mobile ? -160 : -850, scale: cameraScale, rotationX: -6, y: window.innerHeight * (mobile ? .24 : .1), duration: .35 })
        .fromTo(lid, { rotationX: -90 }, { rotationX: 0, duration: .35, ease: 'power1.inOut' }, 0)
        .to(camera, { duration: .15 })
        // One pixel of overscan absorbs fractional pin positioning at browser zoom.
        .to(camera, { z: 0, scale: 1, y: -1, rotationX: 0, duration: screenReady - .5, ease: 'power2.inOut' });
      // Expand only the physical bezel opening by 24px per side. This accounts
      // for its negative Z, border/shadow and subpixel projection at full zoom.
      // The deck moves below the screen before arrival; neither surface fades.
      timeline.to(shell, {
        scaleX: 1 + 48 / window.innerWidth,
        scaleY: 1 + 48 / window.innerHeight,
        transformOrigin: '50% 50%',
        duration: .12, ease: 'power2.inOut',
      }, hardwareExitStart)
        .to(base, { y: 36, duration: .12, ease: 'power2.inOut' }, hardwareExitStart)
        .to(scene, { '--display-height': `${window.innerHeight + 2}px`, duration: screenReady - .5, ease: 'power2.inOut' }, .5)
        .to(content, { scale: 1, y: 0, duration: screenReady - .5, ease: 'power2.inOut' }, .5)
        // The completed viewport settles before normal document scroll resumes.
        .to(camera, { duration: 1 - screenReady }, screenReady);
      const revealForKeyboard = (event: FocusEvent) => {
        if (!(event.target instanceof HTMLElement) || !event.target.matches(':focus-visible')) return;
        if (timeline.scrollTrigger && timeline.progress() < 1) {
          window.scrollTo({ top: timeline.scrollTrigger.end, behavior: 'instant' });
          timeline.progress(1);
        }
      };
      screen.addEventListener('focusin', revealForKeyboard);
      return () => {
        screen.removeEventListener('focusin', revealForKeyboard);
        observer?.disconnect();
        scene.style.removeProperty('min-height');
        delete scene.dataset.entered;
        hardware.forEach(part => part.style.removeProperty('visibility'));
        [camera, lid].forEach(part => { if (part instanceof HTMLElement) part.style.removeProperty('will-change'); });
        delete scene.dataset.animated;
      };
    });
    return () => mm.revert();
  }, { scope: root });

  return <div id="services" ref={root} className={styles.scene}>
    <div className={styles.camera} data-camera>
      <div className={styles.lid} data-lid>
        <div className={styles.frame} data-hardware data-shell aria-hidden="true"><i /></div>
        <div className={styles.back} data-hardware data-shell aria-hidden="true">CODE<span>[]</span></div>
        <div className={styles.display} data-display>{children}</div>
      </div>
      <div className={styles.base} data-hardware data-base aria-hidden="true"><div className={styles.hinge} /><div className={styles.keys}>{['esc 1 2 3 4 5 6 7 8 9 0 ⌫', 'tab Q W E R T Y U I O P ⏎', '⇧ A S D F G H J K L ; ⇧', 'ctrl Z X C V B N M , . ↑ fn', 'fn ctrl ⌥ ⌘ space ⌘ ⌥ ← ↓ →'].map((row, index) => <div className={styles.keyRow} key={index}>{row.split(' ').map((key, i) => <i key={i} className={key === 'space' ? styles.spaceKey : undefined}>{key === 'space' ? '' : key}</i>)}</div>)}</div><div className={styles.trackpad} /></div>
    </div>
  </div>;
}
