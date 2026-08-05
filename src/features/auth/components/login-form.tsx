"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roleMetadata } from "@/config/permissions";
import { persistMockSession } from "@/features/auth/actions";
import { mockAssistantAssignments } from "@/mocks/repositories/mock-dashboard-session-repository";
import type { DashboardRole } from "@/types/auth";

const loginSchema = z.object({
  identifier: z.string().min(1, "اكتب البريد الإلكتروني أو رقم الهاتف").min(5, "بيانات الدخول قصيرة جدًا"),
  password: z.string().min(1, "اكتب كلمة المرور").min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف"),
});
type LoginValues = z.infer<typeof loginSchema>;
const developmentMode = process.env.NODE_ENV !== "production";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [selectedRole, setSelectedRole] = useState<DashboardRole>("SUPER_ADMIN");
  const [assignmentId, setAssignmentId] = useState(mockAssistantAssignments[0].id);
  const [sessionError, setSessionError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { identifier: "", password: "" } });

  function onSubmit() {
    setSessionError(undefined);
    startTransition(() => {
      void persistMockSession(selectedRole, selectedRole === "ASSISTANT" ? assignmentId : undefined).then((result) => {
        if (!result.ok) { setSessionError(result.error); return; }
        router.push(result.redirectTo ?? "/dashboard");
      });
    });
  }

  return <form className="min-w-0 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
    <div className="space-y-2"><Label htmlFor="identifier">البريد الإلكتروني أو رقم الهاتف</Label><Input id="identifier" autoComplete="username" inputMode="email" aria-invalid={Boolean(errors.identifier)} placeholder="admin@qalagedu.local" {...register("identifier")} />{errors.identifier ? <p className="text-sm text-destructive" role="alert">{errors.identifier.message}</p> : null}</div>
    <div className="space-y-2"><Label htmlFor="password">كلمة المرور</Label><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" aria-invalid={Boolean(errors.password)} className="min-w-0 pe-11" placeholder="••••••••" {...register("password")} /><button type="button" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"} className="absolute end-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}</button></div>{errors.password ? <p className="text-sm text-destructive" role="alert">{errors.password.message}</p> : null}</div>
    {developmentMode ? <fieldset className="space-y-3 rounded-md border bg-secondary/40 p-3"><legend className="px-1 text-xs font-semibold text-primary">دخول Mock للتطوير فقط</legend><p className="text-xs leading-5 text-muted-foreground">لا يمثل مصادقة حقيقية، وغير متاح في بيئة الإنتاج.</p><div className="grid gap-2 sm:grid-cols-3">{(Object.keys(roleMetadata) as DashboardRole[]).map((role) => <button key={role} type="button" aria-pressed={selectedRole === role} className={selectedRole === role ? "rounded-md bg-primary px-2 py-2 text-xs font-semibold text-primary-foreground" : "rounded-md border bg-card px-2 py-2 text-xs font-semibold text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"} onClick={() => setSelectedRole(role)}>{roleMetadata[role].label}</button>)}</div>{selectedRole === "ASSISTANT" ? <label className="block space-y-1 text-xs font-medium text-foreground" htmlFor="mock-assignment">التعيين الأولي للمساعد<select id="mock-assignment" value={assignmentId} onChange={(event) => setAssignmentId(event.target.value)} className="mt-1 w-full rounded-md border bg-card px-2 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">{mockAssistantAssignments.map((assignment) => <option key={assignment.id} value={assignment.id}>{assignment.teacherName} — {assignment.subject}</option>)}</select></label> : null}</fieldset> : null}
    {sessionError ? <p className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{sessionError}</p> : null}
    <div className="flex flex-wrap items-center justify-between gap-3"><label className="flex min-w-0 items-center gap-2 text-sm leading-5 text-muted-foreground"><Checkbox checked={remember} onCheckedChange={(checked) => setRemember(checked === true)} aria-label="تذكرني بصريًا فقط" />تذكرني على هذا الجهاز</label><span className="text-xs text-muted-foreground">تجربة Mock</span></div>
    <Button type="submit" className="w-full" disabled={isPending}>{isPending ? <Loader2 data-icon="inline-start" className="size-4 animate-spin" /> : <LockKeyhole data-icon="inline-start" className="size-4" />}الدخول للوحة الإدارة</Button>
  </form>;
}
