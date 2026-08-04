import { Construction } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

interface ComingSoonStateProps {
  title?: string;
  description: string;
}

export function ComingSoonState({
  title = "تجهيز تمهيدي",
  description,
}: ComingSoonStateProps) {
  return (
    <EmptyState
      icon={Construction}
      title={title}
      description={`${description} هذه مساحة تأسيسية فقط ولا تحتوي على عمليات حقيقية في Phase 1.`}
    />
  );
}
