import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './PartnersMarquee.module.css';

export type Partner = { name: string; logo: string; url?: string; alt: string };

function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className={styles.fallback}>{partner.name}</span> :
    <img src={partner.logo} alt={partner.alt} width="180" height="52" decoding="async" onError={() => setFailed(true)} />;
}

/** CODE / oEnzoRibas — continuous logo rail, independent from the project carousel. */
export function PartnersMarquee({ partners, label = 'Marcas Parceiras da CODE' }: { partners: readonly Partner[]; label?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reverseTrack = useRef<HTMLDivElement>(null);
  const loops = useRef<gsap.core.Tween[]>([]);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const stopped = paused || hovered || focused;
  const stopRef = useRef(stopped);
  const split = Math.ceil(partners.length / 2);
  const reversePartners = [...partners.slice(split), ...partners.slice(0, split)];
  useGSAP(() => {
    if (partners.length < 2 || !track.current) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const rails = [track.current!, reverseTrack.current!].filter(Boolean);
      const measure = () => {
        const progress = loops.current.map(animation => animation.progress());
        loops.current.forEach(animation => animation.kill());
        // Each of the two equal groups is at least one viewport wide: no empty seams.
        loops.current = rails.map((rail, index) => gsap.fromTo(rail, { xPercent: index ? -50 : 0 }, {
          xPercent: index ? 0 : -50, duration: Math.max(18, rail.scrollWidth / 2 / 28), ease: 'none', repeat: -1,
          paused: stopRef.current || document.hidden,
        }).progress(progress[index] ?? 0));
      };
      measure();
      const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : undefined;
      observer?.observe(root.current!);
      const visibility = () => { loops.current.forEach(animation => animation.paused(stopRef.current || document.hidden)); };
      document.addEventListener('visibilitychange', visibility);
      return () => {
        observer?.disconnect();
        document.removeEventListener('visibilitychange', visibility);
        loops.current.forEach(animation => animation.kill());
        loops.current = [];
        gsap.set(rails, { clearProps: 'transform' });
      };
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [partners], revertOnUpdate: true });

  useGSAP(() => {
    stopRef.current = stopped;
    loops.current.forEach(animation => animation.paused(stopped || document.hidden));
  }, { dependencies: [stopped], scope: root });

  if (!partners.length) return null;
  return <div ref={root} className={styles.root} data-static={partners.length < 2 || undefined} role="group" aria-label={label}>
    <div className={styles.header}><span>{label}</span>{partners.length > 1 && <button type="button" className={styles.control} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Retomar movimento' : 'Pausar movimento'}<span aria-hidden="true">{paused ? ' ▷' : ' Ⅱ'}</span></button>}</div>
    <div className={styles.viewport} onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)} onPointerCancel={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      {[false, true].filter(reverse => !reverse || partners.length > 1).map(reverse => <div key={String(reverse)} ref={reverse ? reverseTrack : track} className={`${styles.track} ${reverse ? styles.reverse : ''}`} data-logo-direction={reverse ? 'right' : 'left'} aria-hidden={reverse || undefined}>
        {(partners.length > 1 ? [false, true] : [false]).map(duplicate => <div key={String(duplicate)} className={`${styles.group} ${duplicate ? styles.duplicate : ''}`} aria-hidden={duplicate || undefined}>
          {(reverse ? reversePartners : partners).map(partner => partner.url ? <a className={styles.logo} key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" tabIndex={duplicate || reverse ? -1 : undefined} aria-label={`${partner.name} — site oficial (nova aba)`}><PartnerLogo partner={partner} /></a> : <span className={styles.logo} key={partner.name}><PartnerLogo partner={partner} /></span>)}
        </div>)}
      </div>)}
    </div>
  </div>;
}
