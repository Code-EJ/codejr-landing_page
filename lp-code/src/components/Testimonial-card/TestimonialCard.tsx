import { useState } from 'react';
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
  const normalizedRating = rating === undefined || !Number.isFinite(rating)
    ? undefined
    : Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <article className={styles.card}>
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
      <p className={styles.text} title={text}>{text}</p>

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
