import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ServiceCard } from './ServiceCard';
beforeEach(() => {
  vi.spyOn(window, 'matchMedia').mockImplementation(query => ({ matches: query === '(prefers-reduced-motion: reduce)', media: query, addEventListener: vi.fn(), removeEventListener: vi.fn() }) as unknown as MediaQueryList);
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value() { this.setAttribute('open', ''); } });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value() { this.removeAttribute('open'); } });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('ServiceCard', () => {
  it('exibe detalhes em diálogo nomeado e mantém o material compartilhado', () => {
    render(<ServiceCard title="Frontend" description="Interfaces acessíveis" deliverables={['APIs', 'Testes']} onClose={vi.fn()} className="custom-class" />);
    expect(screen.getByRole('dialog', { name: 'Frontend' })).toHaveClass('liquid-glass', 'custom-class');
    expect(screen.getByText('Interfaces acessíveis')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
  it('fecha pelo botão e restaura o overflow ao desmontar', () => {
    const close = vi.fn();
    const { unmount } = render(<ServiceCard title="Frontend" onClose={close} />);
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(screen.getByRole('button', { name: 'Fechar serviço' }));
    expect(close).toHaveBeenCalledOnce();
    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
  });
  it('responde ao cancelamento nativo por Escape', () => {
    const close = vi.fn();
    render(<ServiceCard title="Frontend" onClose={close} />);
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: true, cancelable: true }));
    expect(close).toHaveBeenCalledOnce();
  });
});
