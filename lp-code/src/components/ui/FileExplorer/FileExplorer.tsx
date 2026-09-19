/** CODE services workspace — interface evolution directed by oEnzoRibas. */
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Folder } from '../FolderCard/Folder';
import { ServiceCard } from '../ServiceCard/ServiceCard';
import styles from './FileExplorer.module.css';
gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  { id: 'design', title: 'UI Design', category: 'Design', summary: 'Clareza em cada interação.', description: 'Transformamos necessidades em interfaces claras, acessíveis e consistentes com a identidade do seu negócio.', deliverables: ['Pesquisa e arquitetura da informação', 'Protótipos navegáveis', 'Interface responsiva e design system'] },
  { id: 'frontend', title: 'Frontend', category: 'Desenvolvimento', summary: 'Interfaces que ganham vida.', description: 'Construímos experiências web responsivas, conectando design, acessibilidade e desempenho.', deliverables: ['Sites e aplicações web', 'Componentes reutilizáveis', 'Integração com APIs e testes'] },
  { id: 'backend', title: 'Backend', category: 'Desenvolvimento', summary: 'Uma base para crescer.', description: 'Organizamos dados e regras de negócio para dar suporte a produtos digitais confiáveis.', deliverables: ['APIs e integrações', 'Modelagem de dados', 'Autenticação e regras de negócio'] },
  { id: 'devops', title: 'DevOps', category: 'Infraestrutura', summary: 'Da entrega à operação.', description: 'Preparamos uma rotina de publicação e acompanhamento adequada ao contexto do projeto.', deliverables: ['Automação de entregas', 'Configuração de ambientes', 'Monitoramento e documentação'] },
  { id: 'mobile', title: 'Mobile', category: 'Desenvolvimento', summary: 'Seu produto, em movimento.', description: 'Desenhamos e desenvolvemos experiências pensadas para o uso no celular, do primeiro toque aos fluxos essenciais.', deliverables: ['Experiência mobile', 'Integração com serviços', 'Validação em diferentes telas'] },
  { id: 'data', title: 'Data', category: 'Infraestrutura', summary: 'Dados que fazem sentido.', description: 'Transformamos informações dispersas em visualizações úteis para apoiar decisões.', deliverables: ['Organização e tratamento de dados', 'Dashboards e relatórios', 'Automação de processos'] },
];
const categories = ['Todos', 'Design', 'Desenvolvimento', 'Infraestrutura'];

export function FileExplorer() {
  const [category, setCategory] = useState('Todos');
  const [activeId, setActiveId] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const filtered = services.filter(service => category === 'Todos' || service.category === category);
  const active = services.find(service => service.id === activeId);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('[data-folder-entry]', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .055, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: root.current, start: 'top 90%', once: true } });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [category], revertOnUpdate: true });
  return <div ref={root} className={`liquid-glass ${styles.explorer}`}>
    <div className={styles.toolbar}><span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span><span>CODE / serviços</span><span className={styles.toolbarMeta}>Explore as possibilidades</span></div>
    <div className={styles.workspace}>
      <aside className={styles.sidebar} aria-label="Filtrar serviços"><p>ESPECIALIDADES</p>{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span aria-hidden="true">{item === 'Todos' ? '06' : String(services.filter(s => s.category === item).length).padStart(2, '0')}</span></button>)}<div className={styles.sidebarNote}>Do primeiro esboço<br />à próxima entrega.<span>Vamos construir juntos.</span></div></aside>
      <div className={styles.browser}>
        <div className={styles.breadcrumb}><span>Serviços <span aria-hidden="true">/</span> <strong>{category}</strong></span><span role="status">{filtered.length} serviços</span></div>
        <div className={styles.grid}>{filtered.map(service => <div key={service.id} data-folder-entry><Folder title={service.title} description={service.summary} index={services.indexOf(service) + 1} onClick={() => { lastTrigger.current = document.activeElement as HTMLElement; setActiveId(service.id); }} /></div>)}</div>
      </div>
    </div>
    <div className={styles.statusBar}><span><i /> Design e tecnologia, conectados.</span><span>Selecione uma pasta para explorar ↗</span></div>
    {active && <ServiceCard title={active.title} description={active.description} deliverables={active.deliverables} onClose={() => { setActiveId(null); lastTrigger.current?.focus(); }} />}
  </div>;
}
