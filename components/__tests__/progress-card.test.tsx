import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProgressCard } from "@/components/progress-card";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/progress-chart", () => ({
  ProgressChart: ({
    completed,
    total,
  }: {
    completed: number;
    total: number;
  }) => (
    <div data-testid="progress-chart">
      {completed}/{total}
    </div>
  ),
}));

describe("ProgressCard", () => {
  it("renders title, chart, and summary with correct values", () => {
    render(<ProgressCard completed={3} total={5} />);

    expect(screen.getByText(/progress/i)).toBeInTheDocument();
    expect(screen.getByTestId("progress-chart")).toHaveTextContent("3/5");
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText(/tasks completed/i)).toBeInTheDocument();
  });
});
