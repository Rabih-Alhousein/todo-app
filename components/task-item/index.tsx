"use client";

import { useState } from "react";
import type { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Trash2, Calendar, ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDueDate, isTaskOverdue } from "@/lib/task-utils";
import { TaskEditForm } from "@/components/task-edit-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { TaskItemProps } from "./types";

export function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isOverdue = isTaskOverdue(task);

  const handleSave = (updates: Partial<Task>) => {
    onUpdate(task.id, updates);
    setIsEditing(false);
  };

  return (
    <Card
      className={cn(
        "p-4 transition-all duration-300 hover:shadow-lg",
        "animate-in fade-in slide-in-from-bottom-2 duration-300",
        "border-border/50 hover:border-border",
        task.completed && "bg-muted/30 opacity-75 hover:opacity-90"
      )}
    >
      {isEditing ? (
        <TaskEditForm
          task={task}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex items-start gap-3">
          <Checkbox
            id={task.id}
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1 transition-transform duration-200"
            aria-label={`Mark "${task.title}" as ${
              task.completed ? "incomplete" : "complete"
            }`}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <label
                htmlFor={task.id}
                className={cn(
                  "text-base font-medium cursor-pointer select-none transition-all duration-200",
                  task.completed && "line-through text-muted-foreground",
                  !task.completed && "hover:text-primary"
                )}
              >
                {task.title}
              </label>

              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className={cn(
                    "h-8 w-8 text-muted-foreground",
                    "hover:text-primary hover:bg-primary/10",
                    "transition-all duration-200"
                  )}
                  aria-label={`Edit "${task.title}"`}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 text-muted-foreground",
                        "hover:text-destructive hover:bg-destructive/10",
                        "transition-all duration-200"
                      )}
                      aria-label={`Delete "${task.title}"`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Task</AlertDialogTitle>
                      <AlertDialogDescription>
                        {"Are you sure you want to delete \""}
                        {task.title}
                        {"\"? This action cannot be undone."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(task.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {task.dueDate && (
              <div
                className={cn(
                  "flex items-center gap-1.5 mt-2 text-sm animate-in fade-in slide-in-from-left-1 duration-200",
                  isOverdue
                    ? "text-destructive font-medium"
                    : "text-muted-foreground"
                )}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDueDate(task.dueDate)}</span>
                {isOverdue && (
                  <span className="px-1.5 py-0.5 bg-destructive/10 text-destructive rounded text-xs font-semibold animate-pulse">
                    Overdue
                  </span>
                )}
              </div>
            )}

            {task.description && (
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? (
                    <>
                      <ChevronUp className="h-3.5 w-3.5" />
                      Hide details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3.5 w-3.5" />
                      Show details
                    </>
                  )}
                </Button>

                {expanded && (
                  <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap pl-3 border-l-2 border-primary/50 bg-muted/30 p-3 rounded-r-md">
                      {task.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
