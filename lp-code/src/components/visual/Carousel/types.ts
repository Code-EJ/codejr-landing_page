import type { ReactNode } from 'react';

export type MediaType = 'image' | 'video' | 'text';
type BaseItem = { id: string | number; alt?: string; title?: string };
export type CarouselItem = BaseItem & (
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; videoProps?: { autoPlay?: boolean; muted?: boolean; loop?: boolean; controls?: boolean; poster?: string } }
  | { type: 'text'; content: ReactNode }
);

export interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  onIndexChange?: (newIndex: number) => void;
  maxWidth?: string | number;
  height?: string | number;
  label?: string;
}
