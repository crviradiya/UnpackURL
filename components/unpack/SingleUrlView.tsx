"use client";

import { useState } from "react";
import { UrlAnalysis } from "@/types";
import { UrlInput } from "./UrlInput";
import { UrlComponents } from "./UrlComponents";
import { QueryParameters } from "./QueryParameters";
import { JsonView } from "@/components/ui/JsonView";
import { reconstructUrl } from "@/lib/urlUtils";
import { copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";
import { CopyButton } from "@/components/ui/CopyButton";

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
  const [jsonData, setJsonData] = useState<any>(null);
  
  const handleCopyUrl = async () => {
    if (!analysis) return;
    
    const reconstructedUrl = reconstructUrl(analysis);
    const success = await copyToClipboard(reconstructedUrl);
    
    if (success) {
      toast.success("URL copied to clipboard!");
    } else {
      toast.error("Failed to copy URL");
    }
  };
  
  const handleReset = () => {
    // This is handled by the parent component
  };
  
  const prepareJsonData = (analysis: UrlAnalysis | null) => {
    if (!analysis) return null;
    
    return {
      protocol: analysis.parsedUrl.protocol,
      host: analysis.parsedUrl.hostname,
      port: analysis.parsedUrl.port,
      path: analysis.parsedUrl.pathname,
      query: analysis.parameters,
    };
  };
  
  const handleJsonChange = (newData: any) => {
    setJsonData(newData);
    
    // If we have valid JSON data and it has the expected structure,
    // try to update the analysis
    if (newData && analysis) {
      try {
        const updatedAnalysis = { ...analysis };
        
        // Update the parsed URL components if they exist in the JSON
        if (newData.protocol) updatedAnalysis.parsedUrl.protocol = newData.protocol;
        if (newData.host) updatedAnalysis.parsedUrl.hostname = newData.host;
        if (newData.port) updatedAnalysis.parsedUrl.port = newData.port;
        if (newData.path) updatedAnalysis.parsedUrl.pathname = newData.path;
        
        // Update query parameters if they exist
        if (newData.query) updatedAnalysis.parameters = newData.query;
        
        onAnalysisChange(updatedAnalysis);
      } catch (error) {
        console.error("Failed to update analysis from JSON", error);
      }
    }
  };
  
  // Prepare JSON data whenever analysis changes
  const jsonViewData = prepareJsonData(analysis);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
      <div className="lg:col-span-4 space-y-6">
        <div className="input-container">
          <UrlInput
            initialUrl={analysis?.originalUrl || ""}
            onAnalysisChange={onAnalysisChange}
            onCopyUrl={handleCopyUrl}
            onReset={handleReset}
            isLoading={isLoading}
            reconstructedUrl={analysis ? reconstructUrl(analysis) : ""}
          />
        </div>
        
        {analysis && (
          <div className="space-y-6">
            <div className="card">
              <UrlComponents 
                analysis={analysis} 
                onUpdate={onAnalysisChange} 
              />
            </div>
            <div className="card">
              <QueryParameters 
                analysis={analysis} 
                onUpdate={onAnalysisChange} 
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="lg:col-span-3">
        {analysis && (
          <div className="card h-full">
            <JsonView 
              data={jsonViewData} 
              isEditable={true}
              onChange={handleJsonChange}
              className="h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
} 