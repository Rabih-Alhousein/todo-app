"use client";

import { useMemo } from "react";
import type { Task } from "@/types";
import { calculateTaskCounts } from "@/lib/task-utils";

export function useTaskCounts(tasks: Task[]) {
  return useMemo(() => calculateTaskCounts(tasks), [tasks]);
}
