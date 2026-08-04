"use client";

import { Menu } from "lucide-react";

import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { DashboardUser } from "@/types/auth";

interface DashboardMobileNavigationProps {
  user: DashboardUser;
}

export function DashboardMobileNavigation({
  user,
}: DashboardMobileNavigationProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="فتح التنقل"
            className="lg:hidden"
          />
        }
      >
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[86vw] max-w-sm p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>تنقل لوحة الإدارة</SheetTitle>
          <SheetDescription>روابط لوحة الإدارة المتاحة للدور الحالي.</SheetDescription>
        </SheetHeader>
        <DashboardSidebar user={user} compact />
      </SheetContent>
    </Sheet>
  );
}
