# Safha

A modern reading companion for Hindi and Urdu literature. Paste a passage, tap words or highlight phrases, and get warm contextual explanations — like a well-read friend sitting beside you.

## Features

- **Word explanations** — transliteration, part of speech, literal & contextual meaning
- **Phrase explanations** — literal meaning, natural meaning, author intent, cultural nuance
- **Paragraph analysis** — summary, tone, character intentions, subtext, literary notes
- **Dictionary vs Reader mode** — vocabulary focus or natural interpretation
- **Difficulty detection** — Easy, Moderate, Advanced, Literary with reasons
- **Streaming AI responses** with loading skeletons
- **Copy & save notes** (notes stored in localStorage)
- **Light/dark mode**, responsive layout with mobile explanation drawer
- **Keyboard support** — Enter/Space on words, Escape to clear selection

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui-style components
- Vercel AI SDK (OpenAI & Anthropic)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add your API key to `.env.local`:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
AI_MODEL=gpt-4o-mini
```

Or for Anthropic:

```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
AI_MODEL=claude-sonnet-4-20250514
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  api/analyze/     # Streaming AI analysis endpoint
  page.tsx         # Entry point
components/
  home/            # Landing input
  reading/         # Reading pane & reader layout
  explanation/     # Explanation pane & content
  ui/              # Reusable UI primitives
hooks/
  use-analysis.ts  # AI streaming hook
  use-notes.ts     # Saved notes (localStorage)
lib/
  ai/              # Provider config & prompts
  text/            # Tokenization & selection logic
  features/        # Future feature registry
types/
  analysis.ts      # Shared types
```

## Future Features

The codebase is structured to support:

- Side-by-side translation
- Vocabulary history
- Saved books
- Personal annotations
- Reading progress
- AI chat about the story
- PDF and EPUB import

See `lib/features/index.ts` for the feature registry.
