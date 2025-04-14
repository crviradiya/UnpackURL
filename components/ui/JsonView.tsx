"use client";

import { UrlAnalysis } from "@/types";
import { CollapsibleSection } from "./CollapsibleSection";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface JsonViewProps {
  analysis: UrlAnalysis;
  className?: string;
  isInSidePanel?: boolean;
  defaultCollapsed?: boolean;
}

export function JsonView({ analysis, className, isInSidePanel, defaultCollapsed = false }: JsonViewProps) {
  const jsonData = {
    protocol: analysis.parsedUrl.protocol,
    host: analysis.parsedUrl.hostname,
    port: analysis.parsedUrl.port,
    path: analysis.parsedUrl.pathname,
    query: analysis.parameters,
  };

  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
      setCopied(true);
      toast.success('Copied to clipboard', {
        description: 'JSON data has been copied successfully',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy', {
        description: 'Could not copy JSON data to clipboard',
      });
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">JSON View</h3>
      <CollapsibleSection 
        title="JSON Representation" 
        className={cn(
          "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20",
          isInSidePanel && "min-h-[400px]",
          className
        )}
        defaultCollapsed={defaultCollapsed}
        onCollapseChange={(collapsed) => setIsCollapsed(collapsed)}
      >
        <div className="relative h-full">
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
          <pre className={cn(
            "bg-white dark:bg-slate-800 p-4 rounded-md overflow-auto text-sm font-mono text-slate-900 dark:text-slate-100 shadow-inner",
            isInSidePanel && "min-h-[400px] max-h-[calc(100vh-300px)]"
          )}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      </CollapsibleSection>
    </div>
  );
} 