import type { Metadata } from 'next';
import { APP_URL, BRAND, PRODUCT, PRICES } from './config';

// The public address, for canonical links, the sitemap and structured data.
export const SITE = APP_URL;
export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: `${PRODUCT} by ${BRAND}: TV screens for your venue` };

/** Page metadata with a canonical link and matching social-share text. */
export function pageMeta(path: string, title: string, description: string, extra: Metadata = {}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path || '/' },
    openGraph: { title, description, url: path || '/', siteName: `${PRODUCT} by ${BRAND}`, locale: 'en_NZ', type: 'website', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
    ...extra,
  };
}

/** Structured data for Google. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const organizationLd = () => ({
  '@context': 'https://schema.org', '@type': 'Organization', name: BRAND, url: SITE, logo: `${SITE}/icon.svg`, areaServed: 'NZ',
});

/** The product with both prices. Prices come from the labels ("$39 a month"). */
export function productLd(path = '') {
  const num = (label: string) => (label.match(/[\d.]+/) || ['0'])[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${BRAND} ${PRODUCT}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web browser, smart TV, Chromecast, Fire TV',
    description: 'Cloud digital signage for venues: put specials, events and announcements on your TVs, scheduled by day and hour, managed from one dashboard.',
    url: `${SITE}${path}`,
    image: `${SITE}/opengraph-image`,
    offers: [
      { '@type': 'Offer', name: 'Monthly', price: num(PRICES.monthly.label), priceCurrency: 'NZD', url: `${SITE}/start?plan=monthly`, category: 'subscription' },
      { '@type': 'Offer', name: 'Yearly', price: num(PRICES.yearly.label), priceCurrency: 'NZD', url: `${SITE}/start?plan=yearly`, category: 'subscription' },
    ],
  };
}

export const faqLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE}${it.path}` })),
});
