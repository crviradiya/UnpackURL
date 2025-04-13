export interface UrlAnalysis {
  originalUrl: string;
  parsedUrl: {
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
  };
  parameters: Record<string, string>;
  isValid: boolean;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface UrlComponent {
  key: string;
  value: string;
  isCollapsed: boolean;
}

export interface UrlComparison {
  left: UrlAnalysis | null;
  right: UrlAnalysis | null;
}

export type ViewMode = "single" | "compare"; 