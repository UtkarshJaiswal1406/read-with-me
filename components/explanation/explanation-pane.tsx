"use client";

import { ExplanationContent } from "@/components/explanation/explanation-content";
import { ExplanationSkeleton } from "@/components/explanation/explanation-skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ActiveSelection, AnalysisResult } from "@/types/analysis";

interface ExplanationPaneProps {
  selection: ActiveSelection | null;
  result?: AnalysisResult;
  isLoading: boolean;
  onSaveNote: (text: string, explanation: string) => void;
  className?: string;
}

export function ExplanationPane({
  selection,
  result,
  isLoading,
  onSaveNote,
  className,
}: ExplanationPaneProps) {
  return (
    <aside
      className={`flex flex-col border-border bg-card ${className ?? ""}`}
    >
      <div className="border-b border-border px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold">Explanation</h2>
      </div>

      <ScrollArea className="flex-1">
        {isLoading && !result ? (
          <ExplanationSkeleton />
        ) : (
          <ExplanationContent
            selection={selection}
            result={result}
            isLoading={isLoading}
            onSaveNote={onSaveNote}
          />
        )}
      </ScrollArea>
    </aside>
  );
}
