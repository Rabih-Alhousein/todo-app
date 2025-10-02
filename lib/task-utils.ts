import type { Task, FilterType } from "@/types"

/**
 * Calculate task counts for all filter types
 */
export function calculateTaskCounts(tasks: Task[]) {
  return {
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  }
}

/**
 * Filter tasks based on filter type
 */
export function filterTasks(tasks: Task[], filter: FilterType): Task[] {
  switch (filter) {
    case "active":
      return tasks.filter((task) => !task.completed)
    case "completed":
      return tasks.filter((task) => task.completed)
    default:
      return tasks
  }
}

/**
 * Sort tasks by due date (tasks with due dates first, then by date)
 */
export function sortTasksByDueDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })
}

/**
 * Format a date string for display
 */
export function formatDueDate(dateString: string): string {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const taskDate = new Date(date)
  taskDate.setHours(0, 0, 0, 0)

  if (taskDate.getTime() === today.getTime()) return "Today"
  if (taskDate.getTime() === tomorrow.getTime()) return "Tomorrow"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  })
}

/**
 * Check if a task is overdue
 */
export function isTaskOverdue(task: Task): boolean {
  if (!task.dueDate || task.completed) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dueDate = new Date(task.dueDate)
  dueDate.setHours(0, 0, 0, 0)

  return dueDate < today
}
