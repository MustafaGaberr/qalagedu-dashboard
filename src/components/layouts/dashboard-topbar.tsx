"use client";

import { Bell, ChevronDown, LogOut, PanelRightClose, PanelRightOpen, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/layouts/dashboard-breadcrumbs";
import { DashboardMobileNavigation } from "@/components/layouts/dashboard-mobile-navigation";
import { RoleBadge } from "@/components/shared/role-badge";
import { WorkspaceSelector } from "@/components/shared/workspace-selector";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { roleMetadata } from "@/config/permissions";
import { clearMockSession } from "@/features/auth/actions";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import type { DashboardRole } from "@/types/auth";

export function DashboardTopbar() {
  const router = useRouter();
  const { user, role, setRole, sidebarCollapsed, setSidebarCollapsed } = useDashboardWorkspace();
  return <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b bg-background/95 px-4 py-2 backdrop-blur sm:px-6 lg:px-8"><div className="flex min-w-0 items-center gap-3"><DashboardMobileNavigation /><div className="min-w-0"><DashboardBreadcrumbs /><div className="mt-1 hidden sm:block"><WorkspaceSelector /></div></div></div><div className="flex shrink-0 items-center gap-1 sm:gap-2"><Button variant="ghost" size="icon-sm" className="hidden lg:inline-flex" aria-label={sidebarCollapsed ? "توسيع الشريط الجانبي" : "طي الشريط الجانبي"} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed ? <PanelRightOpen className="size-4" /> : <PanelRightClose className="size-4" />}</Button><div className="hidden items-center gap-1 rounded-md border bg-card p-1 text-[0.68rem] text-muted-foreground xl:flex" aria-label="تبديل الدور التجريبي"><span className="px-1">تطوير</span>{(Object.keys(roleMetadata) as DashboardRole[]).map((item) => <button key={item} type="button" className={item === role ? "h-6 rounded-md bg-primary px-2 text-xs font-semibold text-primary-foreground" : "h-6 rounded-md px-2 text-xs font-semibold text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"} aria-pressed={item === role} onClick={() => setRole(item)}>{roleMetadata[item].label}</button>)}</div><Button variant="ghost" size="icon-sm" aria-label="الإشعارات"><Bell className="size-4" aria-hidden="true" /></Button><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" className="h-10 gap-2 px-2" aria-label="قائمة الحساب" />}><Avatar size="sm"><AvatarFallback>{user.avatarInitials}</AvatarFallback></Avatar><span className="hidden max-w-32 truncate text-sm font-semibold sm:inline">{user.firstName}</span><ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" /></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-64"><div className="px-1.5 py-2"><span className="block text-sm font-semibold text-foreground">{user.fullName}</span><span className="mt-1 block truncate text-xs text-muted-foreground">{user.email}</span><RoleBadge role={role} className="mt-2" /></div><DropdownMenuSeparator /><DropdownMenuItem><UserCircle className="size-4" aria-hidden="true" />الملف الشخصي</DropdownMenuItem><DropdownMenuItem variant="destructive" onClick={async () => { if (!window.confirm("هل تريد تسجيل الخروج من المعاينة التجريبية؟")) return; await clearMockSession(); router.push("/login"); }}><LogOut className="size-4" aria-hidden="true" />خروج تجريبي</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></header>;
}
