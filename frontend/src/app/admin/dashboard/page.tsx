"use client";

import Link from "next/link";
import { AdminGuard } from "@/components/admin-guard";
import { useAuth } from "@/lib/auth-context";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <AdminGuard>
      {/* Welcome */}
      <div className="mb-8 rounded-[2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(234,244,255,0.94))] p-6 shadow-[0_16px_40px_rgba(0,85,164,0.10)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
          Bienvenue
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
          Bonjour, {user?.name} 👋
        </h2>
        <p className="mt-2 text-base text-[var(--text-secondary)]">
          Gérez les agences, les actualités et les utilisateurs depuis cet
          espace.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          {
            title: "Agences",
            description: "Gérer les agences partenaires et les résultats de scraping.",
            href: "/admin/agences",
            icon: "🏢",
          },
          {
            title: "Actualités",
            description: "Publier, modifier et gérer les articles et brouillons.",
            href: "/admin/actualites",
            icon: "📰",
          },
          {
            title: "Utilisateurs",
            description: "Gérer les comptes et les rôles des utilisateurs.",
            href: "/admin/utilisateurs",
            icon: "👥",
          },
          {
            title: "Inscriptions",
            description: "Voir et gérer les inscriptions des candidats.",
            href: "/admin/inscriptions",
            icon: "📝",
          },
          {
            title: "Scraper",
            description: "Lancer le scraping automatique des agences et actualités.",
            href: "/admin/scraper",
            icon: "🔄",
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-[1.8rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-7 shadow-[0_10px_28px_rgba(0,85,164,0.08)] transition hover:translate-y-[-2px] hover:shadow-[0_16px_40px_rgba(0,85,164,0.14)]"
          >
            <span className="text-3xl">{card.icon}</span>
            <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--primary-blue)]">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {card.description}
            </p>
          </Link>
        ))}
      </div>

    </AdminGuard>
  );
}
