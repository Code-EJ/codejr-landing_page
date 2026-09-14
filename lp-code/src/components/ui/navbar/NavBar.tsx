import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '../../../lib/cn';
import styles from './NavBar.module.css';
const LINKS = [{ href: '#home', label: 'Início' }, { href: '#about', label: 'Sobre nós' }, { href: '#services', label: 'Serviços' }, { href: '#projects', label: 'Destaques' }, { href: '#contact', label: 'Contato' }];
export function Navbar({ className }: { className?: string }) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => { gsap.from(root.current, { y: -12, opacity: 0, duration: .6, clearProps: 'transform,opacity' }); });
    return () => mm.revert();
  }, { scope: root });
  useGSAP(() => {
    if (open && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.from('[data-menu-link]', { y: -6, opacity: 0, stagger: .035, duration: .25, clearProps: 'transform,opacity' });
  }, { scope: root, dependencies: [open], revertOnUpdate: true });
  const hover = contextSafe((node: HTMLElement, active: boolean) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(node, { y: active ? -2 : 0, duration: .22, overwrite: 'auto' });
  });
  return <nav ref={root} className={cn(styles.nav, className)} aria-label="Navegação principal" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}>
    <div className={`liquid-glass ${styles.bar}`}>
      <a href="#home" className={styles.brand} aria-label="CODE — início">CODE<span>[]</span></a>
      <div className={styles.desktop}>{LINKS.map(link => <a key={link.href} href={link.href} onMouseEnter={event => hover(event.currentTarget, true)} onMouseLeave={event => hover(event.currentTarget, false)}>{link.label}</a>)}</div>
      <a className={`liquid-glass glass-action ${styles.cta}`} href="#contact">Vamos conversar <span aria-hidden="true">↗</span></a>
      <button ref={toggle} className={`liquid-glass glass-action ${styles.toggle}`} type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>{open ? '×' : '☰'}</button>
    </div>
    <div id="mobile-navigation" className={`liquid-glass ${styles.mobile}`} hidden={!open}>{LINKS.map(link => <a data-menu-link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></a>)}</div>
  </nav>;
}
