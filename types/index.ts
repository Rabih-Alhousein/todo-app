export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  order: number;
}

export type FilterType = "all" | "active" | "completed";

export interface TaskCounts {
  all: number;
  active: number;
  completed: number;
}

export interface ColorOption {
  name: string;
  hue: number;
  color: string;
}

export type Theme = "light" | "dark";
