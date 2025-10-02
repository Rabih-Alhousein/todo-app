export interface ParsedTask {
  title: string;
  description?: string;
  dueDate?: string;
}

export async function parseTask(input: string): Promise<ParsedTask> {
  const res = await fetch("/api/parse-task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data?.success) {
    const msg = data?.error || `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return data.task as ParsedTask;
}
