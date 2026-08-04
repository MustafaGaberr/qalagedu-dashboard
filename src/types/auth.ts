export const DASHBOARD_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "TEACHER",
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
  assignedSubjects?: string[];
  assignedGroups?: string[];
}
