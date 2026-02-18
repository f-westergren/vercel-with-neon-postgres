import { CreateOrganization } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-8 md:px-0">
        <h1 className="mb-6 text-2xl font-semibold">Create organization</h1>
        <CreateOrganization
          afterCreateOrganizationUrl="/dashboard"
          skipInvitationScreen={false}
        />
      </div>
    </div>
  );
}
