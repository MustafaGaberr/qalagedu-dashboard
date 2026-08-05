export type Permission =
  | "dashboard.view"
  | "students.view" | "students.manage" | "center_requests.view" | "groups.view" | "groups.manage"
  | "attendance.view" | "attendance.manage" | "barcodes.view" | "guardian_messages.view"
  | "courses.view" | "courses.manage" | "lessons.view" | "lessons.manage" | "packages.view" | "packages.manage"
  | "exams.view" | "exams.manage" | "grades.view" | "grades.manage" | "store.view" | "store.manage"
  | "payments.view" | "payments.manage" | "coupons.view" | "coupons.manage" | "access_codes.view" | "access_codes.manage" | "student_access.view" | "student_access.manage"
  | "teachers.view" | "teachers.manage" | "assistants.view" | "assistants.manage" | "assignments.view" | "assignments.manage"
  | "website.view" | "website.manage" | "reports.view" | "audit.view" | "settings.center" | "settings.system";
