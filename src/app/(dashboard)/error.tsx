"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/errors";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { if (error instanceof ApiError && error.status === 401) window.location.assign("/login?reason=session"); }, [error]);
  const message = error instanceof ApiError ? error.message : error.message === "QALAGEDU_API_URL_MISSING" ? "رابط واجهة الخادم غير مضبوط." : "تعذر تحميل بيانات اللوحة من الخادم.";
  return <main className="grid min-h-[60vh] place-items-center p-6"><div className="max-w-md rounded-lg border bg-card p-6 text-center"><h1 className="text-xl font-bold">تعذر تحميل الصفحة</h1><p className="mt-2 text-sm text-muted-foreground">{message}</p><Button className="mt-4" onClick={reset}>إعادة المحاولة</Button></div></main>;
}
