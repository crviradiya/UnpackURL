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

// Create a global reset function that can be called from anywhere
let globalReset: (() => void) | null = null;

export function setGlobalReset(resetFn: () => void) {
  globalReset = resetFn;
}

export function resetUrlParser() {
  if (globalReset) {
    globalReset();
  }
}

export function UrlParser() {
  const [mode, setMode] = useState<ViewMode>("single");
  const [analysis, setAnalysis] = useState<UrlAnalysis | null>(null);
  const [comparison, setComparison] = useState<UrlComparison>({
    left: null,
    right: null
  });
  const [isLoading, setIsLoading] = useState(false);

  // Register the reset function when the component mounts
  useEffect(() => {
    const resetStates = () => {
      setAnalysis(null);
      setComparison({ left: null, right: null });
      setMode("single");
      // Clear URL hash
      if (window.location.hash) {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    };

    setGlobalReset(resetStates);
    return () => setGlobalReset(() => {}); // Cleanup on unmount
  }, []);

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
        setIsLoading(true);
        
        // Validate and parse URL
        urlSchema.parse({ url: decodedUrl });
        const result = parseUrl(decodedUrl);
        
        // Update state based on mode
        if (mode === "single") {
          setAnalysis(result);
        } else {
          setComparison(prev => {
            if (!prev.left) return { ...prev, left: result };
            if (!prev.right) return { ...prev, right: result };
            return { ...prev, left: result };
          });
        }
        
        // Track analytics
        trackUrlAnalysis(decodedUrl, result.isValid);
      } catch (error) {
        console.error("Error decoding URL from hash:", error);
        // Clear invalid hash
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      } finally {
        setIsLoading(false);
      }
    }
  }, [mode]);  // Only depend on mode since we want this to run once per mode change

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