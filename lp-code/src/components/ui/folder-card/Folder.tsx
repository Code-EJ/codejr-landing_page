import { useRef } from 'react';
import { cn } from '../../../lib/cn';
import { useGlassMotion } from '../../../hooks/useGlassMotion';
import styles from '../file-explorer/FileExplorer.module.css';

type Props = { className?: string; onClick?: () => void; title?: string; description?: string; index?: number };
export function Folder({ className, onClick, title = 'Explorar serviço', description = 'Conheça as possibilidades', index = 1 }: Props) {
  const art = useRef<HTMLSpanElement>(null);
  const motion = useGlassMotion(art, 10);
  return <button type="button" className={cn(styles.folder, 'group', className)} onClick={onClick} {...motion} aria-haspopup="dialog" aria-label={`Explorar ${title}`}>
    <span ref={art} className={styles.folderArt} aria-hidden="true">
      <span className={styles.back} />
      <span className={styles.paper} data-depth><span /><span /><span /></span>
      <span className={`liquid-glass ${styles.front}`}><span className={styles.folderCode}>{String(index).padStart(2, '0')} / CODE</span><span className={styles.folderSymbol}>[ ]</span></span>
    </span>
    <span className={styles.folderLabel}><strong>{title}</strong><span aria-hidden="true">↗</span></span>
    <span className={styles.folderDescription}>{description}</span>
  </button>;
}
