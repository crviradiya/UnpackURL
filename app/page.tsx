import { Metadata } from 'next'
import { UrlParser } from "@/components/unpack/UrlParser";
import { siteConfig } from "@/constants/site";
import { FAQJsonLd, HowToJsonLd } from './JsonLd';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'UnpackURL - Powerful URL Analysis & Decoding Tool for Developers',
  description: 'Decode, analyze, parse, and edit URL query parameters with ease. The most powerful URL inspector for developers and web professionals. Free, fast, and privacy-friendly.',
  keywords: ['URL decoder', 'URL parser', 'URL analysis tool', 'query parameter editor', 'URL inspector', 'URL comparison tool', 'developer tools', 'web development tools'],
}

export default function Home() {
  return (
    <>
      {/* Structured data for FAQ and HowTo */}
      <FAQJsonLd />
      <HowToJsonLd />
      
      <section className="container py-12 space-y-8 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Unpack</span> URLs with Precision
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Decode, analyze, and edit URL query parameters with the most powerful URL inspection tool for developers and web professionals.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center mb-12">
            <Button size="lg" className="sm:w-auto">
              <Link href="#tool">Try It Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="sm:w-auto">
              <Link href="#features">Explore Features</Link>
            </Button>
          </div>
        </div>
        
        {/* Main tool component goes here */}
        <div id="tool" className="mb-20">
          <UrlParser />
        </div>
        
        {/* Features section */}
        <section id="features" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Powerful URL Analysis Features
              </h2>
              <p className="mt-4 text-xl text-gray-400">
                Everything you need to decode, inspect, and manipulate URLs
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Complete URL Parsing</h3>
                <p className="text-gray-400">
                  Instantly break down any URL into its components: protocol, hostname, port, path, and query parameters.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Edit Query Parameters</h3>
                <p className="text-gray-400">
                  Modify any URL parameter with ease. Add, edit, or delete parameters and see results in real-time.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Compare URLs</h3>
                <p className="text-gray-400">
                  Side-by-side URL comparison helps you spot differences in structure and parameters quickly.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Nested URL Handling</h3>
                <p className="text-gray-400">
                  Decode URLs inside query parameters with recursive parsing for complete visibility.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">JSON Format View</h3>
                <p className="text-gray-400">
                  See the complete URL structure in clean JSON format for easy understanding and debugging.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Privacy-First Design</h3>
                <p className="text-gray-400">
                  All processing happens in your browser. Your URL data never leaves your device.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works section */}
        <section id="how-it-works" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                How to Decode URLs with UnpackURL
              </h2>
              <p className="mt-4 text-xl text-gray-400">
                Simple steps to analyze any URL
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Step 1 */}
              <div className="text-center" id="step1">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-400">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Paste Your URL</h3>
                <p className="text-gray-400">
                  Enter or paste any URL into the input field at the top of the tool.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center" id="step2">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">View Components</h3>
                <p className="text-gray-400">
                  See the URL broken down into protocol, host, path, and parameters.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center" id="step3">
                <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-400">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Edit Parameters</h3>
                <p className="text-gray-400">
                  Modify any part of the URL with our intuitive editor interface.
                </p>
              </div>
              
              {/* Step 4 */}
              <div className="text-center" id="step4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-400">4</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Copy New URL</h3>
                <p className="text-gray-400">
                  Click the copy button to use your modified URL anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-8">
              {/* FAQ Item 1 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-2">What is UnpackURL?</h3>
                <p className="text-gray-400">
                  UnpackURL is a developer-friendly web tool designed to decode, parse, edit, and compare URL query parameters with precision and ease. It helps you understand and manipulate complex URLs without any hassle.
                </p>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-2">How do I analyze a URL with UnpackURL?</h3>
                <p className="text-gray-400">
                  Simply paste your URL into the input field at the top of the page. UnpackURL will automatically parse and display all components, including protocol, host, path, and query parameters in an easy-to-understand format.
                </p>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-2">Can I edit URL parameters with UnpackURL?</h3>
                <p className="text-gray-400">
                  Yes! UnpackURL allows you to edit any URL component, including query parameters. Changes update in real-time, and you can copy the new URL with a single click.
                </p>
              </div>
              
              {/* FAQ Item 4 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-2">Does UnpackURL support comparing multiple URLs?</h3>
                <p className="text-gray-400">
                  Absolutely! Use the Compare mode to analyze two URLs side-by-side and identify differences in their structure and parameters.
                </p>
              </div>
              
              {/* FAQ Item 5 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-2">Is UnpackURL free to use?</h3>
                <p className="text-gray-400">
                  Yes, UnpackURL is completely free to use with no limitations. No account or registration required.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to decode your URLs?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Start using the most powerful URL analysis tool today. No signup required.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-white/90">
                <Link href="#tool">Try UnpackURL Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
