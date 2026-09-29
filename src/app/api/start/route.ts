import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { token } from '@/lib/tokens';
import { APP_URL, PRICES, TRIAL_DAYS } from '@/lib/config';
import { slugProblem } from '@/lib/slug';

export const runtime = 'nodejs';

const clean = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const slug = clean(b.slug, 30).toLowerCase();
  const venue = clean(b.venue_name, 60);
  const ownerName = clean(b.owner_name, 60);
  const email = clean(b.owner_email, 120).toLowerCase();
  const plan = b.plan === 'monthly' ? 'monthly' : 'yearly';

  if (!venue || !ownerName) return Response.json({ error: 'Please fill in every name.' }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({ error: 'That email address doesn’t look right.' }, { status: 400 });
  const problem = await slugProblem(slug);
  if (problem) return Response.json({ error: problem }, { status: 409 });
  if (!PRICES[plan].id) return Response.json({ error: 'Payments aren’t set up yet (missing Stripe price).' }, { status: 500 });

  const sql = db();
  await sql`delete from ds_venues where slug = ${slug} and status = 'pending'`;
  try {
    await sql`
      insert into ds_venues (slug, venue_name, owner_name, owner_email, plan, owner_token)
      values (${slug}, ${venue}, ${ownerName}, ${email}, ${plan}, ${token()})`;
  } catch {
    return Response.json({ error: 'That address was just taken. Try another.' }, { status: 409 });
  }

  const product = process.env.HQ_PRODUCT || 'signage';
  let session;
  try {
    session = await stripe().checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: PRICES[plan].id, quantity: 1 }],
    customer_email: email,
    allow_promotion_codes: true,
    metadata: { product, site_slug: slug },
    subscription_data: {
      metadata: { product, site_slug: slug },
      ...(TRIAL_DAYS > 0 ? { trial_period_days: TRIAL_DAYS } : {}),
    },
    success_url: `${APP_URL}/start/done?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/start?cancelled=1`,
    });
  } catch (e: any) {
    // Usually set-up: a wrong price ID, a test-mode price with a live key, or a key without Checkout access.
    console.error('stripe checkout failed', e?.type, e?.code, e?.message);
    await sql`delete from ds_venues where slug = ${slug} and status = 'pending'`;
    return Response.json({ error: `Payment couldn’t start: ${e?.message || 'Stripe error'}` }, { status: 502 });
  }
  await sql`update ds_venues set checkout_session_id = ${session.id} where slug = ${slug}`;
  return Response.json({ url: session.url });
}
