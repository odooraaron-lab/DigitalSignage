import { del } from '@vercel/blob';
import { db } from '@/lib/db';
import { ownerVenue, denied, bad, cleanSlideFields } from '@/lib/venues';
import { LIMITS } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type P = { params: { slug: string } };

/** Only files uploaded into this venue's own storage folder are accepted. */
function ownFile(url: unknown, slug: string) {
  try {
    const u = new URL(String(url));
    return u.protocol === 'https:' && u.hostname.endsWith('.public.blob.vercel-storage.com') && u.pathname.startsWith(`/ds/${slug}/`);
  } catch { return false; }
}

/** Add a slide: an uploaded image/video, or a promo built in the dashboard. */
export async function POST(req: Request, { params }: P) {
  const v = await ownerVenue(params.slug);
  if (!v) return denied();
  if (v.status !== 'active') return bad('Your subscription has lapsed. Update billing to add slides.', 402);
  const b = await req.json().catch(() => ({}));
  const kind = ['image', 'video', 'promo'].includes(b.kind) ? b.kind : null;
  if (!kind) return bad('Unknown slide type.');
  if (kind !== 'promo' && !ownFile(b.media_url, v.slug)) return bad('That upload didn’t finish. Please try again.');
  if (kind === 'promo' && !b.promo) return bad('Give the special a headline.');
  const f = cleanSlideFields({ ...b, promo: kind === 'promo' ? b.promo : undefined });
  if (typeof f === 'string') return bad(f);
  const sql = db();
  const [{ n }] = await sql`select count(*)::int as n from ds_slides where slug = ${v.slug}`;
  if (n >= LIMITS.slides) return bad(`You can have up to ${LIMITS.slides} slides. Remove some old ones first.`);
  const [row] = await sql`
    insert into ds_slides (slug, kind, title, media_url, bytes, promo, seconds, days, start_min, end_min, position)
    values (${v.slug}, ${kind}, ${(f.title as string) ?? ''}, ${kind === 'promo' ? null : String(b.media_url)},
      ${Math.max(0, Math.round(Number(b.bytes) || 0))}, ${f.promo ? sql.json(f.promo as any) : null},
      ${(f.seconds as number) ?? null}, ${(f.days as number[]) ?? null}, ${(f.start_min as number) ?? null}, ${(f.end_min as number) ?? null},
      (select coalesce(max(position), 0) + 1 from ds_slides where slug = ${v.slug}))
    returning *`;
  return Response.json({ slide: row });
}

/** Edit one slide ({ id, ...fields }) or reorder all ({ order: [ids] }). */
export async function PATCH(req: Request, { params }: P) {
  const v = await ownerVenue(params.slug);
  if (!v) return denied();
  const b = await req.json().catch(() => ({}));
  const sql = db();
  if (Array.isArray(b.order)) {
    const ids = b.order.map(Number).filter(Number.isInteger).slice(0, 500);
    await sql.begin(async (tx) => {
      for (let i = 0; i < ids.length; i++) await tx`update ds_slides set position = ${i + 1} where id = ${ids[i]} and slug = ${v.slug}`;
    });
    return Response.json({ ok: true });
  }
  const f = cleanSlideFields(b);
  if (typeof f === 'string') return bad(f);
  if (f.promo) f.promo = sql.json(f.promo as any);
  const keys = Object.keys(f);
  if (!keys.length) return bad('Nothing to change.');
  const [row] = await sql`update ds_slides set ${sql(f as any, keys)} where id = ${Number(b.id)} and slug = ${v.slug} returning *`;
  return row ? Response.json({ slide: row }) : bad('That slide was already removed.', 404);
}

export async function DELETE(req: Request, { params }: P) {
  const v = await ownerVenue(params.slug);
  if (!v) return denied();
  const id = Number(new URL(req.url).searchParams.get('id'));
  const [row] = await db()`delete from ds_slides where id = ${id} and slug = ${v.slug} returning media_url`;
  if (row?.media_url && process.env.BLOB_READ_WRITE_TOKEN) await del(row.media_url).catch((e) => console.error('blob delete', e));
  return Response.json({ ok: true });
}
