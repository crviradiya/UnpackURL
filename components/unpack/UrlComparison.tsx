"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeftRight } from "lucide-react";
import { UrlAnalysis, UrlComparison as UrlComparisonType } from "@/types";
import { UrlInput } from "./UrlInput";
import { UrlComponents } from "./UrlComponents";
import { QueryParameters } from "./QueryParameters";
import { JsonView } from "@/components/ui/JsonView";
import { reconstructUrl } from "@/lib/urlUtils";
import { toast } from "sonner";

interface UrlComparisonProps {
  comparison: UrlComparisonType;
  onComparisonChange: (comparison: UrlComparisonType) => void;
  isLoading: boolean;
}

export function UrlComparison({ 
  comparison, 
  onComparisonChange, 
  isLoading 
}: UrlComparisonProps) {
  const { left, right } = comparison;
  
  const handleLeftAnalysisChange = (analysis: UrlAnalysis) => {
    onComparisonChange({
      ...comparison,
      left: analysis
    });
  };
  
  const handleRightAnalysisChange = (analysis: UrlAnalysis) => {
    onComparisonChange({
      ...comparison,
      right: analysis
    });
  };
  
  const handleSwapUrls = () => {
    onComparisonChange({
      left: comparison.right,
      right: comparison.left
    });
  };
  
  const handleCopyLeftUrl = () => {
    if (!left) return;
    
    const reconstructedUrl = reconstructUrl(left);
    navigator.clipboard.writeText(reconstructedUrl);
    toast.success("Left URL copied to clipboard!");
  };
  
  const handleCopyRightUrl = () => {
    if (!right) return;
    
    const reconstructedUrl = reconstructUrl(right);
    navigator.clipboard.writeText(reconstructedUrl);
    toast.success("Right URL copied to clipboard!");
  };
  
  const handleResetLeft = () => {
    onComparisonChange({
      ...comparison,
      left: null
    });
  };
  
  const handleResetRight = () => {
    onComparisonChange({
      ...comparison,
      right: null
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left URL */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">URL 1</h3>
          
          <UrlInput
            initialUrl={left?.originalUrl || ""}
            onAnalysisChange={handleLeftAnalysisChange}
            onCopyUrl={handleCopyLeftUrl}
            onReset={handleResetLeft}
            isLoading={isLoading}
            reconstructedUrl={left ? reconstructUrl(left) : ""}
          />
          
          {left && (
            <div className="space-y-4">
              <UrlComponents 
                analysis={left} 
                onUpdate={handleLeftAnalysisChange} 
              />
              <QueryParameters 
                analysis={left} 
                onUpdate={handleLeftAnalysisChange} 
              />
            </div>
          )}
        </div>
        
        {/* Right URL */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">URL 2</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSwapUrls}
              className="flex items-center gap-1"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Swap URLs
            </Button>
          </div>
          
          <UrlInput
            initialUrl={right?.originalUrl || ""}
            onAnalysisChange={handleRightAnalysisChange}
            onCopyUrl={handleCopyRightUrl}
            onReset={handleResetRight}
            isLoading={isLoading}
            reconstructedUrl={right ? reconstructUrl(right) : ""}
          />
          
          {right && (
            <div className="space-y-4">
              <UrlComponents 
                analysis={right} 
                onUpdate={handleRightAnalysisChange} 
              />
              <QueryParameters 
                analysis={right} 
                onUpdate={handleRightAnalysisChange} 
              />
            </div>
          )}
        </div>
      </div>
      
      {/* JSON View */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">JSON Comparison</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {left && (
            <div>
              <h4 className="text-sm font-medium mb-2">URL 1 JSON</h4>
              <JsonView analysis={left} />
            </div>
          )}
          
          {right && (
            <div>
              <h4 className="text-sm font-medium mb-2">URL 2 JSON</h4>
              <JsonView analysis={right} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 