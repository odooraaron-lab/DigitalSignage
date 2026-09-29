import type Stripe from 'stripe';
import { db } from './db';
import { getVenue, type Venue } from './venues';
import { welcomeEmail } from './email';
import { reportToHQ } from './hq';
import { venueUrl } from './config';

const idOf = (x: string | { id: string } | null | undefined) => (typeof x === 'string' ? x : x?.id ?? null);

/**
 * Turns a paid checkout into a live venue. Safe to call twice (webhook + thank-you page):
 * only the first call sends the welcome email.
 */
export async function activateFromSession(session: Stripe.Checkout.Session): Promise<Venue | null> {
  const slug = session.metadata?.site_slug;
  if (!slug || session.status !== 'complete') return null;
  const rows = await db()`
    update ds_venues set status = 'active', activated_at = now(),
      stripe_customer_id = ${idOf(session.customer as any)}, stripe_subscription_id = ${idOf(session.subscription as any)}
    where slug = ${slug} and checkout_session_id = ${session.id} and status = 'pending'
    returning *`;
  if (rows.length) {
    const v = rows[0] as Venue;
    await welcomeEmail(v);
    await reportToHQ({
      type: 'site.upsert', slug: v.slug, url: venueUrl(v.slug), owner_email: v.owner_email,
      owner_name: v.owner_name, status: 'live', order_id: session.id,
    });
  }
  return getVenue(slug);
}

/** Keeps the venue in step with its Stripe subscription. */
export async function syncSubscription(sub: Stripe.Subscription) {
  const live = ['active', 'trialing', 'past_due'].includes(sub.status); // past_due = Stripe is still retrying
  const rows = await db()`
    update ds_venues set status = ${live ? 'active' : 'lapsed'}
    where stripe_subscription_id = ${sub.id} and status in ('active', 'lapsed')
    returning slug`;
  for (const r of rows) {
    await reportToHQ({ type: 'site.upsert', slug: r.slug, status: live ? 'live' : 'expired' });
  }
}
