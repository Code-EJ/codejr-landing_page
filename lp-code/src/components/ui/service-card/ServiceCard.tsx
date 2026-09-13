import { cn } from "../../../lib/cn"

type Props = {
  title: string
  onClose: () => void
  className?: string
}

/**
 * ServiceCard Component
 *
 * - Modal de detalhe do serviço
 * - Abre sobre o grid (overlay + blur)
 * - Pode ser fechado via botão ou clique externo
 */
export function ServiceCard({ title, onClose, className }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="
        absolute
        inset-0
        bg-black/60
        backdrop-blur-sm
      "
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={cn(
          `
          relative
          w-[500px]
          rounded-lg
          overflow-hidden

          border-b border-white/20
          

          bg-gradient-to-br
          from-[#1C0E22]
          via-[#3a003a]
          to-[#450539]
          `,
          className
        )}
      >
        {/* Header */}
        <div
          className="
          flex items-center justify-between
          px-3 py-1.5

          text-md text-white/80

          bg-[#72008E]/30
          backdrop-blur-md
          
          "
        >
          <span>{title}</span>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition"
          >
            [×]
          </button>
        </div>

        {/* Content */}
        <div className="h-40 w-full" />
      </div>
    </div>
  )
}