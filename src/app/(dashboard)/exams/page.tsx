import { dashboardModulePages } from "@/features/access-control/module-pages";
import { ProtectedPlaceholderPage } from "@/features/access-control/components/protected-placeholder-page";

export default function ExamsPage() {
  return <ProtectedPlaceholderPage module={dashboardModulePages.exams} />;
}
