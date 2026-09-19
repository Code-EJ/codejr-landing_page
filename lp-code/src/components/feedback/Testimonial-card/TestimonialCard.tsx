import { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGlassMotion } from '../../../hooks/useGlassMotion';
import styles from './TestimonialCard.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface TestimonialCardProps {
  text: string;
  authorName: string;
  authorRole?: string;
  avatarUrl?: string;
  rating?: number;
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

export function TestimonialCard({ text, authorName, authorRole, avatarUrl, rating }: TestimonialCardProps) {
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string>();
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const textId = useId();

  const motion = useGlassMotion(cardRef, 8);
  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(cardRef.current, { opacity: 0, duration: .6, clearProps: 'opacity', scrollTrigger: { trigger: cardRef.current, start: 'top 92%', once: true } });
    });
    return () => mm.revert();
  }, { scope: cardRef });
  const accents = (active: boolean) => contextSafe(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stars = cardRef.current?.querySelectorAll('[data-rating-star="active"]');
    const avatar = cardRef.current?.querySelector('[data-avatar]');
    if (stars?.length) {
      gsap.killTweensOf(stars);
      if (active) gsap.to(stars, { keyframes: [
        { y: -6, rotation: -12, scale: 1.25, duration: .18, ease: 'power2.out' },
        { y: 0, rotation: 0, scale: 1.08, duration: .38, ease: 'back.out(1.7)' },
      ], stagger: .065 });
      else gsap.to(stars, { y: 0, rotation: 0, scale: 1, duration: .22, overwrite: true });
    }
    if (avatar) gsap.to(avatar, { scale: active ? 1.04 : 1, duration: .3, overwrite: 'auto' });
  })();

  useEffect(() => {
    const paragraph = textRef.current;
    if (!paragraph) return;
    const measure = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(paragraph).lineHeight);
      setCanExpand(paragraph.scrollHeight > lineHeight * 4 + 1);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(paragraph);
    return () => observer.disconnect();
  }, [text]);

  const normalizedRating = rating === undefined || !Number.isFinite(rating)
    ? undefined
    : Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <article ref={cardRef} className={`liquid-glass ${styles.card}`} {...motion} onPointerEnter={() => accents(true)} onPointerLeave={() => { motion.onPointerLeave(); accents(false); }} onPointerCancel={() => { motion.onPointerCancel(); accents(false); }} onFocus={() => accents(true)} onBlur={() => { motion.onBlur(); accents(false); }}>
      {normalizedRating !== undefined && (
        <div className={styles.starsContainer} aria-label={`Avaliação de ${normalizedRating} de 5 estrelas`} role="img">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              data-rating-star={index < normalizedRating ? 'active' : 'inactive'}
              aria-hidden="true"
              className={`${styles.star} ${index < normalizedRating ? styles.starFilled : styles.starEmpty}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      <div className={styles.quoteMark} aria-hidden="true">“</div>
      <p ref={textRef} id={textId} className={`${styles.text} ${expanded ? styles.textExpanded : ''}`} title={text}>{text}</p>
      {canExpand && (
        <button
          type="button"
          className={`liquid-glass glass-action ${styles.readMore}`}
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => { motion.onPointerLeave(); setExpanded((value) => !value); }}
        >
          {expanded ? 'Ler menos' : 'Ler depoimento completo'}
          <span aria-hidden="true" className={styles.toggleIcon}>{expanded ? '−' : '+'}</span>
        </button>
      )}

      <div className={styles.footer}>
        {avatarUrl && avatarUrl !== failedAvatarUrl ? (
          <img src={avatarUrl} alt={`Foto de perfil de ${authorName}`} onError={() => setFailedAvatarUrl(avatarUrl)} className={styles.avatar} data-avatar />
        ) : (
          <div className={styles.avatarFallback} data-avatar role="img" aria-label={authorName.trim() ? `Iniciais de ${authorName.trim().replace(/\s+/g, ' ')}` : 'Autor não informado'}>
            {getInitials(authorName) || '?'}
          </div>
        )}
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{authorName}</span>
          {authorRole && <span className={styles.authorRole}>{authorRole}</span>}
        </div>
      </div>
    </article>
  );
}
