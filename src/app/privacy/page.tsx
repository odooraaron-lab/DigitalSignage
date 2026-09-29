import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { BRAND, PRODUCT, SUPPORT_EMAIL } from '@/lib/config';

export default function Privacy() {
  return (
    <>
      <SiteHead />
      <main className="wrap prose">
        <h1>Privacy</h1>
        <p>{BRAND} runs {PRODUCT}. This page explains what we collect and why, in line with the New Zealand Privacy Act 2020.</p>
        <h2>What we collect</h2>
        <p>From the business that signs up: the contact name, email address, venue name, and payment details (handled by Stripe; we never see card numbers).</p>
        <p>The adverts you upload or create: images, videos and text.</p>
        <p>From each TV: when it last checked in, so your dashboard can show whether it’s online.</p>
        <h2>How it’s used</h2>
        <p>Only to run the service: playing your adverts on your TVs, your dashboard, billing, and support emails. We don’t sell data or use it for advertising.</p>
        <h2>Who can see your adverts</h2>
        <p>They’re meant for public display on your TVs. Files are stored with our hosting provider (Vercel) behind long, unguessable links.</p>
        <h2>How long we keep it</h2>
        <p>Adverts are kept until you remove them. If a subscription ends, the account and its content are deleted within 90 days. You can ask us to delete everything at any time.</p>
        <h2>Your rights</h2>
        <p>You can ask to see or correct the information we hold about you, or ask us to delete it{SUPPORT_EMAIL ? <> by emailing <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></> : ''}. You can also contact the Office of the Privacy Commissioner.</p>
      </main>
      <SiteFoot />
    </>
  );
}
