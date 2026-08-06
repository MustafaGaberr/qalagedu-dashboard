"use client";

import { BriefcaseBusiness } from "lucide-react";
import { roleMetadata } from "@/config/permissions";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";

export function WorkspaceSelector() {
  const { role, user, assignment, assignments, setAssignmentId } = useDashboardWorkspace();
  if (role === "SUPER_ADMIN") return <p className="text-xs text-muted-foreground">نطاق النظام بالكامل</p>;
  if (role === "TEACHER_ADMIN") return <p className="text-xs text-muted-foreground">مساحة عمل المدرس الحالية</p>;
  return (
    <label className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
      <BriefcaseBusiness className="size-4 shrink-0 text-primary" aria-hidden="true" />
      <span className="sr-only">اختيار نطاق المدرس</span>
      <select aria-label="اختيار نطاق المدرس" value={assignment?.id} onInput={(event) => setAssignmentId(event.currentTarget.value)} onChange={(event) => setAssignmentId(event.target.value)} className="min-w-0 max-w-56 rounded-md border bg-card px-2 py-1 text-xs font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {assignments.filter((item) => item.active !== false && item.assistantId === user.id).map((item) => <option key={item.id} value={item.id}>{item.teacherName} — {item.subject}</option>)}
      </select>
    </label>
  );
}

export function WorkspaceContextSummary() {
  const { role, assignment } = useDashboardWorkspace();
  if (role === "ASSISTANT" && assignment) return <p className="text-sm text-muted-foreground">أنت تعمل الآن ضمن نطاق {assignment.teacherName} · {assignment.subject} · {assignment.groups.join("، ")} · {assignment.permissions.length} صلاحية تشغيلية</p>;
  return <p className="text-sm text-muted-foreground">{roleMetadata[role].description}</p>;
}
