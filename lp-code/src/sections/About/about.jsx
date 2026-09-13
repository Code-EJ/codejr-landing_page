/**
 * @description
 * Componente responsável por renderizar a seção "Sobre Nós" (About Us) da landing page.
 * Apresenta a missão/textos institucionais e um container visual para a mascote do projeto.
 * @returns {JSX.Element} Estrutura da seção About.
 */
export default function About() {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-[#3C1D47] border-b border-[#5F2E78]">
        
        {/* substituir esta div pelo <container> quando for mergeado */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            {/* inverte os lados no desktop */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
                
                {/* lado do texto */}
                <article className="w-full md:w-1/2 flex flex-col gap-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <h2 className="text-3xl font-bold text-[#9BF2EA]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        [titulo about]
                    </h2>
                    <p className="text-[#DDA9F7] leading-relaxed">
                        [primeiro paragrafo]
                    </p>
                    <p className="text-[#DDA9F7] leading-relaxed">
                        [segundo paragrafo]
                    </p>
                </article>

                {/* lado da imagem, fica em cima no mobile  */}
                <div className="relative w-full md:w-1/2 h-72 bg-[#5F2E78] rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-[#9BF2EA] shadow-[0_0_20px_rgba(155,242,234,0.1)] overflow-hidden">
                    
                    {/* Efeito de brilho de fundo opcional para combinar com a pegada neon do Figma */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#5F2E78] to-[#2A8C82] opacity-30"></div>
                    
                    <span className="text-[#9BF2EA] font-medium z-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        [imagem referente ou mascote]
                    </span>
                    
                </div>

            </div>

        </div>
    </section>
  );
}