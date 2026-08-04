import {
  Activity,
  BadgeDollarSign,
  BookOpen,
  ClipboardCheck,
  FileBarChart,
  GraduationCap,
  Home,
  Landmark,
  LockKeyhole,
  MessageCircle,
  QrCode,
  Settings,
  ShieldCheck,
  UserCog,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

import type {
  DashboardNavigationItem,
  DashboardNavigationSection,
} from "@/types/navigation";

export const dashboardNavigationSections: readonly DashboardNavigationSection[] = [
  {
    id: "main",
    label: "عام",
    items: [
      {
        label: "الرئيسية",
        href: "/dashboard",
        icon: Home,
        permissions: ["dashboard.view"],
      },
    ],
  },
  {
    id: "operations",
    label: "التشغيل اليومي",
    items: [
      {
        label: "مسح QR",
        href: "/scanner",
        icon: QrCode,
        permissions: ["scanner.use"],
        description: {
          ASSISTANT: "تسجيل حضور الطلاب من كود الحصة عند تفعيل التكامل.",
        },
      },
      {
        label: "الطلاب",
        href: "/students",
        icon: GraduationCap,
        permissions: ["students.view"],
      },
      {
        label: "الكورسات والمجموعات",
        href: "/courses",
        icon: BookOpen,
        permissions: ["courses.view", "groups.view"],
      },
      {
        label: "الحضور",
        href: "/attendance",
        icon: ClipboardCheck,
        permissions: ["attendance.view"],
      },
      {
        label: "أولياء الأمور",
        href: "/guardians",
        icon: UsersRound,
        permissions: ["guardians.view"],
      },
      {
        label: "التواصل",
        href: "/guardians",
        icon: MessageCircle,
        permissions: ["guardians.contact"],
        disabled: true,
        description: {
          ASSISTANT: "إجراءات تواصل تجريبية فقط بدون واتساب حقيقي.",
        },
      },
    ],
  },
  {
    id: "academic",
    label: "الأكاديمي",
    items: [
      {
        label: "المدرسون",
        href: "/teachers",
        icon: UserRoundCheck,
        permissions: ["teachers.view"],
      },
      {
        label: "المساعدون",
        href: "/assistants",
        icon: UserCog,
        permissions: ["assistants.view"],
      },
      {
        label: "الاختبارات",
        href: "/exams",
        icon: FileBarChart,
        permissions: ["exams.view"],
      },
      {
        label: "النتائج",
        href: "/results",
        icon: Activity,
        permissions: ["results.view"],
      },
    ],
  },
  {
    id: "finance",
    label: "الإدارة والتقارير",
    items: [
      {
        label: "الاشتراكات والمدفوعات",
        href: "/subscriptions",
        icon: BadgeDollarSign,
        permissions: ["subscriptions.view", "payments.view"],
      },
      {
        label: "التقارير",
        href: "/reports",
        icon: Landmark,
        permissions: ["reports.view"],
      },
    ],
  },
  {
    id: "system",
    label: "النظام",
    items: [
      {
        label: "سجل المراجعة",
        href: "/audit-log",
        icon: ShieldCheck,
        permissions: ["audit.view"],
      },
      {
        label: "الإعدادات",
        href: "/settings",
        icon: Settings,
        permissions: ["settings.center", "settings.system"],
      },
      {
        label: "المستخدمون والصلاحيات",
        href: "/settings",
        icon: LockKeyhole,
        permissions: ["users.manage", "permissions.manage"],
        disabled: true,
      },
    ],
  },
] as const satisfies readonly DashboardNavigationSection[];

export const allNavigationItems: DashboardNavigationItem[] = dashboardNavigationSections.flatMap(
  (section) => section.items,
);
