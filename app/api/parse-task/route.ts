import { z } from "zod";
import { extractJsonFromText, readTaskInput, getErrorMessage, mapErrorToStatus } from "./utils";
import { validateTaskPayload } from "./schema";
import { requestTaskParse } from "./service";

export async function POST(req: Request) {
  try {
    const input = await readTaskInput(req);
    if (!input) {
      return Response.json(
        { success: false, error: "Missing 'input' in request body" },
        { status: 400 }
      );
    }

    const { text } = await requestTaskParse(input);

    const parsed = extractJsonFromText(text);
    const validated = validateTaskPayload(parsed);

    return Response.json({ success: true, task: validated });
  } catch (error) {
    // Validation errors
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, error: "Invalid task payload", issues: error.issues },
        { status: 400 }
      );
    }

    // Upstream/LLM or generic errors
    const message = getErrorMessage(error);
    const status = mapErrorToStatus(error);
    return Response.json(
      { success: false, error: message || "Failed to parse task" },
      { status }
    );
  }
}
