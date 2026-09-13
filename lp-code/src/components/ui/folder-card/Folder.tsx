import { cn } from "../../../lib/cn"

type Props = {
  className?: string
  onClick?: () => void
}

/**
 * Folder Component (Glass UI) - Com camada traseira realista
 */
export function Folder({ className, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-[320px] h-[240px] cursor-pointer group transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
    >

      {/* 🔻 CAMADA TRASEIRA (pasta completa deslocada) */}
      <div className="absolute inset-0 translate-x-[10px] -translate-y-[8px] opacity-60 z-0 ">
        
        {/* Aba traseira */}
        <div className="absolute top-[10px] left-0 w-[140px] h-[30px] bg-[#4a1028] rounded-t-xl 
          after:content-[''] 
          after:absolute after:right-[-30px] after:bottom-0 
          after:w-[40px] after:h-[30px] 
          after:bg-[#4a1028] 
          after:[clip-path:polygon(0_0,0%_100%,100%_100%)]
        " />

        {/* Corpo traseiro */}
        <div className="
          absolute bottom-0 left-0 
          w-full h-[215px] 
          rounded-2xl rounded-tl-none
          bg-gradient-to-b from-[#4a1028] via-[#3a0c20] to-[#2a0718]
          border border-white/5
        " />
      </div>


      {/* 🔺 CAMADA PRINCIPAL */}
      
      {/* Aba frontal */}
      <div 
        className="
          absolute top-[10px] left-0 
          w-[140px] h-[30px] 
          bg-[#631434] 
          rounded-t-xl
          z-20
          after:content-[''] 
          after:absolute after:right-[-30px] after:bottom-0 
          after:w-[40px] after:h-[30px] 
          after:bg-[#631434]
          after:[clip-path:polygon(0_0,0%_100%,100%_100%)]
        "
      />

      {/* Corpo frontal */}
      <div 
        className="
          absolute bottom-0 left-0 
          w-full h-[215px] 
          rounded-2xl rounded-tl-none
          bg-gradient-to-b from-[#631434]/40 via-[#520e2a] to-[#3a0a1e]/40
          border border-white/10
          overflow-hidden
          z-10
        "
      /> 

    </div>
  )
}