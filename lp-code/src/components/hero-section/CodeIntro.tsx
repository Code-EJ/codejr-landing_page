/** CODE opening sequence. Interface direction and project credit: oEnzoRibas. */
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './CodeIntro.module.css';

export function CodeIntro() {
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!root.current || !word.current || window.location.hash) return;
      const timeline = gsap.timeline();
      gsap.set(root.current, { visibility: 'visible', opacity: 1 });
      timeline.fromTo(word.current,
        { y: '-65vh', rotationX: 75, scale: 1.12, opacity: 0, transformOrigin: '50% -180px' },
        { y: 0, rotationX: 0, scale: 1, opacity: 1, duration: 1.05, ease: 'power3.out' })
        .to(word.current, { y: '32vh', scale: .82, opacity: 0, duration: .7, ease: 'power2.inOut' }, '+=.12')
        .to(root.current, { opacity: 0, duration: .55, onComplete: () => { if (root.current) root.current.style.visibility = 'hidden'; } }, '-=.5');
    });
    return () => mm.revert();
  }, { scope: root });
  return <div ref={root} className={styles.intro} aria-hidden="true"><div ref={word} className={styles.word}>CODE<span>[]</span></div></div>;
}
