export type ApiErrorPayload = { code?: string; message?: string | string[]; errors?: Record<string, string[]> };

const codeMessages: Record<string, string> = {
  INVALID_CREDENTIALS: "بيانات الدخول غير صحيحة.", SESSION_INVALID: "انتهت الجلسة. سجّل الدخول مرة أخرى.", USER_SUSPENDED: "هذا الحساب موقوف.",
  ROLE_REQUIRED: "الدور الحالي لا يسمح بهذه العملية.", INVALID_ASSIGNMENT: "مساحة العمل المختارة لم تعد متاحة.", FORBIDDEN: "لا تملك صلاحية تنفيذ هذه العملية.",
  AUTHENTICATION_REQUIRED: "انتهت الجلسة. سجّل الدخول مرة أخرى.", CSRF_ORIGIN_REJECTED: "تعذر التحقق من مصدر الطلب. أعد تحميل الصفحة.", CSRF_TOKEN_INVALID: "انتهت صلاحية حماية الجلسة. أعد تحميل الصفحة.",
  PERMISSION_DENIED: "لا تملك صلاحية تنفيذ هذه العملية.", SCOPE_DENIED: "العنصر خارج نطاق مساحة العمل الحالية.", TEACHER_SCOPE_REQUIRED: "اختر مساحة عمل المدرس أولًا.",
  VALIDATION_ERROR: "راجع البيانات المدخلة.", NOT_FOUND: "العنصر المطلوب غير موجود.", TOO_MANY_REQUESTS: "محاولات كثيرة؛ انتظر قليلًا ثم حاول مجددًا.",
};

export class ApiError extends Error {
  constructor(public readonly status = 0, public readonly code: string = "BACKEND_UNAVAILABLE", payload?: ApiErrorPayload) {
    const raw = Array.isArray(payload?.message) ? payload.message.join("، ") : payload?.message;
    super(codeMessages[payload?.code ?? code] ?? (status === 0 ? "تعذر الاتصال بالخادم." : status === 401 ? "انتهت الجلسة. سجّل الدخول مرة أخرى." : status === 403 ? "لا تملك صلاحية تنفيذ هذه العملية." : status === 404 ? "العنصر المطلوب غير موجود." : status === 409 ? "تعارضت العملية مع الحالة الحالية للعنصر." : status === 422 || status === 400 ? "راجع البيانات المدخلة." : status === 429 ? "محاولات كثيرة؛ انتظر قليلًا ثم حاول مجددًا." : status >= 500 ? "الخادم غير متاح حاليًا. حاول لاحقًا." : raw ?? "تعذر إتمام العملية."));
    this.name = "ApiError";
  }
}

export const toApiError = (error: unknown) => error instanceof ApiError ? error : new ApiError();
