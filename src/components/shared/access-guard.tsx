import { AccessDeniedState } from "@/components/shared/access-denied-state";
import { canAccessAny } from "@/lib/access-control";
import type { DashboardRole } from "@/types/auth";
import type { Permission } from "@/types/permissions";

interface AccessGuardProps {
  role: DashboardRole;
  permissions: readonly Permission[];
  children: React.ReactNode;
}

export function AccessGuard({
  role,
  permissions,
  children,
}: AccessGuardProps) {
  if (!canAccessAny(role, permissions)) {
    return <AccessDeniedState />;
  }

  return children;
}
