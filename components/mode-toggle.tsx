"use client";

import { BookOpen, BookText } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ReaderMode } from "@/types/analysis";

interface ModeToggleProps {
  mode: ReaderMode;
  onModeChange: (mode: ReaderMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={(value) => {
        if (value) onModeChange(value as ReaderMode);
      }}
      className="rounded-lg border border-border bg-card p-1"
    >
      <ToggleGroupItem
        value="dictionary"
        aria-label="Dictionary mode"
        className="gap-1.5 rounded-md px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      >
        <BookText className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Dictionary</span>
        <span className="sm:hidden">Dict</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="reader"
        aria-label="Reader mode"
        className="gap-1.5 rounded-md px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      >
        <BookOpen className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Reader</span>
        <span className="sm:hidden">Read</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
