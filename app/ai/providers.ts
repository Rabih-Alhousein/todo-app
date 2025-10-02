import { openai } from "@ai-sdk/openai";

export const providers = {
  openai,
};

export type ProviderName = keyof typeof providers;
