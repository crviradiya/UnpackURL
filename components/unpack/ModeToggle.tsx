"use client";

import { Button } from "@/components/ui/Button";
import { ViewMode } from "@/types";

interface ModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex items-center justify-center space-x-2 p-2 bg-muted rounded-md">
      <Button
        variant={mode === "single" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("single")}
        className="flex-1"
      >
        Single URL
      </Button>
      <Button
        variant={mode === "compare" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("compare")}
        className="flex-1"
      >
        Compare URLs
      </Button>
    </div>
  );
} 