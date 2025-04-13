"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Minus, Plus, X } from "lucide-react";
import { UrlAnalysis } from "@/types";
import { cn } from "@/lib/utils";

interface QueryParametersProps {
  analysis: UrlAnalysis;
  onUpdate: (updatedAnalysis: UrlAnalysis) => void;
}

export function QueryParameters({ analysis, onUpdate }: QueryParametersProps) {
  const [params, setParams] = useState<Record<string, string>>(analysis.parameters);
  const [newParamKey, setNewParamKey] = useState("");
  const [newParamValue, setNewParamValue] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddParam, setShowAddParam] = useState(false);

  const handleAddParam = () => {
    if (!newParamKey.trim()) return;
    
    const updatedParams = {
      ...params,
      [newParamKey]: newParamValue
    };
    
    setParams(updatedParams);
    setNewParamKey("");
    setNewParamValue("");
    setShowAddParam(false);
    
    // Update the analysis object
    const updatedAnalysis = { ...analysis };
    updatedAnalysis.parameters = updatedParams;
    
    // Update the search string
    const searchParams = new URLSearchParams();
    Object.entries(updatedParams).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    
    updatedAnalysis.parsedUrl.search = searchParams.toString() ? `?${searchParams.toString()}` : "";
    
    onUpdate(updatedAnalysis);
  };

  const handleDeleteParam = (key: string) => {
    const updatedParams = { ...params };
    delete updatedParams[key];
    setParams(updatedParams);
    
    // Update the analysis object
    const updatedAnalysis = { ...analysis };
    updatedAnalysis.parameters = updatedParams;
    
    // Update the search string
    const searchParams = new URLSearchParams();
    Object.entries(updatedParams).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    
    updatedAnalysis.parsedUrl.search = searchParams.toString() ? `?${searchParams.toString()}` : "";
    
    onUpdate(updatedAnalysis);
  };

  const handleUpdateParam = (key: string, value: string) => {
    const updatedParams = {
      ...params,
      [key]: value
    };
    
    setParams(updatedParams);
    
    // Update the analysis object
    const updatedAnalysis = { ...analysis };
    updatedAnalysis.parameters = updatedParams;
    
    // Update the search string
    const searchParams = new URLSearchParams();
    Object.entries(updatedParams).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    
    updatedAnalysis.parsedUrl.search = searchParams.toString() ? `?${searchParams.toString()}` : "";
    
    onUpdate(updatedAnalysis);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 ml-2">Query Parameters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAddParam(true)}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <Plus className="h-4 w-4" />
          Add Parameter
        </Button>
      </div>

      <div className={cn(
        "relative pl-8 transition-all duration-200 transform origin-top",
        isCollapsed ? "opacity-0 scale-y-0 h-0 overflow-hidden" : "opacity-100 scale-y-100 pt-2"
      )}>
        {/* Main vertical line - connected to button */}
        <div className="absolute left-3 -top-8 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
        
        <div className="space-y-4">
          {/* Add Parameter Form */}
          {showAddParam && (
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute left-[-20px] top-[22px] w-5 h-px bg-slate-200 dark:bg-slate-700" />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Key"
                  value={newParamKey}
                  onChange={(e) => setNewParamKey(e.target.value)}
                  className="font-mono bg-transparent"
                />
                <div className="relative">
                  <Input
                    placeholder="Value"
                    value={newParamValue}
                    onChange={(e) => setNewParamValue(e.target.value)}
                    className="font-mono bg-transparent pr-20"
                  />
                  <div className="absolute right-2 top-1.5 flex items-center gap-2">
                    <button
                      onClick={() => setShowAddParam(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleAddParam}
                      disabled={!newParamKey.trim()}
                      className="text-green-500 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Parameters List */}
          {Object.entries(params).length === 0 ? (
            <div className="text-center py-4 text-slate-500 dark:text-slate-400">
              No query parameters found
            </div>
          ) : (
            Object.entries(params).map(([key, value], index) => (
              <div key={key} className="relative">
                {/* Horizontal line */}
                <div className="absolute left-[-20px] top-[22px] w-5 h-px bg-slate-200 dark:bg-slate-700" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      value={key}
                      onChange={(e) => {
                        handleDeleteParam(key);
                        handleUpdateParam(e.target.value, value);
                      }}
                      className="font-mono bg-transparent pr-8"
                    />
                    <button
                      onClick={() => handleDeleteParam(key)}
                      className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Input
                    value={value}
                    onChange={(e) => handleUpdateParam(key, e.target.value)}
                    className="font-mono bg-transparent"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 