"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task, FilterType } from "@/types";
import { loadTasks, saveTasks } from "@/lib/storage";
import { filterTasks } from "@/lib/task-utils";

export function useTasks() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [mounted, setMounted] = useState(false);

  // Load tasks on mount
  useEffect(() => {
    setMounted(true);
    const loadedTasks = loadTasks();
    const tasksWithOrder = loadedTasks.map((task, index) => ({
      ...task,
      order: task.order ?? index,
    }));
    setAllTasks(tasksWithOrder);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (mounted) {
      saveTasks(allTasks);
    }
  }, [allTasks, mounted]);

  const addTask = useCallback(
    (title: string, description?: string, dueDate?: string) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        completed: false,
        dueDate,
        createdAt: new Date().toISOString(),
        order: Date.now(),
      };
      setAllTasks((prev) => [...prev, newTask]);
    },
    []
  );

  const toggleTask = useCallback((id: string) => {
    setAllTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setAllTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const reorderTasks = useCallback((reorderedTasks: Task[]) => {
    setAllTasks((prev) => {
      // Create a map of task IDs to their new order
      const orderMap = new Map<string, number>();
      reorderedTasks.forEach((task, index) => {
        orderMap.set(task.id, index);
      });

      // Update the order for reordered tasks
      return prev.map((task) => {
        const newOrder = orderMap.get(task.id);
        if (newOrder !== undefined) {
          return { ...task, order: newOrder };
        }
        return task;
      });
    });
  }, []);

  const sortedTasks = [...allTasks].sort((a, b) => a.order - b.order);
  const filteredTasks = filterTasks(sortedTasks, filter);

  return {
    allTasks,
    tasks: filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    reorderTasks,
    mounted,
  };
}
