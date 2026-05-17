import { SessionAuth } from "./types.js";

export const API_BASE_URL = process.env.JOBJOURNEY_API_URL || "http://localhost:5014";

type AuthArg = SessionAuth | string | undefined;

export function getAuthHeaders(auth: AuthArg): Record<string, string> {
  if (!auth) return {};
  if (typeof auth === "string") return { "X-API-Key": auth };
  if (auth.accessToken) return { Authorization: `Bearer ${auth.accessToken}` };
  if (auth.apiKey) return { "X-API-Key": auth.apiKey };
  return {};
}

async function tryRefresh(session: SessionAuth): Promise<boolean> {
  if (!session.refreshToken) return false;
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: session.refreshToken,
  });
  const res = await fetch(`${API_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };
  if (!data.access_token) return false;
  session.accessToken = data.access_token;
  if (data.refresh_token) session.refreshToken = data.refresh_token;
  if (data.expires_in) session.expiresAt = Date.now() + data.expires_in * 1000;
  return true;
}

export async function apiCall(
  endpoint: string,
  options: RequestInit = {},
  auth?: AuthArg
): Promise<unknown> {
  const url = `${API_BASE_URL}${endpoint}`;
  const buildHeaders = (): Record<string, string> => ({
    "Content-Type": "application/json",
    ...getAuthHeaders(auth),
    ...(options.headers as Record<string, string>),
  });

  let response = await fetch(url, { ...options, headers: buildHeaders() });

  if (response.status === 401 && auth && typeof auth !== "string" && auth.refreshToken) {
    const refreshed = await tryRefresh(auth);
    if (refreshed) {
      response = await fetch(url, { ...options, headers: buildHeaders() });
    }
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  return response.json();
}
