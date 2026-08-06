import type { DashboardRole, RoleMetadata } from "@/types/auth";
import type { Permission } from "@/types/permissions";

export const ALL_PERMISSIONS = [
  "dashboard.view", "students.view", "students.manage", "center_requests.view", "center_requests.manage", "groups.view", "groups.manage",
  "attendance.view", "attendance.scan", "attendance.manage", "scores.manage", "barcodes.view", "barcodes.manage", "guardian_messages.view", "guardian_messages.prepare", "guardian_messages.mark_sent",
  "courses.view", "courses.manage", "lessons.view", "lessons.manage", "packages.view", "packages.manage",
  "exams.view", "exams.manage", "grades.view", "grades.manage", "store.view", "store.manage",
  "payments.view", "payments.manage", "payments.review", "coupons.view", "coupons.manage", "coupons.create", "access_codes.view", "access_codes.manage", "access_codes.create", "student_access.view", "student_access.manage", "student_access.grant", "student_access.revoke", "reports.financial",
  "teachers.view", "teachers.manage", "assistants.view", "assistants.manage", "assignments.view", "assignments.manage",
  "website.view", "website.manage", "reports.view", "audit.view", "settings.center", "settings.system",
] as const satisfies readonly Permission[];

// Teacher administrators inherit every operational capability an assistant may receive.
const teacherAdminPermissions = ALL_PERMISSIONS.filter((permission) => ![
  "teachers.manage", "website.view", "website.manage", "audit.view", "settings.system",
].includes(permission)) as Permission[];

const assistantBaseline = [
  "dashboard.view", "students.view", "center_requests.view", "groups.view", "attendance.view", "attendance.scan",
  "barcodes.view", "guardian_messages.view", "courses.view", "lessons.view", "exams.view",
  "grades.view", "payments.view", "student_access.view",
] as const satisfies readonly Permission[];

export const ROLE_PERMISSIONS: Record<DashboardRole, readonly Permission[]> = {
  SUPER_ADMIN: ALL_PERMISSIONS,
  TEACHER_ADMIN: teacherAdminPermissions,
  ASSISTANT: assistantBaseline,
};

export const roleMetadata: Record<DashboardRole, RoleMetadata> = {
  SUPER_ADMIN: { label: "مدير النظام", description: "إدارة المركز والنظام بالكامل", defaultRoute: "/dashboard", badgeTone: "primary" },
  TEACHER_ADMIN: { label: "مدير المدرس", description: "إدارة نطاق المدرس وفرق العمل التابعة له", defaultRoute: "/dashboard", badgeTone: "info" },
  ASSISTANT: { label: "مساعد", description: "تشغيل مهام محددة داخل نطاق تعيين المدرس", defaultRoute: "/dashboard", badgeTone: "success" },
};

export const roleLabels = Object.fromEntries(
  Object.entries(roleMetadata).map(([role, metadata]) => [role, metadata.label]),
) as Record<DashboardRole, string>;
