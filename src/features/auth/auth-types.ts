import { brandConfig } from "@/config/brand";
import type { DashboardRole, DashboardUser, AssistantAssignment } from "@/types/auth";
import type { Permission } from "@/types/permissions";

export type BackendSession = {
  user: { id: string; name: string; loginIdentifier: string; phone: string | null; role: DashboardRole | "STUDENT" };
  role: DashboardRole | "STUDENT";
  session: { expiresAt: string };
  workspace: { teacherId: string | null; assignmentId: string | null; courseIds: string[] | null; gradeIds: string[] | null; groupIds: string[] | null };
  permissions: string[];
};
export type BackendAssignment = { id: string; label: string; teacher: { id: string; name: string }; scope: { courseIds: string[]; gradeIds: string[]; groupIds: string[] }; permissions: string[] };

const permissionMap: Record<string, Permission[]> = {
  STUDENTS_READ: ["students.view"], STUDENTS_MANAGE: ["students.manage"], CENTER_REQUESTS_READ: ["center_requests.view"], CENTER_REQUESTS_MANAGE: ["center_requests.manage"],
  GROUPS_READ: ["groups.view"], GROUPS_MANAGE: ["groups.manage"], BARCODES_MANAGE: ["barcodes.view", "barcodes.manage"], ATTENDANCE_READ: ["attendance.view"], ATTENDANCE_MANAGE: ["attendance.scan", "attendance.manage"],
  SCORES_READ: ["grades.view"], SCORES_MANAGE: ["scores.manage", "grades.manage"], GUARDIAN_MESSAGES_SEND: ["guardian_messages.view", "guardian_messages.prepare", "guardian_messages.mark_sent"],
  PAYMENTS_READ: ["payments.view"], PAYMENTS_MANAGE: ["payments.manage", "payments.review"], COUPONS_MANAGE: ["coupons.view", "coupons.manage", "coupons.create"],
  ACCESS_CODES_MANAGE: ["access_codes.view", "access_codes.manage", "access_codes.create"], STUDENT_ACCESS_MANAGE: ["student_access.view", "student_access.manage", "student_access.grant", "student_access.revoke"],
  CONTENT_READ: ["courses.view", "lessons.view"], CONTENT_MANAGE: ["courses.manage", "lessons.manage"], PACKAGES_READ: ["packages.view"], PACKAGES_MANAGE: ["packages.manage"],
  EXAMS_READ: ["exams.view"], EXAMS_MANAGE: ["exams.manage"], GRADES_READ: ["grades.view"], GRADES_MANAGE: ["grades.manage"], STORE_READ: ["store.view"], STORE_MANAGE: ["store.manage"], REPORTS_READ: ["reports.view"],
};
export const mapPermissions = (items: string[], role?: DashboardRole | "STUDENT") => {
  const mapped = new Set<Permission>(["dashboard.view", ...items.flatMap((item) => permissionMap[item] ?? [])]);
  if (items.includes("PAYMENTS_READ") && items.includes("REPORTS_READ")) mapped.add("reports.financial");
  if (role === "SUPER_ADMIN") {
    if (items.includes("CONTENT_READ")) mapped.add("website.view");
    if (items.includes("CONTENT_MANAGE")) mapped.add("website.manage");
    ["teachers.view", "teachers.manage", "assistants.view", "assistants.manage", "assignments.view", "assignments.manage", "audit.view", "settings.center", "settings.system"].forEach((permission) => mapped.add(permission as Permission));
  }
  if (role === "TEACHER_ADMIN") ["teachers.view", "assistants.view", "assistants.manage", "assignments.view", "assignments.manage", "settings.center"].forEach((permission) => mapped.add(permission as Permission));
  return [...mapped];
};
const backendPermissionByLocal: Partial<Record<Permission, string>> = Object.fromEntries(
  Object.entries(permissionMap).flatMap(([backend, local]) => local.map((permission) => [permission, backend])),
);
export const toBackendPermissions = (items: Permission[]) => [...new Set(items.map((item) => backendPermissionByLocal[item]).filter((item): item is string => Boolean(item)))];
export const mapUser = (session: BackendSession): DashboardUser => { const names = session.user.name.trim().split(/\s+/); return { id: session.user.id, fullName: session.user.name, firstName: names[0] ?? session.user.name, email: session.user.loginIdentifier, phone: session.user.phone ?? undefined, role: session.role as DashboardRole, avatarInitials: names.slice(0, 2).map((name) => name[0]).join(" "), accountStatus: "active", centerName: brandConfig.centerName, teacherId: session.workspace.teacherId ?? undefined }; };
export const mapAssignment = (item: BackendAssignment, assistantId: string): AssistantAssignment => ({ id: item.id, assistantId, teacherId: item.teacher.id, teacherName: item.teacher.name, subject: item.label, grades: item.scope.gradeIds, groups: item.scope.groupIds, courses: item.scope.courseIds, permissions: mapPermissions(item.permissions), active: true });
