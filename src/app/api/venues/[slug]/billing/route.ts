import { getVenue, isOwner } from '@/lib/venues';
import { stripe } from '@/lib/stripe';
import { venueUrl } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Sends the owner to Stripe's billing page (change card, switch plan, cancel). */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const v = await getVenue(params.slug);
  if (!v || !isOwner(v) || !v.stripe_customer_id) {
    return new Response('Open your dashboard link from your email first.', { status: 403 });
  }
  const portal = await stripe().billingPortal.sessions.create({
    customer: v.stripe_customer_id,
    return_url: venueUrl(v.slug, '/dashboard'),
  });
  return Response.redirect(portal.url, 303);
}
