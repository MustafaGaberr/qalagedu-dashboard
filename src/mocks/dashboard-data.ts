import type { DashboardRole } from "@/types/auth";

export interface DashboardMetric { label: string; value: string; helper: string; status: "neutral" | "success" | "warning" | "info"; }
export interface DashboardItem { title: string; description: string; time: string; status: "success" | "warning" | "info" | "neutral"; }
import type { Permission } from "@/types/permissions";
export interface DashboardAction { label: string; description: string; href: string; permission?: Permission; }
export const academicTerm = "الفصل الدراسي الأول 2026/2027";

const sharedActivity: DashboardItem[] = [
  { title: "تحديث بيانات مجموعة", description: "تمت مراجعة بيانات المجموعة المسائية.", time: "منذ 18 دقيقة", status: "success" },
  { title: "طلب يحتاج مراجعة", description: "هناك بيانات ناقصة قبل إكمال الإجراء.", time: "منذ 42 دقيقة", status: "warning" },
];

export const dashboardMockData: Record<DashboardRole, { metrics: DashboardMetric[]; attention: DashboardItem[]; activity: DashboardItem[]; actions: DashboardAction[] }> = {
  SUPER_ADMIN: {
    metrics: [{ label: "المدرسون النشطون", value: "18", helper: "ضمن المركز هذا الفصل", status: "success" }, { label: "الطلاب النشطون", value: "1,284", helper: "في مجموعات منشورة", status: "info" }, { label: "طلبات الدفع", value: "14", helper: "بانتظار المراجعة", status: "warning" }, { label: "حصص اليوم", value: "26", helper: "جلسات مركز مجدولة", status: "neutral" }],
    attention: [{ title: "مساعدون دون تعيين", description: "ثلاثة حسابات تحتاج نطاق مدرس قبل بدء التشغيل.", time: "اليوم", status: "warning" }, { title: "مجموعات قاربت الامتلاء", description: "مجموعتان تجاوزتا 90٪ من السعة.", time: "اليوم", status: "info" }], activity: sharedActivity,
    actions: [{ label: "مراجعة طلبات الدفع", description: "متابعة عناصر المراجعة اليومية.", href: "/payments" }, { label: "إدارة التعيينات", description: "ربط المساعدين بنطاقات المدرسين.", href: "/assignments" }, { label: "عرض التقارير", description: "الوصول إلى ملخصات التشغيل.", href: "/reports" }],
  },
  TEACHER_ADMIN: {
    metrics: [{ label: "مجموعات اليوم", value: "4", helper: "رياضيات للمرحلة الثانوية", status: "info" }, { label: "الحصة التالية", value: "4:00 م", helper: "ثالثة ثانوي - أ", status: "neutral" }, { label: "الطلاب المتوقعون", value: "92", helper: "عبر جلسات اليوم", status: "success" }, { label: "طلبات معلقة", value: "6", helper: "انضمام أو دفع", status: "warning" }],
    attention: [{ title: "درجات لم تُدخل", description: "اختبار أسبوعي واحد ينتظر التسجيل.", time: "قبل الحصة التالية", status: "warning" }, { title: "محتوى بانتظار النشر", description: "درس المراجعة النهائية لم يُنشر بعد.", time: "هذا الأسبوع", status: "info" }], activity: sharedActivity,
    actions: [{ label: "فتح حضور اليوم", description: "متابعة الجلسة القادمة.", href: "/attendance" }, { label: "إدارة الكورسات", description: "عرض محتوى نطاقك التعليمي.", href: "/courses" }, { label: "مراجعة المساعدين", description: "عرض تعيينات فريقك.", href: "/assistants" }],
  },
  ASSISTANT: {
    metrics: [{ label: "مجموعات اليوم", value: "2", helper: "داخل نطاق التعيين الحالي", status: "info" }, { label: "طلبات الانضمام", value: "3", helper: "تحتاج استكمال البيانات", status: "warning" }, { label: "جلسات الحضور", value: "2", helper: "جاهزة للتشغيل", status: "success" }, { label: "طلبات الدفع", value: "4", helper: "ضمن الصلاحيات الحالية", status: "neutral" }],
    attention: [{ title: "بيان ولي أمر ناقص", description: "طالب واحد يحتاج رقم تواصل قبل التأكيد.", time: "اليوم", status: "warning" }, { title: "بطاقة تحتاج مراجعة", description: "تم إيقاف إصدار تجريبي بسبب تكرار البيانات.", time: "اليوم", status: "info" }], activity: [{ title: "مراجعة كشف حضور", description: "تمت مراجعة جلسة داخل نطاق المدرس المحدد.", time: "منذ 12 دقيقة", status: "success" }, { title: "طلب انضمام", description: "حُفظت ملاحظة للمراجعة لاحقًا.", time: "منذ ساعة", status: "neutral" }],
    actions: [{ label: "بدء تسجيل الحضور", description: "فتح أساس جلسة الحضور.", href: "/attendance", permission: "attendance.view" }, { label: "البحث عن طالب", description: "الوصول إلى قائمة الطلاب ضمن النطاق.", href: "/students", permission: "students.view" }, { label: "مراجعة طلبات الانضمام", description: "متابعة بيانات الطلبات المسموح بها.", href: "/center-requests", permission: "center_requests.view" }, { label: "مراجعة طلبات الدفع", description: "عرض واجهة المراجعة التمهيدية.", href: "/payments", permission: "payments.view" }],
  },
};

export const courseSummaries = ["أساسيات التفاضل", "مراجعة الجبر", "تدريبات نهاية الفصل"];
