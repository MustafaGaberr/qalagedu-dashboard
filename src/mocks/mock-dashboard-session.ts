import { DASHBOARD_ROLES, type AssistantAssignment, type DashboardRole } from "@/types/auth";

export const MOCK_ROLE_COOKIE = "qalagedu_mock_role";
export const MOCK_ASSIGNMENT_COOKIE = "qalagedu_mock_assignment";

export interface MockSessionInput {
  role?: string | null;
  assignmentId?: string | null;
}

export interface ValidMockSession {
  role: DashboardRole;
  assignmentId?: string;
}

export function isDashboardRole(value: string | null | undefined): value is DashboardRole {
  return Boolean(value && (DASHBOARD_ROLES as readonly string[]).includes(value));
}

export function validateMockSession(
  input: MockSessionInput,
  assignments: readonly AssistantAssignment[],
): ValidMockSession | null {
  if (!isDashboardRole(input.role)) return null;
  if (input.role !== "ASSISTANT") return { role: input.role };
  const assignment = assignments.find(
    (candidate) => candidate.id === input.assignmentId && candidate.assistantId === "usr_assistant",
  );
  return assignment ? { role: input.role, assignmentId: assignment.id } : null;
}
