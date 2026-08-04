import type { LucideIcon } from "lucide-react";

import type { DashboardRole } from "@/types/auth";
import type { Permission } from "@/types/permissions";

export interface DashboardNavigationItem {
  label: string;
  description?: Partial<Record<DashboardRole, string>>;
  href: string;
  icon: LucideIcon;
  permissions: Permission[];
  disabled?: boolean;
  match?: string[];
}

export interface DashboardNavigationSection {
  id: string;
  label: string;
  items: DashboardNavigationItem[];
}
