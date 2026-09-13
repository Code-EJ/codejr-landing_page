import { cn } from "../../../lib/cn"
import { sectionTitleVariants } from "./sectionTitle.variants"

type Props = {
  title: string
  subtitle?: string
  className?: string
}
/**
 * SectionTitle Component
 *
 * Componente padronizado para títulos de seção.
 * Suporta título obrigatório e subtítulo opcional.
 *
 * Estrutura preparada para futura animação individual
 * de title e subtitle.
 */
export function SectionTitle({ title, subtitle, className }: Props) {
  return (
    <div className={cn(sectionTitleVariants(), className)}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}