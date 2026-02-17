import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="grid w-screen place-item-center"><SignIn forceRedirectUrl='/dashboard' /></div>
}