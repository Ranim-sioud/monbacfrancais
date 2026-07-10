const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Token d'accès conservé uniquement en mémoire (sécurité XSS maximale)
let accessToken: string | null = null;
let isRefreshing = false;
interface RefreshSubscriber {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}

let refreshSubscribers: RefreshSubscriber[] = [];

// Callback pour notifier le AuthContext des changements d'utilisateur (déconnexion automatique, etc.)
let onAuthFailureCallback: (() => void) | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function registerAuthFailureListener(callback: () => void) {
  onAuthFailureCallback = callback;
}

function subscribeTokenRefresh(resolve: (token: string) => void, reject: (err: any) => void) {
  refreshSubscribers.push({ resolve, reject });
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((sub) => sub.resolve(token));
  refreshSubscribers = [];
}

function onRefreshFailed(err: any) {
  refreshSubscribers.forEach((sub) => sub.reject(err));
  refreshSubscribers = [];
}

/**
 * Effectue un rafraîchissement silencieux du token
 */
async function performTokenRefresh(): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // Nécessaire pour transmettre le cookie HttpOnly
    });

    if (!res.ok) {
      throw new Error('Refresh failed');
    }

    const data = await res.json();
    setAccessToken(data.token);
    return data.token;
  } catch (err) {
    setAccessToken(null);
    if (onAuthFailureCallback) {
      onAuthFailureCallback();
    }
    throw err;
  }
}

/**
 * Wrapper fetch personnalisé gérant l'injection du token, les cookies et le refresh automatique (401)
 */
async function customFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const url = `${API_BASE}${path}`;
  
  // Injecter l'access token s'il existe
  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (options.body && !headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Transmettre les cookies HttpOnly sur toutes les requêtes d'API
  };

  let response = await fetch(url, fetchOptions);

  // Si le token est expiré (401) et que ce n'est pas déjà une requête d'authentification
  if (response.status === 401 && !path.startsWith('/auth/')) {
    if (!isRefreshing) {
      // Cette requête initie le refresh → on retente directement après
      isRefreshing = true;
      try {
        const newToken = await performTokenRefresh();
        isRefreshing = false;
        onRefreshed(newToken);

        // Retenter la requête avec le nouveau token
        headers.set('Authorization', `Bearer ${newToken}`);
        response = await fetch(url, fetchOptions);
      } catch (err) {
        isRefreshing = false;
        onRefreshFailed(err);
        throw err;
      }
    } else {
      // Un refresh est déjà en cours → mettre cette requête en attente
      const retryOriginalRequest = new Promise<Response>((resolve, reject) => {
        subscribeTokenRefresh(
          (token) => {
            headers.set('Authorization', `Bearer ${token}`);
            resolve(fetch(url, fetchOptions));
          },
          (err) => reject(err)
        );
      });

      response = await retryOriginalRequest;
    }
  }

  return response;
}

// Extraire le message d'erreur du backend
async function throwApiError(res: Response): Promise<never> {
  let msg = `API error: ${res.status}`;
  try {
    const data = await res.json();
    if (data?.message) msg = data.message;
  } catch { /* pas de JSON dans la réponse */ }
  throw new Error(msg);
}

// Helpers HTTP standardisés
export async function apiGet(path: string) {
  const res = await customFetch(path, { method: 'GET', cache: 'no-store' });
  if (!res.ok) await throwApiError(res);
  return res.json();
}

export async function apiPost(path: string, body: unknown) {
  const isFormData = body instanceof FormData;
  const res = await customFetch(path, {
    method: 'POST',
    body: isFormData ? body : JSON.stringify(body),
  });
  if (!res.ok) await throwApiError(res);
  return res.json();
}

export async function apiPut(path: string, body: unknown) {
  const isFormData = body instanceof FormData;
  const res = await customFetch(path, {
    method: 'PUT',
    body: isFormData ? body : JSON.stringify(body),
  });
  if (!res.ok) await throwApiError(res);
  return res.json();
}

export async function apiPatch(path: string, body?: unknown) {
  const isFormData = body instanceof FormData;
  const res = await customFetch(path, {
    method: 'PATCH',
    body: body ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined,
  });
  if (!res.ok) await throwApiError(res);
  return res.json();
}

export async function apiDelete(path: string) {
  const res = await customFetch(path, { method: 'DELETE' });
  if (!res.ok) await throwApiError(res);
  return res.json();
}

