import { Activity, ArrowUpLeft, ClipboardCheck, GraduationCap } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { QuickActionCard } from "@/components/shared/quick-action-card";
import { RecentActivityList } from "@/components/shared/recent-activity-list";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import {
  dashboardOverviewRepository,
  type DashboardOverviewData,
} from "@/mocks/repositories/mock-dashboard-overview-repository";
import type { DashboardUser } from "@/types/auth";

const statIcons = [GraduationCap, ClipboardCheck, Activity, ArrowUpLeft] as const;

interface DashboardOverviewPageProps {
  user: DashboardUser;
}

export async function DashboardOverviewPage({ user }: DashboardOverviewPageProps) {
  const overview = await dashboardOverviewRepository.getOverviewForRole(user.role);

  return <DashboardOverviewContent user={user} overview={overview} />;
}

function DashboardOverviewContent({
  user,
  overview,
}: {
  user: DashboardUser;
  overview: DashboardOverviewData;
}) {
  return (
    <>
      <PageHeader
        title={`أهلا ${user.firstName}`}
        description={overview.description}
        eyebrow={overview.title}
        actions={
          <Button variant="secondary" size="sm" disabled>
            وضع Mock فقط
          </Button>
        }
      />
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section
          aria-label="مؤشرات مختصرة"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {overview.stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              icon={statIcons[index % statIcons.length]}
            />
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="mb-3 text-base font-bold">إجراءات سريعة</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {overview.actions.map((action) => (
                <QuickActionCard key={action.label} {...action} />
              ))}
            </div>
          </div>
          <RecentActivityList title="تنبيهات تشغيلية" items={overview.alerts} />
        </section>

        <RecentActivityList title="آخر العمليات" items={overview.activities} />
      </div>
    </>
  );
}
