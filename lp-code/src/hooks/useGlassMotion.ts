/** CODE motion system — project direction: oEnzoRibas. */
import { useRef, type PointerEvent, type RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

/** Bounded pointer tweens and a stable reference plane prevent tilt feedback. */
export function useGlassMotion(target: RefObject<HTMLElement | null>, strength = 5) {
  const plane = useRef<DOMRect | null>(null);
  const motion = useRef<{ x: (n: number) => void; y: (n: number) => void; lift: (n: number) => void; depth: Array<(n: number) => void> } | null>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
      if (!target.current) return;
      gsap.set(target.current, { transformPerspective: 1000 });
      const options = { duration: .55, ease: 'power3.out' };
      motion.current = {
        x: gsap.quickTo(target.current, 'rotationX', options), y: gsap.quickTo(target.current, 'rotationY', options), lift: gsap.quickTo(target.current, 'y', options),
        depth: Array.from(target.current.querySelectorAll('[data-depth]')).map(node => gsap.quickTo(node, 'y', options)),
      };
      return () => { motion.current = null; plane.current = null; };
    });
    return () => mm.revert();
  }, { scope: target });
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !motion.current || !target.current) return;
    plane.current ??= event.currentTarget.getBoundingClientRect();
    const rect = plane.current;
    const x = gsap.utils.clamp(0, 1, (event.clientX - rect.left) / Math.max(1, rect.width));
    const y = gsap.utils.clamp(0, 1, (event.clientY - rect.top) / Math.max(1, rect.height));
    motion.current.x((.5 - y) * strength); motion.current.y((x - .5) * strength); motion.current.lift(-4);
    motion.current.depth.forEach((move, i) => move(-8 - i * 3));
    target.current.style.setProperty('--light-x', `${x * 100}%`); target.current.style.setProperty('--light-y', `${y * 100}%`);
  };
  const reset = () => { plane.current = null; motion.current?.x(0); motion.current?.y(0); motion.current?.lift(0); motion.current?.depth.forEach(move => move(0)); };
  return { onPointerMove, onPointerLeave: reset, onPointerCancel: reset, onBlur: reset };
}
