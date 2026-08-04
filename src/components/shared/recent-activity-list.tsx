import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/cn";

interface ActivityItem {
  title: string;
  description: string;
  time: string;
  status: "success" | "warning" | "info" | "neutral";
}

interface RecentActivityListProps {
  title: string;
  items: ActivityItem[];
  className?: string;
}

const labels = {
  success: "تم",
  warning: "تنبيه",
  info: "معلومة",
  neutral: "متابعة",
} as const;

export function RecentActivityList({
  title,
  items,
  className,
}: RecentActivityListProps) {
  return (
    <section className={cn("rounded-lg border bg-card p-4", className)}>
      <h2 className="text-base font-bold">{title}</h2>
      <div className="mt-4 divide-y">
        {items.map((item) => (
          <article key={`${item.title}-${item.time}`} className="py-3 first:pt-0">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <StatusBadge tone={item.status}>{labels[item.status]}</StatusBadge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
