import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type FocusEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '../../../lib/cn';
import styles from './NavBar.module.css';

const LINKS = [{ href: '#home', label: 'Início' }, { href: '#about', label: 'Sobre nós' }, { href: '#services', label: 'Serviços' }, { href: '#projects', label: 'Destaques' }, { href: '#contact', label: 'Contato' }];
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Navbar({ className }: { className?: string }) {
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const focusFirst = useRef(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const menuId = useId();

  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(root.current, { y: -12, opacity: 0, duration: .6, ease: 'power3.out', clearProps: 'transform,opacity' });
    });
    return () => mm.revert();
  }, { scope: root });

  useGSAP(() => {
    const menu = panel.current;
    if (!menu) return;
    const mm = gsap.matchMedia();
    mm.add({ reduced: '(prefers-reduced-motion: reduce)', motion: '(prefers-reduced-motion: no-preference)' }, context => {
      const reduced = context.conditions?.reduced;
      if (open) {
        gsap.fromTo(menu, { opacity: 0, y: -8 }, {
          opacity: 1, y: 0, duration: reduced ? 0 : .26, ease: 'power3.out', overwrite: true,
        });
        gsap.fromTo(menu.querySelectorAll('[data-menu-link]'), { opacity: 0, x: -5 }, {
          opacity: 1, x: 0, duration: reduced ? 0 : .22, stagger: reduced ? 0 : .025,
          ease: 'power2.out', overwrite: true,
          onComplete: () => {
            if (focusFirst.current) menu.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
            focusFirst.current = false;
          },
        });
      } else {
        gsap.to(menu, { opacity: 0, y: -6, duration: reduced ? 0 : .16, ease: 'power2.in', overwrite: true,
          onComplete: () => setVisible(false),
        });
      }
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [open], revertOnUpdate: true });

  useEffect(() => {
    if (!open) return;
    const outside = (event: globalThis.PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 861px)');
    const resize = () => {
      if (!desktop.matches) return;
      if (panel.current?.contains(document.activeElement)) root.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
      setOpen(false); setVisible(false);
    };
    desktop.addEventListener('change', resize);
    return () => desktop.removeEventListener('change', resize);
  }, []);

  function reveal(keyboard = false) {
    focusFirst.current = keyboard;
    setVisible(true); setOpen(true);
  }
  function close(returnFocus = false) {
    focusFirst.current = false;
    if (returnFocus) toggle.current?.focus({ preventScroll: true });
    setOpen(false);
  }
  const feedback = (node: HTMLElement, state: 'rest' | 'hover' | 'press') => contextSafe(() => {
    if (reducedMotion()) return;
    // Leave the menu's opacity/x entrance tween running while interacting.
    gsap.killTweensOf(node, 'y,scale');
    gsap.to(node, { y: state === 'hover' ? -2 : 0, scale: state === 'press' ? .97 : 1,
      duration: state === 'press' ? .1 : .24, ease: 'power2.out', overwrite: 'auto',
      ...(state === 'rest' ? { clearProps: 'transform' } : {}),
    });
  })();
  const interaction = {
    onPointerEnter: (event: PointerEvent<HTMLElement>) => { if (event.pointerType === 'mouse') feedback(event.currentTarget, 'hover'); },
    onPointerLeave: (event: PointerEvent<HTMLElement>) => feedback(event.currentTarget, 'rest'),
    onPointerDown: (event: PointerEvent<HTMLElement>) => { if (event.button === 0) feedback(event.currentTarget, 'press'); },
    onPointerUp: (event: PointerEvent<HTMLElement>) => feedback(event.currentTarget, event.pointerType === 'mouse' ? 'hover' : 'rest'),
    onPointerCancel: (event: PointerEvent<HTMLElement>) => feedback(event.currentTarget, 'rest'),
    onFocus: (event: FocusEvent<HTMLElement>) => feedback(event.currentTarget, 'hover'),
    onBlur: (event: FocusEvent<HTMLElement>) => feedback(event.currentTarget, 'rest'),
  };
  function keyboard(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && open) { event.preventDefault(); close(true); return; }
    if (event.target === toggle.current && event.key === 'ArrowDown') { event.preventDefault(); reveal(true); return; }
    if (!open || !panel.current?.contains(event.target as Node)) return;
    const links = Array.from(panel.current.querySelectorAll<HTMLAnchorElement>('a'));
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next = event.key === 'ArrowDown' ? (index + 1) % links.length
      : event.key === 'ArrowUp' ? (index - 1 + links.length) % links.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : -1;
    if (next >= 0) { event.preventDefault(); links[next]?.focus(); }
  }

  return <nav ref={root} className={cn(styles.nav, className)} aria-label="Navegação principal" onKeyDown={keyboard}
    onBlur={event => { if (open && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) close(); }}>
    <div className={`liquid-glass ${styles.bar}`}>
      <a href="#home" className={styles.brand} aria-label="CODE — início" {...interaction} onClick={() => close()}>CODE<span>[]</span></a>
      <div className={styles.desktop}>{LINKS.map(link => <a key={link.href} href={link.href} {...interaction}>{link.label}</a>)}</div>
      <a className={`liquid-glass glass-action ${styles.cta}`} href="#contact" {...interaction}>Vamos conversar <span aria-hidden="true">↗</span></a>
      <button ref={toggle} className={`liquid-glass glass-action ${styles.toggle}`} type="button" {...interaction}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls={menuId}
        onClick={event => { if (open) close(); else reveal(event.detail === 0); }}>{open ? '×' : '☰'}</button>
    </div>
    <div ref={panel} id={menuId} className={`liquid-glass ${styles.mobile}`} hidden={!visible} inert={!open} aria-hidden={!open}>
      {LINKS.map(link => <a data-menu-link key={link.href} href={link.href} {...interaction} onClick={() => close(true)}>{link.label}<span aria-hidden="true">↗</span></a>)}
    </div>
  </nav>;
}
