import { StudentDetailsPage } from "@/features/operations/operations-pages";
export default async function Page({ params }: { params: Promise<{ studentId: string }> }) { const { studentId } = await params; return <StudentDetailsPage studentId={studentId} />; }
