"use client";

import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layouts/dashboard-topbar";
import { DashboardWorkspaceProvider, useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { OperationsProvider } from "@/features/operations/operations-context";
import { ContentProvider } from "@/features/content/content-context";
import { FinanceProvider } from "@/features/finance/finance-context";
import { StaffProvider } from "@/features/staff/staff-context";
import type { DashboardUser } from "@/types/auth";
import { cn } from "@/lib/cn";

export function DashboardShell({ user, initialAssignmentId, children }: { user: DashboardUser; initialAssignmentId?: string; children: React.ReactNode }) {
  return <DashboardWorkspaceProvider initialUser={user} initialAssignmentId={initialAssignmentId}><DashboardShellContents>{children}</DashboardShellContents></DashboardWorkspaceProvider>;
}

function DashboardShellContents({ children }: { children: React.ReactNode }) {
  return <OperationsProvider><ContentProvider><FinanceProvider><StaffProvider><DashboardShellFrame>{children}</DashboardShellFrame></StaffProvider></FinanceProvider></ContentProvider></OperationsProvider>;
}

function DashboardShellFrame({ children }: { children: React.ReactNode }) {
  const { user, permissions, sidebarCollapsed } = useDashboardWorkspace();
  return <div className="min-h-screen bg-background"><div className="fixed inset-y-0 right-0 z-40 hidden lg:block"><DashboardSidebar user={user} permissions={permissions} collapsed={sidebarCollapsed} /></div><div className={cn("min-h-screen transition-[margin] duration-150", sidebarCollapsed ? "lg:mr-20" : "lg:mr-72")}><DashboardTopbar /><main className="min-w-0">{children}</main><footer className="border-t px-4 py-3 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">QalagEdu Dashboard · واجهة تشغيلية تجريبية</footer></div></div>;
}
