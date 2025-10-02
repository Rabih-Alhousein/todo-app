import type { Task } from "@/types"

export interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Task>) => void
  onReorder: (tasks: Task[]) => void
}
