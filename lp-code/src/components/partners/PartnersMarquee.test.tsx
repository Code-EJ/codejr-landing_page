import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import gsap from 'gsap';
import { PartnersMarquee, type Partner } from './PartnersMarquee';

const partners: Partner[] = [
  { name: 'Alpha', alt: 'Logo Alpha', logo: '/alpha.svg', url: 'https://example.com/alpha' },
  { name: 'Beta', alt: 'Logo Beta', logo: '/beta.svg' },
];
beforeEach(() => {
  const media = window.matchMedia('');
  vi.stubGlobal('matchMedia', vi.fn(query => ({ ...media, media: query, matches: query.includes('no-preference') })));
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('PartnersMarquee', () => {
  it('anima duas faixas em sentidos opostos e pausa ambas', () => {
    const { container, unmount } = render(<PartnersMarquee partners={partners} />);
    const left = container.querySelector('[data-logo-direction="left"]')!;
    const right = container.querySelector('[data-logo-direction="right"]')!;
    const leftTween = gsap.getTweensOf(left)[0];
    const rightTween = gsap.getTweensOf(right)[0];
    expect(leftTween.vars.xPercent).toBe(-50);
    expect(rightTween.vars.xPercent).toBe(0);
    expect(rightTween.vars.startAt?.xPercent).toBe(-50);
    fireEvent.click(screen.getByRole('button', { name: 'Pausar movimento' }));
    expect(leftTween.paused()).toBe(true);
    expect(rightTween.paused()).toBe(true);
    unmount();
    expect(gsap.getTweensOf([left, right])).toHaveLength(0);
  });
  it('expõe apenas as marcas únicas e links seguros para teclado', () => {
    const { container } = render(<PartnersMarquee partners={partners} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
    expect(container.querySelector('[aria-hidden="true"] a')).toHaveAttribute('tabindex', '-1');
  });
  it('pausa e retoma o loop pelo controle manual', () => {
    const { container } = render(<PartnersMarquee partners={partners} />);
    const track = container.querySelector('div[aria-hidden="true"]')!.parentElement!;
    const tween = gsap.getTweensOf(track)[0];
    expect(tween).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: 'Pausar movimento' }));
    expect(tween.paused()).toBe(true);
    expect(screen.getByRole('button', { name: 'Retomar movimento' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Retomar movimento' }));
    expect(tween.paused()).toBe(false);
  });
  it('pausa durante foco e limpa a animação ao desmontar', () => {
    const { container, unmount } = render(<PartnersMarquee partners={partners} />);
    const track = container.querySelector('div[aria-hidden="true"]')!.parentElement!;
    const tween = gsap.getTweensOf(track)[0];
    fireEvent.focus(screen.getByRole('link'));
    expect(tween.paused()).toBe(true);
    fireEvent.blur(screen.getByRole('link'), { relatedTarget: document.body });
    expect(tween.paused()).toBe(false);
    unmount();
    expect(gsap.getTweensOf(track)).toHaveLength(0);
  });
  it('oferece fallback textual se uma imagem falhar', () => {
    render(<PartnersMarquee partners={partners} />);
    fireEvent.error(screen.getByRole('img', { name: 'Logo Alpha' }));
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
  it('pausa no hover de mouse, mas não depende do hover no touch', () => {
    const { container } = render(<PartnersMarquee partners={partners} />);
    const track = container.querySelector('div[aria-hidden="true"]')!.parentElement!;
    const tween = gsap.getTweensOf(track)[0];
    const viewport = track.parentElement!;
    fireEvent(viewport, Object.assign(new Event('pointerover', { bubbles: true }), { pointerType: 'touch' }));
    expect(tween.paused()).toBe(false);
    fireEvent(viewport, Object.assign(new Event('pointerover', { bubbles: true }), { pointerType: 'mouse' }));
    expect(tween.paused()).toBe(true);
    fireEvent.pointerLeave(viewport);
    expect(tween.paused()).toBe(false);
  });
  it('preserva progresso no resize e desconecta o observador', () => {
    let resize = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: () => void) { resize = callback; }
      observe = vi.fn();
      disconnect = disconnect;
    });
    const { container, unmount } = render(<PartnersMarquee partners={partners} />);
    const track = container.querySelector('div[aria-hidden="true"]')!.parentElement!;
    const previous = gsap.getTweensOf(track)[0];
    previous.progress(.4);
    resize();
    const current = gsap.getTweensOf(track)[0];
    expect(current).not.toBe(previous);
    expect(current.progress()).toBeCloseTo(.4);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(gsap.getTweensOf(track)).toHaveLength(0);
  });
  it('não cria loop com movimento reduzido', () => {
    const media = window.matchMedia('');
    vi.stubGlobal('matchMedia', vi.fn(query => ({ ...media, media: query, matches: !query.includes('no-preference') })));
    const { container } = render(<PartnersMarquee partners={partners} />);
    const track = container.querySelector('div[aria-hidden="true"]')!.parentElement!;
    expect(gsap.getTweensOf(track)).toHaveLength(0);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
  it('aceita lista vazia e uma única instituição sem autoplay', () => {
    const { container, rerender } = render(<PartnersMarquee partners={[]} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<PartnersMarquee partners={partners.slice(0, 1)} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
});
