import { db } from '@/lib/db';
import { getVenue } from '@/lib/venues';
import { PRODUCT, APP_URL } from '@/lib/config';
import { TV_CSS, TV_JS } from '@/lib/tv';

export const dynamic = 'force-dynamic';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const page = (title: string, head: string, body: string) => `<!doctype html>
<html lang="en-NZ"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<title>${title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@700;800&family=Nunito:wght@600;700;800&display=swap">
<style>${TV_CSS}</style>${head}</head><body>${body}</body></html>`;

/** The full-screen player for one paired TV. */
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const k = new URL(req.url).searchParams.get('k') || '';
  const v = await getVenue(params.slug);
  const [scr] = v && k ? await db()`select id from ds_screens where slug = ${v.slug} and screen_key = ${k}` : [];
  const html = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' };

  if (!v || v.status === 'pending' || !scr) {
    return new Response(page(PRODUCT, '<meta http-equiv="refresh" content="15;url=/tv">', `<div class="layer idle on"><div class="center"><h1>This TV isn’t connected</h1>
      <p>Go to <b>${esc(APP_URL.replace(/^https?:\/\//, ''))}/tv</b> on this TV for a new code. Taking you there now…</p></div></div>`), { status: 404, headers: html });
  }

  const config = { slug: v.slug, product: PRODUCT, feed: `/api/venues/${v.slug}/feed?k=${encodeURIComponent(k)}` };
  const hq = process.env.HQ_URL
    ? `<script defer src="${process.env.HQ_URL}/beacon.js" data-product="${process.env.HQ_PRODUCT || 'signage'}" data-site="${v.slug}" data-heartbeat></script>`
    : '';
  const body = `<div id="stage"></div><div id="net"></div>
<script>window.DS=${JSON.stringify(config).replace(/</g, '\\u003c')};</script>
<script>${TV_JS}</script>`;
  return new Response(page(`${esc(v.venue_name)} - ${PRODUCT}`, hq, body), { headers: html });
}
