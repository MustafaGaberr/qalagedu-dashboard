"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { switchAssistantWorkspace } from "@/features/auth/auth-service";
import { mapPermissions } from "@/features/auth/auth-types";
import type { AssistantAssignment, DashboardRole, DashboardUser } from "@/types/auth";
import type { Permission } from "@/types/permissions";
interface Value { user: DashboardUser; role: DashboardRole; setRole: (role: DashboardRole) => void; assignment?: AssistantAssignment; setAssignmentId: (id: string) => void; assignments: readonly AssistantAssignment[]; upsertAssignment: (assignment: AssistantAssignment) => void; suspendAssignment: (id: string) => void; permissions: readonly Permission[]; sidebarCollapsed: boolean; setSidebarCollapsed: (value: boolean) => void; workspaceError?: string; }
const Context = createContext<Value | null>(null);
export function DashboardWorkspaceProvider({ initialUser, initialAssignmentId, initialAssignments, initialPermissions, children }: { initialUser: DashboardUser; initialAssignmentId?: string; initialAssignments: AssistantAssignment[]; initialPermissions: Permission[]; children: React.ReactNode }) {
  const [assignmentId, setAssignmentIdState] = useState(initialAssignmentId ?? initialAssignments[0]?.id); const [permissions, setPermissions] = useState(initialPermissions); const [sidebarCollapsed, setSidebarCollapsed] = useState(false); const [workspaceError, setWorkspaceError] = useState<string>();
  const assignment = useMemo(() => initialAssignments.find((item) => item.id === assignmentId), [assignmentId, initialAssignments]);
  const setAssignmentId = (id: string) => { const previous = assignmentId; setWorkspaceError(undefined); void switchAssistantWorkspace(id).then((session) => { setAssignmentIdState(session.workspace.assignmentId ?? id); setPermissions(mapPermissions(session.permissions, session.role)); window.location.assign("/dashboard"); }).catch(() => { setAssignmentIdState(previous); setWorkspaceError("تعذر تغيير مساحة العمل. حدّث الجلسة وحاول مرة أخرى."); }); };
  return <Context.Provider value={{ user: initialUser, role: initialUser.role, setRole: () => undefined, assignment, setAssignmentId, assignments: initialAssignments, upsertAssignment: () => undefined, suspendAssignment: () => undefined, permissions, sidebarCollapsed, setSidebarCollapsed, workspaceError }}>{children}</Context.Provider>;
}
export function useDashboardWorkspace() { const value = useContext(Context); if (!value) throw new Error("useDashboardWorkspace must be used within DashboardWorkspaceProvider"); return value; }
