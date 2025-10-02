export function extractJsonFromText(text: string): unknown {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in model response");
  }
  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    throw new Error("Model response contained invalid JSON");
  }
}

/** Safely reads and normalizes the `input` field from a JSON request body. */
export async function readTaskInput(req: Request): Promise<string> {
  const body = await req.json().catch(() => ({}));
  const input = typeof body?.input === "string" ? body.input.trim() : "";
  return input;
}

/** Extract a human-readable error message. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

/** Map arbitrary errors to an HTTP status code. */
export function mapErrorToStatus(error: unknown): number {
  if (error && typeof error === "object" && "statusCode" in error) {
    const status = error.statusCode;
    if (typeof status === "number" && status >= 400 && status <= 599) {
      return status;
    }
  }

  const message = getErrorMessage(error).toLowerCase();
  if (message.includes("unauthorized") || message.includes("forbidden"))
    return 401;
  if (
    message.includes("token") ||
    message.includes("auth") ||
    message.includes("api key")
  )
    return 401;
  return 500;
}
