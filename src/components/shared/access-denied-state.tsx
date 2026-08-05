import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

interface AccessDeniedStateProps {
  title?: string;
  description?: string;
}

export function AccessDeniedState({ title = "غير مصرح بالوصول", description = "الدور الحالي لا يملك الصلاحية المطلوبة لعرض هذه المساحة في طبقة المعاينة الأمامية." }: AccessDeniedStateProps) {
  return <EmptyState icon={LockKeyhole} title={title} description={description} actions={<Link href="/dashboard" className="inline-flex h-10 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring">العودة للرئيسية</Link>} />;
}
