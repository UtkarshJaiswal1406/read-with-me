"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { buildWordSelection, classifySelection } from "@/lib/text/selection";
import { tokenizeText } from "@/lib/text/tokenize";
import type { ActiveSelection } from "@/types/analysis";

interface ReadingPaneProps {
  text: string;
  activeSelection: ActiveSelection | null;
  onSelectionChange: (selection: ActiveSelection) => void;
}

export function ReadingPane({
  text,
  activeSelection,
  onSelectionChange,
}: ReadingPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tokens = useMemo(() => tokenizeText(text), [text]);

  const handleWordClick = useCallback(
    (word: string, offset: number, tokenId: string) => {
      const selection = {
        ...buildWordSelection(word, text, offset),
        wordIds: [tokenId],
      };
      onSelectionChange(selection);
    },
    [text, onSelectionChange]
  );

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !containerRef.current) return;

    const selectedText = sel.toString().trim();
    if (!selectedText || selectedText.split(/\s+/).length <= 1) return;

    const range = sel.getRangeAt(0);
    if (!containerRef.current.contains(range.commonAncestorContainer)) return;

    const preRange = range.cloneRange();
    preRange.selectNodeContents(containerRef.current);
    preRange.setEnd(range.startContainer, range.startOffset);
    const startOffset = preRange.toString().length;

    const selection = classifySelection(selectedText, text, startOffset);
    onSelectionChange(selection);
  }, [text, onSelectionChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.getSelection()?.removeAllRanges();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  let charOffset = 0;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold">Reading</h2>
        <p className="text-xs text-muted-foreground">
          Click words or highlight phrases & paragraphs
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto bg-reading-bg p-6 sm:p-8"
        onMouseUp={handleMouseUp}
      >
        <div
          className="reading-text mx-auto max-w-2xl text-foreground"
          dir="auto"
        >
          {tokens.map((token) => {
            const offset = charOffset;
            charOffset += token.text.length;

            if (!token.isWord) {
              return (
                <span key={token.id} className="whitespace-pre-wrap">
                  {token.text}
                </span>
              );
            }

            const isActive =
              activeSelection?.type === "word" &&
              activeSelection.text === token.text &&
              activeSelection.wordIds?.includes(token.id);

            return (
              <span
                key={token.id}
                role="button"
                tabIndex={0}
                className={`word-token inline ${isActive ? "active" : ""}`}
                onClick={() => handleWordClick(token.text, offset, token.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleWordClick(token.text, offset, token.id);
                  }
                }}
              >
                {token.text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
