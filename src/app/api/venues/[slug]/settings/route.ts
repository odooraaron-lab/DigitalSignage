import { db } from '@/lib/db';
import { ownerVenue, denied, bad } from '@/lib/venues';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  const v = await ownerVenue(params.slug);
  if (!v) return denied();
  const b = await req.json().catch(() => ({}));
  const name = String(b.venue_name ?? v.venue_name).replace(/\s+/g, ' ').trim().slice(0, 60);
  const secs = Math.round(Number(b.slide_seconds ?? v.slide_seconds));
  const tz = String(b.timezone ?? v.timezone);
  if (!name) return bad('Your venue needs a name.');
  if (!(secs >= 3 && secs <= 300)) return bad('Show each slide for 3 to 300 seconds.');
  try { new Intl.DateTimeFormat('en', { timeZone: tz }); } catch { return bad('Unknown time zone.'); }
  await db()`update ds_venues set venue_name = ${name}, slide_seconds = ${secs}, timezone = ${tz} where slug = ${v.slug}`;
  return Response.json({ ok: true });
}
