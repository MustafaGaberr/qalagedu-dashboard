const configuredApiUrl = process.env.NEXT_PUBLIC_QALAGEDU_API_URL?.trim();
const configuredCsrfCookieName =
  process.env.NEXT_PUBLIC_QALAGEDU_CSRF_COOKIE_NAME?.trim();

if (!configuredApiUrl) {
  throw new Error("NEXT_PUBLIC_QALAGEDU_API_URL is required");
}

if (!configuredCsrfCookieName) {
  throw new Error("NEXT_PUBLIC_QALAGEDU_CSRF_COOKIE_NAME is required");
}

const parsedApiUrl = new URL(configuredApiUrl);
if (parsedApiUrl.username || parsedApiUrl.password || parsedApiUrl.search || parsedApiUrl.hash) {
  throw new Error("NEXT_PUBLIC_QALAGEDU_API_URL must not contain credentials, a query, or a fragment");
}
if (process.env.NODE_ENV === "production" && parsedApiUrl.protocol !== "https:") {
  throw new Error("NEXT_PUBLIC_QALAGEDU_API_URL must use HTTPS in production");
}

export const apiConfig = {
  baseUrl: parsedApiUrl.toString().replace(/\/$/, ""),
  csrfCookieName: configuredCsrfCookieName,
} as const;

export function apiUrl(path: string) {
  return `${apiConfig.baseUrl}/${path.replace(/^\//, "")}`;
}
