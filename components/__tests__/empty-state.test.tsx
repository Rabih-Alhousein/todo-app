import { render, screen } from "@testing-library/react"
import { EmptyState } from "../empty-state"
import { describe, it, expect } from "vitest"

describe("EmptyState", () => {
  it("displays correct message for 'all' filter", () => {
    render(<EmptyState filter="all" />)

    expect(screen.getByText("No tasks yet")).toBeInTheDocument()
    expect(screen.getByText("Add your first task to get started!")).toBeInTheDocument()
  })

  it("displays correct message for 'active' filter", () => {
    render(<EmptyState filter="active" />)

    expect(screen.getByText("All caught up!")).toBeInTheDocument()
    expect(screen.getByText("No active tasks at the moment.")).toBeInTheDocument()
  })

  it("displays correct message for 'completed' filter", () => {
    render(<EmptyState filter="completed" />)

    expect(screen.getByText("No completed tasks")).toBeInTheDocument()
    expect(screen.getByText("Complete some tasks to see them here.")).toBeInTheDocument()
  })
})
