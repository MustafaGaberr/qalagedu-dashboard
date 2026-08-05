import { DashboardOverviewPage } from "@/features/dashboard-overview/components/dashboard-overview-page";
import { dashboardSessionRepository } from "@/mocks/repositories/mock-dashboard-session-repository";

export default async function DashboardPage() {
  const user = await dashboardSessionRepository.getCurrentUser();

  return <DashboardOverviewPage user={user} />;
}
