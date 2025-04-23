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

  // Update input URL when initialUrl prop changes
  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

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
    // Clear the URL input
    setUrl("");
    // Reset encoded state
    setIsEncoded(false);
    // Clear displayed URL
    setDisplayedUrl("");
    // Call parent's reset
    onReset();
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
            className="absolute right-0.5 top-0.5 bottom-0.5 bg-gradient-to-r from-[#2563eb] to-[#9333ea] text-white hover:from-[#2563eb]/90 hover:to-[#9333ea]/90"
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
        <div className="bg-code-theme backdrop-blur-sm rounded-lg p-5 border border-gray-700">
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
                <span className="hidden sm:inline">{isEncoded ? 'Decode' : 'Encode'}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
              <CopyButton
                text={displayedUrl}
                size="sm"
                variant="outline"
                label="Copy"
                showText={false}
                className="sm:hidden"
              />
              <CopyButton
                text={displayedUrl}
                size="sm"
                variant="outline"
                label="Copy"
                className="hidden sm:flex"
              />
            </div>
          </div>
          <div className="font-mono text-sm p-3 bg-sub-code-theme rounded border border-gray-700 break-all text-code-theme">
            {displayedUrl}
          </div>
        </div>
      )}
    </div>
  );
}
