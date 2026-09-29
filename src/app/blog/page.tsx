import Link from 'next/link';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { POSTS } from '@/lib/blog';
import { pageMeta, JsonLd, breadcrumbLd } from '@/lib/seo';

export const metadata = pageMeta(
  '/blog',
  'Digital Signage Blog: Simple Screens for NZ Venues | myQR',
  'Plain-English guides to digital signage for NZ venues: why setups got complicated, and honest comparisons with OptiSigns, Yodeck and ScreenCloud.',
);

export default function Blog() {
  return (
    <div className="lp">
      <JsonLd data={breadcrumbLd([{ name: 'Digital Signage', path: '' }, { name: 'Blog', path: '/blog' }])} />
      <SiteHead />
      <main className="section wrap">
        <span className="eyebrow">Blog</span>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>Digital signage, minus the complication</h1>
        <p className="muted" style={{ maxWidth: 640 }}>Plain-English guides and honest comparisons for NZ venues.</p>
        <div className="sg-industries">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="feature sg-industry">
              <span className="small muted">{p.kicker}</span>
              <h2>{p.h1}</h2>
              <p>{p.description}</p>
              <span className="sg-more">Read →</span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFoot />
    </div>
  );
}
