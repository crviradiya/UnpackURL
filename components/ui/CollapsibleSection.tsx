"use client";

import { useState } from "react";
import { Plus, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
  onClose?: () => void;
  showClose?: boolean;
}

export function CollapsibleSection({
  title,
  children,
  defaultCollapsed = false,
  className,
  onClose,
  showClose = false,
}: CollapsibleSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className={cn(
      "border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? (
              <Plus className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            ) : (
              <Minus className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            )}
          </button>
          <span className="font-medium text-slate-900 dark:text-slate-100">{title}</span>
        </div>
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </button>
        )}
      </div>
      {!isCollapsed && (
        <div className="p-4 bg-white dark:bg-slate-900">
          {children}
        </div>
      )}
    </div>
  );
} 