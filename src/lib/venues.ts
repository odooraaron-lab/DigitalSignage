import { cookies, headers } from 'next/headers';
import { db } from './db';

export type Venue = {
  slug: string; venue_name: string; owner_name: string; owner_email: string;
  status: 'pending' | 'active' | 'lapsed' | 'disabled'; plan: string;
  stripe_customer_id: string | null; stripe_subscription_id: string | null; checkout_session_id: string | null;
  owner_token: string; timezone: string; slide_seconds: number; created_at: string; activated_at: string | null;
};

export type Slide = {
  id: number; slug: string; kind: 'image' | 'video' | 'promo'; title: string; media_url: string | null; bytes: number;
  promo: Promo | null; seconds: number | null; days: number[] | null; start_min: number | null; end_min: number | null;
  active: boolean; position: number; created_at: string;
};
export type Promo = { headline: string; price?: string; detail?: string; style: PromoStyle };
export const PROMO_STYLES = ['berry', 'night', 'sun', 'fresh', 'clean'] as const;
export type PromoStyle = (typeof PROMO_STYLES)[number];

export type Screen = { id: number; slug: string; name: string; screen_key: string; last_seen_at: string | null; created_at: string };

export async function getVenue(slug: string): Promise<Venue | null> {
  const [v] = await db()`select * from ds_venues where slug = ${slug.toLowerCase()}`;
  return (v as Venue) ?? null;
}

export const ownerCookie = (slug: string) => `dso_${slug.replace(/-/g, '_')}`;

export function isOwner(v: Venue) {
  const t = cookies().get(ownerCookie(v.slug))?.value;
  return !!t && t === v.owner_token;
}

/** '' when visited on the venue's own subdomain, '/s/<slug>' otherwise. Set by middleware. */
export function base(slug: string) {
  return headers().get('x-ds-host-mode') === '1' ? '' : `/s/${slug}`;
}

export async function listSlides(slug: string) {
  return (await db()`select * from ds_slides where slug = ${slug} order by position, id`) as unknown as Slide[];
}

export async function listScreens(slug: string) {
  return (await db()`select * from ds_screens where slug = ${slug} order by id`) as unknown as Screen[];
}

/** Minutes <-> "HH:MM" for the schedule inputs. */
export const toHHMM = (m: number | null) => (m == null ? '' : `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
export const fromHHMM = (s: string) => { const m = /^(\d{1,2}):(\d{2})$/.exec(s.trim()); return m ? Math.min(1439, Number(m[1]) * 60 + Number(m[2])) : null; };
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** "Every day, all day" / "Fri, Sat · 16:00–18:00" */
export function scheduleLabel(s: Pick<Slide, 'days' | 'start_min' | 'end_min'>) {
  const days = !s.days || s.days.length === 7 || s.days.length === 0 ? 'Every day'
    : s.days.length === 5 && [1, 2, 3, 4, 5].every((d) => s.days!.includes(d)) ? 'Weekdays'
    : s.days.length === 2 && s.days.includes(0) && s.days.includes(6) ? 'Weekends'
    : s.days.slice().sort().map((d) => DAY_NAMES[d]).join(', ');
  const time = s.start_min == null || s.end_min == null ? 'all day' : `${toHHMM(s.start_min)}–${toHHMM(s.end_min)}`;
  return `${days}, ${time}`;
}

/** The venue if this browser holds its dashboard cookie, else null. Disabled venues are locked. */
export async function ownerVenue(slug: string) {
  const v = await getVenue(slug);
  if (!v || v.status === 'pending' || v.status === 'disabled' || !isOwner(v)) return null;
  return v;
}

export const denied = () => Response.json({ error: 'Open your dashboard link from your email first.' }, { status: 403 });
export const bad = (error: string, status = 400) => Response.json({ error }, { status });

/** Checks and tidies slide fields sent from the dashboard. Returns an error message or the clean values. */
export function cleanSlideFields(b: any) {
  const out: Record<string, unknown> = {};
  if ('title' in b) out.title = String(b.title ?? '').replace(/\s+/g, ' ').trim().slice(0, 60);
  if ('seconds' in b) {
    const n = b.seconds === null || b.seconds === '' ? null : Math.round(Number(b.seconds));
    if (n !== null && !(n >= 3 && n <= 300)) return 'Show each slide for 3 to 300 seconds.';
    out.seconds = n;
  }
  if ('days' in b) {
    const d = Array.isArray(b.days) ? Array.from(new Set(b.days.map(Number).filter((x: number) => Number.isInteger(x) && x >= 0 && x <= 6))) : null;
    if (d && d.length === 0) return 'Pick at least one day.';
    out.days = d && d.length < 7 ? (d as number[]).sort() : null;
  }
  if ('start_min' in b || 'end_min' in b) {
    const s = b.start_min == null || b.start_min === '' ? null : Number(b.start_min);
    const e = b.end_min == null || b.end_min === '' ? null : Number(b.end_min);
    if ((s == null) !== (e == null)) return 'Set both a start and an end time, or neither.';
    if (s != null && (!(s >= 0 && s < 1440) || !(e! >= 0 && e! < 1440) || s === e)) return 'Those times don’t look right.';
    out.start_min = s; out.end_min = e;
  }
  if ('active' in b) out.active = !!b.active;
  if ('promo' in b && b.promo) {
    const p = b.promo;
    const t = (v: unknown, n: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
    const promo: Promo = { headline: t(p.headline, 60), price: t(p.price, 20), detail: t(p.detail, 120), style: (PROMO_STYLES as readonly string[]).includes(p.style) ? p.style : 'berry' };
    if (!promo.headline) return 'Give the special a headline.';
    out.promo = promo;
  }
  return out;
}
