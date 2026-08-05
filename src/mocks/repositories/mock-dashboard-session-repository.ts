import type { AssistantAssignment, DashboardRole, DashboardUser } from "@/types/auth";

export interface DashboardSessionRepository {
  getCurrentUser(role?: DashboardRole): Promise<DashboardUser>;
  getUsers(): Promise<DashboardUser[]>;
}

export const mockDashboardUsers = [
  { id: "usr_super_admin", fullName: "مصطفى محمود", firstName: "مصطفى", email: "super.admin@qalagedu.local", role: "SUPER_ADMIN", avatarInitials: "مم", accountStatus: "active", centerName: "منظومة قلعة التعليم" },
  { id: "usr_teacher_admin", fullName: "أحمد عبد الرحمن", firstName: "أحمد", email: "teacher@qalagedu.local", role: "TEACHER_ADMIN", avatarInitials: "أع", accountStatus: "active", centerName: "سنتر قلعة التعليم - الرئيسي", teacherId: "teacher_ahmed", assignedSubjects: ["الرياضيات"], assignedGroups: ["ثالثة ثانوي - أ", "ثانية ثانوي - ب"] },
  { id: "usr_assistant", fullName: "سارة أحمد", firstName: "سارة", email: "assistant@qalagedu.local", role: "ASSISTANT", avatarInitials: "سأ", accountStatus: "active", centerName: "سنتر قلعة التعليم - الرئيسي" },
] as const satisfies readonly DashboardUser[];

export const mockAssistantAssignments: readonly AssistantAssignment[] = [
  { id: "assignment_sara_ahmed", assistantId: "usr_assistant", teacherId: "teacher_ahmed", teacherName: "أ. أحمد عبد الرحمن", subject: "الرياضيات", grades: ["الثالثة الثانوية"], groups: ["ثالثة ثانوي - أ", "ثالثة ثانوي - ب"], permissions: ["dashboard.view", "students.view", "students.manage", "center_requests.view", "groups.view", "attendance.view", "attendance.manage", "barcodes.view", "guardian_messages.view", "courses.view", "exams.view", "grades.view", "payments.view"] },
  { id: "assignment_sara_mona", assistantId: "usr_assistant", teacherId: "teacher_mona", teacherName: "أ. منى السيد", subject: "الفيزياء", grades: ["الثالثة الثانوية"], groups: ["ثالثة ثانوي - ج"], permissions: ["dashboard.view", "attendance.view", "attendance.manage"] },
];

export class MockDashboardSessionRepository implements DashboardSessionRepository {
  async getCurrentUser(role: DashboardRole = "SUPER_ADMIN") { return mockDashboardUsers.find((user) => user.role === role) ?? mockDashboardUsers[0]; }
  async getUsers() { return [...mockDashboardUsers]; }
}

export const dashboardSessionRepository = new MockDashboardSessionRepository();
