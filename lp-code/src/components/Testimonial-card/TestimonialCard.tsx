import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';
import styles from './TestimonialCard.module.css';

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
  const pointerBounds = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const textId = useId();

  useEffect(() => {
    const card = cardRef.current;
    if (!card || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        card.dataset.visible = 'true';
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    card.dataset.visible = 'pending';
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

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

  const moveLight = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Keep the reference plane stable: measuring the rotated card on every move
    // would make the tilt feed back into its own coordinates.
    if (!pointerBounds.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      pointerBounds.current = { left: rect.left + window.scrollX, top: rect.top + window.scrollY, width: rect.width, height: rect.height };
    }
    const bounds = pointerBounds.current;
    const x = Math.max(0, Math.min(1, (event.pageX - bounds.left) / Math.max(1, bounds.width)));
    const y = Math.max(0, Math.min(1, (event.pageY - bounds.top) / Math.max(1, bounds.height)));
    event.currentTarget.style.setProperty('--light-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--light-y', `${y * 100}%`);
    event.currentTarget.style.setProperty('--rotate-x', `${(0.5 - y) * 12}deg`);
    event.currentTarget.style.setProperty('--rotate-y', `${(x - 0.5) * 12}deg`);
  };

  const resetTilt = () => {
    pointerBounds.current = null;
    cardRef.current?.style.removeProperty('--rotate-x');
    cardRef.current?.style.removeProperty('--rotate-y');
    cardRef.current?.style.removeProperty('--light-x');
    cardRef.current?.style.removeProperty('--light-y');
  };
  const normalizedRating = rating === undefined || !Number.isFinite(rating)
    ? undefined
    : Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <article ref={cardRef} className={styles.card} onPointerEnter={moveLight} onPointerMove={moveLight} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
      {normalizedRating !== undefined && (
        <div className={styles.starsContainer} aria-label={`Avaliação de ${normalizedRating} de 5 estrelas`} role="img">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
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
          className={styles.readMore}
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => { resetTilt(); setExpanded((value) => !value); }}
        >
          {expanded ? 'Ler menos' : 'Ler depoimento completo'}
          <span aria-hidden="true" className={styles.toggleIcon}>{expanded ? '−' : '+'}</span>
        </button>
      )}

      <div className={styles.footer}>
        {avatarUrl && avatarUrl !== failedAvatarUrl ? (
          <img src={avatarUrl} alt={`Foto de perfil de ${authorName}`} onError={() => setFailedAvatarUrl(avatarUrl)} className={styles.avatar} />
        ) : (
          <div className={styles.avatarFallback} role="img" aria-label={authorName.trim() ? `Iniciais de ${authorName.trim().replace(/\s+/g, ' ')}` : 'Autor não informado'}>
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
