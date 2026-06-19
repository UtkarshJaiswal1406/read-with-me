"use client";

import { useState } from "react";
import { LandingInput } from "@/components/home/landing-input";
import { Header } from "@/components/layout/header";
import { ReaderView } from "@/components/reading/reader-view";

export function SafhaApp() {
  const [text, setText] = useState("");
  const [isReading, setIsReading] = useState(false);

  if (isReading && text.trim()) {
    return (
      <ReaderView
        text={text.trim()}
        onBack={() => setIsReading(false)}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <LandingInput
          text={text}
          onTextChange={setText}
          onAnalyze={() => setIsReading(true)}
        />
      </main>
    </div>
  );
}
