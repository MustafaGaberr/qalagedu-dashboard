import type { Permission } from "@/types/permissions";

export const DASHBOARD_ROLES = [
  "SUPER_ADMIN",
  "TEACHER_ADMIN",
  "ASSISTANT",
] as const;

export type DashboardRole = (typeof DASHBOARD_ROLES)[number];
export type AccountStatus = "active" | "pending" | "suspended";

export interface DashboardUser {
  id: string;
  fullName: string;
  firstName: string;
  email: string;
  phone?: string;
  role: DashboardRole;
  avatarInitials: string;
  accountStatus: AccountStatus;
  centerName: string;
  teacherId?: string;
  assignedSubjects?: string[];
  assignedGroups?: string[];
}

export interface RoleMetadata {
  label: string;
  description: string;
  defaultRoute: "/dashboard";
  badgeTone: "primary" | "info" | "success";
}

export interface AssistantAssignment {
  id: string;
  assistantId: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  grades: string[];
  groups: string[];
  courses?: string[];
  active?: boolean;
  permissions: Permission[];
}
