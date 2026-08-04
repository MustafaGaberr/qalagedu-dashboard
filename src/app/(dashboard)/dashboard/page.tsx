import { AccessGuard } from "@/components/shared/access-guard";
import { DashboardOverviewPage } from "@/features/dashboard-overview/components/dashboard-overview-page";
import { dashboardSessionRepository } from "@/mocks/repositories/mock-dashboard-session-repository";

export default async function DashboardPage() {
  const user = await dashboardSessionRepository.getCurrentUser();

  return (
    <AccessGuard role={user.role} permissions={["dashboard.view"]}>
      <DashboardOverviewPage user={user} />
    </AccessGuard>
  );
}
