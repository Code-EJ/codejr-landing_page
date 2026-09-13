import { cva, type VariantProps } from "class-variance-authority"

export const cardVariants = cva(
  "relative rounded-md p-6 transition-all duration-500",
  {
    variants: {
      variant: {
        default:
          `
          border border-white/20
          bg-gradient-to-br from-[#FF0000]/50 to-[#9902D4]/40
          backdrop-blur-sm

          before:content-['']
          before:absolute
          before:inset-0
          before:rounded-md
          before:-translate-x-3 
          before:-translate-y-3
          before:bg-gradient-to-br
          before:from-[#FF0000]/40
          before:to-[#9902D4]/30
          before:border-t before:border-l before:border-white/40
          before:opacity-90
          

          before:[mask-image:linear-gradient(to_bottom_right,black,transparent)]
          before:[mask-size:100%_100%]
          before:[mask-repeat:no-repeat]
          

          before:pointer-events-none
          
          `,
        secondary:
          `
          border border-white/20
          bg-gradient-to-br from-[#FF0000]/50 to-[#9902D4]/40
          backdrop-blur-sm
          before:opacity-0
          
          `,
        elevated:
          "border border-transparent bg-background shadow-lg",

        ghost:
          "border border-transparent bg-transparent"
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
)

export type CardVariants = VariantProps<typeof cardVariants>