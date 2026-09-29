import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { RemoteManage } from '@/components/RemoteManage';
import { CostCalculator } from '@/components/CostCalculator';
import { TOPICS, getTopic } from '@/lib/topics';
import { INDUSTRIES } from '@/lib/industries';
import { PROMO_CSS } from '@/lib/promo';
import { PRICES } from '@/lib/config';
import { pageMeta, JsonLd, faqLd, breadcrumbLd, productLd } from '@/lib/seo';

// Search-topic pages (/cheap-digital-signage, /digital-signage-cost …). Unknown slugs 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const t = getTopic(params.topic);
  return t ? pageMeta(`/${t.slug}`, t.title, t.description) : {};
}

const linkFor = (slug: string) => (slug === 'pricing' ? { href: '/pricing', text: 'Pricing' } : { href: `/${slug}`, text: getTopic(slug)?.nav ?? slug });

export default function TopicPage({ params }: { params: { topic: string } }) {
  const t = getTopic(params.topic);
  if (!t) notFound();
  const article = {
    '@context': 'https://schema.org', '@type': 'Article', headline: t.h1, description: t.description,
    author: { '@type': 'Organization', name: 'myQR' }, publisher: { '@type': 'Organization', name: 'myQR' },
    mainEntityOfPage: `/${t.slug}`, inLanguage: 'en-NZ',
  };
  return (
    <div className="lp">
      <style dangerouslySetInnerHTML={{ __html: PROMO_CSS }} />
      <JsonLd data={[article, faqLd(t.faq), productLd(`/${t.slug}`), breadcrumbLd([{ name: 'Digital Signage', path: '' }, { name: t.nav, path: `/${t.slug}` }])]} />
      <SiteHead />
      <section className="lp-hero tp-hero">
        <div className="wrap">
          <nav className="small muted" aria-label="Breadcrumb" style={{ marginBottom: 14 }}><Link href="/">Digital Signage</Link> › {t.nav}</nav>
          <span className="eyebrow">{t.kicker}</span>
          <h1>{t.h1}</h1>
          <p className="lede">{t.intro}</p>
          <div className="row">
            <Link className="btn big" href="/start">Get started for {PRICES.monthly.label.replace(' a month', '/month')}</Link>
            <Link className="btn big ghost" href="/pricing">See pricing</Link>
          </div>
        </div>
      </section>

      <article className="section wrap tp-body">
        <div className="tp-main prose">
          {t.sections.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              {s.body.map((p) => <p key={p}>{p}</p>)}
              {s.list && <ul className="rm-points">{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
            </section>
          ))}
        </div>
        <aside className="tp-side">
          {t.calculator ? <CostCalculator /> : (
            <div className="price-card best">
              <span className="tag">One simple price</span>
              <h3>Everything included</h3>
              <div className="price">{PRICES.monthly.label}</div>
              <p className="muted small" style={{ margin: 0 }}>or {PRICES.yearly.label}</p>
              <ul><li>Up to 20 TVs in your venue</li><li>Images, video and specials</li><li>Day and hour scheduling</li><li>No contract on monthly</li></ul>
              <Link className="btn" href="/start">Get started</Link>
            </div>
          )}
        </aside>
      </article>

      <RemoteManage compact />

      <section className="section wrap" id="questions">
        <div className="section-head"><h2>Questions</h2></div>
        <div className="faq">{t.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <section className="section wrap">
        <h2 style={{ fontSize: 26 }}>Read next</h2>
        <div className="sg-chips">
          {t.related.map((r) => { const l = linkFor(r); return <Link key={r} href={l.href} className="sg-chip">{l.text}</Link>; })}
          {INDUSTRIES.slice(0, 4).map((i) => <Link key={i.slug} href={`/for/${i.slug}`} className="sg-chip">{i.name}</Link>)}
        </div>
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
