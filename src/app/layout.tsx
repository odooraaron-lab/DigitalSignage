import './globals.css';
import type { Metadata } from 'next';
import { PRODUCT, BRAND, APP_URL } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: `${PRODUCT} by ${BRAND}`, template: `%s | ${BRAND} ${PRODUCT}` },
  description: 'Digital signage for bars, cafés and venues. Put specials, events and announcements on your TVs, managed from one dashboard.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hq = process.env.HQ_URL;
  return (
    <html lang="en-NZ">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;700;800&family=Nunito:wght@400;600;700;800&display=swap" />
        {hq && <script defer src={`${hq}/beacon.js`} data-product={process.env.HQ_PRODUCT || 'signage'} />}
      </head>
      <body>{children}</body>
    </html>
  );
}
