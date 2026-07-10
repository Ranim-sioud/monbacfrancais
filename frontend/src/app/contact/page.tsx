"use client";

import { useState } from "react";

import { CtaBanner } from "@/components/cta-banner";
import { InternalLinkHub } from "@/components/internal-link-hub";
import { PageHero } from "@/components/page-hero";

const contactItems = [
  {
    title: "Réponse personnalisée",
    text: "Expliquez votre situation, votre pays de résidence et vos objectifs pour obtenir une orientation adaptée.",
  },
  {
    title: "Parcours clarifié",
    text: "Nous vous aidons à identifier la bonne rubrique et les prochaines étapes les plus utiles.",
  },
  {
    title: "Accompagnement rassurant",
    text: "Le site est conçu pour transformer une demande d'information en échange concret et professionnel.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', country: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Une erreur est survenue lors de l\'envoi du formulaire.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Prise de contact"
        title="Échangez avec Mon Bac Français"
        description="Une page contact premium pour rassurer les familles, capter les demandes qualifiées et encourager le passage à l'action."
        highlights={[
          "Formulaire simple et lisible",
          "Message clair pour les familles",
          "Approche professionnelle",
          "CTA orienté conversion",
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8 shadow-[0_16px_44px_rgba(0,85,164,0.14)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
              Formulaire de contact
            </p>
            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Nom complet
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--primary-blue)]"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Adresse e-mail
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
                  required
                  className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--primary-blue)]"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Pays de résidence
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Tunisie, Maroc, Espagne..."
                  className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--primary-blue)]"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
                Votre message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Décrivez votre situation, votre niveau et vos questions principales."
                  required
                  className="min-h-40 rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--primary-blue)]"
                />
              </label>

              {submitStatus === 'success' && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                  Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md border border-[var(--primary-blue)] bg-[linear-gradient(135deg,var(--primary-blue),var(--blue-light))] px-6 py-4 text-sm font-semibold text-[var(--white)] shadow-[0_16px_40px_rgba(0,85,164,0.2)] transition hover:translate-y-[-1px] hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
              </button>
            </form>
          </div>

          <div className="grid gap-6">
            {contactItems.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-lg border p-7 ${
                  index === 0
                    ? "border-[var(--primary-blue)] bg-[linear-gradient(160deg,rgba(234,244,255,0.92),rgba(255,255,255,0.96))]"
                    : "border-[var(--border-color)] bg-white"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
                  Relation de confiance
                </p>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{item.title}</h2>
                <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkHub title="Pages à consulter avant de nous contacter" />

      <CtaBanner
        title="Besoin d'un premier échange avant l'inscription ?"
        description="Cette page est pensée pour convertir les visiteurs hésitants en demandes qualifiées avec un ton rassurant et premium."
        primaryHref="/inscription-candidat-libre"
        primaryLabel="Voir l'inscription"
        secondaryHref="/guide-bac-francais"
        secondaryLabel="Explorer le guide"
      />
    </>
  );
}
