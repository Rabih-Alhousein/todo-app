"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskItem } from "@/components/task-item"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SortableTaskItemProps } from "./types"

export function SortableTaskItem({ task, onToggle, onDelete, onUpdate }: SortableTaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className={cn("relative group", isDragging && "z-50 opacity-50")}>
      <div
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className={cn(
          "flex items-center md:block md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200",
          "md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-full",
          "cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground",
          "mr-2 md:mr-0 p-1 rounded-md bg-transparent md:bg-transparent"
        )}
      >
        <GripVertical className="h-5 w-5" />
      </div>
      <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  )
}
