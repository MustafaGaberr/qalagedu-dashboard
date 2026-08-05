import { ProtectedPlaceholderPage } from "@/features/access-control/components/protected-placeholder-page";
import { dashboardModulePages } from "@/features/access-control/module-pages";
export default function GradesPage() { return <ProtectedPlaceholderPage module={dashboardModulePages.grades} />; }
