import { db } from '@/lib/db';
import { ownerVenue, denied, bad } from '@/lib/venues';
import { claimPairing } from '@/lib/pairing';
import { LIMITS } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type P = { params: { slug: string } };
const cleanName = (s: unknown) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, 40);

/** Connect a TV with the code it shows. */
export async function POST(req: Request, { params }: P) {
  const v = await ownerVenue(params.slug);
  if (!v) return denied();
  const b = await req.json().catch(() => ({}));
  const [{ n }] = await db()`select count(*)::int as n from ds_screens where slug = ${v.slug}`;
  if (n >= LIMITS.screens) return bad(`Up to ${LIMITS.screens} TVs per venue. Remove an old one first.`);
  const ok = await claimPairing(String(b.code ?? ''), v.slug, cleanName(b.name) || `TV ${n + 1}`);
  return ok ? Response.json({ ok: true }) : bad('That code didn’t work. Check the TV and try again (codes last 15 minutes).');
}

/** Rename a TV. */
export async function PATCH(req: Request, { params }: P) {
  const v = await ownerVenue(params.slug);
  if (!v) return denied();
  const b = await req.json().catch(() => ({}));
  const name = cleanName(b.name);
  if (!name) return bad('Give the TV a name.');
  await db()`update ds_screens set name = ${name} where id = ${Number(b.id)} and slug = ${v.slug}`;
  return Response.json({ ok: true });
}

/** Disconnect a TV. Its link stops working straight away. */
export async function DELETE(req: Request, { params }: P) {
  const v = await ownerVenue(params.slug);
  if (!v) return denied();
  const id = Number(new URL(req.url).searchParams.get('id'));
  await db()`delete from ds_screens where id = ${id} and slug = ${v.slug}`;
  return Response.json({ ok: true });
}
