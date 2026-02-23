import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "../next-intl";
import type { NextRequest } from "next/server";
import { updateSession } from "@src/lib/auth/session";

export default async function proxy(request: NextRequest) {
  await updateSession(request);
  // Use next-intl's middleware to handle locales
  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
  });

  // Run intl middleware and get its response
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Match all paths except API/static
};
