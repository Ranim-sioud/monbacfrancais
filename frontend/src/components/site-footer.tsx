import Link from "next/link";
import { navigationItems } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-gray-900 bg-[var(--blue-dark)] text-gray-300">
      {/* Ligne décorative dégradée tricolore */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-red)] to-[var(--primary-blue)] opacity-90" />

      {/* Effet d'éclairage radial en arrière-plan */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(219,26,15,0.06),transparent_70%)]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* 1. Brand Column */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-base font-bold text-white shadow-md">
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,207,232,0.22),transparent_58%)]" />
                <span className="relative tracking-wider">MBF</span>
              </span>
              <div>
                <p className="font-bold text-lg tracking-tight text-white">Mon Bac Français</p>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--primary-red)]">monbacfrancais.com</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-300">
              La plateforme dédiée au Bac Français en candidat libre depuis l'étranger.
              Préparez votre examen avec clarté, méthode et confiance.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full border border-blue-900 bg-blue-950/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-blue-300">
                Luxe académique
              </span>
              <span className="rounded-full border border-red-900 bg-red-950/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-red-300">
                Candidat libre
              </span>
            </div>
          </div>

          {/* 2. Navigation Column */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-[var(--primary-blue)]" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                Navigation
              </h3>
            </div>
            <ul className="space-y-2.5">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-gray-300 transition-all duration-200 hover:text-[var(--primary-red)] hover:translate-x-1"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-600 transition-all duration-200 group-hover:w-3 group-hover:bg-[var(--primary-red)]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Services Column */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-[var(--primary-red)]" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                Services
              </h3>
            </div>
            <ul className="space-y-2.5">
              {[
                { label: "Inscription", href: "/inscription" },
                { label: "Contact & Support", href: "/contact" },
                { label: "Actualités du Bac", href: "/actualites" },
                { label: "Guide Complet", href: "/guide-bac-francais" }
              ].map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="group flex items-center gap-2 text-sm text-gray-300 transition-all duration-200 hover:text-[var(--primary-red)] hover:translate-x-1"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-600 transition-all duration-200 group-hover:w-3 group-hover:bg-[var(--primary-red)]" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Column */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary-red)] mb-4">
              Support Premium
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-base">📧</span>
                <div className="overflow-hidden">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Email</p>
                  <a href="mailto:contact@monbacfrancais.com" className="text-xs font-medium text-white hover:text-[var(--primary-red)] transition truncate block">
                    contact@monbacfrancais.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-base">📱</span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">WhatsApp</p>
                  <a href="https://wa.me/+33619684699" className="text-xs font-medium text-white hover:text-green-400 transition block">
                    +33 6 19 68 46 99
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-base">🕐</span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Horaires</p>
                  <p className="text-xs font-medium text-white">Lun - Ven, 9h - 18h</p>
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium mb-3">Suivez-nous</p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61591231507628"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-[var(--primary-blue)] transition animate-none"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/mon_bac_francais"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white hover:opacity-90 transition"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} Mon Bac Français. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Mentions légales", href: "/mentions-legales" },
                { label: "Confidentialité", href: "/politique-confidentialite" },
                { label: "CGU", href: "/cgu" }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-400 transition hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}