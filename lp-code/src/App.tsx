import bg from './assets/BG.png';
import HeroRoot from './components/hero-section/HeroRoot';
import { TestimonialCard, type TestimonialCardProps } from './components/Testimonial-card/TestimonialCard';
import { Container } from './components/ui/container/Container';
import { Button } from './components/ui/button/Button';
import { FileExplorer } from './components/ui/file-explorer/FileExplorer';
import { Footer } from './components/ui/footer/Footer';
import { Navbar } from './components/ui/navbar/NavBar';
import { ScrollIndicator } from './components/ui/scroll-indicator/ScrollIndicator';

const testimonials: TestimonialCardProps[] = [
  {
    text: 'Melhor empresa júnior do Brasil!',
    authorName: 'Enzo Ribas',
    authorRole: 'Diretor de Projetos',
    avatarUrl: 'https://github.com/github.png',
    rating: 5,
  },
  {
    text: 'Trabalho excepcional e entrega muito rápida. A Code superou todas as nossas expectativas e elevou o nível do nosso produto.',
    authorName: 'Maria Silva',
    authorRole: 'CEO na Tech Solutions',
    rating: 4,
  },
  {
    text: 'Recomendo de olhos fechados! Layout impecável e código limpo.',
    authorName: 'João Pedro',
  },
];

function App() {
  return (
    <div className="text-white">
      <HeroRoot onAnimationComplete={() => {}} />
      <Navbar />

      <section className="relative h-screen flex items-start pt-12 justify-center text-center overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <img src={bg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),
                  linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]
              bg-[size:40px_40px]
            "
          />
        </div>

        <div className="flex flex-col items-center gap-6 px-6">
          <h1 className="text-6xl md:text-8xl font-semibold tracking-widest">
            <span className="bg-purple-700 bg-clip-text text-transparent">CODE</span>
            <span className="text-green-400">[]</span>
          </h1>
          <p className="text-2xl md:text-4xl font-semibold text-white/80 max-w-2xl">
            Transformamos <span className="text-green-400">ideias</span> em soluções{' '}
            <span className="bg-gradient-to-r from-[#9413F6] to-[#FD0151] bg-clip-text text-transparent">
              digitais reais
            </span>
            .
          </p>
          <Button size="lg">
            <span className="bg-clip-text font-semibold text-lg text-transparent bg-gradient-to-r from-[#9413F6] to-[#FD0151]">
              Solicitar orçamento
            </span>
          </Button>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <ScrollIndicator />
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center gap-24">
        <Container className="flex justify-center">
          <div className="py-6">
            <FileExplorer />
          </div>
        </Container>
      </section>

      <section aria-labelledby="testimonials-title" className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 id="testimonials-title" className="mb-8 text-center text-2xl font-bold">
          O que nossos clientes dizem
        </h2>
        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.authorName} {...testimonial} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
