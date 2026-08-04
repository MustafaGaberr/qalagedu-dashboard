import type { Permission } from "@/types/permissions";

export type DashboardModuleKey =
  | "scanner"
  | "students"
  | "courses"
  | "attendance"
  | "guardians"
  | "teachers"
  | "assistants"
  | "exams"
  | "results"
  | "subscriptions"
  | "reports"
  | "audit-log"
  | "settings";

export interface DashboardModulePage {
  key: DashboardModuleKey;
  title: string;
  description: string;
  permissions: Permission[];
}

export const dashboardModulePages = {
  scanner: {
    key: "scanner",
    title: "مسح QR",
    description:
      "واجهة تمهيدية لمكان تشغيل ماسح حضور QR مستقبلا، بدون كاميرا أو قراءة أكواد في هذه المرحلة.",
    permissions: ["scanner.use"],
  },
  students: {
    key: "students",
    title: "الطلاب",
    description:
      "أساس منطقة البحث والمتابعة وملفات الطلاب قبل إضافة عمليات الإنشاء أو التعديل.",
    permissions: ["students.view"],
  },
  courses: {
    key: "courses",
    title: "الكورسات والمجموعات",
    description:
      "مساحة موحدة لمعاينة صلاحيات الكورسات والمجموعات والروستر بدون إدارة محتوى حقيقية.",
    permissions: ["courses.view", "groups.view"],
  },
  attendance: {
    key: "attendance",
    title: "الحضور",
    description:
      "منطقة مراجعة وتسجيل حضور تمهيدية، لا تنفذ أي عمليات حفظ أو تعديل فعلية.",
    permissions: ["attendance.view"],
  },
  guardians: {
    key: "guardians",
    title: "أولياء الأمور",
    description:
      "أساس عرض بيانات التواصل ومساحات الاتصال المستقبلية بدون إرسال رسائل أو فتح واتساب.",
    permissions: ["guardians.view"],
  },
  teachers: {
    key: "teachers",
    title: "المدرسون",
    description:
      "مساحة إدارة فريق التدريس لمدير السنتر ومدير النظام، ولا تظهر للأدوار التشغيلية غير المخولة.",
    permissions: ["teachers.view"],
  },
  assistants: {
    key: "assistants",
    title: "المساعدون",
    description:
      "أساس متابعة موظفي الاستقبال والتشغيل بدون إنشاء حسابات أو تعديل صلاحيات.",
    permissions: ["assistants.view"],
  },
  exams: {
    key: "exams",
    title: "الاختبارات",
    description:
      "منطقة تمهيدية لعرض الاختبارات حسب الدور، بدون إنشاء اختبارات أو نشرها.",
    permissions: ["exams.view"],
  },
  results: {
    key: "results",
    title: "النتائج",
    description:
      "أساس عرض النتائج وصلاحياتها قبل ربطها بدرجات رسمية أو ملكية مدرس.",
    permissions: ["results.view"],
  },
  subscriptions: {
    key: "subscriptions",
    title: "الاشتراكات والمدفوعات",
    description:
      "واجهة تمهيدية لمساحة الاشتراكات والمدفوعات بدون معالجة مالية أو تكامل دفع.",
    permissions: ["subscriptions.view", "payments.view"],
  },
  reports: {
    key: "reports",
    title: "التقارير",
    description:
      "أساس تقارير تشغيلية مختصرة، بدون تحليلات أو رسوم بيانية أو مصادر بيانات فعلية.",
    permissions: ["reports.view"],
  },
  "audit-log": {
    key: "audit-log",
    title: "سجل المراجعة",
    description:
      "مساحة محجوزة لسجل العمليات المستقبلي، ولا تحتوي على تتبع أو تخزين فعلي الآن.",
    permissions: ["audit.view"],
  },
  settings: {
    key: "settings",
    title: "الإعدادات",
    description:
      "أساس إعدادات المركز والنظام حسب الصلاحية، بدون تغيير إعدادات حقيقية.",
    permissions: ["settings.center", "settings.system"],
  },
} as const satisfies Record<DashboardModuleKey, DashboardModulePage>;
