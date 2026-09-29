import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getVenue, isOwner, listSlides, listScreens } from '@/lib/venues';
import { APP_URL, PRODUCT, LIMITS } from '@/lib/config';
import { Dashboard } from '@/components/Dashboard';
import { LinkRequest } from '@/components/LinkRequest';
import { Logo, Wordmark } from '@/components/SiteChrome';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: `Dashboard - ${PRODUCT}`, robots: { index: false } };

export default async function DashboardPage({ params }: { params: { slug: string } }) {
  const v = await getVenue(params.slug);
  if (!v || v.status === 'pending') notFound();
  const owner = isOwner(v);
  const head = (
    <header className="ds-top">
      <div className="wrap ds-top-in">
        <a className="logo" href={APP_URL}><Logo size={30} /><Wordmark /></a>
        <span className="ds-venue">{v.venue_name}</span>
      </div>
    </header>
  );

  if (v.status === 'disabled') {
    return <>{head}<main className="narrow" style={{ paddingTop: 40 }}><h1 style={{ fontSize: 34 }}>This account is paused</h1><p>Please get in touch with us to switch it back on.</p></main></>;
  }
  if (!owner) {
    return (
      <>{head}
        <main className="narrow" style={{ paddingTop: 40 }}>
          <h1 style={{ fontSize: 34 }}>Open your dashboard</h1>
          <p className="muted">For security, open the dashboard link from your welcome email on this device. Lost it? We’ll email it to the address on the account.</p>
          <LinkRequest slug={v.slug} />
        </main>
      </>
    );
  }

  const [slides, screens] = await Promise.all([listSlides(v.slug), listScreens(v.slug)]);
  return (
    <>{head}
      <Dashboard
        venue={{ slug: v.slug, venue_name: v.venue_name, status: v.status, timezone: v.timezone, slide_seconds: v.slide_seconds, billing: !!v.stripe_customer_id }}
        slides={JSON.parse(JSON.stringify(slides))}
        screens={JSON.parse(JSON.stringify(screens))}
        tvAddress={`${APP_URL.replace(/^https?:\/\//, '')}/tv`}
        maxSlides={LIMITS.slides}
        imageBytes={LIMITS.imageBytes}
        videoBytes={LIMITS.videoBytes}
      />
    </>
  );
}
