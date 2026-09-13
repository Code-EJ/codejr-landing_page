import type { ReactNode } from "react"
import { cn } from "../../../lib/cn"
import { containerVariants } from "./container.variants"

type Props = {
  children: ReactNode
  className?: string
}
/**
 * Container Component
 *
 * Responsável por:
 * - Centralização horizontal
 * - Controle de max-width
 * - Padding responsivo consistente
 *
 * Base estrutural para layout da aplicação.
 */
export function Container({ children, className }: Props) {
  return (
    <div className={cn(containerVariants(), className)}>
      {children}
    </div>
  )
}