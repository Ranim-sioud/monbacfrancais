import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner";
import { InternalLinkHub } from "@/components/internal-link-hub";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Actualités bac français candidat libre",
  description:
    "Actualités bac français candidat libre : calendrier du bac, dates examens, résultats, réformes et évolution des spécialités.",
  keywords: [
    "bac français candidat libre",
    "bac français étranger",
    "préparation bac français en ligne",
    "inscription bac français candidat libre",
  ],
  openGraph: {
    title: "Actualités bac français candidat libre",
    description:
      "Calendrier, examens, résultats et réformes du bac français pour les candidats libres.",
    url: "/actualites",
    type: "article",
  },
  alternates: {
    canonical: "/actualites",
  },
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

const featuredTopics = [
  {
    title: "Calendrier du bac",
    excerpt: "Repérez les grandes étapes de l'année scolaire et les périodes à anticiper.",
    category: "Calendrier",
    href: "#calendrier",
  },
  {
    title: "Dates examens",
    excerpt: "Retrouvez les fenêtres de passage des épreuves écrites, orales et Grand Oral.",
    category: "Examens",
    href: "#dates-examens",
  },
  {
    title: "Résultats",
    excerpt: "Comprenez les dates de publication et les étapes après les résultats.",
    category: "Résultats",
    href: "#resultats",
  },
];

const timeline = [
  {
    period: "Septembre - octobre",
    title: "Ouverture des inscriptions",
    detail:
      "Début des inscriptions selon académie. Vérification des informations candidat et des pièces nécessaires.",
  },
  {
    period: "Novembre - décembre",
    title: "Clôture des candidatures",
    detail:
      "Finalisation des dossiers, contrôles administratifs et confirmation de l'inscription.",
  },
  {
    period: "Mars - mai",
    title: "Convocations et phase finale de préparation",
    detail:
      "Révisions intensives, entraînements ciblés et réception progressive des convocations.",
  },
  {
    period: "Juin - juillet",
    title: "Épreuves et résultats",
    detail:
      "Passage des examens, publication des résultats, puis rattrapages et démarches post-bac.",
  },
];

const reformCards = [
  {
    title: "Ajustements de programmes",
    text: "Des ajustements peuvent intervenir selon les matières pour mieux aligner contenus et objectifs de compétences.",
  },
  {
    title: "Modalités d'évaluation",
    text: "L'équilibre entre contrôle continu et épreuves terminales reste central, avec des précisions publiées chaque année.",
  },
  {
    title: "Organisation des épreuves",
    text: "Les consignes d'organisation et les calendriers peuvent être adaptés selon le contexte national et international.",
  },
];

const specialtyUpdates = [
  {
    name: "Mathématiques / Physique-Chimie",
    trend: "Toujours très demandées",
    impact: "Parcours cohérent pour les profils scientifiques et filières sélectives.",
  },
  {
    name: "SES / HGGSP",
    trend: "Forte progression",
    impact: "Combinaison appréciée pour les études en économie, sciences sociales et géopolitique.",
  },
  {
    name: "LLCER / Humanités",
    trend: "Diversification des profils",
    impact: "Choix valorisé pour les parcours littéraires, communication et relations internationales.",
  },
];

const officialSources = [
  {
    title: "Le baccalauréat général (source officielle)",
    description:
      "Présentation générale du diplôme, des épreuves terminales et des principes d'évaluation.",
    href: "https://www.education.gouv.fr/reussir-au-lycee/le-baccalaureat-general-10457",
    label: "Consulter la page",
  },
  {
    title: "Calendrier 2026 (Bac, Brevet, CAP, Parcoursup)",
    description:
      "Référence officielle pour les grandes échéances de la session 2026.",
    href: "https://www.education.gouv.fr/reussir-au-lycee/baccalaureat-brevet-cap-parcoursup-le-calendrier-2026-341384",
    label: "Voir le calendrier",
  },
];

export default async function ActualitesPage() {
  const dynamicArticles = await getPublishedActualites();

  return (
    <>
      <PageHero
        eyebrow="Magazine Bac Français"
        title="Actualités Bac Français"
        description="Un espace éditorial moderne pour suivre les informations essentielles : calendrier du bac, dates d'examens, résultats, réformes et évolution des spécialités."
        highlights={[
          "Calendrier et dates clés",
          "Résultats et procédures",
          "Réformes officielles",
          "Veille sur les spécialités",
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
            À la une
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Le fil d&apos;actualité du Bac Français
          </h2>
          <p className="text-lg leading-8 text-[var(--text-secondary)]">
            Retrouvez les informations clés, les dates importantes, les réformes et les décryptages officiels récoltés pour vous par notre équipe.
          </p>
        </div>

        {dynamicArticles.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {dynamicArticles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col overflow-hidden rounded-[2.2rem] border border-[var(--border-color)] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full bg-[linear-gradient(135deg,#013078/10,#014aa8/5)]">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.titre}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl">
                      📰
                    </div>
                  )}
                  {article.categorie && (
                    <span className="absolute left-4 top-4 rounded-md bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--primary-blue)] shadow-sm backdrop-blur-sm">
                      {article.categorie}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <span className="text-xs text-[var(--text-secondary)]">
                    {article.publieLe ? new Date(article.publieLe).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }) : new Date(article.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-[var(--text-primary)] line-clamp-2 hover:text-[var(--primary-blue)] transition">
                    <Link href={`/actualites/${article.id}`}>
                      {article.titre}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
                    {article.resume || article.contenu}
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/actualites/${article.id}`}
                      className="inline-flex rounded-md bg-[linear-gradient(135deg,#013078,#014aa8)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-sm hover:brightness-105 transition"
                    >
                      Lire l&apos;actualité
                    </Link>
                    {article.sourceUrl && (
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-400 hover:text-slate-600 transition"
                      >
                        Source d&apos;origine ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Fallback static content */
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredTopics.map((topic, index) => (
              <article
                key={topic.title}
                className={`rounded-[2rem] border p-7 ${
                  index === 0
                    ? "border-red-300/40 bg-[linear-gradient(160deg,rgba(0, 207, 232,0.12),rgba(255,255,255,0.98))]"
                    : "border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))]"
                }`}
              >
                <span className="inline-flex rounded-md border border-[var(--border-color)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
                  {topic.category}
                </span>
                <h2 className="mt-5 text-2xl font-semibold text-[var(--text-primary)]">{topic.title}</h2>
                <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{topic.excerpt}</p>
                <Link
                  href={topic.href}
                  className="mt-5 inline-flex rounded-md border border-red-200/70 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-700 transition hover:bg-red-100"
                >
                  Lire
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section
        id="calendrier"
        className="mx-auto w-full max-w-7xl px-4 pb-20 scroll-mt-28 sm:px-6 lg:px-8"
      >
        <div className="rounded-[2.2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_16px_44px_rgba(1, 48, 120,0.14)] sm:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
              Calendrier du bac
            </p>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Les temps forts de l&apos;année
            </h2>
          </div>

          <div className="mt-8 grid gap-4">
            {timeline.map((item, index) => (
              <article
                key={item.period}
                className="rounded-[1.7rem] border border-[var(--border-color)] bg-white p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--primary-blue)]">{item.period}</p>
                  <span className="rounded-md border border-cyan-300/45 bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">
                    Étape {index + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <article
          id="dates-examens"
          className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-white p-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
            Dates examens
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
            Épreuves écrites et orales
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            Les dates exactes sont publiées chaque année. Les convocations reçues via la
            plateforme officielle restent la référence finale pour votre planning.
          </p>
        </article>

        <article
          id="resultats"
          className="scroll-mt-28 rounded-[2rem] border border-red-200/70 bg-red-50 p-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-700">
            Résultats
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
            Publication et suites
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            Résultats, éventuel oral de rattrapage et démarches post-bac : anticipez chaque
            étape pour éviter les délais de dernière minute.
          </p>
        </article>

        <article
          id="reformes"
          className="scroll-mt-28 rounded-[2rem] border border-red-300/40 bg-[linear-gradient(160deg,rgba(0, 207, 232,0.12),rgba(255,255,255,0.98))] p-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
            Réformes
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
            Ce qui peut évoluer
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            Programmes, modalités d&apos;évaluation, organisation des épreuves : les réformes
            influencent la préparation. Une veille régulière est indispensable.
          </p>
          <div className="mt-5 space-y-2">
            {reformCards.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border-color)] bg-white px-4 py-3"
              >
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{item.text}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section
        id="specialites"
        className="mx-auto w-full max-w-7xl px-4 pb-20 scroll-mt-28 sm:px-6 lg:px-8"
      >
        <div className="rounded-[2.2rem] border border-[var(--border-color)] bg-white p-8 shadow-[0_16px_40px_rgba(1, 48, 120,0.12)] sm:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
              Évolution des spécialités
            </p>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Tendances et impacts pour les candidats
            </h2>
            <p className="text-base leading-8 text-[var(--text-secondary)]">
              Les choix de spécialités évoluent selon les projets d&apos;orientation et les attentes
              des formations supérieures. Voici des tendances observées.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {specialtyUpdates.map((item) => (
              <article
                key={item.name}
                className="rounded-[1.7rem] border border-[var(--border-color)] bg-[var(--gray-50)] p-6"
              >
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">{item.name}</h3>
                <p className="mt-3 text-sm font-semibold text-[var(--primary-blue)]">{item.trend}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.impact}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_16px_40px_rgba(1, 48, 120,0.12)] sm:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
              Source officielle Éducation nationale
            </p>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Informations officielles pour alimenter l&apos;actualité
            </h2>
            <p className="text-base leading-8 text-[var(--text-secondary)]">
              Nous consolidons les informations utiles à partir des publications officielles du
              ministère pour fiabiliser les contenus &quot;Actualités Bac Français&quot;.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              {officialSources.map((source) => (
                <article
                  key={source.href}
                  className="rounded-lg border border-[var(--border-color)] bg-white p-5"
                >
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{source.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    {source.description}
                  </p>
                  <Link
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-md border border-cyan-200 bg-[linear-gradient(135deg,#ecfeff,#67e8f9)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition hover:brightness-105"
                  >
                    {source.label}
                  </Link>
                </article>
              ))}
            </div>

            <div className="rounded-lg border border-red-200/70 bg-red-50 px-5 py-6 text-sm leading-7 text-[var(--text-secondary)] flex flex-col justify-center">
              <div>
                <strong>Repère 2026 :</strong> les épreuves écrites de remplacement sont annoncées sur la période du{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  lundi 7 au jeudi 10 septembre 2026
                </span>{" "}
                selon les sources officielles de calendrier.
              </div>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkHub title="Explorer les pages clés du bac français candidat libre" />

      <CtaBanner
        title="Recevez les prochaines actualités du Bac Français"
        description="Restez à jour sur les dates, les résultats et les évolutions officielles pour préparer votre parcours candidat libre avec séeinité."
        primaryHref="/contact"
        primaryLabel="Poser une question"
        secondaryHref="/guide-bac-francais"
        secondaryLabel="Voir le guide"
      />
    </>
  );
}
