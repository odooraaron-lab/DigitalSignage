import Link from 'next/link';
import { MobileBuyBar } from '@/components/MobileBuyBar';
import type { Metadata } from 'next';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { PRICES, TRIAL_DAYS, SUPPORT_EMAIL, PRODUCT, APP_URL } from '@/lib/config';
import { PROMO_CSS } from '@/lib/promo';
import { TvDemo, type DemoSlide } from '@/components/TvDemo';
import { INDUSTRIES } from '@/lib/industries';
import { RemoteManage } from '@/components/RemoteManage';
import { CostCalculator } from '@/components/CostCalculator';
import { pageMeta, JsonLd, faqLd, productLd, organizationLd } from '@/lib/seo';

export const metadata: Metadata = pageMeta(
  '',
  'Digital Signage NZ: Cheap, Easy TV Screens for Your Venue | myQR',
  'Affordable, easy digital signage for NZ venues. Runs in your TV’s web browser: no app, no login on the TV, no extra hardware. $39/month for up to 20 TVs.',
);

const DEMO: DemoSlide[] = [
  { style: 'berry', head: 'Happy Hour Pints', price: '$8', detail: 'Weekdays 4–6pm' },
  { style: 'night', head: 'Quiz Night', price: 'Thursday', detail: 'Teams of up to 6. Starts 7pm.' },
  { style: 'sun', head: 'Loaded Fries', price: '$12', detail: 'Add pulled pork +$4' },
  { style: 'fresh', head: 'Espresso Martini', price: '$15', detail: 'Our bartender’s favourite' },
];

function Ico({ d, c }: { d: string; c: string }) {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
}

const FAQ: [string, string][] = [
  ['Can I update the screens when I’m not at the venue?', 'Yes. Your dashboard works in any web browser, on your phone, tablet or laptop, from anywhere with internet. Upload adverts, change prices or pause a special and every TV updates within about a minute.'],
  ['How much does digital signage cost?', 'With us: $39 NZD a month or $399 a year for up to 20 TVs in one venue, using the TVs you already have. No setup fee, no installer and no per-screen charges.'],
  ['Do I need to install an app or log in on the TV?', 'No. It runs in the TV’s web browser. Open the address, type the code it shows into your dashboard, and it plays. No app, no account and no password on the TV.'],
  ['Do I need to buy a media player or other hardware?', 'No. Use the TVs you already have. If a TV is too old for its browser, a Chromecast or Fire TV Stick will do, but most smart TVs work as they are.'],
  ['What do I need?', 'A TV with a web browser, or any TV with a cheap streaming stick (Chromecast with Google TV or Fire TV Stick). Plus Wi-Fi. No special player box, no installer.'],
  ['How do I connect a TV?', `On the TV’s browser, go to ${APP_URL.replace(/^https?:\/\//, '')}/tv. It shows a 6-digit code. Type that code into your dashboard and the TV starts playing. It remembers itself after that, even after a power cut.`],
  ['How many TVs can I have?', 'One subscription covers every TV in your venue (up to 20). They all play the same playlist.'],
  ['What can I show?', 'Images (JPG, PNG, WebP), short videos (MP4) and specials you build in the dashboard with a headline, price and small print. No design skills needed.'],
  ['Can specials show only at certain times?', 'Yes. Every slide can have its own days and hours, like happy hour from 4 to 6 on weekdays, or brunch only on weekends. Outside those times it simply doesn’t play.'],
  ['What if the internet drops?', 'The TVs keep playing what they already have and pick up your changes when the connection comes back.'],
  ['Can I cancel?', 'Yes. The monthly plan can be cancelled any time from your dashboard. The yearly plan runs to the end of its year.'],
];

export default function Home() {
  return (
    <div className="lp">
      <style dangerouslySetInnerHTML={{ __html: PROMO_CSS }} />
      <JsonLd data={[organizationLd(), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'myQR Digital Signage', alternateName: 'Digital Signage by myQR', url: APP_URL }, productLd(), faqLd(FAQ)]} />
      <SiteHead />
      <section className="lp-hero">
        <div className="wrap lp-hero-in">
          <div>
            <span className="eyebrow">Your Venue, Your Vibe · Digital signage NZ</span>
            <h1>Powerful digital signage <span className="hl">that sells</span></h1>
            <p className="lede">Promote high-margin food and drink specials, events and announcements on the TVs you already have. All managed from your phone or laptop, wherever you are, for a ridiculously low price.</p>
            <div className="row">
              <Link className="btn big" href="/start">Get started</Link>
              <a className="btn big ghost" href="#pricing">See pricing</a>
            </div>
            <ul className="lp-promise">
              <li>✓ Runs in your TV’s web browser</li>
              <li>✓ No app or login on the TV</li>
              <li>✓ No extra hardware to buy</li>
              <li>✓ Update from your phone or laptop</li>
            </ul>
          </div>
          <TvDemo slides={DEMO} />
        </div>
      </section>

      <section className="section wrap">
        <div className="features sg-benefits m-swipe">
          <div className="feature">
            <div className="ico" style={{ background: 'var(--accent-soft)' }}><Ico c="#C23A64" d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6M10 21h.01M18 21h.01" /></div>
            <h3>Sell more products</h3>
            <p>Put your best-margin dishes and drinks in front of every customer, right when they’re deciding what to order next.</p>
          </div>
          <div className="feature">
            <div className="ico" style={{ background: 'var(--lamp-soft)' }}><Ico c="#9A6A00" d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /></div>
            <h3>Increase engagement</h3>
            <p>Quiz nights, live music, the big game, the new menu. Tell the whole room what’s coming up and give them a reason to come back.</p>
          </div>
          <div className="feature">
            <div className="ico" style={{ background: 'var(--teal-soft)' }}><Ico c="#0F766E" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2" /></div>
            <h3>Influence customer decisions</h3>
            <p>Show the right offer at the right time: coffee and cake in the afternoon, happy hour at five, dessert after dinner. Set it once and it runs itself.</p>
          </div>
        </div>
      </section>

      <RemoteManage />

      <section className="section wrap" id="browser">
        <div className="section-head" style={{ display: 'block' }}>
          <span className="eyebrow">No app. No login. No player box.</span>
          <h2>It runs in your TV’s web browser</h2>
          <p className="muted rm-lede" style={{ maxWidth: 720 }}>Other digital signage often means an app on every screen, a media player behind every TV, or an installer. Ours is a web page: open it on the TV you already have, type a code into your dashboard, and your adverts start playing.</p>
        </div>
        <ol className="steps">
          <li><h3>Open the address</h3><p>On the TV’s web browser, go to <b>{APP_URL.replace(/^https?:\/\//, '')}/tv</b>. No app to download, no account to sign in to.</p></li>
          <li><h3>Type the code</h3><p>The TV shows a 6-digit code. Enter it in your dashboard on your phone or laptop.</p></li>
          <li><h3>That’s it</h3><p>The TV starts playing and remembers itself, even after a power cut. No extra hardware, no installer.</p></li>
        </ol>
        <div className="row" style={{ marginTop: 18 }}>
          <Link className="btn ghost" href="/browser-based-digital-signage">How browser-based signage works</Link>
          <Link className="btn ghost" href="/digital-signage-no-extra-hardware">No extra hardware</Link>
        </div>
      </section>

      <section className="section wrap" id="why">
        <div className="tp-body">
          <div>
            <span className="eyebrow">Cheap and easy, on purpose</span>
            <h2>Digital signage without the price tag or the installer</h2>
            <p className="muted rm-lede">Most digital signage is sold to chains: commercial screens, a player box behind every TV, an installer, and software charged per screen. A single venue doesn’t need any of that.</p>
            <ul className="rm-points">
              <li><b>One flat price for the venue.</b> $39 a month covers up to 20 TVs, in NZ dollars. No per-screen fees.</li>
              <li><b>No hardware to buy.</b> Use the TVs you already have. Older TVs just need a Chromecast or Fire TV Stick.</li>
              <li><b>No installer, no software to install.</b> Pair each TV with a 6-digit code in about a minute.</li>
              <li><b>No contract.</b> Monthly plans cancel any time from your dashboard.</li>
            </ul>
            <div className="row" style={{ marginTop: 18 }}>
              <Link className="btn ghost" href="/cheap-digital-signage">Why it’s cheaper</Link>
              <Link className="btn ghost" href="/digital-signage-cost">Digital signage cost guide</Link>
            </div>
          </div>
          <CostCalculator />
        </div>
      </section>

      <section className="section wrap" id="venues">
        <div className="section-head"><h2>Made for your kind of venue</h2><Link href="/for" className="small">See all →</Link></div>
        <div className="sg-chips m-chips">
          {INDUSTRIES.map((i) => <Link key={i.slug} href={`/for/${i.slug}`} className="sg-chip">{i.name}</Link>)}
        </div>
      </section>

      <section className="section wrap" id="how">
        <div className="section-head"><h2>Up and running in minutes</h2></div>
        <ol className="steps">
          <li><h3>Sign up</h3><p>Pick your venue’s address and plan. Your dashboard link arrives by email straight away.</p></li>
          <li><h3>Add your adverts</h3><p>Upload images and videos, or make a special in seconds: headline, price, colours. Choose when each one shows.</p></li>
          <li><h3>Pair your TVs</h3><p>Open <b>{APP_URL.replace(/^https?:\/\//, '')}/tv</b> on each TV and type the code it shows into your dashboard. Done.</p></li>
        </ol>
      </section>

      <section className="lp-dark">
        <div className="wrap sg-split">
          <div>
            <div className="kicker">One dashboard</div>
            <h2>Every screen in your venue, managed from your phone</h2>
          </div>
          <ul className="sg-list">
            <li><b>Instant updates.</b> Change a price and every TV shows it within a minute.</li>
            <li><b>Day and hour scheduling.</b> Breakfast specials in the morning, cocktails at night.</li>
            <li><b>Up to 20 TVs.</b> Bar, dining room, window, courtyard: all on one plan.</li>
            <li><b>Keeps playing offline.</b> A Wi-Fi hiccup won’t leave you with a blank screen.</li>
            <li><b>Online status.</b> See at a glance which TVs are on and playing.</li>
          </ul>
        </div>
      </section>

      <section className="section wrap" id="pricing">
        <div className="section-head"><h2>Simple pricing</h2><p className="muted" style={{ margin: 0 }}>One venue, all your TVs, everything included.</p></div>
        <div className="price-grid sg-prices">
          <div className="price-card">
            <h3>Monthly</h3>
            <div className="price">{PRICES.monthly.label}</div>
            <ul><li>Up to 20 TVs in your venue</li><li>Images, video and specials</li><li>Day and hour scheduling</li><li>Cancel any time</li></ul>
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
        {TRIAL_DAYS > 0 && <p className="muted center" style={{ marginTop: 16 }}>Try it free for {TRIAL_DAYS} days.</p>}
        <p className="muted small center" style={{ marginTop: 12 }}>Prices in NZD.</p>
      </section>

      <section className="section wrap" id="questions">
        <div className="section-head"><h2>Questions</h2></div>
        <div className="faq">
          {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          {SUPPORT_EMAIL && <p className="muted">Something else? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>}
        </div>
      </section>

      <section className="section wrap">
        <div className="cta-band">
          <div><h2>Your venue, your vibe</h2><p>Get your specials on screen tonight.</p></div>
          <Link className="btn sun big" href="/start">Get started</Link>
        </div>
      </section>
      <SiteFoot />
      <MobileBuyBar title={`${PRICES.monthly.label}`} note="Up to 20 TVs · cancel any time" href="/start" label="Get started" hideOn="#pricing" />
    </div>
  );
}
