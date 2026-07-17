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
    <section className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-gradient-to-br from-[var(--white)] via-[var(--white)] to-[var(--blue-light)] p-8 shadow-xl sm:p-12 lg:p-16">
        {/* Decorative background lights */}
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[var(--primary-blue)]/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--primary-red)]/5 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-[var(--border-color)] bg-[var(--red-light)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary-red)]">
              Appel à l&apos;action
            </span>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl leading-tight">
              {title}
            </h2>
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">{description}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Link
              href={primaryHref}
              className="rounded-xl bg-[var(--primary-red)] px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-[var(--white)] shadow-md hover:shadow-lg transition-all duration-200 hover:bg-[var(--red-dark)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="rounded-xl border-2 border-[var(--primary-blue)] bg-[var(--white)] px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-[var(--primary-blue)] shadow-sm hover:shadow-md transition-all duration-200 hover:bg-[var(--blue-pale)] hover:scale-[1.02] active:scale-[0.98]"
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


