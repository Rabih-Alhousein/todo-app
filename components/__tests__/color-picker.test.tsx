import { render, screen } from "@testing-library/react";
import { ColorPicker } from "../color-picker";
import { describe, it, expect, vi } from "vitest";
import type { Mock } from "vitest";
import { useColorTheme } from "@/hooks/use-color-theme";

vi.mock("@/hooks/use-color-theme", () => ({
  useColorTheme: vi.fn(),
}));

describe("ColorPicker", () => {
  it("renders disabled button when not mounted", () => {
    const mocked = useColorTheme as unknown as Mock;
    mocked.mockReturnValue({
      selectedColor: { name: "Blue", hue: "220", color: "#3b82f6" },
      changeColor: vi.fn(),
      mounted: false,
      colorOptions: [],
    });

    render(<ColorPicker />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  })

  it("renders color picker button when mounted", () => {
    const mocked = useColorTheme as unknown as Mock;
    mocked.mockReturnValue({
      selectedColor: { name: "Blue", hue: "220", color: "#3b82f6" },
      changeColor: vi.fn(),
      mounted: true,
      colorOptions: [
        { name: "Blue", hue: "220", color: "#3b82f6" },
        { name: "Red", hue: "0", color: "#ef4444" },
      ],
    });

    render(<ColorPicker />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  })
})
