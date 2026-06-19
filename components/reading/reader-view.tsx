"use client";

import { useCallback, useEffect, useState } from "react";
import { ExplanationPane } from "@/components/explanation/explanation-pane";
import { Header } from "@/components/layout/header";
import { ReadingPane } from "@/components/reading/reading-pane";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAnalysis } from "@/hooks/use-analysis";
import { useNotes } from "@/hooks/use-notes";
import type { ActiveSelection } from "@/types/analysis";

interface ReaderViewProps {
  text: string;
  onBack: () => void;
}

export function ReaderView({ text, onBack }: ReaderViewProps) {
  const [selection, setSelection] = useState<ActiveSelection | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { result, analyze, isLoading, stop } = useAnalysis("reader");
  const { saveNote } = useNotes();

  const isMobileViewport = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  const handleSelectionChange = useCallback(
    (next: ActiveSelection) => {
      setSelection(next);
      setMobileDrawerOpen(isMobileViewport());
      analyze(next, text);
    },
    [analyze, text]
  );

  

  const handleSaveNote = useCallback(
    (noteText: string, explanation: string) => {
      if (selection) {
        saveNote(noteText, explanation, selection.type);
      }
    },
    [saveNote, selection]
  );

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header showBack onBack={onBack} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row">
        <div className="min-h-[50vh] flex-1 md:min-h-0 md:border-r md:border-border">
          <ReadingPane
            text={text}
            activeSelection={selection}
            onSelectionChange={handleSelectionChange}
          />
        </div>

        <ExplanationPane
          className="reader-explanation-pane hidden min-h-0 w-full md:flex"
          selection={selection}
          result={result}
          isLoading={isLoading}
          onSaveNote={handleSaveNote}
        />
      </div>

      <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
        <SheetContent side="bottom" className="flex flex-col p-0 md:hidden">
          <ExplanationPane
            className="flex h-full flex-col"
            selection={selection}
            result={result}
            isLoading={isLoading}
            onSaveNote={handleSaveNote}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
