"use client";

import { useState, useEffect, useCallback } from "react";
import { UrlAnalysis, UrlComparison, ViewMode } from "@/types";
import { parseUrl } from "@/lib/urlUtils";
import { trackUrlAnalysis } from "@/lib/analytics";
import { urlSchema } from "@/lib/validators";
import { toast } from "sonner";
import { ModeToggle } from "./ModeToggle";
import { SingleUrlView } from "./SingleUrlView";
import { UrlComparison as UrlComparisonView } from "./UrlComparison";

export function UrlParser() {
  const [mode, setMode] = useState<ViewMode>("single");
  const [analysis, setAnalysis] = useState<UrlAnalysis | null>(null);
  const [comparison, setComparison] = useState<UrlComparison>({
    left: null,
    right: null
  });
  const [isLoading, setIsLoading] = useState(false);

  // Use useCallback to memoize the handleUrlAnalysis function
  // Remove comparison from dependencies to avoid infinite loop
  const handleUrlAnalysis = useCallback((inputUrl: string) => {
    setIsLoading(true);
    try {
      // Validate URL
      urlSchema.parse({ url: inputUrl });
      
      // Parse URL
      const result = parseUrl(inputUrl);
      
      if (mode === "single") {
        setAnalysis(result);
      } else {
        // In compare mode, handle URL placement without creating dependency on comparison
        setComparison(prevComparison => {
          // If left is empty, put it there
          if (!prevComparison.left) {
            return { ...prevComparison, left: result };
          } 
          // If right is empty, put it there
          else if (!prevComparison.right) {
            return { ...prevComparison, right: result };
          } 
          // If both are filled, update left
          else {
            return { ...prevComparison, left: result };
          }
        });
      }
      
      // Track analytics
      trackUrlAnalysis(inputUrl, result.isValid);
      
      // Update URL hash for sharing
      window.location.hash = encodeURIComponent(inputUrl);
    } catch (_) {
      toast.error("Please enter a valid URL");
    } finally {
      setIsLoading(false);
    }
  }, [mode]); // Only depend on mode, not comparison

  useEffect(() => {
    // Check if there's a URL in the hash
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const decodedUrl = decodeURIComponent(hash);
        handleUrlAnalysis(decodedUrl);
      } catch (error) {
        console.error("Error decoding URL from hash:", error);
      }
    }
  }, [handleUrlAnalysis]);

  const handleAnalysisChange = (updatedAnalysis: UrlAnalysis) => {
    setAnalysis(updatedAnalysis);
  };

  const handleComparisonChange = (updatedComparison: UrlComparison) => {
    setComparison(updatedComparison);
  };

  const handleModeChange = (newMode: ViewMode) => {
    if (newMode !== mode) {
      if (newMode === "compare" && mode === "single" && analysis) {
        // When switching to compare mode, set comparison first, then update mode
        setComparison({
          left: analysis,
          right: null
        });
      } else if (newMode === "single" && mode === "compare" && comparison.left) {
        // When switching to single mode, set analysis first, then update mode
        setAnalysis(comparison.left);
      }
      // Always update the mode last to prevent cascading updates
      setMode(newMode);
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">URL Parser</h2>
        <ModeToggle mode={mode} onModeChange={handleModeChange} />
      </div>
      
      {mode === "single" ? (
        <SingleUrlView
          analysis={analysis}
          onAnalysisChange={handleAnalysisChange}
          isLoading={isLoading}
        />
      ) : (
        <UrlComparisonView
          comparison={comparison}
          onComparisonChange={handleComparisonChange}
          isLoading={isLoading}
        />
      )}
    </div>
  );
} 