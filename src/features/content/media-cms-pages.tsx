"use client";

import Image from "next/image";
import { useState } from "react";
import { ArchiveIcon, ChevronDownIcon, ChevronUpIcon, PencilIcon, PlusIcon } from "lucide-react";

import { AccessDeniedState } from "@/components/shared/access-denied-state";
import { MediaUploadField } from "@/components/shared/media-upload-field";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useContent } from "@/features/content/content-context";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { canAccess } from "@/lib/access-control";
import { useStaff } from "@/features/staff/staff-context";
import type { ContentCourse, ContentPackage, StoreProduct, StoreProductType, StudyMode, WebsiteContentItem, WebsiteSectionType } from "@/types/content";

const control = "h-10 rounded-lg border bg-card px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50";
const stateLabel = { DRAFT: "مسودة", PUBLISHED: "منشور", ARCHIVED: "مؤرشف" } as const;
const packageLabels = { SINGLE_LESSON: "حصة واحدة", MONTHLY: "شهرية", TERM: "ترم", FINAL_REVISION: "مراجعة نهائية", CUSTOM: "مخصصة" } as const;
const productLabels: Record<StoreProductType, string> = { BOOK: "كتاب", NOTES: "مذكرة", SUMMARY: "ملخص", REVISION_FILE: "ملف مراجعة", EXAM_MODEL: "نموذج امتحان", QUESTION_BANK: "بنك أسئلة", FREE_RESOURCE: "مورد مجاني" };
const sectionLabels: Record<WebsiteSectionType, string> = { HERO: "شريحة البانر الرئيسي", FEATURED_TEACHER: "المدرسون المختارون", FEATURED_COURSE: "الكورسات", REVISION: "المراجعات", STORE_HIGHLIGHT: "المتجر", TESTIMONIAL: "آراء الطلاب", NEWS: "الأسئلة الشائعة", CTA: "دعوة للإجراء" };

function Message({ children }: { children?: string }) {
  return children ? <p role="status" className="rounded-lg bg-secondary p-3 text-sm">{children}</p> : null;
}

function ImagePreview({ src, alt }: { src?: string; alt: string }) {
  return src ? <div className="relative aspect-[16/9] w-28 shrink-0 overflow-hidden rounded-md border"><Image src={src} alt={alt} fill sizes="112px" className="object-cover" unoptimized /></div> : null;
}

export function CoursesMediaPage() {
  const content = useContent();
  const { role, permissions } = useDashboardWorkspace();
  const manage = canAccess(role, "courses.manage", permissions);
  const [editing, setEditing] = useState<ContentCourse>();
  const [open, setOpen] = useState(false);
  const first = content.courses[0];
  const blank = (): Omit<ContentCourse, "id" | "teacherId"> => ({ title: "", subject: first?.subject ?? "الرياضيات", grade: first?.grade ?? "الثانوية", term: first?.term ?? "الفصل الدراسي الحالي", studyMode: "HYBRID", description: "", state: "DRAFT" });
  const [draft, setDraft] = useState(blank);
  const [message, setMessage] = useState("");
  if (!canAccess(role, "courses.view", permissions)) return <AccessDeniedState />;
  const save = () => { const result = editing ? content.updateCourse(editing.id, draft) : content.createCourse(draft); setMessage(result ?? "تم حفظ الكورس."); if (!result) setOpen(false); };
  const edit = (course: ContentCourse) => { setEditing(course); setDraft({ title: course.title, subject: course.subject, grade: course.grade, term: course.term, studyMode: course.studyMode, description: course.description, state: course.state, coverImage: course.coverImage }); setOpen(true); };
  return <><PageHeader title="الكورسات" description="حقول واضحة للمدرس، مع غلاف مخصص يظهر للطلاب." actions={manage ? <Button onClick={() => { setEditing(undefined); setDraft(blank()); setOpen(true); }}><PlusIcon />كورس جديد</Button> : undefined} /><main className="space-y-4 px-4 py-5 sm:px-6 lg:px-8"><Message>{message}</Message>{open && manage ? <Card><CardHeader><CardTitle>{editing ? "تعديل الكورس" : "كورس جديد"}</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2"><Input placeholder="عنوان الكورس" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /><Input placeholder="المادة" value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} /><Input placeholder="الصف" value={draft.grade} onChange={(e) => setDraft({ ...draft, grade: e.target.value })} /><Input placeholder="الفصل الدراسي" value={draft.term} onChange={(e) => setDraft({ ...draft, term: e.target.value })} /><select className={control} value={draft.studyMode} onChange={(e) => setDraft({ ...draft, studyMode: e.target.value as StudyMode })}><option value="ONLINE">أونلاين</option><option value="CENTER">سنتر</option><option value="HYBRID">أونلاين وسنتر</option></select><textarea className="min-h-24 rounded-lg border bg-transparent p-3 text-sm" placeholder="وصف مختصر للكورس" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /><div className="md:col-span-2"><MediaUploadField label="صورة الكورس" category="COURSE" value={draft.coverImage} altText={`غلاف ${draft.title || "الكورس"}`} onChange={(coverImage) => setDraft({ ...draft, coverImage })} /></div><div className="flex gap-2"><Button onClick={save}>حفظ</Button><Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button></div></CardContent></Card> : null}<div className="grid gap-3 md:grid-cols-2">{content.courses.filter((course) => content.canSeeCourse(course.id)).map((course) => <Card key={course.id} size="sm"><CardContent className="flex gap-3"><ImagePreview src={course.coverImage} alt={course.title} /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><strong>{course.title}</strong><StatusBadge tone={course.state === "PUBLISHED" ? "success" : course.state === "DRAFT" ? "warning" : "neutral"}>{stateLabel[course.state]}</StatusBadge></div><p className="mt-1 text-sm text-muted-foreground">{course.subject} · {course.grade}</p>{manage ? <div className="mt-3 flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => edit(course)}><PencilIcon />تعديل</Button><Button size="sm" onClick={() => setMessage(content.setCourseState(course.id, course.state === "PUBLISHED" ? "DRAFT" : "PUBLISHED") ?? "تم تحديث النشر.")}>{course.state === "PUBLISHED" ? "إلغاء النشر" : "نشر"}</Button></div> : null}</div></CardContent></Card>)}</div></main></>;
}

export function LessonsMediaPage() {
  const content = useContent();
  const { role, permissions } = useDashboardWorkspace();
  const courses = content.courses.filter((item) => content.canSeeCourse(item.id));
  const [courseId, setCourseId] = useState("");
  const selected = courseId || courses[0]?.id || "";
  const units = content.units.filter((item) => item.courseId === selected).sort((a, b) => a.position - b.position);
  const [unitTitle, setUnitTitle] = useState("");
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();
  const [duration, setDuration] = useState("30");
  const [message, setMessage] = useState("");
  const manage = canAccess(role, "lessons.manage", permissions);
  if (!canAccess(role, "lessons.view", permissions)) return <AccessDeniedState />;
  const add = (unitId: string) => { const result = content.createLesson({ courseId: selected, unitId, title, description: "", durationMinutes: Number(duration), freePreview: false, state: "DRAFT", youtubeUrl, thumbnailUrl }); setMessage(result ?? "تم إنشاء الدرس، واستخرج الخادم معرّف YouTube من الرابط."); if (!result) { setTitle(""); setYoutubeUrl(""); setThumbnailUrl(undefined); } };
  return <><PageHeader title="الوحدات والدروس" description="ألصق رابط فيديو YouTube غير المدرج كالمعتاد. لا يحتاج المدرس إلى استخراج أي معرّف." /><main className="space-y-4 px-4 py-5 sm:px-6 lg:px-8"><Message>{message}</Message><select className={`${control} w-full max-w-md`} value={selected} onChange={(e) => setCourseId(e.target.value)}>{courses.map((course) => <option value={course.id} key={course.id}>{course.title}</option>)}</select>{manage ? <Card size="sm"><CardContent className="flex gap-2"><Input value={unitTitle} onChange={(e) => setUnitTitle(e.target.value)} placeholder="اسم الوحدة" /><Button onClick={() => { setMessage(content.createUnit(selected, unitTitle) ?? "تمت إضافة الوحدة."); setUnitTitle(""); }}><PlusIcon />إضافة وحدة</Button></CardContent></Card> : null}{units.map((unit) => <Card key={unit.id}><CardHeader><CardTitle>{unit.title}</CardTitle></CardHeader><CardContent className="space-y-3">{content.lessons.filter((lesson) => lesson.unitId === unit.id).map((lesson) => <div key={lesson.id} className="flex items-center gap-3 rounded-lg border p-3"><ImagePreview src={lesson.thumbnailUrl} alt={lesson.title} /><div className="min-w-0 flex-1"><strong>{lesson.title}</strong><p className="text-xs text-muted-foreground">{lesson.durationMinutes} دقيقة · {lesson.providerVideoId ? "فيديو مضبوط" : "بدون فيديو"}</p></div><StatusBadge tone={lesson.state === "PUBLISHED" ? "success" : "warning"}>{stateLabel[lesson.state]}</StatusBadge></div>)}{manage ? <div className="grid gap-3 rounded-lg border border-dashed p-3 md:grid-cols-2"><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان الدرس" /><Input value={duration} onChange={(e) => setDuration(e.target.value)} inputMode="numeric" placeholder="المدة بالدقائق" /><Input className="md:col-span-2" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="رابط YouTube غير المدرج" dir="ltr" /><div className="md:col-span-2"><MediaUploadField label="صورة الدرس المخصصة" category="LESSON" value={thumbnailUrl} altText={title} onChange={setThumbnailUrl} /></div><Button className="justify-self-start" onClick={() => add(unit.id)}><PlusIcon />إضافة الدرس</Button></div> : null}</CardContent></Card>)}</main></>;
}

function emptyPackage(courseId = ""): Omit<ContentPackage, "id"> { return { courseId, title: "", type: "MONTHLY", price: 0, lessonIds: [], includeFutureLessons: false, examIds: [], fileLabels: [], state: "DRAFT" }; }
export function PackagesMediaPage() {
  const content = useContent(); const { role, permissions } = useDashboardWorkspace(); const courses = content.courses.filter((x) => content.canSeeCourse(x.id)); const [draft, setDraft] = useState(() => emptyPackage(courses[0]?.id)); const [editing, setEditing] = useState<ContentPackage>(); const [open, setOpen] = useState(false); const [message, setMessage] = useState(""); const manage = canAccess(role, "packages.manage", permissions);
  if (!canAccess(role, "packages.view", permissions)) return <AccessDeniedState />;
  const save = () => { const result = editing ? content.updatePackage(editing.id, draft) : content.createPackage(draft); setMessage(result ?? "تم حفظ الباقة."); if (!result) setOpen(false); };
  return <><PageHeader title="الباقات والمراجعات" description="إدارة الباقات وصورها المخصصة ضمن نطاق المدرس." actions={manage ? <Button onClick={() => { setEditing(undefined); setDraft(emptyPackage(courses[0]?.id)); setOpen(true); }}><PlusIcon />باقة جديدة</Button> : undefined} /><main className="space-y-4 px-4 py-5 sm:px-6 lg:px-8"><Message>{message}</Message>{open && manage ? <Card><CardContent className="grid gap-3 md:grid-cols-2"><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="اسم الباقة" /><select className={control} value={draft.courseId} onChange={(e) => setDraft({ ...draft, courseId: e.target.value, lessonIds: [] })}>{courses.map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}</select><select className={control} value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as ContentPackage["type"] })}>{Object.entries(packageLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><Input value={String(draft.price)} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} inputMode="decimal" placeholder="السعر" /><fieldset className="md:col-span-2 rounded-lg border p-3"><legend className="px-1 text-sm font-medium">الدروس المشمولة</legend><div className="grid gap-2 sm:grid-cols-2">{content.lessons.filter((x) => x.courseId === draft.courseId).map((lesson) => <label key={lesson.id} className="flex gap-2 text-sm"><input type="checkbox" checked={draft.lessonIds.includes(lesson.id)} onChange={() => setDraft({ ...draft, lessonIds: draft.lessonIds.includes(lesson.id) ? draft.lessonIds.filter((id) => id !== lesson.id) : [...draft.lessonIds, lesson.id] })} />{lesson.title}</label>)}</div></fieldset><div className="md:col-span-2"><MediaUploadField label="صورة الباقة أو المراجعة" category="PACKAGE" value={draft.thumbnailUrl} altText={draft.title} onChange={(thumbnailUrl) => setDraft({ ...draft, thumbnailUrl })} /></div><div className="flex gap-2"><Button onClick={save}>حفظ</Button><Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button></div></CardContent></Card> : null}<div className="grid gap-3 md:grid-cols-2">{content.packages.filter((x) => content.canSeeCourse(x.courseId)).map((item) => <Card key={item.id} size="sm"><CardContent className="flex gap-3"><ImagePreview src={item.thumbnailUrl} alt={item.title} /><div className="flex-1"><strong>{item.title}</strong><p className="text-sm text-muted-foreground">{packageLabels[item.type]} · {item.price} ج.م</p>{manage ? <div className="mt-2 flex gap-2"><Button size="sm" variant="outline" onClick={() => { setEditing(item); setDraft({ ...item }); setOpen(true); }}><PencilIcon />تعديل</Button><Button size="sm" variant="destructive" onClick={() => setMessage(content.archivePackage(item.id) ?? "تمت الأرشفة.")}><ArchiveIcon />أرشفة</Button></div> : null}</div></CardContent></Card>)}</div></main></>;
}

function emptyProduct(): Omit<StoreProduct, "id"> { return { type: "BOOK", title: "", coverAlt: "غلاف المنتج", teacherOrPublisher: "", grade: "الثانوية", subject: "", description: "", format: "PDF", price: 0, state: "DRAFT" }; }
export function StoreMediaPage() {
  const content = useContent(); const { role, permissions } = useDashboardWorkspace(); const [draft, setDraft] = useState(emptyProduct); const [editing, setEditing] = useState<StoreProduct>(); const [open, setOpen] = useState(false); const [message, setMessage] = useState(""); const manage = canAccess(role, "store.manage", permissions);
  if (!canAccess(role, "store.view", permissions)) return <AccessDeniedState />;
  const save = () => { const scopedDraft = { ...draft, relatedCourseId: draft.relatedCourseId ?? content.courses.find((course) => content.canSeeCourse(course.id))?.id }; const result = editing ? content.updateProduct(editing.id, scopedDraft) : content.createProduct(scopedDraft); setMessage(result ?? "تم حفظ المنتج."); if (!result) setOpen(false); };
  return <><PageHeader title="المتجر التعليمي" description="صور المنتجات والبيانات الظاهرة للطلاب تُدار من هنا." actions={manage ? <Button onClick={() => { setEditing(undefined); setDraft(emptyProduct()); setOpen(true); }}><PlusIcon />منتج جديد</Button> : undefined} /><main className="space-y-4 px-4 py-5 sm:px-6 lg:px-8"><Message>{message}</Message>{open && manage ? <Card><CardContent className="grid gap-3 md:grid-cols-2"><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="اسم المنتج" /><select className={control} value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as StoreProductType })}>{Object.entries(productLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><Input value={draft.teacherOrPublisher} onChange={(e) => setDraft({ ...draft, teacherOrPublisher: e.target.value })} placeholder="المدرس أو الناشر" /><Input value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} placeholder="المادة" /><Input value={draft.grade} onChange={(e) => setDraft({ ...draft, grade: e.target.value })} placeholder="الصف" /><Input value={String(draft.price ?? "")} onChange={(e) => setDraft({ ...draft, price: e.target.value ? Number(e.target.value) : undefined })} inputMode="decimal" placeholder="السعر، واتركه فارغًا للمجاني" /><textarea className="md:col-span-2 min-h-24 rounded-lg border bg-transparent p-3 text-sm" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="وصف المنتج" /><div className="md:col-span-2"><MediaUploadField label="صورة المنتج" category="STORE_PRODUCT" value={draft.imageUrl} altText={draft.coverAlt} onChange={(imageUrl) => setDraft({ ...draft, imageUrl })} /></div><div className="flex gap-2"><Button onClick={save}>حفظ</Button><Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button></div></CardContent></Card> : null}<div className="grid gap-3 md:grid-cols-2">{content.products.map((item) => <Card key={item.id} size="sm"><CardContent className="flex gap-3"><ImagePreview src={item.imageUrl} alt={item.coverAlt} /><div className="flex-1"><strong>{item.title}</strong><p className="text-sm text-muted-foreground">{productLabels[item.type]} · {item.price ?? "مجاني"}</p>{manage ? <div className="mt-2 flex gap-2"><Button size="sm" variant="outline" onClick={() => { setEditing(item); setDraft({ ...item }); setOpen(true); }}><PencilIcon />تعديل</Button><Button size="sm" variant="destructive" onClick={() => setMessage(content.archiveProduct(item.id) ?? "تمت الأرشفة.")}><ArchiveIcon />أرشفة</Button></div> : null}</div></CardContent></Card>)}</div></main></>;
}

function emptySection(): Omit<WebsiteContentItem, "id" | "order"> { return { type: "HERO", title: "", subtitle: "", body: "", active: true, imageAlt: "", mobileImageAlt: "", ctaLabel: "", ctaLink: "" }; }
export function WebsiteCmsPage() {
  const content = useContent();
  const staff = useStaff();
  const { role, permissions } = useDashboardWorkspace();
  const [draft, setDraft] = useState(emptySection);
  const [editing, setEditing] = useState<WebsiteContentItem>();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const manage = canAccess(role, "website.manage", permissions);
  if (!canAccess(role, "website.view", permissions)) return <AccessDeniedState />;
  const save = () => { const result = editing ? content.updateWebsiteItem(editing.id, draft) : content.createWebsiteItem(draft); setMessage(result ?? "تم حفظ محتوى الموقع."); if (!result) setOpen(false); };
  return <>
    <PageHeader title="محتوى الموقع" description="أنشئ أكثر من شريحة بانر، رتّبها، واربط المدرسين والمحتوى المنشور بالصفحة الرئيسية." actions={manage ? <Button onClick={() => { setEditing(undefined); setDraft(emptySection()); setOpen(true); }}><PlusIcon />عنصر جديد</Button> : undefined} />
    <main className="space-y-4 px-4 py-5 sm:px-6 lg:px-8">
      <Message>{message}</Message>
      {open && manage ? <Card><CardContent className="grid gap-3 md:grid-cols-2">
        <select className={control} value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as WebsiteSectionType })}>{Object.entries(sectionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder={draft.type === "NEWS" ? "السؤال" : "العنوان"} />
        <Input value={draft.subtitle ?? ""} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} placeholder={draft.type === "HERO" ? "الشارة القصيرة" : "العنوان الفرعي"} />
        <Input value={draft.imageAlt ?? ""} onChange={(e) => setDraft({ ...draft, imageAlt: e.target.value })} placeholder="وصف الصورة للقارئ الصوتي" />
        <textarea className="md:col-span-2 min-h-24 rounded-lg border bg-transparent p-3 text-sm" value={draft.body ?? ""} onChange={(e) => setDraft({ ...draft, body: e.target.value })} placeholder={draft.type === "NEWS" ? "الإجابة" : "النص"} />
        {(draft.type === "HERO" || draft.type === "FEATURED_TEACHER") ? <select className={control} value={draft.teacherId ?? ""} onChange={(e) => setDraft({ ...draft, teacherId: e.target.value || undefined })}><option value="">دون مدرس مرتبط</option>{staff.teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name} · {teacher.subject}</option>)}</select> : null}
        {draft.type === "FEATURED_COURSE" ? <select className={control} value={draft.courseId ?? ""} onChange={(e) => setDraft({ ...draft, courseId: e.target.value || undefined })}><option value="">استخدام أحدث الكورسات المنشورة</option>{content.courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}</select> : null}
        <Input value={draft.ctaLabel ?? ""} onChange={(e) => setDraft({ ...draft, ctaLabel: e.target.value })} placeholder="نص الزر" />
        <Input value={draft.ctaLink ?? ""} onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })} placeholder="رابط الزر داخل الموقع" />
        <div className="md:col-span-2"><MediaUploadField label={draft.type === "HERO" ? "صورة الشريحة لسطح المكتب" : "صورة القسم"} category="WEBSITE" value={draft.imageUrl} altText={draft.imageAlt} onChange={(imageUrl) => setDraft({ ...draft, imageUrl })} /></div>
        {draft.type === "HERO" ? <div className="md:col-span-2"><MediaUploadField label="صورة اختيارية للهاتف" category="WEBSITE" value={draft.mobileImageUrl} altText={draft.mobileImageAlt ?? draft.imageAlt} onChange={(mobileImageUrl) => setDraft({ ...draft, mobileImageUrl })} /></div> : null}
        {draft.type === "HERO" ? <Input className="md:col-span-2" value={draft.mobileImageAlt ?? ""} onChange={(e) => setDraft({ ...draft, mobileImageAlt: e.target.value })} placeholder="وصف صورة الهاتف للقارئ الصوتي" /> : null}
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.active} onChange={(e) => setDraft({ ...draft, active: e.target.checked })} />إظهار العنصر على الموقع</label>
        <div className="flex gap-2"><Button onClick={save}>حفظ</Button><Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button></div>
      </CardContent></Card> : null}
      <div className="space-y-3">{[...content.websiteItems].sort((a, b) => a.order - b.order).map((item) => <Card key={item.id} size="sm"><CardContent className="flex items-center gap-3"><ImagePreview src={item.imageUrl} alt={item.imageAlt ?? item.title} /><div className="min-w-0 flex-1"><strong>{item.order}. {item.title || sectionLabels[item.type]}</strong><p className="text-sm text-muted-foreground">{sectionLabels[item.type]} · {item.active ? "ظاهر" : "مخفي"}{item.teacherId ? ` · ${staff.teachers.find((teacher) => teacher.id === item.teacherId)?.name ?? "مدرس مرتبط"}` : ""}</p></div>{manage ? <div className="flex gap-1"><Button size="icon-xs" variant="outline" aria-label="نقل لأعلى" onClick={() => setMessage(content.reorderWebsiteItem(item.id, -1) ?? "تم تغيير الترتيب.")}><ChevronUpIcon /></Button><Button size="icon-xs" variant="outline" aria-label="نقل لأسفل" onClick={() => setMessage(content.reorderWebsiteItem(item.id, 1) ?? "تم تغيير الترتيب.")}><ChevronDownIcon /></Button><Button size="sm" variant="outline" onClick={() => { setEditing(item); setDraft({ ...item }); setOpen(true); }}><PencilIcon />تعديل</Button></div> : null}</CardContent></Card>)}</div>
    </main>
  </>;
}

export function WebsiteAndBrandCmsPage() {
  const staff = useStaff();
  const [message, setMessage] = useState("");
  return <><section className="px-4 pt-5 sm:px-6 lg:px-8"><Card><CardHeader><CardTitle>شعار الموقع</CardTitle></CardHeader><CardContent><MediaUploadField label="الشعار الرئيسي" category="BRAND" value={staff.settings.logoSrc} altText={staff.settings.brandName} onChange={(logoSrc) => setMessage(staff.updateSettings({ logoSrc }) ?? "تم حفظ الشعار الجديد.")} />{message ? <p role="status" className="mt-2 text-sm text-primary">{message}</p> : null}</CardContent></Card></section><WebsiteCmsPage /></>;
}
