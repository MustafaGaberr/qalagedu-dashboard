import "server-only";
import { serverApiRequest } from "@/lib/api/server";
import type { BackendAssignment, BackendSession } from "./auth-types";

export const getServerSession = () => serverApiRequest<BackendSession>("auth/me");
export const getServerAssistantAssignments = () => serverApiRequest<BackendAssignment[]>("auth/assistant/assignments");
