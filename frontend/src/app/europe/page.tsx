import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner";
import { InternalLinkHub } from "@/components/internal-link-hub";
import { PageHero } from "@/components/page-hero";
import { pageContents } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Bac français Europe",
  description:
    "Bac français Europe : inscription via Cyclades, préparation CNED, centres d'examen en Europe et accompagnement en ligne.",
  keywords: [
    "bac français europe",
    "bac français candidat libre",
    "inscription bac français candidat libre",
    "préparation bac français en ligne",
  ],
  openGraph: {
    title: "Bac français Europe",
    description:
      "Guide pratique pour passer le bac français candidat libre depuis l'Europe.",
    url: "/europe",
    type: "article",
  },
  alternates: {
    canonical: "/europe",
  },
};

const keyTopics = [
  {
    title: "Inscription via Cyclades",
    text: "La plateforme Cyclades est le portail officiel d'inscription aux examens de l'Éducation nationale. Depuis l'Europe, les candidats libres doivent créer un compte, sélectionner l'académie de rattachement (souvent limitrophe ou spécifique) et déposer leur dossier dans les délais fixés chaque année.",
  },
  {
    title: "Préparation avec le CNED ou en ligne",
    text: "Le Centre National d'Enseignement à Distance (CNED) et les accompagnements spécifiques en ligne comme Mon Bac Français fournissent des cours structurés et des devoirs corrigés parfaitement adaptés aux élèves résidant en Europe.",
  },
  {
    title: "Centres d'examen européens",
    text: "Les épreuves du Bac Français peuvent être passées dans des centres d'examen en Europe rattachés aux académies de métropole. Chaque pays dispose de centres d'examen dédiés (lycées français du réseau AEFE).",
  },
  {
    title: "Accompagnement méthodologique",
    text: "Des plateformes spécialisées offrent des cours de soutien ciblés sur les épreuves écrites et orales pour aborder l'examen avec sérénité.",
  },
];

const countries = [
  {
    name: "Royaume-Uni",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    academy: "Académie de rattachement : Lille ou Paris",
    center: "Centres d'examen à Londres (Lycée Français Charles de Gaulle) et autres établissements homologués.",
    notes: "Très forte communauté de candidats libres. Les inscriptions en ligne ferment généralement mi-novembre.",
  },
  {
    name: "Espagne",
    flag: "\uD83C\uDDE9\uD83C\uDDF5",
    academy: "Académie de rattachement : Toulouse ou Montpellier",
    center: "Centres d'examen à Madrid (Lycée Français de Madrid), Barcelone (Lycée Français de Barcelone), Valence et Séville.",
    notes: "L'Espagne bénéficie d'un réseau AEFE très dense, facilitant l'accès aux centres d'examen physiques pour les candidats libres.",
  },
  {
    name: "Allemagne",
    flag: "\uD83C\uDDE9\uD83C\uDDEA",
    academy: "Académie de rattachement : Strasbourg",
    center: "Centres d'examen à Berlin, Munich, Francfort et Düsseldorf via les lycées français.",
    notes: "Les candidats peuvent également préparer le double diplôme AbiBac, mais la voie candidat libre reste privilégiée pour le parcours français classique.",
  },
  {
    name: "Italie",
    flag: "\uD83C\uDDEE\uD83C\uDDF9",
    academy: "Académie de rattachement : Nice ou Grenoble",
    center: "Centres d'examen à Rome (Lycée Chateaubriand), Milan (Lycée Stendhal) et Naples.",
    notes: "L'Italie propose également des équivalences, mais les candidats libres s'inscrivent directement via l'académie partenaire.",
  },
  {
    name: "Belgique",
    flag: "\uD83C\uDDE7\uD83C\uDDEA",
    academy: "Académie de rattachement : Lille",
    center: "Centre d'examen principal à Bruxelles (Lycée Français Jean-Monnet).",
    notes: "Proximité géographique immédiate avec la France, permettant une excellente coordination avec l'académie de Lille.",
  },
];

const steps = [
  {
    step: "01",
    title: "Vérifiez votre académie de rattachement",
    text: "Chaque pays européen est rattaché à une académie de métropole. Identifiez-la pour suivre le calendrier officiel.",
  },
  {
    step: "02",
    title: "Inscrivez-vous sur Cyclades",
    text: "Créez votre compte candidat, saisissez vos vœux d'épreuves et validez votre dossier complet avant la date limite.",
  },
  {
    step: "03",
    title: "Préparez-vous avec méthode",
    text: "Suivez un programme structuré avec des entraînements réguliers pour l'écrit et les simulations d'oral.",
  },
  {
    step: "04",
    title: "Passez les épreuves dans votre centre",
    text: "Présentez-vous dans le lycée français officiel désigné comme centre d'examen dans votre pays de résidence.",
  },
];

export default function EuropePage() {
  return (
    <>
      <PageHero
        eyebrow="Préparation européenne"
        title="Passer le Bac Français en candidat libre depuis l'Europe"
        description="Toutes les informations essentielles pour comprendre les démarches, choisir sa préparation et réussir le Bac Français depuis le Royaume-Uni, l'Espagne, l'Allemagne, la Belgique et toute l'Europe."
        highlights={[
          "Inscription officielle via Cyclades",
          "Préparation avec le CNED ou en ligne",
          "Centres d'examen dans les grandes capitales européennes",
          "Accompagnement méthodologique adapté",
        ]}
      />

      {/* --- 4 thèmes clés --- */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
            Comprendre le dispositif
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Les 4 piliers pour passer le Bac depuis l'Europe
          </h2>
          <p className="text-lg leading-8 text-[var(--text-secondary)]">
            Que vous résidiez à Londres, Madrid ou Bruxelles, le parcours candidat libre repose sur un accompagnement structuré et l'accès à un centre agréé.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {keyTopics.map((topic, index) => (
            <article
              key={topic.title}
              className={`rounded-[2rem] border p-8 ${
                index === 0
                  ? "border-[var(--primary-blue)]/40 bg-[linear-gradient(160deg,rgba(1, 48, 120,0.12),rgba(255,255,255,0.98))]"
                  : "border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))]"
              } shadow-[0_12px_30px_rgba(1, 48, 120,0.12)]`}
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
        <div className="rounded-[2.2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_16px_44px_rgba(1, 48, 120,0.14)] sm:p-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
              Parcours candidat libre
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
              De l'inscription aux épreuves en 4 étapes
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
            Retrouvez ci-dessous les repères essentiels pour les principaux pays d'Europe.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {countries.map((country, index) => (
            <article
              key={country.name}
              className={`rounded-[2rem] border p-8 ${
                index % 3 === 0
                  ? "border-[var(--primary-blue)]/40 bg-[linear-gradient(160deg,rgba(1, 48, 120,0.12),rgba(255,255,255,0.98))]"
                  : index % 3 === 1
                    ? "border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))]"
                    : "border-[var(--primary-blue)]/50 bg-[linear-gradient(160deg,rgba(1, 48, 120,0.08),rgba(255,255,255,0.98))]"
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
                    Centres d'examen
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
            <p className="text-3xl">🇪🇺</p>
            <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
              Autre pays d'Europe ?
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--text-secondary)]">
              Contactez-nous pour obtenir les détails sur les démarches et centres d'examen de votre zone.
            </p>
            <Link
              href="/contact"
              className="mt-6 rounded-md border border-[var(--primary-blue)]/30 bg-[linear-gradient(135deg,var(--blue-pale),var(--primary-blue))] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[0_14px_36px_rgba(1, 48, 120,0.24)] transition hover:translate-y-[-1px] hover:brightness-105"
            >
              Nous contacter
            </Link>
          </article>
        </div>
      </section>

      <InternalLinkHub title="Pages à consulter pour réussir votre bac français candidat libre" />

      <CtaBanner
        title="Préparez votre Bac Français depuis l'Europe"
        description="Mon Bac Français vous guide à chaque étape : inscription Cyclades, préparation et accompagnement personnalisé."
        primaryHref="/en-ligne"
        primaryLabel="Découvrir la préparation en ligne"
        secondaryHref="/contact"
        secondaryLabel="Poser une question"
      />
    </>
  );
}
