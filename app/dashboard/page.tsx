import { OrganizationProfile } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 md:max-w-lg md:px-0 lg:max-w-xl">
        <p>This is the dashboard ya'll!</p>
        <OrganizationProfile />
      </div>
    </div>
  );
}
