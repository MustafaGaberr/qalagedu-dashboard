import type { AssistantAssignment } from "@/types/auth";
import type { Permission } from "@/types/permissions";

export type StaffStatus = "ACTIVE" | "SUSPENDED";
export interface TeacherProfile { id: string; name: string; subject: string; grades: string[]; courseIds: string[]; groupIds: string[]; status: StaffStatus; }
export interface AssistantProfile { id: string; name: string; email: string; status: StaffStatus; }
export interface DashboardSettings { brandName: string; shortName: string; centerName: string; supportEmail: string; supportPhone: string; whatsapp: string; websiteUrl: string; currentTerm: string; attendanceDefaultMinutes: number; guardianTemplate: string; studentSessionPolicy: string; staffSessionPolicy: string; logoSrc: string; }
export interface AssignmentDraft { assistantId: string; teacherId: string; courses: string[]; grades: string[]; groups: string[]; permissions: Permission[]; }
export type ManagedAssignment = AssistantAssignment & { active: boolean };
