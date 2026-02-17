import { auth } from '@clerk/nextjs/server';

export default async function ExamplePage() {
  const authResult = await auth();

  console.log('===============================');
  console.log('userId', authResult.userId);
  console.log('orgId', authResult.orgId);

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Example Page</h1>
        <p className="text-muted-foreground">
          Auth result from <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded text-sm">auth()</code>:
        </p>
        <div className="rounded-lg border bg-card p-4 font-[family-name:var(--font-geist-mono)] text-sm space-y-2">
          <p>
            <span className="text-muted-foreground">userId:</span>{' '}
            <span className="font-medium">{authResult.userId ?? '(signed out)'}</span>
          </p>
          <p>
            <span className="text-muted-foreground">orgId:</span>{' '}
            <span className="font-medium">{authResult.orgId ?? '(none)'}</span>
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Check the server console (terminal) for the same values logged there.
        </p>
      </main>
    </div>
  );
}
