import type { ActiveSelection, SelectionType } from "@/types/analysis";
import { getParagraphForOffset } from "./tokenize";

const SENTENCE_DELIMITERS = /[।.!??\n]/;

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => /[\u0900-\u097F\u0600-\u06FF]/.test(word)).length;
}

function countSentences(text: string): number {
  const parts = text.split(SENTENCE_DELIMITERS).filter((part) => part.trim());
  return Math.max(parts.length, 1);
}

export function classifySelection(
  selectedText: string,
  fullText: string,
  startOffset: number
): ActiveSelection {
  const trimmed = selectedText.trim();
  const paragraph = getParagraphForOffset(fullText, startOffset);
  const wordCount = countWords(trimmed);
  const sentenceCount = countSentences(trimmed);

  let type: SelectionType = "phrase";

  if (wordCount <= 1) {
    type = "word";
  } else if (
    sentenceCount >= 2 ||
    trimmed.length >= paragraph.length * 0.75
  ) {
    type = "paragraph";
  }

  return {
    type,
    text: trimmed,
    paragraph,
  };
}

export function buildWordSelection(
  word: string,
  fullText: string,
  offset: number
): ActiveSelection {
  const paragraph = getParagraphForOffset(fullText, offset);

  let start = offset;
  let end = offset + word.length;
  const delimiters = /[।.!??\n]/;

  while (start > 0 && !delimiters.test(fullText[start - 1] ?? "")) {
    start--;
  }
  while (end < fullText.length && !delimiters.test(fullText[end] ?? "")) {
    end++;
  }

  return {
    type: "word",
    text: word,
    sentence: fullText.slice(start, end).trim(),
    paragraph,
  };
}
