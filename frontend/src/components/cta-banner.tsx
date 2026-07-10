import Link from "next/link";

type CtaBannerProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CtaBanner({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CtaBannerProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-gradient-to-br from-[var(--white)] to-[var(--blue-pale)] p-8 shadow-lg sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-red)]">
              Appel à l&apos;action
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{description}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href={primaryHref}
              className="rounded-lg bg-[var(--primary-red)] px-8 py-4 text-center text-sm font-semibold text-[var(--white)] shadow-md transition hover:bg-[var(--red-dark)] hover:shadow-lg"
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="rounded-lg border-2 border-[var(--primary-blue)] bg-[var(--white)] px-8 py-4 text-center text-sm font-semibold text-[var(--primary-blue)] transition hover:bg-[var(--blue-light)] hover:shadow-md"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}


