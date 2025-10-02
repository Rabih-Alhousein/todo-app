"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Check } from "lucide-react"
import type { TaskEditFormProps } from "./types"

export function TaskEditForm({ task, onSave, onCancel }: TaskEditFormProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || "")
  const [dueDate, setDueDate] = useState(task.dueDate || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="space-y-2">
        <Label htmlFor="edit-title" className="text-sm font-medium">
          Title
        </Label>
        <Input
          id="edit-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="h-9"
          autoFocus
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-due-date" className="text-sm font-medium">
          Due Date
        </Label>
        <Input
          id="edit-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="h-9"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details..."
          className="min-h-[80px] resize-none"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" size="sm" className="flex-1 gap-1.5">
          <Check className="h-4 w-4" />
          Save
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel} className="flex-1 gap-1.5 bg-transparent">
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </form>
  )
}
