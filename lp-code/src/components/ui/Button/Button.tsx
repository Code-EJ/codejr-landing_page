import { forwardRef } from "react"
import type { ButtonHTMLAttributes } from "react"
import type { VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button.variants"
import { cn } from "../../../lib/cn"

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>
/**
 * Button Component
 *
 * Componente base do Design System.
 * Suporta variantes visuais (primary, secondary, ghost)
 * e tamanhos (sm, md, lg) via class-variance-authority.
 *
 * Implementado com forwardRef para permitir:
 * - Integração com bibliotecas de animação (ex: Framer Motion)
 * - Controle imperativo externo (focus, etc.)
 */
  export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"