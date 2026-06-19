import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

export type AIProviderName = "openai" | "anthropic";

export function getAIProvider(): AIProviderName {
  const provider = process.env.AI_PROVIDER?.toLowerCase();
  if (provider === "anthropic" || provider === "openai") {
    return provider;
  }
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENAI_API_KEY) return "openai";
  return "openai";
}

export function getModel(): LanguageModel {
  const provider = getAIProvider();
  const model =
    process.env.AI_MODEL ??
    (provider === "anthropic" ? "claude-sonnet-4-20250514" : "gpt-4o-mini");

  return provider === "anthropic" ? anthropic(model) : openai(model);
}
