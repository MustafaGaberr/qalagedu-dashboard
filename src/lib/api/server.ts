import "server-only";
import { cookies } from "next/headers";
import { apiUrl } from "@/config/api";
import { ApiError, type ApiErrorPayload } from "./errors";

export async function serverApiRequest<T>(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  const cookieHeader = (await cookies()).toString();
  if (cookieHeader) headers.set("cookie", cookieHeader);
  let response: Response;
  try { response = await fetch(apiUrl(path), { ...init, headers, cache: "no-store" }); }
  catch { throw new ApiError(); }
  const body = response.status === 204 ? undefined : await response.json().catch(() => undefined);
  if (!response.ok) throw new ApiError(response.status, (body as ApiErrorPayload | undefined)?.code ?? "REQUEST_FAILED", body as ApiErrorPayload | undefined);
  return body && typeof body === "object" && "success" in body && "data" in body ? (body as { data: T }).data : body as T;
}
