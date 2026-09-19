/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LaptopSection from "./Laptop";

describe("LaptopSection", () => {
  it("renderiza a interface existente uma única vez", () => {
    render(<LaptopSection><h2>Serviços atuais</h2></LaptopSection>);
    
    expect(screen.getAllByRole('heading', { name: 'Serviços atuais' })).toHaveLength(1);
  });

  it("mantém a interface acessível sem animação", () => {
    render(<LaptopSection><button>Explorar serviços</button></LaptopSection>);
    
    expect(screen.getByRole('button', { name: 'Explorar serviços' })).toBeVisible();
  });
});
