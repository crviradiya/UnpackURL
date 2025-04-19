import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "@/styles/globals.css";
import { Toaster } from 'sonner';
import { WebAppJsonLd } from "./JsonLd";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "UnpackURL - URL Analysis and Unpacking Tool",
    template: "%s | UnpackURL"
  },
  description: "Unpack and analyze URLs with ease. Get detailed insights, metadata, and security information for any URL instantly.",
  keywords: ["URL analysis", "URL unpacking", "URL metadata", "URL security", "URL inspection", "web analysis tool"],
  authors: [{ name: "UnpackURL Team" }],
  creator: "UnpackURL",
  publisher: "UnpackURL",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "UnpackURL - URL Analysis and Unpacking Tool",
    description: "Unpack and analyze URLs with ease. Get detailed insights, metadata, and security information for any URL instantly.",
    siteName: "UnpackURL",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UnpackURL - URL Analysis Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UnpackURL - URL Analysis and Unpacking Tool",
    description: "Unpack and analyze URLs with ease. Get detailed insights, metadata, and security information for any URL instantly.",
    images: ["/og-image.png"],
    creator: "@unpackurl",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="UnpackURL" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UnpackURL" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Preconnect to essential domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured data */}
        <WebAppJsonLd />
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXX'}');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXX'}`}
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* Premium gradient background */}
        <div className="gradient-bg"></div>
        
        <ThemeProvider defaultTheme="dark">
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
          <Toaster richColors closeButton theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
