import type { Task } from "@/types"

const STORAGE_KEY = "todo-tasks"

export const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to load tasks:", error)
    return []
  }
}

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Failed to save tasks:", error)
  }
}
