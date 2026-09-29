import Link from 'next/link';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { INDUSTRIES } from '@/lib/industries';
import { pageMeta, JsonLd, breadcrumbLd } from '@/lib/seo';

export const metadata = pageMeta(
  '/for',
  'Digital Signage for Every Venue NZ: Bars, Cafés, Gyms, Clubs & Retail | myQR',
  'Digital signage for bars, pubs, restaurants, cafés, gyms, sports clubs, RSAs and retail stores in New Zealand. One dashboard, your own TVs, from $39 a month.',
);

export default function ForHub() {
  return (
    <div className="lp">
      <JsonLd data={breadcrumbLd([{ name: 'Digital Signage', path: '' }, { name: 'Who it’s for', path: '/for' }])} />
      <SiteHead />
      <main className="section wrap">
        <div className="section-head" style={{ display: 'block' }}>
          <span className="eyebrow">Who it’s for</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)' }}>Digital signage for every kind of venue</h1>
          <p className="muted" style={{ maxWidth: 640 }}>If you have customers and a TV, you can use it to sell. Here’s how different venues use theirs.</p>
        </div>
        <div className="sg-industries">
          {INDUSTRIES.map((i) => (
            <Link key={i.slug} href={`/for/${i.slug}`} className="feature sg-industry">
              <h2>{i.name}</h2>
              <p>{i.intro.split('. ')[0]}.</p>
              <span className="sg-more">See ideas for {i.short.toLowerCase()} →</span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFoot />
    </div>
  );
}
