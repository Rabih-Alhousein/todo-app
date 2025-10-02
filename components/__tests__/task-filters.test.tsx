import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TaskFilters } from "../task-filters"
import { describe, it, expect, vi } from "vitest"

describe("TaskFilters", () => {
  const mockCounts = {
    all: 10,
    active: 6,
    completed: 4,
  }

  it("renders all filter tabs", () => {
    const mockFilterChange = vi.fn()

    render(<TaskFilters currentFilter="all" onFilterChange={mockFilterChange} counts={mockCounts} />)

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Active")).toBeInTheDocument()
    expect(screen.getByText("Completed")).toBeInTheDocument()
  })

  it("displays correct counts for each filter", () => {
    const mockFilterChange = vi.fn()

    render(<TaskFilters currentFilter="all" onFilterChange={mockFilterChange} counts={mockCounts} />)

    expect(screen.getByText("10")).toBeInTheDocument()
    expect(screen.getByText("6")).toBeInTheDocument()
    expect(screen.getByText("4")).toBeInTheDocument()
  })

  it("calls onFilterChange when filter is clicked", async () => {
    const mockFilterChange = vi.fn()

    render(<TaskFilters currentFilter="all" onFilterChange={mockFilterChange} counts={mockCounts} />)

    const activeTab = screen.getByRole("tab", { name: /active/i })
    await userEvent.click(activeTab)

    expect(mockFilterChange).toHaveBeenCalledWith("active")
  })

  it("highlights current filter", () => {
    const mockFilterChange = vi.fn()

    render(<TaskFilters currentFilter="active" onFilterChange={mockFilterChange} counts={mockCounts} />)

    const activeTab = screen.getByText("Active").closest("button")
    expect(activeTab).toHaveAttribute("data-state", "active")
  })
})
