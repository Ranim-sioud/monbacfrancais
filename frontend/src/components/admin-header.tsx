"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/agences", label: "Agences", icon: "🏢" },
  { href: "/admin/actualites", label: "Actualités", icon: "📰" },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: "👥" },
  { href: "/admin/inscriptions", label: "Inscriptions", icon: "📝" },
  { href: "/admin/scraper", label: "Scraper", icon: "🔄" },
];

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-4 bottom-4 z-50 border-b border-[var(--border-color)] bg-[var(--white)]/95 backdrop-blur">
      <div className="mx-auto max-w-full px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between pt-2 pb-4">
          <div className="flex items-center gap-2">
            <Link
              href="/admin/dashboard"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-blue)] text-xs font-bold text-[var(--white)] shadow-md"
            >
              MBF
            </Link>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[var(--text-primary)]">
                Administration
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Mon Bac Français
              </p>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex gap-1 overflow-x-auto">
            {adminNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-md border-b-2 px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "border-[var(--primary-blue)] bg-[var(--blue-light)] text-[var(--primary-blue)]"
                      : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border-color)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden text-right md:block">
              <p className="text-xs font-medium text-[var(--text-primary)]">
                {user?.name}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                {user?.email}
              </p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="rounded-md border border-[var(--border-color)] bg-[var(--white)] px-2 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition hover:bg-[var(--gray-50)] hover:text-[var(--primary-blue)]"
            >
              🌐 Site
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
              className="rounded-md border border-[var(--border-color)] bg-[var(--red-light)] px-2 py-1.5 text-xs font-medium text-[var(--primary-red)] transition hover:bg-[var(--red-light)]"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
