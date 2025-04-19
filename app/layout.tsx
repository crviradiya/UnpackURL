import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "@/styles/globals.css";
import { Toaster } from 'sonner';

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
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark">
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster richColors closeButton theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
