import type { DashboardRole } from "@/types/auth";

export interface DashboardStat {
  label: string;
  value: string;
  helper: string;
  status: "neutral" | "success" | "warning" | "info";
}

export interface DashboardAction {
  label: string;
  description: string;
  href: string;
  disabled?: boolean;
}

export interface DashboardActivity {
  title: string;
  description: string;
  time: string;
  status: "success" | "warning" | "info" | "neutral";
}

export interface DashboardOverviewData {
  title: string;
  description: string;
  stats: DashboardStat[];
  actions: DashboardAction[];
  activities: DashboardActivity[];
  alerts: DashboardActivity[];
}

export interface DashboardOverviewRepository {
  getOverviewForRole(role: DashboardRole): Promise<DashboardOverviewData>;
}

const overviewByRole = {
  SUPER_ADMIN: {
    title: "نظرة تشغيلية شاملة",
    description:
      "متابعة مركزية لحالة الطلاب، الفرق، الحضور، الاشتراكات، وسجل العمليات.",
    stats: [
      {
        label: "طلاب نشطون",
        value: "1,248",
        helper: "ضمن نطاق السنتر الحالي",
        status: "success",
      },
      {
        label: "مدرسون",
        value: "42",
        helper: "حسابات تدريس مفعلة",
        status: "info",
      },
      {
        label: "حضور اليوم",
        value: "86%",
        helper: "قراءات حضور مسجلة تجريبيا",
        status: "success",
      },
      {
        label: "مراجعات اشتراك",
        value: "18",
        helper: "تحتاج مراجعة إدارية لاحقا",
        status: "warning",
      },
    ],
    actions: [
      {
        label: "مراجعة الحضور",
        description: "افتح أساس صفحة الحضور للتأكد من صلاحيات العرض.",
        href: "/attendance",
      },
      {
        label: "إعدادات النظام",
        description: "معاينة منطقة الإعدادات المحجوزة لمدير النظام.",
        href: "/settings",
      },
      {
        label: "سجل المراجعة",
        description: "تجهيز مساحة السجل قبل ربطها بالباك اند.",
        href: "/audit-log",
      },
    ],
    activities: [
      {
        title: "تسجيل دفعة حضور صباحية",
        description: "بوابة الحضور سجلت مجموعة تجريبية جديدة.",
        time: "منذ 12 دقيقة",
        status: "success",
      },
      {
        title: "طلب مراجعة اشتراك",
        description: "عنصر مالي تجريبي ينتظر صلاحيات Phase 2.",
        time: "منذ 35 دقيقة",
        status: "warning",
      },
    ],
    alerts: [
      {
        title: "لا يوجد تكامل حقيقي بعد",
        description: "كل البيانات هنا Mock ولا تمثل أذونات آمنة.",
        time: "Phase 1",
        status: "info",
      },
    ],
  },
  ADMIN: {
    title: "تشغيل السنتر اليوم",
    description: "متابعة الجلسات اليومية، الطلاب، الاشتراكات، ومهام الفريق.",
    stats: [
      {
        label: "حصص اليوم",
        value: "14",
        helper: "جلسات مجدولة كبيانات معاينة",
        status: "info",
      },
      {
        label: "حضور الطلاب",
        value: "81%",
        helper: "ملخص حضور تشغيلي",
        status: "success",
      },
      {
        label: "مدفوعات معلقة",
        value: "9",
        helper: "تحتاج مراجعة لاحقا",
        status: "warning",
      },
      {
        label: "تسجيلات جديدة",
        value: "23",
        helper: "طلاب مضافون في بيانات mock",
        status: "neutral",
      },
    ],
    actions: [
      {
        label: "إدارة الطلاب",
        description: "معاينة أساس صفحة الطلاب بدون CRUD.",
        href: "/students",
      },
      {
        label: "الاشتراكات",
        description: "منطقة تمهيدية لعمليات الاشتراك والدفع.",
        href: "/subscriptions",
      },
    ],
    activities: [
      {
        title: "تحديث قائمة الحصص",
        description: "تجهيز تجربة تشغيلية للمركز.",
        time: "منذ 20 دقيقة",
        status: "info",
      },
    ],
    alerts: [
      {
        title: "إعدادات النظام غير متاحة",
        description: "مدير السنتر يرى إعدادات المركز فقط، وليس صلاحيات النظام.",
        time: "نموذج صلاحيات",
        status: "warning",
      },
    ],
  },
  TEACHER: {
    title: "مساحة المدرس الأكاديمية",
    description: "عرض مختصر للكورسات، المجموعات، الحضور، والمهام الأكاديمية.",
    stats: [
      {
        label: "كورساتي النشطة",
        value: "3",
        helper: "نطاق المدرس فقط في المستقبل",
        status: "info",
      },
      {
        label: "مجموعات اليوم",
        value: "4",
        helper: "مجموعات مرتبطة بالمدرس",
        status: "neutral",
      },
      {
        label: "حضور مجموعاتي",
        value: "78%",
        helper: "مؤشر تجريبي",
        status: "success",
      },
      {
        label: "مهام أكاديمية",
        value: "6",
        helper: "محتوى ونتائج تحتاج متابعة",
        status: "warning",
      },
    ],
    actions: [
      {
        label: "الكورسات والمجموعات",
        description: "معاينة نطاق أكاديمي مرتبط بالمدرس.",
        href: "/courses",
      },
      {
        label: "النتائج",
        description: "مساحة نتائج قابلة للتقييد بالملكية لاحقا.",
        href: "/results",
      },
    ],
    activities: [
      {
        title: "نتيجة اختبار تجريبية",
        description: "آخر تحديث أكاديمي ضمن بيانات Phase 1.",
        time: "منذ ساعة",
        status: "info",
      },
    ],
    alerts: [
      {
        title: "الملكية غير مطبقة بعد",
        description: "النموذج مجهز لتقييد بيانات المدرس عند ربط الباك اند.",
        time: "مهم",
        status: "warning",
      },
    ],
  },
  ASSISTANT: {
    title: "لوحة تشغيل المساعد",
    description:
      "مهام الاستقبال والحضور والبحث السريع بدون تحويل مباشر إلى الماسح.",
    stats: [
      {
        label: "حصص اليوم",
        value: "8",
        helper: "جلسات تحتاج متابعة استقبال",
        status: "info",
      },
      {
        label: "قراءات حديثة",
        value: "64",
        helper: "عمليات حضور تجريبية",
        status: "success",
      },
      {
        label: "طلاب يحتاجون مراجعة",
        value: "7",
        helper: "تنبيهات تشغيلية غير مالية",
        status: "warning",
      },
      {
        label: "تذكيرات ولي الأمر",
        value: "5",
        helper: "إجراءات تواصل Mock فقط",
        status: "neutral",
      },
    ],
    actions: [
      {
        label: "فتح ماسح QR",
        description: "زر وصول سريع للواجهة التمهيدية بدون تشغيل كاميرا.",
        href: "/scanner",
      },
      {
        label: "بحث عن طالب",
        description: "معاينة مسار البحث التشغيلي عن الطلاب.",
        href: "/students",
      },
      {
        label: "تواصل ولي الأمر",
        description: "مكان محجوز لتكامل واتساب لاحقا، بدون إرسال فعلي.",
        href: "/guardians",
        disabled: true,
      },
    ],
    activities: [
      {
        title: "تسجيل حضور مجموعة مسائية",
        description: "تمت إضافة قراءة تجريبية لحضور طالب.",
        time: "منذ 8 دقائق",
        status: "success",
      },
      {
        title: "ملاحظة تشغيلية",
        description: "طالب يحتاج تأكيد بيانات ولي الأمر.",
        time: "منذ 28 دقيقة",
        status: "warning",
      },
    ],
    alerts: [
      {
        title: "التواصل غير مفعل",
        description: "أزرار التواصل مع ولي الأمر تظهر كعناصر Mock معطلة.",
        time: "Phase 1",
        status: "info",
      },
    ],
  },
} as const satisfies Record<DashboardRole, DashboardOverviewData>;

export class MockDashboardOverviewRepository
  implements DashboardOverviewRepository
{
  async getOverviewForRole(role: DashboardRole) {
    return overviewByRole[role];
  }
}

export const dashboardOverviewRepository =
  new MockDashboardOverviewRepository();
