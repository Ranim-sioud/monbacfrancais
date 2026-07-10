import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner";
import { InternalLinkHub } from "@/components/internal-link-hub";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Guide bac français candidat libre",
  description:
    "Guide bac français candidat libre : voie générale, spécialités, matières, fonctionnement Première/Terminale, notes et coefficients.",
  keywords: [
    "bac français candidat libre",
    "guide bac français candidat libre",
    "bac français étranger",
    "préparation bac français en ligne",
  ],
  openGraph: {
    title: "Guide bac français candidat libre",
    description:
      "Explications claires sur les matières, spécialités et coefficients du bac français candidat libre.",
    url: "/guide-bac-francais",
    type: "article",
  },
  alternates: {
    canonical: "/guide-bac-francais",
  },
};

const tocItems = [
  { href: "#bac-francais", label: "Explication du Bac Français" },
  { href: "#voie-generale", label: "Voie générale" },
  { href: "#premiere-terminale", label: "Première / Terminale" },
  { href: "#systeme-notes", label: "Système de notes" },
  { href: "#candidat-libre", label: "Candidat libre vs scolarisé" },
  { href: "#coefficients", label: "Coefficients" },
  { href: "#mentions", label: "Barème des mentions" },
  { href: "#rattrapage", label: "Le rattrapage (oral de contrôle)" },
  { href: "#matieres", label: "Matières (détails)" },
];

const subjects = [
  {
    id: "francais",
    title: "Français (Première)",
    badge: "Épreuves anticipées",
    bullets: [
      "Écrit + oral en fin de Première",
      "Méthode : lecture, analyse, entraînement régulier",
      "Objectif : maîtrise de l’argumentation et des œuvres",
    ],
    content:
      "En voie générale, le Français est évalué en fin de Première avec une épreuve écrite et une épreuve orale. La réussite repose sur la méthode (plans, analyses, citations) et la régularité (lectures, entraînements et corrections).",
  },
  {
    id: "philosophie",
    title: "Philosophie (Terminale)",
    badge: "Épreuve terminale",
    bullets: [
      "Dissertation ou explication de texte",
      "Méthode : problématiser, argumenter, illustrer",
      "S’entraîner sur des sujets type bac",
    ],
    content:
      "La Philosophie est une épreuve terminale en Terminale. L’enjeu principal est de construire une réflexion structurée : problématique, arguments, exemples, et rédaction claire.",
  },
  {
    id: "histoire-geo",
    title: "Histoire-Géographie",
    badge: "Contrôle continu",
    bullets: [
      "Moyennes de Première + Terminale",
      "Méthode : repères, composition, analyse de documents",
      "Travail régulier sur cartes et dates clés",
    ],
    content:
      "L’Histoire-Géographie est évaluée en contrôle continu. Pour progresser, privilégiez des fiches de repères, des entraînements à l’analyse de documents et une méthode solide pour les compositions.",
  },
  {
    id: "langues",
    title: "Langues vivantes (LVA / LVB)",
    badge: "Contrôle continu",
    bullets: [
      "Compréhension + expression (écrit/oral)",
      "Routines : lecture, écoute, prise de parole",
      "Objectif : aisance et précision",
    ],
    content:
      "Les langues vivantes sont principalement évaluées via le contrôle continu. Les progrès les plus rapides viennent de routines courtes mais quotidiennes : compréhension (audio/texte) et expression (oral/écrit).",
  },
  {
    id: "grand-oral",
    title: "Grand Oral",
    badge: "Épreuve terminale",
    bullets: [
      "Deux questions préparées (liées aux spécialités)",
      "Évaluer : clarté, argumentation, posture",
      "S’entraîner à voix haute, avec timing",
    ],
    content:
      "Le Grand Oral évalue votre capacité à présenter une question, argumenter, et dialoguer. Il se prépare comme une performance : contenu solide, structure, et entraînement régulier à l’oral.",
  },
  {
    id: "specialites",
    title: "Spécialités (voie générale)",
    badge: "Coefficients majeurs",
    bullets: [
      "3 spécialités en Première, 2 conservées en Terminale",
      "Épreuves terminales sur les 2 spécialités gardées",
      "La spécialité abandonnée pèse en contrôle continu",
    ],
    content:
      "Les spécialités sont le cœur de la voie générale. En Première, vous choisissez 3 spécialités puis vous en conservez 2 en Terminale : ce sont elles qui ont les coefficients les plus importants à l’examen.",
  },
];

export default function GuideBacFrancaisPage() {
  return (
    <>
      <PageHero
        eyebrow="Guide pédagogique"
        title="Guide du Bac Français (voie générale)"
        description="Comprendre le Bac Français, les matières, les spécialités, le fonctionnement Première/Terminale, et la logique de notes et coefficients. Un guide clair, pensé pour les candidats libres et les familles à l’international."
        highlights={[
          "Voie générale : tronc commun + spécialités",
          "Première / Terminale : étapes clés",
          "Système de notes (40/60) et coefficients",
          "Matières détaillées (Français, Philo, Grand Oral...)",
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <aside className="min-w-0 rounded-[2rem] border border-[var(--border-color)] bg-white p-7 shadow-[0_14px_36px_rgba(0,85,164,0.12)] grid gap-6 md:grid-cols-2 lg:block">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Sommaire
              </p>
              <nav className="mt-5 grid gap-2 grid-cols-2 md:grid-cols-1">
                {tocItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-color)] hover:bg-cyan-50 hover:text-[var(--text-primary)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="rounded-lg border border-cyan-200/70 bg-red-50 px-5 py-4 text-sm text-[var(--text-secondary)] flex flex-col justify-center">
              <p className="font-semibold text-red-700">Bon réflexe</p>
              <p className="mt-2 leading-7">
                Les modalités et calendriers peuvent évoluer. Utilisez ce guide comme repère,
                puis vérifiez toujours les informations officielles au moment de votre
                inscription.
              </p>
            </div>
          </aside>

          <div className="space-y-10 min-w-0">
            <article
              id="bac-francais"
              className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_14px_36px_rgba(0,85,164,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Explication du Bac Français
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Le Bac Français, en clair
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                Le Bac Français (baccalauréat) valide la fin du lycée. En voie générale, il
                combine un tronc commun, des spécialités choisies par l’élève, et des épreuves
                passées sur deux années : Première et Terminale.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[var(--border-color)] bg-white p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Pour qui ?</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Élèves scolarisés ou candidats libres (inscription officielle selon votre
                    situation et votre académie de rattachement).
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-white p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Ce qui compte</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Des notes sur 20, une part de contrôle continu, des épreuves terminales, et
                    des coefficients qui donnent plus de poids à certaines matières.
                  </p>
                </div>
              </div>
            </article>

            <article
              id="voie-generale"
              className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-white p-8 shadow-[0_14px_36px_rgba(0,85,164,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Voie générale
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Tronc commun + spécialités
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                La voie générale s’organise autour de matières communes (Histoire-Géo, langues,
                enseignement scientifique, EPS, etc.) et de spécialités choisies. Les
                spécialités ont un poids déterminant dans la note finale.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Spécialités</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Choix stratégique : elles orientent le niveau d’exigence et pèsent le plus
                    dans la note finale.
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Méthode</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Une progression hebdomadaire, des entraînements type bac, et des bilans
                    réguliers.
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Candidat libre</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Priorité : clarifier le parcours administratif et sécuriser la préparation
                    (planning + entraînements).
                  </p>
                </div>
              </div>
            </article>

            <article
              id="premiere-terminale"
              className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_14px_36px_rgba(0,85,164,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Fonctionnement Première / Terminale
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Deux années, deux rythmes
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-[1.8rem] border border-[var(--border-color)] bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
                    Première
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                    Bases + épreuves anticipées
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                    <li>- 3 spécialités choisies</li>
                    <li>- Français (écrit + oral) en fin d’année</li>
                    <li>- Contrôle continu sur le tronc commun</li>
                  </ul>
                </div>
                <div className="rounded-[1.8rem] border border-cyan-200/60 bg-red-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-700">
                    Terminale
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                    Spécialités + Philosophie + Grand Oral
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                    <li>- 2 spécialités conservées (épreuves terminales)</li>
                    <li>- Philosophie (épreuve terminale)</li>
                    <li>- Grand Oral (épreuve terminale)</li>
                  </ul>
                </div>
              </div>
            </article>

            <article
              id="systeme-notes"
              className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-white p-8 shadow-[0_14px_36px_rgba(0,85,164,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Système de notes
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                La logique 40/60
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                La note finale du Bac général repose sur{" "}
                <span className="font-semibold text-[var(--text-primary)]">40%</span> de contrôle
                continu et{" "}
                <span className="font-semibold text-[var(--text-primary)]">60%</span> d’épreuves
                terminales. Les notes sont sur 20, puis pondérées par des coefficients.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Contrôle continu (40)
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Moyennes annuelles (Première + Terminale) sur le tronc commun + la
                    spécialité abandonnée après la Première.
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Épreuves terminales (60)
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Français (anticipé), Philosophie, Grand Oral et les deux spécialités
                    conservées en Terminale.
                  </p>
                </div>
              </div>
            </article>

            <article
              id="candidat-libre"
              className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-white p-8 shadow-[0_14px_36px_rgba(0,85,164,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Candidat libre vs scolarisé
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Une différence majeure : le contrôle continu
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                La distinction entre candidat scolarisé et candidat libre change radicalement la
                préparation : un candidat libre passe des épreuves ponctuelles sur TOUTES les
                matières, y compris celles normalement évaluées en contrôle continu.
              </p>

              <div className="mt-8 overflow-hidden rounded-lg border border-[var(--border-color)] bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left text-sm">
                    <thead className="bg-[var(--gray-50)]">
                      <tr className="text-[var(--text-primary)]">
                        <th className="px-5 py-4 font-semibold">Aspect</th>
                        <th className="px-5 py-4 font-semibold">Candidat scolarisé</th>
                        <th className="px-5 py-4 font-semibold">Candidat libre</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--text-secondary)]">
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4 font-medium">Contrôle continu</td>
                        <td className="px-5 py-4">40% de la note finale (moyennes annuelles)</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">Aucun</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4 font-medium">Épreuves terminales</td>
                        <td className="px-5 py-4">60% de la note finale</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">100% de la note finale</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4 font-medium">Histoire-Géo</td>
                        <td className="px-5 py-4">Évaluée en contrôle continu</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">Épreuve ponctuelle</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4 font-medium">Langues vivantes</td>
                        <td className="px-5 py-4">Évaluées en contrôle continu</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">Épreuves ponctuelles</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4 font-medium">Enseignement scientifique</td>
                        <td className="px-5 py-4">Évalué en contrôle continu</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">Épreuve ponctuelle</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4 font-medium">Spécialité abandonnée</td>
                        <td className="px-5 py-4">Comptabilisée en contrôle continu</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">Épreuve ponctuelle</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4 font-medium">Charge de révision</td>
                        <td className="px-5 py-4">Concentrée sur les épreuves terminales</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">Plus large (toutes les matières)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)]">Conséquence pratique :</strong> la charge de
                révision est plus large pour un candidat libre puisqu'aucune matière n'est "acquise" par
                avance. Il faut préparer des épreuves ponctuelles sur l'ensemble du programme.
              </p>
            </article>

            <article
              id="coefficients"
              className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_14px_36px_rgba(0,85,164,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Coefficients (repères)
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Ce qui pèse le plus
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                Repères courants du Bac général :{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  contrôle continu = 40
                </span>{" "}
                et{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  épreuves terminales = 60
                </span>
                . Les spécialités conservées concentrent une part très importante du total.
              </p>

              <div className="mt-8 overflow-hidden rounded-lg border border-[var(--border-color)] bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] text-left text-sm">
                    <thead className="bg-[var(--gray-50)]">
                      <tr className="text-[var(--text-primary)]">
                        <th className="px-5 py-4 font-semibold">Bloc</th>
                        <th className="px-5 py-4 font-semibold">Épreuve / matière</th>
                        <th className="px-5 py-4 font-semibold">Coefficient (repère)</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--text-secondary)]">
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4">Épreuves terminales</td>
                        <td className="px-5 py-4">Spécialité 1 (Terminale)</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">16</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4">Épreuves terminales</td>
                        <td className="px-5 py-4">Spécialité 2 (Terminale)</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">16</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4">Épreuves terminales</td>
                        <td className="px-5 py-4">Grand Oral</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">10</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4">Épreuves terminales</td>
                        <td className="px-5 py-4">Français (écrit + oral, Première)</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">10</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4">Épreuves terminales</td>
                        <td className="px-5 py-4">Philosophie</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">8</td>
                      </tr>
                      <tr className="border-t border-[var(--border-color)]">
                        <td className="px-5 py-4">Contrôle continu</td>
                        <td className="px-5 py-4">Tronc commun (Première + Terminale)</td>
                        <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">
                          40 (total)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
                Astuce : pour optimiser la préparation, commencez par sécuriser les spécialités
                (volume et méthode), puis structurez Français/Philo/Grand Oral, et enfin le
                tronc commun en contrôle continu.
              </p>
            </article>

            <article
              id="mentions"
              className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-white p-8 shadow-[0_14px_36px_rgba(0,85,164,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Barème des mentions
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Les mentions du Bac
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                Les mentions sont attribuées selon la moyenne finale calculée sur l'ensemble des
                coefficients. Elles valorisent un parcours réussi et peuvent être importantes pour
                certaines poursuites d'études.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">10 à 11,99/20</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Admis (sans mention)
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">12 à 13,99/20</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Mention Assez Bien (AB)
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">14 à 15,99/20</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Mention Bien (B)
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">16/20 et plus</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Mention Très Bien (TB), avec félicitations du jury possibles selon
                    appréciation académique
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)]">Important :</strong> la moyenne est calculée
                sur l'ensemble des coefficients (contrôle continu + épreuves terminales). Chaque
                matière compte selon son coefficient dans le total.
              </p>
            </article>

            <article
              id="rattrapage"
              className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_14px_36px_rgba(0,85,164,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Le rattrapage (oral de contrôle)
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Une seconde chance
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                Le rattrapage, ou oral de contrôle, offre une opportunité de récupérer des points si
                la moyenne finale est proche du seuil d'admission.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[var(--border-color)] bg-white p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Condition d'accès</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Moyenne générale entre 8 et 10/20
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-white p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Choix des matières</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Le candidat choisit 2 matières à repasser à l'oral
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-white p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Durée de l'épreuve</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    40 minutes (20 min préparation + 20 min passage)
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-white p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Calcul de la note</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    La meilleure note entre l'épreuve initiale et le rattrapage est conservée
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)]">Stratégie :</strong> choisissez des matières
                où vous avez un potentiel d'amélioration significatif. L'oral de contrôle peut faire
                la différence entre l'échec et l'admission.
              </p>
            </article>

            <article
              id="matieres"
              className="scroll-mt-28 rounded-[2rem] border border-[var(--border-color)] bg-white p-8 shadow-[0_14px_36px_rgba(0,85,164,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Matières
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Détails matière par matière
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                Voici les repères essentiels pour comprendre chaque matière et construire une
                préparation efficace.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {subjects.map((s, index) => (
                  <article
                    key={s.id}
                    className={`rounded-[2rem] border p-7 ${
                      index % 3 === 0
                        ? "border-red-300/40 bg-[linear-gradient(160deg,rgba(0, 207, 232,0.12),rgba(255,255,255,0.98))]"
                        : index % 3 === 1
                          ? "border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))]"
                          : "border-cyan-200/55 bg-[linear-gradient(160deg,rgba(0, 207, 232,0.07),rgba(255,255,255,0.98))]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                        {s.title}
                      </h3>
                      <span className="rounded-md border border-[var(--border-color)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-blue)]">
                        {s.badge}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                      {s.content}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                      {s.bullets.map((b) => (
                        <li key={b} className="rounded-lg border border-[var(--border-color)] bg-white px-4 py-3">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <InternalLinkHub title="Continuer vers l'inscription et la préparation en ligne" />

      <CtaBanner
        title="Vous préparez le Bac Français en candidat libre ?"
        description="Nous pouvons vous aider à structurer l’année, clarifier les démarches, et organiser une préparation à distance (visioconférence, suivi, examens blancs)."
        primaryHref="/en-ligne"
        primaryLabel="Découvrir la préparation en ligne"
        secondaryHref="/contact"
        secondaryLabel="Poser une question"
      />
    </>
  );
}

