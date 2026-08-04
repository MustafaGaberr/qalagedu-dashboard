import type { Metadata } from "next";

import { RoleAccessPreview } from "@/features/access-control/components/role-access-preview";
import { dashboardSessionRepository } from "@/mocks/repositories/mock-dashboard-session-repository";

export const metadata: Metadata = {
  title: "معاينة الصلاحيات",
};

export default async function DevAccessPage() {
  const users = await dashboardSessionRepository.getUsers();

  return <RoleAccessPreview users={users} />;
}
