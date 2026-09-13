import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import type { CarouselItem } from '../types';

interface UseCarouselParams {
  items: CarouselItem[];
  autoPlay: boolean;
  interval: number;
  onIndexChange?: (newIndex: number) => void;
  playingId?: string | number | null;
}

export function useCarousel({ items, autoPlay, interval, onIndexChange, playingId }: UseCarouselParams) {
  const validItems = useMemo(() => {
    const seen = new Set<string | number>();
    return items.filter((item) => {
      const valid = item.type === 'text'
        ? item.content !== undefined && item.content !== null && item.content !== false
        : Boolean(item.src?.trim());
      if (!valid || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [items]);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [direction, setDirection] = useState(1);
  const index = Math.max(0, validItems.findIndex((item) => item.id === activeId));
  const total = validItems.length;

  const goTo = useCallback((target: number) => {
    if (!total || !Number.isFinite(target)) return;
    const nextIndex = ((Math.trunc(target) % total) + total) % total;
    if (nextIndex === index) return;
    setDirection(target > index ? 1 : -1);
    setActiveId(validItems[nextIndex].id);
    onIndexChange?.(nextIndex);
  }, [index, onIndexChange, total, validItems]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!autoPlay || total < 2 || (playingId != null && validItems[index]?.id === playingId)) return;
    const delay = Number.isFinite(interval) ? Math.max(1000, interval) : 3000;
    const timer = window.setTimeout(next, delay);
    return () => window.clearTimeout(timer);
  }, [autoPlay, interval, next, total, playingId, validItems, index]);

  const handleKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, video, [contenteditable="true"], [role="slider"]')) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
    if (event.key === 'Home') { event.preventDefault(); goTo(0); }
    if (event.key === 'End') { event.preventDefault(); goTo(total - 1); }
  };
  return { validItems, index, direction, next, previous, goTo, handleKeyboard };
}
