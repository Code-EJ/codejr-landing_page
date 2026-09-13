import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import { Folder } from "./Folder"

describe("Folder component", () => {

  /**
   * Verifica se o componente renderiza
   */
  it("renders folder component", () => {
    const { container } = render(<Folder />)

    expect(container.firstChild).toBeInTheDocument()
  })

  /**
   * Verifica se className customizada é aplicada
   */
  it("applies custom className", () => {
    render(
      <Folder className="custom-class" />
    )

    const folder = document.querySelector(".custom-class")

    expect(folder).toBeInTheDocument()
  })

  /**
   * Verifica se onClick é disparado
   */
  it("fires onClick event", async () => {
    const user = userEvent.setup()

    const handleClick = vi.fn()

    const { container } = render(
      <Folder onClick={handleClick} />
    )

    const folder = container.firstChild as HTMLElement

    await user.click(folder)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  /**
   * Snapshot test
   */
  it("matches snapshot", () => {
    const { container } = render(
      <Folder />
    )

    expect(container).toMatchSnapshot()
  })

})