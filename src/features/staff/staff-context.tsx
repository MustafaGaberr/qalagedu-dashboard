"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { brandConfig } from "@/config/brand";
import { mapPermissions, toBackendPermissions } from "@/features/auth/auth-types";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { useOperations } from "@/features/operations/operations-context";
import { apiRequest } from "@/lib/api/client";
import { toApiError } from "@/lib/api/errors";
import type { AssignmentDraft, AssistantProfile, DashboardSettings, ManagedAssignment, StaffAccountInput, TeacherProfile } from "@/types/staff";

type TeacherInput = StaffAccountInput & { subject?: string };
type AssistantInput = { name: string; email: string; password?: string; status?: AssistantProfile["status"] };
type Value = { teachers: TeacherProfile[]; assistants: AssistantProfile[]; assignments: ManagedAssignment[]; settings: DashboardSettings; canSeeTeacher: (id: string) => boolean; createTeacher: (x: TeacherInput) => string | undefined; updateTeacher: (id: string, x: Partial<TeacherInput>) => string | undefined; setTeacherStatus: (id: string, s: TeacherProfile["status"]) => string | undefined; createAssistant: (x: AssistantInput) => string | undefined; updateAssistant: (id: string, x: Partial<AssistantInput>) => string | undefined; setAssistantStatus: (id: string, s: AssistantProfile["status"]) => string | undefined; createAssignment: (x: AssignmentDraft) => string | undefined; updateAssignment: (id: string, x: AssignmentDraft) => string | undefined; copyAssignment: (id: string, assistantId: string, teacherId: string) => string | undefined; suspendAssignment: (id: string) => string | undefined; updateSettings: (x: Partial<DashboardSettings>) => string | undefined };
const Context = createContext<Value | null>(null);
const defaultSettings: DashboardSettings = { brandName: brandConfig.name, shortName: brandConfig.shortName, centerName: brandConfig.centerName, supportEmail: brandConfig.support.email, supportPhone: brandConfig.support.phone, whatsapp: brandConfig.support.whatsapp, websiteUrl: brandConfig.url, currentTerm: "—", attendanceDefaultMinutes: 90, guardianTemplate: "—", studentSessionPolicy: "—", staffSessionPolicy: "تُحل الصلاحيات والنطاق من جلسة الخادم.", logoSrc: brandConfig.markSrc };

export function StaffProvider({ children }: { children: React.ReactNode }) {
  const ops = useOperations(); const workspace = useDashboardWorkspace();
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]); const [assistants, setAssistants] = useState<AssistantProfile[]>([]); const [assignments, setAssignments] = useState<ManagedAssignment[]>([]); const [settings, setSettings] = useState(defaultSettings);
  const load = useCallback(async () => {
    const canStaff = workspace.role === "SUPER_ADMIN" || workspace.role === "TEACHER_ADMIN";
    if (!canStaff) { setTeachers([]); setAssistants([]); setAssignments([]); return; }
    const [teacherRaw, assistantRaw, assignmentRaw, settingRaw] = await Promise.all([apiRequest<any[]>("staff/teachers"), apiRequest<any[]>("staff/assistants"), apiRequest<any[]>("staff/assignments"), apiRequest<DashboardSettings>("settings")]);
    setTeachers(teacherRaw.map((item) => ({ id: item.id, name: item.name, loginIdentifier: item.loginIdentifier, subject: item.teacherProfile?.subject ?? "—", grades: [...new Set([...(item.coursesAsTeacher ?? []).map((course: any) => course.gradeId), ...(item.centerGroupsAsTeacher ?? []).map((group: any) => group.gradeId)])] as string[], courseIds: (item.coursesAsTeacher ?? []).map((course: any) => course.id), groupIds: (item.centerGroupsAsTeacher ?? []).map((group: any) => group.id), status: item.status })));
    setAssistants(assistantRaw.map((item) => ({ id: item.id, name: item.name, email: item.loginIdentifier, status: item.status })));
    setAssignments(assignmentRaw.map((item) => ({ id: item.id, assistantId: item.assistantId, teacherId: item.teacherId, teacherName: item.teacher?.name ?? item.teacherId, subject: item.label ?? "", courses: Array.isArray(item.courseIds) ? item.courseIds : [], grades: Array.isArray(item.gradeIds) ? item.gradeIds : [], groups: Array.isArray(item.groupIds) ? item.groupIds : [], permissions: mapPermissions((item.permissions ?? []).map((entry: any) => entry.permission)), active: item.status === "ACTIVE" })));
    setSettings(settingRaw);
  }, [workspace.role]);
  useEffect(() => { void load().catch((error) => window.alert(toApiError(error).message)); }, [load]);
  const mutate = (path: string, method: string, body?: unknown) => { void apiRequest(path, { method, body }).then(load).catch((error) => window.alert(toApiError(error).message)); return undefined; };
  const createTeacher = (input: TeacherInput) => input.password ? mutate("staff/teachers", "POST", input) : "كلمة المرور مطلوبة لإنشاء حساب المدرس.";
  const updateTeacher = (id: string, input: Partial<TeacherInput>) => mutate(`staff/teachers/${id}`, "PATCH", input);
  const createAssistant = (input: AssistantInput) => input.password ? mutate("staff/assistants", "POST", { name: input.name, loginIdentifier: input.email, password: input.password, status: input.status }) : "كلمة المرور مطلوبة لإنشاء حساب المساعد.";
  const updateAssistant = (id: string, input: Partial<AssistantInput>) => mutate(`staff/assistants/${id}`, "PATCH", { name: input.name, loginIdentifier: input.email, password: input.password, status: input.status });
  const body = (input: AssignmentDraft) => ({ assistantId: input.assistantId, teacherId: input.teacherId, courseIds: input.courses, gradeIds: input.grades, groupIds: input.groups, permissions: toBackendPermissions(input.permissions) });
  const settingsBody = (input: Partial<DashboardSettings>) => ({ brandName: input.brandName, shortName: input.shortName, centerName: input.centerName, supportEmail: input.supportEmail, supportPhone: input.supportPhone, whatsapp: input.whatsapp, websiteUrl: input.websiteUrl, currentTerm: input.currentTerm, attendanceDefaultMinutes: input.attendanceDefaultMinutes, guardianTemplate: input.guardianTemplate, studentSessionPolicy: input.studentSessionPolicy, staffSessionPolicy: input.staffSessionPolicy, logoSrc: input.logoSrc });
  const copyAssignment = (id: string, assistantId: string, teacherId: string) => { const source = assignments.find((item) => item.id === id); const teacher = teachers.find((item) => item.id === teacherId); if (!source || !teacher || source.teacherId === teacherId) return "اختر نطاق مدرس مختلفًا لنسخ التعيين."; return mutate("staff/assignments", "POST", body({ assistantId, teacherId, courses: teacher.courseIds, grades: teacher.grades, groups: teacher.groupIds, permissions: source.permissions })); };
  return <Context.Provider value={{ teachers, assistants, assignments, settings, canSeeTeacher: ops.canSeeTeacher, createTeacher, updateTeacher, setTeacherStatus: (id, status) => updateTeacher(id, { status }), createAssistant, updateAssistant, setAssistantStatus: (id, status) => updateAssistant(id, { status }), createAssignment: (input) => mutate("staff/assignments", "POST", body(input)), updateAssignment: (id, input) => mutate(`staff/assignments/${id}`, "PATCH", body(input)), copyAssignment, suspendAssignment: (id) => mutate(`staff/assignments/${id}`, "DELETE"), updateSettings: (input) => mutate("settings", "PATCH", settingsBody(input)) }}>{children}</Context.Provider>;
}
export function useStaff() { const value = useContext(Context); if (!value) throw new Error("useStaff must be used within StaffProvider"); return value; }
