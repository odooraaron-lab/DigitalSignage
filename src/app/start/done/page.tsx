import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { stripe } from '@/lib/stripe';
import { activateFromSession } from '@/lib/activate';
import { venueUrl, APP_URL } from '@/lib/config';

export const dynamic = 'force-dynamic';

export default async function Done({ searchParams }: { searchParams: { session_id?: string } }) {
  let venue = null;
  try {
    if (searchParams.session_id) {
      const session = await stripe().checkout.sessions.retrieve(searchParams.session_id);
      venue = await activateFromSession(session);
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <SiteHead cta={false} />
      <main className="narrow" style={{ paddingTop: 20, paddingBottom: 60 }}>
        {!venue || venue.status !== 'active' ? (
          <>
            <h1 style={{ fontSize: 36 }}>Almost there</h1>
            <p>We’re confirming your payment. Your dashboard link will arrive by email in the next few minutes.</p>
            <p className="muted">If nothing arrives within 15 minutes, check your spam folder, then reply to any of our emails.</p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 36 }}>{venue.venue_name} is ready</h1>
            <p>We’ve emailed your dashboard link to {venue.owner_email} too, so you can open it on your phone.</p>
            <div className="card stack">
              <div>
                <h3>1. Add your first adverts</h3>
                <p className="muted small">Upload images or video, or make a special with a headline and price.</p>
                <a className="btn block" href={venueUrl(venue.slug, `/enter?t=${venue.owner_token}`)}>Open your dashboard</a>
              </div>
              <div>
                <h3>2. Connect your TVs</h3>
                <p className="muted small">In each TV’s web browser go to the address below. It shows a 6-digit code: type it into your dashboard under “Connect a TV”.</p>
                <code style={{ fontSize: 22 }}>{APP_URL.replace(/^https?:\/\//, '')}/tv</code>
              </div>
            </div>
          </>
        )}
      </main>
      <SiteFoot />
    </>
  );
}
