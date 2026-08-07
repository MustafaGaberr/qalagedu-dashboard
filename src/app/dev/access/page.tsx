import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RoleAccessPreview } from "@/features/access-control/components/role-access-preview";
import { dashboardSessionRepository } from "@/mocks/repositories/mock-dashboard-session-repository";

export function generateMetadata(): Metadata {
  return process.env.NODE_ENV === "production"
    ? {}
    : { title: "معاينة الصلاحيات" };
}

export default async function DevAccessPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const users = await dashboardSessionRepository.getUsers();

  return <RoleAccessPreview users={users} />;
}
