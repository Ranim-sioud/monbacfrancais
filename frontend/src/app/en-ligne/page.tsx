import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner";
import { InternalLinkHub } from "@/components/internal-link-hub";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Préparation bac français en ligne",
  description:
    "Préparation bac français en ligne pour candidats libres : cours en visioconférence, suivi pédagogique, examens blancs et inscription.",
  keywords: [
    "préparation bac français en ligne",
    "bac français candidat libre",
    "inscription bac français candidat libre",
    "bac français étranger",
  ],
  openGraph: {
    title: "Préparation bac français en ligne",
    description:
      "Accompagnement à distance pour préparer le bac français candidat libre depuis l'étranger.",
    url: "/en-ligne",
    type: "article",
  },
  alternates: {
    canonical: "/en-ligne",
  },
};

const programFeatures = [
  {
    title: "Fonctionnement clair",
    text: "Le parcours est conçu pour les élèves de Première et Terminale qui souhaitent préparer le Bac Français à distance, avec une organisation simple, progressive et adaptée à la vie à l'étranger.",
  },
  {
    title: "Inscription en ligne",
    text: "L'entrée dans le programme se fait en ligne via un formulaire complet. Cela permet de comprendre rapidement votre profil, votre niveau et vos besoins avant de proposer un accompagnement adapté.",
  },
  {
    title: "Professeurs disponibles",
    text: "Les élèves bénéficient d'une équipe pédagogique disponible pour répondre aux questions, ajuster le rythme de travail et sécuriser les étapes importantes de la préparation.",
  },
];

const teachingModules = [
  {
    title: "Cours en visioconférence",
    description:
      "Des séances à distance structurées pour travailler les notions, la méthode et la préparation aux épreuves dans un cadre interactif.",
  },
  {
    title: "Suivi pédagogique",
    description:
      "Un accompagnement régulier pour suivre la progression, identifier les points de blocage et maintenir une dynamique de travail constante.",
  },
  {
    title: "Examens blancs",
    description:
      "Des entraînements dans les conditions de l'examen pour évaluer le niveau, gagner en confiance et corriger les points faibles avant les épreuves officielles.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Vous candidatez en ligne",
    text: "Vous complétez le formulaire avec vos informations scolaires, votre pays, votre ville et vos spécialités pour présenter votre situation.",
  },
  {
    step: "02",
    title: "Nous analysons votre profil",
    text: "L'équipe pédagogique identifie vos objectifs, vos contraintes et le niveau d'accompagnement nécessaire pour construire un parcours cohérent.",
  },
  {
    step: "03",
    title: "Vous démarrez à distance",
    text: "Les cours en visioconférence, le suivi pédagogique et les examens blancs s'articulent dans une organisation claire et rassurante.",
  },
];

const values = [
  "Une expérience 100% en ligne pensée pour les familles à l'international",
  "Une méthode premium inspirée des meilleures plateformes éducatives",
  "Une logique de conversion claire entre information, confiance et inscription",
];

export default function EnLignePage() {
  return (
    <>
      <PageHero
        eyebrow="Préparation à distance"
        title="Passer le Bac Français en candidat libre à distance"
        description="Une page dédiée au parcours en ligne pour comprendre le fonctionnement, découvrir l'accompagnement et s'inscrire facilement depuis l'étranger."
        highlights={[
          "Inscription 100% en ligne",
          "Cours en visioconférence",
          "Professeurs disponibles",
          "Suivi pédagogique et examens blancs",
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
            Comment cela fonctionne
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Une préparation du Bac Français conçue pour l&apos;enseignement à distance
          </h2>
          <p className="text-lg leading-8 text-[var(--text-secondary)]">
            La formule en ligne permet aux candidats libres de suivre un accompagnement complet
            sans dépendre d&apos;un établissement local. L&apos;objectif est de rendre la préparation
            accessible, lisible et performante depuis n&apos;importe quel pays.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {programFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-6 sm:p-8 shadow-[0_12px_30px_rgba(0,85,164,0.12)]"
            >
              <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{feature.title}</h3>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {teachingModules.map((module, index) => (
            <article
              key={module.title}
              className={`rounded-[2rem] border p-6 sm:p-8 ${
                index === 1
                  ? "border-[var(--primary-blue)]/40 bg-[linear-gradient(160deg,rgba(0,85,164,0.12),rgba(255,255,255,0.98))]"
                  : "border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))]"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Accompagnement
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">{module.title}</h3>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{module.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="min-w-0 rounded-[2.1rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-6 sm:p-8 md:p-10 shadow-[0_16px_40px_rgba(0,85,164,0.14)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
            Parcours élève
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">
            Trois étapes pour démarrer sereinement
          </h2>
          <div className="mt-8 grid gap-5">
            {processSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-lg border border-[var(--border-color)] bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
                  Étape {item.step}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-[2.1rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(234,244,255,0.94))] p-6 sm:p-8 md:p-10 shadow-[0_16px_44px_rgba(0,85,164,0.14)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Inscription en ligne
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">
                Demandez votre accompagnement
              </h2>
            </div>
            <span className="self-start rounded-md border border-red-300/40 bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-800">
              Première / Terminale
            </span>
          </div>

          <form className="mt-8 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Nom
                <input
                  type="text"
                  placeholder="Votre nom complet"
                  className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--blue-light)]"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Email
                <input
                  type="email"
                  placeholder="vous@exemple.com"
                  className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--blue-light)]"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Pays
                <input
                  type="text"
                  placeholder="Votre pays"
                  className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--blue-light)]"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Ville
                <input
                  type="text"
                  placeholder="Votre ville"
                  className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--blue-light)]"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Classe
                <select className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--blue-light)]">
                  <option>Première</option>
                  <option>Terminale</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Spécialités
                <input
                  type="text"
                  placeholder="Ex : Maths, SES, Physique"
                  className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--blue-light)]"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
              Message
              <textarea
                rows={6}
                placeholder="Décrivez votre situation, vos objectifs et vos questions."
                className="min-h-40 rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--blue-light)]"
              />
            </label>

            <button
              type="button"
              className="rounded-md border border-[var(--primary-blue)]/30 bg-[linear-gradient(135deg,var(--blue-pale),var(--primary-blue))] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(0,85,164,0.24)] transition hover:translate-y-[-1px] hover:brightness-105"
            >
              Envoyer ma demande
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-5">
          {values.map((value) => (
            <div
              key={value}
              className="rounded-[1.8rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.95),rgba(237,245,255,0.9))] p-6 text-base leading-8 text-[var(--text-secondary)]"
            >
              {value}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.1rem] border border-[var(--border-color)] bg-white p-6 sm:p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
            Galerie pédagogique
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">
            Cours en ligne et accompagnement
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=900&q=80"
                alt="Cours à distance sur ordinateur"
                width={900}
                height={600}
                className="h-44 w-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80"
                alt="Élèves en visioconférence"
                width={900}
                height={600}
                className="h-44 w-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
                alt="Professeur expliquant un cours"
                width={900}
                height={600}
                className="h-44 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.1rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-6 sm:p-8 md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                Disponibilité et accompagnement
              </p>
              <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
                Une approche humaine derrière la plateforme
              </h2>
              <p className="text-base leading-8 text-[var(--text-secondary)]">
                La disponibilité des professeurs, la régularité du suivi et les examens blancs
                permettent de transformer une préparation isolée en parcours structuré.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-md border border-[var(--primary-blue)]/30 bg-[var(--blue-pale)] px-5 py-3 text-sm font-semibold text-[var(--primary-blue)] transition hover:bg-[var(--blue-light)]"
            >
              Poser une question
            </Link>
          </div>
        </div>
      </section>

      <InternalLinkHub title="Liens utiles pour l'inscription candidat libre" />

      <CtaBanner
        title="Préparez votre Bac Français à distance avec un cadre clair"
        description="La page En ligne est pensée comme une landing page de conversion moderne, inspirée des plateformes éducatives premium."
        primaryHref="/contact"
        primaryLabel="Contacter l'équipe"
        secondaryHref="/guide-bac-francais"
        secondaryLabel="Voir le guide"
      />
    </>
  );
}
