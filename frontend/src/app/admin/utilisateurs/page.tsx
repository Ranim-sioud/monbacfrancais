"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminGuard } from "@/components/admin-guard";
import { apiGet, apiPatch, apiDelete } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  country: string | null;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await apiGet("/users");
      setUsers(data);
    } catch (err: any) {
      if (err.message !== "Refresh failed") {
        console.error("Erreur chargement utilisateurs:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      fetchUsers();
    }
  }, [fetchUsers, authLoading, user]);

  async function handleRoleToggle(user: User) {
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    if (!confirm(`Changer le rôle de ${user.name} en ${newRole} ?`)) return;

    setActionLoading(user.id);
    try {
      await apiPatch(`/users/${user.id}/role`, { role: newRole });
      await fetchUsers();
    } catch (err) {
      alert("Erreur lors du changement de rôle");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(user: User) {
    if (!confirm(`Supprimer définitivement ${user.name} (${user.email}) ?`))
      return;

    setActionLoading(user.id);
    try {
      await apiDelete(`/users/${user.id}`);
      await fetchUsers();
    } catch (err) {
      alert("Erreur lors de la suppression");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <AdminGuard>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Utilisateurs
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {users.length} compte(s) enregistré(s)
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-md border-4 border-[var(--primary-blue)] border-t-transparent" />
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-lg border border-[var(--border-color)] bg-white/80 p-12 text-center">
          <p className="text-lg text-[var(--text-secondary)]">
            Aucun utilisateur trouvé
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--border-color)] bg-white/90 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-blue-50/40">
                <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">
                  Nom
                </th>
                <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">
                  Email
                </th>
                <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">
                  Rôle
                </th>
                <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">
                  Pays
                </th>
                <th className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">
                  Inscrit le
                </th>
                <th className="px-5 py-3.5 text-right font-semibold text-[var(--text-primary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-[var(--border-color)] last:border-0 transition hover:bg-blue-50/30"
                >
                  <td className="px-5 py-3 font-medium text-[var(--text-primary)]">
                    {u.name}
                  </td>
                  <td className="px-5 py-3 text-[var(--text-secondary)]">
                    {u.email}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-md px-3 py-1 text-xs font-semibold ${
                        u.role === "ADMIN"
                          ? "bg-blue-100 text-[var(--primary-blue)]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-secondary)]">
                    {u.country || "—"}
                  </td>
                  <td className="px-5 py-3 text-[var(--text-secondary)]">
                    {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleRoleToggle(u)}
                        disabled={actionLoading === u.id}
                        className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-[var(--primary-blue)] transition hover:bg-blue-100 disabled:opacity-50"
                      >
                        {u.role === "ADMIN" ? "→ User" : "→ Admin"}
                      </button>
                      <button
                        onClick={() => handleDelete(u)}
                        disabled={actionLoading === u.id}
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
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
      )}
    </AdminGuard>
  );
}
