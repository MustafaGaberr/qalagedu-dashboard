import type { Metadata } from "next";
import Image from "next/image";

import { LoginForm } from "@/features/auth/components/login-form";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,var(--background),var(--secondary))]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl min-w-0 items-center justify-center gap-8 px-4 py-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <section className="order-2 hidden rounded-lg border bg-card p-8 shadow-sm lg:block">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-lg bg-secondary">
              <Image src={brandConfig.markSrc} alt="" width={34} height={34} />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">
                {brandConfig.name}
              </p>
              <h1 className="text-2xl font-bold">
                {brandConfig.dashboardName}
              </h1>
            </div>
          </div>
          <div className="mt-10 space-y-6">
            <div>
              <h2 className="text-xl font-bold">بوابة خاصة بفريق السنتر</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                هذه الواجهة مخصصة للمديرين، المدرسين، والمساعدين لمعاينة
                أساسيات التشغيل قبل ربط الباك اند.
              </p>
            </div>
            <div className="grid gap-3">
              {["صلاحيات مركزية حسب الدور", "تنقل عربي RTL", "بيانات Mock فقط"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-md border bg-background px-4 py-3 text-sm font-medium"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="order-1 mx-auto w-full min-w-0 max-w-[28rem] overflow-hidden rounded-lg border bg-card p-5 shadow-sm sm:p-6 lg:order-2">
          <div className="mb-6 flex min-w-0 items-center gap-3 lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
              <Image src={brandConfig.markSrc} alt="" width={28} height={28} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-primary">
                {brandConfig.name}
              </p>
              <h1 className="break-words text-base font-bold leading-6">
                {brandConfig.dashboardName}
              </h1>
            </div>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-2xl font-bold">تسجيل الدخول</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              ادخل ببيانات فريق السنتر للانتقال إلى لوحة الإدارة التجريبية.
            </p>
          </div>
          <LoginForm />
          <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
            منصة الطلاب مشروع منفصل؛ هذه الصفحة لا تنشئ جلسة حقيقية.
          </p>
        </section>
      </div>
    </main>
  );
}
