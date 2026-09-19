import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { ServicesExplorer } from './ServicesExplorer';
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('ServicesExplorer', () => {
  it('identifica os seis serviços por botões acessíveis', () => {
    render(<ServicesExplorer />);
    expect(screen.getAllByRole('button', { name: /^Explorar / })).toHaveLength(6);
    expect(screen.getByRole('status')).toHaveTextContent('6 serviços');
  });
  it('filtra especialidades sem perder o acesso à lista completa', () => {
    render(<ServicesExplorer />);
    fireEvent.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.getAllByRole('button', { name: /^Explorar / })).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Design' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Todos' }));
    expect(screen.getAllByRole('button', { name: /^Explorar / })).toHaveLength(6);
  });
});
