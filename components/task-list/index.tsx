"use client"

import { TaskItem } from "@/components/task-item"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useState } from "react"
import { SortableTaskItem } from "@/components/sortable-task-item"
import type { TaskListProps } from "./types"

export function TaskList({ tasks, onToggle, onDelete, onUpdate, onReorder }: TaskListProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id)
      const newIndex = tasks.findIndex((task) => task.id === over.id)

      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex)
      onReorder(reorderedTasks)
    }

    setActiveId(null)
  }

  const activeTask = tasks.find((task) => task.id === activeId)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {tasks.map((task) => (
            <SortableTaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeTask ? (
          <div className="opacity-50 rotate-2">
            <TaskItem task={activeTask} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
