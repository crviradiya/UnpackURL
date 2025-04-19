import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'URL Analysis Blog: Guides, Tutorials & Best Practices',
  description: 'Expert guides, tutorials, and best practices on URL analysis, decoding, query parameters, and web development. Expand your technical knowledge with in-depth articles from the UnpackURL team.',
  keywords: ['url analysis blog', 'url decoding tutorials', 'query parameter guides', 'web development blog', 'url structure articles', 'technical tutorials'],
  alternates: {
    canonical: '/blog',
  },
};

const blogPosts = [
  {
    id: 'url-decoding-guide',
    title: 'Complete Guide to URL Decoding: Parameters, Components & Best Practices',
    description: 'Learn how to effectively decode and analyze URLs, understand query parameters, and troubleshoot common URL issues with this comprehensive guide.',
    date: 'November 15, 2023',
    readTime: '12 min read',
    slug: '/blog/url-decoding-guide',
  },
  {
    id: 'nested-url-parameters',
    title: 'Mastering Nested URL Parameters: Advanced Techniques',
    description: 'Explore complex URL structures with nested parameters and learn efficient decoding strategies for multilayered URLs.',
    date: 'December 5, 2023',
    readTime: '10 min read',
    slug: '#',
    comingSoon: true,
  },
  {
    id: 'url-security',
    title: 'URL Security: Protecting Against Parameter Tampering and Injection',
    description: 'Essential security practices for handling URLs in web applications, including validation techniques and common vulnerability prevention.',
    date: 'December 20, 2023',
    readTime: '15 min read',
    slug: '#',
    comingSoon: true,
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">URL Analysis Blog</h1>
          <p className="text-xl text-gray-400">
            Expert guides, tutorials, and insights on URL analysis, decoding, and web development
          </p>
        </header>
        
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="border-b border-gray-800 pb-12 last:border-0">
              <Link href={post.comingSoon ? '#' : post.slug} className="no-underline">
                <div className="group">
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                      {post.comingSoon && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded text-xs">Coming Soon</span>
                        </>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors mb-3">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-400">
                      {post.description}
                    </p>
                  </div>
                  
                  {!post.comingSoon && (
                    <div className="flex items-center font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                      Read Article <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Looking for more URL analysis insights?</h2>
          <p className="text-gray-400 mb-6">
            Try our powerful URL decoding and analysis tool to explore and manipulate URL structures with ease.
          </p>
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium">
            Try UnpackURL Now <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
} 