"use client";

import { useState, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CollapsibleSectionProps {
  children: ReactNode;
  title?: string;
  className?: string;
  showClose?: boolean;
  onClose?: () => void;
  defaultCollapsed?: boolean;
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export function CollapsibleSection({
  children,
  title,
  className = "",
  showClose = false,
  onClose,
  defaultCollapsed = false,
  onCollapseChange,
}: CollapsibleSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={cn(
      "rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden",
      className
    )}>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800">
        {title && (
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {title}
          </h3>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {showClose && onClose && (
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isCollapsed ? "rotate-0" : "rotate-180"
              )}
            />
          </button>
        </div>
      </div>
      <div
        className={cn(
          "transition-all duration-200 overflow-hidden",
          isCollapsed ? "max-h-0" : "max-h-[5000px]"
        )}
      >
        <div className="p-4 bg-white dark:bg-slate-800">
          {children}
        </div>
      </div>
    </div>
  );
} 