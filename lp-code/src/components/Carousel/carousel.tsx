import { useRef, useState, useSyncExternalStore, type PointerEvent } from 'react';
import { useCarousel } from './hooks/useCarousel';
import { useCarouselMotion } from './hooks/useCarouselMotion';
import type { CarouselProps, CarouselItem } from './types';
import styles from './Carousel.module.css';

const EMPTY_ITEMS: CarouselItem[] = [];
const reducedQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(notify: () => void) {
  const media = window.matchMedia?.(reducedQuery);
  media?.addEventListener('change', notify);
  return () => media?.removeEventListener('change', notify);
}
function subscribeVisibility(notify: () => void) {
  document.addEventListener('visibilitychange', notify);
  return () => document.removeEventListener('visibilitychange', notify);
}

function Media({ item, reduced, onPlaying }: { item: CarouselItem; reduced: boolean; onPlaying: (playing: boolean) => void }) {
  const [failed, setFailed] = useState(false);
  if (item.type === 'text') return <div className={styles.textContent} data-lenis-prevent>{item.content}</div>;
  if (failed) return (
    <div className={styles.fallback} role="status">
      <span aria-hidden="true">◇</span>
      <p>Não foi possível carregar esta mídia.</p>
      <button type="button" className={`liquid-glass ${styles.glassButton}`} onClick={() => setFailed(false)}>Tentar novamente</button>
    </div>
  );
  if (item.type === 'image') return <img className={styles.media} src={item.src} alt={item.alt ?? item.title ?? 'Imagem do carrossel'} draggable={false} onError={() => setFailed(true)} />;
  return <video
    className={styles.media} src={item.src} aria-label={item.alt ?? item.title ?? 'Vídeo do carrossel'}
    controls={item.videoProps?.controls ?? true} autoPlay={!reduced && item.videoProps?.autoPlay}
    muted={item.videoProps?.muted} loop={item.videoProps?.loop} poster={item.videoProps?.poster}
    playsInline preload="metadata" onPlay={() => onPlaying(true)} onPause={() => onPlaying(false)}
    onEnded={() => onPlaying(false)} onError={() => { setFailed(true); onPlaying(false); }}
  />;
}

export default function Carousel({ items = EMPTY_ITEMS, autoPlay = false, interval = 3000, onIndexChange, maxWidth = '100%', height = 'auto', label = 'Galeria de projetos' }: CarouselProps) {
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia?.(reducedQuery).matches ?? false, () => false);
  const hidden = useSyncExternalStore(subscribeVisibility, () => document.hidden, () => false);
  const [hovered, setHovered] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [playOverride, setPlayOverride] = useState<boolean | null>(null);
  const [playingId, setPlayingId] = useState<string | number | null>(null);
  const [interacted, setInteracted] = useState(false);
  const wantsPlay = playOverride ?? autoPlay;
  // A playing video owns the viewer's attention until playback stops or they navigate.
  const { validItems, index, direction, next, previous, goTo, handleKeyboard } = useCarousel({
    items, interval, onIndexChange, playingId,
    autoPlay: wantsPlay && !hovered && !focusPaused && !hidden && !reduced,
  });
  const total = validItems.length;
  const current = validItems[index];
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const slideKey = current ? `${typeof current.id}:${current.id}:${current.type}:${current.type === 'text' ? '' : current.src}` : 'empty';
  const { tilt, resetTilt, buttonMotion } = useCarouselMotion(rootRef, stageRef, slideKey, direction, reduced);
  const preview = (item: CarouselItem) => item.type === 'image'
    ? <img src={item.src} alt="" draggable={false} />
    : <div className={styles.previewArt}><span>CODE<span className={styles.previewMark}>[]</span></span><small>{item.title ?? (item.type === 'video' ? 'Motion & stories' : 'Design & tecnologia')}</small></div>;
  const navigate = (action: () => void) => { setPlayingId(null); setInteracted(true); action(); };
  const pointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' || (event.target as HTMLElement).closest('button, a, input, textarea, select, video, [contenteditable="true"]')) return;
    gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };
  const pointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.25) navigate(dx < 0 ? next : previous);
  };
  return (
    <section ref={rootRef} className={styles.carousel} style={{ maxWidth, height }} aria-label={label} aria-roledescription="carrossel"
      onPointerOver={(event) => buttonMotion(event, true)} onPointerOut={(event) => buttonMotion(event, false)}
      tabIndex={0} onKeyDown={(event) => { handleKeyboard(event); if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) && event.defaultPrevented) { setPlayingId(null); setInteracted(true); } }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusPaused(false); }}>
      <div className={styles.header}>
        <span className={styles.eyebrow}><span className={styles.statusDot} />{label}</span>
        <span className={styles.counter} aria-hidden="true">{String(total ? index + 1 : 0).padStart(2, '0')} <span>/ {String(total).padStart(2, '0')}</span></span>
      </div>
      {!current ? <div className={styles.fallback} role="status">Nenhum conteúdo disponível.</div> : (
        <div ref={stageRef} className={styles.stage} data-single={total === 1 || undefined}
          onPointerMove={tilt} onPointerLeave={resetTilt}
          onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={() => { gesture.current = null; resetTilt(); }}>
          {total > 1 && <button type="button" tabIndex={-1} className={`liquid-glass ${styles.previewLeft}`} aria-label="Ver slide anterior" onClick={() => navigate(previous)}><div aria-hidden="true">{preview(validItems[(index - 1 + total) % total])}</div></button>}
          {total > 2 && <button type="button" tabIndex={-1} className={`liquid-glass ${styles.previewRight}`} aria-label="Ver próximo slide" onClick={() => navigate(next)}><div aria-hidden="true">{preview(validItems[(index + 1) % total])}</div></button>}
          <div className={`liquid-glass ${styles.slideShell}`}>
          <div className={styles.exitLayer} aria-hidden="true" inert />
          <div key={slideKey}
            className={styles.slide} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${total}`}>
            <Media item={current} reduced={reduced} onPlaying={(playing) => setPlayingId(playing ? current.id : null)} />
            {current.title && <div className={`liquid-glass ${styles.caption}`}>{current.title}</div>}
          </div>
          </div>
        </div>
      )}
      {total > 1 && (
        <div className={styles.controls}>
          <button type="button" className={`liquid-glass ${styles.glassButton}`} aria-label="Item anterior" onClick={() => navigate(previous)}><span aria-hidden="true">←</span></button>
          <div className={styles.dots} aria-label="Escolher slide">
            {validItems.map((item, i) => <button type="button" key={item.id} className={styles.dot} aria-label={`Ir para o slide ${i + 1}`} aria-current={index === i ? 'true' : undefined} onClick={() => navigate(() => goTo(i))}><span /></button>)}
          </div>
          <button type="button" className={`liquid-glass ${styles.glassButton}`} aria-label="Próximo item" onClick={() => navigate(next)}><span aria-hidden="true">→</span></button>
          {!reduced && <button type="button" className={`liquid-glass ${styles.playButton}`} aria-label={wantsPlay ? 'Pausar reprodução automática' : 'Iniciar reprodução automática'} onClick={() => { setPlayOverride(!wantsPlay); setFocusPaused(false); }}><span aria-hidden="true">{wantsPlay ? 'Ⅱ' : '▷'}</span></button>}
        </div>
      )}
      <span className={styles.srOnly} aria-live={wantsPlay && !reduced && !focusPaused && !hovered && !hidden && playingId === null ? 'off' : 'polite'} aria-atomic="true">{interacted && current ? `Slide ${index + 1} de ${total}${current.title ? ': ' + current.title : ''}` : ''}</span>
    </section>
  );
}
