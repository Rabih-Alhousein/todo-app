import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1).describe("The main task title or action"),
  description: z
    .string()
    .nullable()
    .optional()
    .transform((v) => (v ?? undefined))
    .describe("Additional details about the task"),
  dueDate: z
    .string()
    .nullable()
    .optional()
    .transform((v) => (v ?? undefined))
    .describe("Due date in ISO format (YYYY-MM-DD) if mentioned"),
});

export type TaskPayload = z.infer<typeof taskSchema>;

export function validateTaskPayload(data: unknown): TaskPayload {
  return taskSchema.parse(data);
}
