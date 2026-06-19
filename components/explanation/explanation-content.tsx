"use client";

import { Check, Copy, StickyNote } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type {
  ActiveSelection,
  AnalysisResult,
  Difficulty,
} from "@/types/analysis";

function difficultyVariant(
  level?: Difficulty
): "easy" | "moderate" | "advanced" | "literary" | "secondary" {
  switch (level) {
    case "Easy":
      return "easy";
    case "Moderate":
      return "moderate";
    case "Advanced":
      return "advanced";
    case "Literary":
      return "literary";
    default:
      return "secondary";
  }
}

function Field({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="animate-fade-in space-y-1.5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  );
}

interface ExplanationContentProps {
  selection: ActiveSelection | null;
  result?: AnalysisResult;
  isLoading: boolean;
  onSaveNote: (text: string, explanation: string) => void;
}

function formatExplanation(result: AnalysisResult): string {
  switch (result.type) {
    case "word":
      return [
        result.word,
        `Transliteration: ${result.transliteration}`,
        `Part of speech: ${result.partOfSpeech}`,
        `Literal meaning: ${result.literalMeaning}`,
        `In context: ${result.contextMeaning}`,
        `English: ${result.englishEquivalent}`,
      ].join("\n");
    case "phrase":
      return [
        result.selection,
        `Literal: ${result.literalMeaning}`,
        `Natural: ${result.naturalMeaning}`,
        `Author's intent: ${result.authorIntent}`,
        `Cultural nuance: ${result.culturalNuance}`,
      ].join("\n");
    case "paragraph":
      return [
        `Summary: ${result.summary}`,
        `Tone: ${result.emotionalTone}`,
        `Character intentions: ${result.characterIntentions}`,
        `Subtext: ${result.subtext}`,
        `Literary notes: ${result.literaryNotes}`,
      ].join("\n");
  }
}

export function ExplanationContent({
  selection,
  result,
  isLoading,
  onSaveNote,
}: ExplanationContentProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!selection) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <p className="text-lg font-medium">Select something to explore</p>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Click a word, or highlight a phrase or paragraph in the reading pane.
        </p>
      </div>
    );
  }

  const explanationText = result ? formatExplanation(result) : "";

  const handleCopy = async () => {
    if (!explanationText) return;
    await navigator.clipboard.writeText(explanationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!explanationText) return;
    onSaveNote(selection.text, explanationText);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const typeLabel =
    selection.type === "word"
      ? "Word"
      : selection.type === "phrase"
        ? "Phrase"
        : "Paragraph";

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-4 sm:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {typeLabel}
            </p>
            <p
              className="mt-1 font-reading text-xl leading-relaxed"
              dir="auto"
            >
              {selection.text}
            </p>
          </div>
          <div className="flex shrink-0 gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              disabled={!result || isLoading}
              aria-label="Copy explanation"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              disabled={!result || isLoading}
              aria-label="Save note"
            >
              {saved ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <StickyNote className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {result?.difficulty && (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={difficultyVariant(result.difficulty.level)}>
              {result.difficulty.level}
            </Badge>
            {result.difficulty.reason && (
              <p className="text-xs text-muted-foreground">
                {result.difficulty.reason}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
        {result?.type === "word" && (
          <>
            <Field label="Transliteration" value={result.transliteration} />
            <Field label="Part of speech" value={result.partOfSpeech} />
            <Separator />
            <Field label="Literal meaning" value={result.literalMeaning} />
            <Field label="In this context" value={result.contextMeaning} />
            <Field label="English equivalent" value={result.englishEquivalent} />
          </>
        )}

        {result?.type === "phrase" && (
          <>
            <Field label="Literal meaning" value={result.literalMeaning} />
            <Field label="Natural meaning" value={result.naturalMeaning} />
            <Separator />
            <Field
              label="What the author is conveying"
              value={result.authorIntent}
            />
            <Field
              label="Cultural / literary nuance"
              value={result.culturalNuance}
            />
          </>
        )}

        {result?.type === "paragraph" && (
          <>
            <Field label="Summary" value={result.summary} />
            <Field label="Emotional tone" value={result.emotionalTone} />
            <Separator />
            <Field
              label="Character intentions"
              value={result.characterIntentions}
            />
            <Field label="Subtext" value={result.subtext} />
            <Field label="Literary notes" value={result.literaryNotes} />
          </>
        )}

        {isLoading && !result && (
          <p className="text-sm text-muted-foreground animate-pulse">
            Thinking...
          </p>
        )}
      </div>
    </div>
  );
}
