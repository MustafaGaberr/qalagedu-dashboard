export type AppLocale = "ar";
export type TextDirection = "rtl";

export const defaultLocale: AppLocale = "ar";
export const locales = [defaultLocale] as const;

export function getTextDirection(locale: AppLocale): TextDirection {
  void locale;
  return "rtl";
}
