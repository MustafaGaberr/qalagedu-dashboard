"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { ROLE_PERMISSIONS } from "@/config/permissions";
import { persistMockSession } from "@/features/auth/actions";
import { mockAssistantAssignments, mockDashboardUsers } from "@/mocks/repositories/mock-dashboard-session-repository";
import type { AssistantAssignment, DashboardRole, DashboardUser } from "@/types/auth";
import type { Permission } from "@/types/permissions";

interface WorkspaceContextValue {
  user: DashboardUser;
  role: DashboardRole;
  setRole: (role: DashboardRole) => void;
  assignment?: AssistantAssignment;
  setAssignmentId: (id: string) => void;
  assignments: readonly AssistantAssignment[];
  upsertAssignment: (assignment: AssistantAssignment) => void;
  suspendAssignment: (id: string) => void;
  permissions: readonly Permission[];
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function DashboardWorkspaceProvider({ initialUser, initialAssignmentId, children }: { initialUser: DashboardUser; initialAssignmentId?: string; children: React.ReactNode }) {
  const [role, setRole] = useState<DashboardRole>(initialUser.role);
  const [assignmentId, setAssignmentIdState] = useState(initialAssignmentId ?? mockAssistantAssignments[0].id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [assignments, setAssignments] = useState<AssistantAssignment[]>([...mockAssistantAssignments]);
  const user = useMemo(() => mockDashboardUsers.find((candidate) => candidate.role === role) ?? initialUser, [initialUser, role]);
  const activeAssignments = assignments.filter((candidate) => candidate.active !== false);
  const availableAssignments = role === "ASSISTANT" ? activeAssignments.filter((candidate) => candidate.assistantId === user.id) : activeAssignments;
  const assignment = role === "ASSISTANT" ? availableAssignments.find((candidate) => candidate.id === assignmentId) ?? availableAssignments[0] : undefined;
  const permissions = assignment ? assignment.permissions : ROLE_PERMISSIONS[role];
  function setRoleAndPersist(nextRole: DashboardRole) {
    setRole(nextRole);
    const nextAssignmentId = nextRole === "ASSISTANT" ? assignmentId : undefined;
    void persistMockSession(nextRole, nextAssignmentId);
  }

  function setAssignmentAndPersist(nextAssignmentId: string) {
    const nextAssignment = availableAssignments.find((candidate) => candidate.id === nextAssignmentId);
    if (!nextAssignment) return;
    setAssignmentIdState(nextAssignment.id);
    if (role === "ASSISTANT") void persistMockSession(role, nextAssignment.id);
  }

  function upsertAssignment(next: AssistantAssignment) { setAssignments((items) => items.some((item) => item.id === next.id) ? items.map((item) => item.id === next.id ? next : item) : [...items, next]); }
  function suspendAssignment(id: string) { setAssignments((items) => items.map((item) => item.id === id ? { ...item, active: false } : item)); }
  const value = { user, role, setRole: setRoleAndPersist, assignment, setAssignmentId: setAssignmentAndPersist, assignments, upsertAssignment, suspendAssignment, permissions, sidebarCollapsed, setSidebarCollapsed };
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useDashboardWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useDashboardWorkspace must be used within DashboardWorkspaceProvider");
  return context;
}
