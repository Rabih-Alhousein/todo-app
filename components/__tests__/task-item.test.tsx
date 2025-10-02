"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { TaskItem } from "../task-item"
import { describe, it, expect, vi } from "vitest"
import type { Task } from "@/types"

const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  completed: false,
  dueDate: "2025-12-31",
  createdAt: "2025-01-01",
  order: 0,
}

describe("TaskItem", () => {
  it("renders task title", () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const mockUpdate = vi.fn()

    render(<TaskItem task={mockTask} onToggle={mockToggle} onDelete={mockDelete} onUpdate={mockUpdate} />)

    expect(screen.getByText("Test Task")).toBeInTheDocument()
  })

  it("calls onToggle when checkbox is clicked", () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const mockUpdate = vi.fn()

    render(<TaskItem task={mockTask} onToggle={mockToggle} onDelete={mockDelete} onUpdate={mockUpdate} />)

    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)

    expect(mockToggle).toHaveBeenCalledWith("1")
  })

  it("displays due date when present", () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const mockUpdate = vi.fn()

    render(<TaskItem task={mockTask} onToggle={mockToggle} onDelete={mockDelete} onUpdate={mockUpdate} />)

    expect(screen.getByText(/Dec 31/)).toBeInTheDocument()
  })

  it("shows description when expand button is clicked", () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const mockUpdate = vi.fn()

    render(<TaskItem task={mockTask} onToggle={mockToggle} onDelete={mockDelete} onUpdate={mockUpdate} />)

    const expandButton = screen.getByText("Show details")
    fireEvent.click(expandButton)

    expect(screen.getByText("Test Description")).toBeInTheDocument()
  })

  it("enters edit mode when edit button is clicked", () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const mockUpdate = vi.fn()

    render(<TaskItem task={mockTask} onToggle={mockToggle} onDelete={mockDelete} onUpdate={mockUpdate} />)

    const editButton = screen.getByLabelText('Edit "Test Task"')
    fireEvent.click(editButton)

    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument()
  })

  it("applies completed styles when task is completed", () => {
    const completedTask = { ...mockTask, completed: true }
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const mockUpdate = vi.fn()

    render(<TaskItem task={completedTask} onToggle={mockToggle} onDelete={mockDelete} onUpdate={mockUpdate} />)

    const label = screen.getByText("Test Task")
    expect(label).toHaveClass("line-through")
  })
})
