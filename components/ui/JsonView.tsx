"use client";

import { useState, useRef, useEffect } from "react";
import { formatJson } from "@/lib/utils";
import { CopyButton } from "@/components/ui/CopyButton";

interface JsonViewProps {
  data: Record<string, unknown>;
  isEditable?: boolean;
  onChange?: (data: Record<string, unknown>) => void;
  readOnly?: boolean;
  className?: string;
}

export function JsonView({ 
  data, 
  isEditable = false, 
  onChange, 
  readOnly = false,
  className = ""
}: JsonViewProps) {
  const [jsonString, setJsonString] = useState<string>(formatJson(data));
  const [isValid, setIsValid] = useState<boolean>(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Update the JSON string when the data prop changes
    setJsonString(formatJson(data));
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJsonString(value);
    
    try {
      // Try to parse the JSON to validate it
      const parsed = JSON.parse(value) as Record<string, unknown>;
      setIsValid(true);
      
      // Call the onChange callback if provided
      if (onChange) {
        onChange(parsed);
      }
    } catch {
      setIsValid(false);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [jsonString]);

  return (
    <div className={`relative ${className} bg-code-theme`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-code-theme">
          {isEditable ? "JSON (Editable)" : "JSON"}
          {!isValid && isEditable && (
            <span className="ml-2 text-destructive">Invalid JSON</span>
          )}
        </span>
        <CopyButton 
          text={jsonString} 
          size="sm" 
          variant="ghost" 
          label="Copy JSON"
          className="text-code-theme"
        />
      </div>
      
      <div className={`json-view relative ${!isValid && isEditable ? 'border border-destructive' : 'border border-zinc-200 dark:border-zinc-700'} bg-sub-code-theme rounded-md p-4`}>
        {isEditable ? (
          <textarea
            ref={textareaRef}
            value={jsonString}
            onChange={handleChange}
            className="w-full h-full min-h-[200px] bg-transparent resize-none font-mono text-sm p-0 border-0 focus:ring-0 focus:outline-none text-code-theme"
            spellCheck="false"
            readOnly={readOnly}
          />
        ) : (
          <pre className="whitespace-pre overflow-x-auto font-mono text-sm text-code-theme">{jsonString}</pre>
        )}
      </div>
    </div>
  );
} 