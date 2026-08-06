"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { AccessDeniedState } from "@/components/shared/access-denied-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ConfirmationDialog } from "@/features/operations/confirmation-dialog";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { useOperations } from "@/features/operations/operations-context";
import { canAccess } from "@/lib/access-control";
import type {
  AttendanceState,
  BarcodeStatus,
  CenterEnrollment,
} from "@/types/operations";

const attendanceLabels: Record<AttendanceState, string> = {
  UNMARKED: "غير محدد",
  PRESENT: "حاضر",
  LATE: "متأخر",
  ABSENT: "غائب",
  EXCUSED: "معتذر",
};
const barcodeLabels: Record<BarcodeStatus, string> = {
  NOT_GENERATED: "لم يُنشأ",
  ACTIVE: "نشط",
  REVOKED: "ملغى",
  REISSUED: "أعيد إصداره",
  EXPIRED: "منتهي",
};
const name = (id: string, items: ReadonlyArray<{ id: string; name: string }>) =>
  items.find((x) => x.id === id)?.name ?? "—";
function useAllowed(permission: Parameters<typeof canAccess>[1]) {
  const { role, permissions } = useDashboardWorkspace();
  return canAccess(role, permission, permissions);
}

export function StudentsPage() {
  const ops = useOperations();
  const [query, setQuery] = useState("");
  if (!useAllowed("students.view")) return <AccessDeniedState />;
  const rows = ops.students.filter(
    (s) =>
      `${s.name} ${s.code} ${s.guardian.phone ?? ""}`.includes(query) &&
      ops.enrollments.some(
        (e) =>
          e.studentId === s.id && ops.canSeeTeacher(e.teacherId, e.groupId),
      ),
  );
  return (
    <>
      <PageHeader
        title="الطلاب"
        description="الالتحاق بالسنتر لا يمنح وصولًا للمحتوى الإلكتروني."
      />
      <main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث بالاسم أو الكود"
          className="max-w-md"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {rows.map((s) => (
            <Card key={s.id} className="rounded-lg shadow-none">
              <CardContent className="p-4">
                <p className="font-bold">{s.name}</p>
                <p className="text-sm text-muted-foreground">
                  {s.code} · {s.grade}
                </p>
                <Link
                  href={`/students/${s.id}`}
                  className="mt-3 inline-block text-sm text-primary"
                >
                  فتح الملف
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
export function StudentDetailsPage({ studentId }: { studentId: string }) {
  const ops = useOperations();
  const student = ops.students.find((s) => s.id === studentId);
  const entries = ops.enrollments.filter(
    (e) =>
      e.studentId === studentId && ops.canSeeTeacher(e.teacherId, e.groupId),
  );
  if (!useAllowed("students.view") || !student || !entries.length)
    return <AccessDeniedState />;
  return (
    <>
      <PageHeader
        title={student.name}
        description={`كود الطالب: ${student.code}`}
      />
      <main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-4 text-sm">
            ولي الأمر: {student.guardian.name} ·{" "}
            {student.guardian.phone ?? "رقم غير متاح"}
          </CardContent>
        </Card>
        {entries.map((e) => (
          <Card key={e.id}>
            <CardContent className="p-4">
              <p className="font-semibold">{name(e.courseId, ops.courses)}</p>
              <p className="text-sm text-muted-foreground">
                {name(e.teacherId, ops.teachers)} ·{" "}
                {ops.groups.find((g) => g.id === e.groupId)?.name ?? "غير معين"}
              </p>
            </CardContent>
          </Card>
        ))}
      </main>
    </>
  );
}

export function RequestsPage() {
  const ops = useOperations();
  const { role, permissions } = useDashboardWorkspace();
  const [notice, setNotice] = useState("");
  const [confirm, setConfirm] = useState<{
    id: string;
    action: "reject" | "cancel";
  }>();
  const [reason, setReason] = useState("");
  if (!useAllowed("center_requests.view")) return <AccessDeniedState />;
  const manage = canAccess(role, "center_requests.manage", permissions);
  return (
    <>
      <PageHeader
        title="طلبات الانضمام"
        description="الموافقة تنشئ قرارًا فقط؛ التعيين ينشئ التحاق سنتر دون صلاحية إلكترونية."
      />
      <main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        {notice && (
          <p role="status" className="rounded-md bg-secondary p-3 text-sm">
            {notice}
          </p>
        )}
        {ops.requests
          .filter((r) => ops.canSeeTeacher(r.teacherId))
          .map((r) => {
            const groups = ops.groups.filter(
              (g) =>
                g.teacherId === r.teacherId &&
                g.courseId === r.courseId &&
                g.termId === r.termId,
            );
            return (
              <Card key={r.id} className="rounded-lg shadow-none">
                <CardContent className="space-y-3 p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-bold">
                        {ops.students.find((s) => s.id === r.studentId)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {name(r.teacherId, ops.teachers)} ·{" "}
                        {name(r.courseId, ops.courses)}
                      </p>
                    </div>
                    <StatusBadge tone="info">{r.status}</StatusBadge>
                  </div>
                  {manage && (
                    <div className="flex flex-wrap gap-2">
                      {["PENDING_REVIEW", "WAITLISTED"].includes(r.status) && (
                        <Button
                          size="sm"
                          onClick={() =>
                            setNotice(
                              ops.transitionRequest(r.id, "contact") ??
                                "تم تسجيل التواصل.",
                            )
                          }
                        >
                          تسجيل التواصل
                        </Button>
                      )}
                      {["PENDING_REVIEW", "CONTACTED", "APPROVED"].includes(
                        r.status,
                      ) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setNotice(
                              ops.transitionRequest(r.id, "waitlist") ??
                                "نُقل لقائمة الانتظار.",
                            )
                          }
                        >
                          قائمة الانتظار
                        </Button>
                      )}
                      {["PENDING_REVIEW", "CONTACTED", "WAITLISTED"].includes(
                        r.status,
                      ) && (
                        <Button
                          size="sm"
                          onClick={() =>
                            setNotice(
                              ops.transitionRequest(r.id, "approve") ??
                                "تمت الموافقة دون تعيين.",
                            )
                          }
                        >
                          موافقة
                        </Button>
                      )}
                      {r.status === "APPROVED" &&
                        groups.map((g) => (
                          <Button
                            key={g.id}
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setNotice(
                                ops.transitionRequest(r.id, "assign", g.id) ??
                                  `تم التعيين إلى ${g.name}${r.preferredGroupId !== g.id ? " (مختلف عن التفضيل)" : ""}.`,
                              )
                            }
                          >
                            تعيين: {g.name} {g.capacity.enrolled}/
                            {g.capacity.limit}
                          </Button>
                        ))}
                      {["PENDING_REVIEW", "CONTACTED", "WAITLISTED"].includes(
                        r.status,
                      ) &&
                        groups.map((g) => (
                          <Button
                            key={`aa-${g.id}`}
                            size="sm"
                            onClick={() =>
                              setNotice(
                                ops.transitionRequest(
                                  r.id,
                                  "approve_assign",
                                  g.id,
                                ) ?? `تمت الموافقة والتعيين إلى ${g.name}.`,
                              )
                            }
                          >
                            موافقة وتعيين: {g.name}
                          </Button>
                        ))}
                      {!["ASSIGNED", "REJECTED", "CANCELLED"].includes(
                        r.status,
                      ) && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setReason("");
                              setConfirm({ id: r.id, action: "reject" });
                            }}
                          >
                            رفض
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setConfirm({ id: r.id, action: "cancel" })
                            }
                          >
                            إلغاء الطلب
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {r.history.join(" · ")}
                  </p>
                </CardContent>
              </Card>
            );
          })}
      </main>
      <ConfirmationDialog
        open={!!confirm}
        title={
          confirm?.action === "reject"
            ? "رفض طلب الانضمام"
            : "إلغاء طلب الانضمام"
        }
        description={
          confirm?.action === "reject"
            ? "أدخل سبب الرفض ثم أكّد. لن يُنشأ التحاق."
            : "هل تريد إلغاء الطلب؟ لن يُنشأ التحاق."
        }
        destructive
        onOpenChange={(open) => !open && setConfirm(undefined)}
        onConfirm={() => {
          if (!confirm) return;
          const result = ops.transitionRequest(
            confirm.id,
            confirm.action,
            undefined,
            reason,
          );
          if (result) throw new Error(result);
          setNotice(
            confirm.action === "reject" ? "تم رفض الطلب." : "تم إلغاء الطلب.",
          );
        }}
      />
      {confirm?.action === "reject" && (
        <div className="fixed inset-x-8 bottom-8 z-[60] mx-auto max-w-sm">
          <Input
            autoFocus
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="سبب الرفض (مطلوب)"
          />
        </div>
      )}
    </>
  );
}

export function GroupsPage() {
  const ops = useOperations();
  const { role, permissions } = useDashboardWorkspace();
  const [notice, setNotice] = useState("");
  const [action, setAction] = useState<{
    type: "remove" | "transfer";
    enrollment: CenterEnrollment;
    target?: string;
  }>();
  if (!useAllowed("groups.view")) return <AccessDeniedState />;
  const manage = canAccess(role, "groups.manage", permissions);
  return (
    <>
      <PageHeader
        title="المجموعات"
        description="التحويل داخل نفس المدرس والمادة والفصل يحافظ على التحاق السنتر والباركود."
      />
      <main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        {notice && (
          <p role="status" className="rounded-md bg-secondary p-3 text-sm">
            {notice}
          </p>
        )}
        <div className="grid gap-4 lg:grid-cols-2">
          {ops.groups
            .filter((g) => ops.canSeeTeacher(g.teacherId, g.id))
            .map((g) => {
              const entries = ops.enrollments.filter(
                (e) => e.groupId === g.id && e.status === "ACTIVE",
              );
              const eligible = ops.students.filter(
                (s) => !entries.some((e) => e.studentId === s.id),
              );
              return (
                <Card key={g.id}>
                  <CardHeader>
                    <CardTitle>
                      {g.name}{" "}
                      <StatusBadge
                        tone={
                          g.capacity.enrolled >= g.capacity.limit
                            ? "warning"
                            : "success"
                        }
                      >
                        {g.capacity.enrolled}/{g.capacity.limit}
                      </StatusBadge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {name(g.teacherId, ops.teachers)} ·{" "}
                      {name(g.courseId, ops.courses)} · {g.schedule.room}
                    </p>
                    {manage && (
                      <select
                        className="h-8 w-full rounded-md border bg-card px-2 text-sm"
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value)
                            setNotice(
                              ops.assignStudent(e.target.value, g.id) ??
                                "تم تعيين الطالب وإنشاء التحاق سنتر فقط.",
                            );
                          e.target.value = "";
                        }}
                      >
                        <option value="">تعيين طالب مؤهل…</option>
                        {eligible.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    )}
                    <div className="space-y-2">
                      {entries.map((e) => (
                        <div
                          className="rounded-md border p-2 text-sm"
                          key={e.id}
                        >
                          <div className="flex justify-between gap-2">
                            <span>
                              {
                                ops.students.find((s) => s.id === e.studentId)
                                  ?.name
                              }
                            </span>
                            {manage && (
                              <span className="flex gap-2">
                                <Button
                                  size="xs"
                                  variant="destructive"
                                  onClick={() =>
                                    setAction({ type: "remove", enrollment: e })
                                  }
                                >
                                  إزالة
                                </Button>
                                <select
                                  aria-label="نقل الطالب"
                                  className="h-6 rounded border"
                                  defaultValue=""
                                  onChange={(x) =>
                                    x.target.value &&
                                    setAction({
                                      type: "transfer",
                                      enrollment: e,
                                      target: x.target.value,
                                    })
                                  }
                                >
                                  <option value="">نقل إلى…</option>
                                  {ops.groups
                                    .filter(
                                      (target) =>
                                        target.id !== g.id &&
                                        ops.canSeeTeacher(
                                          target.teacherId,
                                          target.id,
                                        ),
                                    )
                                    .map((target) => (
                                      <option key={target.id} value={target.id}>
                                        {target.name}
                                      </option>
                                    ))}
                                </select>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {canAccess(role, "attendance.manage", permissions) && (
                      <Button
                        size="sm"
                        onClick={() =>
                          setNotice(
                            ops.openSession(g.id) ?? `تم فتح جلسة ${g.name}.`,
                          )
                        }
                      >
                        <ClipboardCheck className="size-4" />
                        فتح جلسة
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </main>
      <ConfirmationDialog
        open={!!action}
        title={
          action?.type === "remove" ? "إزالة طالب من المجموعة" : "تحويل طالب"
        }
        description={
          action?.type === "remove"
            ? "سيُلغى التحاق السنتر من هذه المجموعة."
            : "سيُفحص النطاق والسعة. النقل بين نطاقات مختلفة محظور."
        }
        destructive
        onOpenChange={(open) => !open && setAction(undefined)}
        onConfirm={() => {
          if (!action) return;
          const result =
            action.type === "remove"
              ? ops.removeStudent(action.enrollment.id)
              : ops.transferStudent(action.enrollment.id, action.target!);
          if (result) throw new Error(result);
          setNotice(action.type === "remove" ? "تمت الإزالة." : "تم التحويل مع الاحتفاظ بالباركود النشط.");
        }}
      />
    </>
  );
}

export function BarcodesPage() {
  const ops = useOperations();
  const { role, permissions } = useDashboardWorkspace();
  const [selected, setSelected] = useState<string[]>([]);
  const [confirm, setConfirm] = useState<
    "bulk" | "revoke" | "reissue" | undefined
  >();
  const [target, setTarget] = useState<string>();
  if (!useAllowed("barcodes.view")) return <AccessDeniedState />;
  const visible = ops.barcodes.filter((b) => {
    const e = ops.enrollments.find((x) => x.id === b.enrollmentId);
    return e && ops.canSeeTeacher(e.teacherId, e.groupId);
  });
  const eligible = visible.filter((b) => b.status === "NOT_GENERATED");
  const manage = canAccess(role, "barcodes.manage", permissions);
  const print = (ids: string[]) => {
    setSelected(ids);
    setTimeout(() => window.print(), 0);
  };
  return (
    <>
      <PageHeader
        title="باركود الحضور Code 128"
        description="يحوي بيانات تشغيلية فقط، ولا يستخدم QR."
      />
      <main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <div className="no-print flex flex-wrap gap-2">
          {manage && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelected(eligible.map((b) => b.id))}
              >
                تحديد المؤهل الظاهر
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelected([])}
              >
                مسح التحديد
              </Button>
              <Button
                size="sm"
                disabled={!selected.length}
                onClick={() => setConfirm("bulk")}
              >
                إنشاء المحدد
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="secondary"
            disabled={!selected.length}
            onClick={() => print(selected)}
          >
            طباعة المحدد
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((b) => {
            const e = ops.enrollments.find((x) => x.id === b.enrollmentId)!;
            const student = ops.students.find((x) => x.id === e.studentId)!;
            return (
              <Card key={b.id} className="rounded-lg shadow-none">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">{student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {e.serial} ·{" "}
                        {ops.groups.find((g) => g.id === e.groupId)?.name}
                      </p>
                    </div>
                    <StatusBadge
                      tone={b.status === "ACTIVE" ? "success" : "warning"}
                    >
                      {barcodeLabels[b.status]}
                    </StatusBadge>
                  </div>
                  {b.value && (
                    <BarcodePreview value={b.value} serial={e.serial} />
                  )}
                  {manage && (
                    <div className="no-print flex flex-wrap gap-2">
                      <input
                        aria-label={`تحديد ${student.name}`}
                        type="checkbox"
                        checked={selected.includes(b.id)}
                        disabled={b.status !== "NOT_GENERATED"}
                        onChange={() =>
                          setSelected((x) =>
                            x.includes(b.id)
                              ? x.filter((v) => v !== b.id)
                              : [...x, b.id],
                          )
                        }
                      />
                      {b.status === "NOT_GENERATED" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setTarget(e.id);
                            setConfirm("reissue");
                          }}
                        >
                          إنشاء
                        </Button>
                      )}
                      {b.value && b.status !== "REVOKED" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setTarget(e.id);
                            setConfirm("revoke");
                          }}
                        >
                          إلغاء
                        </Button>
                      )}
                      {b.status === "REVOKED" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setTarget(e.id);
                            setConfirm("reissue");
                          }}
                        >
                          إعادة إصدار
                        </Button>
                      )}
                      {b.value && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => print([b.id])}
                        >
                          طباعة
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="print-only grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visible
            .filter((b) => selected.includes(b.id) && b.value)
            .map((b) => {
              const e = ops.enrollments.find((x) => x.id === b.enrollmentId)!;
              const s = ops.students.find((x) => x.id === e.studentId)!;
              return (
                <div
                  key={b.id}
                  className="print-card rounded border p-5 text-center"
                >
                  <p className="font-bold">{s.name}</p>
                  <p className="text-xs">
                    {name(e.teacherId, ops.teachers)} ·{" "}
                    {name(e.courseId, ops.courses)} · {e.termId}
                  </p>
                  <p className="text-xs">
                    {ops.groups.find((g) => g.id === e.groupId)?.name}
                  </p>
                  <BarcodePreview value={b.value!} serial={e.serial} />
                </div>
              );
            })}
        </div>
      </main>
      <ConfirmationDialog
        open={!!confirm}
        title={
          confirm === "bulk"
            ? "إنشاء الباركودات المحددة"
            : confirm === "revoke"
              ? "إلغاء الباركود"
              : "إنشاء أو إعادة إصدار باركود"
        }
        description={
          confirm === "bulk"
            ? "سيُنشأ الباركود للسجلات المؤهلة فقط، دون إعادة إنشاء النشط."
            : "أكّد الإجراء التشغيلي."
        }
        destructive={confirm === "revoke"}
        onOpenChange={(open) => !open && setConfirm(undefined)}
        onConfirm={() => {
          if (confirm === "bulk") {
            ops.generateBarcodes(
              visible
                .filter((b) => selected.includes(b.id))
                .map((b) => b.enrollmentId),
            );
            setSelected([]);
          } else if (confirm === "revoke" && target) ops.revokeBarcode(target);
          else if (target) {
            const result = ops.generateBarcode(target);
            if (result) throw new Error(result);
          }
        }}
      />
    </>
  );
}
function BarcodePreview({ value, serial }: { value: string; serial: string }) {
  return (
    <div className="my-3 rounded border bg-white p-2 text-center text-black">
      <svg
        viewBox="0 0 220 55"
        role="img"
        aria-label={`Code 128 ${serial}`}
        className="mx-auto h-14 w-full max-w-64"
      >
        {Array.from({ length: 46 }).map((_, i) => (
          <line
            key={i}
            x1={8 + i * 4.4}
            x2={8 + i * 4.4}
            y1="2"
            y2="47"
            stroke="currentColor"
            strokeWidth={(value.charCodeAt(i % value.length) % 3) + 1}
          />
        ))}
      </svg>
      <p className="font-mono text-xs">{serial}</p>
    </div>
  );
}

export function AttendancePage() {
  const ops = useOperations();
  if (!useAllowed("attendance.view")) return <AccessDeniedState />;
  return (
    <>
      <PageHeader
        title="الحضور"
        description="ابدأ جلسة، امسح Code 128، راجع ثم أغلق الجلسة."
      />
      <main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        {ops.sessions
          .filter((s) => ops.canSeeTeacher(s.teacherId, s.groupId))
          .map((s) => (
            <Card key={s.id}>
              <CardContent className="flex justify-between gap-3 p-4">
                <div>
                  <p className="font-bold">
                    {ops.groups.find((g) => g.id === s.groupId)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {s.date.slice(0, 16)} · {s.status}
                  </p>
                </div>
                <Link href={`/attendance/${s.id}`} className="text-primary">
                  فتح الجلسة
                </Link>
              </CardContent>
            </Card>
          ))}
      </main>
    </>
  );
}
export function AttendanceSessionPage({ sessionId }: { sessionId: string }) {
  const ops = useOperations();
  const { role, permissions } = useDashboardWorkspace();
  const session = ops.sessions.find((s) => s.id === sessionId);
  const [max, setMax] = useState(session?.maxScore?.toString() ?? "");
  const [notice, setNotice] = useState("");
  const [confirm, setConfirm] = useState<
    "absent" | "close" | "reopen" | "clear"
  >();
  if (
    !useAllowed("attendance.view") ||
    !session ||
    !ops.canSeeTeacher(session.teacherId, session.groupId)
  )
    return <AccessDeniedState />;
  const records = ops.attendance.filter((r) => r.sessionId === sessionId);
  const manage = canAccess(role, "attendance.manage", permissions);
  return (
    <>
      <PageHeader
        title={`جلسة ${session.title ?? "الحضور"}`}
        description={`${session.status} · لا تُرسل رسائل أثناء المسح.`}
        actions={
          session.status === "OPEN" ? (
            <Link
              href={`/attendance/${sessionId}/scan`}
              className="text-primary"
            >
              فتح المسح
            </Link>
          ) : undefined
        }
      />
      <main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        {notice && (
          <p role="status" className="rounded bg-secondary p-3 text-sm">
            {notice}
          </p>
        )}
        <Card>
          <CardContent className="flex flex-wrap items-end gap-2 p-4">
            <label className="text-sm">
              الدرجة النهائية
              <Input
                value={max}
                inputMode="decimal"
                onChange={(e) => setMax(e.target.value)}
                placeholder="بدون تقييم"
              />
            </label>
            {canAccess(role, "scores.manage", permissions) && (
              <Button
                size="sm"
                onClick={() => {
                  if (!max && records.some((r) => r.score !== undefined))
                    setConfirm("clear");
                  else
                    setNotice(
                      ops.setMaxScore(
                        sessionId,
                        max ? Number(max) : undefined,
                      ) ?? "تم تحديث التقييم.",
                    );
                }}
              >
                حفظ
              </Button>
            )}
            {session.status === "OPEN" && manage && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setConfirm("absent")}
                >
                  تحديد المتبقي غائبًا
                </Button>
                <Button size="sm" onClick={() => setConfirm("close")}>
                  إغلاق الجلسة
                </Button>
              </>
            )}
            {session.status === "CLOSED" && manage && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setConfirm("reopen")}
              >
                إعادة فتح للمراجعة
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>مراجعة الحضور</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {records.map((r) => {
              const e = ops.enrollments.find((x) => x.id === r.enrollmentId);
              const s = ops.students.find((x) => x.id === e?.studentId);
              return (
                <div
                  className="flex flex-wrap justify-between gap-2 rounded border p-3"
                  key={r.id}
                >
                  <span>{s?.name}</span>
                  <div className="flex gap-2">
                    <select
                      disabled={!manage}
                      value={r.state}
                      onChange={(x) =>
                        ops.setAttendanceState(
                          r.id,
                          x.target.value as AttendanceState,
                        )
                      }
                      className="h-8 rounded border bg-card"
                    >
                      {Object.entries(attendanceLabels).map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                    {session.maxScore !== undefined && (
                      <Input
                        className="h-8 w-20"
                        inputMode="decimal"
                        disabled={
                          !canAccess(role, "scores.manage", permissions)
                        }
                        value={r.score ?? ""}
                        onChange={(x) =>
                          setNotice(
                            ops.setScore(
                              r.id,
                              x.target.value === ""
                                ? undefined
                                : Number(x.target.value),
                            ) ?? "",
                          )
                        }
                      />
                    )}
                    {session.status === "CLOSED" &&
                      canAccess(
                        role,
                        "guardian_messages.prepare",
                        permissions,
                      ) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => ops.prepareMessage(r.id)}
                        >
                          تحضير رسالة
                        </Button>
                      )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </main>
      <ConfirmationDialog
        open={!!confirm}
        title={
          confirm === "clear"
            ? "مسح الدرجة النهائية والدرجات"
            : confirm === "reopen"
              ? "إعادة فتح الجلسة"
              : confirm === "close"
                ? "إغلاق الجلسة"
                : "تحديد المتبقين غائبين"
        }
        description={
          confirm === "clear"
            ? "سيؤدي ذلك إلى مسح كل درجات الطلاب. الإلغاء لا يغيّر شيئًا."
            : "أكّد الإجراء."
        }
        destructive={confirm === "clear"}
        onOpenChange={(open) => !open && setConfirm(undefined)}
        onConfirm={() => {
          if (confirm === "clear") {
            const result = ops.setMaxScore(sessionId, undefined, true);
            if (result) throw new Error(result);
            setNotice("تم مسح التقييم والدرجات.");
          }
          if (confirm === "absent") { ops.markRemainingAbsent(sessionId); setNotice("تم تحديد المتبقين غائبين."); }
          if (confirm === "close") {
            const result = ops.closeSession(sessionId);
            if (result) throw new Error(result);
            setNotice("تم إغلاق الجلسة دون إرسال رسائل.");
          }
          if (confirm === "reopen") { ops.reopenSession(sessionId); setNotice("أعيد فتح الجلسة للمراجعة."); }
        }}
      />
    </>
  );
}
export function ScannerPage({ sessionId }: { sessionId: string }) {
  const ops = useOperations();
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState("جاهز للمسح");
  const [confirm, setConfirm] = useState<"undo" | "other" | "unexpected">();
  const pending = useRef("");
  const session = ops.sessions.find((s) => s.id === sessionId);
  if (
    !useAllowed("attendance.scan") ||
    !session ||
    !ops.canSeeTeacher(session.teacherId, session.groupId)
  )
    return <AccessDeniedState />;
  const submit = (other = false, unexpected = false) => {
    if (!value.trim() || pending.current === value.trim()) return;
    pending.current = value.trim();
    const out = ops.scanBarcode(sessionId, value.trim(), other, unexpected);
    const labels: Record<string, string> = {
      SUCCESS: "تم تسجيل الحضور",
      DUPLICATE: "مسح مكرر؛ لم يُنشأ سجل جديد",
      REVOKED: "الباركود ملغى",
      WRONG_SCOPE: "الباركود خارج نطاق المدرس أو المادة أو الفصل",
      OTHER_GROUP: "طالب من مجموعة أخرى؛ يتطلب سماحًا صريحًا",
      UNEXPECTED: "الطالب غير متوقع في الجلسة؛ يتطلب تأكيدًا",
      CLOSED: "الجلسة مغلقة",
      INVALID: "باركود غير صالح",
    };
    setNotice(labels[out]);
    if (out === "OTHER_GROUP") setConfirm("other");
    if (out === "UNEXPECTED") setConfirm("unexpected");
    if (out !== "OTHER_GROUP" && out !== "UNEXPECTED") {
      setValue("");
      pending.current = "";
    }
  };
  return (
    <>
      <PageHeader
        title="مسح الحضور Code 128"
        description="إدخال لوحة المفاتيح مدعوم؛ لا توجد رسائل أو مسح كاميرا."
      />
      <main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-4">
            <Input
              autoFocus
              value={value}
              onChange={(e) => {
                pending.current = "";
                setValue(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="QCE128-..."
            />
            <Button className="mt-3" onClick={() => submit()}>
              تسجيل المسح
            </Button>
            <Button
              className="mt-3 ms-2"
              variant="outline"
              disabled={
                !ops.scans.some(
                  (s) => s.sessionId === sessionId && s.outcome === "SUCCESS",
                )
              }
              onClick={() => setConfirm("undo")}
            >
              تراجع عن آخر مسح
            </Button>
            <p role="status" className="mt-3 text-sm">
              {notice}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>آخر عمليات المسح</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ops.scans
              .filter((s) => s.sessionId === sessionId)
              .map((s) => (
                <p key={s.id} className="rounded border p-2 text-sm">
                  <code>{s.barcodeValue}</code> · {s.outcome} ·{" "}
                  {s.at.slice(11, 19)}
                </p>
              ))}
          </CardContent>
        </Card>
      </main>
      <ConfirmationDialog
        open={!!confirm}
        title={
          confirm === "undo" ? "التراجع عن آخر مسح ناجح" : "تأكيد حضور استثنائي"
        }
        description={
          confirm === "undo"
            ? "سيُعاد آخر سجل ممسوح إلى غير محدد، دون إعداد أي رسالة."
            : "التأكيد مطلوب قبل إضافة هذا الطالب للحضور."
        }
        destructive={confirm === "undo"}
        onOpenChange={(open) => !open && setConfirm(undefined)}
        onConfirm={() => {
          if (confirm === "undo") {
            const result = ops.undoLatestScan(sessionId);
            if (result) throw new Error(result);
            setNotice("تم التراجع عن المسح.");
          }
          else submit(confirm === "other", true);
        }}
      />
    </>
  );
}
export function GuardianMessagesPage() {
  const ops = useOperations();
  const { role, permissions } = useDashboardWorkspace();
  if (!useAllowed("guardian_messages.view")) return <AccessDeniedState />;
  const visible = ops.messages.filter((m) => {
    const s = ops.sessions.find((x) => x.id === m.sessionId);
    return s && ops.canSeeTeacher(s.teacherId, s.groupId);
  });
  const sessions = ops.sessions.filter(
    (s) => s.status === "CLOSED" && ops.canSeeTeacher(s.teacherId, s.groupId),
  );
  return (
    <>
      <PageHeader
        title="رسائل أولياء الأمور"
        description="التحضير يدوي؛ فتح واتساب لا يعني الإرسال أو التسليم."
      />
      <main className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        {canAccess(role, "guardian_messages.prepare", permissions) &&
          sessions.map((s) => (
            <Card key={s.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-2 p-3">
                <span>رسائل جلسة {s.date.slice(0, 10)}</span>
                <Button size="sm" onClick={() => ops.prepareMessages(s.id)}>
                  تحضير كل المؤهلين
                </Button>
              </CardContent>
            </Card>
          ))}
        {visible.map((m) => {
          const e = ops.enrollments.find((x) => x.id === m.enrollmentId)!;
          const student = ops.students.find((x) => x.id === e.studentId)!;
          const phone = student.guardian.phone;
          return (
            <Card key={m.id}>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <p className="font-bold">{student.name}</p>
                  <StatusBadge
                    tone={
                      m.state === "MARKED_SENT"
                        ? "success"
                        : m.state === "FAILED"
                          ? "warning"
                          : "info"
                    }
                  >
                    {m.state}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm">{m.text}</p>
                {m.reason && (
                  <p className="mt-2 text-sm text-destructive">{m.reason}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {phone && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://wa.me/${phone}?text=${encodeURIComponent(m.text)}`}
                      onClick={() =>
                        ops.updateMessage(m.id, "OPENED_IN_WHATSAPP")
                      }
                      className="inline-flex h-8 items-center rounded-lg bg-primary px-3 text-sm text-primary-foreground"
                    >
                      فتح واتساب يدويًا
                    </a>
                  )}
                  {canAccess(
                    role,
                    "guardian_messages.mark_sent",
                    permissions,
                  ) && (
                    <Button
                      size="sm"
                      onClick={() => ops.updateMessage(m.id, "MARKED_SENT")}
                    >
                      تم الإرسال يدويًا
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      ops.updateMessage(m.id, "SKIPPED", "تخطٍ يدوي")
                    }
                  >
                    تخطي
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      ops.updateMessage(m.id, "FAILED", "تعذر المتابعة يدويًا")
                    }
                  >
                    تعذر
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </main>
    </>
  );
}
