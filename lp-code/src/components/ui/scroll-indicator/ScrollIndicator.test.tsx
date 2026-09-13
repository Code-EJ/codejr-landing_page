import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ScrollIndicator } from "./ScrollIndicator"

describe("ScrollIndicator component", () => {

  /**
   * Verifica se o indicador de scroll renderiza
   */
  it("renders scroll indicator", () => {
    const { container } = render(<ScrollIndicator />)

    expect(container.firstChild).toBeInTheDocument()
  })

})