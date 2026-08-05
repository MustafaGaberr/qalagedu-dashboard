import { Inbox, Search } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export function FilterBarShell({ children }: { children: React.ReactNode }) { return <div className="flex flex-col gap-3 rounded-lg border bg-card p-3 sm:flex-row sm:items-center">{children}</div>; }
export function SearchFieldShell({ label = "بحث" }: { label?: string }) { return <label className="relative block min-w-0 flex-1"><span className="sr-only">{label}</span><Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><Input className="ps-9" placeholder={label} /></label>; }
export function TableShell({ caption, children }: { caption: string; children: React.ReactNode }) { return <div className="overflow-x-auto rounded-lg border bg-card"><table className="w-full min-w-[36rem] text-right text-sm"><caption className="sr-only">{caption}</caption>{children}</table></div>; }
export function MobileListCardShell({ title, details }: { title: string; details: React.ReactNode }) { return <article className="rounded-lg border bg-card p-4 sm:hidden"><h3 className="font-semibold">{title}</h3><div className="mt-2 text-sm text-muted-foreground">{details}</div></article>; }
export function PageLoadingSkeleton() { return <div className="space-y-4 px-4 py-6 sm:px-6 lg:px-8" role="status" aria-label="جارٍ تحميل الصفحة"><Skeleton className="h-20 w-full rounded-lg" /><Skeleton className="h-36 w-full rounded-lg" /><span className="sr-only">جارٍ التحميل</span></div>; }
export function EmptyTableState({ title, description }: { title: string; description: string }) { return <EmptyState icon={Inbox} title={title} description={description} />; }
