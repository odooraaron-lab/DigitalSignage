import Link from 'next/link';
import { PRODUCT, BRAND, APP_URL, SUPPORT_EMAIL } from '@/lib/config';
import { INDUSTRIES } from '@/lib/industries';
import { TOPICS } from '@/lib/topics';

/** The product name with the umbrella brand in tiny letters underneath. */
export function Wordmark() {
  return <span className="wordmark"><span>{PRODUCT}</span><small>{BRAND}</small></span>;
}

export function Logo({ size = 34, light = false }: { size?: number; light?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="4" y="9" width="32" height="22" rx="6" fill={light ? '#fff' : '#2E2140'} />
      <rect x="8" y="13" width="24" height="14" rx="3" fill="#FFC857" />
      <path d="M20 14.6l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="#C23A64" />
      <rect x="14" y="32" width="12" height="3" rx="1.5" fill={light ? '#fff' : '#2E2140'} />
    </svg>
  );
}

export function SiteHead({ cta = true }: { cta?: boolean }) {
  return (
    <>
      <div className="announce">Your Venue, Your Vibe: digital signage all managed from one platform</div>
      <header className="wrap site-head">
        <a className="logo" href={APP_URL}><Logo /><Wordmark /></a>
        <nav className="site-nav" aria-label="Main">
          <a href={`${APP_URL}/#how`}>How it works</a>
          <a href={`${APP_URL}/for`}>Who it’s for</a>
          <a href={`${APP_URL}/pricing`}>Pricing</a>
        </nav>
        {cta ? <Link className="btn small" href="/start">Get started</Link> : <span />}
      </header>
    </>
  );
}

export function SiteFoot() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="brandcol">
          <a className="logo" href={APP_URL}><Logo light /><Wordmark /></a>
          <p style={{ margin: 0 }}>Specials, events and announcements on every TV in your venue, managed from one dashboard.</p>
        </div>
        <div>
          <h4>{PRODUCT}</h4>
          <a href={`${APP_URL}/#how`}>How it works</a>
          <a href={`${APP_URL}/#pricing`}>Pricing</a>
          <a href={`${APP_URL}/start`}>Get started</a>
          <a href={`${APP_URL}/tv`}>Connect a TV</a>
        </div>
        <div>
          <h4>Who it’s for</h4>
          {INDUSTRIES.map((i) => <a key={i.slug} href={`${APP_URL}/for/${i.slug}`}>{i.name}</a>)}
        </div>
        <div>
          <h4>Guides</h4>
          <a href={`${APP_URL}/pricing`}>Pricing</a>
          <a href={`${APP_URL}/blog`}>Blog</a>
          {TOPICS.map((t) => <a key={t.slug} href={`${APP_URL}/${t.slug}`}>{t.nav}</a>)}
        </div>
        <div>
          <h4>Help</h4>
          <a href={`${APP_URL}/#questions`}>Questions</a>
          {SUPPORT_EMAIL && <a href={`mailto:${SUPPORT_EMAIL}`}>Contact us</a>}
          <a href={`${APP_URL}/privacy`}>Privacy</a>
          <a href={`${APP_URL}/terms`}>Terms</a>
        </div>
        <div className="fine">{PRODUCT} is made by {BRAND} in Aotearoa New Zealand.</div>
      </div>
    </footer>
  );
}
