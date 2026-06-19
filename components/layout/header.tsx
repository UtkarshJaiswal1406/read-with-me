"use client";

import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ showBack, onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {showBack && onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Made with love</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              For Ilma &lt;3 
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
