import { newPairing, pairedScreen, tvCookie } from '@/lib/pairing';
import { getVenue } from '@/lib/venues';
import { venueUrl } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (data: unknown, extra: Record<string, string> = {}) => Response.json(data, { headers: { 'cache-control': 'no-store', ...extra } });

/** The TV asks for a code to show. */
export async function POST() {
  return json(await newPairing());
}

/** The TV checks whether the venue has typed its code in yet. */
export async function GET(req: Request) {
  const device = new URL(req.url).searchParams.get('d') || '';
  if (!device) return json({ status: 'expired' });
  const p = await pairedScreen(device);
  if (p === 'expired') return json({ status: 'expired' });
  if (!p) return json({ status: 'waiting' });
  const v = await getVenue(p.slug);
  if (!v || v.status === 'pending') return json({ status: 'expired' });
  return json({ status: 'paired', url: venueUrl(v.slug, `/tv?k=${p.key}`) }, { 'set-cookie': tvCookie(v.slug, p.key) });
}
