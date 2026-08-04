import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";

interface QuickActionCardProps {
  label: string;
  description: string;
  href: string;
  disabled?: boolean;
  className?: string;
}

export function QuickActionCard({
  label,
  description,
  href,
  disabled,
  className,
}: QuickActionCardProps) {
  return (
    <Card className={cn("rounded-lg shadow-none", className)}>
      <CardContent className="flex h-full flex-col gap-4 p-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold">{label}</h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <Button
          className="mt-auto w-fit"
          size="sm"
          variant={disabled ? "secondary" : "default"}
          disabled={disabled}
          render={disabled ? undefined : <Link href={href} />}
        >
          {disabled ? "قريبا" : "فتح"}
          {!disabled ? (
            <ArrowUpLeft data-icon="inline-end" className="size-4" />
          ) : null}
        </Button>
      </CardContent>
    </Card>
  );
}
