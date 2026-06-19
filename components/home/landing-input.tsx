"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE_TEXT = `हाँ जानी, कह कर वो उसको दाँतों से काटने लगी। इशर सिंह कुछ न बोला, बस उसकी ओर देखता रहा। कुलवंत कौर ने सारी की सारी सिमट कर अपने बालाई होंठ में आ गई।`;

interface LandingInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onAnalyze: () => void;
}

export function LandingInput({ text, onTextChange, onAnalyze }: LandingInputProps) {
  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-in px-4 py-12 sm:py-20">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          This is to make sure you always feel like you have me to explain everything hehe
        </div>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          This is to understand Hindi or Urdu when it gets too tough
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Just paste Hindi or Urdu text, and get warm explanations for words and phrases. Made for you &lt;3
        </p>
      </div>

      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Paste Hindi or Urdu text here..."
          className="font-reading min-h-[240px] text-lg leading-relaxed"
          dir="auto"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => onTextChange(SAMPLE_TEXT)}
          >
            Try sample text
          </Button>

          <Button
            size="lg"
            onClick={onAnalyze}
            disabled={!text.trim()}
            className="w-full sm:w-auto"
          >
            Analyze
          </Button>
        </div>
      </div>
    </div>
  );
}
