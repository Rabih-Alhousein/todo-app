import type { Task } from "@/types"

export interface TaskEditFormProps {
  task: Task
  onSave: (updates: Partial<Task>) => void
  onCancel: () => void
}
