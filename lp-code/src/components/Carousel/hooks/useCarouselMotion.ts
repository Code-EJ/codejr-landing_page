import { useRef, type RefObject, type PointerEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from '../Carousel.module.css';

gsap.registerPlugin(useGSAP);

export function useCarouselMotion(root: RefObject<HTMLElement | null>, stage: RefObject<HTMLDivElement | null>, slideKey: string, direction: number, reduced: boolean) {
  const snapshot = useRef<HTMLElement | null>(null);
  const { contextSafe } = useGSAP({ scope: root, dependencies: [reduced], revertOnUpdate: true });

  useGSAP(() => {
    const incoming = root.current?.querySelector<HTMLElement>(`.${styles.slide}`);
    const host = root.current?.querySelector<HTMLElement>(`.${styles.exitLayer}`);
    if (!incoming || !host) { snapshot.current = null; return; }

    // A non-interactive visual copy lets React immediately commit the accessible active slide.
    const outgoing = snapshot.current;
    const copy = incoming.cloneNode(true) as HTMLElement;
    for (const element of [copy, ...copy.querySelectorAll('*')]) {
      ['id', 'role', 'aria-label', 'aria-roledescription', 'autofocus'].forEach(name => element.removeAttribute(name));
      if (element.tagName === 'IMG') element.setAttribute('alt', '');
    }
    copy.querySelectorAll('video').forEach(video => {
      const still = document.createElement(video.poster ? 'img' : 'div');
      still.className = video.className;
      if (still instanceof HTMLImageElement) { still.src = video.poster; still.alt = ''; }
      video.replaceWith(still);
    });
    snapshot.current = copy;
    if (reduced) return;

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (outgoing) {
      host.append(outgoing);
      timeline.to(outgoing, { xPercent: -direction * 18, rotationY: direction * 12, scale: 0.92, opacity: 0, duration: 0.46 }, 0);
    }
    timeline.fromTo(incoming,
      { xPercent: outgoing ? direction * 16 : 0, y: outgoing ? 0 : 16, rotationY: outgoing ? -direction * 10 : 0, scale: 0.94, opacity: 0 },
      { xPercent: 0, y: 0, rotationY: 0, scale: 1, opacity: 1, duration: 0.76, clearProps: 'transform,opacity' }, outgoing ? 0.08 : 0);
    const caption = incoming.querySelector(`.${styles.caption}`);
    if (caption) timeline.fromTo(caption, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, clearProps: 'transform,opacity' }, 0.28);
    const previews = root.current!.querySelectorAll(`.${styles.previewLeft}, .${styles.previewRight}`);
    if (previews.length) timeline.fromTo(previews,
      { x: direction * 12, opacity: 0.2 }, { x: 0, opacity: 0.48, duration: 0.6, clearProps: 'transform,opacity' }, 0.06);
    timeline.eventCallback('onComplete', () => outgoing?.remove());
    return () => { outgoing?.remove(); };
  }, { scope: root, dependencies: [slideKey, reduced], revertOnUpdate: true });

  const tilt = contextSafe((event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = gsap.utils.clamp(0, 1, (event.clientX - bounds.left) / bounds.width);
    const y = gsap.utils.clamp(0, 1, (event.clientY - bounds.top) / bounds.height);
    gsap.to(event.currentTarget, { '--rx': `${(0.5 - y) * 9}deg`, '--ry': `${(x - 0.5) * 12}deg`, '--glare-x': `${x * 100}%`, '--glare-y': `${y * 100}%`, duration: 0.55, ease: 'power3.out', overwrite: 'auto' });
  });
  const resetTilt = contextSafe(() => {
    if (stage.current) gsap.to(stage.current, { '--rx': '0deg', '--ry': '0deg', duration: reduced ? 0 : 0.7, ease: 'power3.out', overwrite: 'auto' });
  });
  const buttonMotion = contextSafe((event: PointerEvent<HTMLElement>, entering: boolean) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const button = (event.target as HTMLElement).closest(`.${styles.glassButton}, .${styles.playButton}`);
    if (!button || (event.relatedTarget instanceof Node && button.contains(event.relatedTarget))) return;
    gsap.to(button, { y: entering ? -3 : 0, scale: entering ? 1.04 : 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  });
  return { tilt, resetTilt, buttonMotion };
}
