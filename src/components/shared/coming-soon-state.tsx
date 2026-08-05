import { Construction } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
export function ComingSoonState({ title = "تجهيز تمهيدي", description }: { title?: string; description: string }) { return <EmptyState icon={Construction} title={title} description={`${description} هذه مساحة تأسيسية فقط ولا تحتوي على عمليات حقيقية في Phase 7.`} />; }
