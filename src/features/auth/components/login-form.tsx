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

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "اكتب البريد الإلكتروني أو رقم الهاتف")
    .min(5, "بيانات الدخول قصيرة جدا"),
  password: z
    .string()
    .min(1, "اكتب كلمة المرور")
    .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  function onSubmit() {
    startTransition(() => {
      router.push("/dashboard");
    });
  }

  return (
    <form
      className="min-w-0 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="identifier">البريد الإلكتروني أو رقم الهاتف</Label>
        <Input
          id="identifier"
          autoComplete="username"
          inputMode="email"
          aria-invalid={Boolean(errors.identifier)}
          placeholder="admin@qalagedu.local"
          {...register("identifier")}
        />
        {errors.identifier ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.identifier.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">كلمة المرور</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
          className="min-w-0 pe-11"
            placeholder="••••••••"
            {...register("password")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            className="absolute end-1 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>
        {errors.password ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex min-w-0 items-center gap-2 text-sm leading-5 text-muted-foreground">
          <Checkbox
            checked={remember}
            onCheckedChange={(checked) => setRemember(checked === true)}
            aria-label="تذكرني بصريا فقط"
          />
          تذكرني على هذا الجهاز
        </label>
        <span className="text-xs text-muted-foreground">تجربة Mock</span>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 data-icon="inline-start" className="size-4 animate-spin" />
        ) : (
          <LockKeyhole data-icon="inline-start" className="size-4" />
        )}
        الدخول للوحة الإدارة
      </Button>
    </form>
  );
}
