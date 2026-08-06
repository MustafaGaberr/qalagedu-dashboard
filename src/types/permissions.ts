export type Permission =
  | "dashboard.view"
  | "students.view" | "students.manage" | "center_requests.view" | "center_requests.manage" | "groups.view" | "groups.manage"
  | "attendance.view" | "attendance.scan" | "attendance.manage" | "scores.manage" | "barcodes.view" | "barcodes.manage" | "guardian_messages.view" | "guardian_messages.prepare" | "guardian_messages.mark_sent"
  | "courses.view" | "courses.manage" | "lessons.view" | "lessons.manage" | "packages.view" | "packages.manage"
  | "exams.view" | "exams.manage" | "grades.view" | "grades.manage" | "store.view" | "store.manage"
  | "payments.view" | "payments.manage" | "payments.review" | "coupons.view" | "coupons.manage" | "coupons.create" | "access_codes.view" | "access_codes.manage" | "access_codes.create" | "student_access.view" | "student_access.manage" | "student_access.grant" | "student_access.revoke" | "reports.financial"
  | "teachers.view" | "teachers.manage" | "assistants.view" | "assistants.manage" | "assignments.view" | "assignments.manage"
  | "website.view" | "website.manage" | "reports.view" | "audit.view" | "settings.center" | "settings.system";
