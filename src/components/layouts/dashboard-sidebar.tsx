"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { RoleBadge } from "@/components/shared/role-badge";
import { dashboardNavigationSections } from "@/config/dashboard-navigation";
import { brandConfig } from "@/config/brand";
import { canAccessAny } from "@/lib/access-control";
import { cn } from "@/lib/cn";
import type { DashboardUser } from "@/types/auth";
import type { DashboardNavigationSection } from "@/types/navigation";

interface DashboardSidebarProps {
  user: DashboardUser;
  sections?: readonly DashboardNavigationSection[];
  compact?: boolean;
  onNavigate?: () => void;
}

function isRouteActive(pathname: string, href: string, match?: readonly string[]) {
  if (pathname === href) {
    return true;
  }

  const candidates = match ?? [href];
  return candidates.some((candidate) => candidate !== "/" && pathname.startsWith(candidate));
}

export function DashboardSidebar({
  user,
  sections = dashboardNavigationSections,
  compact,
  onNavigate,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const visibleSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        canAccessAny(user.role, item.permissions),
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-e bg-card text-card-foreground",
        compact ? "w-full" : "w-72",
      )}
    >
      <div className="flex items-center gap-3 border-b px-4 py-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
          <Image
            src={brandConfig.markSrc}
            alt=""
            width={28}
            height={28}
            priority
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{brandConfig.dashboardName}</p>
          <p className="truncate text-xs text-muted-foreground">
            {user.centerName}
          </p>
        </div>
      </div>

      <nav aria-label="التنقل الرئيسي" className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-5">
          {visibleSections.map((section) => (
            <section key={section.id} className="space-y-2">
              <h2 className="px-2 text-xs font-semibold text-muted-foreground">
                {section.label}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isRouteActive(pathname, item.href, item.match);
                  const Icon = item.icon;
                  const description = item.description?.[user.role];

                  if (item.disabled) {
                    return (
                      <div
                        key={`${section.id}-${item.label}`}
                        className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-muted-foreground opacity-70"
                        aria-disabled="true"
                        title={description ?? "قريبا"}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        <span className="truncate">{item.label}</span>
                        <span className="ms-auto rounded-sm bg-muted px-1.5 py-0.5 text-[0.68rem]">
                          قريب
                        </span>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={`${section.id}-${item.href}-${item.label}`}
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-10 items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium outline-none transition focus-visible:ring-3 focus-visible:ring-ring/40",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      title={description}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </nav>

      <div className="border-t p-3">
        <div className="rounded-lg bg-secondary/70 p-3">
          <p className="text-sm font-bold">{user.fullName}</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <RoleBadge role={user.role} />
            <span className="text-xs text-muted-foreground">Mock</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
