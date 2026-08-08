import type { AttendanceRecord, AttendanceScanEvent, CenterEnrollment, CenterEnrollmentRequest, CenterGroup, CenterSession, EnrollmentBarcode, GuardianMessageDraft, OperationalAuditEntry, StaffStudent } from "@/types/operations";

export const operationalTerm = { id: "term_2026_1", label: "الفصل الدراسي الأول 2026/2027" } as const;
export const operationalTeachers = [{ id: "teacher_ahmed", name: "مستر محمد الجمل", subject: "رياضيات ثانوي" }, { id: "teacher_mona", name: "مستر مصطفى مجدي", subject: "العلوم المتكاملة" }] as const;
export const operationalCourses = [{ id: "course_math", name: "رياضيات الثانوية", teacherId: "teacher_ahmed" }, { id: "course_physics", name: "فيزياء الثانوية", teacherId: "teacher_mona" }] as const;
export const initialStudents: StaffStudent[] = [
  { id: "student_omar", code: "ST-1042", name: "عمر خالد", grade: "الثالثة الثانوية", phone: "01010000001", guardian: { id: "guardian_omar", name: "خالد السيد", phone: "201010000001" }, active: true, onlineAccess: "NOT_LINKED" },
  { id: "student_mariam", code: "ST-1043", name: "مريم سمير", grade: "الثالثة الثانوية", guardian: { id: "guardian_mariam", name: "سمير محمد", phone: "201010000002", secondaryPhone: "201010000012" }, active: true, onlineAccess: "SEPARATE_ACCESS" },
  { id: "student_youssef", code: "ST-1044", name: "يوسف أحمد", grade: "الثالثة الثانوية", guardian: { id: "guardian_youssef", name: "أحمد فؤاد" }, active: true, onlineAccess: "NOT_LINKED" },
  { id: "student_salma", code: "ST-1051", name: "سلمى حسين", grade: "الثالثة الثانوية", guardian: { id: "guardian_salma", name: "حسين علي", phone: "201010000003" }, active: true, onlineAccess: "NOT_LINKED" },
  { id: "student_lina", code: "ST-1054", name: "لينا محمود", grade: "الثالثة الثانوية", guardian: { id: "guardian_lina", name: "محمود إبراهيم", phone: "201010000004" }, active: true, onlineAccess: "NOT_LINKED" },
];
export const initialGroups: CenterGroup[] = [
  { id: "group_math_a", name: "ثالثة ثانوي - أ", teacherId: "teacher_ahmed", courseId: "course_math", termId: operationalTerm.id, grade: "الثالثة الثانوية", active: true, schedule: { days: ["السبت", "الثلاثاء"], startTime: "16:00", durationMinutes: 90, room: "قاعة 2" }, capacity: { limit: 24, enrolled: 2 } },
  { id: "group_math_b", name: "ثالثة ثانوي - ب", teacherId: "teacher_ahmed", courseId: "course_math", termId: operationalTerm.id, grade: "الثالثة الثانوية", active: true, schedule: { days: ["الأحد", "الأربعاء"], startTime: "18:00", durationMinutes: 90, room: "قاعة 3" }, capacity: { limit: 24, enrolled: 1 } },
  { id: "group_physics_c", name: "ثالثة ثانوي - ج", teacherId: "teacher_mona", courseId: "course_physics", termId: operationalTerm.id, grade: "الثالثة الثانوية", active: true, schedule: { days: ["الاثنين", "الخميس"], startTime: "17:00", durationMinutes: 90, room: "قاعة 1" }, capacity: { limit: 20, enrolled: 1 } },
];
export const initialEnrollments: CenterEnrollment[] = [
  { id: "enrollment_omar_math", serial: "CE-2601-1042", studentId: "student_omar", teacherId: "teacher_ahmed", courseId: "course_math", termId: operationalTerm.id, groupId: "group_math_a", status: "ACTIVE", joinedAt: "2026-08-01" },
  { id: "enrollment_mariam_math", serial: "CE-2601-1043", studentId: "student_mariam", teacherId: "teacher_ahmed", courseId: "course_math", termId: operationalTerm.id, groupId: "group_math_a", status: "ACTIVE", joinedAt: "2026-08-01" },
  { id: "enrollment_youssef_math", serial: "CE-2601-1044", studentId: "student_youssef", teacherId: "teacher_ahmed", courseId: "course_math", termId: operationalTerm.id, groupId: "group_math_b", status: "ACTIVE", joinedAt: "2026-08-03" },
  { id: "enrollment_salma_physics", serial: "CE-2601-1051", studentId: "student_salma", teacherId: "teacher_mona", courseId: "course_physics", termId: operationalTerm.id, groupId: "group_physics_c", status: "ACTIVE", joinedAt: "2026-08-02" },
];
export const initialRequests: CenterEnrollmentRequest[] = [{ id: "request_lina", studentId: "student_lina", teacherId: "teacher_ahmed", courseId: "course_math", termId: operationalTerm.id, preferredGroupId: "group_math_a", status: "PENDING_REVIEW", submittedAt: "2026-08-05", history: ["تم استلام الطلب"] }];
export const initialBarcodes: EnrollmentBarcode[] = [{ id: "barcode_omar", enrollmentId: "enrollment_omar_math", value: "QCE128-A7F3-2K91", status: "ACTIVE", issuedAt: "2026-08-01" }, { id: "barcode_mariam", enrollmentId: "enrollment_mariam_math", value: "QCE128-M5D8-7P20", status: "ACTIVE", issuedAt: "2026-08-01" }, { id: "barcode_youssef", enrollmentId: "enrollment_youssef_math", status: "NOT_GENERATED" }, { id: "barcode_salma", enrollmentId: "enrollment_salma_physics", value: "QCE128-S8L4-5V10", status: "REVOKED", issuedAt: "2026-08-02" }];
export const initialSessions: CenterSession[] = [{ id: "session_math_1", groupId: "group_math_a", teacherId: "teacher_ahmed", courseId: "course_math", date: "2026-08-06T16:00", title: "الحصة الأولى", status: "OPEN" }, { id: "session_physics_1", groupId: "group_physics_c", teacherId: "teacher_mona", courseId: "course_physics", date: "2026-08-06T17:00", title: "المراجعة", status: "SCHEDULED" }];
export const initialAttendance: AttendanceRecord[] = [{ id: "attendance_omar", sessionId: "session_math_1", enrollmentId: "enrollment_omar_math", state: "UNMARKED" }, { id: "attendance_mariam", sessionId: "session_math_1", enrollmentId: "enrollment_mariam_math", state: "UNMARKED" }];
export const initialMessages: GuardianMessageDraft[] = [];
export const initialAudit: OperationalAuditEntry[] = [];
export const initialScans: AttendanceScanEvent[] = [];
