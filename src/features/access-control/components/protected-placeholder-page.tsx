import { AccessGuard } from "@/components/shared/access-guard";
import { ComingSoonState } from "@/components/shared/coming-soon-state";
import { PageHeader } from "@/components/shared/page-header";
import { dashboardSessionRepository } from "@/mocks/repositories/mock-dashboard-session-repository";
import type { DashboardModulePage } from "@/features/access-control/module-pages";

interface ProtectedPlaceholderPageProps {
  module: DashboardModulePage;
}

export async function ProtectedPlaceholderPage({
  module,
}: ProtectedPlaceholderPageProps) {
  const user = await dashboardSessionRepository.getCurrentUser();

  return (
    <AccessGuard role={user.role} permissions={module.permissions}>
      <PageHeader
        title={module.title}
        description={module.description}
        eyebrow="مرحلة التأسيس"
      />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <ComingSoonState description={module.description} />
      </div>
    </AccessGuard>
  );
}
