import { DashboardHome } from "@/features/dashboard-overview/components/dashboard-home";
import type { DashboardUser } from "@/types/auth";
export function DashboardOverviewPage({ user }: { user: DashboardUser }) { void user; return <DashboardHome />; }
