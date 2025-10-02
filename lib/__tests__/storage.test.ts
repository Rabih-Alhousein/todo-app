import { describe, it, expect, beforeEach, vi } from "vitest"
import { loadTasks, saveTasks } from "../storage"
import type { Task } from "@/types"

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
    createdAt: "2025-01-01",
    order: 0,
  },
]

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe("loadTasks", () => {
    it("returns empty array when no tasks stored", () => {
      const tasks = loadTasks()
      expect(tasks).toEqual([])
    })

    it("loads tasks from localStorage", () => {
      localStorage.setItem("todo-tasks", JSON.stringify(mockTasks))

      const tasks = loadTasks()
      expect(tasks).toEqual(mockTasks)
    })

    it("returns empty array on parse error", () => {
      localStorage.setItem("todo-tasks", "invalid json")

      const tasks = loadTasks()
      expect(tasks).toEqual([])
    })
  })

  describe("saveTasks", () => {
    it("saves tasks to localStorage", () => {
      saveTasks(mockTasks)

      const stored = localStorage.getItem("todo-tasks")
      expect(stored).toBe(JSON.stringify(mockTasks))
    })

    it("handles save errors gracefully", () => {
      const spy = vi.spyOn(Storage.prototype, "setItem")
      spy.mockImplementation(() => {
        throw new Error("Storage full")
      })

      expect(() => saveTasks(mockTasks)).not.toThrow()

      spy.mockRestore()
    })
  })
})
