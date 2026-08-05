import type { Metadata } from "next";
import { Bell, CheckCircle2, QrCode } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { QuickActionCard } from "@/components/shared/quick-action-card";
import { RoleBadge } from "@/components/shared/role-badge";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "معاينة واجهة التطوير",
};

export default function DevUiPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="معاينة نظام التصميم"
        description="صفحة تطوير داخلية لفحص عناصر الواجهة العربية RTL والتوكنز الدلالية."
        eyebrow="Development"
      />
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="مؤشر نجاح"
            value="86%"
            helper="لون دلالي مع نص وأيقونة"
            status="success"
            icon={CheckCircle2}
          />
          <StatCard
            label="مؤشر تنبيه"
            value="12"
            helper="قابل للمراجعة"
            status="warning"
            icon={Bell}
          />
          <StatCard
            label="ماسح QR"
            value="جاهز"
            helper="حالة واجهة فقط"
            status="info"
            icon={QrCode}
          />
          <Card className="rounded-lg shadow-none">
            <CardHeader>
              <CardTitle>الشارات</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <RoleBadge role="SUPER_ADMIN" />
              <RoleBadge role="TEACHER_ADMIN" />
              <RoleBadge role="ASSISTANT" />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-lg shadow-none">
            <CardHeader>
              <CardTitle>نماذج وأزرار</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dev-search">بحث سريع</Label>
                <Input id="dev-search" placeholder="ابحث باسم الطالب" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button>إجراء أساسي</Button>
                <Button variant="secondary">إجراء ثانوي</Button>
                <Button variant="outline">حد خارجي</Button>
                <Button variant="destructive">تنبيه</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-none">
            <CardHeader>
              <CardTitle>حالات دلالية</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <StatusBadge tone="success">مستقر</StatusBadge>
              <StatusBadge tone="warning">يحتاج متابعة</StatusBadge>
              <StatusBadge tone="info">معلومة</StatusBadge>
              <StatusBadge tone="neutral">محايد</StatusBadge>
              <StatusBadge tone="danger">خطر</StatusBadge>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <QuickActionCard
            label="فتح الماسح"
            description="معاينة بطاقة إجراء سريعة بدون تشغيل كاميرا."
            href="/scanner"
          />
          <QuickActionCard
            label="التواصل"
            description="زر محجوز للتكامل المستقبلي فقط."
            href="/guardians"
            disabled
          />
          <QuickActionCard
            label="الطلاب"
            description="انتقال إلى صفحة الطلاب التمهيدية."
            href="/students"
          />
        </section>
      </div>
    </main>
  );
}
