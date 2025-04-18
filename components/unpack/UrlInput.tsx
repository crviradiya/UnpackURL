"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { RefreshCw, ArrowRight, Code } from "lucide-react";
import { UrlAnalysis } from "@/types";
import { parseUrl, reconstructUrl } from "@/lib/urlUtils";
import { urlSchema } from "@/lib/validators";
import { toast } from "sonner";
import { CopyButton } from "@/components/ui/CopyButton";

interface UrlInputProps {
  initialUrl?: string;
  onAnalysisChange: (analysis: UrlAnalysis) => void;
  onReset: () => void;
  isLoading: boolean;
  reconstructedUrl: string;
}

export function UrlInput({
  initialUrl = "",
  onAnalysisChange,
  onReset,
  isLoading,
  reconstructedUrl,
}: UrlInputProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isEncoded, setIsEncoded] = useState(false);
  const [displayedUrl, setDisplayedUrl] = useState(reconstructedUrl);

  // Update displayed URL when reconstructedUrl changes
  useEffect(() => {
    if (!isEncoded) {
      setDisplayedUrl(reconstructedUrl);
    }
  }, [reconstructedUrl, isEncoded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUrlAnalysis(url);
  };

  const handleUrlAnalysis = (inputUrl: string) => {
    try {
      // Validate URL
      urlSchema.parse({ url: inputUrl });

      // Parse URL
      const result = parseUrl(inputUrl);
      onAnalysisChange(result);

      // Update URL hash for sharing
      window.location.hash = encodeURIComponent(inputUrl);
      
      // Reset encoded state when analyzing a new URL
      setIsEncoded(false);
    } catch (_) {
      toast.error("Please enter a valid URL");
    }
  };

  const handleEncodeDecode = () => {
    try {
      if (isEncoded) {
        // If currently encoded, decode
        setDisplayedUrl(reconstructedUrl);
        toast.success('URL Decoded');
      } else {
        // If currently decoded, encode
        const encodedUrl = encodeURIComponent(reconstructedUrl);
        setDisplayedUrl(encodedUrl);
        toast.success('URL Encoded');
      }
      setIsEncoded(!isEncoded);
    } catch (_) {
      toast.error('Invalid URL', {
        description: 'Could not encode/decode the URL'
      });
    }
  };

  const handleReset = () => {
    // Keep the current URL in the input
    const currentUrl = url;
    
    // Reset encoded state
    setIsEncoded(false);
    
    // Call parent's onReset function
    onReset();
    
    // If there's a URL in the input, re-analyze it to update the reconstructed URL
    if (currentUrl.trim()) {
      try {
        // Re-parse the URL to update the reconstructed version
        const result = parseUrl(currentUrl);
        onAnalysisChange(result);
        
        // Update displayed URL to match the newly reconstructed URL
        setDisplayedUrl(reconstructUrl(result));
        
        toast.success('URL components reset');
      } catch (_) {
        // If invalid URL, just clear everything
        setUrl("");
        toast.error('Invalid URL, cleared input');
      }
    } else {
      // If no URL, show a different message
      toast.success('URL Reset');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="url"
            placeholder="Enter URL to analyze (e.g., https://example.com?param1=value1)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pr-24"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90"
            size="sm"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Analyze</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </form>

      {reconstructedUrl && (
        <div className="bg-white dark:bg-slate-950 light:bg-slate-550 shadow-sm border border-slate-200 dark:border-slate-700 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">
              {isEncoded ? "Encoded URL" : "Reconstructed URL"}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEncodeDecode}
                className="flex items-center gap-1"
              >
                <Code className="h-4 w-4" />
                {isEncoded ? 'Decode' : 'Encode'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
              <CopyButton
                text={displayedUrl}
                size="sm"
                variant="outline"
                label="Copy"
              />
            </div>
          </div>
          <div className="font-mono text-sm p-3 bg-slate-900 dark:bg-slate-900 rounded border border-zinc-200 dark:border-zinc-700 break-all text-white dark:text-white">
            {displayedUrl}
          </div>
        </div>
      )}
    </div>
  );
}
