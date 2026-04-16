const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Wrapper around fetch that prepends the backend base URL and
 * always sends cookies for session-based auth.
 *
 * @param {string} path  - e.g. "/api/users/me"
 * @param {RequestInit} options - standard fetch options
 * @returns {Promise<Response>}
 */
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  return res;
}
