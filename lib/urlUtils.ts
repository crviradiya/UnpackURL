import { UrlAnalysis } from "@/types";

export function parseUrl(url: string): UrlAnalysis {
  try {
    const parsedUrl = new URL(url);
    const params: Record<string, string> = {};
    parsedUrl.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    // Extract port from hostname if present
    let port = "";
    let hostname = parsedUrl.hostname;
    
    if (parsedUrl.port) {
      port = parsedUrl.port;
    } else if (parsedUrl.protocol === "https:") {
      port = "443";
    } else if (parsedUrl.protocol === "http:") {
      port = "80";
    }

    return {
      originalUrl: url,
      parsedUrl: {
        protocol: parsedUrl.protocol,
        hostname: hostname,
        port: port,
        pathname: parsedUrl.pathname,
        search: parsedUrl.search,
        hash: parsedUrl.hash,
      },
      parameters: params,
      isValid: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      originalUrl: url,
      parsedUrl: {
        protocol: "",
        hostname: "",
        port: "",
        pathname: "",
        search: "",
        hash: "",
      },
      parameters: {},
      isValid: false,
      timestamp: new Date().toISOString(),
    };
  }
}

export function reconstructUrl(analysis: UrlAnalysis): string {
  if (!analysis || !analysis.isValid) return "";
  
  const { protocol, hostname, port, pathname, hash } = analysis.parsedUrl;
  const searchParams = new URLSearchParams();
  
  Object.entries(analysis.parameters).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  
  const search = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const portString = port && port !== "80" && port !== "443" ? `:${port}` : "";
  
  return `${protocol}//${hostname}${portString}${pathname}${search}${hash}`;
}

export function getUrlComponents(analysis: UrlAnalysis) {
  if (!analysis || !analysis.isValid) return [];
  
  const { protocol, hostname, port, pathname, search, hash } = analysis.parsedUrl;
  
  const components = [
    { key: "Protocol", value: protocol, isCollapsed: false },
    { key: "Host", value: hostname, isCollapsed: false },
    { key: "Port", value: port, isCollapsed: false },
    { key: "Path", value: pathname, isCollapsed: false },
    { key: "Query", value: search, isCollapsed: false },
    { key: "Hash", value: hash, isCollapsed: false },
  ];
  
  return components;
} 