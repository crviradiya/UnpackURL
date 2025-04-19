import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Copies text to clipboard with fallbacks for different browsers
 * @param text The text to copy
 * @returns Promise that resolves to true if copy was successful
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // First try the modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback to the older document.execCommand method
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    
    return successful;
  } catch (error) {
    console.error("Failed to copy text: ", error);
    return false;
  }
}

/**
 * Format a URL for display (truncate if too long)
 * @param url The URL to format
 * @param maxLength Maximum length before truncation
 * @returns Formatted URL string
 */
export function formatUrl(url: string, maxLength: number = 50): string {
  if (!url) return "";
  if (url.length <= maxLength) return url;
  
  // Find a good breaking point
  const middlePoint = Math.floor(maxLength / 2);
  return `${url.substring(0, middlePoint)}...${url.substring(url.length - middlePoint)}`;
}

/**
 * Format a JSON object as a pretty-printed string
 * @param obj Object to format as JSON
 * @returns Formatted JSON string
 */
export function formatJson(obj: any): string {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    console.error("Error formatting JSON:", error);
    return "{}";
  }
} 