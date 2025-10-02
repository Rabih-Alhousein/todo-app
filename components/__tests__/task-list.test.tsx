"use client"

import { render, screen } from "@testing-library/react"
import { TaskList } from "../task-list"
import { describe, it, expect, vi } from "vitest"
import type { Task } from "@/types"

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
    createdAt: "2025-01-01",
    order: 0,
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
    createdAt: "2025-01-02",
    order: 1,
  },
]

describe("TaskList", () => {
  it("renders all tasks", () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const mockUpdate = vi.fn()
    const mockReorder = vi.fn()

    render(
      <TaskList
        tasks={mockTasks}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onUpdate={mockUpdate}
        onReorder={mockReorder}
      />,
    )

    expect(screen.getByText("Task 1")).toBeInTheDocument()
    expect(screen.getByText("Task 2")).toBeInTheDocument()
  })

  it("renders empty when no tasks", () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const mockUpdate = vi.fn()
    const mockReorder = vi.fn()

    const { container } = render(
      <TaskList tasks={[]} onToggle={mockToggle} onDelete={mockDelete} onUpdate={mockUpdate} onReorder={mockReorder} />,
    )

    expect(container.querySelector(".space-y-3")?.children.length).toBe(0)
  })
})
