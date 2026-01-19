import Image from "next/image";
import Link from "next/link";
import { checkDbConnection } from "./db";

export default async function Home() {
  const result = await checkDbConnection();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 md:max-w-lg md:px-0 lg:max-w-xl">
        <p>hallo!</p>
      </div>
    </div>
  );
}
