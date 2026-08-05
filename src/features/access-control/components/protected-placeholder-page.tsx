import { RoleAwarePlaceholderPage } from "@/features/access-control/components/role-aware-placeholder-page";
import type { DashboardModulePage } from "@/features/access-control/module-pages";
export function ProtectedPlaceholderPage({ module }: { module: DashboardModulePage }) { return <RoleAwarePlaceholderPage module={module} />; }
