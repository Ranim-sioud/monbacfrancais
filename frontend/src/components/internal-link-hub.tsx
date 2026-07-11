import Link from "next/link";

const seoLinks = [
  {
    href: "/en-ligne",
    label: "Préparation bac français en ligne",
  },
  {
    href: "/inscription",
    label: "Inscription bac français candidat libre",
  },
  {
    href: "/afrique",
    label: "Bac français Afrique",
  },
  {
    href: "/europe",
    label: "Bac français Europe",
  },
  {
    href: "/autres-pays",
    label: "Bac français étranger",
  },
  {
    href: "/guide-bac-francais",
    label: "Guide du bac français candidat libre",
  },
];

type InternalLinkHubProps = {
  title?: string;
};

export function InternalLinkHub({
  title = "Ressources liées",
}: InternalLinkHubProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-[var(--border-color)] bg-gradient-to-br from-[var(--white)] to-[var(--blue-pale)] p-8 sm:p-10 shadow-md">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-red)]">
            Maillage interne
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--text-primary)]">{title}</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {seoLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--white)] px-5 py-4 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--primary-blue)] hover:bg-[var(--blue-light)] hover:text-[var(--primary-blue)] hover:shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--blue-light)] text-xs font-bold text-[var(--primary-blue)] transition group-hover:bg-[var(--primary-blue)] group-hover:text-[var(--white)]">
                →
              </span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
