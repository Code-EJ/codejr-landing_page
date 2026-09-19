import { cva, type VariantProps } from 'class-variance-authority';
export const cardVariants = cva('relative rounded-3xl p-6', { variants: { variant: {
  default: 'liquid-glass',
  secondary: 'liquid-glass',
  elevated: 'liquid-glass shadow-xl',
  ghost: 'border border-transparent bg-transparent',
} }, defaultVariants: { variant: 'default' } });
export type CardVariants = VariantProps<typeof cardVariants>;
