import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestimonialCard } from './TestimonialCard';

describe('TestimonialCard', () => {
  afterEach(() => vi.restoreAllMocks());
  const baseProps = { text: 'Melhor empresa júnior do Brasil!', authorName: 'Enzo Ribas' };

  it('renderiza todas as informações e os atributos acessíveis', () => {
    render(<TestimonialCard {...baseProps} authorRole="Diretor de Projetos" avatarUrl="https://github.com/github.png" rating={4} />);
    expect(screen.getByText(baseProps.text)).toHaveAttribute('title', baseProps.text);
    expect(screen.getByText('Diretor de Projetos')).toBeInTheDocument();
    expect(screen.getByAltText('Foto de perfil de Enzo Ribas')).toHaveAttribute('src', 'https://github.com/github.png');
    expect(screen.getByRole('img', { name: 'Avaliação de 4 de 5 estrelas' })).toBeInTheDocument();
  });

  it('omite props opcionais e exibe as iniciais acessíveis', () => {
    render(<TestimonialCard {...baseProps} />);
    expect(screen.queryByText('Diretor de Projetos')).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /Avaliação de/i })).not.toBeInTheDocument();
    expect(screen.getByLabelText('Iniciais de Enzo Ribas')).toHaveTextContent('ER');
  });

  it.each([{ rating: 3.6, expected: 4 }, { rating: -2, expected: 0 }, { rating: 8, expected: 5 }])(
    'normaliza a nota $rating para $expected',
    ({ rating, expected }) => {
      render(<TestimonialCard {...baseProps} rating={rating} />);
      expect(screen.getByRole('img', { name: `Avaliação de ${expected} de 5 estrelas` })).toBeInTheDocument();
    },
  );

  it.each([
    { authorName: 'Alice', expected: 'A' },
    { authorName: '  Maria   Silva  ', expected: 'MS' },
    { authorName: 'João Pedro da Silva', expected: 'JP' },
  ])('gera as iniciais de "$authorName"', ({ authorName, expected }) => {
    render(<TestimonialCard text={baseProps.text} authorName={authorName} />);
    expect(screen.getByRole('img', { name: `Iniciais de ${authorName.trim().replace(/\s+/g, ' ')}` })).toHaveTextContent(expected);
  });

  it('oculta cada estrela decorativa dos leitores de tela', () => {
    const { container } = render(<TestimonialCard {...baseProps} rating={5} />);
    expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(5);
  });

  it('exibe o fallback acessível quando o avatar falha', () => {
    render(<TestimonialCard {...baseProps} avatarUrl="https://url-quebrada.com/imagem.png" />);
    fireEvent.error(screen.getByAltText('Foto de perfil de Enzo Ribas'));
    expect(screen.getByLabelText('Iniciais de Enzo Ribas')).toHaveTextContent('ER');
    expect(screen.queryByAltText('Foto de perfil de Enzo Ribas')).not.toBeInTheDocument();
  });

  it('tenta carregar um novo avatar depois de uma falha', () => {
    const { rerender } = render(<TestimonialCard {...baseProps} avatarUrl="/broken.png" />);
    fireEvent.error(screen.getByAltText('Foto de perfil de Enzo Ribas'));
    rerender(<TestimonialCard {...baseProps} avatarUrl="/new.png" />);
    expect(screen.getByAltText('Foto de perfil de Enzo Ribas')).toHaveAttribute('src', '/new.png');
  });

  it.each([NaN, Infinity, -Infinity])('omite notas não finitas: %s', (rating) => {
    render(<TestimonialCard {...baseProps} rating={rating} />);
    expect(screen.queryByRole('img', { name: /Avaliação de/i })).not.toBeInTheDocument();
  });

  it('identifica o autor ausente no fallback', () => {
    render(<TestimonialCard text={baseProps.text} authorName="  " />);
    expect(screen.getByRole('img', { name: 'Autor não informado' })).toHaveTextContent('?');
  });

  it('permite expandir e recolher um depoimento truncado', () => {
    vi.spyOn(globalThis, 'getComputedStyle').mockReturnValue({ lineHeight: '24px' } as CSSStyleDeclaration);
    vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(240);
    render(<TestimonialCard {...baseProps} />);
    const button = screen.getByRole('button', { name: 'Ler depoimento completo' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', screen.getByText(baseProps.text).id);
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: 'Ler menos' })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('não oferece expansão quando o texto cabe em quatro linhas', () => {
    vi.spyOn(globalThis, 'getComputedStyle').mockReturnValue({ lineHeight: '24px' } as CSSStyleDeclaration);
    vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(48);
    render(<TestimonialCard {...baseProps} />);
    expect(screen.queryByRole('button', { name: /Ler/ })).not.toBeInTheDocument();
  });
});
