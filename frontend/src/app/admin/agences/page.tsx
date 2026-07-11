"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { AdminGuard } from "@/components/admin-guard";
import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface Agence {
  id: string;
  nom: string;
  type: string | null;
  pays: string;
  ville: string | null;
  adresse: string | null;
  telephone: string | null;
  email: string | null;
  siteWeb: string | null;
  facebook: string | null;
  logoUrl: string | null;
  description: string | null;
  source: "MANUAL" | "SCRAPED";
  verified: boolean;
  createdAt: string;
}

const emptyForm = {
  nom: "",
  type: "",
  pays: "",
  ville: "",
  adresse: "",
  telephone: "",
  email: "",
  siteWeb: "",
  facebook: "",
  description: "",
};

export default function AdminAgencesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [agences, setAgences] = useState<Agence[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [existingLogoUrl, setExistingLogoUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((x) => x !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(agences.map((a) => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  async function handleBulkDelete() {
    if (!confirm(`Supprimer les ${selectedIds.length} agences sélectionnées ?`)) return;
    setActionLoading("bulk");
    try {
      await apiPost("/agences/bulk-delete", { ids: selectedIds });
      setSelectedIds([]);
      await fetchAgences();
    } catch (err) {
      alert("Erreur lors de la suppression groupée");
    } finally {
      setActionLoading(null);
    }
  }

  const fetchAgences = useCallback(async () => {
    try {
      const data = await apiGet("/agences");
      setAgences(data);
      setSelectedIds([]);
    } catch (err: any) {
      if (err.message !== "Refresh failed") {
        console.error("Erreur chargement agences:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      fetchAgences();
    }
  }, [fetchAgences, authLoading, user]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setLogoFile(null);
    setExistingLogoUrl(null);
    setShowForm(true);
  }

  function openEdit(a: Agence) {
    setEditingId(a.id);
    setForm({
      nom: a.nom,
      type: a.type || "",
      pays: a.pays,
      ville: a.ville || "",
      adresse: a.adresse || "",
      telephone: a.telephone || "",
      email: a.email || "",
      siteWeb: a.siteWeb || "",
      facebook: a.facebook || "",
      description: a.description || "",
    });
    setLogoFile(null);
    setExistingLogoUrl(a.logoUrl);
    setShowForm(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("type", form.type);
    formData.append("pays", form.pays);
    formData.append("ville", form.ville);
    formData.append("adresse", form.adresse);
    formData.append("telephone", form.telephone);
    formData.append("email", form.email);
    formData.append("siteWeb", form.siteWeb);
    formData.append("facebook", form.facebook);
    formData.append("description", form.description);
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      if (editingId) {
        await apiPut(`/agences/${editingId}`, formData);
      } else {
        await apiPost("/agences", formData);
      }
      setShowForm(false);
      setForm(emptyForm);
      setLogoFile(null);
      setEditingId(null);
      await fetchAgences();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerify(id: string) {
    setActionLoading(id);
    try {
      await apiPatch(`/agences/${id}/verify`);
      await fetchAgences();
    } catch (err) {
      alert("Erreur lors de la vérification");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDeleteAgence(id: string, nom: string) {
    if (!confirm(`Supprimer l'agence "${nom}" ?`)) return;
    setActionLoading(id);
    try {
      await apiDelete(`/agences/${id}`);
      await fetchAgences();
    } catch (err) {
      alert("Erreur lors de la suppression");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <AdminGuard>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Agences
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {agences.length} agence(s) —{" "}
            {agences.filter((a) => a.verified).length} vérifiée(s)
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-md bg-[linear-gradient(135deg,#013078,#014aa8)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(1, 48, 120,0.25)] transition hover:translate-y-[-1px] hover:brightness-110"
        >
          + Nouvelle agence
        </button>
      </div>

      {/* ── Modal formulaire ── */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] border border-[var(--border-color)] bg-white p-8 shadow-2xl">
            <h2 className="mb-6 text-xl font-bold text-[var(--text-primary)]">
              {editingId ? "Modifier l'agence" : "Créer une agence"}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Nom *"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  required
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
                <input
                  placeholder="Type d'établissement (ex: Lycée, AEFE, etc.)"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Pays *"
                  value={form.pays}
                  onChange={(e) => setForm({ ...form, pays: e.target.value })}
                  required
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
                <input
                  placeholder="Ville"
                  value={form.ville}
                  onChange={(e) => setForm({ ...form, ville: e.target.value })}
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Téléphone"
                  value={form.telephone}
                  onChange={(e) =>
                    setForm({ ...form, telephone: e.target.value })
                  }
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Site web officiel"
                  value={form.siteWeb}
                  onChange={(e) =>
                    setForm({ ...form, siteWeb: e.target.value })
                  }
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
                <input
                  placeholder="Lien Facebook"
                  value={form.facebook}
                  onChange={(e) =>
                    setForm({ ...form, facebook: e.target.value })
                  }
                  className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <input
                placeholder="Adresse complète"
                value={form.adresse}
                onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
              />

              {/* Logo upload field */}
              <div className="rounded-xl border border-dashed border-[var(--border-color)] p-4">
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-2">
                  Logo de l'établissement
                </label>

                {/* Aperçu du logo */}
                {(logoFile || existingLogoUrl) && (
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-16 w-16 overflow-hidden rounded-xl border border-[var(--border-color)] bg-slate-50">
                      <img
                        src={logoFile ? URL.createObjectURL(logoFile) : existingLogoUrl!}
                        alt="Aperçu logo"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {logoFile ? logoFile.name : "Logo actuel"}
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  className="text-xs text-[var(--text-secondary)]"
                />
              </div>

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
              />
              <div className="mt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-md bg-[linear-gradient(135deg,#013078,#014aa8)] py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50"
                >
                  {submitting
                    ? "Enregistrement…"
                    : editingId
                      ? "Mettre à jour"
                      : "Créer"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="rounded-md border border-[var(--border-color)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-gray-100"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Actions de groupe ── */}
      {!loading && agences.length > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-[var(--border-color)] bg-white/70 p-4 backdrop-blur-sm shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={agences.length > 0 && agences.every((a) => selectedIds.includes(a.id))}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-[var(--border-color)] text-[var(--primary-blue)] focus:ring-[var(--primary-blue)] cursor-pointer"
              />
              <span>Sélectionner tout</span>
            </label>
            {selectedIds.length > 0 && (
              <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--primary-blue)] border border-blue-100 transition-all">
                {selectedIds.length} sélectionnée(s)
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
                  <span>Supprimer la sélection</span>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Liste ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-md border-4 border-[var(--primary-blue)] border-t-transparent" />
        </div>
      ) : agences.length === 0 ? (
        <div className="rounded-lg border border-[var(--border-color)] bg-white/80 p-12 text-center">
          <p className="text-lg text-[var(--text-secondary)]">
            Aucune agence enregistrée
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {agences.map((a) => (
            <div
              key={a.id}
              className={`flex items-start gap-3 sm:gap-4 rounded-lg border border-[var(--border-color)] bg-white/90 p-4 sm:p-5 shadow-sm transition hover:shadow-md ${
                selectedIds.includes(a.id) ? "border-blue-300 bg-blue-50/20 shadow-md" : ""
              }`}
            >
              <div className="mt-1.5 shrink-0 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(a.id)}
                  onChange={(e) => handleSelectOne(a.id, e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-[var(--border-color)] text-[var(--primary-blue)] focus:ring-[var(--primary-blue)] cursor-pointer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex gap-4">
                  {/* Logo Display */}
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[var(--border-color)] bg-slate-50 flex items-center justify-center">
                    {a.logoUrl ? (
                      <img
                        src={a.logoUrl}
                        alt={`Logo ${a.nom}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">🏢</span>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {a.nom}
                      </h3>
                      {a.type && (
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-[var(--primary-blue)] border border-blue-100">
                          {a.type}
                        </span>
                      )}
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                          a.verified
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {a.verified ? "✓ Vérifiée" : "Non vérifiée"}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                          a.source === "SCRAPED"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {a.source}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                      {[a.ville, a.pays].filter(Boolean).join(", ")}
                      {a.telephone && ` · 📞 ${a.telephone}`}
                      {a.email && ` · ✉️ ${a.email}`}
                    </p>

                    {/* Social / Web Links */}
                    {(a.siteWeb || a.facebook) && (
                      <div className="mt-2.5 flex gap-3 text-xs">
                        {a.siteWeb && (
                          <a
                            href={a.siteWeb.startsWith("http") ? a.siteWeb : `https://${a.siteWeb}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[var(--primary-blue)] hover:underline"
                          >
                            🌐 Site Officiel
                          </a>
                        )}
                        {a.facebook && (
                          <a
                            href={a.facebook.startsWith("http") ? a.facebook : `https://${a.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-700 hover:underline"
                          >
                            🔵 Facebook
                          </a>
                        )}
                      </div>
                    )}

                    {a.description && (
                      <p className="mt-3 text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                        {a.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {!a.verified && (
                    <button
                      onClick={() => handleVerify(a.id)}
                      disabled={actionLoading === a.id}
                      className="rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 disabled:opacity-50"
                    >
                      ✓ Vérifier
                    </button>
                  )}
                  <button
                    onClick={() => openEdit(a)}
                    className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-[var(--primary-blue)] transition hover:bg-blue-100"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteAgence(a.id, a.nom)}
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
    </AdminGuard>
  );
}
