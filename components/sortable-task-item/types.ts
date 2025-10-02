import type { Task } from "@/types"

export interface SortableTaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Task>) => void
}
