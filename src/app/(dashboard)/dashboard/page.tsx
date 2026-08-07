import { DashboardOverviewPage } from "@/features/dashboard-overview/components/dashboard-overview-page";
import { getServerSession } from "@/features/auth/auth-server";
import { mapUser } from "@/features/auth/auth-types";

export default async function DashboardPage() {
  const user = mapUser(await getServerSession());

  return <DashboardOverviewPage user={user} />;
}
