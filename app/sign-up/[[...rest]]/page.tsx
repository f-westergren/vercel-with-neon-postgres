import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className="grid w-screen place-item-center"><SignUp forceRedirectUrl='/dashboard' /></div>
}