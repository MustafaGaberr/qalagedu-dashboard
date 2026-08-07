import { apiConfig, apiUrl } from "@/config/api";
import { ApiError, type ApiErrorPayload } from "./errors";

type Options = Omit<RequestInit, "body"> & { body?: unknown };
const cookie = (name: string) => typeof document === "undefined" ? undefined : document.cookie.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${encodeURIComponent(name)}=`))?.slice(encodeURIComponent(name).length + 1);
const unwrap = <T,>(body: unknown): T => body && typeof body === "object" && "success" in body && "data" in body ? (body as { data: T }).data : body as T;

export async function apiRequest<T>(path: string, options: Options = {}) {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers);
  if (options.body !== undefined) headers.set("content-type", "application/json");
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    const csrf = cookie(apiConfig.csrfCookieName);
    if (csrf) headers.set("x-csrf-token", decodeURIComponent(csrf));
  }
  let response: Response;
  try { response = await fetch(apiUrl(path), { ...options, method, headers, credentials: "include", body: options.body === undefined ? undefined : JSON.stringify(options.body) }); }
  catch { throw new ApiError(); }
  const body = response.status === 204 ? undefined : await response.json().catch(() => undefined);
  if (!response.ok) throw new ApiError(response.status, (body as ApiErrorPayload | undefined)?.code ?? "REQUEST_FAILED", body as ApiErrorPayload | undefined);
  return unwrap<T>(body);
}
