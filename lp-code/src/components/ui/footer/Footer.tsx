import { cn } from '../../../lib/cn';
import styles from './Footer.module.css';
export function Footer({ className }: { className?: string }) {
  return <footer className={cn('liquid-glass', styles.footer, className)}>
    <div className={styles.inner}><div><a href="#home" className={styles.brand}>CODE<span>[]</span></a><p>Ideias humanas. Possibilidades digitais.</p></div><nav aria-label="Navegação do rodapé"><a href="#about">Sobre a CODE</a><a href="#services">Serviços</a><a href="#contact">Planejar um projeto ↗</a></nav></div>
    <div className={styles.bottom}><span>© {new Date().getFullYear()} CODE[]. Todos os direitos reservados.</span><span className={styles.credit}>Developed by Code <span aria-hidden="true">·</span> <a href="https://github.com/oEnzoRibas" target="_blank" rel="noopener noreferrer">oEnzoRibas</a></span><a href="#home">Voltar ao início ↑</a></div>
  </footer>;
}
