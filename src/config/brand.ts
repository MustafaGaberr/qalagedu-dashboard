function requiredPublicValue(name: string, value: string | undefined): string {
  const normalized = value?.trim();
  if (!normalized) throw new Error(`${name} is required`);
  return normalized;
}

function requiredPublicOrigin(name: string, value: string | undefined): string {
  const configuredValue = requiredPublicValue(name, value);
  const url = new URL(configuredValue);
  if (url.origin !== configuredValue) {
    throw new Error(`${name} must be an origin without a path or trailing slash`);
  }
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error(`${name} must use HTTPS in production`);
  }
  return url.origin;
}

export const brandConfig = {
  name: requiredPublicValue(
    "NEXT_PUBLIC_BRAND_NAME",
    process.env.NEXT_PUBLIC_BRAND_NAME,
  ),
  dashboardName: requiredPublicValue(
    "NEXT_PUBLIC_DASHBOARD_NAME",
    process.env.NEXT_PUBLIC_DASHBOARD_NAME,
  ),
  shortName: requiredPublicValue(
    "NEXT_PUBLIC_BRAND_SHORT_NAME",
    process.env.NEXT_PUBLIC_BRAND_SHORT_NAME,
  ),
  description: requiredPublicValue(
    "NEXT_PUBLIC_BRAND_DESCRIPTION",
    process.env.NEXT_PUBLIC_BRAND_DESCRIPTION,
  ),
  url: requiredPublicOrigin(
    "NEXT_PUBLIC_APP_URL",
    process.env.NEXT_PUBLIC_APP_URL,
  ),
  centerName: requiredPublicValue(
    "NEXT_PUBLIC_CENTER_NAME",
    process.env.NEXT_PUBLIC_CENTER_NAME,
  ),
  markSrc: requiredPublicValue(
    "NEXT_PUBLIC_BRAND_LOGO_SRC",
    process.env.NEXT_PUBLIC_BRAND_LOGO_SRC,
  ),
  support: {
    email: requiredPublicValue(
      "NEXT_PUBLIC_SUPPORT_EMAIL",
      process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    ),
    phone: requiredPublicValue(
      "NEXT_PUBLIC_SUPPORT_PHONE",
      process.env.NEXT_PUBLIC_SUPPORT_PHONE,
    ),
    whatsapp: requiredPublicValue(
      "NEXT_PUBLIC_SUPPORT_WHATSAPP",
      process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP,
    ),
  },
} as const;
