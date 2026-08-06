"use client";

import { useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmationDialog({ open, title, description, confirmLabel = "تأكيد", pendingLabel = "جارٍ تنفيذ الإجراء…", destructive = false, onOpenChange, onConfirm }: { open: boolean; title: string; description: string; confirmLabel?: string; pendingLabel?: string; destructive?: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void | Promise<void> }) {
  const [pending, setPending] = useState(false);
  const pendingRef = useRef(false);
  const [error, setError] = useState("");
  const trigger = useRef<HTMLElement | null>(null);
  const handleOpenChange = (next: boolean) => { if (pending) return; if (!next) trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setError(""); onOpenChange(next); };
  const confirm = async () => { if (pendingRef.current) return; pendingRef.current = true; setPending(true); setError(""); try { await onConfirm(); pendingRef.current = false; setPending(false); onOpenChange(false); requestAnimationFrame(() => trigger.current?.focus()); } catch (cause) { pendingRef.current = false; setPending(false); setError(cause instanceof Error ? cause.message : "تعذر تنفيذ الإجراء. حاول مرة أخرى."); } };
  return <Dialog.Root open={open} onOpenChange={handleOpenChange}><Dialog.Portal><Dialog.Backdrop className="fixed inset-0 z-50 bg-black/30" /><Dialog.Popup aria-busy={pending} className="fixed start-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card p-5 shadow-xl"><Dialog.Title className="text-base font-bold">{title}</Dialog.Title><Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">{description}</Dialog.Description>{error && <p role="alert" className="mt-3 rounded-md bg-destructive/10 p-2 text-sm text-destructive">{error}</p>}<div className="mt-5 flex flex-wrap gap-2"><Button variant="outline" disabled={pending} onClick={() => handleOpenChange(false)}>إلغاء</Button><Button variant={destructive ? "destructive" : "default"} disabled={pending} onClick={confirm}>{pending ? <><Loader2 className="size-4 animate-spin" aria-hidden="true" />{pendingLabel}</> : confirmLabel}</Button></div></Dialog.Popup></Dialog.Portal></Dialog.Root>;
}
