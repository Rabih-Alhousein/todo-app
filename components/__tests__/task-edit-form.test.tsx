import { render, screen, fireEvent } from "@testing-library/react"
import { TaskEditForm } from "../task-edit-form"
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

describe("TaskEditForm", () => {
  it("renders with task data", () => {
    const mockSave = vi.fn()
    const mockCancel = vi.fn()

    render(<TaskEditForm task={mockTask} onSave={mockSave} onCancel={mockCancel} />)

    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument()
    expect(screen.getByDisplayValue("2025-12-31")).toBeInTheDocument()
  })

  it("calls onSave with updated data when form is submitted", () => {
    const mockSave = vi.fn()
    const mockCancel = vi.fn()

    render(<TaskEditForm task={mockTask} onSave={mockSave} onCancel={mockCancel} />)

    const titleInput = screen.getByDisplayValue("Test Task")
    fireEvent.change(titleInput, { target: { value: "Updated Task" } })

    const saveButton = screen.getByText("Save")
    fireEvent.click(saveButton)

    expect(mockSave).toHaveBeenCalledWith({
      title: "Updated Task",
      description: "Test Description",
      dueDate: "2025-12-31",
    })
  })

  it("calls onCancel when cancel button is clicked", () => {
    const mockSave = vi.fn()
    const mockCancel = vi.fn()

    render(<TaskEditForm task={mockTask} onSave={mockSave} onCancel={mockCancel} />)

    const cancelButton = screen.getByText("Cancel")
    fireEvent.click(cancelButton)

    expect(mockCancel).toHaveBeenCalled()
  })

  it("does not submit with empty title", () => {
    const mockSave = vi.fn()
    const mockCancel = vi.fn()

    render(<TaskEditForm task={mockTask} onSave={mockSave} onCancel={mockCancel} />)

    const titleInput = screen.getByDisplayValue("Test Task")
    fireEvent.change(titleInput, { target: { value: "" } })

    const saveButton = screen.getByText("Save")
    fireEvent.click(saveButton)

    expect(mockSave).not.toHaveBeenCalled()
  })
})
