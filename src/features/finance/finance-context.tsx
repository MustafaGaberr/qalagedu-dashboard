"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDashboardWorkspace } from "@/features/dashboard-workspace/workspace-context";
import { useOperations } from "@/features/operations/operations-context";
import { apiRequest } from "@/lib/api/client";
import { toApiError } from "@/lib/api/errors";
import type {
  FreeAccessCode,
  OnlineEntitlement,
  PaidCoupon,
  PaymentDestination,
  PaymentRequest,
} from "@/types/finance";

export type FinancialSummary = {
  from: string | null;
  to: string | null;
  totalRequests: number;
  approvedAmount: number;
  byStatus: Record<string, number>;
};

type Value = {
  payments: PaymentRequest[];
  destinations: PaymentDestination[];
  coupons: PaidCoupon[];
  accessCodes: FreeAccessCode[];
  entitlements: OnlineEntitlement[];
  financialSummary?: FinancialSummary;
  canSeePayment: (item: PaymentRequest) => boolean;
  canSeeEntitlement: (item: OnlineEntitlement) => boolean;
  createDestination: (item: Omit<PaymentDestination, "id">) => string | undefined;
  updateDestination: (id: string, item: Partial<PaymentDestination>) => string | undefined;
  approvePayment: (id: string) => Promise<void>;
  rejectPayment: (id: string, reason: string) => Promise<void>;
  requestPaymentInfo: (id: string, note: string) => Promise<void>;
  createCoupon: (item: Omit<PaidCoupon, "id" | "code" | "teacherId" | "status">) => string | undefined;
  redeemCoupon: (code: string, studentId: string) => string | undefined;
  revokeCoupon: (id: string) => string | undefined;
  createAccessCode: (item: Omit<FreeAccessCode, "id" | "code" | "teacherId" | "status">) => string | undefined;
  redeemAccessCode: (code: string, studentId: string) => string | undefined;
  revokeAccessCode: (id: string) => string | undefined;
  grantAccess: (item: Pick<OnlineEntitlement, "studentId" | "courseId" | "packageId" | "lessonId" | "expiresAt">) => string | undefined;
  revokeAccess: (id: string, reason: string) => string | undefined;
  extendAccess: (id: string, days: number) => string | undefined;
};

const Context = createContext<Value | null>(null);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const ops = useOperations();
  const workspace = useDashboardWorkspace();
  const [payments, setPayments] = useState<PaymentRequest[]>([]);
  const [destinations, setDestinations] = useState<PaymentDestination[]>([]);
  const [coupons, setCoupons] = useState<PaidCoupon[]>([]);
  const [accessCodes, setAccessCodes] = useState<FreeAccessCode[]>([]);
  const [entitlements, setEntitlements] = useState<OnlineEntitlement[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>();
  const issuedCodes = useRef(new Map<string, string>());

  const load = useCallback(async () => {
    const has = (permission: string) => workspace.permissions.includes(permission as never);
    const [paymentRaw, destinationRaw, couponRaw, accessRaw, entitlementRaw, summaryRaw] = await Promise.all([
      has("payments.view") ? apiRequest<any[]>("payment-requests") : [],
      has("payments.view") ? apiRequest<any[]>("payment-destinations") : [],
      has("coupons.manage") ? apiRequest<any[]>("coupons") : [],
      has("access_codes.manage") ? apiRequest<any[]>("access-codes") : [],
      has("student_access.manage") ? apiRequest<any[]>("entitlements") : [],
      has("reports.financial") ? apiRequest<any>("financial-reports/summary") : undefined,
    ]);

    setPayments(paymentRaw.map((item) => ({
      id: item.id,
      reference: item.reference,
      studentId: item.studentId,
      teacherId: item.course?.teacherId ?? item.teacherId,
      courseId: item.courseId,
      packageId: item.packageId,
      destinationId: item.destinationId,
      amount: Number(item.amount),
      method: item.paymentMethod ?? item.method,
      submittedAt: item.submittedAt ?? item.createdAt,
      status: item.status,
      timeline: (item.events ?? []).map((event: any) => ({ id: event.id, at: event.createdAt, action: event.action, note: event.note ?? undefined })),
    })));
    setDestinations(destinationRaw.map((item) => ({
      id: item.id,
      provider: item.provider,
      address: item.value,
      accountHolderLabel: item.accountHolderLabel,
      active: item.isActive,
      teacherId: item.teacherId ?? undefined,
    })));
    setCoupons(couponRaw.map((item) => ({
      id: item.id,
      code: issuedCodes.current.get(item.id) ?? (item.codePrefix ? `${item.codePrefix}…` : "—"),
      studentId: item.intendedStudentId,
      courseId: item.courseId,
      packageId: item.packageId,
      teacherId: item.course?.teacherId,
      expiresAt: item.expiresAt ?? undefined,
      status: item.status,
      redeemedAt: item.redeemedAt ?? undefined,
    })));
    setAccessCodes(accessRaw.map((item) => ({
      id: item.id,
      code: issuedCodes.current.get(item.id) ?? (item.codePrefix ? `${item.codePrefix}…` : "—"),
      type: item.scopeType === "LESSON" ? "LESSON" : item.package?.type === "MONTHLY" ? "MONTHLY" : item.package?.type === "TERM" ? "TERM" : item.package?.type === "FINAL_REVISION" ? "REVISION" : "CUSTOM",
      courseId: item.courseId,
      packageId: item.packageId ?? undefined,
      lessonId: item.lessonId ?? undefined,
      teacherId: item.course?.teacherId,
      assignedStudentId: item.intendedStudentId ?? undefined,
      durationDays: item.durationDays ?? undefined,
      expiresAt: item.fixedExpiresAt ?? undefined,
      permanent: item.validityType === "PERMANENT",
      privateStaffNote: item.internalNotes ?? undefined,
      status: item.status,
      redeemedAt: item.redeemedAt ?? undefined,
    })));
    setEntitlements(entitlementRaw.map((item) => ({
      id: item.id,
      studentId: item.studentId,
      teacherId: item.course?.teacherId,
      courseId: item.courseId,
      packageId: item.packageId ?? undefined,
      lessonId: item.lessonId ?? undefined,
      source: item.sourceType,
      status: item.accessStatus === "SCHEDULED" ? "PENDING" : item.accessStatus,
      startsAt: item.startsAt,
      expiresAt: item.expiresAt ?? undefined,
      sourceReference: item.sourceId ?? item.id,
      revokeReason: item.revocationReason ?? undefined,
    })));
    setFinancialSummary(summaryRaw ? {
      from: summaryRaw.from,
      to: summaryRaw.to,
      totalRequests: summaryRaw.totalRequests,
      approvedAmount: Number(summaryRaw.approvedAmount),
      byStatus: summaryRaw.byStatus,
    } : undefined);
  }, [workspace.permissions]);

  useEffect(() => {
    void load().catch((error) => window.alert(toApiError(error).message));
  }, [load]);

  const refresh = () => { void load().catch((error) => window.alert(toApiError(error).message)); };
  const mutate = (path: string, method: string, body?: unknown) => {
    void apiRequest(path, { method, body }).then(refresh).catch((error) => window.alert(toApiError(error).message));
  };
  const canSeePayment = (item: PaymentRequest) => ops.canSeeTeacher(item.teacherId);
  const canSeeEntitlement = (item: OnlineEntitlement) => ops.canSeeTeacher(item.teacherId);
  const createDestination = (item: Omit<PaymentDestination, "id">) => {
    mutate("payment-destinations", "POST", { teacherId: item.teacherId, provider: item.provider, value: item.address, accountHolderLabel: item.accountHolderLabel, isActive: item.active }); return undefined;
  };
  const updateDestination = (id: string, item: Partial<PaymentDestination>) => {
    mutate(`payment-destinations/${id}`, "PATCH", { provider: item.provider, value: item.address, accountHolderLabel: item.accountHolderLabel, isActive: item.active }); return undefined;
  };
  const reviewPayment = async (path: string, body?: unknown) => {
    try { await apiRequest(path, { method: "POST", body }); await load(); }
    catch (error) { throw new Error(toApiError(error).message); }
  };
  const approvePayment = (id: string) => reviewPayment(`payment-requests/${id}/approve`);
  const rejectPayment = (id: string, reason: string) => reviewPayment(`payment-requests/${id}/reject`, { reason });
  const requestPaymentInfo = (id: string, reason: string) => reviewPayment(`payment-requests/${id}/request-information`, { reason });
  const createCoupon = (item: Omit<PaidCoupon, "id" | "code" | "teacherId" | "status">) => { void apiRequest<{coupon:{id:string};code:string}>("coupons", { method:"POST", body:{ studentId: item.studentId, packageId: item.packageId, expiresAt: item.expiresAt } }).then(async(result)=>{issuedCodes.current.set(result.coupon.id,result.code);await load();}).catch((error)=>window.alert(toApiError(error).message)); return undefined; };
  const redeemCoupon = () => "استرداد الكوبون متاح للطالب فقط؛ لا يوجد endpoint موظف للاسترداد نيابة عنه.";
  const revokeCoupon = (id: string) => { mutate(`coupons/${id}/revoke`, "POST", { reason: "تم الإلغاء من لوحة الموظفين" }); return undefined; };
  const createAccessCode = (item: Omit<FreeAccessCode, "id" | "code" | "teacherId" | "status">) => {
    if (!item.courseId || (!item.lessonId && !item.packageId)) return "اختر كورسًا ودرسًا أو باقة للكود.";
    void apiRequest<{accessCode:{id:string};code:string}>("access-codes", { method:"POST", body:{ courseId: item.courseId, intendedStudentId: item.assignedStudentId, scopeType: item.lessonId ? "LESSON" : "PACKAGE", packageId: item.packageId, lessonId: item.lessonId, validityType: item.permanent ? "PERMANENT" : item.expiresAt ? "FIXED_EXPIRY" : "DURATION_DAYS", durationDays: item.durationDays, fixedExpiresAt: item.expiresAt, internalNotes: item.privateStaffNote } }).then(async(result)=>{issuedCodes.current.set(result.accessCode.id,result.code);await load();}).catch((error)=>window.alert(toApiError(error).message)); return undefined;
  };
  const redeemAccessCode = () => "استرداد كود الوصول متاح للطالب فقط؛ لا يوجد endpoint موظف للاسترداد نيابة عنه.";
  const revokeAccessCode = (id: string) => { mutate(`access-codes/${id}/revoke`, "POST", { reason: "تم الإلغاء من لوحة الموظفين" }); return undefined; };
  const grantAccess = (item: Pick<OnlineEntitlement, "studentId" | "courseId" | "packageId" | "lessonId" | "expiresAt">) => { mutate("entitlements/grant", "POST", { ...item, scopeType: item.lessonId ? "LESSON" : item.packageId ? "PACKAGE" : "COURSE" }); return undefined; };
  const revokeAccess = (id: string, reason: string) => { mutate(`entitlements/${id}/revoke`, "POST", { reason }); return undefined; };
  const extendAccess = (id: string, days: number) => { const item = entitlements.find((entry) => entry.id === id); const base = item?.expiresAt ? new Date(item.expiresAt).getTime() : Date.now(); mutate(`entitlements/${id}/extend`, "POST", { expiresAt: new Date(base + days * 86_400_000).toISOString() }); return undefined; };

  return <Context.Provider value={{ payments, destinations, coupons, accessCodes, entitlements, financialSummary, canSeePayment, canSeeEntitlement, createDestination, updateDestination, approvePayment, rejectPayment, requestPaymentInfo, createCoupon, redeemCoupon, revokeCoupon, createAccessCode, redeemAccessCode, revokeAccessCode, grantAccess, revokeAccess, extendAccess }}>{children}</Context.Provider>;
}

export function useFinance() {
  const value = useContext(Context);
  if (!value) throw new Error("useFinance must be used within FinanceProvider");
  return value;
}
