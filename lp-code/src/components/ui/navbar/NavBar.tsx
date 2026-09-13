import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "../../../lib/cn"

type Props = {
  className?: string
}

const LINKS = [
  { href: "#home", label: "Início" },
  { href: "#about", label:"Sobre Nós" },
  { href: "#services", label: "Nossos Serviços" },
  { href: "#contact", label: "Contato" },
] as const

/**
 * Navbar Component
 *
 * Estrutura de navegação principal.
 * Layout interno com flex responsivo.
 * Animações: entrada (fade + translateY + stagger), hover,
 * microinteractions e suporte a prefers-reduced-motion via gsap.matchMedia.
 */
export function Navbar({ className }: Props) {
  const navRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<Array<HTMLAnchorElement | null>>([])

  useEffect(() => {
    // array que armazena funções de limpeza pra remover event listeners e animações e evitar memory leaks
    const cleanupFns: Array<() => void> = []

    const ctx = gsap.context(() => {
      // percorre o array de links e filtra apenas os elementos HTMLAnchorElement válidos, desconsiderando nulls
      const links = linksRef.current.filter(
        (el): el is HTMLAnchorElement => el !== null
      )

      const mm = gsap.matchMedia()

      // Respeita prefers-reduced-motion: apenas transições essenciais
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          allowed: "(prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { reduced, isMobile } = context.conditions as {
            reduced: boolean
            allowed: boolean
            isMobile: boolean
          }

          if (reduced) {
            // Só um fade simples, sem translate/scale/stagger complexo
            gsap.to(containerRef.current, {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
            })
            gsap.to(links, { opacity: 1, duration: 0.3 })
            return
          }

          // --- Entrada: timeline com stagger entre os links ---
          const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

          tl.fromTo(
            containerRef.current,
            { opacity: 0, y: isMobile ? 14 : -20 },
            { opacity: 1, y: 0, duration: isMobile ? 0.5 : 0.7 }
          ).fromTo(
            links,
            { opacity: 0, y: isMobile ? 8 : 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: isMobile ? 0.05 : 0.08,
            },
            "-=0.35"
          )

          return () => tl.kill()
        }
      )

      // --- Hover microinteractions (independem de breakpoint) ---
      links.forEach((link) => {
        const underline = link.querySelector<HTMLSpanElement>(
          "[data-underline]"
        )

        const handleEnter = () => {
          // hover-> scale: porcentagem de aumento do tamanho das letras, y: desloc vertical para cima
          gsap.to(link, {
            scale: 1.08,
            y: -2,
            duration: 0.3,
            ease: "power2.out",
          })
          if (underline) {
            // hover-> scaleX: aumenta largura do underline
            gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" })
          }
        }

        const handleLeave = () => {
          // scale e y voltando ao normal quando o mouse sai do link
          gsap.to(link, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })
          if (underline) {
            // largura do underline voltando a 0 quando o mouse sai do link
            gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.out" })
          }
        }

        link.addEventListener("mouseenter", handleEnter)
        link.addEventListener("mouseleave", handleLeave)
        cleanupFns.push(() => {
          link.removeEventListener("mouseenter", handleEnter)
          link.removeEventListener("mouseleave", handleLeave)
        })
      })
    }, navRef)

    return () => {
      cleanupFns.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 z-50 w-full px-2 text-white",
        className
      )}
    >
      <div
        ref={containerRef}
        className="mx-auto px-4 py-4 flex flex-wrap gap-4 md:gap-6 justify-center items-center max-w-[900px] rounded-b-[40px]
        bg-gradient-to-r from-[#FB00FF]/30 via-purple/10 to-[#5E00D2]/30
        backdrop-blur-sm backdrop-saturate-150
        border-b border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.2)]
        before:absolute before:inset-0 before:rounded-b-[40px] before:bg-white/10 before:opacity-30 before:pointer-events-none
        relative overflow-hidden text-sm sm:text-base
        opacity-0"
      >
        {LINKS.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            ref={(el) => {
              linksRef.current[index] = el
            }}
            className="whitespace-nowrap relative inline-block will-change-transform"
          >
            {link.label}
            <span
              data-underline
              aria-hidden="true"
              className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#FB00FF] to-[#5E00D2] origin-left scale-x-0 pointer-events-none"
            />
          </a>
        ))}
      </div>
    </nav>
  )
}