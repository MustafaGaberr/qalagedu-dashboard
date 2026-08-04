import { cn } from "@/lib/cn";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3 border-b bg-background/80 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8",
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        {eyebrow ? (
          <p className="text-xs font-semibold text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="text-2xl font-bold leading-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </header>
  );
}
