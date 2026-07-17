"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/data/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const [logoFailed, setLogoFailed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Diviser les liens de navigation pour le mode flottant
  const visibleItems = navigationItems.slice(0, 5); // Accueil, En ligne, Afrique, Europe, Autres pays
  const hiddenItems = navigationItems.slice(5); // Guide du Bac Français, Inscription candidat libre, Actualités, Contact

  return (
    <header
      className={`w-full transition-all duration-300 left-0 right-0 ${isScrolled
        ? "fixed top-0 z-50 bg-white border-b border-[var(--border-color)] shadow-md py-3.5"
        : "relative bg-transparent py-5"
        }`}
    >
      <div
        className={`transition-all duration-300 ${isScrolled
          ? "mx-0 px-0"
          : "mx-auto max-w-[1400px] px-4"
          }`}
      >
        <div
          className={`transition-all duration-300 bg-white ${isScrolled
            ? "rounded-none shadow-none border-none px-4 sm:px-6 lg:px-8 py-2"
            : "rounded-2xl border border-[var(--border-color)] shadow-lg px-4 sm:px-6 lg:px-8 py-2.5 xl:py-3 xl:px-8 2xl:px-10"
            }`}
        >
          {/* Ligne décorative dégradée tricolore - visible uniquement sur la carte flottante */}
          {!isScrolled && (
            <div
              className="h-[4px] w-full bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-red)] to-[var(--primary-blue)] rounded-full -mt-2.5 mb-2.5 xl:-mt-3 xl:mb-3"
              style={{
                marginLeft: "calc(-1 * var(--padding-x, 1.5rem))",
                width: "calc(100% + (2 * var(--padding-x, 1.5rem)))",
              }}
            />
          )}

          <div className="flex items-center justify-between gap-2 xl:gap-3 2xl:gap-5">
            {/* Logo et titre - CONSERVÉS GRANDS MÊME AU SCROLL */}
            <Link href="/" className="group flex shrink-0 items-center gap-2 sm:gap-3 2xl:gap-4">
              {!logoFailed ? (
                <Image
                  src="/img/MBF_logo.jpg"
                  alt="Logo Mon Bac Français"
                  width={450}
                  height={450}
                  className={`object-contain transition-all duration-300 ${isScrolled
                    ? "h-16 w-16 sm:h-20 sm:w-20 xl:h-22 xl:w-22"
                    : "h-12 w-16 sm:h-20 sm:w-20 xl:h-22 xl:w-22"
                    }`}
                  onError={() => setLogoFailed(true)}
                  priority
                />
              ) : (
                <span className={`inline-flex items-center justify-center rounded-xl border border-[var(--border-color)] bg-white font-bold text-[var(--primary-blue)] shadow-sm text-sm transition-all duration-300 ${isScrolled
                  ? "h-16 w-16 sm:h-20 sm:w-20 xl:h-22 xl:w-22"
                  : "h-16 w-16 sm:h-20 sm:w-20 xl:h-22 xl:w-22"
                  }`}>
                  MBF
                </span>
              )}
              <div className="flex flex-col">
                <span className={`font-extrabold tracking-tight text-[var(--primary-blue)] transition-all duration-300 ${isScrolled
                  ? "text-sm sm:text-base xl:text-lg 2xl:text-xl"
                  : "text-base sm:text-lg xl:text-xl"
                  }`}>
                  monbacfrancais.com
                </span>
                <span className={`font-medium text-[var(--text-secondary)] transition-all duration-300 ${isScrolled
                  ? "text-[10px] sm:text-xs xl:text-xs"
                  : "text-[10px] sm:text-xs xl:text-sm"
                  }`}>
                  Bac Français en candidat libre
                </span>
              </div>
            </Link>

            {/* Navigation Bureau - POLICE AGRANDIE MÊME AU SCROLL */}
            <nav className="hidden items-center gap-0.5 xl:gap-1.5 xl:flex">
              {isScrolled ? (
                // Quand on scrolle, on affiche tous les liens en grand en ligne
                navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-lg px-2.5 py-2 text-xs xl:text-[12px] 2xl:text-[14px] font-bold transition-all duration-200 shrink-0 whitespace-nowrap ${isActive
                        ? "bg-[var(--primary-blue)] text-white shadow-sm"
                        : "text-[var(--text-secondary)] hover:bg-[var(--blue-pale)] hover:text-[var(--primary-blue)]"
                        }`}
                    >
                      {item.label}
                    </Link>
                  );
                })
              ) : (
                // Position haute (flottante) : premiers liens en ligne + menu déroulant "Plus"
                <div className="flex items-center gap-0.5 xl:gap-1.5 relative">
                  {visibleItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-lg px-2 py-1.5 text-xs xl:text-[11px] 2xl:text-[13px] font-bold transition-all duration-200 shrink-0 whitespace-nowrap ${isActive
                          ? "bg-[var(--primary-blue)] text-white shadow-sm"
                          : "text-[var(--text-secondary)] hover:bg-[var(--blue-pale)] hover:text-[var(--primary-blue)]"
                          }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  {/* Bouton de dropdown "Plus" */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs xl:text-[11px] 2xl:text-[13px] font-bold transition-all duration-200 text-[var(--text-secondary)] hover:bg-[var(--blue-pale)] hover:text-[var(--primary-blue)] ${dropdownOpen ? "bg-[var(--blue-pale)] text-[var(--primary-blue)]" : ""
                        }`}
                    >
                      <span>Plus</span>
                      <svg
                        className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Menu déroulant */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-[var(--border-color)] bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        {hiddenItems.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setDropdownOpen(false)}
                              className={`block px-4 py-2.5 text-xs xl:text-xs 2xl:text-sm font-bold transition-all duration-150 ${isActive
                                ? "bg-[var(--primary-blue)] text-white"
                                : "text-[var(--text-secondary)] hover:bg-[var(--blue-pale)] hover:text-[var(--primary-blue)]"
                                }`}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </nav>

            {/* Bouton CTA - S'inscrire */}
            <Link
              href="/inscription"
              className="ml-auto xl:ml-0 shrink-0 rounded-xl bg-[var(--primary-red)] px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm font-bold uppercase tracking-wider text-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-[var(--red-dark)] hover:scale-[1.02] active:scale-[0.98]"
            >
              S&apos;inscrire
            </Link>
          </div>

          {/* Navigation Mobile / Tablette */}
          <nav className="mt-4 flex gap-2.5 overflow-x-auto pb-1.5 xl:hidden no-scrollbar">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-lg px-3.5 py-2 text-[12px] font-bold transition-all duration-200 whitespace-nowrap ${isActive
                    ? "bg-[var(--primary-blue)] text-white"
                    : "border border-[var(--border-color)] bg-white text-[var(--text-secondary)] hover:bg-[var(--blue-pale)] hover:text-[var(--primary-blue)]"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
