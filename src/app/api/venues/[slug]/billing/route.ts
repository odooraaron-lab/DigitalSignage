import { getVenue, isOwner } from '@/lib/venues';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { venueUrl } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Sends the owner to Stripe's billing page (change card, switch plan, cancel). */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const v = await getVenue(params.slug);
  if (!v || !isOwner(v)) return new Response('Open your dashboard link from your email first.', { status: 403 });

  // The customer ID is saved at sign-up. If it's missing, find it from the subscription or the checkout, and save it.
  let customer = v.stripe_customer_id;
  try {
    if (!customer && v.stripe_subscription_id) {
      const sub = await stripe().subscriptions.retrieve(v.stripe_subscription_id);
      customer = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
    }
    if (!customer && v.checkout_session_id) {
      const s = await stripe().checkout.sessions.retrieve(v.checkout_session_id);
      customer = typeof s.customer === 'string' ? s.customer : s.customer?.id ?? null;
      const sub = typeof s.subscription === 'string' ? s.subscription : s.subscription?.id ?? null;
      if (sub && !v.stripe_subscription_id) await db()`update ds_venues set stripe_subscription_id = ${sub} where slug = ${v.slug}`;
    }
    if (customer && customer !== v.stripe_customer_id) await db()`update ds_venues set stripe_customer_id = ${customer} where slug = ${v.slug}`;
  } catch (e) {
    console.error('billing: customer lookup failed', v.slug, e);
  }
  if (!customer) return new Response('We couldn’t find a subscription for this venue. Please reply to your welcome email and we’ll sort it out.', { status: 404 });

  try {
    const portal = await stripe().billingPortal.sessions.create({ customer, return_url: venueUrl(v.slug, '/dashboard') });
    return Response.redirect(portal.url, 303);
  } catch (e: any) {
    // Most often: the Customer portal hasn't been turned on in Stripe (Settings → Billing → Customer portal).
    console.error('billing portal failed', v.slug, e?.message);
    return new Response(`Billing page unavailable: ${e?.message || 'Stripe error'}`, { status: 502 });
  }
}
