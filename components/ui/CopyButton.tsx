"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { copyToClipboard } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  label?: string;
  showIcon?: boolean;
  showText?: boolean;
  className?: string;
}

export function CopyButton({
  text,
  onCopy,
  variant = "outline",
  size = "default",
  label = "Copy",
  showIcon = true,
  showText = true,
  className = "",
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    
    if (success) {
      setIsCopied(true);
      toast.success("Copied to clipboard");
      
      // Call the onCopy callback if provided
      if (onCopy) onCopy();
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } else {
      toast.error("Failed to copy");
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      size={size}
      className={className}
      aria-label={label}
      title={label}
      type="button"
    >
      {showIcon && (
        isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )
      )}
      {showText && <span className={showIcon ? "ml-2" : ""}>{isCopied ? "Copied!" : label}</span>}
    </Button>
  );
} 