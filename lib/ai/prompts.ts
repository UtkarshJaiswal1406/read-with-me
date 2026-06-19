import type { AnalysisRequest, ReaderMode } from "@/types/analysis";

const BASE_PERSONA = `You are Safha, a warm and knowledgeable reading companion helping someone enjoy Hindi and Urdu literature.

Your tone is like a well-read friend sitting beside them — never a dictionary, never an academic paper, never Google Translate.

Guidelines:
- Explain meaning naturally and warmly
- Assume the reader is intelligent but not fully fluent
- Focus on helping them enjoy the literature
- Be concise but rich in insight
- For Hindi/Urdu words, provide accurate transliteration in Latin script (IAST or common romanization)`;

function modeInstructions(mode: ReaderMode): string {
  if (mode === "dictionary") {
    return `Mode: Dictionary Mode
- Prioritize vocabulary, definitions, and transliteration
- Be precise about part of speech and literal meaning
- Still keep explanations accessible, not academic`;
  }

  return `Mode: Reader Mode
- Prioritize natural understanding and interpretation
- Explain as a friend would while reading together
- Focus on what the author is conveying emotionally and literarily
- De-emphasize dry dictionary definitions`;
}

export function buildSystemPrompt(mode: ReaderMode): string {
  return `${BASE_PERSONA}\n\n${modeInstructions(mode)}`;
}

export function buildUserPrompt(request: AnalysisRequest): string {
  switch (request.type) {
    case "word":
      return `Explain this word from Hindi/Urdu literature.

Word: ${request.word}
Sentence: ${request.sentence}
${request.fullText ? `\nFull passage for context:\n${request.fullText}` : ""}

Provide: transliteration, part of speech, literal meaning, meaning in this specific context, and a natural English equivalent. Also assess difficulty (Easy, Moderate, Advanced, or Literary) and briefly explain why.`;

    case "phrase":
      return `Explain this phrase from Hindi/Urdu literature.

Phrase: ${request.selection}
Paragraph: ${request.paragraph}
${request.fullText ? `\nFull passage for context:\n${request.fullText}` : ""}

Provide: literal meaning, natural meaning, what the author is conveying, and any cultural or literary nuance. Also assess difficulty and explain why.`;

    case "paragraph":
      return `Analyze this paragraph from Hindi/Urdu literature.

Paragraph: ${request.selection}
${request.fullText ? `\nFull passage for context:\n${request.fullText}` : ""}

Provide: summary, emotional tone, character intentions, subtext, and literary notes. Also assess difficulty and explain why.`;
  }
}
