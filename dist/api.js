export const API_BASE_URL = process.env.JOBJOURNEY_API_URL || "http://localhost:5014";
export function getAuthHeaders(auth) {
    if (!auth)
        return {};
    if (typeof auth === "string")
        return { "X-API-Key": auth };
    if (auth.accessToken)
        return { Authorization: `Bearer ${auth.accessToken}` };
    if (auth.apiKey)
        return { "X-API-Key": auth.apiKey };
    return {};
}
async function tryRefresh(session) {
    if (!session.refreshToken)
        return false;
    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: session.refreshToken,
    });
    const res = await fetch(`${API_BASE_URL}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });
    if (!res.ok)
        return false;
    const data = (await res.json());
    if (!data.access_token)
        return false;
    session.accessToken = data.access_token;
    if (data.refresh_token)
        session.refreshToken = data.refresh_token;
    if (data.expires_in)
        session.expiresAt = Date.now() + data.expires_in * 1000;
    return true;
}
export async function apiCall(endpoint, options = {}, auth) {
    const url = `${API_BASE_URL}${endpoint}`;
    const buildHeaders = () => ({
        "Content-Type": "application/json",
        ...getAuthHeaders(auth),
        ...options.headers,
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
