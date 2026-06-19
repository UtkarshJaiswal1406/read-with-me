/**
 * Feature modules for future expansion.
 * Each module will own its hooks, components, and services.
 */

export const FEATURES = {
  translation: "side-by-side translation",
  vocabularyHistory: "vocabulary history",
  savedBooks: "saved books",
  annotations: "personal annotations",
  readingProgress: "reading progress",
  storyChat: "AI chat about the story",
  fileImport: "PDF and EPUB support",
} as const;

export type FeatureKey = keyof typeof FEATURES;
