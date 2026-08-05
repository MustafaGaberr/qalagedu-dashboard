"use client";

import { AccessDeniedState } from "@/components/shared/access-denied-state";
import { ComingSoonState } from "@/components/shared/coming-soon-state";
import { PageHeader } from "@/components/shared/page-header";
import { canAccessAny } from "@/lib/access-control";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import type { DashboardModulePage } from "@/features/access-control/module-pages";
export function RoleAwarePlaceholderPage({ module }: { module: DashboardModulePage }) { const { role, permissions, assignment } = useDashboardWorkspace(); if (!canAccessAny(role, module.permissions, permissions)) return <AccessDeniedState />; return <><PageHeader title={module.title} description={module.description} eyebrow={assignment ? `${assignment.teacherName} · ${assignment.subject}` : "مرحلة التأسيس"} /><div className="px-4 py-6 sm:px-6 lg:px-8"><ComingSoonState description={module.description} /></div></>; }
