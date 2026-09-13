import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { SectionTitle } from "./SectionTitle"

describe("SectionTitle component", () => {

  /**
   * Testa se o título principal é renderizado
   */
  it("renders title", () => {
    render(<SectionTitle title="My Title" />)

    expect(screen.getByText("My Title")).toBeInTheDocument()
  })

  /**
   * Testa se o subtítulo é renderizado quando fornecido
   */
  it("renders subtitle when provided", () => {
    render(
      <SectionTitle
        title="Title"
        subtitle="Subtitle text"
      />
    )

    expect(screen.getByText("Subtitle text")).toBeInTheDocument()
  })

})