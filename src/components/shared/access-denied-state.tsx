import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

interface AccessDeniedStateProps {
  title?: string;
  description?: string;
}

export function AccessDeniedState({
  title = "غير مصرح بالوصول",
  description = "الدور الحالي لا يملك الصلاحية المطلوبة لعرض هذه المساحة في طبقة المعاينة الأمامية.",
}: AccessDeniedStateProps) {
  return (
    <EmptyState
      icon={LockKeyhole}
      title={title}
      description={description}
      actions={
        <Button variant="secondary" render={<Link href="/dashboard" />}>
          العودة للرئيسية
        </Button>
      }
    />
  );
}
