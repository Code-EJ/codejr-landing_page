import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Carousel from './components/Carousel/carousel';
import type { CarouselItem } from './components/Carousel/types';
import styles from './App.module.css';

const items: CarouselItem[] = [
  { id: 'nature', type: 'image', src: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630', alt: 'Árvore em um campo aberto', title: 'Uma nova perspectiva' },
  { id: 'idea', type: 'text', content: <div><p className={styles.kicker}>DESIGN + TECNOLOGIA</p><h2 className={styles.slideTitle}>Sua próxima ideia.<br /><span>Uma nova experiência.</span></h2><p className={styles.slideDescription}>Interfaces que conectam pessoas, com cuidado em cada interação.</p></div> },
  { id: 'butterfly', type: 'image', src: 'https://img.freepik.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg?semt=ais_hybrid&w=740&q=80', alt: 'Borboleta pousada em uma flor', title: 'A diferença está nos detalhes' },
];

export default function App() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    const sync = () => {
      lenis?.destroy();
      lenis = media.matches ? undefined : new Lenis({ autoRaf: true, anchors: true, lerp: 0.08 });
    };
    sync();
    media.addEventListener('change', sync);
    return () => { media.removeEventListener('change', sync); lenis?.destroy(); };
  }, []);
  return <main className={styles.page}>
    <div className={styles.orb} aria-hidden="true" />
    <header className={styles.header}><span className={styles.brand}>CODE<span>[]</span></span><span className={styles.tag}>Design. Código. Impacto.</span></header>
    <section className={styles.showcase} aria-labelledby="gallery-title">
      <div className={styles.intro}><p className={styles.kicker}>PERSPECTIVAS · CODE JR</p><h1 id="gallery-title">Experiências em <span>movimento.</span></h1><p>Um novo olhar para cada ideia. Explore nossa galeria.</p></div>
      <Carousel items={items} maxWidth="1000px" label="Explore a galeria" />
      <p className={styles.hint}>Use as setas para explorar · No celular, deslize para os lados</p>
    </section>
  </main>;
}
