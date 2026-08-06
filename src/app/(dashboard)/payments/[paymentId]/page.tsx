import { PaymentDetailsPage } from "@/features/finance/payments-pages";
export default async function PaymentDetailsRoutePage({ params }: { params: Promise<{ paymentId: string }> }) { const { paymentId } = await params; return <PaymentDetailsPage paymentId={paymentId} />; }
