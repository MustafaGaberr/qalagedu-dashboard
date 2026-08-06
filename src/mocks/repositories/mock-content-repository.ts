import type { ContentCourse, ContentExam, ContentLesson, ContentPackage, CurriculumUnit, GradeEntry, StoreProduct, WebsiteContentItem } from "@/types/content";

export const initialContentCourses: ContentCourse[] = [
  { id: "course_math", title: "رياضيات الثانوية", teacherId: "teacher_ahmed", subject: "الرياضيات", grade: "الثالثة الثانوية", term: "الفصل الدراسي الأول 2026/2027", studyMode: "HYBRID", state: "PUBLISHED", description: "منهج الرياضيات ومراجعاته." },
  { id: "course_physics", title: "فيزياء الثانوية", teacherId: "teacher_mona", subject: "الفيزياء", grade: "الثالثة الثانوية", term: "الفصل الدراسي الأول 2026/2027", studyMode: "ONLINE", state: "DRAFT", description: "منهج الفيزياء للطلاب عبر الإنترنت." },
];
export const initialUnits: CurriculumUnit[] = [
  { id: "unit_math_1", courseId: "course_math", title: "أساسيات التفاضل", position: 1, state: "PUBLISHED" },
  { id: "unit_math_2", courseId: "course_math", title: "تطبيقات المشتقات", position: 2, state: "DRAFT" },
  { id: "unit_physics_1", courseId: "course_physics", title: "الحركة الخطية", position: 1, state: "DRAFT" },
];
export const initialLessons: ContentLesson[] = [
  { id: "lesson_math_1", courseId: "course_math", unitId: "unit_math_1", title: "مفهوم المشتقة", description: "تمهيد وأمثلة أساسية.", durationMinutes: 38, freePreview: true, state: "PUBLISHED", position: 1, attachments: [{ id: "att_1", name: "ملخص الدرس", safePreviewLabel: "معاينة الملخص" }], provider: "YOUTUBE", providerVideoId: "dQw4w9WgXcQ" },
  { id: "lesson_math_2", courseId: "course_math", unitId: "unit_math_1", title: "قواعد الاشتقاق", description: "قواعد الاشتقاق والتدريب.", durationMinutes: 46, freePreview: false, state: "DRAFT", position: 2, attachments: [], provider: "YOUTUBE", providerVideoId: "M7lc1UVf-VE" },
];
export const initialPackages: ContentPackage[] = [
  { id: "package_math_term", courseId: "course_math", title: "باقة الترم الأول", type: "TERM", price: 850, accessDays: 120, lessonIds: ["lesson_math_1", "lesson_math_2"], includeFutureLessons: true, examIds: ["exam_math_1"], fileLabels: ["ملخص الترم"], state: "PUBLISHED" },
];
export const initialExams: ContentExam[] = [
  { id: "exam_math_1", courseId: "course_math", title: "اختبار المشتقات الأول", kind: "ONLINE", durationMinutes: 30, attempts: 2, availableFrom: "2026-09-01T16:00", availableTo: "2026-09-03T22:00", passingScore: 50, resultRelease: "AFTER_REVIEW", antiCheatThreshold: 70, audience: "COURSE_STUDENTS", targetIds: [], state: "DRAFT", questions: [{ id: "question_math_1", prompt: "اختر قاعدة الاشتقاق المناسبة.", type: "SINGLE_CHOICE", choices: ["أ", "ب", "ج"], correctAnswers: ["أ"] }] },
];
export const initialGrades: GradeEntry[] = [{ id: "grade_math_1", examId: "exam_math_1", studentId: "student_omar", score: 18, manualReview: false }];
export const initialStoreProducts: StoreProduct[] = [{ id: "store_math_notes", type: "NOTES", title: "ملخص المشتقات", coverAlt: "غلاف ملخص المشتقات", teacherOrPublisher: "أ. أحمد عبد الرحمن", grade: "الثالثة الثانوية", subject: "الرياضيات", description: "ملخص مطبوع ومراجعة مركزة.", pageCount: 42, format: "PDF محمي", price: 65, relatedCourseId: "course_math", state: "PUBLISHED", safePreviewLabel: "صفحة فهرس تجريبية" }];
export const initialWebsiteContent: WebsiteContentItem[] = [
  { id: "web_hero_1", type: "HERO", title: "ابدأ مراجعتك بثقة", body: "محتوى منظم ومراجعات مختارة.", order: 1, active: true, desktopImageAlt: "صورة بانر سطح المكتب", mobileImageAlt: "صورة بانر الهاتف", ctaLabel: "استعرض الكورسات", ctaLink: "/courses", startsAt: "2026-08-20T00:00", courseId: "course_math" },
  { id: "web_teacher_ahmed", type: "FEATURED_TEACHER", title: "أ. أحمد عبد الرحمن", order: 2, active: true, teacherId: "teacher_ahmed" },
  { id: "web_store_1", type: "STORE_HIGHLIGHT", title: "ملخصات المراجعة", order: 3, active: true, storeProductId: "store_math_notes" },
];
