"use client";

import React from "react";
import { UrlAnalysis } from "@/types";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

interface JsonViewProps {
  analysis: UrlAnalysis;
  className?: string;
}

export function JsonView({ analysis, className }: JsonViewProps) {
  const jsonData = {
    protocol: analysis.parsedUrl.protocol,
    host: analysis.parsedUrl.hostname,
    port: analysis.parsedUrl.port,
    path: analysis.parsedUrl.pathname,
    query: analysis.parameters,
  };

  const renderJsonValue = (value: any, indent: number = 0): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-slate-500">null</span>;
    }

    if (typeof value === 'string') {
      return <span className="text-green-400">"{value}"</span>;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      return <span className="text-blue-400">{value.toString()}</span>;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return <span>[]</span>;
      return (
        <span>
          [
          <div style={{ marginLeft: `${indent + 2}rem` }}>
            {value.map((item, i) => (
              <div key={i}>
                {renderJsonValue(item, indent + 2)}
                {i < value.length - 1 && ","}
              </div>
            ))}
          </div>
          ]
        </span>
      );
    }

    if (typeof value === 'object') {
      const entries = Object.entries(value);
      if (entries.length === 0) return <span>{"{}"}</span>;
      return (
        <span>
          {"{"}
          <div style={{ marginLeft: `${indent + 2}rem` }}>
            {entries.map(([key, val], i) => (
              <div key={key}>
                <span className="text-red-400">"{key}"</span>: {renderJsonValue(val, indent + 2)}
                {i < entries.length - 1 && ","}
              </div>
            ))}
          </div>
          {"}"}
        </span>
      );
    }

    return <span>{String(value)}</span>;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Query Params as JSON</h3>
      <div className="bg-slate-900 rounded-lg p-4">
        <pre className="font-mono text-sm text-slate-100 whitespace-pre-wrap overflow-x-auto break-all">
          {renderJsonValue(jsonData)}
        </pre>
      </div>
    </div>
  );
} 