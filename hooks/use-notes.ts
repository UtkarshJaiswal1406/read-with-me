"use client";

import { useCallback, useEffect, useState } from "react";
import type { SavedNote, SelectionType } from "@/types/analysis";

const STORAGE_KEY = "safha-notes";

export function useNotes() {
  const [notes, setNotes] = useState<SavedNote[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored) as SavedNote[]);
      }
    } catch {
      setNotes([]);
    }
  }, []);

  const saveNote = useCallback(
    (text: string, explanation: string, type: SelectionType) => {
      const note: SavedNote = {
        id: crypto.randomUUID(),
        text,
        explanation,
        type,
        createdAt: new Date().toISOString(),
      };

      setNotes((prev) => {
        const next = [note, ...prev];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });

      return note;
    },
    []
  );

  return { notes, saveNote };
}
