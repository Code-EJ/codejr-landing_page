import { cva } from 'class-variance-authority';
export const fileItemVariants = cva('flex items-center gap-2 rounded-xl px-3 py-2 text-sm', { variants: { type: { file: 'glass-muted', folder: 'font-medium text-inherit' } }, defaultVariants: { type: 'file' } });
