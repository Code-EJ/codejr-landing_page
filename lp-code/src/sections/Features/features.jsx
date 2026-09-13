// quando a issue #99 tiver pronta, descomentar a linha abaixo
// import Container from 'lp-code/components/container'; 

export default function Features() {
  return (
    
    <section id="features" className="w-full py-16 md:py-24 bg-gray-50 border-b border-gray-200">
        
        {/* substituir esta div pelo <container> quando for mergeado */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            {/* cabeçalho da seção */}
            <header className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">[titulo ]</h2>
                <p className="text-gray-600">
                    [subtitulo]
                </p>
            </header>

            {/* 3 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* card placeholder 1 */}
                <article className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                        <span className="text-xs text-gray-500">conteudo</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">[titulo1]</h3>
                    <p className="text-gray-600 text-sm">[descricao do titulo]</p>
                </article>

                {/* card placeholder 2*/}
                <article className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                        <span className="text-xs text-gray-500">conteudo2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">[titulo2]</h3>
                    <p className="text-gray-600 text-sm">[descricao do titulo2]</p>
                </article>

                {/* card placeholder 3  */}
                <article className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                        <span className="text-xs text-gray-500">conteudo3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">[titulo3]</h3>
                    <p className="text-gray-600 text-sm">[descricao 3]</p>
                </article>

            </div>

        </div>
    </section>
  );
}