"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, logout } from "@/features/auth/auth-service";
import { toApiError } from "@/lib/api/errors";

const schema = z.object({ identifier: z.string().min(1, "اكتب البريد الإلكتروني أو رقم الهاتف"), password: z.string().min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف") });
type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter(); const [showPassword, setShowPassword] = useState(false); const [error, setError] = useState<string>(); const [pending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { identifier: "", password: "" } });
  const submit = (values: Values) => { setError(undefined); startTransition(() => { void login(values.identifier, values.password).then(async (session) => { if (session.role === "STUDENT") { await logout(); setError("هذه اللوحة مخصصة لحسابات فريق العمل فقط."); return; } router.replace("/dashboard"); router.refresh(); }).catch((reason) => setError(toApiError(reason).message)); }); };
  return <form className="min-w-0 space-y-5" onSubmit={handleSubmit(submit)} noValidate>
    <div className="space-y-2"><Label htmlFor="identifier">البريد الإلكتروني أو رقم الهاتف</Label><Input id="identifier" autoComplete="username" aria-invalid={Boolean(errors.identifier)} {...register("identifier")} />{errors.identifier ? <p className="text-sm text-destructive">{errors.identifier.message}</p> : null}</div>
    <div className="space-y-2"><Label htmlFor="password">كلمة المرور</Label><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" className="pe-11" aria-invalid={Boolean(errors.password)} {...register("password")} /><button type="button" className="absolute end-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div>{errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}</div>
    {error ? <p className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{error}</p> : null}
    <Button type="submit" className="w-full" disabled={pending}>{pending ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <LockKeyhole data-icon="inline-start" />}الدخول للوحة الإدارة</Button>
  </form>;
}
