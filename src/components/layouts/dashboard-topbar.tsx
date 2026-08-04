"use client";

import { Bell, ChevronDown, LogOut, UserCircle } from "lucide-react";

import { DashboardBreadcrumbs } from "@/components/layouts/dashboard-breadcrumbs";
import { DashboardMobileNavigation } from "@/components/layouts/dashboard-mobile-navigation";
import { RoleBadge } from "@/components/shared/role-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DashboardUser } from "@/types/auth";

interface DashboardTopbarProps {
  user: DashboardUser;
}

export function DashboardTopbar({ user }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <DashboardMobileNavigation user={user} />
        <div className="min-w-0">
          <DashboardBreadcrumbs />
          <p className="mt-1 hidden truncate text-xs text-muted-foreground sm:block">
            {user.centerName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" aria-label="الإشعارات">
          <Bell className="size-4" aria-hidden="true" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="h-10 gap-2 px-2"
                aria-label="قائمة الحساب"
              />
            }
          >
            <Avatar size="sm">
              <AvatarFallback>{user.avatarInitials}</AvatarFallback>
            </Avatar>
            <span className="hidden max-w-32 truncate text-sm font-semibold sm:inline">
              {user.firstName}
            </span>
            <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>
              <span className="block text-sm font-semibold text-foreground">
                {user.fullName}
              </span>
              <span className="mt-1 block truncate text-xs">{user.email}</span>
              <RoleBadge role={user.role} className="mt-2" />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="size-4" aria-hidden="true" />
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOut className="size-4" aria-hidden="true" />
              خروج تجريبي
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
