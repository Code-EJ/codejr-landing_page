import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { FileItem } from "./FileItem"

describe("FileItem component", () => {

  /**
   * Testa se o item de arquivo renderiza o nome
   */
  it("renders file name", () => {
    render(<FileItem name="index.tsx" />)

    expect(screen.getByText("index.tsx")).toBeInTheDocument()
  })

})