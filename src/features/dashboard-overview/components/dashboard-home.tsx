"use client";
import { Activity, ClipboardCheck, GraduationCap, ReceiptText } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { WorkspaceContextSummary } from "@/components/shared/workspace-selector";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { useOperations } from "@/features/operations/operations-context";
import { useContent } from "@/features/content/content-context";
import { useFinance } from "@/features/finance/finance-context";

export function DashboardHome(){const {user,role,assignment}=useDashboardWorkspace();const ops=useOperations();const content=useContent();const finance=useFinance();const metrics=[{label:"الطلاب في النطاق",value:String(ops.students.length),helper:"من بيانات الخادم"},{label:"جلسات الحضور المفتوحة",value:String(ops.sessions.filter(x=>x.status==="OPEN").length),helper:"تحتاج متابعة"},{label:"الكورسات",value:String(content.courses.length),helper:"ضمن النطاق الحالي"},{label:"طلبات الدفع للمراجعة",value:String(finance.payments.filter(x=>x.status==="PENDING_REVIEW").length),helper:"الاعتماد من الخادم فقط"}];const icons=[GraduationCap,ClipboardCheck,Activity,ReceiptText] as const;return <><PageHeader title={`مرحبًا، ${user.firstName}`} description={role==="ASSISTANT"&&assignment?`تعمل الآن ضمن نطاق ${assignment.teacherName} — ${assignment.subject}.`:"ملخص تشغيلي حي من النطاق الذي حلّه الخادم."}/><div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8"><section className="rounded-lg border bg-card p-4"><WorkspaceContextSummary/></section><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{metrics.map((metric,index)=><StatCard key={metric.label}{...metric}icon={icons[index]}/>)}</section></div></>}
