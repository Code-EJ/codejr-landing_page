import { cva } from 'class-variance-authority';
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  { variants: { variant: {
    primary: 'liquid-glass glass-action glass-action--primary',
    secondary: 'liquid-glass glass-action',
    ghost: 'glass-action bg-transparent text-inherit',
  }, size: { sm: 'min-h-11 px-4 text-sm', md: 'min-h-11 px-5 text-sm', lg: 'min-h-12 px-7 text-base' } }, defaultVariants: { variant: 'primary', size: 'md' } }
);
