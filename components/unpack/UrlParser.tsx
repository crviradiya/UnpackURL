"use client";

import { useState, useEffect } from "react";
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
  }, []);

  const handleUrlAnalysis = (inputUrl: string) => {
    setIsLoading(true);
    try {
      // Validate URL
      urlSchema.parse({ url: inputUrl });
      
      // Parse URL
      const result = parseUrl(inputUrl);
      
      if (mode === "single") {
        setAnalysis(result);
      } else {
        // In compare mode, set the left URL if it's empty, otherwise set the right URL
        if (!comparison.left) {
          setComparison({
            ...comparison,
            left: result
          });
        } else if (!comparison.right) {
          setComparison({
            ...comparison,
            right: result
          });
        } else {
          // If both URLs are set, update the left URL
          setComparison({
            left: result,
            right: comparison.right
          });
        }
      }
      
      // Track analytics
      trackUrlAnalysis(inputUrl, result.isValid);
      
      // Update URL hash for sharing
      window.location.hash = encodeURIComponent(inputUrl);
    } catch (error) {
      toast.error("Please enter a valid URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalysisChange = (updatedAnalysis: UrlAnalysis) => {
    setAnalysis(updatedAnalysis);
  };

  const handleComparisonChange = (updatedComparison: UrlComparison) => {
    setComparison(updatedComparison);
  };

  const handleModeChange = (newMode: ViewMode) => {
    setMode(newMode);
  };

  const handleReset = () => {
    if (mode === "single") {
      setAnalysis(null);
    } else {
      setComparison({
        left: null,
        right: null
      });
    }
    window.location.hash = "";
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
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