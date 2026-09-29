import Link from 'next/link';
import { MobileBuyBar } from '@/components/MobileBuyBar';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { RemoteManage } from '@/components/RemoteManage';
import { CostCalculator } from '@/components/CostCalculator';
import { getTopic } from '@/lib/topics';
import { POSTS, getPost } from '@/lib/blog';
import { INDUSTRIES } from '@/lib/industries';
import { PROMO_CSS } from '@/lib/promo';
import { PRICES } from '@/lib/config';
import { pageMeta, JsonLd, faqLd, breadcrumbLd, productLd } from '@/lib/seo';

// Blog posts (/blog/optisigns-alternative-nz …). Unknown slugs 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = getPost(params.slug);
  return t ? pageMeta(`/blog/${t.slug}`, t.title, t.description) : {};
}

const linkFor = (slug: string) => (slug === 'pricing' ? { href: '/pricing', text: 'Pricing' }
  : getPost(slug) ? { href: `/blog/${slug}`, text: getPost(slug)!.nav } : { href: `/${slug}`, text: getTopic(slug)?.nav ?? slug });

export default function BlogPost({ params }: { params: { slug: string } }) {
  const t = getPost(params.slug);
  if (!t) notFound();
  const article = {
    '@context': 'https://schema.org', '@type': 'Article', headline: t.h1, description: t.description,
    author: { '@type': 'Organization', name: 'myQR' }, publisher: { '@type': 'Organization', name: 'myQR' },
    mainEntityOfPage: `/blog/${t.slug}`, inLanguage: 'en-NZ',
  };
  return (
    <div className="lp">
      <style dangerouslySetInnerHTML={{ __html: PROMO_CSS }} />
      <JsonLd data={[article, faqLd(t.faq), productLd(`/blog/${t.slug}`), breadcrumbLd([{ name: 'Digital Signage', path: '' }, { name: 'Blog', path: '/blog' }, { name: t.nav, path: `/blog/${t.slug}` }])]} />
      <SiteHead />
      <section className="lp-hero tp-hero">
        <div className="wrap">
          <nav className="small muted" aria-label="Breadcrumb" style={{ marginBottom: 14 }}><Link href="/">Digital Signage</Link> › <Link href="/blog">Blog</Link> › {t.nav}</nav>
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
        <div className="sg-chips m-chips">
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
      <MobileBuyBar title={PRICES.monthly.label} note="Up to 20 TVs · cancel any time" href="/start" label="Get started" />
    </div>
  );
}
