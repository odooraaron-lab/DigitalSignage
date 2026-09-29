import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** What a TV should play. The TV filters by day/time itself, so it keeps working offline. */
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const k = new URL(req.url).searchParams.get('k') || '';
  const sql = db();
  const [scr] = await sql`
    update ds_screens set last_seen_at = now() where slug = ${params.slug} and screen_key = ${k}
    returning id, name`;
  if (!scr) return Response.json({ error: 'unpaired' }, { status: 404, headers: { 'cache-control': 'no-store' } });
  const [v] = await sql`select venue_name, status, timezone, slide_seconds from ds_venues where slug = ${params.slug}`;
  const on = v?.status === 'active';
  const slides = on ? await sql`
    select id, kind, media_url, promo, seconds, days, start_min, end_min from ds_slides
    where slug = ${params.slug} and active order by position, id` : [];
  return Response.json(
    { on, venue: v?.venue_name, screen: scr.name, tz: v?.timezone, seconds: v?.slide_seconds ?? 10, slides },
    { headers: { 'cache-control': 'no-store' } },
  );
}
