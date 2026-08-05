"use client";

import { Activity, ArrowUpLeft, ClipboardCheck, GraduationCap, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { QuickActionCard } from "@/components/shared/quick-action-card";
import { RecentActivityList } from "@/components/shared/recent-activity-list";
import { StatCard } from "@/components/shared/stat-card";
import { WorkspaceContextSummary } from "@/components/shared/workspace-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { academicTerm, courseSummaries, dashboardMockData } from "@/mocks/dashboard-data";

const icons = [GraduationCap, ClipboardCheck, Activity, ArrowUpLeft] as const;
export function DashboardHome() {
  const { role, user, assignment, permissions } = useDashboardWorkspace();
  const data = dashboardMockData[role];
  const assistantAttendanceOnly = role === "ASSISTANT" && !permissions.includes("students.view");
  const metrics = assistantAttendanceOnly ? [data.metrics[0], data.metrics[2]] : data.metrics;
  const actions = role === "ASSISTANT" ? data.actions.filter((action) => !action.permission || permissions.includes(action.permission)) : data.actions;
  const primary = role === "SUPER_ADMIN" ? "إدارة التعيينات" : role === "TEACHER_ADMIN" ? "فتح حضور اليوم" : "بدء تسجيل الحضور";
  return <><PageHeader title={`مرحبًا، ${user.firstName}`} eyebrow={academicTerm} description={role === "ASSISTANT" && assignment ? `تعمل الآن ضمن نطاق ${assignment.teacherName} — ${assignment.subject}.` : "ملخص تشغيلي هادئ يساعدك على ترتيب أولويات اليوم."} actions={<Button size="sm">{primary}</Button>} /><div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8"><section className="rounded-lg border bg-card p-4"><WorkspaceContextSummary /></section><section aria-label="المؤشرات التشغيلية" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{metrics.map((metric, index) => <StatCard key={metric.label} {...metric} icon={icons[index]} />)}</section><section className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]"><div><h2 className="mb-3 text-base font-bold">إجراءات اليوم</h2><div className="grid gap-4 md:grid-cols-2">{actions.map((action) => <QuickActionCard key={action.label} {...action} />)}</div></div><RecentActivityList title="عناصر تحتاج متابعة" items={data.attention} /></section>{role === "TEACHER_ADMIN" ? <TeacherScopeSummary /> : null}<RecentActivityList title="آخر العمليات" items={data.activity} /></div></>;
}

function TeacherScopeSummary() { return <section className="grid gap-4 lg:grid-cols-2"><Card className="rounded-lg shadow-none"><CardHeader><CardTitle className="text-base">الكورسات الحالية</CardTitle></CardHeader><CardContent className="space-y-2">{courseSummaries.map((course) => <div key={course} className="rounded-md border px-3 py-2 text-sm">{course}</div>)}</CardContent></Card><Card className="rounded-lg shadow-none"><CardHeader><CardTitle className="text-base">المساعدون</CardTitle></CardHeader><CardContent className="flex items-start gap-3 text-sm text-muted-foreground"><UsersRound className="size-5 text-primary" aria-hidden="true" /><p>سارة أحمد — متابعة الحضور والطلبات ضمن مجموعاتك. إعدادات التعيين ستُربط لاحقًا بسير عمل مخصص.</p></CardContent></Card></section>; }
