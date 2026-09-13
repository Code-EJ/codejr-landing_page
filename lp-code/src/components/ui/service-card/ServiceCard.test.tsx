import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import { ServiceCard } from "./ServiceCard"

describe("ServiceCard component", () => {

  /**
   * Verifica se o modal renderiza corretamente
   */
  it("renders service card", () => {
    render(
      <ServiceCard
        title="Frontend Development"
        onClose={vi.fn()}
      />
    )

    expect(
      screen.getByText("Frontend Development")
    ).toBeInTheDocument()
  })

  /**
   * Verifica se o botão de fechar renderiza
   */
  it("renders close button", () => {
    render(
      <ServiceCard
        title="Frontend Development"
        onClose={vi.fn()}
      />
    )

    const button = screen.getByRole("button")

    expect(button).toBeInTheDocument()
  })

  /**
   * Verifica se onClose é disparado
   * ao clicar no botão
   */
  it("fires onClose when close button is clicked", async () => {
    const user = userEvent.setup()

    const handleClose = vi.fn()

    render(
      <ServiceCard
        title="Frontend Development"
        onClose={handleClose}
      />
    )

    const button = screen.getByRole("button")

    await user.click(button)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  /**
   * Verifica se onClose é disparado
   * ao clicar no overlay
   */
  it("fires onClose when overlay is clicked", async () => {
    const user = userEvent.setup()

    const handleClose = vi.fn()

    render(
      <ServiceCard
        title="Frontend Development"
        onClose={handleClose}
      />
    )

    const overlays = document.querySelectorAll(".absolute.inset-0")

    await user.click(overlays[0] as HTMLElement)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  /**
   * Verifica se className customizada é aplicada
   */
  it("applies custom className", () => {
    render(
      <ServiceCard
        title="Frontend Development"
        onClose={vi.fn()}
        className="custom-class"
      />
    )

    const card = screen
      .getByText("Frontend Development")
      .closest("div")

    expect(card?.parentElement?.className)
      .toContain("custom-class")
  })

  /**
   * Snapshot test
   */
  it("matches snapshot", () => {
    const { container } = render(
      <ServiceCard
        title="Frontend Development"
        onClose={vi.fn()}
      />
    )

    expect(container).toMatchSnapshot()
  })

})