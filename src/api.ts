export const API_BASE_URL = process.env.JOBJOURNEY_API_URL || "http://localhost:5014";

export async function apiCall(
  endpoint: string,
  options: RequestInit = {},
  apiKey?: string
): Promise<unknown> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(apiKey && { "X-API-Key": apiKey }),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  return response.json();
}
