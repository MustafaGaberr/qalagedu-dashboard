"use server";

import { cookies } from "next/headers";
import { MOCK_ASSIGNMENT_COOKIE, MOCK_ROLE_COOKIE, validateMockSession } from "@/mocks/mock-dashboard-session";
import { mockAssistantAssignments } from "@/mocks/repositories/mock-dashboard-session-repository";
import type { DashboardRole } from "@/types/auth";

interface MockSessionActionResult {
  ok: boolean;
  error?: string;
  redirectTo?: string;
}

function cookieOptions() {
  return { httpOnly: true, sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 8, secure: process.env.NODE_ENV === "production" };
}

export async function persistMockSession(role: DashboardRole, assignmentId?: string, redirectTo = "/dashboard"): Promise<MockSessionActionResult> {
  if (process.env.NODE_ENV === "production") return { ok: false, error: "الدخول التجريبي غير متاح في بيئة الإنتاج." };
  const session = validateMockSession({ role, assignmentId }, mockAssistantAssignments);
  if (!session) return { ok: false, error: "اختر دورًا وتعيينًا تجريبيًا صالحين." };
  const cookieStore = await cookies();
  cookieStore.set(MOCK_ROLE_COOKIE, session.role, cookieOptions());
  if (session.assignmentId) cookieStore.set(MOCK_ASSIGNMENT_COOKIE, session.assignmentId, cookieOptions());
  else cookieStore.delete(MOCK_ASSIGNMENT_COOKIE);
  const safeRedirect = redirectTo.startsWith("/") && !redirectTo.startsWith("//") ? redirectTo : "/dashboard";
  return { ok: true, redirectTo: safeRedirect };
}

export async function clearMockSession(): Promise<{ ok: boolean }> {
  if (process.env.NODE_ENV === "production") return { ok: false };
  const cookieStore = await cookies();
  cookieStore.delete(MOCK_ROLE_COOKIE);
  cookieStore.delete(MOCK_ASSIGNMENT_COOKIE);
  return { ok: true };
}
