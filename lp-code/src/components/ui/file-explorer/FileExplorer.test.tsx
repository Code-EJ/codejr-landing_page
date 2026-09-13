import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { FileExplorer } from "./FileExplorer"

describe("FileExplorer component", () => {

  /**
   * Verifica se o componente renderiza
   */
  it("renders file explorer", () => {
    const { container } = render(
      <FileExplorer />
    )

    expect(container.firstChild)
      .toBeInTheDocument()
  })

  /**
   * Verifica se os folders são renderizados
   */
  it("renders folder items", () => {
    const { container } = render(
      <FileExplorer />
    )

    const folders = container.querySelectorAll(
      ".group"
    )

    expect(folders.length).toBeGreaterThan(0)
  })

  /**
   * Snapshot test
   */
  it("matches snapshot", () => {
    const { container } = render(
      <FileExplorer />
    )

    expect(container).toMatchSnapshot()
  })

})