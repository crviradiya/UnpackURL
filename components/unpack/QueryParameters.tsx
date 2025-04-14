"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Minus, Plus, X, Link, ChevronDown, ChevronRight } from "lucide-react";
import { UrlAnalysis } from "@/types";
import { cn } from "@/lib/utils";
import { parseUrl, reconstructUrl } from "@/lib/urlUtils";
import { JsonView } from "@/components/ui/JsonView";
import { toast } from "sonner";

interface QueryParametersProps {
  analysis: UrlAnalysis;
  onUpdate: (updatedAnalysis: UrlAnalysis) => void;
  nestingLevel?: number;
  parentKey?: string;
}

export function QueryParameters({
  analysis,
  onUpdate,
  nestingLevel = 0,
  parentKey = "",
}: QueryParametersProps) {
  const [params, setParams] = useState<Record<string, string>>(
    analysis.parameters
  );
  const [newParamKey, setNewParamKey] = useState("");
  const [newParamValue, setNewParamValue] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddParam, setShowAddParam] = useState(false);
  const [expandedNestedUrls, setExpandedNestedUrls] = useState<
    Record<string, boolean>
  >({});
  const [showJsonForParam, setShowJsonForParam] = useState<
    Record<string, boolean>
  >({});

  // Create a nesting label that shows the path of nested parameters
  const nestingLabel =
    nestingLevel > 0
      ? `Nested Parameters ${parentKey ? `(${parentKey})` : ""}`
      : "Query Parameters";

  // Function to check if a parameter value looks like a URL
  const isLikelyUrl = (value: string): boolean => {
    try {
      // Check if value starts with http:// or https:// or www.
      const urlPattern = /^(https?:\/\/|www\.)/i;
      if (!urlPattern.test(value)) return false;

      // Try to parse it as a URL
      new URL(value.startsWith("www.") ? `http://${value}` : value);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to get nested URL analysis
  const getNestedUrlAnalysis = (value: string): UrlAnalysis | null => {
    try {
      const url = value.startsWith("www.") ? `http://${value}` : value;
      return parseUrl(url);
    } catch (e) {
      return null;
    }
  };

  const handleAddParam = () => {
    if (!newParamKey.trim()) return;

    const updatedParams = {
      ...params,
      [newParamKey]: newParamValue,
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

    updatedAnalysis.parsedUrl.search = searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";

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

    updatedAnalysis.parsedUrl.search = searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";

    onUpdate(updatedAnalysis);
  };

  const handleUpdateParam = (key: string, value: string) => {
    const updatedParams = {
      ...params,
      [key]: value,
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

    updatedAnalysis.parsedUrl.search = searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";

    onUpdate(updatedAnalysis);
  };

  const toggleNestedUrl = (key: string) => {
    setExpandedNestedUrls((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleJsonView = (key: string) => {
    setShowJsonForParam((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Determine border and background colors based on nesting level
  const getLevelColor = () => {
    const colors = [
      "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20",
      "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20",
      "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20",
      "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20",
      "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20",
    ];
    return colors[nestingLevel % colors.length];
  };

  // Component for nested URL components
  const NestedUrlComponents = ({
    paramKey,
    paramValue,
  }: {
    paramKey: string;
    paramValue: string;
  }) => {
    const nestedAnalysis = getNestedUrlAnalysis(paramValue);
    if (!nestedAnalysis)
      return <div className="text-red-500 text-sm">Invalid URL format</div>;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center">
            <Link className="h-4 w-4 mr-1.5" />
            Nested URL Components
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleJsonView(paramKey)}
            className="h-6 px-2 text-xs text-slate-500"
          >
            {showJsonForParam[paramKey] ? (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Hide JSON
              </>
            ) : (
              <>
                <ChevronRight className="h-3 w-3 mr-1" />
                Show JSON
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Protocol
            </div>
            <Input
              value={nestedAnalysis.parsedUrl.protocol || ""}
              onChange={(e) => {
                const updatedAnalysis = { ...nestedAnalysis };
                updatedAnalysis.parsedUrl.protocol = e.target.value;

                // Update the parent URL parameter with the reconstructed URL
                const updatedUrl = reconstructUrl(updatedAnalysis);
                handleUpdateParam(paramKey, updatedUrl);
              }}
              className="h-9 font-mono text-sm bg-slate-100 dark:bg-slate-800"
              placeholder="—"
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Host
            </div>
            <Input
              value={nestedAnalysis.parsedUrl.hostname || ""}
              onChange={(e) => {
                const updatedAnalysis = { ...nestedAnalysis };
                updatedAnalysis.parsedUrl.hostname = e.target.value;

                // Update the parent URL parameter with the reconstructed URL
                const updatedUrl = reconstructUrl(updatedAnalysis);
                handleUpdateParam(paramKey, updatedUrl);
              }}
              className="h-9 font-mono text-sm bg-slate-100 dark:bg-slate-800"
              placeholder="—"
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Path
            </div>
            <Input
              value={nestedAnalysis.parsedUrl.pathname || ""}
              onChange={(e) => {
                const updatedAnalysis = { ...nestedAnalysis };
                updatedAnalysis.parsedUrl.pathname = e.target.value;

                // Update the parent URL parameter with the reconstructed URL
                const updatedUrl = reconstructUrl(updatedAnalysis);
                handleUpdateParam(paramKey, updatedUrl);
              }}
              className="h-9 font-mono text-sm bg-slate-100 dark:bg-slate-800"
              placeholder="—"
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Port
            </div>
            <Input
              value={nestedAnalysis.parsedUrl.port || ""}
              onChange={(e) => {
                const updatedAnalysis = { ...nestedAnalysis };
                updatedAnalysis.parsedUrl.port = e.target.value;

                // Update the parent URL parameter with the reconstructed URL
                const updatedUrl = reconstructUrl(updatedAnalysis);
                handleUpdateParam(paramKey, updatedUrl);
              }}
              className="h-9 font-mono text-sm bg-slate-100 dark:bg-slate-800"
              placeholder="—"
            />
          </div>
        </div>

        {Object.keys(nestedAnalysis.parameters).length > 0 && (
          <div className="mt-4 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden">
            <QueryParameters
              analysis={nestedAnalysis}
              onUpdate={(updatedNestedAnalysis) => {
                // When nested params are updated, update the current URL parameter
                const updatedUrl = reconstructUrl(updatedNestedAnalysis);
                handleUpdateParam(paramKey, updatedUrl);
              }}
              nestingLevel={nestingLevel + 1}
              parentKey={paramKey}
            />
          </div>
        )}

        {showJsonForParam[paramKey] && (
          <div className="mt-2">
            <JsonView
              analysis={nestedAnalysis}
              className="mt-4"
              defaultCollapsed={false}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "space-y-4",
        nestingLevel > 0 && "rounded-md overflow-hidden"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          nestingLevel > 0 && getLevelColor()
        )}
      >
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
          <h3
            className={cn(
              "font-semibold text-slate-900 dark:text-slate-100 ml-2",
              nestingLevel === 0 ? "text-lg" : "text-base"
            )}
          >
            {nestingLabel}
          </h3>
        </div>
        {nestingLevel === 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddParam(true)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <Plus className="h-4 w-4" />
            Add Parameter
          </Button>
        )}
      </div>

      <div
        className={cn(
          "relative pl-8 transition-all duration-200 transform origin-top",
          isCollapsed
            ? "opacity-0 scale-y-0 h-0 overflow-hidden"
            : "opacity-100 scale-y-100 pt-2 px-4"
        )}
      >
        {/* Main vertical line - connected to button */}
        <div className="absolute left-3 -top-8 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />

        <div className="space-y-4">
          {/* Add Parameter Form */}
          {showAddParam && nestingLevel === 0 && (
            <div className="relative left-4">
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
              <div key={key} className="relative mb-6 last:mb-0 left-4">
                {/* Horizontal line */}
                <div className="absolute left-[-20px] top-[20px] w-5 h-px bg-slate-200 dark:bg-slate-700" />

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
                  <div className="relative">
                    <Input
                      value={value}
                      onChange={(e) => handleUpdateParam(key, e.target.value)}
                      className={cn(
                        "font-mono bg-transparent pr-8",
                        isLikelyUrl(value) &&
                          "border-blue-300 dark:border-blue-600"
                      )}
                    />

                    {isLikelyUrl(value) && (
                      <div className="absolute right-2 top-2 flex space-x-1">
                        <button
                          onClick={() => toggleNestedUrl(key)}
                          className="flex items-center justify-center w-5 h-5 rounded bg-blue-100 dark:bg-blue-900 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                          title={
                            expandedNestedUrls[key]
                              ? "Collapse URL"
                              : "Analyze nested URL"
                          }
                        >
                          {expandedNestedUrls[key] ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Nested URL Analysis (shown when expanded) */}
                {isLikelyUrl(value) && expandedNestedUrls[key] && (
                  <div className="mt-3 ml-4 pt-3 border-l-2 border-blue-300 dark:border-blue-600 pl-4">
                    <NestedUrlComponents paramKey={key} paramValue={value} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
