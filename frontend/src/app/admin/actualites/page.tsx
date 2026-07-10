"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import Link from "next/link";
import { AdminGuard } from "@/components/admin-guard";
import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface Actualite {
  id: string;
  titre: string;
  contenu: string;
  resume: string | null;
  sourceUrl: string | null;
  categorie: string | null;
  imageUrl: string | null;
  publieLe: string | null;
  scrapeDate: string | null;
  status: "DRAFT" | "PUBLISHED";
  author: { id: string; name: string } | null;
  createdAt: string;
}

const emptyForm = {
  titre: "",
  contenu: "",
  resume: "",
  sourceUrl: "",
  categorie: "",
  imageUrl: "",
};

export default function AdminActualitesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [articles, setArticles] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED">("ALL");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchArticles = useCallback(async () => {
    try {
      const data = await apiGet("/actualites/admin/all");
      setArticles(data);
      setSelectedIds([]); // Clear selection when articles are fetched/refreshed
    } catch (err: any) {
      if (err.message !== "Refresh failed") {
        console.error("Erreur chargement actualités:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((x) => x !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = [...selectedIds];
      paginatedArticles.forEach((a) => {
        if (!newSelected.includes(a.id)) {
          newSelected.push(a.id);
        }
      });
      setSelectedIds(newSelected);
    } else {
      const paginatedIds = paginatedArticles.map((a) => a.id);
      setSelectedIds(selectedIds.filter((id) => !paginatedIds.includes(id)));
    }
  };

  async function handleBulkDelete() {
    if (!confirm(`Supprimer les ${selectedIds.length} articles sélectionnés ?`)) return;
    setActionLoading("bulk");
    try {
      await apiPost("/actualites/bulk-delete", { ids: selectedIds });
      setSelectedIds([]);
      await fetchArticles();
    } catch (err) {
      alert("Erreur lors de la suppression groupée");
    } finally {
      setActionLoading(null);
    }
  }

  useEffect(() => {
    if (!authLoading && user) {
      fetchArticles();
    }
  }, [fetchArticles, authLoading, user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filtered =
    filter === "ALL" ? articles : articles.filter((a) => a.status === filter);

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = filtered.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(a: Actualite) {
    setEditingId(a.id);
    setForm({
      titre: a.titre,
      contenu: a.contenu,
      resume: a.resume || "",
      sourceUrl: a.sourceUrl || "",
      categorie: a.categorie || "",
      imageUrl: a.imageUrl || "",
    });
    setShowForm(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await apiPut(`/actualites/${editingId}`, form);
      } else {
        await apiPost("/actualites", { ...form, status: "DRAFT" });
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      await fetchArticles();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePublish(id: string) {
    setActionLoading(id);
    try {
      await apiPatch(`/actualites/${id}/publish`);
      await fetchArticles();
    } catch (err) {
      alert("Erreur lors de la publication");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleUnpublish(id: string) {
    setActionLoading(id);
    try {
      await apiPatch(`/actualites/${id}/unpublish`);
      await fetchArticles();
    } catch (err) {
      alert("Erreur lors du retrait");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDeleteArticle(id: string, titre: string) {
    if (!confirm(`Supprimer l'article "${titre}" ?`)) return;
    setActionLoading(id);
    try {
      await apiDelete(`/actualites/${id}`);
      await fetchArticles();
    } catch (err) {
      alert("Erreur lors de la suppression");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <AdminGuard>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Actualités
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {articles.length} article(s) —{" "}
            {articles.filter((a) => a.status === "PUBLISHED").length} publié(s),{" "}
            {articles.filter((a) => a.status === "DRAFT").length} brouillon(s)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Filter buttons */}
          <div className="flex flex-1 sm:flex-initial rounded-md border border-[var(--border-color)] bg-white/80 p-1 justify-between sm:justify-start">
            {(["ALL", "PUBLISHED", "DRAFT"] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setSelectedIds([]);
                }}
                className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition ${
                  filter === f
                    ? "bg-blue-100 text-[var(--primary-blue)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {f === "ALL" ? "Tous" : f === "PUBLISHED" ? "Publiés" : "Brouillons"}
              </button>
            ))}
          </div>
          <button
            onClick={openCreate}
            className="w-full sm:w-auto text-center justify-center rounded-md bg-[linear-gradient(135deg,#0055a4,#0077cc)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,85,164,0.25)] transition hover:translate-y-[-1px] hover:brightness-110"
          >
            + Nouvel article
          </button>
        </div>
      </div>

      {/* ── Actions de groupe ── */}
      {paginatedArticles.length > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-[var(--border-color)] bg-white/70 p-4 backdrop-blur-sm shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={paginatedArticles.length > 0 && paginatedArticles.every((a) => selectedIds.includes(a.id))}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-[var(--border-color)] text-[var(--primary-blue)] focus:ring-[var(--primary-blue)] cursor-pointer"
              />
              <span>Sélectionner tout</span>
            </label>
            {selectedIds.length > 0 && (
              <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--primary-blue)] border border-blue-100 transition-all">
                {selectedIds.length} sélectionné(s)
              </span>
            )}
          </div>
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-end gap-2 w-full sm:w-auto animate-[fadeIn_0.2s_ease-out]">
              <button
                onClick={() => setSelectedIds([])}
                className="flex-1 sm:flex-initial rounded-md border border-[var(--border-color)] bg-white px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:bg-gray-50 active:scale-95 text-center"
              >
                Annuler la sélection
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={actionLoading === "bulk"}
                className="flex-1 sm:flex-initial rounded-md border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-1.5"
              >
                {actionLoading === "bulk" ? (
                  <span className="h-3 w-3 animate-spin rounded-md border-2 border-red-600 border-t-transparent" />
                ) : (
                  <span>Supprimer les sélectionnés</span>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Modal formulaire ── */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[var(--border-color)] bg-white p-5 sm:p-8 shadow-2xl">
            <h2 className="mb-6 text-xl font-bold text-[var(--text-primary)]">
              {editingId ? "Modifier l'article" : "Créer un article"}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                placeholder="Titre *"
                value={form.titre}
                onChange={(e) => setForm({ ...form, titre: e.target.value })}
                required
                className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  placeholder="Catégorie"
                  value={form.categorie}
                  onChange={(e) =>
                    setForm({ ...form, categorie: e.target.value })
                  }
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
                <input
                  placeholder="URL source"
                  value={form.sourceUrl}
                  onChange={(e) =>
                    setForm({ ...form, sourceUrl: e.target.value })
                  }
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <input
                placeholder="URL image"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
                className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
              />
              <textarea
                placeholder="Résumé"
                value={form.resume}
                onChange={(e) => setForm({ ...form, resume: e.target.value })}
                rows={2}
                className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
              />
              <textarea
                placeholder="Contenu complet *"
                value={form.contenu}
                onChange={(e) => setForm({ ...form, contenu: e.target.value })}
                required
                rows={8}
                className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
              />
              <div className="mt-2 flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="w-full sm:w-auto rounded-md border border-[var(--border-color)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-gray-100 text-center"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-md bg-[linear-gradient(135deg,#0055a4,#0077cc)] py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50 text-center"
                >
                  {submitting
                    ? "Enregistrement…"
                    : editingId
                      ? "Mettre à jour"
                      : "Enregistrer brouillon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Liste ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-md border-4 border-[var(--primary-blue)] border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-[var(--border-color)] bg-white/80 p-12 text-center">
          <p className="text-lg text-[var(--text-secondary)]">
            Aucun article trouvé
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {paginatedArticles.map((a) => (
            <div
              key={a.id}
              className={`flex items-start gap-3 sm:gap-4 rounded-lg border border-[var(--border-color)] bg-white/90 p-4 sm:p-5 shadow-sm transition hover:shadow-md ${
                selectedIds.includes(a.id) ? "border-blue-300 bg-blue-50/20 shadow-md" : ""
              }`}
            >
              <div className="mt-1 shrink-0 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(a.id)}
                  onChange={(e) => handleSelectOne(a.id, e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-[var(--border-color)] text-[var(--primary-blue)] focus:ring-[var(--primary-blue)] cursor-pointer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <h3 className="text-base font-semibold text-[var(--text-primary)] hover:text-[var(--primary-blue)] transition leading-snug break-words">
                        <Link href={`/actualites/${a.id}`} target="_blank" title="Voir l'article détaillé">
                          {a.titre}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`shrink-0 rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${
                            a.status === "PUBLISHED"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {a.status === "PUBLISHED" ? "Publié" : "Brouillon"}
                        </span>
                        {a.categorie && (
                          <span className="shrink-0 rounded-md bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-[var(--primary-blue)]">
                            {a.categorie}
                          </span>
                        )}
                        {a.scrapeDate && (
                          <span className="shrink-0 rounded-md bg-purple-50 px-2.5 py-0.5 text-[11px] font-medium text-purple-700">
                            Scrapé
                          </span>
                        )}
                        {a.sourceUrl && (
                          <a
                            href={a.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 rounded-md bg-gray-100 hover:bg-gray-200 px-2.5 py-0.5 text-[11px] font-medium text-gray-700 transition inline-flex items-center gap-1"
                          >
                            Source ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">
                      {a.resume || a.contenu.slice(0, 200)}
                    </p>
                    <p className="mt-2 text-xs text-[var(--text-secondary)]">
                      {a.author?.name || "Système"} ·{" "}
                      {new Date(a.createdAt).toLocaleDateString("fr-FR")}
                      {a.publieLe &&
                        ` · Publié le ${new Date(a.publieLe).toLocaleDateString("fr-FR")}`}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0 justify-start md:justify-end w-full md:w-auto">
                    {a.status === "DRAFT" ? (
                      <button
                        onClick={() => handlePublish(a.id)}
                        disabled={actionLoading === a.id}
                        className="rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 disabled:opacity-50"
                      >
                        Publier
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnpublish(a.id)}
                        disabled={actionLoading === a.id}
                        className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
                      >
                        Retirer
                      </button>
                    )}
                    <button
                      onClick={() => openEdit(a)}
                      className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-[var(--primary-blue)] transition hover:bg-blue-100"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(a.id, a.titre)}
                      disabled={actionLoading === a.id}
                      className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-color)] pt-6">
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            Affichage de <span className="font-semibold text-[var(--text-primary)]">{startIndex + 1}</span> à{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              {Math.min(endIndex, totalItems)}
            </span>{" "}
            sur <span className="font-semibold text-[var(--text-primary)]">{totalItems}</span> article(s)
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-xl border border-[var(--border-color)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-sm transition hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white active:scale-95"
            >
              Précédent
            </button>
            
            {/* Page numbers */}
            {getPageNumbers().map((page, idx) => {
              if (page === "...") {
                return (
                  <span
                    key={`dots-${idx}`}
                    className="h-8 w-8 flex items-center justify-center text-xs font-semibold text-[var(--text-secondary)]"
                  >
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`h-8 w-8 rounded-xl text-xs font-bold transition active:scale-95 ${
                    currentPage === page
                      ? "bg-[var(--primary-blue)] text-white shadow-sm"
                      : "border border-[var(--border-color)] bg-white text-[var(--text-primary)] hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-xl border border-[var(--border-color)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-sm transition hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white active:scale-95"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </AdminGuard>
  );
}
