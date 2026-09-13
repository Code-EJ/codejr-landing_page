import { cva } from "class-variance-authority"

export const fileItemVariants = cva(
  "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100",
  {
    variants: {
      type: {
        file: "text-gray-700",
        folder: "text-blue-600 font-medium"
      }
    },
    defaultVariants: {
      type: "file"
    }
  }
)