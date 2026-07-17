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
            {keyFigures.map((item, index) => (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--white)] p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className={`absolute top-0 inset-x-0 h-1.5 ${index === 1 ? "bg-[var(--primary-red)]" : "bg-[var(--primary-blue)]"}`} />
                <p className={`text-5xl font-black tracking-tight transition-transform duration-300 group-hover:scale-105 ${index === 1 ? "text-[var(--primary-red)]" : "text-[var(--primary-blue)]"}`}>
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{item.label}</p>
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
              <div className="mb-8 relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary-red)] mb-2">
                  Nos parcours
                </p>
                <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Choisissez votre parcours
                </h2>
                <div className="mt-3 flex items-center gap-1">
                  <div className="h-[4px] w-16 rounded-full bg-[var(--primary-blue)]" />
                  <div className="h-[4px] w-4 rounded-full bg-[var(--primary-red)]" />
                  <div className="h-[4px] w-2 rounded-full bg-gray-300" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {primaryTracks.map((track) => (
                  <article
                    key={track.title}
                    className="flex flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--primary-blue)]">{track.title}</h3>
                      {/* Stylized separator line */}
                      <div className="my-3 flex items-center gap-1.5">
                        <div className="h-[3px] w-12 rounded-full bg-[var(--primary-red)]" />
                        <div className="h-[3px] w-3 rounded-full bg-[var(--primary-blue)]" />
                        <div className="h-[3px] w-1.5 rounded-full bg-gray-300" />
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-5">{track.description}</p>
                      <ul className="space-y-2.5 mb-6">
                        {track.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2.5 text-xs font-medium text-[var(--text-secondary)]">
                            <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--blue-light)] text-[var(--primary-blue)] font-bold text-[10px]">
                              ✓
                            </span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={track.href}
                      className="block w-full rounded-xl bg-[var(--primary-blue)] px-4 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--white)] hover:bg-[var(--blue-dark)] hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Découvrir
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            {/* Benefits Section */}
            <section>
              <div className="mb-8 relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary-red)] mb-2">
                  Pourquoi nous choisir
                </p>
                <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Une expérience premium
                </h2>
                <div className="mt-3 flex items-center gap-1">
                  <div className="h-[4px] w-16 rounded-full bg-[var(--primary-blue)]" />
                  <div className="h-[4px] w-4 rounded-full bg-[var(--primary-red)]" />
                  <div className="h-[4px] w-2 rounded-full bg-gray-300" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {homeBenefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="relative overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--primary-blue)]" />
                    <div className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-accent)] text-white font-bold text-sm shadow-sm transition-transform duration-300 group-hover:scale-110">
                        {index + 1}
                      </div>
                      <p className="text-sm font-medium leading-relaxed text-[var(--text-secondary)]">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Roadmap Section */}
            <section>
              <div className="mb-8 relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary-red)] mb-2">
                  Votre parcours
                </p>
                <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Comment ça fonctionne
                </h2>
                <div className="mt-3 flex items-center gap-1">
                  <div className="h-[4px] w-16 rounded-full bg-[var(--primary-blue)]" />
                  <div className="h-[4px] w-4 rounded-full bg-[var(--primary-red)]" />
                  <div className="h-[4px] w-2 rounded-full bg-gray-300" />
                </div>
              </div>

              <div className="relative space-y-8 pl-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[var(--primary-blue)] before:to-[var(--primary-red)]">
                {roadmapSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative flex flex-col md:flex-row gap-6 items-start group"
                  >
                    {/* Dot/Badge */}
                    <div className="absolute -left-[25px] flex h-8 w-8 items-center justify-center rounded-full bg-[var(--white)] border-2 border-[var(--primary-blue)] text-[var(--primary-blue)] font-bold text-sm shadow-sm transition-all duration-300 group-hover:bg-[var(--primary-blue)] group-hover:text-white group-hover:scale-110">
                      {index + 1}
                    </div>
                    {/* Card content */}
                    <div className="flex-1 rounded-xl border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm hover:shadow-md transition-all duration-300">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center justify-between">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="w-full">
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--white)] p-8 shadow-sm sm:p-10">
                <div className="max-w-2xl space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary-red)]">
                    FAQ
                  </p>
                  <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl">
                    Les réponses les plus utiles avant de se lancer
                  </h2>
                  <div className="mt-3 flex items-center gap-1">
                    <div className="h-[4px] w-16 rounded-full bg-[var(--primary-blue)]" />
                    <div className="h-[4px] w-4 rounded-full bg-[var(--primary-red)]" />
                    <div className="h-[4px] w-2 rounded-full bg-gray-300" />
                  </div>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {commonFaqs.map((faq) => (
                    <article
                      key={faq.question}
                      className="rounded-xl border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm hover:shadow-md hover:border-[var(--primary-blue)] transition-all duration-300"
                    >
                      <h3 className="text-base font-bold text-[var(--text-primary)] flex items-start gap-2.5">
                        <span className="text-[var(--primary-blue)] text-lg">❓</span>
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] pl-7">{faq.answer}</p>
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
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <span>📰</span> Actualités récentes
                </h3>
                {latestActualites.length > 0 ? (
                  <div className="space-y-4">
                    {latestActualites.slice(0, 5).map((art) => (
                      <article key={art.id} className="border-b border-[var(--border-color)] pb-4 last:border-0 last:pb-0 group">
                        {art.categorie && (
                          <span className="inline-block rounded bg-[var(--blue-light)] px-2 py-1 text-xs font-semibold text-[var(--primary-blue)] mb-2">
                            {art.categorie}
                          </span>
                        )}
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 line-clamp-2 transition-colors duration-200 group-hover:text-[var(--primary-blue)]">
                          <Link href={`/actualites/${art.id}`}>
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
                      className="block w-full rounded-xl bg-[var(--primary-blue)] px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-[var(--white)] hover:bg-[var(--blue-dark)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
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
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                  Articles en vedette
                </h3>
                <div className="space-y-4">
                  {featuredArticles.slice(0, 3).map((article) => (
                    <article key={article.title} className="group border-b border-[var(--border-color)] pb-4 last:border-0 last:pb-0">
                      <span className="inline-block rounded bg-[var(--blue-light)] px-2 py-1 text-xs font-semibold text-[var(--primary-blue)] mb-2">
                        {article.category}
                      </span>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 transition-colors duration-200 group-hover:text-[var(--primary-blue)]">
                        {article.title}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{article.excerpt}</p>
                    </article>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--primary-blue)] via-[var(--blue-medium)] to-[var(--blue-dark)] p-8 text-[var(--white)] shadow-xl">
                {/* Decorative graphics */}
                <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-red-500/10 blur-xl pointer-events-none" />
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">Prêt à commencer ?</h3>
                  <p className="text-sm mb-6 text-white/80 leading-relaxed">
                    Inscrivez-vous maintenant et commencez votre préparation.
                  </p>
                  <Link
                    href="/inscription"
                    className="block w-full rounded-xl bg-[var(--white)] px-4 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--primary-blue)] hover:bg-[var(--gray-50)] hover:scale-[1.02] active:scale-[0.98] shadow-md transition-all duration-200"
                  >
                    S'inscrire maintenant
                  </Link>
                </div>
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
