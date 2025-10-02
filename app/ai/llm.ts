import type { ProviderName } from "./providers";
import { providers } from "./providers";
import { generateText, type CoreMessage } from "ai";

export type ModelSpec = {
  provider: ProviderName;
  model: string; // e.g., "gpt-4o-mini"
};

export async function callTextModel(opts: {
  model: ModelSpec;
  messages: CoreMessage[];
}) {
  const provider = providers[opts.model.provider];
  const model = provider(opts.model.model);
  return generateText({ model, messages: opts.messages });
}
