"use client";

import { useRouter } from "next/navigation";
import { siteConfig } from "@/constants/site";
import { ThemeToggleClient } from "@/components/ui/ThemeToggleClient";
import { resetUrlParser } from "@/components/unpack/UrlParser";

export function Navbar() {
  const router = useRouter();

  const handleLogoClick = () => {
    resetUrlParser(); // Reset all states
    router.push('/'); // Navigate to home page
    router.refresh(); // Refresh the page to clear URL hash
  };

  return (
    <nav className="border-b">
      <div className="container flex h-14 items-center">
        <button
          onClick={handleLogoClick}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <span className="font-bold">{siteConfig.name}</span>
        </button>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggleClient />
          </nav>
        </div>
      </div>
    </nav>
  );
}