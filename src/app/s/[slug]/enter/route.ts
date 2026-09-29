import { getVenue, ownerCookie } from '@/lib/venues';

export const dynamic = 'force-dynamic';

/** Dashboard link from the email: remembers this device, then opens the dashboard with a clean address. */
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const v = await getVenue(params.slug);
  const t = new URL(req.url).searchParams.get('t');
  const hostMode = req.headers.get('x-ds-host-mode') === '1';
  const headers = new Headers({ Location: hostMode ? '/dashboard' : `/s/${params.slug}/dashboard` });
  if (v && t && t === v.owner_token) {
    const secure = process.env.NODE_ENV === 'production' ? ' Secure;' : '';
    headers.append('Set-Cookie', `${ownerCookie(v.slug)}=${v.owner_token}; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=${60 * 60 * 24 * 400}`);
  }
  return new Response(null, { status: 303, headers });
}
