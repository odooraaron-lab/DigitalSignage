import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { StartForm } from '@/components/StartForm';
import { PRICES, SCREENS_DOMAIN, APP_URL, TRIAL_DAYS, PRODUCT } from '@/lib/config';

export default function Start({ searchParams }: { searchParams: { cancelled?: string; plan?: string } }) {
  const domain = SCREENS_DOMAIN || new URL(APP_URL).host;
  const plan = searchParams.plan === 'monthly' ? 'monthly' : 'yearly';
  return (
    <>
      <SiteHead cta={false} />
      <main className="wrap start">
        <div>
          <span className="eyebrow">Takes two minutes</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 48px)' }}>Get your venue on screen</h1>
          <p className="muted">You’ll get everything by email straight after paying.</p>
          {searchParams.cancelled && <div className="notice bad">Payment wasn’t finished, so nothing was charged. You can try again below.</div>}
          <div className="card">
            <StartForm domain={domain} prices={{ monthly: PRICES.monthly.label, yearly: PRICES.yearly.label }} trialDays={TRIAL_DAYS} plan={plan} />
          </div>
        </div>
        <aside className="start-side">
          <div className="card">
            <h2 style={{ fontSize: 24 }}>What you get</h2>
            <ul className="ticks">
              <li>Your own dashboard at your venue’s address</li>
              <li>Up to 20 TVs in your venue</li>
              <li>Upload images and videos, or build specials in seconds</li>
              <li>Schedule each slide by day and hour</li>
              <li>Keeps playing if the internet drops</li>
            </ul>
          </div>
          <div className="card" style={{ background: 'var(--wash)', border: 0 }}>
            <h3 style={{ fontSize: 20 }}>Setting up the TV</h3>
            <p className="muted small" style={{ margin: 0 }}>On each TV’s web browser, go to <b>{new URL(APP_URL).host}/tv</b> and type the 6-digit code into your dashboard. {PRODUCT} remembers the TV from then on.</p>
          </div>
        </aside>
      </main>
      <SiteFoot />
    </>
  );
}
