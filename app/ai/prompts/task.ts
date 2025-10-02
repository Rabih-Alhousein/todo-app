import type { CoreMessage } from "ai";

export function buildTaskParseMessages(input: string): CoreMessage[] {
  const TODAY_ISO = new Date().toISOString().split("T")[0];
  return [
    {
      role: "system",
      content:
        'You are a helpful assistant that extracts task information from natural language. Extract the task title, optional description, and optional due date. For dates like "tomorrow", "next week", calculate the actual date based on today being ' +
        TODAY_ISO +
        '. Respond ONLY with valid JSON in this exact format: {"title": "string", "description": "string or null", "dueDate": "YYYY-MM-DD or null"}',
    },
    {
      role: "user",
      content: input,
    },
  ];
}
