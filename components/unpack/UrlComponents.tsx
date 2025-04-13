"use client";

import { UrlAnalysis, UrlComponent } from "@/types";
import { Input } from "@/components/ui/Input";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UrlComponentsProps {
  analysis: UrlAnalysis;
  onUpdate: (updatedAnalysis: UrlAnalysis) => void;
}

export function UrlComponents({ analysis, onUpdate }: UrlComponentsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const components = [
    { key: "Protocol", value: analysis.parsedUrl.protocol },
    { key: "Host", value: analysis.parsedUrl.hostname },
    { key: "Port", value: analysis.parsedUrl.port },
    { key: "Path", value: analysis.parsedUrl.pathname },
  ];

  const handleComponentChange = (key: string, value: string) => {
    // Update the analysis object
    const updatedAnalysis = { ...analysis };

    switch (key) {
      case "Protocol":
        updatedAnalysis.parsedUrl.protocol = value;
        break;
      case "Host":
        updatedAnalysis.parsedUrl.hostname = value;
        break;
      case "Port":
        updatedAnalysis.parsedUrl.port = value;
        break;
      case "Path":
        updatedAnalysis.parsedUrl.pathname = value;
        break;
    }

    onUpdate(updatedAnalysis);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 overflow-hidden",
              isCollapsed ? "rotate-0" : "rotate-180"
            )}
          >
            <Plus className="h-4 w-4 text-slate-600 dark:text-slate-400 transition-transform duration-200" />
          </button>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 ml-2">URL Components</h3>
      </div>

      <div className={cn(
        "relative pl-8 transition-all duration-200 transform origin-top",
        isCollapsed ? "opacity-0 scale-y-0 h-0 overflow-hidden" : "opacity-100 scale-y-100 pt-2"
      )}>
        {/* Main vertical line - connected to button */}
        <div className="absolute left-3 -top-8 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
        
        <div className="space-y-6">
          {components.map((component, index) => (
            <div key={component.key} className="relative">
              {/* Horizontal line */}
              <div className="absolute left-[-20px] top-[10px] w-5 h-px bg-slate-200 dark:bg-slate-700" />
              
              <div className="relative">
                <span className="font-mono text-sm text-slate-700 dark:text-slate-300 block mb-2">
                  {component.key}
                </span>
                <div className="relative">
                  <Input
                    value={component.value || ""}
                    onChange={(e) => handleComponentChange(component.key, e.target.value)}
                    className="font-mono bg-transparent w-full pr-8"
                    placeholder={`Enter ${component.key.toLowerCase()}`}
                  />
                  <button
                    onClick={() => handleComponentChange(component.key, "")}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 