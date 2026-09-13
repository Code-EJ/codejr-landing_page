import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Navbar } from "./NavBar"

describe("NavBar component", () => {

  /**
   * Testa se a navbar renderiza
   */
  it("renders navbar", () => {
    render(<Navbar />)

    const nav = screen.getByRole("navigation")

    expect(nav).toBeInTheDocument()
  })

})