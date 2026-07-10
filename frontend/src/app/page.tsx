import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner";
import { HeroSwiper } from "@/components/hero-swiper";
import { InternalLinkHub } from "@/components/internal-link-hub";
import {
  commonFaqs,
  featuredArticles,
  homeBenefits,
  keyFigures,
  primaryTracks,
  roadmapSteps,
  siteUrl,
} from "@/data/site-content";

export const metadata: Metadata = {
  title: "Bac Français candidat libre depuis l'étranger",
  description:
    "Bac français candidat libre : préparation bac français en ligne, bac français Tunisie et accompagnement pour les élèves à l'étranger.",
  keywords: [
    "bac français candidat libre",
    "bac français étranger",
    "bac français tunisie",
    "inscription bac français candidat libre",
    "préparation bac français en ligne",
  ],
  openGraph: {
    title: "Bac Français candidat libre depuis l'étranger",
    description:
      "Préparation bac français en ligne et accompagnement des candidats libres en Tunisie et à l'étranger.",
    url: "/",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Mon Bac Français",
  url: siteUrl,
  description:
    "Plateforme dédiée aux élèves étrangers qui souhaitent passer le Bac Français en candidat libre.",
  areaServed: "International",
};

interface Actualite {
  id: string;
  titre: string;
  contenu: string;
  resume: string | null;
  sourceUrl: string | null;
  categorie: string | null;
  imageUrl: string | null;
  publieLe: string | null;
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function getPublishedActualites(): Promise<Actualite[]> {
  try {
    const res = await fetch(`${API_BASE}/actualites`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    return [];
  }
}

export default async function HomePage() {
  const actualites = await getPublishedActualites();
  const latestActualites = actualites.slice(0, 8);

  return (
    <>
      <HeroSwiper />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Key Figures - Full Width */}
        <section className="mb-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {keyFigures.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[var(--border-color)] bg-gradient-to-br from-[var(--white)] to-[var(--blue-light)] p-8 text-center shadow-md"
              >
                <p className="text-4xl font-bold text-[var(--primary-blue)]">{item.value}</p>
                <p className="mt-3 text-base font-medium text-[var(--text-secondary)]">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          
          {/* Left Column - Main content */}
          <div className="space-y-16">
            
            {/* Tracks Section */}
            <section>
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary-red)] mb-2">
                  Nos parcours
                </p>
                <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                  Choisissez votre parcours
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {primaryTracks.map((track) => (
                  <article
                    key={track.title}
                    className="rounded-xl border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{track.title}</h3>
                    <p className="text-[var(--text-secondary)] mb-4">{track.description}</p>
                    <ul className="space-y-2 mb-6">
                      {track.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <span className="text-[var(--primary-blue)] mt-1">✓</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={track.href}
                      className="inline-block w-full rounded-lg bg-[var(--primary-blue)] px-4 py-3 text-center text-sm font-semibold text-[var(--white)] hover:bg-[var(--blue-dark)] transition"
                    >
                      Découvrir
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            {/* Benefits Section */}
            <section>
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary-red)] mb-2">
                  Pourquoi nous choisir
                </p>
                <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                  Une expérience premium
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {homeBenefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="rounded-lg border-l-4 border-[var(--primary-blue)] bg-[var(--white)] p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--blue-light)] text-[var(--primary-blue)] font-bold">
                        {index + 1}
                      </div>
                      <p className="text-[var(--text-secondary)]">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Roadmap Section */}
            <section>
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary-red)] mb-2">
                  Votre parcours
                </p>
                <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                  Comment ça fonctionne
                </h2>
              </div>

              <div className="space-y-4">
                {roadmapSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-blue)] text-[var(--white)] font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1 rounded-lg border border-[var(--border-color)] bg-[var(--white)] p-5 shadow-sm">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                      <p className="text-[var(--text-secondary)]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="w-full">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--white)] p-8 shadow-sm sm:p-10">
                <div className="max-w-2xl space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-red)]">
                    FAQ
                  </p>
                  <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                    Les réponses les plus utiles avant de se lancer
                  </h2>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {commonFaqs.map((faq) => (
                    <article
                      key={faq.question}
                      className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-6"
                    >
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{faq.question}</h3>
                      <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar Column */}
          <aside className="lg:sticky lg:top-24 w-full">
            <div className="space-y-8">
              
              {/* Latest News */}
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <span>📰</span> Actualités récentes
                </h3>
                {latestActualites.length > 0 ? (
                  <div className="space-y-4">
                    {latestActualites.slice(0, 5).map((art) => (
                      <article key={art.id} className="border-b border-[var(--border-color)] pb-4 last:border-0 last:pb-0">
                        {art.categorie && (
                          <span className="inline-block rounded bg-[var(--blue-light)] px-2 py-1 text-xs font-semibold text-[var(--primary-blue)] mb-2">
                            {art.categorie}
                          </span>
                        )}
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 line-clamp-2">
                          <Link href={`/actualites/${art.id}`} className="hover:text-[var(--primary-blue)]">
                            {art.titre}
                          </Link>
                        </h4>
                        <p className="text-xs text-[var(--text-muted)]">
                          {art.publieLe
                            ? new Date(art.publieLe).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "short",
                              })
                            : new Date(art.createdAt).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "short",
                              })}
                        </p>
                      </article>
                    ))}
                    <Link
                      href="/actualites"
                      className="block w-full rounded-lg bg-[var(--primary-blue)] px-4 py-2 text-center text-sm font-semibold text-[var(--white)] hover:bg-[var(--blue-dark)] transition"
                    >
                      Voir toutes les actualités
                    </Link>
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">
                    Aucune actualité publiée.
                  </p>
                )}
              </div>

              {/* Featured Articles */}
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                  Articles en vedette
                </h3>
                <div className="space-y-4">
                  {featuredArticles.slice(0, 3).map((article) => (
                    <article key={article.title} className="group">
                      <span className="inline-block rounded bg-[var(--blue-light)] px-2 py-1 text-xs font-semibold text-[var(--primary-blue)] mb-2">
                        {article.category}
                      </span>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--primary-blue)]">
                        {article.title}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{article.excerpt}</p>
                    </article>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="rounded-xl bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] p-6 text-[var(--white)] shadow-lg">
                <h3 className="text-lg font-bold mb-2">Prêt à commencer ?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Inscrivez-vous maintenant et commencez votre préparation.
                </p>
                <Link
                  href="/inscription"
                  className="block w-full rounded-lg bg-[var(--white)] px-4 py-3 text-center text-sm font-semibold text-[var(--primary-blue)] hover:bg-[var(--gray-100)] transition"
                >
                  S'inscrire maintenant
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </div>

      <InternalLinkHub title="Pages essentielles pour votre préparation" />

      <CtaBanner
        title="Passez du projet au plan d'inscription"
        description="Une présence web claire et premium pour guider les familles vers la bonne démarche et les encourager à prendre contact."
        primaryHref="/inscription"
        primaryLabel="Commencer maintenant"
        secondaryHref="/contact"
        secondaryLabel="Nous contacter"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
