import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "../../../lib/cn"

type ScrollIndicatorProps = {
  className?: string
}

/**
 * ScrollIndicator Component
 *
 * Indicador visual animado de rolagem.
 *
 * Features:
 * - Animação contínua via Framer Motion
 * - Suporte a forwardRef
 *
 * Otimização: will-change aplicado para melhorar performance
 * de animações transform.
 */
export const ScrollIndicator = forwardRef<HTMLDivElement, ScrollIndicatorProps>(
  ({ className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          className
        )}
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-2">
          <motion.div className="w-1 h-2 rounded-full bg-purple-500" />
        </div>
      </motion.div>
    )
  }
)

ScrollIndicator.displayName = "ScrollIndicator"