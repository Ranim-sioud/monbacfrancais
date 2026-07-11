"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin, user, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Si déjà connecté en tant qu'admin, rediriger vers le dashboard
  useEffect(() => {
    if (!isLoading && user && user.role === "ADMIN") {
      router.replace("/admin/dashboard");
    }
  }, [isLoading, user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await adminLogin(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="h-10 w-10 animate-spin rounded-md border-4 border-[var(--primary-blue)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-4">
      {/* ── Background decorations ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(1, 48, 120,0.16),transparent_58%)]" />
      <div className="pointer-events-none absolute right-[-4rem] top-20 h-80 w-80 rounded-md bg-red-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-[-4rem] h-72 w-72 rounded-md bg-red-300/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-md bg-blue-200/10 blur-3xl" />

      {/* ── Login card ── */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-[linear-gradient(145deg,#ffffff,#d7ecff)] shadow-[0_14px_34px_rgba(1, 48, 120,0.16)]">
            <span className="text-2xl font-bold text-[var(--primary-blue)]">
              MBF
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Administration
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Espace réservé aux administrateurs
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(234,244,255,0.94))] p-8 shadow-[0_20px_50px_rgba(1, 48, 120,0.14)] sm:p-10">
          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Error alert */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
                <span className="mr-2 inline-block">⚠</span>
                {error}
              </div>
            )}

            {/* Email field */}
            <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
              Adresse email
              <input
                id="admin-login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@monbacfrancais.com"
                required
                autoComplete="email"
                autoFocus
                className="rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
              />
            </label>

            {/* Password field */}
            <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
              Mot de passe
              <div className="relative">
                <input
                  id="admin-login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-[var(--border-color)] bg-white px-5 py-4 pr-14 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  tabIndex={-1}
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
            </label>

            {/* Submit button */}
            <button
              id="admin-login-submit"
              type="submit"
              disabled={submitting}
              className="mt-2 rounded-md border border-blue-200/65 bg-[linear-gradient(135deg,#013078,#014aa8)] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(1, 48, 120,0.3)] transition hover:translate-y-[-1px] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-md border-2 border-white border-t-transparent" />
                  Connexion en cours…
                </span>
              ) : (
                "Connexion Admin"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
          © {new Date().getFullYear()} Mon Bac Français — Espace administration
        </p>
      </div>
    </div>
  );
}
