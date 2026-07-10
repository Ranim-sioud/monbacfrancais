"use client";

import { useState } from "react";

type PackType = "MENSUEL" | "ANNUEL";
type Classe = "PREMIERE" | "TERMINALE";

interface InscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PACKS = [
  {
    type: "MENSUEL" as PackType,
    name: "Pack Mensuel",
    price: 190,
    description: "Accès mensuel à tous les cours et ressources",
  },
  {
    type: "ANNUEL" as PackType,
    name: "Pack Annuel",
    price: 1850,
    description: "Accès annuel avec économie de 20%",
  },
];

export function InscriptionModal({ isOpen, onClose }: InscriptionModalProps) {
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

  if (!isOpen) return null;

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
        onClose();
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
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPack = PACKS.find((pack) => pack.type === formData.packType);
  const finalPrice = selectedPack ? selectedPack.price * 0.8 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-[var(--white)] shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--white)] p-4">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Formulaire d&apos;inscription
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-[var(--text-secondary)] transition hover:bg-[var(--gray-100)] hover:text-[var(--text-primary)]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
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
              <h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">
                Inscription réussie !
              </h3>
              <p className="text-center text-[var(--text-secondary)]">
                Votre inscription a été enregistrée avec succès. Nous vous
                contacterons bientôt.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="nom"
                    className="mb-1 block text-sm font-medium text-[var(--text-primary)]"
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
                    className="w-full rounded-md border border-[var(--border-color)] px-3 py-2 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)]"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-[var(--text-primary)]"
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
                    className="w-full rounded-md border border-[var(--border-color)] px-3 py-2 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)]"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pays"
                    className="mb-1 block text-sm font-medium text-[var(--text-primary)]"
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
                    className="w-full rounded-md border border-[var(--border-color)] px-3 py-2 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)]"
                    placeholder="Votre pays"
                  />
                </div>

                <div>
                  <label
                    htmlFor="ville"
                    className="mb-1 block text-sm font-medium text-[var(--text-primary)]"
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
                    className="w-full rounded-md border border-[var(--border-color)] px-3 py-2 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)]"
                    placeholder="Votre ville"
                  />
                </div>

                <div>
                  <label
                    htmlFor="classe"
                    className="mb-1 block text-sm font-medium text-[var(--text-primary)]"
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
                    className="w-full rounded-md border border-[var(--border-color)] px-3 py-2 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)]"
                  >
                    <option value="PREMIERE">Première</option>
                    <option value="TERMINALE">Terminale</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="specialites"
                    className="mb-1 block text-sm font-medium text-[var(--text-primary)]"
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
                    className="w-full rounded-md border border-[var(--border-color)] px-3 py-2 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)]"
                    placeholder="Ex: SVT, Mathématiques, Physique"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-[var(--text-primary)]"
                >
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-md border border-[var(--border-color)] px-3 py-2 text-[var(--text-primary)] transition focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)]"
                  placeholder="Votre message..."
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-[var(--text-primary)]">
                  Choisissez votre pack *
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  {PACKS.map((pack) => (
                    <div
                      key={pack.type}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition ${
                        formData.packType === pack.type
                          ? "border-[var(--primary-blue)] bg-[var(--blue-light)]"
                          : "border-[var(--border-color)] bg-[var(--white)] hover:border-[var(--primary-blue)]"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, packType: pack.type })
                      }
                    >
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          {pack.name}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {pack.description}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[var(--primary-blue)]">
                          {pack.price}€
                        </span>
                        {formData.packType === pack.type && (
                          <span className="text-sm font-semibold text-green-600">
                            -20% = {Math.round(pack.price * 0.8)}€
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
              </div>

              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gray-50)] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">
                    Prix final (après réduction de 20%)
                  </span>
                  <span className="text-2xl font-bold text-[var(--primary-blue)]">
                    {Math.round(finalPrice)}€
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[var(--primary-blue)] px-4 py-3 text-sm font-semibold text-[var(--white)] transition hover:bg-[var(--blue-dark)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Envoi en cours..." : "S'inscrire"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
