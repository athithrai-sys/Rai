import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirects / to /nl (default locale) and keeps the locale prefix in sync.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and static files (anything with a dot)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
