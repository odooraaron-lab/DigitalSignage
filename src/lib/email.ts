import { PRODUCT, BRAND, SUPPORT_EMAIL, APP_URL, venueUrl } from './config';
import type { Venue } from './venues';

export async function sendEmail(to: string, subject: string, text: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email not sent: RESEND_API_KEY missing] to=${to} subject=${subject}\n${text}`);
    return false;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.FROM_EMAIL, to, subject, text, reply_to: SUPPORT_EMAIL || undefined }),
  });
  if (!res.ok) console.error('email failed', res.status, await res.text().catch(() => ''));
  return res.ok;
}

export function welcomeEmail(v: Venue) {
  const dash = venueUrl(v.slug, `/enter?t=${v.owner_token}`);
  return sendEmail(v.owner_email, `${v.venue_name} is on ${PRODUCT}`, `Kia ora ${v.owner_name},

${v.venue_name}'s ${PRODUCT} is ready. Here's how to get your first advert on screen.

1. OPEN YOUR DASHBOARD (keep this link to yourself)
${dash}
Upload images and videos, or build a quick special (headline + price) right there. Set which days and hours each one shows.

2. CONNECT YOUR TVs
On each TV, open the web browser and go to:
${APP_URL.replace(/^https?:\/\//, '')}/tv
It shows a 6-digit code. In your dashboard tap "Connect a TV" and type the code. Do this once per TV; add as many as you like.
Tip: a Chromecast with Google TV or Fire TV Stick gives the smoothest playback.

3. THAT'S IT
Changes you make in the dashboard reach every TV within a minute. If the internet drops, the TVs keep playing what they have.

Manage your subscription any time from the dashboard. Questions? Just reply to this email.

${BRAND}`);
}
