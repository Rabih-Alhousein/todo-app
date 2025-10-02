import { CheckCircle2, ListTodo } from "lucide-react"
import type { EmptyStateProps } from "./types"

export function EmptyState({ filter }: EmptyStateProps) {
  const messages = {
    all: {
      icon: ListTodo,
      title: "No tasks yet",
      description: "Add your first task to get started!",
    },
    active: {
      icon: CheckCircle2,
      title: "All caught up!",
      description: "No active tasks at the moment.",
    },
    completed: {
      icon: ListTodo,
      title: "No completed tasks",
      description: "Complete some tasks to see them here.",
    },
  }

  const { icon: Icon, title, description } = messages[filter]

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
    </div>
  )
}
