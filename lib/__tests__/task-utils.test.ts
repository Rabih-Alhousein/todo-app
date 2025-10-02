import { describe, it, expect } from "vitest"
import { calculateTaskCounts, filterTasks, sortTasksByDueDate, formatDueDate, isTaskOverdue } from "../task-utils"
import type { Task } from "@/types"

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
    createdAt: "2025-01-01",
    order: 0,
    dueDate: "2025-12-31",
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
    createdAt: "2025-01-02",
    order: 1,
  },
  {
    id: "3",
    title: "Task 3",
    completed: false,
    createdAt: "2025-01-03",
    order: 2,
    dueDate: "2025-06-15",
  },
]

describe("calculateTaskCounts", () => {
  it("calculates correct counts", () => {
    const counts = calculateTaskCounts(mockTasks)

    expect(counts.all).toBe(3)
    expect(counts.active).toBe(2)
    expect(counts.completed).toBe(1)
  })

  it("returns zero counts for empty array", () => {
    const counts = calculateTaskCounts([])

    expect(counts.all).toBe(0)
    expect(counts.active).toBe(0)
    expect(counts.completed).toBe(0)
  })
})

describe("filterTasks", () => {
  it("returns all tasks for 'all' filter", () => {
    const filtered = filterTasks(mockTasks, "all")
    expect(filtered.length).toBe(3)
  })

  it("returns only active tasks for 'active' filter", () => {
    const filtered = filterTasks(mockTasks, "active")
    expect(filtered.length).toBe(2)
    expect(filtered.every((task) => !task.completed)).toBe(true)
  })

  it("returns only completed tasks for 'completed' filter", () => {
    const filtered = filterTasks(mockTasks, "completed")
    expect(filtered.length).toBe(1)
    expect(filtered.every((task) => task.completed)).toBe(true)
  })
})

describe("sortTasksByDueDate", () => {
  it("sorts tasks with due dates first", () => {
    const sorted = sortTasksByDueDate(mockTasks)

    expect(sorted[0].dueDate).toBeDefined()
    expect(sorted[1].dueDate).toBeDefined()
    expect(sorted[2].dueDate).toBeUndefined()
  })

  it("sorts tasks by due date ascending", () => {
    const sorted = sortTasksByDueDate(mockTasks)

    expect(sorted[0].dueDate).toBe("2025-06-15")
    expect(sorted[1].dueDate).toBe("2025-12-31")
  })
})

describe("formatDueDate", () => {
  it("formats date correctly", () => {
    const formatted = formatDueDate("2025-12-31")
    expect(formatted).toMatch(/Dec 31/)
  })
})

describe("isTaskOverdue", () => {
  it("returns false for completed tasks", () => {
    const task: Task = {
      id: "1",
      title: "Task",
      completed: true,
      createdAt: "2025-01-01",
      order: 0,
      dueDate: "2020-01-01",
    }

    expect(isTaskOverdue(task)).toBe(false)
  })

  it("returns false for tasks without due date", () => {
    const task: Task = {
      id: "1",
      title: "Task",
      completed: false,
      createdAt: "2025-01-01",
      order: 0,
    }

    expect(isTaskOverdue(task)).toBe(false)
  })
})
