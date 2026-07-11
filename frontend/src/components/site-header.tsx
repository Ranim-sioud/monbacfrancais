"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/data/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-t border-b border-[var(--border-color)] bg-[var(--white)] shadow-sm">
      {/* Ligne décorative dégradée tricolore (Subtile & Moderne, comme au top du footer) */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-red)] to-[var(--primary-blue)] opacity-90" />
      <div className="w-full px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            {!logoFailed ? (
              <Image
                src="/img/logo_MBF.png"
                alt="Logo Mon Bac Français"
                width={300}
                height={300}
                className="h-20 w-20 object-contain sm:h-26 sm:w-26"
                onError={() => setLogoFailed(true)}
                priority
              />
            ) : (
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--white)] text-sm font-bold text-[var(--primary-blue)] shadow-sm sm:h-26 sm:w-26">
                MBF
              </span>
            )}
            <div className="flex flex-col">
              <span className="text-base font-bold text-[var(--primary-blue)] sm:text-lg md:text-xl">
                monbacfrancais.com
              </span>
              <span className="text-xs text-[var(--text-secondary)] sm:text-sm">
                Bac Français en candidat libre
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-[var(--primary-blue)] text-[var(--white)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--gray-100)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/inscription"
            className="ml-auto shrink-0 rounded-md bg-[var(--primary-red)] px-4 py-2 text-sm font-semibold text-[var(--white)] transition hover:bg-[var(--red-dark)] sm:px-6 sm:py-2.5"
          >
            S&apos;inscrire
          </Link>
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden no-scrollbar">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[var(--primary-blue)] text-[var(--white)]"
                    : "border border-[var(--border-color)] bg-[var(--white)] text-[var(--text-secondary)] hover:bg-[var(--gray-100)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}


