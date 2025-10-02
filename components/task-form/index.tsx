"use client";

import type React from "react";
import { useState } from "react";
import { useParseTask } from "@/hooks/use-parse-task";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, ChevronDown, ChevronUp, Sparkles, Loader2 } from "lucide-react";
import type { TaskFormProps } from "./types";

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const parseTaskMutation = useParseTask();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(
      title.trim(),
      description.trim() || undefined,
      dueDate || undefined
    );

    toast({
      title: "Task added",
      description: title.trim(),
      variant: "success",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setShowDetails(false);
  };

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = aiInput.trim();
    if (!input || parseTaskMutation.isPending) return;

    parseTaskMutation.mutate(input, {
      onSuccess: (task) => {
        onAddTask(task.title, task.description, task.dueDate);
        setAiInput("");
        toast({
          title: "Task added",
          description: task.title,
          variant: "success",
        });
      },
      onError: (err: unknown) => {
        const msg = err instanceof Error ? err.message : "Failed to parse task";
        toast({
          title: "Failed to parse task",
          description: msg,
          variant: "error",
        });
      },
    });
  };

  return (
    <Card className="p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          {aiMode ? "AI Mode - Type naturally" : "Manual Mode"}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setAiMode(!aiMode)}
          className="gap-2 h-8"
        >
          <Sparkles className={`h-4 w-4 ${aiMode ? "text-primary" : ""}`} />
          {aiMode ? "Switch to Manual" : "Use AI"}
        </Button>
      </div>

      {aiMode ? (
        <form onSubmit={handleAISubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., Buy groceries tomorrow"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              className="flex-1"
              required
              disabled={parseTaskMutation.isPending}
              aria-label="Natural language task input"
            />
            <Button
              type="submit"
              size="icon"
              className="shrink-0"
              disabled={parseTaskMutation.isPending}
            >
              {parseTaskMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span className="sr-only">Parse and add task</span>
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1"
              required
              aria-label="Task title"
            />
            <Button type="submit" size="icon" className="shrink-0">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add task</span>
            </Button>
          </div>

          {showDetails && (
            <div
              id="task-details-section"
              className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <Textarea
                placeholder="Add a description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px] resize-none"
                aria-label="Task description"
              />
              <div>
                <label
                  htmlFor="due-date"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Due Date
                </label>
                <Input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full"
                  aria-label="Due date"
                />
              </div>
            </div>
          )}

          {!showDetails && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(true)}
              className="w-full justify-center gap-2"
              aria-expanded={showDetails}
              aria-controls="task-details-section"
            >
              <ChevronDown className="h-4 w-4" />
              Add details
            </Button>
          )}

          {showDetails && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(false)}
              className="w-full justify-center gap-2"
              aria-expanded={showDetails}
              aria-controls="task-details-section"
            >
              <ChevronUp className="h-4 w-4" />
              Hide details
            </Button>
          )}
        </form>
      )}
    </Card>
  );
}
