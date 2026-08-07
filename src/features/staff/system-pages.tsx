"use client";

import { useState } from "react";
import { AccessDeniedState } from "@/components/shared/access-denied-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useContent } from "@/features/content/content-context";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { useFinance } from "@/features/finance/finance-context";
import { useOperations } from "@/features/operations/operations-context";
import { useStaff } from "@/features/staff/staff-context";
import { canAccess } from "@/lib/access-control";

function Metric({ label, value, helper }: { label: string; value: string | number; helper?: string }) {
  return <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p>{helper ? <p className="mt-1 text-xs text-muted-foreground">{helper}</p> : null}</CardContent></Card>;
}

function ReportList({ title, items }: { title: string; items: string[] }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="space-y-2">{items.length ? items.map((item, index) => <p key={`${item}-${index}`} className="rounded border p-2 text-sm">{item}</p>) : <p className="text-sm text-muted-foreground">لا توجد بيانات ضمن الفلتر.</p>}</CardContent></Card>;
}

export function ReportsPage() {
  const ops = useOperations();
  const content = useContent();
  const finance = useFinance();
  const staff = useStaff();
  const { role, permissions } = useDashboardWorkspace();
  const [scope, setScope] = useState<"operational" | "financial">("operational");
  const [teacherId, setTeacherId] = useState("ALL");
  if (!canAccess(role, "reports.view", permissions)) return <AccessDeniedState />;

  const scoped = (teacher: string) => teacherId === "ALL" || teacher === teacherId;
  const enrollmentRows = ops.enrollments.filter((item) => ops.canSeeTeacher(item.teacherId, item.groupId) && scoped(item.teacherId));
  const groupRows = ops.groups.filter((item) => ops.canSeeTeacher(item.teacherId, item.id) && scoped(item.teacherId));
  const payments = finance.payments.filter((item) => finance.canSeePayment(item) && scoped(item.teacherId));
  const entitlements = finance.entitlements.filter((item) => finance.canSeeEntitlement(item) && scoped(item.teacherId));
  const financial = canAccess(role, "reports.financial", permissions);
  const approved = payments.filter((item) => item.status === "APPROVED");
  const packages = new Map<string, number>();
  approved.forEach((item) => packages.set(item.packageId, (packages.get(item.packageId) ?? 0) + 1));
  const serverSummary = teacherId === "ALL" ? finance.financialSummary : undefined;
  const approvedAmount = serverSummary?.approvedAmount ?? approved.reduce((sum, item) => sum + item.amount, 0);
  const pendingCount = serverSummary?.byStatus.PENDING_REVIEW ?? payments.filter((item) => item.status === "PENDING_REVIEW").length;
  const rejectedCount = serverSummary?.byStatus.REJECTED ?? payments.filter((item) => item.status === "REJECTED").length;

  return <><PageHeader title="التقارير" description="ملخصات تشغيلية من البيانات الحالية، والملخص المالي العام صادر مباشرة من الخادم." /><main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8"><div className="flex flex-wrap gap-2"><Button variant={scope === "operational" ? "default" : "outline"} onClick={() => setScope("operational")}>تشغيلية</Button>{financial ? <Button variant={scope === "financial" ? "default" : "outline"} onClick={() => setScope("financial")}>مالية</Button> : null}<select value={teacherId} onChange={(event) => setTeacherId(event.target.value)} className="h-10 rounded-lg border bg-card px-3"><option value="ALL">كل النطاق المتاح</option>{staff.teachers.filter((teacher) => staff.canSeeTeacher(teacher.id)).map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name}</option>)}</select></div>{scope === "operational" ? <><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Metric label="الطلاب والالتحاقات" value={enrollmentRows.length} helper="التحاق سنتر فقط" /><Metric label="المجموعات" value={groupRows.length} helper={`${groupRows.reduce((sum, item) => sum + item.capacity.enrolled, 0)} مقعد مشغول`} /><Metric label="الحضور" value={ops.attendance.filter((item) => ops.sessions.some((session) => session.id === item.sessionId && scoped(session.teacherId))).length} helper="سجلات جلسات" /><Metric label="درجات الجلسات" value={ops.attendance.filter((item) => item.score !== undefined).length} helper="من الحضور فقط" /></div><div className="grid gap-3 lg:grid-cols-2"><ReportList title="المحتوى والنشر" items={content.courses.filter((item) => content.canSeeCourse(item.id) && scoped(item.teacherId)).map((item) => `${item.title} · ${item.state}`)} /><ReportList title="المساعدون" items={staff.assistants.map((assistant) => `${assistant.name} · ${assistant.status}`)} /><ReportList title="الرسائل لأولياء الأمور" items={ops.messages.map((item) => `${item.state} · ${item.id}`).slice(0, 6)} /><ReportList title="سعات المجموعات" items={groupRows.map((item) => `${item.name}: ${item.capacity.enrolled}/${item.capacity.limit}`)} /></div></> : <><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Metric label="مدفوعات معتمدة" value={`${approvedAmount} ج.م`} /><Metric label="قيد المراجعة" value={pendingCount} /><Metric label="مرفوضة" value={rejectedCount} /><Metric label="صلاحيات إلكترونية" value={entitlements.length} helper="منفصلة عن التحاق السنتر" /></div><div className="grid gap-3 lg:grid-cols-2"><ReportList title="طرق الدفع" items={Object.entries(payments.reduce<Record<string, number>>((result, item) => ({ ...result, [item.method]: (result[item.method] ?? 0) + item.amount }), {})).map(([method, total]) => `${method}: ${total} ج.م`)} /><ReportList title="مبيعات الباقات المعتمدة" items={[...packages.entries()].map(([id, count]) => `${content.packages.find((item) => item.id === id)?.title ?? id}: ${count}`)} /><ReportList title="استخدام الكوبونات والأكواد" items={[`كوبونات مستردة: ${finance.coupons.filter((item) => item.status === "REDEEMED").length}`, `أكواد مجانية مستردة: ${finance.accessCodes.filter((item) => item.status === "REDEEMED").length}`]} /></div></>}</main></>;
}

export function AuditLogPage() {
  const { role, permissions } = useDashboardWorkspace();
  if (!canAccess(role, "audit.view", permissions)) return <AccessDeniedState />;
  return <><PageHeader title="سجل العمليات" description="الخادم لا يوفر endpoint لقراءة سجل التدقيق؛ الصفحة للعرض الآمن حتى يتوفر العقد." /><main className="px-4 py-6 sm:px-6 lg:px-8"><Card><CardContent className="p-6 text-sm text-muted-foreground">لا يمكن عرض سجل حقيقي دون عقد قراءة من الخادم، ولن تُعرض سجلات محلية بديلة.</CardContent></Card></main></>;
}

export function SettingsPage() {
  const staff = useStaff();
  const finance = useFinance();
  const { role, permissions } = useDashboardWorkspace();
  const canCenter = canAccess(role, "settings.center", permissions) || canAccess(role, "settings.system", permissions);
  if (!canCenter) return <AccessDeniedState />;
  const settings = staff.settings;
  return <><PageHeader title="الإعدادات" description="الخادم لا يوفر endpoint لإعدادات النظام؛ القيم الحالية للعرض فقط ولا تُحفظ." /><main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8"><fieldset disabled><Card><CardHeader><CardTitle>الهوية والتواصل</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2"><Input value={settings.brandName} readOnly /><Input value={settings.shortName} readOnly /><Input value={settings.centerName} readOnly /><Input value={settings.websiteUrl} readOnly /><Input value={settings.supportEmail} readOnly /><Input value={settings.supportPhone} readOnly /><Input value={settings.whatsapp} readOnly /><Input value={settings.currentTerm} readOnly /></CardContent></Card></fieldset><Card><CardHeader><CardTitle>وجهات الدفع المركزية</CardTitle></CardHeader><CardContent className="space-y-2">{finance.destinations.map((item) => <p key={item.id} className="rounded border p-2 text-sm">{item.provider} · {item.address} · {item.active ? "نشط" : "متوقف"}</p>)}</CardContent></Card><Button disabled>الحفظ غير متاح من الخادم</Button></main></>;
}
