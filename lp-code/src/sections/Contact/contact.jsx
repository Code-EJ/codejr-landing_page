// quando a issue #99 tiver pronta, descomentar a linha abaixo
// import Container from 'lp-code/components/container'; 
export default function Contact() {
  return (
    <section id="contact" className="w-full py-16 md:py-24 border-b border-gray-200">
        
        {/* substituir esta div pelo <container> quando for mergeado */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            {/* divide a tela */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                
                {/* Lado Esquerdo: Informações e Texto */}
                <article className="flex flex-col gap-6">
                    <h2 className="text-3xl font-bold text-gray-800">[titulo]</h2>
                    <p className="text-gray-600 leading-relaxed">
                        [texto descritivo]
                    </p>
                    
                    {/* estrutura de placeholder */}
                    <div className="flex flex-col gap-6 mt-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-gray-500">algum icone</div>
                            <span className="text-gray-600 font-medium">[email]</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-gray-500">algum icone</div>
                            <span className="text-gray-600 font-medium">[telefone]</span>
                        </div>
                    </div>
                </article>

                {/* formulario de contato */}
                <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    {/* semântica do formulário */}
                    <form className="flex flex-col gap-5">
                        
                        {/* campo: nome */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">[Nome]</label>
                            {/* rascunho de input  */}
                            <div className="h-12 bg-white border border-gray-300 rounded-md w-full"></div>
                        </div>

                        {/* campo: email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">[email]</label>
                            <div className="h-12 bg-white border border-gray-300 rounded-md w-full"></div>
                        </div>

                        {/* campo: mensagem */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">[texto]</label>
                            <div className="h-32 bg-white border border-gray-300 rounded-md w-full"></div>
                        </div>
                        
                        {/* botao de enviar */}
                        <div className="h-14 bg-gray-300 rounded-md w-full mt-4 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-400 transition-colors cursor-pointer">
                            [Enviar]
                        </div>

                    </form>
                </div>

            </div>

        </div>
    </section>
  );
}