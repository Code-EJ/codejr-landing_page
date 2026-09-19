import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "../../../lib/cn";

type ScrollIndicatorProps = {
  className?: string;
  href?: string;
  label?: string;
};

export const ScrollIndicator = forwardRef<
  HTMLAnchorElement,
  ScrollIndicatorProps
>(
  (
    {
      className,
      href = "#about",
      label = "Role para explorar",
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <motion.a
        ref={ref}
        href={href}
        aria-label={`${label}. Ir para a próxima seção.`}
        className={cn(
          "group absolute bottom-8 left-1/2",
          "flex -translate-x-1/2 flex-col items-center gap-2",
          "text-muted-foreground",
          "transition-colors duration-300",
          "hover:text-foreground",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-purple-500",
          "focus-visible:ring-offset-4",
          className,
        )}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <span
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.22em]
            opacity-70
            transition-opacity
            group-hover:opacity-100
          "
        >
          {label}
        </span>

        <div
          className="
            relative
            flex
            h-10
            w-6
            justify-center
            rounded-full
            border
            border-muted-foreground/40
            pt-2
            transition-colors
            group-hover:border-purple-500/70
          "
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-purple-500"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, 14, 0],
                    opacity: [1, 0.35, 1],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, 5, 0],
                }
          }
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: "easeInOut",
          }}
          className="
            opacity-60
            transition-opacity
            group-hover:opacity-100
          "
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.a>
    );
  },
);

ScrollIndicator.displayName = "ScrollIndicator";