import { streamObject } from "ai";
import { z } from "zod";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/ai/prompts";
import { getModel } from "@/lib/ai/provider";
import type { AnalysisRequest } from "@/types/analysis";

const difficultySchema = z.object({
  level: z.enum(["Easy", "Moderate", "Advanced", "Literary"]),
  reason: z.string(),
});

const wordSchema = z.object({
  type: z.literal("word"),
  word: z.string(),
  transliteration: z.string(),
  partOfSpeech: z.string(),
  literalMeaning: z.string(),
  contextMeaning: z.string(),
  englishEquivalent: z.string(),
  difficulty: difficultySchema,
});

const phraseSchema = z.object({
  type: z.literal("phrase"),
  selection: z.string(),
  literalMeaning: z.string(),
  naturalMeaning: z.string(),
  authorIntent: z.string(),
  culturalNuance: z.string(),
  difficulty: difficultySchema,
});

const paragraphSchema = z.object({
  type: z.literal("paragraph"),
  selection: z.string(),
  summary: z.string(),
  emotionalTone: z.string(),
  characterIntentions: z.string(),
  subtext: z.string(),
  literaryNotes: z.string(),
  difficulty: difficultySchema,
});

const requestSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("word"),
    word: z.string().min(1),
    sentence: z.string().min(1),
    mode: z.enum(["dictionary", "reader"]),
    fullText: z.string().optional(),
  }),
  z.object({
    type: z.literal("phrase"),
    selection: z.string().min(1),
    paragraph: z.string().min(1),
    mode: z.enum(["dictionary", "reader"]),
    fullText: z.string().optional(),
  }),
  z.object({
    type: z.literal("paragraph"),
    selection: z.string().min(1),
    mode: z.enum(["dictionary", "reader"]),
    fullText: z.string().optional(),
  }),
]);

function getSchema(type: AnalysisRequest["type"]) {
  switch (type) {
    case "word":
      return wordSchema;
    case "phrase":
      return phraseSchema;
    case "paragraph":
      return paragraphSchema;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const request = parsed.data as AnalysisRequest;
    const schema = getSchema(request.type);

    const result = streamObject({
      model: getModel(),
      schema,
      system: buildSystemPrompt(request.mode),
      prompt: buildUserPrompt(request),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Analysis error:", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze selection",
      },
      { status: 500 }
    );
  }
}
