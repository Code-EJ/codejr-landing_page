import { cn } from "../../../lib/cn"

type Props = {
  className?: string
}

/**
 * Footer Component
 *
 * Rodapé estruturado com grid responsivo.
 */
export function Footer({ className }: Props) {
  return (
    <footer
      className={cn(
        "border-t py-4 bg-gradient-to-r from-[#FB00FF]/30 via-purple/10 to-[#5E00D2]/30 backdrop-blur-sm backdrop-saturate-150 border-white/30 shadow-[0_-8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:opacity-30 before:pointer-events-none",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-4 flex flex-col gap-4 md:flex-row items-center justify-between text-center md:text-left text-sm text-gray-200">
  
        <span>
          © 2026 - CODE[]. Todos os Direitos Reservados.
        </span>

        <div className="flex flex-wrap justify-center gap-4">
          <span className="hover:text-white cursor-pointer">
            Política de privacidade
          </span>
          <span className="hover:text-white cursor-pointer">
            Cookies
          </span>
        </div>

      </div>
      
    </footer>
  )
}