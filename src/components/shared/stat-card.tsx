import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/cn";

interface StatCardProps {
  label: string;
  value: string;
  helper: string;
  status?: "neutral" | "success" | "warning" | "info";
  icon?: LucideIcon;
  className?: string;
}

const statusLabels = {
  neutral: "متابعة",
  success: "مستقر",
  warning: "مراجعة",
  info: "معلومة",
} as const;

export function StatCard({
  label,
  value,
  helper,
  status = "neutral",
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("rounded-lg shadow-none", className)}>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {label}
            </p>
            <p className="text-2xl font-bold tabular-nums text-foreground">
              {value}
            </p>
          </div>
          {Icon ? (
            <span className="rounded-md bg-primary/10 p-2 text-primary">
              <Icon className="size-4" aria-hidden="true" />
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs leading-5 text-muted-foreground">{helper}</p>
          <StatusBadge tone={status}>{statusLabels[status]}</StatusBadge>
        </div>
      </CardContent>
    </Card>
  );
}
