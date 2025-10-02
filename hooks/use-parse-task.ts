"use client";

import { useMutation } from "@tanstack/react-query";
import { parseTask } from "@/lib/api/parse-task";

export function useParseTask() {
  return useMutation({
    mutationFn: parseTask,
  });
}
