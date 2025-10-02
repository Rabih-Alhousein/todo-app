import { callTextModel } from "@/app/ai/llm";
import { buildTaskParseMessages } from "@/app/ai/prompts/task";

export async function requestTaskParse(input: string) {
  if (!process.env.OPENAI_API_KEY) {
    const err = new Error("Missing OPENAI_API_KEY. Set it in your environment to enable AI features.") as Error & {
      statusCode?: number;
    };
    err.statusCode = 401;
    throw err;
  }
  return callTextModel({
    model: { provider: "openai", model: "gpt-4o-mini" },
    messages: buildTaskParseMessages(input),
  });
}
