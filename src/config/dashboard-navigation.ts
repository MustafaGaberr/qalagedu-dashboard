import {
  BookOpen, ClipboardCheck, FileBarChart, FileKey, FileText,
  GraduationCap, Home, Landmark, Layers3, LayoutPanelTop, MessageCircle,
  Package, QrCode, ReceiptText, Settings, ShieldCheck, Store, UserCog,
  UserRoundCheck, UsersRound, WalletCards,
} from "lucide-react";
import type { DashboardNavigationItem, DashboardNavigationSection } from "@/types/navigation";

export const dashboardNavigationSections: readonly DashboardNavigationSection[] = [
  { id: "overview", label: "نظرة عامة", items: [{ label: "الرئيسية", href: "/dashboard", icon: Home, permissions: ["dashboard.view"] }] },
  { id: "operations", label: "الطلاب وتشغيل المركز", items: [
    { label: "الطلاب", href: "/students", icon: GraduationCap, permissions: ["students.view"] },
    { label: "طلبات الانضمام", href: "/center-requests", icon: FileText, permissions: ["center_requests.view"] },
    { label: "المجموعات", href: "/groups", icon: UsersRound, permissions: ["groups.view"] },
    { label: "الحضور", href: "/attendance", icon: ClipboardCheck, permissions: ["attendance.view"] },
    { label: "بطاقات وباركود الطلاب", href: "/barcodes", icon: QrCode, permissions: ["barcodes.view"] },
    { label: "رسائل أولياء الأمور", href: "/guardian-messages", icon: MessageCircle, permissions: ["guardian_messages.view"] },
  ] },
  { id: "learning", label: "المحتوى التعليمي", items: [
    { label: "الكورسات", href: "/courses", icon: BookOpen, permissions: ["courses.view"] },
    { label: "الوحدات والدروس", href: "/lessons", icon: Layers3, permissions: ["lessons.view"] },
    { label: "الباقات والأسعار", href: "/packages", icon: Package, permissions: ["packages.view"] },
    { label: "الامتحانات والدرجات", href: "/exams", icon: FileBarChart, permissions: ["exams.view"] },
    { label: "الكتب والمتجر", href: "/store", icon: Store, permissions: ["store.view"] },
  ] },
  { id: "finance", label: "الماليات والوصول", items: [
    { label: "طلبات الدفع", href: "/payments", icon: ReceiptText, permissions: ["payments.view"] },
    { label: "الكوبونات", href: "/coupons", icon: WalletCards, permissions: ["coupons.view"] },
    { label: "أكواد الفتح", href: "/access-codes", icon: FileKey, permissions: ["access_codes.view"] },
    { label: "صلاحيات الطلاب", href: "/student-access", icon: ShieldCheck, permissions: ["student_access.view"] },
  ] },
  { id: "team", label: "الفريق والصلاحيات", items: [
    { label: "المدرسون", href: "/teachers", icon: UserRoundCheck, permissions: ["teachers.view"] },
    { label: "المساعدون", href: "/assistants", icon: UserCog, permissions: ["assistants.view"] },
    { label: "التعيينات والصلاحيات", href: "/assignments", icon: ShieldCheck, permissions: ["assignments.view"] },
  ] },
  { id: "website", label: "إدارة الموقع", items: [{ label: "محتوى الموقع", href: "/website", icon: LayoutPanelTop, permissions: ["website.view"] }] },
  { id: "system", label: "التقارير والنظام", items: [
    { label: "التقارير", href: "/reports", icon: Landmark, permissions: ["reports.view"] },
    { label: "سجل العمليات", href: "/audit-log", icon: ShieldCheck, permissions: ["audit.view"] },
    { label: "الإعدادات", href: "/settings", icon: Settings, permissions: ["settings.center", "settings.system"] },
  ] },
] as const satisfies readonly DashboardNavigationSection[];

export const allNavigationItems: DashboardNavigationItem[] = dashboardNavigationSections.flatMap((section) => section.items);
