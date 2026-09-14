import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import HeroRoot from './components/hero-section/HeroRoot';
import { CodeIntro } from './components/hero-section/CodeIntro';
import LaptopSection from './components/laptop-section/LaptopSection';
import { TestimonialCard } from './components/Testimonial-card/TestimonialCard';
import { FileExplorer } from './components/ui/file-explorer/FileExplorer';
import { Footer } from './components/ui/footer/Footer';
import { Navbar } from './components/ui/navbar/NavBar';
import { Button } from './components/ui/button/Button';
import { Card } from './components/ui/card/Card';
import Carousel from './components/Carousel/carousel';
import type { CarouselItem } from './components/Carousel/types';
import styles from './App.module.css';
gsap.registerPlugin(useGSAP, ScrollTrigger);

function ProjectPreview({ name, kind, index }: { name: string; kind: string; index: number }) {
  return <div className={styles.projectPreview}><div className={styles.projectCopy}><p className={styles.eyebrow}>CONCEITO / 0{index}</p><h3>{name}</h3><p>{kind}</p><span>Estudo visual demonstrativo</span></div><div className={styles.projectScreen} aria-hidden="true"><div className={styles.screenTop}><span>CODE / STUDIO</span><span>•••</span></div><div className={styles.screenContent}><span className={styles.screenTag}>CREATE SOMETHING NEW</span><strong>{index === 1 ? 'Menos ruído. Mais foco.' : index === 2 ? 'Cada dado, uma direção.' : 'Sua próxima ideia começa aqui.'}</strong><div className={styles.chart}>{[40, 65, 48, 82, 62, 92].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className={styles.screenLines}><i /><i /><i /></div></div></div></div>;
}
const projects: CarouselItem[] = [
  { id: 'web', type: 'text', content: <ProjectPreview name="Presença digital." kind="Web design · Desenvolvimento responsivo" index={1} /> },
  { id: 'data', type: 'text', content: <ProjectPreview name="Informação que guia." kind="Dashboards · Visualização de dados" index={2} /> },
  { id: 'product', type: 'text', content: <ProjectPreview name="Do fluxo ao produto." kind="UX/UI · Experiências digitais" index={3} /> },
];
const quotes = [
  { text: 'Melhor empresa júnior do Brasil!', authorName: 'Enzo Ribas', authorRole: 'Diretor de Projetos', rating: 5 },
  { text: 'Trabalho excepcional e entrega muito rápida. A Code superou todas as nossas expectativas e elevou o nível do nosso produto.', authorName: 'Maria Silva', authorRole: 'CEO na Tech Solutions', rating: 4 },
  { text: 'Recomendo de olhos fechados! Layout impecável e código limpo.', authorName: 'João Pedro', authorRole: 'Recomendação', rating: 5 },
];

function ContactBrief() {
  const [brief, setBrief] = useState('');
  const [status, setStatus] = useState('');
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBrief(`Briefing de projeto\nNome: ${data.get('name')}\nInteresse: ${data.get('service')}\n\n${data.get('idea')}`);
    setStatus('Briefing preparado. Nenhum dado foi enviado.');
  }
  return <form className={`liquid-glass ${styles.contactForm}`} onSubmit={prepare}>
    <label htmlFor="brief-name">Como podemos chamar você?</label><input id="brief-name" name="name" autoComplete="name" required maxLength={100} placeholder="Seu nome" />
    <label htmlFor="brief-service">O que você quer construir?</label><select id="brief-service" name="service"><option>Site ou landing page</option><option>Aplicação web</option><option>Experiência mobile</option><option>Design de interface</option><option>Dados e integrações</option><option>Quero descobrir com vocês</option></select>
    <label htmlFor="brief-idea">Conte um pouco da sua ideia</label><textarea id="brief-idea" name="idea" required minLength={10} maxLength={3000} rows={3} placeholder="Qual problema você gostaria de resolver?" />
    <Button type="submit">Preparar meu briefing <span aria-hidden="true">↗</span></Button>
    <p className={styles.formNote}>Nesta prévia, o briefing é gerado apenas no seu navegador. O envio será conectado ao canal oficial da CODE.</p>
    {brief && <div className={styles.briefResult}><label htmlFor="prepared-brief">Seu briefing</label><textarea id="prepared-brief" value={brief} readOnly rows={5} /><Button variant="secondary" type="button" onClick={async () => { try { await navigator.clipboard.writeText(brief); setStatus('Briefing copiado.'); } catch { setStatus('Selecione o briefing acima para copiar manualmente.'); } }}>Copiar briefing</Button></div>}
    <p className={styles.formStatus} role="status">{status}</p>
  </form>;
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    const sync = () => {
      lenis?.destroy();
      lenis = media.matches ? undefined : new Lenis({ autoRaf: true, anchors: true, lerp: .08 });
      lenis?.on('scroll', ScrollTrigger.update);
    };
    sync(); media.addEventListener('change', sync);
    return () => { media.removeEventListener('change', sync); lenis?.destroy(); };
  }, []);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-hero-copy] > *', { y: 18, opacity: 0, duration: .75, stagger: .09, ease: 'power3.out', clearProps: 'transform,opacity' });
      root.current?.querySelectorAll('[data-reveal]').forEach(node => gsap.from(node, { y: 22, opacity: 0, duration: .7, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: node, start: 'top 92%', once: true } }));
    });
    return () => mm.revert();
  }, { scope: root });
  return <div ref={root} className={styles.page}>
    <CodeIntro />
    <a href="#main-content" className={styles.skipLink}>Pular para o conteúdo</a><Navbar />
    <main id="main-content">
      <section id="home" className={styles.hero}>
        <div className={styles.heroCopy} data-hero-copy><p className={styles.eyebrow}><span className={styles.statusDot} /> DESIGN + TECNOLOGIA + PESSOAS</p><h1>Sua ideia.<br />Nosso código.<br /><span>Novas possibilidades.</span></h1><p className={styles.heroDescription}>Criamos experiências digitais que aproximam pessoas e transformam a maneira como o seu negócio acontece.</p><div className={styles.actions}><a className="liquid-glass glass-action glass-action--primary" href="#contact">Vamos construir juntos <span aria-hidden="true">↗</span></a><a className={styles.textLink} href="#services">Explore nossos serviços <span aria-hidden="true">↓</span></a></div><p className={styles.heroFootnote}>Empresa júnior. Energia para criar. Cuidado para entregar.</p></div>
        <div className={styles.heroArt} aria-hidden="true"><div className={styles.orbit} /><div className={`liquid-glass ${styles.heroWindow}`}><div className={styles.windowHeader}><span>CODE / CREATIVE TECHNOLOGY</span><span>•••</span></div><HeroRoot /><div className={styles.windowFooter}><span>Da imaginação à interface.</span><span>↗</span></div></div><div className={`liquid-glass ${styles.floatingTag}`}><span className={styles.statusDot} /> Feito de ideias humanas.</div></div>
      </section>
      <div className={styles.disciplines} aria-label="Nossas áreas"><span>ESTRATÉGIA</span><i /> <span>DESIGN</span><i /><span>DESENVOLVIMENTO</span><i /><span>EXPERIÊNCIA</span></div>
      <section id="about" className={styles.section}>
        <div className={styles.sectionHead} data-reveal><p className={styles.eyebrow}>01 / QUEM SOMOS</p><h2>Tecnologia é o meio.<br /><span>As pessoas são o começo.</span></h2><p>Somos a CODE, uma empresa júnior que conecta aprendizado, colaboração e execução para tirar projetos do papel. Construímos junto com você, não à distância.</p></div>
        <div className={styles.principles}>{[{ title: 'Escutar antes de criar.', description: 'Entendemos o contexto, as pessoas e o que realmente precisa ser resolvido.' }, { title: 'Construir com intenção.', description: 'Unimos design e código em soluções úteis, acessíveis e bem cuidadas.' }, { title: 'Evoluir em parceria.', description: 'Compartilhamos o processo, validamos as decisões e documentamos cada entrega.' }].map((item, index) => <div data-reveal key={item.title}><Card title={item.title} description={item.description} icon={<span className={styles.cardNumber}>0{index + 1} ↗</span>} className={styles.principle} /></div>)}</div>
      </section>
      <LaptopSection><section aria-label="Serviços" className={styles.section}>
        <div className={styles.splitHead}><div><p className={styles.eyebrow}>02 / O QUE CONSTRUÍMOS</p><h2>Abra uma pasta.<br /><span>Descubra um caminho.</span></h2></div><p>Explore nossas especialidades e encontre o ponto de partida para a sua próxima ideia.</p></div><FileExplorer />
      </section></LaptopSection>
      <section id="projects" className={styles.section}>
        <div className={styles.splitHead} data-reveal><div><p className={styles.eyebrow}>03 / POSSIBILIDADES EM TELA</p><h2>Uma ideia pode<br /><span>ganhar muitas formas.</span></h2></div><p>Uma seleção de conceitos visuais para mostrar como design e tecnologia se encontram. Projetos reais serão adicionados ao portfólio.</p></div><Carousel items={projects} label="Estudos de interface" />
      </section>
      <section id="testimonials" className={styles.section}>
        <div className={styles.sectionHead} data-reveal><p className={styles.eyebrow}>04 / CONEXÕES QUE IMPORTAM</p><h2>O resultado também<br /><span>está na experiência.</span></h2><p>Espaço reservado para as histórias de quem constrói com a CODE.</p></div>
        <p className={styles.demoNotice}>Prévia de layout · Os depoimentos abaixo são demonstrativos e serão substituídos por relatos autorizados.</p><div className={styles.testimonials}>{quotes.map(quote => <TestimonialCard key={quote.authorName} {...quote} />)}</div>
      </section>
      <section id="contact" className={`${styles.section} ${styles.contact}`}>
        <div data-reveal><p className={styles.eyebrow}>05 / VAMOS COMEÇAR?</p><h2>Boas ideias merecem<br /><span>um próximo passo.</span></h2><p className={styles.contactText}>Pode ser um novo site, um produto ou uma pergunta. Conte o que você tem em mente e organize seu primeiro briefing.</p><div className={styles.contactSteps}><span>01 <strong>Você conta sua ideia.</strong></span><span>02 <strong>Definimos um caminho.</strong></span><span>03 <strong>Construímos em parceria.</strong></span></div></div><ContactBrief />
      </section>
    </main><Footer />
  </div>;
}
