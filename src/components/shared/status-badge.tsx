import { AlertTriangle, CheckCircle2, Info, MinusCircle } from "lucide-react";

import { cn } from "@/lib/cn";

type StatusTone = "success" | "warning" | "info" | "neutral" | "danger";

const statusStyles = {
  success: "border-success/25 bg-success/10 text-success",
  warning: "border-warning/35 bg-warning/15 text-warning-foreground",
  info: "border-info/25 bg-info/10 text-info",
  neutral: "border-border bg-muted text-muted-foreground",
  danger: "border-destructive/25 bg-destructive/10 text-destructive",
} as const satisfies Record<StatusTone, string>;

const statusIcons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  neutral: MinusCircle,
  danger: AlertTriangle,
} as const;

interface StatusBadgeProps {
  children: React.ReactNode;
  tone?: StatusTone;
  className?: string;
}

export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: StatusBadgeProps) {
  const Icon = statusIcons[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold",
        statusStyles[tone],
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}
