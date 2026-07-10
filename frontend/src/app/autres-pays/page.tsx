import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner";
import { InternalLinkHub } from "@/components/internal-link-hub";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Bac français étranger",
  description:
    "Bac français étranger : inscription via Cyclades, préparation CNED, centres d'examen internationaux et accompagnement en ligne.",
  keywords: [
    "bac français étranger",
    "bac français candidat libre",
    "inscription bac français candidat libre",
    "préparation bac français en ligne",
  ],
  openGraph: {
    title: "Bac français étranger",
    description:
      "Guide pratique pour passer le bac français candidat libre depuis l'étranger.",
    url: "/autres-pays",
    type: "article",
  },
  alternates: {
    canonical: "/autres-pays",
  },
};

const keyTopics = [
  {
    title: "Inscription via Cyclades",
    text: "La plateforme Cyclades est le portail officiel d'inscription aux examens de l'Éducation nationale. Depuis l'étranger, les candidats libres doivent créer un compte, sélectionner l'académie de rattachement et déposer leur dossier dans les délais fixés chaque année.",
  },
  {
    title: "Préparation avec le CNED",
    text: "Le Centre National d'Enseignement à Distance (CNED) propose des formations réglementées et libres pour préparer le Bac Français. Il fournit des cours structurés, des devoirs corrigés et un suivi adapté aux élèves hors du territoire français.",
  },
  {
    title: "Centres d'examen internationaux",
    text: "Les épreuves du Bac Français peuvent être passées dans des centres d'examen à l'étranger rattachés aux académies françaises. Chaque pays dispose de centres spécifiques, souvent hébergés dans des lycées français ou des institutions partenaires.",
  },
  {
    title: "Accompagnement en ligne",
    text: "Des plateformes spécialisées comme Mon Bac Français offrent un accompagnement complémentaire : visioconférences, suivi pédagogique, examens blancs et conseils d'organisation pour réussir le Bac depuis n'importe quel pays.",
  },
];

const countries = [
  {
    name: "Canada",
    flag: "\uD83C\uDDE8\uD83C\uDDE6",
    academy: "Académie de rattachement : Nantes ou Bordeaux",
    center: "Centres d'examen à Montréal, Ottawa et Toronto via le réseau des lycées français (Lycée Claudel, Lycée Marie-de-France).",
    notes: "Le CNED est accessible depuis le Canada. L'inscription via Cyclades doit être faite avant la date limite de l'académie de rattachement.",
  },
  {
    name: "Maroc",
    flag: "\uD83C\uDDF2\uD83C\uDDE6",
    academy: "Académie de rattachement : Bordeaux",
    center: "Nombreux centres d'examen à Casablanca, Rabat, Marrakech et Tanger via l'AEFE et les lycées français du réseau.",
    notes: "Le Maroc dispose d'un large réseau de lycées français. Les candidats libres hors de ces établissements suivent la procédure Cyclades.",
  },
  {
    name: "Algérie",
    flag: "\uD83C\uDDE9\uD83C\uDDFF",
    academy: "Académie de rattachement : Aix-Marseille",
    center: "Centres d'examen principalement à Alger (Lycée Alexandre-Dumas), Oran et Annaba.",
    notes: "L'inscription en candidat libre est possible. Le CNED peut compléter la préparation pour les élèves non scolarisés dans le réseau AEFE.",
  },
  {
    name: "Qatar",
    flag: "\uD83C\uDDF6\uD83C\uDDE6",
    academy: "Académie de rattachement : Nantes",
    center: "Centre d'examen à Doha via le Lycée Bonaparte et les établissements partenaires de l'AEFE.",
    notes: "Les candidats libres peuvent passer les épreuves dans la zone Golfe. Le calendrier peut varier selon le fuseau horaire et le centre affecté.",
  },
  {
    name: "Émirats Arabes Unis",
    flag: "\uD83C\uDDE6\uD83C\uDDEA",
    academy: "Académie de rattachement : Nantes",
    center: "Centres d'examen à Abu Dhabi (Lycée Louis-Massignon) et Dubaï (Lycée Français International Georges-Pompidou).",
    notes: "Forte communauté francophone aux EAU. L'accompagnement en ligne est particulièrement adapté pour compléter la préparation locale.",
  },
  {
    name: "Allemagne",
    flag: "\uD83C\uDDE9\uD83C\uDDEA",
    academy: "Académie de rattachement : Strasbourg",
    center: "Centres d'examen à Berlin, Munich, Francfort et Düsseldorf via les lycées français et les sections AbiBac.",
    notes: "L'Allemagne offre aussi le double diplôme AbiBac. Les candidats libres hors de ce dispositif suivent la voie Cyclades classique.",
  },
  {
    name: "Italie",
    flag: "\uD83C\uDDEE\uD83C\uDDF9",
    academy: "Académie de rattachement : Nice ou Grenoble",
    center: "Centres d'examen à Rome (Lycée Chateaubriand), Milan et Naples via le réseau AEFE.",
    notes: "L'Italie fait partie du dispositif EsaBac (double diplôme franco-italien), mais les candidats libres classiques peuvent également s'inscrire via Cyclades.",
  },
];

const steps = [
  {
    step: "01",
    title: "Vérifiez votre académie de rattachement",
    text: "Chaque pays est rattaché à une académie française qui gère les inscriptions. Identifiez la vôtre pour ne pas manquer les délais.",
  },
  {
    step: "02",
    title: "Inscrivez-vous sur Cyclades",
    text: "Créez votre compte, remplissez le dossier de candidature et téléchargez les pièces justificatives demandées avant la date limite.",
  },
  {
    step: "03",
    title: "Préparez-vous avec méthode",
    text: "CNED, accompagnement en ligne ou préparation autonome : choisissez la formule adaptée et structurez votre année avec un planning réaliste.",
  },
  {
    step: "04",
    title: "Passez les épreuves dans votre centre",
    text: "Présentez-vous au centre d'examen désigné avec votre convocation. Les épreuves écrites et orales sont organisées selon le calendrier officiel.",
  },
];

export default function AutresPaysPage() {
  return (
    <>
      <PageHero
        eyebrow="Préparation internationale"
        title="Passer le Bac Français en candidat libre depuis l&apos;étranger"
        description="Toutes les informations essentielles pour comprendre les démarches, choisir sa préparation et réussir le Bac Français depuis le Canada, le Maroc, le Qatar, les EAU et bien d&apos;autres pays."
        highlights={[
          "Inscription officielle via Cyclades",
          "Préparation avec le CNED ou en ligne",
          "Centres d'examen dans plus de 130 pays",
          "Accompagnement personnalisé à distance",
        ]}
      />

      {/* --- 4 thèmes clés --- */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
            Comprendre le dispositif
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Les 4 piliers pour passer le Bac depuis l&apos;étranger
          </h2>
          <p className="text-lg leading-8 text-[var(--text-secondary)]">
            Que vous soyez au Canada, au Qatar ou en Italie, le parcours repose sur
            les mêmes fondamentaux : une inscription officielle, une préparation solide
            et un centre d&apos;examen accessible.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {keyTopics.map((topic, index) => (
            <article
              key={topic.title}
              className={`rounded-[2rem] border p-8 ${
                index === 0
                  ? "border-[var(--primary-blue)]/40 bg-[linear-gradient(160deg,rgba(0,85,164,0.12),rgba(255,255,255,0.98))]"
                  : "border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))]"
              } shadow-[0_12px_30px_rgba(0,85,164,0.12)]`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
                Pilier 0{index + 1}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
                {topic.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                {topic.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* --- Parcours en 4 étapes --- */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_16px_44px_rgba(0,85,164,0.14)] sm:p-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
              Parcours candidat libre
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
              De l&apos;inscription aux épreuves en 4 étapes
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {steps.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.8rem] border border-[var(--border-color)] bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
                  Étape {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- Sous-sections pays --- */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
            Par pays
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Informations spécifiques par zone géographique
          </h2>
          <p className="text-lg leading-8 text-[var(--text-secondary)]">
            Chaque pays a ses spécificités : académie de rattachement, centres
            d&apos;examen disponibles et options de préparation. Retrouvez ci-dessous
            les repères essentiels pour chaque destination.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {countries.map((country, index) => (
            <article
              key={country.name}
              className={`rounded-[2rem] border p-8 ${
                index % 3 === 0
                  ? "border-[var(--primary-blue)]/40 bg-[linear-gradient(160deg,rgba(0,85,164,0.12),rgba(255,255,255,0.98))]"
                  : index % 3 === 1
                    ? "border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))]"
                    : "border-[var(--primary-blue)]/50 bg-[linear-gradient(160deg,rgba(0,85,164,0.08),rgba(255,255,255,0.98))]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{country.flag}</span>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {country.name}
                </h3>
              </div>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
                <div className="rounded-lg border border-[var(--border-color)] bg-white px-4 py-3">
                  <p className="font-semibold text-[var(--text-primary)]">
                    {country.academy}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-white px-4 py-3">
                  <p className="font-semibold text-[var(--text-primary)]">
                    Centres d&apos;examen
                  </p>
                  <p className="mt-1">{country.center}</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-white px-4 py-3">
                  <p className="font-semibold text-[var(--text-primary)]">
                    Notes pratiques
                  </p>
                  <p className="mt-1">{country.notes}</p>
                </div>
              </div>
            </article>
          ))}

          {/* Call to action pour autres pays */}
          <article className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[var(--border-color)] bg-[var(--gray-50)] p-8 text-center">
            <p className="text-3xl">🌍</p>
            <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
              Votre pays n&apos;est pas listé ?
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--text-secondary)]">
              Contactez-nous pour obtenir les informations spécifiques à votre
              situation géographique.
            </p>
            <Link
              href="/contact"
              className="mt-6 rounded-md border border-[var(--primary-blue)]/30 bg-[linear-gradient(135deg,var(--blue-pale),var(--primary-blue))] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[0_14px_36px_rgba(0,85,164,0.24)] transition hover:translate-y-[-1px] hover:brightness-105"
            >
              Nous contacter
            </Link>
          </article>
        </div>
      </section>

      <InternalLinkHub title="Pages à consulter pour réussir votre bac français candidat libre" />

      <CtaBanner
        title="Préparez votre Bac Français depuis n&apos;importe quel pays"
        description="Mon Bac Français vous guide à chaque étape : inscription Cyclades, préparation CNED ou en ligne, et accompagnement jusqu&apos;aux épreuves."
        primaryHref="/en-ligne"
        primaryLabel="Découvrir la préparation en ligne"
        secondaryHref="/contact"
        secondaryLabel="Poser une question"
      />
    </>
  );
}
