import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import type { PageContent } from "@/data/site-content";

type ContentPageProps = {
  content: PageContent;
  insertAfterHero?: React.ReactNode;
};

export function ContentPage({ content, insertAfterHero }: ContentPageProps) {
  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        highlights={content.highlights}
      />
      {insertAfterHero}

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-3">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[var(--border-color)] bg-[var(--white)] p-7 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                {stat.label}
              </p>
              <p className="mt-4 text-4xl font-semibold text-[var(--text-primary)]">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        {content.sections.map((section, index) => (
          <article
            key={section.title}
            className={`rounded-lg border p-8 ${
              index === 1
                ? "border-[var(--border-color)] bg-[var(--gray-50)]"
                : "border-[var(--border-color)] bg-[var(--white)]"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-blue)]">
              Module 0{index + 1}
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">{section.title}</h2>
            <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{section.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--white)] p-8 shadow-sm sm:p-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-blue)]">
              Questions fréquentes
            </p>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Les réponses essentielles</h2>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {content.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-md border border-[var(--border-color)] bg-[var(--white)] p-6"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{faq.question}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Transformez votre projet d'inscription en plan d'action concret"
        description="Mon Bac Français aide les élèves étrangers à clarifier les démarches, structurer la préparation et avancer avec confiance."
        primaryHref="/contact"
        primaryLabel="Contacter l'équipe"
        secondaryHref="/inscription-candidat-libre"
        secondaryLabel="Voir l'inscription"
      />
    </>
  );
}

