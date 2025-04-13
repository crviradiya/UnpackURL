export const siteConfig = {
  name: "UnpackURL",
  description: "A powerful tool to analyze, unpack, and compare URLs for better understanding and security.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "https://unpackurl.com/og.jpg",
  links: {
    github: "https://github.com/crviradiya/unpackurl",
    twitter: "https://twitter.com/ChiragrViradiya",
  },
  features: [
    "URL parsing and analysis",
    "Query parameter editing",
    "URL comparison",
    "JSON representation",
    "Dark mode support",
    "Responsive design",
  ],
  author: {
    name: "Chirag Viradiya",
    url: "https://github.com/crviradiya",
  },
} 