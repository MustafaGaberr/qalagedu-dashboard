import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { dashboardSessionRepository } from "@/mocks/repositories/mock-dashboard-session-repository";

export default async function DashboardRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await dashboardSessionRepository.getCurrentUser();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
