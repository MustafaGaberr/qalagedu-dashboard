import { apiRequest } from "@/lib/api/client";
import type { BackendAssignment, BackendSession } from "./auth-types";

export const login = (loginIdentifier: string, password: string) => apiRequest<BackendSession>("auth/login", { method: "POST", body: { loginIdentifier, password } });
export const logout = () => apiRequest<void>("auth/logout", { method: "POST" });
export const getClientSession = () => apiRequest<BackendSession>("auth/me");
export const getAssistantAssignments = () => apiRequest<BackendAssignment[]>("auth/assistant/assignments");
export const switchAssistantWorkspace = (assignmentId: string) => apiRequest<BackendSession>("auth/assistant/workspace", { method: "PUT", body: { assignmentId } });
