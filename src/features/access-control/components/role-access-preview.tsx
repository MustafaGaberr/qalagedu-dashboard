"use client";

import { useMemo, useState } from "react";

import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar";
import { AccessDeniedState } from "@/components/shared/access-denied-state";
import { PageHeader } from "@/components/shared/page-header";
import { RoleBadge } from "@/components/shared/role-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ALL_PERMISSIONS, roleLabels } from "@/config/permissions";
import { canAccess } from "@/lib/access-control";
import {
  mockDashboardUsers,
  type DashboardSessionRepository,
} from "@/mocks/repositories/mock-dashboard-session-repository";
import type { DashboardRole } from "@/types/auth";

const roles = ["SUPER_ADMIN", "ADMIN", "TEACHER", "ASSISTANT"] as const;

interface RoleAccessPreviewProps {
  users: Awaited<ReturnType<DashboardSessionRepository["getUsers"]>>;
}

export function RoleAccessPreview({ users }: RoleAccessPreviewProps) {
  const [selectedRole, setSelectedRole] =
    useState<DashboardRole>("SUPER_ADMIN");
  const user = useMemo(
    () =>
      users.find((candidate) => candidate.role === selectedRole) ??
      mockDashboardUsers[0],
    [selectedRole, users],
  );
  const deniedExample = selectedRole === "SUPER_ADMIN" ? "لا يوجد" : "ظاهر";

  return (
    <>
      <PageHeader
        title="معاينة الصلاحيات"
        description="أداة تطوير فقط لتجربة التنقل والصلاحيات حسب كل دور. الحالة في ذاكرة المتصفح وتعود للوضع الافتراضي بعد التحديث."
        eyebrow="Development"
      />
      <div className="grid gap-6 px-4 py-6 lg:grid-cols-[20rem_1fr] lg:px-8">
        <section className="space-y-4">
          <Card className="rounded-lg shadow-none">
            <CardHeader>
              <CardTitle>اختيار الدور</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {roles.map((role) => (
                <Button
                  key={role}
                  type="button"
                  variant={role === selectedRole ? "default" : "secondary"}
                  onClick={() => setSelectedRole(role)}
                >
                  {roleLabels[role]}
                </Button>
              ))}
            </CardContent>
          </Card>
          <div className="h-[42rem] overflow-hidden rounded-lg border bg-card">
            <DashboardSidebar user={user} compact />
          </div>
        </section>

        <section className="space-y-4">
          <Card className="rounded-lg shadow-none">
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-bold">{user.fullName}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <RoleBadge role={user.role} />
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-none">
            <CardHeader>
              <CardTitle>توفر الصلاحيات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {ALL_PERMISSIONS.map((permission) => {
                  const allowed = canAccess(selectedRole, permission);
                  return (
                    <div
                      key={permission}
                      className="flex items-center justify-between gap-2 rounded-md border px-3 py-2"
                    >
                      <code className="text-xs">{permission}</code>
                      <StatusBadge tone={allowed ? "success" : "neutral"}>
                        {allowed ? "متاح" : "محجوب"}
                      </StatusBadge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-none">
            <CardHeader>
              <CardTitle>حالة عدم السماح</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                ظهور المثال لهذا الدور: {deniedExample}
              </p>
              {selectedRole === "SUPER_ADMIN" ? (
                <div className="rounded-md border bg-secondary p-4 text-sm">
                  مدير النظام يمتلك كل الصلاحيات المعرفة اشتقاقيا.
                </div>
              ) : (
                <AccessDeniedState />
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
