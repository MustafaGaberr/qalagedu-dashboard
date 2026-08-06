import { CourseDetailsPage } from "@/features/content/courses-pages";

export default async function CourseDetailsRoutePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return <CourseDetailsPage courseId={courseId} />;
}
