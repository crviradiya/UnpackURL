import Link from "next/link";
import { siteConfig } from "@/constants/site";
import { ThemeToggleClient } from "@/components/ui/ThemeToggleClient";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggleClient />
          </nav>
        </div>
      </div>
    </nav>
  );
} 