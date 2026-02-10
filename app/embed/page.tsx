/**
 * Minimal page meant to be loaded inside an iframe (e.g. from /iframe).
 * When Clerk is configured with SameSite=None, this route can read the
 * same Clerk session as the parent.
 */
import { auth } from "@clerk/nextjs/server";

export default async function EmbedPage() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 bg-zinc-100 p-6 dark:bg-zinc-800">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Embedded content
      </h2>
      {userId ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Session is available in iframe (userId: {userId.slice(0, 12)}…)
        </p>
      ) : (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          No session in iframe. Enable SameSite=None for Clerk cookies (e.g. in
          Clerk Dashboard) for auth to work inside iframes.
        </p>
      )}
    </div>
  );
}
