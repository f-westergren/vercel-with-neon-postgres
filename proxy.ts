import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/embed(.*)",
  "/api/webhooks(.*)",
]);

/**
 * Proxies requests to /__clerk/* to Clerk's Frontend API.
 * Required headers: Clerk-Proxy-Url, Clerk-Secret-Key, X-Forwarded-For.
 * @see https://clerk.com/docs/guides/dashboard/dns-domains/proxy-fapi
 */
function proxyToClerkFrontendApi(req: NextRequest): NextResponse | null {
  if (!req.nextUrl.pathname.startsWith("/__clerk")) {
    return null;
  }

  const proxyHeaders = new Headers(req.headers);
  proxyHeaders.set(
    "Clerk-Proxy-Url",
    process.env.NEXT_PUBLIC_CLERK_PROXY_URL ?? ""
  );
  proxyHeaders.set("Clerk-Secret-Key", process.env.CLERK_SECRET_KEY ?? "");

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  proxyHeaders.set("X-Forwarded-For", clientIp);

  const proxyUrl = new URL(req.url);
  proxyUrl.host = "frontend-api.clerk.dev";
  proxyUrl.port = "443";
  proxyUrl.protocol = "https";
  proxyUrl.pathname = proxyUrl.pathname.replace(/^\/__clerk\/?/, "/") || "/";

  return NextResponse.rewrite(proxyUrl, {
    request: {
      headers: proxyHeaders,
    },
  });
}

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  const proxyResponse = proxyToClerkFrontendApi(req);
  if (proxyResponse) {
    return proxyResponse;
  }
  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc|__clerk)(.*)",
  ],
};
