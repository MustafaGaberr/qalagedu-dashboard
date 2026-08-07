"use client";

import { Bell, ChevronDown, LogOut, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/layouts/dashboard-breadcrumbs";
import { DashboardMobileNavigation } from "@/components/layouts/dashboard-mobile-navigation";
import { RoleBadge } from "@/components/shared/role-badge";
import { WorkspaceSelector } from "@/components/shared/workspace-selector";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/auth-service";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { toApiError } from "@/lib/api/errors";

export function DashboardTopbar() {
  const router = useRouter();
  const { user, role, sidebarCollapsed, setSidebarCollapsed, workspaceError } = useDashboardWorkspace();
  const signOut = () => {
    if (!window.confirm("هل تريد تسجيل الخروج؟")) return;
    void logout().then(() => {
      router.replace("/login");
      router.refresh();
    }).catch((error) => window.alert(toApiError(error).message));
  };

  return <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b bg-background/95 px-4 py-2 backdrop-blur sm:px-6 lg:px-8"><div className="flex min-w-0 items-center gap-3"><DashboardMobileNavigation /><div className="min-w-0"><DashboardBreadcrumbs /><div className="mt-1 hidden sm:block"><WorkspaceSelector />{workspaceError ? <p className="text-xs text-destructive">{workspaceError}</p> : null}</div></div></div><div className="flex shrink-0 items-center gap-1 sm:gap-2"><Button variant="ghost" size="icon-sm" className="hidden lg:inline-flex" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed ? <PanelRightOpen /> : <PanelRightClose />}</Button><Button variant="ghost" size="icon-sm" aria-label="الإشعارات"><Bell /></Button><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" className="h-10 gap-2 px-2" />}><Avatar size="sm"><AvatarFallback>{user.avatarInitials}</AvatarFallback></Avatar><span className="hidden max-w-32 truncate text-sm font-semibold sm:inline">{user.firstName}</span><ChevronDown /></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-64"><div className="px-1.5 py-2"><strong>{user.fullName}</strong><span className="mt-1 block truncate text-xs text-muted-foreground">{user.email}</span><RoleBadge role={role} className="mt-2" /></div><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onClick={signOut}><LogOut />تسجيل الخروج</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></header>;
}
