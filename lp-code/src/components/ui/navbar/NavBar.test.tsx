import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest"
import { Navbar } from "./NavBar"

describe("NavBar component", () => {
  beforeEach(() => {
    const media = window.matchMedia('');
    vi.stubGlobal('matchMedia', vi.fn(query => ({ ...media, media: query, matches: query === '(prefers-reduced-motion: reduce)' })));
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  function openMenu() {
    const button = screen.getByRole('button', { name: 'Abrir menu' });
    fireEvent.click(button);
    return document.getElementById(button.getAttribute('aria-controls')!)!;
  }

  it('preserva o foco do botão com movimento reduzido', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: 'Abrir menu' });
    button.focus({ preventScroll: true });
    expect(button).toHaveFocus();
  });

  it('abre por teclado, navega com setas e devolve foco com Escape', async () => {
    render(<Navbar />);
    const menu = openMenu();
    await waitFor(() => expect(within(menu).getByRole('link', { name: 'Início' })).toHaveFocus());
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(within(menu).getByRole('link', { name: 'Sobre nós' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: 'End' });
    expect(within(menu).getByRole('link', { name: 'Contato' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveFocus();
    expect(menu).not.toBeVisible();
    expect(menu).toHaveAttribute('inert');
  });

  it('fecha ao clicar fora, sem prender a navegação', () => {
    render(<><Navbar /><button>Fora</button></>);
    const menu = openMenu();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Fora' }));
    expect(menu).not.toBeVisible();
  });

  it('fecha após escolher uma seção e mantém o link nativo', async () => {
    render(<Navbar />);
    const menu = openMenu();
    const link = within(menu).getByRole('link', { name: 'Serviços' });
    expect(link).toHaveAttribute('href', '#services');
    fireEvent.click(link);
    expect(menu).not.toBeVisible();
    await waitFor(() => expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveFocus());
  });

  it('aceita reaberturas sem deixar links inacessíveis', () => {
    render(<Navbar />);
    const menu = openMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Fechar menu' }));
    openMenu();
    expect(menu).toBeVisible();
    expect(menu).not.toHaveAttribute('inert');
    expect(within(menu).getAllByRole('link')).toHaveLength(5);
  });

  /**
   * Testa se a navbar renderiza
   */
  it("renders navbar", () => {
    render(<Navbar />)

    const nav = screen.getByRole("navigation")

    expect(nav).toBeInTheDocument()
  })

})
