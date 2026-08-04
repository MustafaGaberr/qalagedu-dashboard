import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actions?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  actions,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "rounded-lg border bg-card p-6 text-center shadow-sm",
        className,
      )}
    >
      <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-lg font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {actions ? <div className="mt-5 flex justify-center">{actions}</div> : null}
    </section>
  );
}
