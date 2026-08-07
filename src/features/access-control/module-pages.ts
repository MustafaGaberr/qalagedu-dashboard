import type { Permission } from "@/types/permissions";

export type DashboardModuleKey = "students" | "center-requests" | "groups" | "attendance" | "barcodes" | "guardian-messages" | "courses" | "lessons" | "packages" | "exams" | "grades" | "store" | "payments" | "coupons" | "access-codes" | "student-access" | "teachers" | "assistants" | "assignments" | "website" | "reports" | "audit-log" | "settings";
export interface DashboardModulePage { key: DashboardModuleKey; title: string; description: string; permissions: Permission[]; }
// `module` remains as a local factory name below only to keep the page map concise.
const module = (key: DashboardModuleKey, title: string, description: string, permissions: Permission[]): DashboardModulePage => ({ key, title, description, permissions }); // eslint-disable-line @next/next/no-assign-module-variable
export const dashboardModulePages = {
  students: module("students", "الطلاب", "أساس متابعة الطلاب وبياناتهم داخل نطاق مساحة العمل الحالية.", ["students.view"]),
  "center-requests": module("center-requests", "طلبات الانضمام", "مساحة فرز طلبات الانضمام قبل إضافة سير المراجعة والقبول.", ["center_requests.view"]),
  groups: module("groups", "المجموعات", "أساس عرض وإدارة مجموعات المركز في المرحلة القادمة.", ["groups.view"]),
  attendance: module("attendance", "الحضور", "واجهة تمهيدية لجلسات الحضور دون تسجيل أو تعديل فعلي في هذه المرحلة.", ["attendance.view"]),
  barcodes: module("barcodes", "بطاقات وباركود الطلاب", "أساس بطاقات الطلاب والباركود؛ لا توجد قيم أو طباعة فعلية بعد.", ["barcodes.view"]),
  "guardian-messages": module("guardian-messages", "رسائل أولياء الأمور", "أساس تنظيم الرسائل والتواصل دون أي إرسال فعلي.", ["guardian_messages.view"]),
  courses: module("courses", "الكورسات", "مساحة تأسيسية للكورسات قبل بناء المحتوى وسير النشر.", ["courses.view"]),
  lessons: module("lessons", "الوحدات والدروس", "واجهة تنظيم المحتوى التعليمي المستقبلية دون تعديلات فعلية.", ["lessons.view"]),
  packages: module("packages", "الباقات والأسعار", "أساس عرض الباقات قبل إعداد التسعير والمدفوعات.", ["packages.view"]),
  exams: module("exams", "الامتحانات", "أساس الامتحانات والدرجات قبل إنشاء أو نشر أي امتحان.", ["exams.view"]),
  grades: module("grades", "الدرجات", "متابعة درجات الاختبارات ضمن العقود المتاحة من الخادم.", ["grades.view"]),
  store: module("store", "الكتب والمتجر", "أساس إدارة المتجر التعليمي قبل إضافة مخزون أو طلبات.", ["store.view"]),
  payments: module("payments", "طلبات الدفع", "واجهة مراجعة تمهيدية دون معالجة مالية أو تكامل دفع.", ["payments.view"]),
  coupons: module("coupons", "الكوبونات", "أساس الكوبونات قبل إنشاء أو تفعيل أكواد حقيقية.", ["coupons.view"]),
  "access-codes": module("access-codes", "أكواد الفتح", "أساس تنظيم أكواد الوصول دون إصدار أو تفعيل فعلي.", ["access_codes.view"]),
  "student-access": module("student-access", "صلاحيات الطلاب", "أساس عرض وصول الطلاب داخل نطاق الدور الحالي.", ["student_access.view"]),
  teachers: module("teachers", "المدرسون", "مساحة إدارة فريق التدريس للنظام فقط.", ["teachers.view"]),
  assistants: module("assistants", "المساعدون", "أساس إدارة المساعدين المرتبطين بنطاق المدرس أو النظام.", ["assistants.view"]),
  assignments: module("assignments", "التعيينات والصلاحيات", "مساحة ربط المساعدين بالمدرسين ونطاقات التشغيل مستقبلًا.", ["assignments.view"]),
  website: module("website", "محتوى الموقع", "أساس محتوى البانرات والأقسام والمراجعات والأخبار العامة.", ["website.view"]),
  reports: module("reports", "التقارير", "مساحة تقارير تشغيلية مختصرة دون تحليلات أو مصادر فعلية.", ["reports.view"]),
  "audit-log": module("audit-log", "سجل العمليات", "أساس سجل التدقيق المستقبلي دون تخزين أو تتبع فعلي الآن.", ["audit.view"]),
  settings: module("settings", "الإعدادات", "أساس إعدادات المركز والنظام وفق الدور، دون حفظ تغييرات فعلية.", ["settings.center", "settings.system"]),
} as const satisfies Record<DashboardModuleKey, DashboardModulePage>;
