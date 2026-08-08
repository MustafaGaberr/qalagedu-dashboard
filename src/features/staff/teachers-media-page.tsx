"use client";

import Image from "next/image";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { AccessDeniedState } from "@/components/shared/access-denied-state";
import { MediaUploadField } from "@/components/shared/media-upload-field";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { useStaff } from "@/features/staff/staff-context";
import { canAccess } from "@/lib/access-control";
import type { TeacherProfile } from "@/types/staff";

type Draft = { name: string; subject: string; bio: string; photoUrl?: string; loginIdentifier: string; password?: string; status: "ACTIVE" | "SUSPENDED" };
const empty = (): Draft => ({ name: "", subject: "", bio: "", loginIdentifier: "", password: "", status: "ACTIVE" });

export function TeachersMediaPage() {
  const staff = useStaff();
  const { role, permissions } = useDashboardWorkspace();
  const manage = canAccess(role, "teachers.manage", permissions);
  const [draft, setDraft] = useState(empty);
  const [editing, setEditing] = useState<TeacherProfile>();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  if (!canAccess(role, "teachers.view", permissions)) return <AccessDeniedState />;
  const edit = (teacher: TeacherProfile) => { setEditing(teacher); setDraft({ name: teacher.name, subject: teacher.subject, bio: teacher.bio ?? "", photoUrl: teacher.photoUrl, loginIdentifier: teacher.loginIdentifier ?? "", status: teacher.status }); setOpen(true); };
  const save = () => { const result = editing ? staff.updateTeacher(editing.id, draft) : staff.createTeacher(draft); setMessage(result ?? "تم حفظ ملف المدرس."); if (!result) setOpen(false); };
  return <><PageHeader title="المدرسون" description="الاسم والتخصص والصورة والنبذة التي تظهر للطلاب على المنصة." actions={manage ? <Button onClick={() => { setEditing(undefined); setDraft(empty()); setOpen(true); }}><PlusIcon />مدرس جديد</Button> : undefined} /><main className="space-y-4 px-4 py-5 sm:px-6 lg:px-8">{message ? <p role="status" className="rounded-lg bg-secondary p-3 text-sm">{message}</p> : null}{open && manage ? <Card><CardContent className="grid gap-3 md:grid-cols-2"><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="اسم المدرس" /><Input value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} placeholder="التخصص الظاهر للطلاب" /><Input value={draft.loginIdentifier} onChange={(e) => setDraft({ ...draft, loginIdentifier: e.target.value })} placeholder="معرّف تسجيل الدخول" /><Input type="password" value={draft.password ?? ""} onChange={(e) => setDraft({ ...draft, password: e.target.value })} placeholder={editing ? "كلمة مرور جديدة (اختياري)" : "كلمة المرور"} /><textarea className="md:col-span-2 min-h-24 rounded-lg border bg-transparent p-3 text-sm" value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} placeholder="نبذة قصيرة عن أسلوب الشرح" /><div className="md:col-span-2"><MediaUploadField label="صورة المدرس" category="TEACHER" value={draft.photoUrl} altText={draft.name} onChange={(photoUrl) => setDraft({ ...draft, photoUrl })} /></div><div className="flex gap-2"><Button onClick={save}>حفظ</Button><Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button></div></CardContent></Card> : null}<div className="grid gap-3 md:grid-cols-2">{staff.teachers.filter((teacher) => staff.canSeeTeacher(teacher.id)).map((teacher) => <Card key={teacher.id}><CardContent className="flex items-center gap-4"><div className="relative size-20 overflow-hidden rounded-lg bg-secondary">{teacher.photoUrl ? <Image src={teacher.photoUrl} alt={teacher.name} fill sizes="80px" className="object-cover" unoptimized /> : <span className="flex h-full items-center justify-center text-xl font-semibold text-primary">{teacher.name.split(/\s+/).slice(0, 2).map((x) => x[0]).join(" ")}</span>}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><strong>{teacher.name}</strong><StatusBadge tone={teacher.status === "ACTIVE" ? "success" : "neutral"}>{teacher.status === "ACTIVE" ? "نشط" : "موقوف"}</StatusBadge></div><p className="text-sm text-primary">{teacher.subject}</p><p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{teacher.bio || "لم تُضف نبذة بعد."}</p>{manage ? <Button className="mt-3" size="sm" variant="outline" onClick={() => edit(teacher)}><PencilIcon />تعديل الملف</Button> : null}</div></CardContent></Card>)}</div></main></>;
}
