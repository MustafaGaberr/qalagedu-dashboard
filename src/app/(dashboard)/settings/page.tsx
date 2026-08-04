import { dashboardModulePages } from "@/features/access-control/module-pages";
import { ProtectedPlaceholderPage } from "@/features/access-control/components/protected-placeholder-page";

export default function SettingsPage() {
  return <ProtectedPlaceholderPage module={dashboardModulePages.settings} />;
}
