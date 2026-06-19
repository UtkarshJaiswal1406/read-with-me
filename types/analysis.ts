export type ReaderMode = "dictionary" | "reader";

export type SelectionType = "word" | "phrase" | "paragraph";

export type Difficulty = "Easy" | "Moderate" | "Advanced" | "Literary";

export interface WordAnalysisRequest {
  type: "word";
  word: string;
  sentence: string;
  mode: ReaderMode;
  fullText?: string;
}

export interface PhraseAnalysisRequest {
  type: "phrase";
  selection: string;
  paragraph: string;
  mode: ReaderMode;
  fullText?: string;
}

export interface ParagraphAnalysisRequest {
  type: "paragraph";
  selection: string;
  fullText?: string;
  mode: ReaderMode;
}

export type AnalysisRequest =
  | WordAnalysisRequest
  | PhraseAnalysisRequest
  | ParagraphAnalysisRequest;

export interface DifficultyInfo {
  level: Difficulty;
  reason: string;
}

export interface WordAnalysis {
  type: "word";
  word: string;
  transliteration: string;
  partOfSpeech: string;
  literalMeaning: string;
  contextMeaning: string;
  englishEquivalent: string;
  difficulty: DifficultyInfo;
}

export interface PhraseAnalysis {
  type: "phrase";
  selection: string;
  literalMeaning: string;
  naturalMeaning: string;
  authorIntent: string;
  culturalNuance: string;
  difficulty: DifficultyInfo;
}

export interface ParagraphAnalysis {
  type: "paragraph";
  selection: string;
  summary: string;
  emotionalTone: string;
  characterIntentions: string;
  subtext: string;
  literaryNotes: string;
  difficulty: DifficultyInfo;
}

export type AnalysisResult = WordAnalysis | PhraseAnalysis | ParagraphAnalysis;

export interface SavedNote {
  id: string;
  text: string;
  explanation: string;
  type: SelectionType;
  createdAt: string;
}

export interface TextToken {
  id: string;
  text: string;
  isWord: boolean;
}

export interface ActiveSelection {
  type: SelectionType;
  text: string;
  sentence?: string;
  paragraph: string;
  wordIds?: string[];
}
