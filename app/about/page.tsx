import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About UnpackURL - The Ultimate URL Analysis Tool",
  description:
    "UnpackURL is a developer-focused web tool designed to decode, parse, edit, and compare URL query parameters with precision and ease. Learn about our mission, features, and how our tool can help streamline your development process.",
  keywords: [
    "about unpackurl",
    "url analysis tool",
    "query parameter editor",
    "url decoder about",
    "url parsing tool",
    "developer tools",
    "web development utilities",
  ],
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-8">
          About UnpackURL
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-gray-400">
            UnpackURL is a powerful, privacy-focused URL analysis tool built by
            developers, for developers.
          </p>

          <h2>Our Mission</h2>
          <p>
            At UnpackURL, we believe that URL analysis and manipulation should
            be simple, fast, and accessible to everyone. We built this tool to
            solve the common frustrations developers face when working with
            complex URLs, nested query parameters, and encoded values.
          </p>

          <h2>What Makes UnpackURL Different</h2>
          <p>
            Unlike other URL tools, UnpackURL offers a comprehensive approach to
            URL analysis with a focus on:
          </p>

          <ul>
            <li>
              <strong>Complete URL Component Breakdown</strong>
              {` - We don't just decode query parameters; we break down the entire URL 
              structure for full visibility.`}
            </li>
            <li>
              <strong>Side-by-Side Comparison</strong> - Our unique comparison
              mode makes it easy to spot differences between URLs.
            </li>
            <li>
              <strong>Recursive Parsing</strong> - We handle nested URLs within
              query parameters, a common challenge in modern web applications.
            </li>
            <li>
              <strong>Real-time Editing</strong> - Make changes to any part of
              the URL and see instant updates.
            </li>
            <li>
              <strong>Privacy-First Approach</strong> - All processing happens
              in your browser. Your URLs and data never leave your device.
            </li>
          </ul>

          <h2>Use Cases</h2>
          <p>
            UnpackURL was designed with real-world developer needs in mind. Our
            tool is particularly helpful for:
          </p>

          <ul>
            <li>Debugging API requests and responses</li>
            <li>Analyzing and modifying tracking parameters</li>
            <li>Testing different URL configurations</li>
            <li>Understanding complex redirect URLs</li>
            <li>Comparing URL structures across environments</li>
            <li>Extracting and modifying query parameters for testing</li>
          </ul>

          <h2>Behind UnpackURL</h2>
          <p>
            UnpackURL was built using modern web technologies to ensure a fast,
            responsive experience:
          </p>

          <ul>
            <li>Next.js for server-side rendering and optimal performance</li>
            <li>TypeScript for type safety and better code quality</li>
            <li>Tailwind CSS for a clean, responsive interface</li>
            <li>Client-side processing for maximum privacy and security</li>
          </ul>

          <h2>Future Roadmap</h2>
          <p>
            We're constantly working to improve UnpackURL with new features and
            enhancements. Some upcoming additions include:
          </p>

          <ul>
            <li>URL history with local storage</li>
            <li>Enhanced JSON diff view for better comparison</li>
            <li>Shareable links to URL analyses</li>
            <li>Additional URL validation tools</li>
            <li>Support for more complex URL patterns</li>
          </ul>

          <div className="mt-12 not-prose">
            <Link href="/" className="inline-flex items-center">
              <Button size="lg" className="gap-2">
                Try UnpackURL Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
