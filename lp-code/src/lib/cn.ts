import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
/**
 * Utilitário para merge inteligente de classes.
 *
 * Combina:
 * - clsx (condicional)
 * - tailwind-merge (resolve conflitos de classes Tailwind)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}