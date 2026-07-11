import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner";
import { InternalLinkHub } from "@/components/internal-link-hub";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Inscription bac français candidat libre",
  description:
    "Inscription bac français candidat libre : guide étape par étape avec Cyclades, documents nécessaires, dates importantes et centres d'examen.",
  keywords: [
    "inscription bac français candidat libre",
    "bac français candidat libre",
    "bac français étranger",
    "bac français tunisie",
  ],
  openGraph: {
    title: "Inscription bac français candidat libre",
    description:
      "Toutes les étapes pour s'inscrire au bac français candidat libre via Cyclades.",
    url: "/inscription-candidat-libre",
    type: "article",
  },
  alternates: {
    canonical: "/inscription-candidat-libre",
  },
};

const eligibilityItems = [
  "Élèves hors établissement scolaire français souhaitant passer le Bac en candidat libre",
  "Élèves expatriés ou résidant à l'étranger rattachés à une académie française",
  "Candidats qui remplissent les conditions administratives de leur académie de rattachement",
  "Candidats capables de suivre une préparation autonome ou accompagnée à distance",
];

const requiredDocuments = [
  "Pièce d'identité en cours de validité",
  "Justificatif de domicile (ou de résidence à l'étranger)",
  "Relevés de notes / certificats scolaires selon votre parcours",
  "Choix des spécialités et informations sur la série (voie générale)",
  "Pièces spécifiques demandées par votre académie sur Cyclades",
  "Diplôme ou certificat de scolarité antérieur",
  "Justificatif de niveau pour toute demande de dispense d'épreuve",
  "Photo d'identité aux normes officielles",
];

const keyDates = [
  {
    period: "Septembre - octobre",
    detail: "Ouverture habituelle des inscriptions sur Cyclades (selon académie).",
  },
  {
    period: "Novembre - décembre",
    detail: "Clôture des inscriptions et vérification des pièces justificatives.",
  },
  {
    period: "Mars - mai",
    detail: "Révisions intensives, convocations et préparation logistique.",
  },
  {
    period: "Juin - juillet",
    detail: "Épreuves écrites, orales, Grand Oral et publication des résultats.",
  },
];

const timelineSteps = [
  {
    step: "01",
    title: "Vérifier qui peut s'inscrire",
    text: "Confirmez votre éligibilité : situation scolaire, pays de résidence et académie de rattachement.",
  },
  {
    step: "02",
    title: "Créer votre compte Cyclades",
    text: "Accédez à la plateforme Cyclades, créez un compte candidat puis lancez votre inscription.",
  },
  {
    step: "03",
    title: "Renseigner votre dossier",
    text: "Indiquez vos informations personnelles, vos spécialités et votre centre d'examen souhaité si demandé.",
  },
  {
    step: "04",
    title: "Déposer les documents nécessaires",
    text: "Téléversez toutes les pièces demandées dans les délais pour éviter tout blocage du dossier.",
  },
  {
    step: "05",
    title: "Suivre les dates importantes",
    text: "Respectez le calendrier académique : inscriptions, convocations et périodes d'épreuves.",
  },
  {
    step: "06",
    title: "Passer les épreuves au centre",
    text: "Présentez-vous au centre d'examen indiqué sur la convocation avec les documents requis.",
  },
];

export default function InscriptionPage() {
  return (
    <>
      <PageHero
        eyebrow="Inscription officielle"
        title="Inscription Bac Français en candidat libre"
        description="Un guide simple et clair pour s'inscrire correctement : qui peut candidater, quelles étapes suivre, comment utiliser Cyclades, quels documents fournir, et comment anticiper les dates et les centres d'examen."
        highlights={[
          "Processus expliqué étape par étape",
          "Plateforme Cyclades",
          "Documents, dates et centres d'examen",
          "Guide visuel pour éviter les erreurs",
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-[var(--border-color)] bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
              1. Qui peut s&apos;inscrire
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
              Conditions d&apos;éligibilité
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
              {eligibilityItems.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-[var(--border-color)] bg-[var(--gray-50)] px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-red-300/40 bg-[linear-gradient(160deg,rgba(0, 207, 232,0.12),rgba(255,255,255,0.98))] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
              2. Les étapes d&apos;inscription
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
              Processus complet
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
              Le plus sûr est d&apos;avancer dans l&apos;ordre : vérification de l&apos;éligibilité,
              création du compte, dépôt des pièces, validation du dossier puis suivi des
              convocations.
            </p>
          </article>

          <article className="rounded-[2rem] border border-cyan-200/70 bg-red-50 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-700">
              3. Plateforme Cyclades
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
              Portail officiel
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
              Cyclades centralise l&apos;inscription et les convocations. Vérifiez toujours
              que votre académie de rattachement est correcte avant de valider.
            </p>
            <Link
              href="https://cdn-statiques.phm.education.gouv.fr/exaco/cyclades/portailcandi/resources/cnx/publicationNotes.html"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-md border border-[var(--border-color)] bg-white px-5 py-3 text-sm font-semibold text-[var(--primary-blue)] transition hover:bg-cyan-50"
            >
              Ouvrir Cyclades
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_16px_44px_rgba(1, 48, 120,0.14)] sm:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
              Timeline visuelle
            </p>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Guide étape par étape
            </h2>
            <p className="text-base leading-8 text-[var(--text-secondary)]">
              Suivez cette séquence pour éviter les oublis et sécuriser votre inscription.
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            {timelineSteps.map((step, index) => (
              <article
                key={step.step}
                className="relative rounded-[1.7rem] border border-[var(--border-color)] bg-white p-6"
              >
                {index < timelineSteps.length - 1 ? (
                  <div className="pointer-events-none absolute left-10 top-16 h-10 w-px bg-[var(--border-color)]" />
                ) : null}
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-red-300/50 bg-cyan-100 text-sm font-semibold text-cyan-800">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{step.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-lg border border-[var(--border-color)] bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
              4. Documents nécessaires
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Cette liste concerne le dossier d'inscription (à distinguer de la convocation à
              présenter le jour de l'examen — cf. section ci-dessous).
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
              {requiredDocuments.map((doc) => (
                <li
                  key={doc}
                  className="rounded-xl border border-[var(--border-color)] bg-[var(--gray-50)] px-4 py-3"
                >
                  {doc}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-[var(--border-color)] bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
              5. Dates importantes
            </p>
            <div className="mt-5 space-y-3">
              {keyDates.map((date) => (
                <div
                  key={date.period}
                  className="rounded-xl border border-[var(--border-color)] bg-[var(--gray-50)] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{date.period}</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--text-secondary)]">{date.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-[var(--border-color)] bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
              6. Centres d&apos;examen
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
              Identifier le bon centre
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Le centre d&apos;examen dépend de votre académie et de votre pays de résidence.
              La convocation officielle reçue via Cyclades confirme le lieu exact des épreuves.
            </p>
            <div className="mt-5 rounded-xl border border-cyan-200/70 bg-red-50 px-4 py-3 text-sm leading-7 text-[var(--text-secondary)]">
              Astuce : anticipez la logistique (déplacements, hébergement si nécessaire, pièces à
              présenter le jour J).
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_16px_44px_rgba(1, 48, 120,0.14)] sm:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
              Le jour de l'examen
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
              Ce qu'il faut apporter
            </h2>
            <p className="text-base leading-8 text-[var(--text-secondary)]">
              Le jour de l'examen, venez préparé avec tous les documents et le matériel nécessaires.
              Une bonne organisation évite le stress et les imprévus.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-[var(--border-color)] bg-white p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Documents obligatoires</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary-blue)] mt-1">✓</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">La convocation officielle</strong> :
                    document distinct du dossier d'inscription, à réimprimer et vérifier avant le jour J
                    (salle, horaire et centre peuvent différer des prévisions initiales)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary-blue)] mt-1">✓</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Une pièce d'identité valide</strong> :
                    vérification en salle
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[var(--border-color)] bg-white p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Matériel autorisé</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary-blue)] mt-1">✓</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Stylo, règle, etc.</strong> selon
                    l'épreuve
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary-blue)] mt-1">✓</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Calculatrice en mode examen</strong> :
                    obligatoire pour certaines épreuves scientifiques, à paramétrer avant le jour J
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-red-300/40 bg-red-50 p-6">
              <h3 className="text-lg font-semibold text-red-700">Matériel interdit</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Téléphone portable</strong> : même
                    éteint
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Montres connectées</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Brouillons personnels</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[var(--border-color)] bg-white p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Conseils pratiques</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary-blue)] mt-1">→</span>
                  <span>Arriver en avance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary-blue)] mt-1">→</span>
                  <span>
                    Prévoir la procédure en cas de retard ou de perte de convocation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary-blue)] mt-1">→</span>
                  <span>
                    Aménagements possibles (tiers-temps, etc.) : doivent avoir été demandés en amont
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkHub title="Liens utiles avant de valider votre inscription" />

      <CtaBanner
        title="Besoin d'aide pour finaliser votre inscription ?"
        description="Nous vous aidons à vérifier votre dossier, anticiper les dates et préparer votre parcours candidat libre sans stress."
        primaryHref="/contact"
        primaryLabel="Contacter l'équipe"
        secondaryHref="/guide-bac-francais"
        secondaryLabel="Voir le guide du Bac"
      />
    </>
  );
}
