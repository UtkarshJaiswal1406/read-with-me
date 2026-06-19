import type { TextToken } from "@/types/analysis";

const WORD_PATTERN = /[\u0900-\u097F\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+/;

export function isWordToken(text: string): boolean {
  return WORD_PATTERN.test(text);
}

export function tokenizeText(text: string): TextToken[] {
  const parts = text.split(/(\s+|[\u0900-\u097F\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+|[^\u0900-\u097F\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+)/);

  return parts
    .filter((part) => part.length > 0)
    .map((part, index) => ({
      id: `token-${index}`,
      text: part,
      isWord: isWordToken(part),
    }));
}

export function getParagraphForOffset(text: string, offset: number): string {
  const before = text.slice(0, offset);
  const after = text.slice(offset);

  const lastBreak = before.lastIndexOf("\n\n");
  const paragraphStart = lastBreak === -1 ? 0 : lastBreak + 2;
  const nextBreak = after.indexOf("\n\n");
  const paragraphEnd =
    nextBreak === -1 ? text.length : offset + nextBreak;

  return text.slice(paragraphStart, paragraphEnd).trim();
}

export function getSentenceForWord(
  text: string,
  wordStart: number,
  wordEnd: number
): string {
  const delimiters = /[।.!??\n]/;
  let start = wordStart;
  let end = wordEnd;

  while (start > 0 && !delimiters.test(text[start - 1] ?? "")) {
    start--;
  }
  while (end < text.length && !delimiters.test(text[end] ?? "")) {
    end++;
  }

  return text.slice(start, end).trim();
}
