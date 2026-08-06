export type EnrollmentRequestStatus = "PENDING_REVIEW" | "CONTACTED" | "WAITLISTED" | "APPROVED" | "ASSIGNED" | "REJECTED" | "CANCELLED" | "SUSPENDED";
export type EnrollmentStatus = "ACTIVE" | "SUSPENDED" | "CANCELLED";
export type BarcodeStatus = "NOT_GENERATED" | "ACTIVE" | "REVOKED" | "REISSUED" | "EXPIRED";
export type SessionStatus = "SCHEDULED" | "OPEN" | "REVIEW" | "CLOSED" | "CANCELLED";
export type AttendanceState = "UNMARKED" | "PRESENT" | "LATE" | "ABSENT" | "EXCUSED";
export type GuardianMessageState = "NOT_PREPARED" | "READY" | "OPENED_IN_WHATSAPP" | "MARKED_SENT" | "SKIPPED" | "FAILED";

export interface GuardianContact { id: string; name: string; phone?: string; secondaryPhone?: string; optedOut?: boolean; }
export interface StaffStudent { id: string; code: string; name: string; grade: string; phone?: string; guardian: GuardianContact; active: boolean; onlineAccess: "NOT_LINKED" | "SEPARATE_ACCESS"; }
export interface StudentTeacherRelationship { studentId: string; teacherId: string; courseId: string; termId: string; }
export interface CenterEnrollmentRequest { id: string; studentId: string; teacherId: string; courseId: string; termId: string; preferredGroupId?: string; status: EnrollmentRequestStatus; submittedAt: string; reason?: string; history: string[]; }
export interface CenterEnrollment { id: string; serial: string; studentId: string; teacherId: string; courseId: string; termId: string; groupId?: string; status: EnrollmentStatus; joinedAt: string; }
export interface GroupSchedule { days: string[]; startTime: string; durationMinutes: number; room: string; }
export interface GroupCapacity { limit: number; enrolled: number; }
export interface CenterGroup { id: string; name: string; teacherId: string; courseId: string; termId: string; grade: string; active: boolean; schedule: GroupSchedule; capacity: GroupCapacity; }
export interface EnrollmentBarcode { id: string; enrollmentId: string; value?: string; status: BarcodeStatus; issuedAt?: string; }
export interface BarcodeLifecycleEvent { id: string; barcodeId: string; action: "GENERATED" | "REVOKED" | "REISSUED"; at: string; }
export interface CenterSession { id: string; groupId: string; teacherId: string; courseId: string; date: string; title?: string; status: SessionStatus; maxScore?: number; }
export interface AttendanceRecord { id: string; sessionId: string; enrollmentId: string; state: AttendanceState; scannedAt?: string; score?: number; note?: string; manual?: boolean; }
export interface AttendanceScanEvent { id: string; sessionId: string; barcodeValue: string; outcome: "SUCCESS" | "DUPLICATE" | "INVALID" | "REVOKED" | "WRONG_SCOPE" | "OTHER_GROUP" | "UNEXPECTED" | "CLOSED"; at: string; enrollmentId?: string; }
export interface CenterSessionAssessment { sessionId: string; maxScore?: number; }
export interface GuardianMessageDraft { id: string; sessionId: string; enrollmentId: string; text: string; state: GuardianMessageState; reason?: string; }
export interface GuardianMessageAction { id: string; draftId: string; action: "OPENED" | "SENT" | "SKIPPED" | "FAILED"; at: string; }
export interface OperationalAuditEntry { id: string; action: string; actorId: string; actorRole: string; teacherId?: string; targetId: string; at: string; metadata: string; }
