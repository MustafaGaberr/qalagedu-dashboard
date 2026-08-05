import { ROLE_PERMISSIONS } from "@/config/permissions";
import type { DashboardRole } from "@/types/auth";
import type { Permission } from "@/types/permissions";

export function permissionsForRole(role: DashboardRole, assignmentPermissions?: readonly Permission[]) {
  return role === "ASSISTANT" && assignmentPermissions ? assignmentPermissions : ROLE_PERMISSIONS[role];
}

export function canAccess(role: DashboardRole, permission: Permission, assignmentPermissions?: readonly Permission[]) {
  return permissionsForRole(role, assignmentPermissions).includes(permission);
}

export function canAccessAny(role: DashboardRole, permissions: readonly Permission[], assignmentPermissions?: readonly Permission[]) {
  return permissions.some((permission) => canAccess(role, permission, assignmentPermissions));
}
