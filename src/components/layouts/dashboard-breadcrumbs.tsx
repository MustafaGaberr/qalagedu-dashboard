"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { allNavigationItems } from "@/config/dashboard-navigation";

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const current =
    allNavigationItems.find((item) => pathname === item.href) ??
    allNavigationItems.find((item) => pathname.startsWith(item.href));

  return (
    <nav aria-label="مسار الصفحة" className="flex items-center gap-1 text-xs">
      <Link
        href="/dashboard"
        className="text-muted-foreground transition hover:text-foreground"
      >
        الرئيسية
      </Link>
      {current && current.href !== "/dashboard" ? (
        <>
          <ChevronLeft className="size-3.5 text-muted-foreground" aria-hidden="true" />
          <span className="font-medium text-foreground">{current.label}</span>
        </>
      ) : null}
    </nav>
  );
}
