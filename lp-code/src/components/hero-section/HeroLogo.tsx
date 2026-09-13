import { forwardRef } from "react";
import type { HeroLogoProps } from "../../types/hero.type";

interface ExtendedHeroLogoProps extends HeroLogoProps {
  textRef?: React.Ref<HTMLHeadingElement>;
}

const HeroLogo = forwardRef<HTMLDivElement, ExtendedHeroLogoProps>(
  ({ src, alt, cutoutSrc, textRef }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden select-none mix-blend-multiply will-change-transform"
      >
        {/* overlay números */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Container de Perspectiva 3D */}
        <div className="relative z-20 flex w-full items-center justify-center [perspective:1200px] px-2">
          <h1
            ref={textRef}
            className="
              bg-cover 
              bg-center 
              bg-clip-text 
              text-transparent 
              text-7xl 
              sm:text-8xl 
              md:text-[11rem] 
              lg:text-[14rem] 
              xl:text-[17rem] 
              font-black 
              uppercase 
              tracking-tighter 
              font-mono 
              text-center 
              whitespace-nowrap 
              leading-none 
              will-change-transform
              drop-shadow-2xl
            "
            style={{
              backgroundImage: `url(${cutoutSrc})`,
              transformOrigin: "top center",
            }}
          >
            CODE[]
          </h1>
        </div>
      </div>
    );
  },
);

export default HeroLogo;
