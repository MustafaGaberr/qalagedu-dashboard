"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";

export function DashboardMobileNavigation() {
  const [open, setOpen] = useState(false);
  const { user, permissions } = useDashboardWorkspace();
  return <Sheet open={open} onOpenChange={setOpen}><SheetTrigger render={<Button variant="ghost" size="icon-sm" aria-label="فتح التنقل" className="lg:hidden" />}><Menu className="size-5" aria-hidden="true" /></SheetTrigger><SheetContent side="right" className="w-[86vw] max-w-sm p-0"><SheetHeader className="sr-only"><SheetTitle>تنقل لوحة الإدارة</SheetTitle><SheetDescription>روابط لوحة الإدارة المتاحة للدور الحالي.</SheetDescription></SheetHeader><DashboardSidebar user={user} permissions={permissions} compact onNavigate={() => setOpen(false)} /></SheetContent></Sheet>;
}
