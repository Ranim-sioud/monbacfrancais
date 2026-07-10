import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/cta-banner";
import { InternalLinkHub } from "@/components/internal-link-hub";

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

async function getActualite(id: string): Promise<Actualite | null> {
  try {
    const res = await fetch(`${API_BASE}/actualites/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getActualite(resolvedParams.id);
  if (!article) {
    return {
      title: "Actualité non trouvée",
    };
  }
  return {
    title: `${article.titre} | MonBacFrançais`,
    description: article.resume || article.contenu.substring(0, 160),
  };
}

export default async function ActualiteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const article = await getActualite(resolvedParams.id);

  if (!article) {
    notFound();
  }

  const paragraphs = article.contenu.split('\n\n').filter((p) => p.trim().length > 0);
  const keyPointsParagraph = paragraphs.find((p) => p.startsWith('📌'));
  const otherParagraphs = paragraphs.filter((p) => !p.startsWith('📌'));

  return (
    <>
      <div className="bg-[linear-gradient(180deg,#0055a4,var(--text-primary))] py-16 text-white sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100 transition"
          >
            ← Retour aux actualités
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {article.categorie && (
              <span className="rounded-md bg-red-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-300 border border-red-500/30">
                {article.categorie}
              </span>
            )}
            <span className="text-xs text-slate-300">
              Publié le {article.publieLe ? new Date(article.publieLe).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric"
              }) : new Date(article.createdAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            {article.titre}
          </h1>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <main className="min-w-0">
            {article.imageUrl && (
              <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-[var(--border-color)] shadow-md aspect-video">
                <img
                  src={article.imageUrl}
                  alt={article.titre}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {keyPointsParagraph && (
              <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50/50 p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
                  <span>📌</span> Informations clés de cette actualité
                </h3>
                <ul className="mt-4 space-y-3 text-slate-700">
                  {keyPointsParagraph
                    .replace(/📌\s*\*\*?[^*]+\*\*?/, '')
                    .split('\n')
                    .map((line) => line.trim())
                    .filter((line) => line.length > 0)
                    .map((line, lIdx) => {
                      const cleanLine = line.replace(/^[•\s\-\*]+/, '').trim();
                      if (!cleanLine) return null;
                      return (
                        <li key={lIdx} className="flex items-start gap-3 text-[17px] leading-relaxed">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-md bg-[var(--primary-blue)]" />
                          <span>{cleanLine}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            <div className="prose prose-slate max-w-none prose-lg text-slate-700 leading-8">
              {otherParagraphs.map((p, idx) => (
                <p key={idx} className="mb-6 whitespace-pre-line text-lg text-slate-700">
                  {p}
                </p>
              ))}
            </div>

            {article.sourceUrl && (
              <div className="mt-12 rounded-[2rem] border border-red-100 bg-cyan-50/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">
                    Envie d&apos;en savoir plus ?
                  </h4>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Consultez l&apos;intégralité de cet article sur le site officiel de sa source.
                  </p>
                </div>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex rounded-md bg-[linear-gradient(135deg,#0055a4,#0077cc)] px-6 py-3 text-sm font-semibold text-white shadow-md hover:brightness-105 transition"
                >
                  Lire l&apos;article d&apos;origine ↗
                </a>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="rounded-lg border border-[var(--border-color)] bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[var(--text-primary)] text-base">À propos du site</h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                MonBacFrançais vous propose des actualités sélectionnées et validées pour vous aider dans votre parcours de révisions et vos démarches pour le Bac de Français.
              </p>
            </div>

            <div className="rounded-lg border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-6 shadow-sm">
              <h3 className="font-bold text-[var(--text-primary)] text-base">Candidat Libre ?</h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                Accédez à nos guides spécialisés et nos fiches de révisions gratuites pour maximiser vos chances de réussite.
              </p>
              <Link
                href="/guide-bac-francais"
                className="mt-4 block text-center rounded-md border border-blue-200 bg-white/80 py-2.5 text-xs font-semibold text-[var(--primary-blue)] hover:bg-white transition"
              >
                Accéder au guide
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <InternalLinkHub title="Consultez également nos fiches thématiques" />

      <CtaBanner
        title="Préparez votre Bac de Français avec sérénité"
        description="Trouvez des réponses à toutes vos questions sur les coefficients, les épreuves et les œuvres au programme."
        primaryHref="/contact"
        primaryLabel="Nous contacter"
        secondaryHref="/guide-bac-francais"
        secondaryLabel="Découvrir le guide"
      />
    </>
  );
}
