import Link from 'next/link';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { CostCalculator } from '@/components/CostCalculator';
import { PRICES, TRIAL_DAYS } from '@/lib/config';
import { pageMeta, JsonLd, faqLd, productLd, breadcrumbLd } from '@/lib/seo';

export const metadata = pageMeta(
  '/pricing',
  'Digital Signage Pricing NZ: $39/month for up to 20 TVs | myQR',
  'Simple, affordable digital signage pricing in NZ dollars: $39 a month or $399 a year for up to 20 TVs in one venue. No setup fee, no hardware, no contract on monthly.',
);

const FAQ: [string, string][] = [
  ['Is the price per screen?', 'No. One price covers up to 20 TVs in one venue. Adding a TV costs nothing extra.'],
  ['Are there setup fees or hardware costs?', 'No setup fee. Use the TVs you already have. Older TVs may need a streaming stick such as a Chromecast with Google TV or Fire TV Stick.'],
  ['Is GST included?', 'Prices are shown in NZ dollars as charged at checkout. You’ll get a receipt for every payment for your records.'],
  ['Can I cancel?', 'Yes. Cancel the monthly plan any time from your dashboard. The yearly plan runs to the end of its year.'],
  ['Can I switch between monthly and yearly?', 'Yes, from the billing page in your dashboard.'],
  ['I have more than one venue.', 'Each venue has its own subscription and dashboard. Get in touch if you run several venues.'],
];

const COMPARE: [string, string, string, string][] = [
  ['What you pay for software', 'One flat price per venue, in NZD', 'Per screen, often in USD', 'Per screen, usually quoted'],
  ['Hardware', 'The TVs you have', 'A player per screen is common', 'Commercial displays + players'],
  ['Setup', 'Yourself, in minutes', 'Yourself', 'Installer and site visit'],
  ['Contract', 'None on monthly', 'Varies', 'Often'],
  ['Made for', 'Single venues', 'Any size', 'Chains and big networks'],
];

export default function Pricing() {
  return (
    <div className="lp">
      <JsonLd data={[productLd('/pricing'), faqLd(FAQ), breadcrumbLd([{ name: 'Digital Signage', path: '' }, { name: 'Pricing', path: '/pricing' }])]} />
      <SiteHead />
      <section className="lp-hero tp-hero">
        <div className="wrap">
          <span className="eyebrow">Pricing</span>
          <h1>One simple price. Every TV in your venue.</h1>
          <p className="lede">No per-screen fees, no hardware to buy, no installer. Pay in NZ dollars, monthly or yearly.</p>
        </div>
      </section>
      <section className="section wrap">
        <div className="tp-body">
          <div className="price-grid sg-prices" style={{ maxWidth: 'none' }}>
            <div className="price-card">
              <h3>Monthly</h3>
              <div className="price">{PRICES.monthly.label}</div>
              <ul><li>Up to 20 TVs in your venue</li><li>Images, video and specials</li><li>Day and hour scheduling</li><li>Manage from phone or laptop</li><li>Cancel any time</li></ul>
              <Link className="btn ghost" href="/start?plan=monthly">Choose monthly</Link>
            </div>
            <div className="price-card best">
              <span className="tag">Best value</span>
              <h3>Yearly</h3>
              <div className="price">{PRICES.yearly.label}</div>
              <ul><li>Everything in monthly</li><li>About two months free</li><li>One invoice a year</li></ul>
              <Link className="btn" href="/start?plan=yearly">Choose yearly</Link>
            </div>
          </div>
          <aside className="tp-side"><CostCalculator /></aside>
        </div>
        {TRIAL_DAYS > 0 && <p className="muted center">Try it free for {TRIAL_DAYS} days.</p>}
      </section>
      <section className="section wrap">
        <div className="section-head"><h2>How we compare</h2></div>
        <div className="cmp-wrap">
          <table className="cmp">
            <thead><tr><th /><th>myQR Digital Signage</th><th>Per-screen apps</th><th>Installed systems</th></tr></thead>
            <tbody>{COMPARE.map(([a, b, c, d]) => <tr key={a}><th>{a}</th><td className="cmp-us">{b}</td><td>{c}</td><td>{d}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="small muted">A general comparison of common approaches, not of any particular company. Big networks with dozens of locations may still be better served by an installed system.</p>
      </section>
      <section className="section wrap" id="questions">
        <div className="section-head"><h2>Pricing questions</h2></div>
        <div className="faq">{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>
      <SiteFoot />
    </div>
  );
}
