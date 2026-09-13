import { forwardRef } from "react";
import type { HeroImageProps } from "../../types/hero.type";

const HeroImage = forwardRef<HTMLImageElement, HeroImageProps>(
  ({ src, alt, pulseEffect = false }, ref) => {
    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={` w-full h-full object-cover will-change-transform ${pulseEffect ? "scale-105 transition-transform duration-10000" : "" } `}
        />

        {/* overlay escuro pra contraste */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
    );
  }
);

export default HeroImage;