import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { BRAND, PRODUCT, SUPPORT_EMAIL } from '@/lib/config';

export default function Terms() {
  return (
    <>
      <SiteHead />
      <main className="wrap prose">
        <h1>Terms</h1>
        <p>These terms cover your use of {PRODUCT}, run by {BRAND}.</p>
        <h2>Your subscription</h2>
        <p>{PRODUCT} is a monthly or yearly subscription per venue, charged in advance through Stripe. You can cancel any time from your dashboard; your screens keep working until the end of the period you’ve paid for. We don’t give partial refunds, except where the law requires it. As {PRODUCT} is supplied for business use, the Consumer Guarantees Act does not apply to the extent the law allows.</p>
        <h2>Your content</h2>
        <p>You’re responsible for what you show, and for having the rights to use any images, video, music or logos in it. Don’t show anything unlawful or misleading, and follow the rules for advertising alcohol and your liquor licence.</p>
        <h2>Your TVs and internet</h2>
        <p>{PRODUCT} runs on your own TVs, streaming devices and internet. We can’t guarantee they’ll be on or connected, and we aren’t liable for lost sales if a screen is off.</p>
        <h2>Changes and support</h2>
        <p>We may update the service or these terms and will tell you by email about anything important.{SUPPORT_EMAIL ? <> For help, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</> : ''}</p>
      </main>
      <SiteFoot />
    </>
  );
}
