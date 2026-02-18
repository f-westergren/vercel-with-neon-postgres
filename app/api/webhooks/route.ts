import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    if (evt.type === "user.created" || evt.type === "user.updated") {
      const { id: clerkId, email_addresses } = evt.data;
      const email = email_addresses[0]?.email_address;

      if (!email) {
        return new Response("No email on Clerk user", { status: 400 });
      }

      await prisma.user.upsert({
        where: { clerkId },
        update: { email },
        create: { clerkId, email },
      });
    }

    if (evt.type === "user.deleted" && evt.data.id) {
      await prisma.user.deleteMany({
        where: { clerkId: evt.data.id },
      });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error", err);
    return new Response("Webhook failed", { status: 400 });
  }
}
