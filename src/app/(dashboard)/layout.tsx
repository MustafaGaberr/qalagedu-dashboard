import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { getServerAssistantAssignments, getServerSession } from "@/features/auth/auth-server";
import { mapAssignment, mapPermissions, mapUser } from "@/features/auth/auth-types";
import { ApiError } from "@/lib/api/errors";

export default async function DashboardRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session;
  try { session = await getServerSession(); } catch (error) { if (error instanceof ApiError && error.status === 401) redirect("/login?reason=session"); throw error; }
  if (session.role === "STUDENT") redirect("/access-denied");
  const rawAssignments = session.role === "ASSISTANT" ? await getServerAssistantAssignments() : [];
  const assignments = rawAssignments.map((item) => mapAssignment(item, session.user.id));
  const permissions = mapPermissions(session.permissions, session.role);
  return <DashboardShell user={mapUser(session)} initialAssignmentId={session.workspace.assignmentId ?? undefined} initialAssignments={assignments} initialPermissions={permissions}>{children}</DashboardShell>;
}
