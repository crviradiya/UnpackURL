import { Metadata } from 'next'
import { UrlParser } from "@/components/unpack/UrlParser";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: 'Home | UnpackURL',
  description: 'Unpack and analyze URLs with ease',
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="text-xl text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        
        <UrlParser />
        
        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold">About This Tool</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What is URL Parsing?</h3>
              <p className="text-muted-foreground">
                URL parsing is the process of breaking down a URL into its components, 
                such as protocol, hostname, path, and query parameters. This tool helps 
                you visualize and edit these components easily.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Common Use Cases</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Debugging API requests</li>
                <li>Analyzing tracking parameters</li>
                <li>Modifying redirect URLs</li>
                <li>Testing different query combinations</li>
                <li>Comparing URLs side by side</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Privacy & Security</h3>
            <p className="text-muted-foreground">
              This tool runs entirely in your browser. No data is sent to our servers 
              or stored anywhere. Your URLs remain private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
