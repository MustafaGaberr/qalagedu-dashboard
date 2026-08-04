import { getRequestConfig } from "next-intl/server";

import { defaultLocale } from "@/i18n/locales";

export default getRequestConfig(async () => ({
  locale: defaultLocale,
  messages: (await import("@/messages/ar.json")).default,
  timeZone: "Africa/Cairo",
}));
