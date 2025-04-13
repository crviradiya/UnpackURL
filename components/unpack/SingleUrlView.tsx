"use client";

import { useState } from "react";
import { UrlAnalysis } from "@/types";
import { UrlInput } from "./UrlInput";
import { UrlComponents } from "./UrlComponents";
import { QueryParameters } from "./QueryParameters";
import { JsonView } from "@/components/ui/JsonView";
import { reconstructUrl } from "@/lib/urlUtils";
import { toast } from "sonner";

interface SingleUrlViewProps {
  analysis: UrlAnalysis | null;
  onAnalysisChange: (analysis: UrlAnalysis) => void;
  isLoading: boolean;
}

export function SingleUrlView({ 
  analysis, 
  onAnalysisChange, 
  isLoading 
}: SingleUrlViewProps) {
  const handleCopyUrl = () => {
    if (!analysis) return;
    
    const reconstructedUrl = reconstructUrl(analysis);
    navigator.clipboard.writeText(reconstructedUrl);
    toast.success("URL copied to clipboard!");
  };
  
  const handleReset = () => {
    // This is handled by the parent component
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
      <div className="lg:col-span-4 space-y-6">
        <UrlInput
          initialUrl={analysis?.originalUrl || ""}
          onAnalysisChange={onAnalysisChange}
          onCopyUrl={handleCopyUrl}
          onReset={handleReset}
          isLoading={isLoading}
          reconstructedUrl={analysis ? reconstructUrl(analysis) : ""}
        />
        
        {analysis && (
          <div className="space-y-6">
            <UrlComponents 
              analysis={analysis} 
              onUpdate={onAnalysisChange} 
            />
            <QueryParameters 
              analysis={analysis} 
              onUpdate={onAnalysisChange} 
            />
          </div>
        )}
      </div>
      
      <div className="lg:col-span-3">
        {analysis && (
          <JsonView analysis={analysis} />
        )}
      </div>
    </div>
  );
} 