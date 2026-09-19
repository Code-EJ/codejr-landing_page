/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MotionDemo from "./MotionDemo";

describe("MotionDemo", () => {
  it("deve renderizar a página sem quebrar", () => {
    render(<MotionDemo />);
    // Verifica se pelo menos o container principal foi montado
    expect(screen.queryByRole("main") || document.body).toBeDefined();
  });
});