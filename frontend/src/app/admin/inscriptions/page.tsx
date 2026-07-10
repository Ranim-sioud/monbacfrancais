"use client";
import { useState, useEffect, useCallback } from "react";
import { AdminGuard } from "@/components/admin-guard";
import { apiGet, apiPatch, apiDelete } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface Inscription {
  id: string;
  nom: string;
  email: string;
  pays: string;
  ville: string;
  classe: "PREMIERE" | "TERMINALE";
  specialites: string;
  message: string | null;
  packType: "MENSUEL" | "ANNUEL";
  prixOriginal: number;
  prixFinal: number;
  reduction: number;
  status: "PENDING" | "ACTIVE" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export default function AdminInscriptionsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchInscriptions = useCallback(async () => {
    try {
      const response = await apiGet("/inscriptions");
      console.log("Response from API:", response);
      const data = response.data || [];
      setInscriptions(Array.isArray(data) ? data : []);
    } catch (err: any) {
      if (err.message !== "Refresh failed") {
        console.error("Erreur chargement inscriptions:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      fetchInscriptions();
    }
  }, [fetchInscriptions, authLoading, user]);

  async function handleStatusToggle(inscription: Inscription) {
    const newStatus = inscription.status === "PENDING" ? "ACTIVE" : 
                      inscription.status === "ACTIVE" ? "CANCELLED" : "PENDING";
    if (!confirm(`Changer le statut de ${inscription.nom} en ${newStatus} ?`)) return;

    setActionLoading(inscription.id);
    try {
      await apiPatch(`/inscriptions/${inscription.id}/status`, { status: newStatus });
      await fetchInscriptions();
    } catch (err) {
      alert("Erreur lors du changement de statut");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(inscription: Inscription) {
    if (!confirm(`Supprimer définitivement l'inscription de ${inscription.nom} (${inscription.email}) ?`))
      return;

    setActionLoading(inscription.id);
    try {
      await apiDelete(`/inscriptions/${inscription.id}`);
      await fetchInscriptions();
    } catch (err) {
      alert("Erreur lors de la suppression");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <AdminGuard>
      {/* Conteneur principal forcé à ne pas déborder mais permettant le défilement interne */}
      <div className="w-full max-w-full overflow-hidden block">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Inscriptions
            </h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {inscriptions.length} inscription(s) enregistrée(s)
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-md border-4 border-[var(--primary-blue)] border-t-transparent" />
          </div>
        ) : inscriptions.length === 0 ? (
          <div className="rounded-lg border border-[var(--border-color)] bg-white/80 p-12 text-center">
            <p className="text-lg text-[var(--text-secondary)]">
              Aucune inscription trouvée
            </p>
          </div>
        ) : (
          <div className="w-full space-y-4">
            
            {/* TABLEAU DESKTOP CORRIGÉ AVEC OVERFLOW FORCÉ ET LARGEUR FIXE MINIMALE */}
            <div className="hidden lg:block w-full overflow-x-scroll rounded-lg border border-[var(--border-color)] bg-white/90 shadow-sm" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full text-left text-sm table-auto" style={{ minWidth: "1200px" }}>
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-blue-50/40 whitespace-nowrap">
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Nom</th>
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Email</th>
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Pays</th>
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Ville</th>
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Classe</th>
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Spécialités</th>
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Pack</th>
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Prix</th>
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Statut</th>
                    <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">Date</th>
                    <th className="px-5 py-3.5 text-right font-semibold text-[var(--text-primary)]" style={{ width: "200px", minWidth: "200px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inscriptions.map((insc) => (
                    <tr
                      key={insc.id}
                      className="border-b border-[var(--border-color)] last:border-0 transition hover:bg-blue-50/30 whitespace-nowrap"
                    >
                      <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{insc.nom}</td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{insc.email}</td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{insc.pays}</td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{insc.ville}</td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{insc.classe}</td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{insc.specialites}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`rounded-md px-3 py-1 text-xs font-semibold ${
                            insc.packType === "MENSUEL"
                              ? "bg-blue-100 text-[var(--primary-blue)]"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {insc.packType}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{insc.prixFinal}€</td>
                      <td className="px-5 py-3">
                        <span
                          className={`rounded-md px-3 py-1 text-xs font-semibold ${
                            insc.status === "ACTIVE"
                              ? "bg-green-100 text-green-600"
                              : insc.status === "CANCELLED"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {insc.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">
                        {new Date(insc.createdAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2" style={{ display: "flex", flexWrap: "nowrap" }}>
                          <button
                            onClick={() => handleStatusToggle(insc)}
                            disabled={actionLoading === insc.id}
                            className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-[var(--primary-blue)] transition hover:bg-blue-100 disabled:opacity-50 whitespace-nowrap"
                          >
                            {insc.status === "PENDING" ? "→ Active" : 
                             insc.status === "ACTIVE" ? "→ Cancel" : "→ Pending"}
                          </button>
                          <button
                            onClick={() => handleDelete(insc)}
                            disabled={actionLoading === insc.id}
                            className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 whitespace-nowrap"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {inscriptions.map((insc) => (
                <div
                  key={insc.id}
                  className="rounded-lg border border-[var(--border-color)] bg-white/90 p-4 shadow-sm"
                >
                  {/* ... (Reste des cartes mobiles inchangé) ... */}
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">{insc.nom}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{insc.email}</p>
                    </div>
                    <span className={`rounded-md px-3 py-1 text-xs font-semibold ${insc.status === "ACTIVE" ? "bg-green-100 text-green-600" : insc.status === "CANCELLED" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"}`}>{insc.status}</span>
                  </div>
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-[var(--text-secondary)]">Pays:</span><span className="ml-1 text-[var(--text-primary)]">{insc.pays}</span></div>
                    <div><span className="text-[var(--text-secondary)]">Ville:</span><span className="ml-1 text-[var(--text-primary)]">{insc.ville}</span></div>
                    <div><span className="text-[var(--text-secondary)]">Classe:</span><span className="ml-1 text-[var(--text-primary)]">{insc.classe}</span></div>
                    <div><span className="text-[var(--text-secondary)]">Pack:</span><span className={`ml-1 rounded-md px-2 py-0.5 text-xs font-semibold ${insc.packType === "MENSUEL" ? "bg-blue-100 text-[var(--primary-blue)]" : "bg-purple-100 text-purple-600"}`}>{insc.packType}</span></div>
                  </div>
                  <div className="mb-3 text-sm"><span className="text-[var(--text-secondary)]">Spécialités:</span><span className="ml-1 text-[var(--text-primary)]">{insc.specialites}</span></div>
                  {insc.message && <div className="mb-3 text-sm"><span className="text-[var(--text-secondary)]">Message:</span><p className="mt-1 text-[var(--text-primary)]">{insc.message}</p></div>}
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <div><span className="text-[var(--text-secondary)]">Prix:</span><span className="ml-1 font-semibold text-[var(--primary-blue)]">{insc.prixFinal}€</span></div>
                    <div className="text-[var(--text-secondary)]">{new Date(insc.createdAt).toLocaleDateString("fr-FR")}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleStatusToggle(insc)} disabled={actionLoading === insc.id} className="flex-1 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-[var(--primary-blue)] transition hover:bg-blue-100 disabled:opacity-50">{insc.status === "PENDING" ? "→ Active" : insc.status === "ACTIVE" ? "→ Cancel" : "→ Pending"}</button>
                    <button onClick={() => handleDelete(insc)} disabled={actionLoading === insc.id} className="flex-1 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </AdminGuard>
  );
}