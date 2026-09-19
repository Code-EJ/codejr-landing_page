import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Card } from "./Card"

describe("Card component", () => {

  /**
   * Verifica se o Card renderiza corretamente
   */
  it("renders card component", () => {
    render(<Card>Content</Card>)

    const card = screen.getByText("Content")

    expect(card).toBeInTheDocument()
  })

  /**
   * Verifica se children são renderizados
   */
  it("renders children correctly", () => {
    render(
      <Card>
        <p>Card text</p>
      </Card>
    )

    expect(screen.getByText("Card text")).toBeInTheDocument()
  })

})