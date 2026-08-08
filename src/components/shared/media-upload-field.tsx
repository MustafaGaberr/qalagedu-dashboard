"use client";

import Image from "next/image";
import { ImagePlusIcon, LoaderCircleIcon } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api/client";
import { toApiError } from "@/lib/api/errors";

type MediaCategory = "WEBSITE" | "BRAND" | "TEACHER" | "COURSE" | "LESSON" | "PACKAGE" | "STORE_PRODUCT";

export function MediaUploadField({
  label,
  category,
  value,
  altText,
  onChange,
}: {
  label: string;
  category: MediaCategory;
  value?: string;
  altText?: string;
  onChange: (url: string) => void;
}) {
  const id = useId();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("category", category);
      form.append("altText", altText || label);
      form.append("file", file);
      const asset = await apiRequest<{ url: string }>("media/upload", { method: "POST", body: form });
      onChange(asset.url);
    } catch (reason) {
      setError(toApiError(reason).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2 rounded-lg border bg-muted/20 p-3">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">{label}</label>
        <Button size="sm" variant="outline" disabled={uploading} render={<label htmlFor={id} />} nativeButton={false}>
          {uploading ? <LoaderCircleIcon className="animate-spin" /> : <ImagePlusIcon />}
          {uploading ? "جارٍ الرفع…" : value ? "استبدال الصورة" : "رفع صورة"}
        </Button>
        <input id={id} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="sr-only" onChange={(event) => void upload(event.target.files?.[0])} />
      </div>
      {value ? <div className="relative aspect-[16/7] max-w-sm overflow-hidden rounded-md border bg-card"><Image src={value} alt={altText || label} fill sizes="384px" className="object-cover" unoptimized /></div> : <p className="text-xs text-muted-foreground">PNG أو JPG أو WebP أو AVIF، بحد أقصى 8 ميجابايت.</p>}
      {error ? <p role="alert" className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
