import type { FreeAccessCode, OnlineEntitlement, PaidCoupon, PaymentDestination, PaymentRequest } from "@/types/finance";

export const initialPaymentDestinations: PaymentDestination[] = [
  { id: "destination_wallet_ahmed", provider: "VODAFONE_CASH", address: "01000000000", accountHolderLabel: "حساب أ. أحمد عبد الرحمن", active: true, teacherId: "teacher_ahmed" },
  { id: "destination_instapay_system", provider: "INSTAPAY", address: "qalagedu@instapay", accountHolderLabel: "حساب المنصة المؤقت", active: true },
];
export const initialPayments: PaymentRequest[] = [
  { id: "payment_1", reference: "PAY-260901", studentId: "student_omar", teacherId: "teacher_ahmed", courseId: "course_math", packageId: "package_math_term", destinationId: "destination_wallet_ahmed", amount: 850, method: "MOBILE_WALLET", submittedAt: "2026-09-01T11:30:00", status: "PENDING_REVIEW", timeline: [{ id: "pay-event-1", at: "2026-09-01T11:30:00", action: "REQUEST_SUBMITTED", note: "طلب تحويل قيد المراجعة؛ المرفق لا يثبت الدفع." }] },
  { id: "payment_2", reference: "PAY-260902", studentId: "student_mariam", teacherId: "teacher_ahmed", courseId: "course_math", packageId: "package_math_term", destinationId: "destination_wallet_ahmed", amount: 850, method: "MOBILE_WALLET", submittedAt: "2026-09-02T12:00:00", status: "PENDING_REVIEW", timeline: [{ id: "pay-event-2", at: "2026-09-02T12:00:00", action: "REQUEST_SUBMITTED" }] },
  { id: "payment_3", reference: "PAY-260903", studentId: "student_omar", teacherId: "teacher_ahmed", courseId: "course_math", packageId: "package_math_term", destinationId: "destination_instapay_system", amount: 850, method: "INSTAPAY", submittedAt: "2026-09-03T12:00:00", status: "PENDING_REVIEW", timeline: [{ id: "pay-event-3", at: "2026-09-03T12:00:00", action: "REQUEST_SUBMITTED" }] },
  { id: "payment_4", reference: "PAY-260904", studentId: "student_salma", teacherId: "teacher_mona", courseId: "course_physics", packageId: "package_physics_pending", amount: 700, method: "INSTAPAY", submittedAt: "2026-09-04T12:00:00", status: "AWAITING_TRANSFER", timeline: [{ id: "pay-event-4", at: "2026-09-04T12:00:00", action: "REQUEST_CREATED" }] },
];
export const initialCoupons: PaidCoupon[] = [];
export const initialAccessCodes: FreeAccessCode[] = [];
export const initialEntitlements: OnlineEntitlement[] = [];
