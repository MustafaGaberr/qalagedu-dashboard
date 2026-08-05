import { dashboardMockData, type DashboardAction, type DashboardItem, type DashboardMetric } from "@/mocks/dashboard-data";
import type { DashboardRole } from "@/types/auth";
export interface DashboardOverviewData { stats: DashboardMetric[]; actions: DashboardAction[]; activities: DashboardItem[]; alerts: DashboardItem[]; description: string; title: string; }
export const dashboardOverviewRepository = { async getOverviewForRole(role: DashboardRole): Promise<DashboardOverviewData> { const data = dashboardMockData[role]; return { stats: data.metrics, actions: data.actions, activities: data.activity, alerts: data.attention, description: "بيانات تشغيلية تجريبية.", title: "لوحة الإدارة" }; } };
