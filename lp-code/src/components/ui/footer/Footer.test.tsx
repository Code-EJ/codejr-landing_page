import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Footer } from "./Footer"

describe("Footer component", () => {

  /**
   * Verifica se o footer renderiza
   */
  it("renders footer", () => {
    render(<Footer />)

    const footer = screen.getByRole("contentinfo")

    expect(footer).toBeInTheDocument()
  })

})