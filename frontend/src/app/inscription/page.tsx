"use client";

import { useState } from "react";
import Link from "next/link";

type PackType = "MENSUEL" | "ANNUEL";
type Classe = "PREMIERE" | "TERMINALE";

export default function InscriptionPage() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    pays: "",
    ville: "",
    classe: "PREMIERE" as Classe,
    specialites: "",
    message: "",
    packType: "MENSUEL" as PackType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const currentPacks = [
    {
      type: "MENSUEL" as PackType,
      name: "Pack Mensuel",
      price: formData.classe === "PREMIERE" ? 185 : 195,
      description: "Accès mensuel à tous les cours et ressources",
      features: ["Accès complet aux cours", "Support par email", "Exercices corrigés"],
      hasPromo: false,
    },
    {
      type: "ANNUEL" as PackType,
      name: "Pack Annuel",
      price: formData.classe === "PREMIERE" ? 1850 : 1950,
      originalPrice: formData.classe === "PREMIERE" ? 2220 : 2340,
      description: "Accès annuel avec économie de 20%",
      features: ["Tout le pack mensuel", "Sessions de coaching", "Examens blancs", "Priorité sur le support"],
      hasPromo: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/inscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          nom: "",
          email: "",
          pays: "",
          ville: "",
          classe: "PREMIERE",
          specialites: "",
          message: "",
          packType: "MENSUEL",
        });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPack = currentPacks.find((pack) => pack.type === formData.packType);
  const finalPrice = selectedPack ? selectedPack.price : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-primary)] to-[var(--gray-50)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--primary-blue)]"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Rejoignez Mon Bac Français
          </h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)] sm:text-xl">
            Préparez votre bac français en candidat libre avec un accompagnement personnalisé
          </p>
        </div>

        {submitSuccess ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-green-200 bg-green-50 p-12 text-center shadow-lg">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)]">
              Inscription réussie !
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Votre inscription a été enregistrée avec succès. Nous vous contacterons bientôt pour finaliser votre inscription.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-[var(--text-primary)]">
                  Informations personnelles
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nom"
                      className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                    >
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      required
                      value={formData.nom}
                      onChange={(e) =>
                        setFormData({ ...formData, nom: e.target.value })
                      }
                      className="w-full rounded-lg border border-[var(--border-color)] px-4 py-3 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-[var(--border-color)] px-4 py-3 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pays"
                      className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                    >
                      Pays *
                    </label>
                    <input
                      type="text"
                      id="pays"
                      required
                      value={formData.pays}
                      onChange={(e) =>
                        setFormData({ ...formData, pays: e.target.value })
                      }
                      className="w-full rounded-lg border border-[var(--border-color)] px-4 py-3 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20"
                      placeholder="Votre pays"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ville"
                      className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                    >
                      Ville *
                    </label>
                    <input
                      type="text"
                      id="ville"
                      required
                      value={formData.ville}
                      onChange={(e) =>
                        setFormData({ ...formData, ville: e.target.value })
                      }
                      className="w-full rounded-lg border border-[var(--border-color)] px-4 py-3 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20"
                      placeholder="Votre ville"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="classe"
                      className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                    >
                      Classe *
                    </label>
                    <select
                      id="classe"
                      required
                      value={formData.classe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          classe: e.target.value as Classe,
                        })
                      }
                      className="w-full rounded-lg border border-[var(--border-color)] px-4 py-3 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20"
                    >
                      <option value="PREMIERE">Première</option>
                      <option value="TERMINALE">Terminale</option>
                    </select>
                    <div className="mt-3 grid grid-cols-2 gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--blue-pale)]/30 p-3">
                      <div className="flex flex-col justify-center border-r border-[var(--border-color)] pr-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                          Pack Mensuel
                        </span>
                        <span className="mt-0.5 text-sm font-black text-[var(--primary-blue)]">
                          {formData.classe === "PREMIERE" ? "185" : "195"}€<span className="text-[10px] font-medium text-[var(--text-secondary)]"> / mois</span>
                        </span>
                      </div>
                      <div className="flex flex-col justify-center pl-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                            Pack Annuel
                          </span>
                          <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-bold text-green-700">
                            -20%
                          </span>
                        </div>
                        <span className="mt-0.5 text-sm font-black text-[var(--primary-blue)]">
                          {formData.classe === "PREMIERE" ? "1850" : "1950"}€<span className="text-[10px] font-medium text-[var(--text-secondary)]"> / an</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="specialites"
                      className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                    >
                      Spécialités *
                    </label>
                    <input
                      type="text"
                      id="specialites"
                      required
                      value={formData.specialites}
                      onChange={(e) =>
                        setFormData({ ...formData, specialites: e.target.value })
                      }
                      className="w-full rounded-lg border border-[var(--border-color)] px-4 py-3 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20"
                      placeholder="Ex: SVT, Mathématiques, Physique"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--white)] p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">
                  Message additionnel
                </h2>
                <p className="mb-4 text-sm text-[var(--text-secondary)]">
                  Partagez-nous vos objectifs ou questions spécifiques
                </p>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--border-color)] px-4 py-3 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20"
                  placeholder="Votre message..."
                />
              </div>
            </form>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Choisissez votre pack
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {currentPacks.map((pack) => (
                  <div
                    key={pack.type}
                    className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
                      formData.packType === pack.type
                        ? "border-[var(--primary-blue)] bg-gradient-to-br from-[var(--blue-light)] to-[var(--white)] shadow-lg"
                        : "border-[var(--border-color)] bg-[var(--white)] hover:border-[var(--primary-blue)] hover:shadow-md"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, packType: pack.type })
                    }
                  >
                    {formData.packType === pack.type && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary-blue)] px-3 py-1 text-xs font-semibold text-[var(--white)]">
                        Sélectionné
                      </div>
                    )}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">
                        {pack.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {pack.description}
                      </p>
                    </div>
                    <ul className="mb-4 space-y-2">
                      {pack.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary-blue)]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-3xl font-bold text-[var(--primary-blue)]">
                        {pack.price}€
                      </span>
                      {pack.hasPromo ? (
                        <>
                          <span className="text-sm text-[var(--text-secondary)] line-through">
                            {pack.originalPrice}€
                          </span>
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                            Promo -20%
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-[var(--text-secondary)] font-normal">
                          / mois
                        </span>
                      )}
                    </div>
                    {formData.packType === pack.type && (
                      <div className="absolute right-4 top-4">
                        <svg
                          className="h-6 w-6 text-[var(--primary-blue)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>



              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[var(--primary-red)] px-6 py-4 text-base font-semibold text-[var(--white)] transition-all hover:bg-[var(--red-dark)] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Envoi en cours..." : "Confirmer mon inscription"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
