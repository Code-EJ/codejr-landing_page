import type { ReactNode } from "react"
import { cardVariants, type CardVariants } from "./card.variants"
import { cn } from "../../../lib/cn"

type Props = CardVariants & {
  icon?: ReactNode
  title?: string
  description?: string
  children?: ReactNode
  className?: string
}
/**
 * Card Component
 *
 * Componente estruturado para exibição de conteúdo
 * com suporte a:
 * - icon opcional
 * - title
 * - description
 * - children customizados
 *
 * Mantém separação entre estrutura e estilo (via cardVariants).
 */
export function Card({
  icon,
  title,
  description,
  children,
  className,
  variant,
}: Props) {
  return (
    <div className={cn(cardVariants({ variant }), className)}>
      {icon && <div className="mb-4">{icon}</div>}

      {title && (
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
      )}

      {children}
    </div>
  )
}