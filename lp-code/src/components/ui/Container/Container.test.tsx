import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Container } from "./Container"

describe("Container component", () => {

  /**
   * Verifica se o container renderiza corretamente
   */
  it("renders container", () => {
    render(
      <Container>
        <div>Content</div>
      </Container>
    )

    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  /**
   * Verifica se aplica classes de layout
   */
  it("applies container classes", () => {
    const { container } = render(
      <Container>
        <div>Test</div>
      </Container>
    )

    expect(container.firstChild).toHaveClass("mx-auto")
  })

})