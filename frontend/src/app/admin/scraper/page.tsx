"use client";

import { useState } from "react";
import { AdminGuard } from "@/components/admin-guard";
import { apiPost } from "@/lib/api";

interface ScraperResult {
  message: string;
  created: number;
  updated: number;
  errors: number;
}

export default function AdminScraperPage() {
  const [agenceResult, setAgenceResult] = useState<ScraperResult | null>(null);
  const [actualiteResult, setActualiteResult] = useState<ScraperResult | null>(
    null
  );
  const [loadingAgences, setLoadingAgences] = useState(false);
  const [loadingActualites, setLoadingActualites] = useState(false);

  async function scrapeAgences() {
    setLoadingAgences(true);
    setAgenceResult(null);
    try {
      const data = await apiPost("/admin/scraper/agences", {});
      setAgenceResult(data);
    } catch (err) {
      setAgenceResult({
        message: "Erreur lors du scraping des agences",
        created: 0,
        updated: 0,
        errors: 1,
      });
    } finally {
      setLoadingAgences(false);
    }
  }

  async function scrapeActualites() {
    setLoadingActualites(true);
    setActualiteResult(null);
    try {
      const data = await apiPost("/admin/scraper/actualites", {});
      setActualiteResult(data);
    } catch (err) {
      setActualiteResult({
        message: "Erreur lors du scraping des actualités",
        created: 0,
        updated: 0,
        errors: 1,
      });
    } finally {
      setLoadingActualites(false);
    }
  }

  function ResultCard({ result }: { result: ScraperResult }) {
    const hasErrors = result.errors > 0;
    return (
      <div
        className={`mt-4 rounded-lg border px-5 py-4 ${
          hasErrors
            ? "border-cyan-200 bg-red-50/60"
            : "border-green-200 bg-green-50/60"
        }`}
      >
        <p
          className={`text-sm font-medium ${hasErrors ? "text-cyan-800" : "text-green-800"}`}
        >
          {result.message}
        </p>
        <div className="mt-3 flex gap-6">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {result.created}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">Créé(s)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {result.updated}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">Mis à jour</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{result.errors}</p>
            <p className="text-xs text-[var(--text-secondary)]">Erreur(s)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminGuard>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Scraper
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Lancer le scraping automatique pour importer du contenu externe
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Agences scraper */}
        <div className="rounded-[1.8rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-7 shadow-sm">
          <div className="mb-1 text-3xl">🏢</div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Scraping Agences
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Importer les agences depuis les sources configurées. Les nouvelles
            agences sont marquées comme{" "}
            <span className="font-medium text-purple-700">SCRAPED</span> et{" "}
            <span className="font-medium text-amber-700">non vérifiées</span>.
          </p>
          <button
            onClick={scrapeAgences}
            disabled={loadingAgences}
            className="mt-5 w-full rounded-md bg-[linear-gradient(135deg,#0055a4,#0077cc)] py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50"
          >
            {loadingAgences ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-md border-2 border-white border-t-transparent" />
                Scraping en cours…
              </span>
            ) : (
              "Lancer le scraping"
            )}
          </button>
          {agenceResult && <ResultCard result={agenceResult} />}
        </div>

        {/* Actualités scraper */}
        <div className="rounded-[1.8rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-7 shadow-sm">
          <div className="mb-1 text-3xl">📰</div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Scraping Actualités
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Importer les actualités depuis les sources configurées. Les nouveaux
            articles sont créés en{" "}
            <span className="font-medium text-amber-700">BROUILLON</span> pour
            validation manuelle.
          </p>
          <button
            onClick={scrapeActualites}
            disabled={loadingActualites}
            className="mt-5 w-full rounded-md bg-[linear-gradient(135deg,#0055a4,#0077cc)] py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50"
          >
            {loadingActualites ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-md border-2 border-white border-t-transparent" />
                Scraping en cours…
              </span>
            ) : (
              "Lancer le scraping"
            )}
          </button>
          {actualiteResult && <ResultCard result={actualiteResult} />}
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 rounded-lg border border-blue-200/50 bg-blue-50/60 px-6 py-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Conseil :</strong> Après chaque scraping, rendez-vous sur
          les pages{" "}
          <span className="font-semibold">Agences</span> ou{" "}
          <span className="font-semibold">Actualités</span> pour vérifier et
          publier le contenu importé.
        </p>
      </div>
    </AdminGuard>
  );
}
