import { ROLE_PERMISSIONS } from "@/config/permissions";
import type { DashboardRole } from "@/types/auth";
import type { Permission } from "@/types/permissions";

export function canAccess(role: DashboardRole, permission: Permission) {
  return (ROLE_PERMISSIONS[role] as readonly Permission[]).includes(permission);
}

export function canAccessAny(
  role: DashboardRole,
  permissions: readonly Permission[],
) {
  return permissions.some((permission) => canAccess(role, permission));
}

export function canAccessAll(
  role: DashboardRole,
  permissions: readonly Permission[],
) {
  return permissions.every((permission) => canAccess(role, permission));
}
