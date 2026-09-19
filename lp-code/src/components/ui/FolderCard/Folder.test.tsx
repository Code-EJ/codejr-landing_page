import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Folder } from './Folder';
describe('Folder', () => {
  it('preserva o nome, a descrição e a semântica de diálogo', () => {
    render(<Folder title="Frontend" description="Interfaces vivas" />);
    expect(screen.getByRole('button', { name: 'Explorar Frontend' })).toHaveAttribute('aria-haspopup', 'dialog');
    expect(screen.getByText('Interfaces vivas')).toBeInTheDocument();
  });
  it('abre ao clicar e aceita personalização', () => {
    const onClick = vi.fn();
    render(<Folder onClick={onClick} className="custom-class" />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
