export type PaymentStatus = "AWAITING_TRANSFER" | "PENDING_REVIEW" | "APPROVED" | "REJECTED" | "REQUIRES_INFORMATION" | "CANCELLED";
export type PaymentMethod = "MOBILE_WALLET" | "INSTAPAY" | "CENTER_CASH";
export type DestinationProvider = "VODAFONE_CASH" | "ORANGE_MONEY" | "ETISALAT_CASH" | "WE" | "INSTAPAY";
export type CouponStatus = "ACTIVE" | "REDEEMED" | "EXPIRED" | "REVOKED";
export type AccessCodeStatus = CouponStatus;
export type AccessCodeType = "LESSON" | "MONTHLY" | "TERM" | "REVISION" | "CUSTOM";
export type EntitlementStatus = "ACTIVE" | "PENDING" | "EXPIRED" | "REVOKED";
export type EntitlementSource = "ONLINE_PAYMENT" | "PAID_COUPON" | "FREE_ACCESS_CODE" | "TEACHER_MANUAL_GRANT" | "ASSISTANT_MANUAL_GRANT" | "ADMIN_GRANT";

export interface PaymentTimelineEvent { id: string; at: string; action: string; note?: string; }
export interface PaymentDestination { id: string; provider: DestinationProvider; address: string; accountHolderLabel: string; active: boolean; teacherId?: string; }
export interface PaymentRequest { id: string; reference: string; studentId: string; teacherId: string; courseId: string; packageId: string; destinationId?: string; amount: number; method: PaymentMethod; submittedAt: string; status: PaymentStatus; timeline: PaymentTimelineEvent[]; }
export interface PaidCoupon { id: string; code: string; studentId: string; courseId: string; packageId: string; teacherId: string; expiresAt?: string; status: CouponStatus; redeemedAt?: string; }
export interface FreeAccessCode { id: string; code: string; type: AccessCodeType; courseId: string; packageId?: string; lessonId?: string; teacherId: string; assignedStudentId?: string; durationDays?: number; expiresAt?: string; permanent: boolean; privateStaffNote?: string; status: AccessCodeStatus; redeemedAt?: string; }
export interface OnlineEntitlement { id: string; studentId: string; teacherId: string; courseId: string; packageId?: string; lessonId?: string; source: EntitlementSource; status: EntitlementStatus; startsAt: string; expiresAt?: string; sourceReference: string; revokeReason?: string; }
