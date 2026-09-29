import { getVenue } from '@/lib/venues';
import { welcomeEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** "Email me my dashboard link". Only ever sends to the owner's own address. */
export async function POST(_: Request, { params }: { params: { slug: string } }) {
  const v = await getVenue(params.slug);
  if (v && v.status !== 'pending' && v.status !== 'disabled') await welcomeEmail(v);
  return Response.json({ ok: true });
}
