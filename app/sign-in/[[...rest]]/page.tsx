import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid min-h-screen w-screen place-items-center">
      <SignIn forceRedirectUrl="/dashboard" />
    </div>
  );
}
