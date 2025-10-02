import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "../theme-toggle";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { useTheme } from "@/hooks/use-theme";

vi.mock("@/hooks/use-theme", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders disabled button when not mounted", () => {
    const mocked = useTheme as unknown as Mock;
    mocked.mockReturnValue({
      theme: "light",
      toggleTheme: vi.fn(),
      mounted: false,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  })

  it("shows moon icon in light mode", () => {
    const mocked = useTheme as unknown as Mock;
    mocked.mockReturnValue({
      theme: "light",
      toggleTheme: vi.fn(),
      mounted: true,
    });

    render(<ThemeToggle />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  })

  it("calls toggleTheme when clicked", () => {
    const mockToggleTheme = vi.fn();
    const mocked = useTheme as unknown as Mock;
    mocked.mockReturnValue({
      theme: "light",
      toggleTheme: mockToggleTheme,
      mounted: true,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalled();
  })
})
