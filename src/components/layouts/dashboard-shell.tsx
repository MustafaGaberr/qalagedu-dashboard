import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layouts/dashboard-topbar";
import type { DashboardUser } from "@/types/auth";

interface DashboardShellProps {
  user: DashboardUser;
  children: React.ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-y-0 right-0 z-40 hidden lg:block">
        <DashboardSidebar user={user} />
      </div>
      <div className="min-h-screen lg:mr-72">
        <DashboardTopbar user={user} />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
