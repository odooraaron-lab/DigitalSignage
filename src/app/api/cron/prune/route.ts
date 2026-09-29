import { del, list } from '@vercel/blob';
import { db } from '@/lib/db';
import { reportToHQ } from '@/lib/hq';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Daily: clear abandoned sign-ups and their files, delete uploads nobody saved, report storage to the admin. */
export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });
  const sql = db();

  const abandoned = await sql`delete from ds_venues where status = 'pending' and created_at < now() - interval '2 days' returning slug`;

  // Files in storage that no slide points at (upload started but never saved, or slide deleted mid-way), older than a day.
  let orphans = 0;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const used = new Set((await sql`select media_url from ds_slides where media_url is not null`).map((r) => r.media_url as string));
    const cutoff = Date.now() - 24 * 3600 * 1000;
    let cursor: string | undefined;
    const stale: string[] = [];
    do {
      const page = await list({ prefix: 'ds/', cursor, limit: 1000 });
      for (const b of page.blobs) if (!used.has(b.url) && new Date(b.uploadedAt).getTime() < cutoff) stale.push(b.url);
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor && stale.length < 1000);
    if (stale.length) await del(stale).catch((e) => console.error('blob delete', e));
    orphans = stale.length;
  }

  const usage = await sql`
    select v.slug, coalesce(sum(s.bytes), 0)::bigint as bytes from ds_venues v
    left join ds_slides s on s.slug = v.slug
    where v.status <> 'pending' group by v.slug`;
  for (let i = 0; i < usage.length; i += 100) {
    await reportToHQ(...usage.slice(i, i + 100).map((u) => ({ type: 'site.upsert' as const, slug: u.slug, storage_bytes: Number(u.bytes) })));
  }

  return Response.json({ orphans, abandoned: abandoned.length, reported: usage.length });
}
