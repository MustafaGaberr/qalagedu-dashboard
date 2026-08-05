import { ProtectedPlaceholderPage } from "@/features/access-control/components/protected-placeholder-page";
import { dashboardModulePages } from "@/features/access-control/module-pages";
export default function PaymentsPage() { return <ProtectedPlaceholderPage module={dashboardModulePages.payments} />; }
