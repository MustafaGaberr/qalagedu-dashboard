import { ShieldCheck } from "lucide-react";

import { roleLabels } from "@/config/permissions";
import { cn } from "@/lib/cn";
import type { DashboardRole } from "@/types/auth";

interface RoleBadgeProps {
  role: DashboardRole;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-semibold text-primary",
        className,
      )}
    >
      <ShieldCheck className="size-3.5" aria-hidden="true" />
      {roleLabels[role]}
    </span>
  );
}
