import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { TaskForm } from "../task-form";
import { describe, it, expect, vi } from "vitest";

describe("TaskForm", () => {
  it("renders the task input field", () => {
    const mockAddTask = vi.fn();
    renderWithProviders(<TaskForm onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText("Add a new task...");
    expect(input).toBeInTheDocument();
  })

  it("calls onAddTask with title when form is submitted", () => {
    const mockAddTask = vi.fn();
    renderWithProviders(<TaskForm onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(submitButton);

    expect(mockAddTask).toHaveBeenCalledWith("New Task", undefined, undefined);
  })

  it("clears input after submission", () => {
    const mockAddTask = vi.fn()
    renderWithProviders(<TaskForm onAddTask={mockAddTask} />)

    const input = screen.getByPlaceholderText("Add a new task...") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(input, { target: { value: "New Task" } })
    fireEvent.click(submitButton)

    expect(input.value).toBe("");
  })

  it("does not submit empty tasks", () => {
    const mockAddTask = vi.fn()
    renderWithProviders(<TaskForm onAddTask={mockAddTask} />)

    const submitButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(submitButton);

    expect(mockAddTask).not.toHaveBeenCalled();
  })

  it('shows details section when "Add details" is clicked', () => {
    const mockAddTask = vi.fn()
    renderWithProviders(<TaskForm onAddTask={mockAddTask} />)

    const detailsButton = screen.getByText("Add details");
    fireEvent.click(detailsButton);

    expect(screen.getByPlaceholderText("Add a description (optional)...")).toBeInTheDocument();
    expect(screen.getByLabelText("Due Date")).toBeInTheDocument();
  })

  it("submits task with description and due date", () => {
    const mockAddTask = vi.fn()
    renderWithProviders(<TaskForm onAddTask={mockAddTask} />)

    const input = screen.getByPlaceholderText("Add a new task...");
    const detailsButton = screen.getByText("Add details");

    fireEvent.click(detailsButton)

    const descriptionInput = screen.getByPlaceholderText("Add a description (optional)...");
    const dueDateInput = screen.getByLabelText("Due Date");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(input, { target: { value: "Task with details" } });
    fireEvent.change(descriptionInput, { target: { value: "Task description" } });
    fireEvent.change(dueDateInput, { target: { value: "2025-12-31" } });
    fireEvent.click(submitButton);

    expect(mockAddTask).toHaveBeenCalledWith("Task with details", "Task description", "2025-12-31");
  })
})
