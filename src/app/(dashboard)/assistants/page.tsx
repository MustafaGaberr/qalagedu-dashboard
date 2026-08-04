import { dashboardModulePages } from "@/features/access-control/module-pages";
import { ProtectedPlaceholderPage } from "@/features/access-control/components/protected-placeholder-page";

export default function AssistantsPage() {
  return <ProtectedPlaceholderPage module={dashboardModulePages.assistants} />;
}
