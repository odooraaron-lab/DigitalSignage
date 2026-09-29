import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'myQR Digital Signage: TV screens that sell, for your venue';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The picture shown when the site is shared on Facebook, LinkedIn, iMessage etc. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#2E2140', color: '#fff', padding: 64, alignItems: 'center', gap: 48, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: 26, color: '#FFC857', fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' }}>Your venue, your vibe</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>Digital signage that sells</div>
          <div style={{ fontSize: 30, marginTop: 22, color: '#E6DEF2' }}>Specials, events and announcements on your TVs. From $39 a month.</div>
          <div style={{ fontSize: 26, marginTop: 34, color: '#FFC857', fontWeight: 800 }}>myQR · digitalsignage.myqr.co.nz</div>
        </div>
        <div style={{ display: 'flex', width: 420, height: 260, background: '#1B1426', borderRadius: 18, padding: 12 }}>
          <div style={{ display: 'flex', flex: 1, background: '#C23A64', borderRadius: 8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 34, fontWeight: 800 }}>Happy Hour Pints</div>
            <div style={{ fontSize: 48, fontWeight: 800, background: '#FFC857', color: '#2E2140', padding: '6px 24px', borderRadius: 18, marginTop: 14 }}>$8</div>
            <div style={{ fontSize: 20, marginTop: 14 }}>Weekdays 4–6pm</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
