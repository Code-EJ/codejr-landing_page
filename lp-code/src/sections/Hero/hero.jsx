// quando a issue #99 tiver pronta, descomentar a linha abaixo
// import Container from 'lp-code/components/Container'; 

export default function Hero() {
  return (
    <section id="hero" className="w-full py-20 md:py-32 border-b border-gray-200">
        
        {/* substituir esta div pelo <container> quando for mergeado */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            <div className="flex flex-col md:flex-row gap-10">
                {/* lado do texto */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl font-bold text-gray-800">[Título da Hero]</h1>
                </div>

                {/* lado da imagem */}
                <div className="w-full md:w-1/2 h-80 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">[Imagem Aqui]</span>
                </div>
            </div>

        </div>

    </section>
  );
}