import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";

interface QuickActionCardProps { label: string; description: string; href: string; disabled?: boolean; className?: string; }
export function QuickActionCard({ label, description, href, disabled, className }: QuickActionCardProps) {
  return <Card className={cn("rounded-lg shadow-none", className)}><CardContent className="flex h-full flex-col gap-4 p-4"><div className="space-y-1"><h3 className="text-base font-bold">{label}</h3><p className="text-sm leading-6 text-muted-foreground">{description}</p></div>{disabled ? <span className="mt-auto inline-flex h-8 w-fit items-center rounded-lg bg-secondary px-3 text-xs font-medium text-secondary-foreground">قريبًا</span> : <Link href={href} className="mt-auto inline-flex h-8 w-fit items-center justify-center gap-1 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring">فتح<ArrowUpLeft className="size-4" aria-hidden="true" /></Link>}</CardContent></Card>;
}
