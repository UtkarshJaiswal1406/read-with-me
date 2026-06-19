"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { useCallback } from "react";
import { z } from "zod";
import type {
  ActiveSelection,
  AnalysisResult,
  ReaderMode,
} from "@/types/analysis";

const difficultySchema = z.object({
  level: z.enum(["Easy", "Moderate", "Advanced", "Literary"]),
  reason: z.string(),
});

const analysisSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("word"),
    word: z.string(),
    transliteration: z.string(),
    partOfSpeech: z.string(),
    literalMeaning: z.string(),
    contextMeaning: z.string(),
    englishEquivalent: z.string(),
    difficulty: difficultySchema,
  }),
  z.object({
    type: z.literal("phrase"),
    selection: z.string(),
    literalMeaning: z.string(),
    naturalMeaning: z.string(),
    authorIntent: z.string(),
    culturalNuance: z.string(),
    difficulty: difficultySchema,
  }),
  z.object({
    type: z.literal("paragraph"),
    selection: z.string(),
    summary: z.string(),
    emotionalTone: z.string(),
    characterIntentions: z.string(),
    subtext: z.string(),
    literaryNotes: z.string(),
    difficulty: difficultySchema,
  }),
]);

export function useAnalysis(mode: ReaderMode) {
  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/analyze",
    schema: analysisSchema,
  });

  const analyze = useCallback(
    (selection: ActiveSelection, fullText: string) => {
      if (selection.type === "word") {
        submit({
          type: "word",
          word: selection.text,
          sentence: selection.sentence ?? selection.paragraph,
          mode,
          fullText,
        });
        return;
      }

      if (selection.type === "phrase") {
        submit({
          type: "phrase",
          selection: selection.text,
          paragraph: selection.paragraph,
          mode,
          fullText,
        });
        return;
      }

      submit({
        type: "paragraph",
        selection: selection.text,
        mode,
        fullText,
      });
    },
    [mode, submit]
  );

  return {
    result: object as AnalysisResult | undefined,
    analyze,
    isLoading,
    error,
    stop,
  };
}
