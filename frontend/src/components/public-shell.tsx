"use client";

import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { TopBar } from "@/components/top-bar";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(1, 48, 120,0.13),transparent_58%)]" />
      <div className="pointer-events-none absolute right-0 top-36 h-72 w-72 rounded-md bg-red-300/25 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-[28rem] h-72 w-72 rounded-md bg-red-300/25 blur-3xl" />
      <TopBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

