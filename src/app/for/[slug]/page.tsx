import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { TvDemo } from '@/components/TvDemo';
import { RemoteManage } from '@/components/RemoteManage';
import { INDUSTRIES, getIndustry } from '@/lib/industries';
import { PROMO_CSS } from '@/lib/promo';
import { PRICES, APP_URL } from '@/lib/config';
import { pageMeta, JsonLd, faqLd, breadcrumbLd, productLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const i = getIndustry(params.slug);
  return i ? pageMeta(`/for/${i.slug}`, i.title, i.description) : {};
}

const tvAddress = APP_URL.replace(/^https?:\/\//, '');

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const i = getIndustry(params.slug);
  if (!i) notFound();
  const faq: [string, string][] = [
    ...i.faq,
    ['Can I update it from home?', 'Yes. Log in from your phone or laptop anywhere with internet. Upload adverts or change a price and every TV in the venue updates within about a minute.'],
    ['What does it cost?', `${PRICES.monthly.label}, or ${PRICES.yearly.label}, for up to 20 TVs in one venue. No hardware to buy and no contract on the monthly plan.`],
    ['How do I connect a TV?', `Open ${tvAddress}/tv in the TV’s web browser (or on a Chromecast or Fire TV Stick). It shows a 6-digit code: type it into your dashboard and the TV starts playing.`],
  ];
  const others = INDUSTRIES.filter((x) => x.slug !== i.slug);

  return (
    <div className="lp">
      <style dangerouslySetInnerHTML={{ __html: PROMO_CSS }} />
      <JsonLd data={[faqLd(faq), productLd(`/for/${i.slug}`), breadcrumbLd([{ name: 'Digital Signage', path: '' }, { name: i.name, path: `/for/${i.slug}` }])]} />
      <SiteHead />
      <section className="lp-hero">
        <div className="wrap lp-hero-in">
          <div>
            <nav className="small muted" aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
              <Link href="/">Digital Signage</Link> › <Link href="/for">Who it’s for</Link> › {i.name}
            </nav>
            <h1>{i.h1}</h1>
            <p className="lede">{i.intro}</p>
            <div className="row">
              <Link className="btn big" href="/start">Get started</Link>
              <a className="btn big ghost" href="#pricing">{PRICES.monthly.label}</a>
            </div>
            <ul className="lp-promise">
              <li>✓ Works on the TVs you have</li>
              <li>✓ Update from your phone or laptop</li>
              <li>✓ Schedule by day and hour</li>
            </ul>
          </div>
          <TvDemo slides={i.demo} venue={i.venue} />
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head"><h2>Ways {i.short.toLowerCase()} use their screens</h2></div>
        <div className="features sg-ideas">
          {i.ideas.map((x) => <div key={x.h} className="feature"><h3>{x.h}</h3><p>{x.p}</p></div>)}
        </div>
      </section>

      <RemoteManage compact />

      <section className="lp-dark">
        <div className="wrap sg-split">
          <div>
            <div className="kicker">How it works</div>
            <h2>On screen tonight, in three steps</h2>
          </div>
          <ol className="sg-list sg-steps">
            <li><b>Sign up</b> and pick your venue’s address. Your dashboard link arrives by email.</li>
            <li><b>Add your adverts.</b> Upload images and videos, or make a special with a headline and price. Choose the days and hours each one shows.</li>
            <li><b>Pair your TVs.</b> Open <b>{tvAddress}/tv</b> on each TV and type the code it shows into your dashboard.</li>
          </ol>
        </div>
      </section>

      <section className="section wrap">
        <div className="sg-two-col">
          <div>
            <h2>Tips for {i.name.toLowerCase()}</h2>
            <ul className="sg-tips">{i.tips.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="price-card best" id="pricing">
            <span className="tag">One simple price</span>
            <h3>Everything included</h3>
            <div className="price">{PRICES.monthly.label}</div>
            <p className="muted small" style={{ margin: 0 }}>or {PRICES.yearly.label} (about two months free)</p>
            <ul><li>Up to 20 TVs in your venue</li><li>Images, video and specials</li><li>Day and hour scheduling</li><li>Keeps playing if the internet drops</li></ul>
            <Link className="btn" href="/start">Get started</Link>
          </div>
        </div>
      </section>

      <section className="section wrap" id="questions">
        <div className="section-head"><h2>Questions</h2></div>
        <div className="faq">{faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <section className="section wrap">
        <h2 style={{ fontSize: 28 }}>Also made for</h2>
        <div className="sg-chips">{others.map((o) => <Link key={o.slug} href={`/for/${o.slug}`} className="sg-chip">{o.name}</Link>)}</div>
      </section>

      <section className="section wrap">
        <div className="cta-band">
          <div><h2>Your venue, your vibe</h2><p>Get your specials on screen tonight.</p></div>
          <Link className="btn sun big" href="/start">Get started</Link>
        </div>
      </section>
      <SiteFoot />
    </div>
  );
}
