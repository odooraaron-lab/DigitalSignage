import { db } from '@/lib/db';
import { getVenue } from '@/lib/venues';
import { verifyHQRequest } from '@/lib/hq';
import { welcomeEmail } from '@/lib/email';

export const runtime = 'nodejs';

/** Buttons in the admin (Sites page) land here. */
export async function POST(req: Request) {
  const msg = await verifyHQRequest(req);
  if (!msg) return new Response('Unauthorized', { status: 401 });
  const v = await getVenue(msg.slug);
  if (!v) return new Response('No such venue', { status: 404 });
  const sql = db();

  switch (msg.action) {
    case 'disable':
      await sql`update ds_venues set status = 'disabled' where slug = ${v.slug}`;
      break;
    case 'enable':
      await sql`update ds_venues set status = 'active' where slug = ${v.slug} and status = 'disabled'`;
      break;
    case 'extend':
      // Subscriptions renew through Stripe, so there's nothing to extend here.
      return Response.json({ ok: true, note: 'Subscription product: extend in Stripe instead.' });
    case 'resend_email':
      await welcomeEmail(v);
      break;
    default:
      return new Response('Unknown action', { status: 400 });
  }
  return Response.json({ ok: true, slug: v.slug });
}
