import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "font-semibold border border-white/10 backdrop-blur-sm bg-[#E004DD]/10",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        ghost: "bg-transparent hover:bg-gray-100"
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-16 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)