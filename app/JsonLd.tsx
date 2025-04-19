import React from 'react';

interface JsonLdProps {
  type: 'WebApplication' | 'FAQPage' | 'BreadcrumbList' | 'HowTo';
  data: Record<string, unknown>;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebAppJsonLd() {
  const data = {
    name: 'UnpackURL',
    alternateName: 'URL Analysis Tool',
    description: 'Decode, analyze, and edit URL query parameters with ease. Perfect for developers and web professionals.',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '256',
    },
    featureList: 'URL decoding, query parameter editing, URL comparison, nested parameter handling',
    screenshot: process.env.NEXT_PUBLIC_APP_URL + '/og-image.png',
    softwareVersion: '1.0',
  };

  return <JsonLd type="WebApplication" data={data} />;
}

export function FAQJsonLd() {
  const data = {
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is UnpackURL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UnpackURL is a developer-friendly web tool designed to decode, parse, edit, and compare URL query parameters with precision and ease.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I analyze a URL with UnpackURL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply paste your URL into the input field. UnpackURL will automatically parse and display all components, including protocol, host, path, and query parameters in an easy-to-understand format.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I edit URL parameters with UnpackURL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! UnpackURL allows you to edit any URL component, including query parameters. Changes update in real-time, and you can copy the new URL with a single click.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does UnpackURL support comparing multiple URLs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Use the Compare mode to analyze two URLs side-by-side and identify differences in their structure and parameters.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is UnpackURL free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, UnpackURL is completely free to use with no limitations. No account or registration required.',
        },
      },
    ],
  };

  return <JsonLd type="FAQPage" data={data} />;
}

export function HowToJsonLd() {
  const data = {
    name: 'How to Decode and Edit URL Query Parameters',
    description: 'Step-by-step guide for analyzing and editing URL components with UnpackURL',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Paste your URL',
        text: 'Enter or paste your full URL into the input field at the top of the page',
        image: process.env.NEXT_PUBLIC_APP_URL + '/step1.png',
        url: process.env.NEXT_PUBLIC_APP_URL + '#step1',
      },
      {
        '@type': 'HowToStep',
        name: 'View decoded components',
        text: 'Review the automatically parsed URL components displayed below the input',
        image: process.env.NEXT_PUBLIC_APP_URL + '/step2.png',
        url: process.env.NEXT_PUBLIC_APP_URL + '#step2',
      },
      {
        '@type': 'HowToStep',
        name: 'Edit parameters as needed',
        text: 'Click on any parameter value to edit it directly, or add new parameters with the + button',
        image: process.env.NEXT_PUBLIC_APP_URL + '/step3.png',
        url: process.env.NEXT_PUBLIC_APP_URL + '#step3',
      },
      {
        '@type': 'HowToStep',
        name: 'Copy the new URL',
        text: 'Click the Copy URL button to copy the edited URL to your clipboard',
        image: process.env.NEXT_PUBLIC_APP_URL + '/step4.png',
        url: process.env.NEXT_PUBLIC_APP_URL + '#step4',
      },
    ],
  };

  return <JsonLd type="HowTo" data={data} />;
} 