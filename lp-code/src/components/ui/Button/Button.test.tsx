import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { Button } from "./Button"

describe("Button component",
() => {

    /**
     * Testa se o botão renderiza o texto corretamente
     * 
     *  */ 
    it("renders button text", () => {
        render(<Button>Click</Button>)

        const btn = screen.getByRole("button")

        expect(btn).toBeInTheDocument()
        expect(btn).toHaveTextContent("Click")
    })

    /**
     * Testa se a variante primária é aplicada por padrão
     */
    it("applies primary variant by default", () => {
    render(<Button>Click</Button>)

    const btn = screen.getByRole("button")

    expect(btn.className).toContain("glass-action--primary")
    })

    /**
     * Testa se a variante secundária é aplicada quando especificada
     */
    it("applies secondary variant", () => {
    render(<Button variant="secondary">Click</Button>)

    const btn = screen.getByRole("button")

    expect(btn.className).toContain("liquid-glass")
    expect(btn.className).not.toContain("glass-action--primary")
    })

    /**
     * Testa se o evento onClick é disparado corretamente
     */
    it("fires onClick", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click</Button>)

    const btn = screen.getByRole("button")

    await user.click(btn)

    expect(handleClick).toHaveBeenCalledTimes(1)
    })

})
