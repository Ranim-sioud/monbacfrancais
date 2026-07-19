"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { TopBar } from "@/components/top-bar";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) {
    return <>{children}</>;
  }

  const isHomepage = pathname === "/";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(1, 48, 120,0.13),transparent_58%)]" />
      <div className="pointer-events-none absolute right-0 top-36 h-72 w-72 rounded-md bg-red-300/25 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-[28rem] h-72 w-72 rounded-md bg-red-300/25 blur-3xl" />

      <div
        className={`z-50 flex flex-col ${
          isHomepage
            ? isScrolled
              ? "fixed top-0 left-0 right-0 shadow-md"
              : "absolute inset-x-0 top-0"
            : "sticky top-0 bg-white"
        } ${isScrolled && !isHomepage ? "shadow-md" : ""}`}
      >
        <TopBar isScrolled={isScrolled} />
        <SiteHeader isScrolledOverride={isScrolled} />
      </div>

      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

