import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  highlights = [],
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--white)]">
      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="space-y-7">
          <span className="inline-flex rounded-md border border-[var(--border-color)] bg-[var(--gray-50)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-blue)]">
            {eyebrow}
          </span>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/inscription"
              className="rounded-md bg-[var(--primary-blue)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--white)] shadow-sm transition hover:bg-[var(--blue-dark)]"
            >
              Inscription
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-[var(--border-color)] bg-[var(--white)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary-red)] transition hover:bg-[var(--red-light)]"
            >
              Nous appeler
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
            Points clés
          </p>
          <div className="mt-5 grid gap-3">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-md border border-[var(--border-color)] bg-[var(--white)] px-4 py-4 text-sm text-[var(--text-secondary)]"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

