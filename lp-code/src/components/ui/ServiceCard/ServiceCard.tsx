import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '../../../lib/cn';
import styles from '../FileExplorer/FileExplorer.module.css';

type Props = { title: string; onClose: () => void; className?: string; description?: string; deliverables?: string[] };
export function ServiceCard({ title, onClose, className, description = 'Vamos entender sua ideia e definir juntos o melhor caminho para o projeto.', deliverables = [], }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const closing = useRef(false);
  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(dialog.current, { y: 18, scale: .97, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: .38, ease: 'power3.out', clearProps: 'transform,opacity' });
    });
    return () => mm.revert();
  }, { scope: dialog });
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  const close = () => contextSafe(() => {
    if (closing.current) return;
    closing.current = true;
    const finish = () => { dialog.current?.close(); onClose(); };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return; }
    gsap.to(dialog.current, { opacity: 0, y: 10, scale: .985, duration: .18, overwrite: true, onComplete: finish });
  })();
  return createPortal(<dialog ref={dialog} className={cn('liquid-glass', styles.dialog, className)} aria-labelledby={titleId} aria-describedby={descriptionId} data-lenis-prevent onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
    <div className={styles.dialogHeader}><span>CODE / ESPECIALIDADES</span><button type="button" className="liquid-glass glass-action" onClick={close} aria-label="Fechar serviço" autoFocus>×</button></div>
    <div className={styles.dialogContent}><p className={styles.dialogEyebrow}>DA IDEIA À ENTREGA</p><h3 id={titleId}>{title}</h3><p id={descriptionId}>{description}</p>{deliverables.length > 0 && <><h4>O que podemos construir</h4><ul>{deliverables.map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul></>}<a className="liquid-glass glass-action glass-action--primary" href="#contact" onClick={() => { dialog.current?.close(); onClose(); }}>Planejar meu projeto <span aria-hidden="true">↗</span></a></div>
  </dialog>, document.body);
}
