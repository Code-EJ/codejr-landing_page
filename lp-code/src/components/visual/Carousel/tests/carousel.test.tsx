import { StrictMode } from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import Carousel from '../carousel';
import type { CarouselItem } from '../types';
import gsap from 'gsap';
import styles from '../Carousel.module.css';

const items: CarouselItem[] = [
  { id: 'one', type: 'image', src: '/one.png', alt: 'Primeira imagem' },
  { id: 'two', type: 'text', content: 'Segundo conteúdo' },
  { id: 'three', type: 'video', src: '/three.mp4', alt: 'Vídeo de exemplo', videoProps: { controls: true } },
];

afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('Carousel multimídia', () => {
  it('coordena saída direcional no GSAP e limpa trocas rápidas ao desmontar', () => {
    const { container, unmount } = render(<Carousel items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Próximo item' }));
    const layer = container.querySelector(`.${styles.exitLayer}`)!;
    expect(gsap.getTweensOf(layer.firstElementChild!)[0].vars.xPercent).toBe(-18);
    fireEvent.click(screen.getByRole('button', { name: 'Item anterior' }));
    const outgoing = layer.firstElementChild!;
    expect(gsap.getTweensOf(outgoing)[0].vars.xPercent).toBe(18);
    expect(layer.children).toHaveLength(1);
    expect(screen.getAllByRole('group')).toHaveLength(1);
    unmount();
    expect(gsap.getTweensOf(outgoing)).toHaveLength(0);
  });
  it('renderiza imediatamente sem esperar pelo download de todas as mídias', () => {
    render(<Carousel items={items} />);
    expect(screen.getByAltText('Primeira imagem')).toBeInTheDocument();
  });
  it('navega em loop e informa o índice uma única vez em StrictMode', () => {
    const callback = vi.fn();
    render(<StrictMode><Carousel items={items} onIndexChange={callback} /></StrictMode>);
    fireEvent.click(screen.getByRole('button', { name: 'Próximo item' }));
    expect(screen.getByText('Segundo conteúdo')).toBeInTheDocument();
    expect(callback).toHaveBeenCalledExactlyOnceWith(1);
    fireEvent.click(screen.getByRole('button', { name: 'Item anterior' }));
    fireEvent.click(screen.getByRole('button', { name: 'Item anterior' }));
    expect(screen.getByLabelText('Vídeo de exemplo')).toHaveAttribute('controls');
  });
  it('usa os indicadores e mantém somente o slide ativo no DOM', () => {
    render(<Carousel items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ir para o slide 3' }));
    expect(screen.getByRole('button', { name: 'Ir para o slide 3' })).toHaveAttribute('aria-current', 'true');
    expect(screen.queryByAltText('Primeira imagem')).not.toBeInTheDocument();
  });
  it('reconcilia a lista menor e a lista vazia', () => {
    const { rerender } = render(<Carousel items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ir para o slide 3' }));
    rerender(<Carousel items={[items[0]]} />);
    expect(screen.getByAltText('Primeira imagem')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Próximo item' })).not.toBeInTheDocument();
    rerender(<Carousel items={[]} />);
    expect(screen.getByRole('status')).toHaveTextContent('Nenhum conteúdo disponível.');
  });
  it('preserva o item ativo quando a lista é reordenada', () => {
    const { rerender } = render(<Carousel items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Próximo item' }));
    rerender(<Carousel items={[items[1], items[0]]} />);
    expect(screen.getByText('Segundo conteúdo')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '1 de 2' })).toBeInTheDocument();
  });
  it('aceita zero como conteúdo', () => {
    render(<Carousel items={[{ id: 0, type: 'text', content: 0 }]} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
  it('mostra erro recuperável sem bloquear a navegação', () => {
    render(<Carousel items={items} />);
    fireEvent.error(screen.getByAltText('Primeira imagem'));
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível carregar');
    fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(screen.getByAltText('Primeira imagem')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Próximo item' }));
    expect(screen.getByText('Segundo conteúdo')).toBeInTheDocument();
  });
  it('não captura as setas de campos de formulário', () => {
    render(<Carousel items={[{ id: 0, type: 'text', content: <input aria-label="Mensagem" /> }, items[0]]} />);
    fireEvent.keyDown(screen.getByLabelText('Mensagem'), { key: 'ArrowRight' });
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('region'), { key: 'End' });
    expect(screen.getByAltText('Primeira imagem')).toBeInTheDocument();
  });
  it('pausa o autoplay no hover e no foco', () => {
    vi.useFakeTimers();
    render(<Carousel items={items} autoPlay interval={1000} />);
    fireEvent.mouseEnter(screen.getByRole('region'));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByAltText('Primeira imagem')).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByRole('region'));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText('Segundo conteúdo')).toBeInTheDocument();
    fireEvent.focus(screen.getByRole('button', { name: 'Próximo item' }));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByText('Segundo conteúdo')).toBeInTheDocument();
  });
  it('permite pausar explicitamente o autoplay', () => {
    vi.useFakeTimers();
    render(<Carousel items={items} autoPlay interval={1000} />);
    fireEvent.click(screen.getByRole('button', { name: 'Pausar reprodução automática' }));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByAltText('Primeira imagem')).toBeInTheDocument();
  });
  it('não troca de slide enquanto o vídeo está tocando', () => {
    vi.useFakeTimers();
    render(<Carousel items={[items[2], items[0]]} autoPlay interval={1000} />);
    fireEvent.play(screen.getByLabelText('Vídeo de exemplo'));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByLabelText('Vídeo de exemplo')).toBeInTheDocument();
    fireEvent.pause(screen.getByLabelText('Vídeo de exemplo'));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByAltText('Primeira imagem')).toBeInTheDocument();
  });
  it('respeita a preferência por movimento reduzido', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    vi.useFakeTimers();
    render(<Carousel items={items} autoPlay interval={1000} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByAltText('Primeira imagem')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /reprodução automática/ })).not.toBeInTheDocument();
  });
});
