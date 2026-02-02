import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    console.log('eyoo', evt.data)
    
    if (evt.type === 'user.created') {
      const { id: clerkId, email_addresses } = evt.data;
      const email = email_addresses[0]?.email_address;

      if (!email) {
        return new Response('No Email', { status: 400 });
      }

      await prisma.user.create({
        data: { clerkId, email }
      })
    }
    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Webhook error', err);
    return new Response('Webhook failed', { status: 400 })
  }
}
