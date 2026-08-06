import { ScannerPage } from "@/features/operations/operations-pages";
export default async function Page({ params }: { params: Promise<{ sessionId: string }> }) { const { sessionId } = await params; return <ScannerPage sessionId={sessionId} />; }
