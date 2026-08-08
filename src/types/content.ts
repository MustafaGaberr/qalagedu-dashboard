export type PublishState = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type StudyMode = "ONLINE" | "CENTER" | "HYBRID";
export type VideoProvider = "YOUTUBE";
export type PackageType = "SINGLE_LESSON" | "MONTHLY" | "TERM" | "FINAL_REVISION" | "CUSTOM";
export type QuestionType = "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_TEXT";
export type ExamKind = "ONLINE" | "PAPER";
export type ExamAudience = "COURSE_STUDENTS" | "ONLINE_STUDENTS" | "CENTER_STUDENTS" | "GROUPS" | "SELECTED_STUDENTS";
export type ResultReleaseMode = "IMMEDIATE" | "AFTER_REVIEW" | "SCHEDULED";
export type StoreProductType = "BOOK" | "NOTES" | "SUMMARY" | "REVISION_FILE" | "EXAM_MODEL" | "QUESTION_BANK" | "FREE_RESOURCE";
export type WebsiteSectionType = "HERO" | "FEATURED_TEACHER" | "FEATURED_COURSE" | "REVISION" | "STORE_HIGHLIGHT" | "TESTIMONIAL" | "NEWS" | "CTA";

export interface ContentCourse {
  id: string; title: string; teacherId: string; subject: string; grade: string; term: string; studyMode: StudyMode; state: PublishState; description: string; coverImage?: string;
}
export interface CurriculumUnit { id: string; courseId: string; title: string; position: number; state: PublishState; }
export interface LessonAttachment { id: string; name: string; safePreviewLabel: string; }
export interface ContentLesson {
  id: string; courseId: string; unitId: string; title: string; description: string; durationMinutes: number; freePreview: boolean; state: PublishState;
  position: number; attachments: LessonAttachment[]; provider?: VideoProvider; providerVideoId?: string; youtubeUrl?: string; thumbnailUrl?: string; relatedExamId?: string;
}
export interface ContentPackage {
  id: string; courseId: string; title: string; type: PackageType; price: number; accessDays?: number; lessonIds: string[]; includeFutureLessons: boolean; examIds: string[]; fileLabels: string[]; state: PublishState; thumbnailUrl?: string;
}
export interface ExamQuestion { id: string; prompt: string; type: QuestionType; choices?: string[]; correctAnswers?: string[]; }
export interface ContentExam {
  id: string; courseId: string; title: string; kind: ExamKind; durationMinutes?: number; attempts?: number; availableFrom?: string; availableTo?: string; passingScore?: number; resultRelease: ResultReleaseMode; antiCheatThreshold?: number;
  audience: ExamAudience; targetIds: string[]; questions: ExamQuestion[]; state: PublishState; assignmentId?: string;
}
export interface GradeEntry { id: string; examId: string; studentId: string; score?: number; manualReview: boolean; note?: string; }
export interface StoreProduct {
  id: string; type: StoreProductType; title: string; coverAlt: string; imageUrl?: string; teacherOrPublisher: string; grade: string; subject: string; description: string; pageCount?: number; format: string; price?: number; relatedCourseId?: string; relatedPackageId?: string; state: PublishState; safePreviewLabel?: string;
}
export interface WebsiteContentItem {
  id: string; type: WebsiteSectionType; title: string; subtitle?: string; body?: string; imageUrl?: string; order: number; active: boolean; imageAlt?: string; desktopImageAlt?: string; mobileImageAlt?: string; ctaLabel?: string; ctaLink?: string; startsAt?: string; endsAt?: string; teacherId?: string; courseId?: string; storeProductId?: string;
}
