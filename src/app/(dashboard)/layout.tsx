import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { MOCK_ASSIGNMENT_COOKIE, MOCK_ROLE_COOKIE, validateMockSession } from "@/mocks/mock-dashboard-session";
import { dashboardSessionRepository, mockAssistantAssignments } from "@/mocks/repositories/mock-dashboard-session-repository";

export default async function DashboardRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get(MOCK_ROLE_COOKIE)?.value;
  const assignmentCookie = cookieStore.get(MOCK_ASSIGNMENT_COOKIE)?.value;
  const hasMockSessionCookies = Boolean(roleCookie || assignmentCookie);
  const session = hasMockSessionCookies
    ? validateMockSession({ role: roleCookie, assignmentId: assignmentCookie }, mockAssistantAssignments)
    : null;
  if (hasMockSessionCookies && !session) redirect("/login");
  const user = await dashboardSessionRepository.getCurrentUser(session?.role ?? "SUPER_ADMIN");

  return <DashboardShell user={user} initialAssignmentId={session?.assignmentId}>{children}</DashboardShell>;
}
