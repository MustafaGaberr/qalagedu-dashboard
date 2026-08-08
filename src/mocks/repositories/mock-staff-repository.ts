import { brandConfig } from "@/config/brand";
import type { AssistantProfile, DashboardSettings, TeacherProfile } from "@/types/staff";

export const initialTeacherProfiles: TeacherProfile[] = [
  { id: "teacher_ahmed", name: "مستر محمد الجمل", subject: "رياضيات ثانوي", grades: ["الثانوية"], courseIds: ["course_math"], groupIds: ["group_math_a", "group_math_b"], status: "ACTIVE" },
  { id: "teacher_mona", name: "مستر مصطفى مجدي", subject: "العلوم المتكاملة", grades: ["الأول الثانوي"], courseIds: ["course_physics"], groupIds: ["group_physics_c"], status: "ACTIVE" },
];
export const initialAssistantProfiles: AssistantProfile[] = [{ id: "usr_assistant", name: "سارة أحمد", email: "assistant@qalagedu.local", status: "ACTIVE" }];
export const initialDashboardSettings: DashboardSettings = { brandName: brandConfig.name, shortName: brandConfig.shortName, centerName: brandConfig.centerName, supportEmail: brandConfig.support.email, supportPhone: brandConfig.support.phone, whatsapp: brandConfig.support.whatsapp, websiteUrl: brandConfig.url, currentTerm: "الفصل الدراسي الأول 2026/2027", attendanceDefaultMinutes: 90, guardianTemplate: "تم تسجيل حضور الطالب {student} في {date}.", studentSessionPolicy: "جلسة الطالب مخصصة للوصول التعليمي فقط ولا تمنح صلاحيات موظف.", staffSessionPolicy: "الجلسة التجريبية تحدد الدور والنطاق ولا تستخدم مصادقة حقيقية.", logoSrc: brandConfig.markSrc };
