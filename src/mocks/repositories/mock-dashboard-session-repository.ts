import type { DashboardRole, DashboardUser } from "@/types/auth";

export interface DashboardSessionRepository {
  getCurrentUser(role?: DashboardRole): Promise<DashboardUser>;
  getUsers(): Promise<DashboardUser[]>;
}

export const mockDashboardUsers = [
  {
    id: "usr_super_admin",
    fullName: "مصطفى محمود",
    firstName: "مصطفى",
    email: "super.admin@qalagedu.local",
    phone: "01000000001",
    role: "SUPER_ADMIN",
    avatarInitials: "مم",
    accountStatus: "active",
    centerName: "كل الفروع",
  },
  {
    id: "usr_admin",
    fullName: "سارة أحمد",
    firstName: "سارة",
    email: "admin@qalagedu.local",
    phone: "01000000002",
    role: "ADMIN",
    avatarInitials: "سأ",
    accountStatus: "active",
    centerName: "سنتر قلعة التعليم - الرئيسي",
  },
  {
    id: "usr_teacher",
    fullName: "أحمد عبد الرحمن",
    firstName: "أحمد",
    email: "teacher@qalagedu.local",
    phone: "01000000003",
    role: "TEACHER",
    avatarInitials: "أع",
    accountStatus: "active",
    centerName: "سنتر قلعة التعليم - الرئيسي",
    assignedSubjects: ["الرياضيات"],
    assignedGroups: ["ثالثة ثانوي - أ", "ثانية ثانوي - ب"],
  },
  {
    id: "usr_assistant",
    fullName: "ندى خالد",
    firstName: "ندى",
    email: "assistant@qalagedu.local",
    phone: "01000000004",
    role: "ASSISTANT",
    avatarInitials: "نك",
    accountStatus: "active",
    centerName: "سنتر قلعة التعليم - الرئيسي",
    assignedGroups: ["استقبال الفترة المسائية", "بوابة الحضور"],
  },
] as const satisfies readonly DashboardUser[];

export class MockDashboardSessionRepository
  implements DashboardSessionRepository
{
  async getCurrentUser(role: DashboardRole = "SUPER_ADMIN") {
    return mockDashboardUsers.find((user) => user.role === role) ?? mockDashboardUsers[0];
  }

  async getUsers() {
    return [...mockDashboardUsers];
  }
}

export const dashboardSessionRepository =
  new MockDashboardSessionRepository();
