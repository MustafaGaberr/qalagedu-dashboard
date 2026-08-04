import type { Metadata } from "next";

import { AccessDeniedState } from "@/components/shared/access-denied-state";

export const metadata: Metadata = {
  title: "غير مصرح",
};

export default function AccessDeniedPage() {
  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <AccessDeniedState />
      </div>
    </main>
  );
}
