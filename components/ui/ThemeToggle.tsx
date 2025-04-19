"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure hydration is complete to avoid mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0"
        aria-label="Loading theme toggle"
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  function cycleTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label="Toggle theme"
      title={`Current theme: ${theme}`}
      className="relative"
    >
      {/* Sun icon for light theme */}
      <Sun className={`h-5 w-5 transition-all duration-200 ${theme === 'light' ? 'scale-100 rotate-0' : 'scale-0 rotate-90 opacity-0'} absolute`} />
      
      {/* Moon icon for dark theme */}
      <Moon className={`h-5 w-5 transition-all duration-200 ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90 opacity-0'} absolute`} />
      
      {/* System icon */}
      <Monitor className={`h-5 w-5 transition-all duration-200 ${theme === 'system' ? 'scale-100 rotate-0' : 'scale-0 rotate-90 opacity-0'} absolute`} />
      
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : theme === 'dark' ? 'Switch to system theme' : 'Switch to light mode'}
      </span>
    </Button>
  );
} 